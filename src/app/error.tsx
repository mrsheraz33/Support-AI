"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h2 className="text-xl font-semibold text-zinc-900 mb-2">Something went wrong!</h2>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-zinc-950
         text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  )
}