import { Link } from "react-router-dom";

// X (Twitter) Icon
function XIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// GitHub Icon
function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const DEFAULT_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const DEFAULT_SOCIALS = [
  { name: "X", href: "https://x.com/shivamkumar_dev", icon: XIcon },
  { name: "GitHub", href: "https://github.com/shivamkumartech", icon: GithubIcon },
];

function Footer({
  copyright = `© ${new Date().getFullYear()} Daykeep.`,
  links = DEFAULT_LINKS,
  socials = DEFAULT_SOCIALS,
}) {
  return (
    <footer className="mt-auto w-full border-t border-(--app-border) bg-(--app-bg) px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Navigation Links: Privacy & Terms */}
        <nav className="flex flex-row items-center justify-center gap-6 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-(--app-text-secondary) transition-colors duration-200 hover:text-(--app-text)"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Dotted horizontal separator */}
        <div className="my-8 w-full border-t border-dotted border-(--app-border) sm:my-10" />

        {/* Bottom Section: Copyright & Social Media Icons (identical row layout on mobile and desktop) */}
        <div className="flex flex-row items-center justify-between text-xs text-(--app-text-muted) sm:text-sm">
          <p className="tracking-normal text-(--app-text-muted)">
            {copyright}
          </p>

          <div className="flex flex-row items-center gap-5 sm:gap-6">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className="text-(--app-text-muted) transition-colors duration-200 hover:text-(--app-text)"
                >
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;