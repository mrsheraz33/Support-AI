import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-zinc-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-zinc-700 mb-4">Page Not Found</h2>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-zinc-950 text-white rounded-xl
         text-sm font-medium hover:bg-zinc-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}