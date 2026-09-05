import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Strona główna" },
  { to: "/menu", label: "Nasze Menu" },
  { to: "/galeria", label: "Galeria" },
  { to: "/ksiega-gosci", label: "Księga Gości" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

function MidiPlayer() {
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => stopRef.current?.(), []);

  const toggle = () => {
    if (playing) {
      stopRef.current?.();
      stopRef.current = null;
      setPlaying(false);
      return;
    }
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    void ctx.resume();

    const melody = [523, 587, 659, 784, 659, 587, 523, 440];
    let step = 0;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    gain.connect(ctx.destination);

    const timer = window.setInterval(() => {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = melody[step % melody.length] ?? 523;
      osc.connect(gain);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
      step += 1;
    }, 260);

    stopRef.current = () => {
      window.clearInterval(timer);
      gain.disconnect();
    };
    setPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="retro-bar rounded px-3 py-1 text-xs font-bold text-retro-ink"
    >
      {playing ? "◼ zatrzymaj muzyczkę MIDI" : "► włącz muzyczkę MIDI"}
    </button>
  );
}

export function RetroLayout({
  children,
  title,
  showChrome = true,
}: {
  children: ReactNode;
  title: string;
  showChrome?: boolean;
}) {



  return (
    <div className="retro-page min-h-screen px-2 py-4">
      <div className="mx-auto w-full max-w-[980px]">
        <header className="retro-panel retro-header px-4 pb-5 pt-6 text-center">
          <h1 className="retro-title text-3xl leading-[1.1] sm:text-[3.2rem]">{title}</h1>
          <p className="mt-2 text-sm font-black text-retro-ink/80">
            Kawa, ciasta, od 2002 roku
          </p>
          {showChrome && (
            <div className="mt-3 flex justify-center">
              <MidiPlayer />
            </div>
          )}
        </header>

        <nav className="retro-bar mt-3 flex flex-wrap justify-center gap-1 px-2 py-2 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded border-2 border-retro-frame bg-retro-panel/90 px-4 py-2 font-bold text-retro-link shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-retro-panel"
              activeProps={{ className: "underline" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="retro-panel mt-3 overflow-hidden px-2 py-1">
          <div className="retro-marquee whitespace-nowrap text-sm text-retro-accent">
            *** jest szarlotka na cieplo *** strona najlepiej wyglada w Internet Explorer 6, rozdzielczosc 800x600 ***
          </div>
        </div>

        <main className="retro-panel mt-3 px-4 py-5 text-[15px] leading-relaxed">{children}</main>

        <footer className="retro-panel mt-3 px-4 py-4 text-center text-xs">
          <p>strona: SEBA_DESIGN 2005 :: kopiowanie zdjec zabronione</p>
          <p className="retro-secret mt-4 select-text text-[11px]">
            Oni nie chcą tylko kawy. Oni wiedzą, co jest w piwnicy.
          </p>
        </footer>
      </div>
    </div>
  );
}
