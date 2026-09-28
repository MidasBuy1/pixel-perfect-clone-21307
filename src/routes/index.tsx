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

import afterglowAudio from "@/assets/audio/afterglow.mp3.asset.json";
import lostInTheBeatAudio from "@/assets/audio/lost-in-the-beat.mp3.asset.json";
import pinkHorizonAudio from "@/assets/audio/pink-horizon.mp3.asset.json";
import musicBackground from "@/assets/music-background.jpg";
import { Button } from "@/components/ui/button";

const defaultTrack = { title: "Lost In The Beat", artist: "ANU Sessions", src: lostInTheBeatAudio.url, quality: "320 KBPS" };

const tracks = [
  defaultTrack,
  { title: "Pink Horizon", artist: "Velvet Drive", src: pinkHorizonAudio.url, quality: "HQ AUDIO" },
  { title: "Afterglow", artist: "Midnight Bloom", src: afterglowAudio.url, quality: "320 KBPS" },
];

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(58);
  const [previousVolume, setPreviousVolume] = useState(58);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const track = tracks[trackIndex] ?? defaultTrack;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    audio.muted = volume === 0;
  }, [volume]);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  };

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await startPlayback();
    else audio.pause();
  };

  const pickRandomTrack = () => {
    if (tracks.length < 2) return trackIndex;
    let nextIndex = trackIndex;
    while (nextIndex === trackIndex) nextIndex = Math.floor(Math.random() * tracks.length);
    return nextIndex;
  };

  const changeTrack = (nextIndex: number) => {
    setCurrentTime(0);
    setDuration(0);
    setTrackIndex((nextIndex + tracks.length) % tracks.length);
  };

  const playNext = () => changeTrack(shuffle ? pickRandomTrack() : trackIndex + 1);

  const playPrevious = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    changeTrack(shuffle ? pickRandomTrack() : trackIndex - 1);
  };

  const setAudioVolume = (nextVolume: number) => {
    const audio = audioRef.current;
    setVolume(nextVolume);
    if (nextVolume > 0) setPreviousVolume(nextVolume);
    if (audio) {
      audio.volume = nextVolume / 100;
      audio.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => setAudioVolume(volume === 0 ? previousVolume || 58 : 0);

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-body text-foreground">
      <audio
        ref={audioRef}
        src={track.src}
        loop={repeat}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          event.currentTarget.volume = volume / 100;
          if (playing) void event.currentTarget.play();
        }}
        onEnded={() => {
          if (!repeat) playNext();
        }}
      />
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
          <div className="relative flex items-center justify-between">
            <p className="font-script text-4xl text-primary">Now Playing ♡</p>
            <Button variant="ghost" aria-label="Open playlist" aria-expanded={playlistOpen} onClick={() => setPlaylistOpen((open) => !open)}>
              <ListMusic className="size-5" />
            </Button>
            {playlistOpen && (
              <div className="absolute right-0 top-12 z-30 w-72 rounded-lg border border-player-border bg-player-panel/95 p-2 shadow-player-panel backdrop-blur-xl">
                <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Playlist</p>
                {tracks.map((item, index) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className={`h-auto w-full justify-start rounded-md px-3 py-2 text-left ${index === trackIndex ? "bg-primary/10 text-primary" : ""}`}
                    onClick={() => {
                      changeTrack(index);
                      setPlaylistOpen(false);
                    }}
                  >
                    <span className="mr-3 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10"><Music2 className="size-3.5" /></span>
                    <span className="min-w-0"><span className="block truncate text-xs font-semibold">{item.title}</span><span className="block truncate text-[10px] text-muted-foreground">{item.artist}</span></span>
                  </Button>
                ))}
              </div>
            )}
          </div>
          <h2 className="mt-2 text-3xl font-bold">{track.title}</h2>
          <p className="mt-1 text-sm text-primary">{track.artist}</p>

          <label className="mt-7 block">
            <span className="sr-only">Track progress</span>
            <input className="player-range w-full" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} />
          </label>
          <div className="mt-1 flex justify-between text-[11px] font-medium"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>

          <div className="mt-5 flex justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em]">
            <span className="flex items-center gap-2 rounded-full border border-player-border bg-player-surface/50 px-3 py-1.5"><Music2 className="size-3 text-primary" /> {track.quality}</span>
            <span className="flex items-center gap-2 rounded-full border border-player-border bg-player-surface/50 px-3 py-1.5"><b className="text-primary">HQ</b> High quality</span>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <Button variant="player" className={shuffle ? "bg-primary text-primary-foreground" : ""} aria-label="Shuffle" aria-pressed={shuffle} onClick={() => setShuffle((enabled) => !enabled)}><Shuffle className="size-5" /></Button>
            <Button variant="player" aria-label="Previous track" onClick={playPrevious}><SkipBack className="size-5 fill-current" /></Button>
            <Button variant="play" onClick={() => void togglePlayback()} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause className="size-9 fill-current" /> : <Play className="ml-1 size-9 fill-current" />}
            </Button>
            <Button variant="player" aria-label="Next track" onClick={playNext}><SkipForward className="size-5 fill-current" /></Button>
            <Button variant="player" className={repeat ? "bg-primary text-primary-foreground" : ""} aria-label="Repeat" aria-pressed={repeat} onClick={() => setRepeat((enabled) => !enabled)}><Repeat2 className="size-5" /></Button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button type="button" variant="ghost" size="icon" className="size-7" aria-label={volume === 0 ? "Unmute" : "Mute"} onClick={toggleMute}>
              {volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </Button>
            <input className="player-range w-full" aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(event) => setAudioVolume(Number(event.target.value))} />
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
