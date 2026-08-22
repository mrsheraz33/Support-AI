export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
        <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 
        rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  )
}