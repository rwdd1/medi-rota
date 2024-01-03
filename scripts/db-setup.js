const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function createUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        admin BOOLEAN NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const users = [
        {
          id: '410544b2-4001-4271-9855-fec4b6a6442a',
          admin: true,
          username: 'admin',
          password: 'password',
        },
        {
          id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
          admin: false,
          username: 'test',
          password: 'password',
        },
        {
          id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
          admin: false,
          username: 'test2',
          password: 'password',
        }
    ]
    
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, admin, username, password)
        VALUES (${user.id}, ${user.admin}, ${user.username}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

async function createSlots(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "slots" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS slots (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        site VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        ward VARCHAR(255) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        slotStartTime TIMETZ NOT NULL,
        slotEndTime TIMETZ NOT NULL,
        staffCount SMALLINT NOT NULL,
        createdBy UUID NOT NULL,
        createdOn DATE DEFAULT NOW()
      );
    `;

    console.log(`Created "slots" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error creating slots table:', error);
    throw error;
  }
}

async function createMatrix(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS matrix (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        userId UUID NOT NULL,
        slotId UUID NOT NULL
      );
    `;

    console.log(`Created "matrix" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error creating matrix table:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsers(client);
  await createSlots(client);
  await createMatrix(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
