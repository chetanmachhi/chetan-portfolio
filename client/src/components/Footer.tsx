import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center">
      <p className="text-slate-500 flex items-center justify-center gap-2">
        Made with <FaHeart className="text-red-500 animate-pulse" /> using React & Tailwind
      </p>
      <p className="text-slate-600 text-sm mt-2">© {new Date().getFullYear()} Chetan Machhi</p>
    </footer>
  );
}