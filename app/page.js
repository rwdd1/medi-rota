import GuestHeader from './components/GuestHeader'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <main className="flex-col flex-center">
      <GuestHeader />
      <AuthForm type="login" />
    </main>
  )
}
