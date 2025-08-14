export default function Footer() {
  return (
    <footer className="py-10 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400" />
          <span>BioInsights Suite</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-900">Security</a>
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
        </div>
        <div>© {new Date().getFullYear()} Nextonic Solutions</div>
      </div>
    </footer>
  );
}