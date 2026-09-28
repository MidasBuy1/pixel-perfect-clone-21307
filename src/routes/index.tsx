import { createFileRoute } from "@tanstack/react-router";
import {
  Clock3,
  ExternalLink,
  Heart,
  Music2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import musicBackground from "@/assets/music-background.jpg";
import { Button } from "@/components/ui/button";

const spotifyPlaylistUrl = "https://open.spotify.com/playlist/2FduSKNsipwbVXNzPEsVAk";
const spotifyEmbedUrl = "https://open.spotify.com/embed/playlist/2FduSKNsipwbVXNzPEsVAk?utm_source=generator&theme=0";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANU × MUSIC — Premium Music Experience" },
      { name: "description", content: "Your ultimate music companion, active around the clock." },
      { property: "og:title", content: "ANU × MUSIC" },
      { property: "og:description", content: "A premium, always-on music experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-body text-foreground">
      <img className="absolute inset-0 size-full object-cover object-center" src={musicBackground} alt="Woman enjoying music in a softly lit car" />
      <div className="absolute inset-0 bg-player-wash" />

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <Music2 className="absolute bottom-[9%] left-[2%] size-12 rotate-12 text-primary/75" strokeWidth={1.8} />
        <Music2 className="absolute left-[29%] top-[64%] size-8 -rotate-12 text-primary/65" strokeWidth={1.8} />
        <Heart className="absolute left-[23%] top-[42%] size-8 -rotate-12 text-primary/65" strokeWidth={1.5} />
        <Sparkles className="absolute left-[36%] top-[20%] size-5 text-primary/60" />
        <Music2 className="absolute bottom-[8%] right-[5%] size-10 -rotate-12 text-primary/45" strokeWidth={1.5} />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 px-6 pb-32 pt-8 lg:grid-cols-[1fr_1.15fr_1fr] lg:px-12 lg:pb-28 lg:pt-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex items-center gap-4">
            <Sparkles className="size-5 text-foreground" strokeWidth={1.2} />
            <p className="text-[11px] font-medium uppercase leading-5 tracking-[0.42em]">
              Your ultimate<br /><span className="text-primary">music</span> companion
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-full border border-primary/40 bg-player-dark px-5 py-2 text-[10px] uppercase tracking-[0.38em] text-primary-foreground shadow-player-pill">
            <Heart className="size-4 fill-current text-player-highlight" />
            24/7 Active
          </div>

          <div className="mt-8 lg:mt-12">
            <p className="font-script text-4xl text-primary">Welcome To</p>
            <h1 className="mt-[-10px] text-[clamp(4.7rem,8vw,8.2rem)] font-black italic leading-[0.7] text-primary drop-shadow-sm">
              ANU
            </h1>
            <div className="my-2 text-center text-7xl font-black leading-none text-primary-foreground drop-shadow-player-x">×</div>
            <h2 className="text-[clamp(4rem,7vw,7rem)] font-black italic leading-[0.7] text-primary drop-shadow-sm">MUSIC</h2>
            <div className="mt-5 bg-primary px-6 py-2 text-center text-[10px] uppercase tracking-[0.3em] text-primary-foreground shadow-player-brush">
              Premium music experience
            </div>
            <div className="mx-auto mt-8 h-8 w-56 bg-player-wave opacity-65 lg:mx-0" />
          </div>
        </div>

        <div aria-hidden="true" />

        <div className="mt-auto flex flex-col justify-end pb-7 lg:pb-20">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-script text-4xl text-primary">Now Playing ♡</p>
              <h2 className="mt-1 text-2xl font-bold">Your Spotify Playlist</h2>
            </div>
            <Button variant="player" size="icon" asChild>
              <a href={spotifyPlaylistUrl} target="_blank" rel="noreferrer" aria-label="Open playlist on Spotify">
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-player-border bg-player-panel/80 shadow-player-panel backdrop-blur-xl">
            <iframe
              title="Spotify playlist"
              src={spotifyEmbedUrl}
              width="100%"
              height="500"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>

      <section className="absolute bottom-4 left-1/2 z-20 hidden w-[min(72%,980px)] -translate-x-1/2 grid-cols-4 divide-x divide-player-border rounded-2xl border border-player-border bg-player-panel/75 px-5 py-3 shadow-player-panel backdrop-blur-xl md:grid">
        <Feature icon={<Music2 />} title="High quality" subtitle="Music" />
        <Feature icon={<Zap />} title="Fast &" subtitle="Stable" />
        <Feature icon={<ShieldCheck />} title="100%" subtitle="Secure" />
        <Feature icon={<Clock3 />} title="24/7" subtitle="Active" />
      </section>
    </main>
  );
}

function Feature({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-center gap-3 px-4">
      <span className="flex size-11 items-center justify-center rounded-full bg-player-action text-primary-foreground shadow-player-action [&>svg]:size-6">{icon}</span>
      <p className="text-xs font-semibold uppercase leading-5"><span className="text-primary">{title}</span><br />{subtitle}</p>
    </div>
  );
}
