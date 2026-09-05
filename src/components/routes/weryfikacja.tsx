import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { znajdzKod, WERYFIKACJA_SCIEZKA } from "@/lib/kody";

export const Route = createFileRoute("/weryfikacja")({
  head: () => ({
    meta: [
      { title: "weryfikacja" },
      { name: "description", content: "Panel weryfikacji kodu." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "weryfikacja" },
      { property: "og:description", content: "Panel weryfikacji kodu." },
    ],
  }),
  component: Weryfikacja,
});

function Weryfikacja() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [wartosc, setWartosc] = useState("");
  const [komunikat, setKomunikat] = useState<{ tresc: string; blad: boolean } | null>(null);
  const [obraz, setObraz] = useState<string | null>(null);

  useEffect(() => {
    void navigate({ to: WERYFIKACJA_SCIEZKA, replace: true });
  }, [navigate]);

  const sprawdz = (e: React.FormEvent) => {
    e.preventDefault();
    const trafienie = znajdzKod(wartosc);
    setWartosc("");
    inputRef.current?.focus();

    if (!trafienie) {
      setObraz(null);
      setKomunikat({ tresc: "BLAD: Podany kod jest nieprawidlowy!", blad: true });
      return;
    }

    if (trafienie.reakcja === "tekst") {
      setObraz(null);
      setKomunikat({ tresc: trafienie.tresc, blad: false });
      return;
    }

    if (trafienie.reakcja === "okienko") {
      setObraz(null);
      setKomunikat(null);
      window.alert(trafienie.tresc);
      return;
    }

    if (trafienie.reakcja === "obraz") {
      setObraz(trafienie.plik);
      setKomunikat(trafienie.tresc ? { tresc: trafienie.tresc, blad: false } : null);
      return;
    }

    setObraz(null);
    setKomunikat(null);
    if (/^https?:\/\//i.test(trafienie.cel)) {
      window.location.href = trafienie.cel;
    } else {
      void navigate({ to: trafienie.cel });
    }
  };

  return (
    <div className="win-tlo">
      <div className="win-okno">
        <div className="win-pasek">weryfikacja</div>
        <div className="px-4 py-4 text-center">
          <p className="win-etykieta">WPROWADŹ KOD WERYFIKACYJNY</p>
          <form onSubmit={sprawdz} className="mt-3">
            <input
              ref={inputRef}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              value={wartosc}
              onChange={(e) => setWartosc(e.target.value)}
              className="win-pole"
              aria-label="kod weryfikacyjny"
            />
            <div className="mt-3">
              <button type="submit" className="win-przycisk">
                OK
              </button>
            </div>
          </form>
          {komunikat && (
            <pre
              className={`win-komunikat ${komunikat.blad ? "win-komunikat-blad" : ""}`}
              role="status"
            >
              {komunikat.tresc}
            </pre>
          )}
          {obraz && (
            <div className="mt-3">
              <img src={obraz} alt="" className="mx-auto max-w-full border border-current" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
