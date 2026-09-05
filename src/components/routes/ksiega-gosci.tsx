import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RetroLayout } from "@/components/RetroLayout";
import { WERYFIKACJA_SCIEZKA } from "@/lib/kody";

export const Route = createFileRoute("/ksiega-gosci")({
  head: () => ({
    meta: [
      { title: "Księga Gości — Kawiarnia u Jana" },
      {
        name: "description",
        content: "Zostaw wpis w naszej księdze gości i przeczytaj opinie stałych bywalców.",
      },
      { property: "og:title", content: "Księga Gości — Kawiarnia u Jana" },
      {
        property: "og:description",
        content: "Opinie gości Kawiarni u Jana z lat 2003-2005.",
      },
    ],
  }),
  component: KsiegaGosci,
});

const WPISY = [
  { kto: "Basia_84", data: "2005-04-02", tresc: "szarlotka super, tylko czekalam 20 minut :) polecam" },
  { kto: "marek.k", data: "2005-03-18", tresc: "obsluga ok, ale ten ekspres syczy jak lokomotywa" },
  {
    kto: "anonim",
    data: "2005-03-13",
    tresc: "bylem w czwartek pod wieczor. ktos chodzil na zapleczu a pan jan mowil ze jest sam. dziwne",
  },
  { kto: "Zofia W.", data: "2004-11-05", tresc: "Chodzę tu od dwóch lat i zawsze to samo, i dobrze." },
];

const HASLO = "chomiki obserwuja kazdy twoj krok";

function normalizuj(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function KsiegaGosci() {
  const navigate = useNavigate();
  const [tresc, setTresc] = useState("");
  const [blad, setBlad] = useState<string | null>(null);
  const [wyslane, setWyslane] = useState(false);

  const wyslij = (e: React.FormEvent) => {
    e.preventDefault();
    if (normalizuj(tresc) === HASLO) {
      setWyslane(false);
      setBlad("BLAD 0x4A4E: nie mozna zapisac wpisu do bazy.\nWERYFIKACJA WYMAGANA.");
      window.setTimeout(() => {
        void navigate({ to: WERYFIKACJA_SCIEZKA });
      }, 2200);
      return;
    }
    setBlad(null);
    setWyslane(true);
    setTresc("");
  };

  return (
    <RetroLayout title="Księga Gości">
      <p className="text-sm">
        Można napisać, co się myśli o kawie i o ciastach. Czytam wszystko sam, więc wpisy pokazują się z opóźnieniem.
      </p>

      <form onSubmit={wyslij} className="retro-guestbook-form">
        <label className="block text-sm font-bold" htmlFor="opinia">
          Twoja opinia:
        </label>
        <textarea
          id="opinia"
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          rows={4}
          className="retro-guestbook-textarea"
        />
        <button type="submit" className="retro-guestbook-submit retro-bar rounded px-4 py-1 text-sm font-bold">
          Wyślij wpis
        </button>
      </form>

      {wyslane && (
        <p className="mt-3 text-sm text-retro-accent">
          Dzięki. Wpis pokaże się, jak go przeczytam.
        </p>
      )}

      {blad && (
        <pre className="retro-terminal mt-3 whitespace-pre-wrap rounded p-3 text-xs">
          {blad}
          {"\n"}Przekierowanie...
        </pre>
      )}

      <hr className="my-5 border-t-2 border-retro-frame" />

      <h2 className="retro-title text-xl">Ostatnie wpisy</h2>
      <ul className="retro-guestbook-entries mt-2 space-y-3 text-sm">
        {WPISY.map((w) => (
          <li key={w.data} className="retro-guestbook-entry border-2 border-dotted border-retro-frame p-2">
            <p className="font-bold text-retro-accent">
              {w.kto} <span className="font-normal text-retro-ink">— {w.data}</span>
            </p>
            <p>{w.tresc}</p>
          </li>
        ))}
      </ul>
    </RetroLayout>
  );
}
