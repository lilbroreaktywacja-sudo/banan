import { createFileRoute, Link } from "@tanstack/react-router";
import { RetroLayout } from "@/components/RetroLayout";
import jan from "@/assets/jan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kawiarnia u Jana — kawa i ciasta od 2002 roku" },
      {
        name: "description",
        content:
          "Oficjalna strona Kawiarni u Jana. Kawa parzona, wuzetka i szarlotka na ciepło według receptury babci.",
      },
      { property: "og:title", content: "Kawiarnia u Jana — kawa i ciasta od 2002 roku" },
      {
        property: "og:description",
        content: "Kawa parzona, wuzetka i szarlotka na ciepło. Zapraszamy codziennie!",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <RetroLayout title="Witamy na stronie Kawiarni u Jana!">
      <div className="retro-home-intro flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img
          src={jan}
          alt="Jan, właściciel kawiarni, z filiżanką kawy"
          width={512}
          height={512}
          className="retro-home-image shrink-0 border-4 border-double border-retro-frame [image-rendering:pixelated]"
        />
        <div className="space-y-3">
          <p>
            Nasza kawiarnia powstała z miłości do tradycji. Od 2002 roku parzymy dla Was najlepszą
            kawę w mieście i pieczemy ciasta według tajnej receptury mojej babci...
          </p>
          <p>
            Otwarte od 8 do 19, w niedziele nie. Kawa z ekspresu albo parzona, jak kto lubi. Kto raz
            wejdzie, ten wraca. — <strong>Jan</strong>
          </p>
          <p className="text-retro-accent">
            <span className="retro-blink">NOWE!</span> Wstawiłem{" "}
            <Link to="/galeria" className="retro-link">
              zdjęcia
            </Link>
            . Można też coś napisać w{" "}
            <Link to="/ksiega-gosci" className="retro-link">
              księdze gości
            </Link>
            , tylko bez brzydkich słów.
          </p>
        </div>
      </div>

      <hr className="my-5 border-t-2 border-retro-frame" />

      <h2 className="retro-title text-xl">Aktualności</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
        <li>12.03.2005 — Zaplecze zamknięte. Proszę tam nie wchodzić, nawet po serwetki.</li>
        <li>04.02.2005 — Są nowe krzesła przy oknie, te stare się rozlatywały.</li>
        <li>19.12.2004 — Pierniczki na święta, po 50 gr sztuka.</li>
      </ul>
    </RetroLayout>
  );
}
