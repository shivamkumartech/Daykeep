import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto border-t border-(--app-border) bg-(--app-bg) px-6">
      <div className="container mx-auto flex flex-row items-center justify-between py-6 text-xs text-(--app-text-muted)">
        <p>© {new Date().getFullYear()} Daykeep.</p>
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link to="/privacy" className="transition-colors hover:text-(--app-text)">Privacy</Link>
          <Link to="/terms" className="transition-colors hover:text-(--app-text)">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;