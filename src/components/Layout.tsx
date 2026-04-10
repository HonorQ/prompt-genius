import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              PromptGenius
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 z-10 flex flex-col">
        <Outlet />
      </main>
      
      <footer className="py-6 text-center text-slate-500 text-sm z-10 border-t border-white/5 mt-auto">
        <p>© {new Date().getFullYear()} PromptGenius. AI生图提示词向导工具。</p>
      </footer>
    </div>
  );
}
