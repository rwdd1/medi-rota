'use server'

import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { auth } from '@/auth'
import { unstable_noStore } from 'next/cache';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp(prevState, formData) {
  try {
    const username = formData.get("username");
    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
    
    const query = await sql`
      INSERT INTO users (admin, username, password)
      VALUES (false, ${username}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log(query)
    return "Account created"
  } catch(err) {
    // console.log(Object.entries(err))
    if (err.name === "NeonDbError" && err.code === "23505") {
      return "Username unavailable"
    }
    console.log(err)
  }
}

export async function createSlot(prevState, formData) {
  try {
    const cred = await auth();
    const regex = /^[a-z\d\-'_:\s]+$/i
    const details = Object.fromEntries(formData);
    
    for (let detail in details) {
      if (detail[0] !== "$") {
        if (!regex.test(details[detail])) return "Invalid character entered."
      }
    }
    
    const {site, specialty, ward, startDate, endDate, slotStartTime, slotEndTime, staffCount} = details;
    
    const newSlot = await sql`
      INSERT INTO slots (site, specialty, ward, startDate, endDate, slotStartTime, slotEndTime, staffCount, createdBy)
      VALUES (${site}, ${specialty}, ${ward}, ${startDate}, ${endDate}, ${slotStartTime}, ${slotEndTime}, ${staffCount}, ${cred.user.id})
    `;
    revalidatePath("/dashboard");
  } catch(err) {
    console.log(err);
    return 'Something went wrong.';
  }
}

export async function findSlot(site, specialty, ward) {
unstable_noStore();
  try {
    const cred = await auth();
    const slots = await sql`
      WITH allSlots AS (
        SELECT id, startDate, endDate, slotStartTime, slotEndTime, staffCount
        FROM slots
        WHERE site = ${site} AND specialty = ${specialty} AND ward = ${ward}
      ),
      takenSlots AS (
        SELECT b.slotId, count(*) AS takenCount
        FROM slots a
        INNER JOIN matrix b
        ON a.id = b.slotId
        WHERE a.site = ${site} AND a.specialty = ${specialty} AND a.ward = ${ward}
        GROUP BY b.slotId
      ),
      chosenSlots AS (
        SELECT b.slotId, count(*) AS chosenCount
        FROM slots a
        INNER JOIN matrix b
        ON a.id = b.slotId
        WHERE a.site = ${site} AND a.specialty = ${specialty} AND a.ward = ${ward} AND b.userId = ${cred.user.id}
        GROUP BY b.slotId
      )
      SELECT a.id, a.startDate, a.endDate, a.slotStartTime, a.slotEndTime, (CASE WHEN b.takenCount IS NULL THEN a.staffCount ELSE a.staffCount - b.takenCount END) AS remainingSlots, (CASE WHEN c.chosenCount IS NULL THEN 0 ELSE 1 END) AS chosen
      FROM allSlots a
      LEFT JOIN takenSlots b
      ON a.id = b.slotId
      LEFT JOIN chosenSlots c
      ON a.id = c.slotId
    `;
    return (slots.rows.length) ? slots.rows : null;
  } catch(err) {
    console.log(err);
  }
}

export async function deleteSlot(id) {
  try {
    await sql`
      DELETE FROM slots
      WHERE id = ${id}
    `;
    await sql`
      DELETE FROM matrix
      WHERE slotId = ${id}
    `;
    revalidatePath("/dashboard");
  } catch(err) {
    console.log(err);
  }
}

export async function chooseSlot(id) {
  try {
    const cred = await auth();
    await sql`
      INSERT INTO matrix (slotId, userId)
      VALUES (${id}, ${cred.user.id})
    `;
  } catch(err) {
    console.log(err);
  }
}

export async function discardSlot(id, pathname) {
  try {
    const cred = await auth();
    await sql`
      DELETE FROM matrix
      WHERE slotId = ${id} AND userId = ${cred.user.id}
    `;
    if (pathname.includes("dashboard")) revalidatePath(pathname);
  } catch(err) {
    console.log(err);
  }
}