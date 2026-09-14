function Footer() {
  return (
    <footer className="mt-auto border-t border-(--app-border) bg-(--app-bg)">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-6 text-xs text-(--app-text-muted) sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <p>© {new Date().getFullYear()} Daykeep. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <a href="/privacy" className="transition-colors hover:text-(--app-text)">Privacy</a>
          <a href="/terms" className="transition-colors hover:text-(--app-text)">Terms</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;