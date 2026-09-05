import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RetroLayout } from "@/components/RetroLayout";
import lada from "@/assets/lada.jpg";
import stoliki from "@/assets/stoliki.jpg";
import ekspres from "@/assets/ekspres.jpg";
import drzwi from "@/assets/drzwi.jpg";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria zdjęć wnętrza — Kawiarnia u Jana" },
      {
        name: "description",
        content: "Zdjęcia naszej kawiarni: lada z ciastami, stoliki przy oknie, ekspres i zaplecze.",
      },
      { property: "og:title", content: "Galeria zdjęć wnętrza — Kawiarnia u Jana" },
      {
        property: "og:description",
        content: "Cztery zdjęcia z wnętrza Kawiarni u Jana. Kliknij miniaturkę, aby powiększyć.",
      },
    ],
  }),
  component: Galeria,
});

const ZDJECIA = [
  { src: lada, tytul: "Lada z ciastami", plik: "zdjecie_01_lada.jpg" },
  { src: stoliki, tytul: "Stoliki przy oknie", plik: "zdjecie_02_stoliki.jpg" },
  { src: ekspres, tytul: "Nasz ekspres", plik: "zdjecie_03_ekspres.jpg" },
  { src: drzwi, tytul: "Drzwi na zaplecze", plik: "zdjecie_04_drzwi.jpg", uszkodzone: true },
];

function Galeria() {
  const [otwarte, setOtwarte] = useState<number | null>(null);
  const zdjecie = otwarte === null ? null : ZDJECIA[otwarte];

  return (
    <RetroLayout title="Galeria">
      <p className="text-sm">
        Zdjęcia są duże, na modemie się ładują długo. Kliknij w małe, otworzy się okienko.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ZDJECIA.map((z, i) => (
          <button
            key={z.plik}
            type="button"
            onClick={() => setOtwarte(i)}
            className="border-4 border-double border-retro-frame bg-retro-page p-1 text-xs"
          >
            <img
              src={z.src}
              alt={z.tytul}
              loading="lazy"
              width={640}
              height={512}
              className="h-24 w-full object-cover"
            />
            <span className="mt-1 block">{z.tytul}</span>
          </button>
        ))}
      </div>

      {zdjecie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-ink/70 p-4">
          <div className="retro-panel max-w-lg">
            <div className="retro-bar flex items-center justify-between px-2 py-1 text-xs font-bold">
              <span>{zdjecie.plik}</span>
              <button type="button" onClick={() => setOtwarte(null)} className="px-2">
                X
              </button>
            </div>
            <div className="p-2">
              <img
                src={zdjecie.src}
                alt={zdjecie.tytul}
                width={640}
                height={512}
                className="w-full"
              />
              <p className="mt-2 text-sm">{zdjecie.tytul}</p>
              {zdjecie.uszkodzone && (
                <p className="mt-2 text-xs text-retro-accent">
                  To zdjęcie wyszło popsute, coś się stało przy zapisie. Kto chce, może pobrać:{" "}
                  <a href="/images/zdjecie_04_drzwi.jpg" download className="retro-link">
                    zdjecie_04_drzwi.jpg
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs">
        Robione aparatem 2 megapiksele, pożyczonym. Za popsute pliki nie odpowiadam.
      </p>
    </RetroLayout>
  );
}
