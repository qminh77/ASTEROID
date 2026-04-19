import { CSSProperties, useRef } from "react";
import { useParallax } from "./hooks/useParallax";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useSpaceCanvas } from "./hooks/useSpaceCanvas";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface HeroButton {
  label: string;
  href: string;
  variant: ButtonVariant;
  external: boolean;
}

interface RoadmapStage {
  stage: string;
  title: string;
  description: string;
}

interface CommunityCard {
  title: string;
  description: string;
  buttonLabel: string;
  buttonVariant: Exclude<ButtonVariant, "tertiary">;
  link: string;
}

interface MemeOrbiter {
  className: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  tilt: number;
}

const heroButtons: HeroButton[] = [
  { label: "BUY $FLOKI", href: "#community", variant: "primary", external: false },
  {
    label: "VIEW ON DEXSCREENER",
    href: "https://dexscreener.com",
    variant: "secondary",
    external: true
  },
  {
    label: "JOIN TELEGRAM",
    href: "https://t.me/asteroidflokitg",
    variant: "tertiary",
    external: true
  }
];

const roadmap: RoadmapStage[] = [
  {
    stage: "Stage 01",
    title: "Ignition",
    description: "Launch branding, social channels, and community pilot activation."
  },
  {
    stage: "Stage 02",
    title: "Orbit Entry",
    description: "DEX profile push, meme campaign waves, and holder growth acceleration."
  },
  {
    stage: "Stage 03",
    title: "Solar Blast",
    description: "Partnership collabs, creator expansions, and sustained trend momentum."
  },
  {
    stage: "Stage 04",
    title: "Galaxy Dominance",
    description: "Mass-scale community expansion and cross-ecosystem visibility."
  }
];

const communityCards: CommunityCard[] = [
  {
    title: "Telegram HQ",
    description: "Join the ASTEROID FLOKI mission room for real-time launch operations.",
    buttonLabel: "JOIN TELEGRAM",
    buttonVariant: "primary",
    link: "https://t.me/asteroidflokitg"
  },
  {
    title: "Trading View",
    description: "Track liquidity, chart momentum, and market action instantly.",
    buttonLabel: "VIEW ON DEXSCREENER",
    buttonVariant: "secondary",
    link: "https://dexscreener.com"
  }
];

const memeOrbiters: MemeOrbiter[] = [
  { className: "orbit-a", duration: 11, delay: 0, size: 62, opacity: 0.9, tilt: 4 },
  { className: "orbit-b", duration: 15, delay: -2.2, size: 50, opacity: 0.82, tilt: -8 },
  { className: "orbit-c", duration: 18, delay: -7.1, size: 68, opacity: 0.74, tilt: 7 },
  { className: "orbit-d", duration: 13.5, delay: -4, size: 46, opacity: 0.8, tilt: -4 },
  { className: "orbit-e", duration: 20, delay: -10, size: 58, opacity: 0.68, tilt: 11 },
  { className: "orbit-f", duration: 16.5, delay: -5.4, size: 54, opacity: 0.76, tilt: -10 }
];

const memeTickerPhrases: string[] = [
  "DOG IN SPACE ENERGY",
  "MEME THRUST: MAXIMUM",
  "NO BRAKES, ONLY ORBIT",
  "FLYING TO THE NEXT GALAXY",
  "0/0 FINAL TAX",
  "ASTEROID FLOKI TAKEOVER"
];

const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <header className="section-head" data-reveal>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
  </header>
);

const getOrbiterStyle = (orbiter: MemeOrbiter): CSSProperties =>
  ({
    "--orbit-duration": `${orbiter.duration}s`,
    "--orbit-delay": `${orbiter.delay}s`,
    "--orbit-size": `${orbiter.size}px`,
    "--orbit-opacity": orbiter.opacity.toString(),
    "--orbit-tilt": `${orbiter.tilt}deg`
  }) as CSSProperties;

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSpaceCanvas(canvasRef);
  useParallax();
  useRevealOnScroll();

  return (
    <div className="page">
      <canvas id="space-canvas" ref={canvasRef} aria-hidden="true" />

      <div className="nebula nebula-one" data-parallax data-speed="0.07" aria-hidden="true" />
      <div className="nebula nebula-two" data-parallax data-speed="-0.05" aria-hidden="true" />
      <div className="nebula nebula-three" data-parallax data-speed="0.09" aria-hidden="true" />

      <span className="shooting-star star-1" aria-hidden="true" />
      <span className="shooting-star star-2" aria-hidden="true" />
      <span className="shooting-star star-3" aria-hidden="true" />
      <span className="shooting-star star-4" aria-hidden="true" />

      <header className="topbar glass">
        <a href="#hero" className="brand">
          ASTEROID FLOKI
        </a>
        <nav className="nav-links">
          <a href="#story">Story</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#community">Community</a>
        </nav>
        <a
          href="https://t.me/asteroidflokitg"
          target="_blank"
          rel="noreferrer"
          className="mini-cta"
        >
          Join Telegram
        </a>
      </header>

      <main>
        <section id="hero" className="section hero">
          <article className="hero-copy" data-reveal>
            <p className="eyebrow">NASA-level meme coin visuals</p>
            <h1>ASTEROID FLOKI</h1>
            <p className="supply-line">1,000,000 TOTAL SUPPLY • 0/0 FINAL TAX</p>
            <p className="hero-text">
              High-velocity meme energy powered by an interstellar narrative. ASTEROID FLOKI blends
              elite branding, cosmic chaos, and community momentum into one cinematic launch.
            </p>

            <div className="cta-row">
              {heroButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href}
                  className={`btn btn-${button.variant}`}
                  target={button.external ? "_blank" : undefined}
                  rel={button.external ? "noreferrer" : undefined}
                >
                  {button.label}
                </a>
              ))}
            </div>

            <div className="hero-meta glass">
              <div>
                <span className="meta-label">Total Supply</span>
                <strong>1,000,000</strong>
              </div>
              <div>
                <span className="meta-label">Tax</span>
                <strong>0/0 Final Tax</strong>
              </div>
            </div>

            <div className="meme-ticker glass" data-reveal>
              <div className="meme-ticker-track" aria-hidden="true">
                {[...memeTickerPhrases, ...memeTickerPhrases].map((phrase, index) => (
                  <span key={`${phrase}-${index}`}>🔥 {phrase} 🐶</span>
                ))}
              </div>
            </div>
          </article>

          <figure className="hero-visual" data-reveal>
            <div className="hero-ring" aria-hidden="true" />
            <div className="hero-trail" aria-hidden="true" />
            <img
              className="hero-image"
              src="/hero-main.jpg"
              alt="Elon Musk in astronaut suit with Floki dog riding asteroid through deep space"
            />
            <div className="meme-orbit-field" aria-hidden="true">
              {memeOrbiters.map((orbiter) => (
                <span className={`meme-orbiter ${orbiter.className}`} style={getOrbiterStyle(orbiter)} key={orbiter.className}>
                  <span className="meme-orbiter-inner">
                    <img src="/nobg.png" alt="" />
                  </span>
                </span>
              ))}
            </div>
            <div className="meme-stickers" aria-hidden="true">
              <span className="meme-sticker sticker-1">WEN MOON?</span>
              <span className="meme-sticker sticker-2">DOGE SPEED</span>
              <span className="meme-sticker sticker-3">MEME BOOST</span>
            </div>
            <div className="floating-asteroid asteroid-a" data-parallax data-speed="0.12" aria-hidden="true" />
            <div className="floating-asteroid asteroid-b" data-parallax data-speed="-0.1" aria-hidden="true" />
            <div className="floating-asteroid asteroid-c" data-parallax data-speed="0.08" aria-hidden="true" />
          </figure>
        </section>

        <section id="story" className="section">
          <SectionHeader eyebrow="Origin Signal" title="THE ASTEROID SHIBA STORY" />
          <div className="story-layout">
            <article className="glass story-copy" data-reveal>
              <p className="highlight-quote">
                Asteroid Shiba design was inspired by one of Elon Musk&apos;s tweets about his
                Shiba Inu, Floki.
              </p>
              <p>
                From tweet energy to cosmic movement, ASTEROID FLOKI carries the same playful spirit
                with a premium, cinematic execution built for serious attention.
              </p>
            </article>
            <figure className="glass screenshot-frame story-reference-card" data-reveal>
              <blockquote>
                Asteroid Shiba design was inspired by one of Elon Musk&apos;s tweets about his
                Shiba Inu, Floki. 🐶
              </blockquote>
            </figure>
          </div>
        </section>

        <section id="tokenomics" className="section">
          <SectionHeader eyebrow="Mission Stats" title="TOKENOMICS" />
          <div className="token-grid">
            <article className="glass token-card" data-reveal>
              <div className="token-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" />
                  <path d="M14 24h20M24 14v20" />
                </svg>
              </div>
              <h3>Total Supply</h3>
              <p>1,000,000</p>
            </article>

            <article className="glass token-card" data-reveal>
              <div className="token-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <rect x="11" y="11" width="26" height="26" rx="7" />
                  <path d="M17 24h14M24 17v14" />
                </svg>
              </div>
              <h3>Tax</h3>
              <p>0/0 Final Tax</p>
            </article>
          </div>
        </section>

        <section id="roadmap" className="section">
          <SectionHeader eyebrow="Flight Timeline" title="ROADMAP" />
          <div className="timeline">
            {roadmap.map((item) => (
              <article key={item.stage} className="glass timeline-item" data-reveal>
                <span className="stage">{item.stage}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="community" className="section">
          <SectionHeader eyebrow="Broadcast Channel" title="COMMUNITY & SOCIALS" />
          <div className="community-grid">
            {communityCards.map((card) => (
              <article key={card.title} className="glass community-card" data-reveal>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href={card.link} target="_blank" rel="noreferrer" className={`btn btn-${card.buttonVariant} full`}>
                  {card.buttonLabel}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>ASTEROID FLOKI • 1,000,000 Total Supply • 0/0 Final Tax</p>
        <p>
          Telegram:
          <a href="https://t.me/asteroidflokitg" target="_blank" rel="noreferrer">
            https://t.me/asteroidflokitg
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
