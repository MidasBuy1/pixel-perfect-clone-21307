import { createFileRoute } from "@tanstack/react-router";
import {
  Clock3,
  Heart,
  ListMusic,
  Music2,
  Pause,
  Play,
  Repeat2,
  ShieldCheck,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import song1 from "@/assets/audio/akhok-madrasa.mp3.asset.json";
import musicBackground from "@/assets/music-background.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAIKO × MUSIC — Premium Music Experience" },
      { name: "description", content: "Your ultimate music companion, active around the clock." },
      { property: "og:title", content: "SAIKO × MUSIC" },
      { property: "og:description", content: "A premium, always-on music experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tracks = [
  { title: "اخوك مدرسه لما بروق بسبب حروق", artist: "Mohamed Elbosely feat. Ahmed Elswesy", src: song1.url },
];

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "00:00";
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function Index() {
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const autoPlay = useRef(false);
  const seekingRef = useRef(false);
  const track = tracks[index] ?? tracks[0]!;

  useEffect(() => { if (audioRef.current) audioRef.current.volume = muted ? 0 : volume; }, [volume, muted]);
  useEffect(() => {
    const a = audioRef.current;
    if (a && a.readyState >= 1 && Number.isFinite(a.duration)) setDuration(a.duration);
  }, [index]);
  useEffect(() => {
    setCurrentTime(0);
    if (autoPlay.current) audioRef.current?.play().catch(() => {});
  }, [index]);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  };
  const changeTrack = (i: number, play: boolean) => {
    autoPlay.current = play;
    if (i === index) { if (audioRef.current) { audioRef.current.currentTime = 0; if (play) audioRef.current.play().catch(() => {}); } }
    else setIndex(i);
  };
  const nextIndex = () => shuffle && tracks.length > 1
    ? (index + 1 + Math.floor(Math.random() * (tracks.length - 1))) % tracks.length
    : (index + 1) % tracks.length;
  const playNext = () => changeTrack(nextIndex(), playing);
  const playPrevious = () => {
    if ((audioRef.current?.currentTime ?? 0) > 3) { audioRef.current!.currentTime = 0; return; }
    changeTrack((index - 1 + tracks.length) % tracks.length, playing);
  };
  const onEnded = () => {
    if (repeat) { changeTrack(index, true); return; }
    if (tracks.length > 1) changeTrack(nextIndex(), true);
  };

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
            <h1 className="mt-[-10px] text-[clamp(3.4rem,7.4vw,7rem)] font-black italic leading-[0.7] tracking-tight text-primary drop-shadow-sm">
              SAIKO
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
          <audio
            ref={audioRef}
            src={track.src}
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => { if (!seekingRef.current) setCurrentTime(e.currentTarget.currentTime); }}
            onLoadedMetadata={(e) => { setDuration(e.currentTarget.duration); e.currentTarget.volume = muted ? 0 : volume; }}
            onDurationChange={(e) => { if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration); }}
            onEnded={onEnded}
          />
          <div className="relative flex items-center justify-between">
            <p className="font-script text-4xl text-primary">Now Playing ♡</p>
            <Button variant="ghost" aria-label="Open playlist" aria-expanded={playlistOpen} onClick={() => setPlaylistOpen((open) => !open)}>
              <ListMusic className="size-5" />
            </Button>
            {playlistOpen && (
              <div className="absolute right-0 top-12 z-30 w-[min(22rem,calc(100vw-3rem))] rounded-lg border border-player-border bg-player-panel/95 p-3 shadow-player-panel backdrop-blur-xl">
                {tracks.map((t, i) => (
                  <button key={t.src} onClick={() => { changeTrack(i, true); setPlaylistOpen(false); }} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-player-surface/60 ${i === index ? "text-primary" : ""}`}>
                    <Music2 className="size-4 shrink-0" />
                    <span className="truncate font-semibold" dir="auto">{t.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <h2 className="mt-2 text-3xl font-bold" dir="auto">{track.title}</h2>
          <p className="mt-1 text-sm text-primary" dir="auto">{track.artist}</p>

          <div className="mt-7">
            <input type="range" aria-label="Seek" className="player-range w-full" min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)}
              style={{ ["--value" as string]: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              onPointerDown={() => { seekingRef.current = true; }}
              onPointerUp={() => { seekingRef.current = false; }}
              onChange={(e) => { const v = Number(e.target.value); const a = audioRef.current; if (a && Number.isFinite(v)) { a.currentTime = v; } setCurrentTime(v); }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] font-medium"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>

          <div className="mt-5 flex justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em]">
            <span className="flex items-center gap-2 rounded-full border border-player-border bg-player-surface/50 px-3 py-1.5"><Music2 className="size-3 text-primary" /> 320 KBPS</span>
            <span className="flex items-center gap-2 rounded-full border border-player-border bg-player-surface/50 px-3 py-1.5"><b className="text-primary">HQ</b> High quality</span>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <Button variant="player" aria-label="Shuffle" aria-pressed={shuffle} className={shuffle ? "text-primary ring-2 ring-primary" : ""} onClick={() => setShuffle((s) => !s)}><Shuffle className="size-5" /></Button>
            <Button variant="player" aria-label="Previous track" onClick={playPrevious}><SkipBack className="size-5 fill-current" /></Button>
            <Button variant="play" aria-label={playing ? "Pause" : "Play"} onClick={togglePlay}>
              {playing ? <Pause className="size-9 fill-current" /> : <Play className="ml-1 size-9 fill-current" />}
            </Button>
            <Button variant="player" aria-label="Next track" onClick={playNext}><SkipForward className="size-5 fill-current" /></Button>
            <Button variant="player" aria-label="Repeat" aria-pressed={repeat} className={repeat ? "text-primary ring-2 ring-primary" : ""} onClick={() => setRepeat((r) => !r)}><Repeat2 className="size-5" /></Button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button aria-label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((m) => !m)}>
              {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
            <input type="range" aria-label="Volume" className="player-range flex-1" min={0} max={1} step={0.01} value={muted ? 0 : volume}
              style={{ ["--value" as string]: `${(muted ? 0 : volume) * 100}%` }}
              onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }} />
            <Volume2 className="size-6 fill-current" aria-hidden="true" />
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
