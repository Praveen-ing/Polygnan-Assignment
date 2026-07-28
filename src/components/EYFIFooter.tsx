import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';

export const EYFIFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#232323] py-12 sm:py-16 px-4 sm:px-6 bg-[#0A0A0A] font-sans text-xs sm:text-sm">
      <div className="mx-auto max-w-6xl grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {/* Col 1: Brand & Polygnan */}
        <div className="text-left space-y-3">
          <div className="font-display font-black text-2xl text-[#C4F62E]">
            EYFI<span className="text-[#F5F3EF]">.</span>
          </div>
          <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
            India's largest Student Earning Challenge & Ambassador Ladder.<br />
            An initiative by{' '}
            <a
              href="https://www.polygnan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B2C] hover:underline font-semibold"
            >
              Polygnan
            </a>.
          </p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-md bg-[#141414] border border-[#232323] text-[11px] font-mono-stats text-[#C4F62E]">
              ✦ Polygnan Initiative
            </span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col gap-3 text-left">
          <span className="text-sm font-semibold text-[#F5F3EF] font-display">Quick Links</span>
          <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#A39E93]">
            <a href="#ladder" className="hover:text-[#C4F62E] transition-colors">
              Ambassador Reward Ladder
            </a>
            <a href="#faq" className="hover:text-[#C4F62E] transition-colors">
              Frequently Asked Questions
            </a>
            <a
              href="https://sponsorship.eyfichallenge.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C4F62E] transition-colors"
            >
              Sponsorships
            </a>
            <a
              href="https://www.polygnan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6B2C] transition-colors"
            >
              Polygnan Foundation
            </a>
          </div>
        </div>

        {/* Col 3: Contact & Socials */}
        <div className="flex flex-col gap-4 items-start sm:items-end text-left sm:text-right">
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <a
              href="https://wa.me/917483302237?text=Hey!%20I%20want%20to%20join%20the%20EYFI%20Challenge%20waitlist."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-full border border-[#C4F62E]/60 bg-[#C4F62E]/10 text-xs sm:text-sm font-semibold text-[#F5F3EF] hover:bg-[#C4F62E]/20 transition-all"
            >
              <MessageSquare className="h-4 w-4 text-[#C4F62E]" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="mailto:contact@polygnan.org"
              className="flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-full border border-[#232323] bg-[#141414] text-xs sm:text-sm font-semibold text-[#F5F3EF] hover:border-[#333] transition-all"
            >
              <Mail className="h-4 w-4 text-[#A39E93]" />
              <span>Mail info@eyfichallenge.com</span>
            </a>
          </div>

          <div className="flex gap-4 justify-start sm:justify-end pt-1">
            <a
              href="https://www.instagram.com/eyfi_challenge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#A39E93] hover:text-[#C4F62E] transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.23.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.23.41-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.23-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.23-.41 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.44.71-2.1 1.37A5.91 5.91 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.78.71 1.44 1.37 2.1a5.91 5.91 0 0 0 2.1 1.37c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.91 5.91 0 0 0 2.1-1.37 5.91 5.91 0 0 0 1.37-2.1c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.91 5.91 0 0 0-1.37-2.1A5.91 5.91 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/showcase/eyfi-challenge/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#A39E93] hover:text-[#C4F62E] transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-[#232323] text-xs text-[#A39E93] flex flex-wrap justify-between gap-2">
        <span>© 2026 EYFI Challenge · Earn Your First Income</span>
        <span>Made with ♥ for Indian students across all campuses</span>
      </div>
    </footer>
  );
};

