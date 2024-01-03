'use server'

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
 
async function getUser(username) {
  try {
    const user = await sql`SELECT * FROM users WHERE username=${username}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;
        const user = await getUser(username);
        if (!user) return null;
        const passwordsMatch = bcrypt.compare(password, user.password);

        if (passwordsMatch) return user;

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1800,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    maxAge: 1800,
    secret: process.env.AUTH_SECRET,
    encryption: true,
  },
});