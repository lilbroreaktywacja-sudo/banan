import { createFileRoute } from "@tanstack/react-router";
import { RetroLayout } from "@/components/RetroLayout";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt i godziny otwarcia — Kawiarnia u Jana" },
      {
        name: "description",
        content: "Adres, telefon i godziny otwarcia Kawiarni u Jana. Zapraszamy od 8:00 do 19:00.",
      },
      { property: "og:title", content: "Kontakt i godziny otwarcia — Kawiarnia u Jana" },
      {
        property: "og:description",
        content: "Jak do nas trafić: ul. Chomikowa 7, telefon (0-22) 654-18-02.",
      },
    ],
  }),
  component: Kontakt,
});

const UKRYTY_KOMENTARZ = `<!-- SEBA_DESIGN_2005: Jan kazał mi to zakodować, ale ja wiem co on robi nocami.
Te małe oczy... one są wszędzie. Jeśli tu trafiłeś, wpisz w księdze formułę o gryzoniach. -->`;

function Kontakt() {
  return (
    <RetroLayout title="Kontakt">
      <div dangerouslySetInnerHTML={{ __html: UKRYTY_KOMENTARZ }} />

      <table className="w-full border-2 border-retro-frame text-sm">
        <tbody>
          <tr className="odd:bg-retro-page">
            <td className="border border-retro-frame px-2 py-1 font-bold">Adres</td>
            <td className="border border-retro-frame px-2 py-1">
              ul. Chomikowa 7 (wejście od podwórza), 00-931 Warszawa
            </td>
          </tr>
          <tr className="odd:bg-retro-page">
            <td className="border border-retro-frame px-2 py-1 font-bold">Telefon</td>
            <td className="border border-retro-frame px-2 py-1">(0-22) 654-18-02</td>
          </tr>
          <tr className="odd:bg-retro-page">
            <td className="border border-retro-frame px-2 py-1 font-bold">E-mail</td>
            <td className="border border-retro-frame px-2 py-1">jan-kawiarnia@poczta.onet.pl</td>
          </tr>
          <tr className="odd:bg-retro-page">
            <td className="border border-retro-frame px-2 py-1 font-bold">Godziny</td>
            <td className="border border-retro-frame px-2 py-1">
              pon.–sob. 8:00–19:00, niedziela zamknięte
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-sm">
        Faksu nie mam. Po 19 proszę nie dzwonić i nie stukać w okno od podwórza.
      </p>

      <p className="mt-4 text-xs">
        Stronę robił mi Seba, znajomy syna. Jak coś nie działa, to ja się na tym nie znam.
      </p>
    </RetroLayout>
  );
}
