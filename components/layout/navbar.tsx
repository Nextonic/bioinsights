import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400" />
          <span className="font-semibold text-lg tracking-tight">BioInsights</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/use-cases">Use cases</Link>
          <Link href="/example-queries">Examples</Link>
          <Link href="/datasets">Datasets</Link>
        </nav>
      </div>
    </div>
  );
}
