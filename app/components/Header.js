import Link from "next/link"
import { signOut } from '@/auth';

export default function Header() {
  return (
    <header className="header flex-row">
      <Link className="nav-link" href="/dashboard">Dashboard</Link>
      <Link className="nav-link" href="/slots">Slots</Link>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="nav-link">Logout</button>
      </form>
    </header>
  )
}