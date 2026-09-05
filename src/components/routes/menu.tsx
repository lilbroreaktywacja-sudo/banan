import { createFileRoute } from "@tanstack/react-router";
import { RetroLayout } from "@/components/RetroLayout";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Nasze Menu i cennik — Kawiarnia u Jana" },
      {
        name: "description",
        content: "Cennik Kawiarni u Jana: kawa parzona 3,50 zł, wuzetka 4,00 zł, szarlotka 5,00 zł.",
      },
      { property: "og:title", content: "Nasze Menu i cennik — Kawiarnia u Jana" },
      {
        property: "og:description",
        content: "Kawa parzona, wuzetka, szarlotka na ciepło i sernik babci. Ceny z 2005 roku.",
      },
    ],
  }),
  component: MenuPage,
});

const NAPOJE = [
  ["Kawa parzona", "3,50 zł"],
  ["Kawa z mlekiem", "4,00 zł"],
  ["Herbata w szklance", "2,50 zł"],
  ["Kompot domowy", "2,00 zł"],
];

const CIASTA = [
  {
    nazwa: "Wuzetka",
    cena: "4,00 zł",
    opis: "Prawdziwa, z kremem i galaretką.",
  },
  {
    nazwa: "Andrut z kremem",
    cena: "3,00 zł",
    opis: "Andruty kupuję, krem robię sam.",
  },
  {
    nazwa: "Sernik babci",
    cena: "4,50 zł",
    opis: "Sam mielę twaróg. Bez rodzynek, nie pytać.",
  },
  {
    nazwa: "Szarlotka na ciepło",
    cena: "5,00 zł",
    opis: "Renety od szwagra. Do tego lody, jeśli są.",
  },
  {
    nazwa: "Zebra makowa",
    cena: "4,00 zł",
    opis: "Zwykle krzywa, ale smakuje.",
  },
];

function MenuPage() {
  return (
    <RetroLayout title="Nasze Menu">
      <p className="text-sm">Ceny od stycznia. Rachunek wypisuję ręcznie, więc trzeba chwilę poczekać.</p>

      <h2 className="retro-title mt-5 text-xl">Napoje</h2>
      <table className="mt-2 w-full border-2 border-retro-frame text-sm">
        <tbody>
          {NAPOJE.map(([nazwa, cena]) => (
            <tr key={nazwa} className="odd:bg-retro-page">
              <td className="border border-retro-frame px-2 py-1">{nazwa}</td>
              <td className="border border-retro-frame px-2 py-1 text-right font-bold">{cena}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="retro-title mt-6 text-xl">Ciasta domowe</h2>
      <table className="mt-2 w-full border-2 border-retro-frame text-sm">
        <thead>
          <tr className="bg-retro-bar">
            <th className="border border-retro-frame px-2 py-1 text-left">Nazwa</th>
            <th className="border border-retro-frame px-2 py-1 text-left">Opis</th>
            <th className="border border-retro-frame px-2 py-1 text-right">Cena</th>
          </tr>
        </thead>
        <tbody>
          {CIASTA.map((c) => (
            <tr key={c.nazwa} className="odd:bg-retro-page">
              <td className="border border-retro-frame px-2 py-1">{c.nazwa}</td>
              <td className="border border-retro-frame px-2 py-1">{c.opis}</td>
              <td className="border border-retro-frame px-2 py-1 text-right font-bold">{c.cena}</td>
            </tr>
          ))}
          <tr className="bg-retro-page">
            <td className="border border-retro-frame px-2 py-1 font-bold">Specjał Szefa</td>
            <td className="border border-retro-frame px-2 py-1">
              Tylko po zamknięciu. Nie dla wszystkich.
            </td>
            <td className="border border-retro-frame px-2 py-1 text-right font-bold text-retro-accent">
              Zapytaj gryzonia
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-xs">
        Na wynos nie sprzedaję. Kawa jest do wypicia na miejscu i tyle.
      </p>
    </RetroLayout>
  );
}
