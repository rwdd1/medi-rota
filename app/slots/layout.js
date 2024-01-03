import Header from '../components/Header'

export default function Layout({ children }) {
  return (
    <>
      <main className="flex-col">
        <Header />
        {children}
      </main>
    </>
  )
}
