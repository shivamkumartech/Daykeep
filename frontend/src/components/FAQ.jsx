import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What is Daykeep?",
    a: "Daykeep is a quiet, minimalist note-taking space designed to help you capture thoughts, ideas, plans, and reminders without clutter, friction, or bloated features.",
  },
  {
    q: "Is Daykeep free to use?",
    a: "Yes. Daykeep is completely free. You can create an account and immediately start writing, keeping, and managing your notes without subscriptions or paywalls.",
  },
  {
    q: "Can I access my notes across different devices?",
    a: "Yes. Your notes are securely saved to your account. Simply sign in from any modern web browser on your phone, tablet, or desktop to view and edit your notes anytime.",
  },
  {
    q: "Are my notes private and secure?",
    a: "Yes. Your notes are strictly tied to your authenticated account. Only you can view, edit, or delete them. We do not read, analyze, or sell your personal notes.",
  },
  {
    q: "Why is Daykeep intentionally simple and AI-free?",
    a: "Daykeep is built for focus and calm. There are no chatbots, autocomplete interruptions, or invasive algorithms trying to finish your sentences. It’s an honest, distraction-free space for your own thinking.",
  },
  {
    q: "Is there a limit to how many notes I can write?",
    a: "You can create as many notes as you want. Each note supports up to 10,000 characters with a 100-character title—plenty of room for both quick sparks of inspiration and in-depth thoughts.",
  },
  {
    q: "How do I organize and manage my notes?",
    a: "Daykeep keeps your workspace clean without cumbersome folders or complex tag setups. All your notes are neatly organized in your personal dashboard with creation and update timestamps, accessible with one click whenever you need to edit or delete.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-(--app-border) px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          {/* Label */}
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-(--app-text-muted)">
              FAQs
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-(--app-text-secondary)">
              Things people ask before they start writing.
            </p>
          </div>

          {/* Accordion */}
          <div className="border-t border-(--app-border)">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              const contentId = `faq-answer-${i}`;

              return (
                <div key={i} className="border-b border-(--app-border)">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="group flex w-full cursor-pointer items-center justify-between gap-8 py-6 text-left"
                  >
                    <span
                      className={`text-sm font-medium tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? "text-(--app-text)"
                          : "text-(--app-text) group-hover:text-(--app-text-secondary)"
                      }`}
                    >
                      {item.q}
                    </span>

                    <Plus
                      className={`h-4 w-4 shrink-0 transition-all duration-200 ease-out ${
                        isOpen
                          ? "rotate-45 text-(--app-text)"
                          : "text-(--app-text-muted) group-hover:text-(--app-text)"
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>

                  {/* Answer — animated with grid-template-rows trick */}
                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-(--app-text-secondary)">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;