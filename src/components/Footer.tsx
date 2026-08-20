export default function Footer() {

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row
       md:justify-between items-start md:items-center gap-6 text-left">

        <div className="flex flex-col items-start gap-1">
          <div className="text-lg font-semibold tracking-tight cursor-pointer">
            Support <span className="text-zinc-400">AI</span>
          </div>
          <p className="text-xs text-zinc-500">
            Next-Gen AI Customer Support for Modern Websites.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 font-medium">
          <a href="#feature" className="hover:text-zinc-900 transition-colors">Features</a>
          <a href="#docs" className="hover:text-zinc-900 transition-colors">Docs</a>
          <a href="#privacy" className="hover:text-zinc-900 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-zinc-900 transition-colors">Terms</a>
        </div>

      <div className="text-xs text-zinc-400">
          © {new Date().getFullYear()} SupportAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}