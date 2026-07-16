import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | VectorMoon"
        description="That page does not exist."
        url="https://www.vectormoon.co.uk/404"
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan">404</p>
        <h1 className="mt-4 text-4xl font-bold">Lost in orbit</h1>
        <p className="mt-3 text-text-secondary">This page doesn&apos;t exist.</p>
        <Link to="/" className="mt-8 rounded-full bg-cyan px-8 py-3 text-sm font-semibold text-void">
          Back home
        </Link>
      </div>
    </>
  )
}
