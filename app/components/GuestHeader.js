import Link from "next/link"

export default function GuestHeader() {
  return (
    <header className="header flex-row">
      <Link className="nav-link" href="/">Home</Link>
      <Link className="nav-link" href="/register">Register</Link>
    </header>
  )
}