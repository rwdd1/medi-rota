'use server'

import { sql } from "@vercel/postgres"
import { auth } from '@/auth'
import { unstable_noStore } from "next/cache";

export async function getHours(id) {
unstable_noStore();
  try {
    const hours = await sql`
      SELECT *
      FROM matrix m
      INNER JOIN slots s
      ON m.slotId = s.id
      WHERE m.userId = ${id}
    `;
    return (hours.rows.length) ? hours.rows : null;
  } catch(err) {
    console.log(err);
  }
}

export async function getSlots(id) {
unstable_noStore();
  try {
    const slots = await sql`
      SELECT *
      FROM slots
      WHERE createdBy = ${id}
      ORDER BY createdOn desc
    `;
    return (slots.rows.length) ? slots.rows : null;
  } catch(err) {
    console.log(err);
  }
}

export async function checkSlot(id) {
  try {
    const cred = await auth();
    const slots = await sql`
      SELECT *
      FROM matrix
      WHERE slotId = ${id} AND userId = ${cred.user.id};
    `;
    return (slots.rows.length) ? true : false;
  } catch(err) {
    console.log(err);
  }
}