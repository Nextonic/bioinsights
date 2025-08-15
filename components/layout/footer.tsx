// components/layout/footer.tsx
import Link from "next/link";

const nsBlue = "var(--ns-primary, #0A66FF)";
const nsCyan = "var(--ns-accent, #00E0FF)";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 border-t border-white/10">
      {/* Top: brand + quick pitch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${nsBlue}, ${nsCyan})`,
                }}
                aria-hidden
              />
              <div className="leading-tight">
                <div className="text-lg font-semibold">Bioinsights</div>
                <div className="text-xs text-white/60">by Nextonic Solutions</div>
              </div>
            </Link>

            <p className="mt-4 text-sm text-white/70 max-w-md">
              Evidence you can audit. BioInsights surfaces drug–disease, chemical–gene, and gene–disease
              relationships with provenance and confidence scoring—built for FDA-facing workflows.
            </p>

            {/* “badges” (static, no deps) */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Dot color={nsBlue} /> audit trail
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Dot color={nsBlue} /> reproducible
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Dot color={nsBlue} /> fda-aligned
              </span>
            </div>
          </div>

          {/* Columns */}
          <div className="md:col-span-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FooterCol title="suite">
              <FooterLink href="/results">demo results</FooterLink>
              <FooterLink href="/datasets">datasets</FooterLink>
              <FooterLink href="/how-it-works">how it works</FooterLink>
              <FooterLink href="/use-cases">fda use cases</FooterLink>
            </FooterCol>

            <FooterCol title="solutions">
              <FooterLink href="/use-cases#safety">safety signals</FooterLink>
              <FooterLink href="/use-cases#label-support">label support</FooterLink>
              <FooterLink href="/use-cases#device">device evidence</FooterLink>
              <FooterLink href="/use-cases#post-market">post-market</FooterLink>
            </FooterCol>

            <FooterCol title="resources">
              <FooterLink href="/privacy">privacy</FooterLink>
              <FooterLink href="/terms">terms</FooterLink>
              <FooterLink href="/how-it-works#governance">data governance</FooterLink>
              <FooterLink href="/contact">contact</FooterLink>
            </FooterCol>

            <FooterCol title="nextonic solutions">
              <div className="text-sm text-white/70">
                7467 Ridge Road<br />
                Suite 270 <br/>
                Hanover, MD 21076
              </div>
              <div className="mt-2 text-sm">
                <a href="mailto:info@nextonicsolutions.com" className="text-white/90 hover:underline">
                  info@nextonicsolutions.com
                </a>
              </div>
              <div className="mt-1 text-sm text-white/70">+1 (301) 448-8567</div>

              {/* social (inline SVGs) */}
              <div className="mt-3 flex items-center gap-3">
                {/*<IconLink href="#" label="linkedin">
                  <LinkedInIcon />
                </IconLink>
                <IconLink href="#" label="github">
                  <GitHubIcon />
                </IconLink>
                <IconLink href="#" label="x">
                  <XIcon />
                </IconLink>*/}
              </div>
            </FooterCol>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Nextonic Solutions</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/status" className="hover:text-white">Status</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-white/60">
              v2025.08 • us-east-1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- helpers ---------- */
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-wide uppercase text-white/70">{title}</div>
      <ul className="mt-3 grid gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/80 hover:text-white">
        {children}
      </Link>
    </li>
  );
}

/*function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white"
    >
      {children}
    </a>
  );
}*/

/* function Callout({ title, desc, color }: { title: string; desc: string; color: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="h-2.5 w-2.5 rounded-full mt-1.5"
        style={{ background: color }}
        aria-hidden
      />
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-sm text-white/70">{desc}</div>
      </div>
    </div>
  );
} */

function Dot({ color }: { color: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} aria-hidden />;
}

/* Icons: inline SVG so no extra deps 
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.07.86 1.95 1.95 1.95h.02A1.95 1.95 0 0 0 6.9 5.48C6.9 4.38 6.1 3.5 4.98 3.5zM3.4 8.75h3.16V20.5H3.4zM9.1 8.75H12v1.6h.05c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v7.1h-3.16v-6.3c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.3v6.4H9.1z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.17c-3.22.7-3.9-1.39-3.9-1.39-.53-1.36-1.3-1.73-1.3-1.73-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.74 1.28 3.41.98.11-.77.41-1.29.74-1.59-2.57-.29-5.28-1.28-5.28-5.68 0-1.25.45-2.27 1.2-3.07-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.17a11.1 11.1 0 0 1 5.82 0c2.22-1.48 3.2-1.17 3.2-1.17.63 1.58.23 2.75.11 3.04.75.8 1.2 1.82 1.2 3.07 0 4.41-2.72 5.38-5.31 5.66.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.9 2H21l-6.5 7.4L22 22h-6.8l-5.3-6.7L3.9 22H2l7-8-6.5-8H9l5 6.4L18.9 2zM7.2 3.5H4.7l12 15h2.6l-12-15z" />
    </svg>
  );
}*/
