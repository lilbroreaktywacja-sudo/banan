/*
 * ============================================================
 *  ARG — CZARNA SKRZYNKA NA HASLA
 *  Jedyny plik, ktory edytujesz. Dopisujesz haslo -> reakcje.
 * ============================================================
 *
 *  4 rodzaje reakcji:
 *
 *  1) tekst        -> pokazuje surowy komunikat na ekranie
 *     { haslo: "stary_klucz", reakcja: "tekst", tresc: "Sprawdz kartke pod lada." }
 *
 *  2) okienko      -> wyskakuje systemowe okienko (alert) z tekstem
 *     { haslo: "seba", reakcja: "okienko", tresc: "Seba wiedzial." }
 *
 *  3) link         -> przenosi gracza pod dowolny adres (YouTube, ZIP, plik)
 *     { haslo: "kaseta", reakcja: "link", cel: "https://youtu.be/XXXXXXX" }
 *     (dziala tez dla podstron w tej witrynie, np. cel: "/tajne-archiwum-jana-99")
 *
 *  4) obraz        -> wyswietla ukryte zdjecie z podpowiedzia
 *     { haslo: "zaplecze", reakcja: "obraz", plik: "/arg/zaplecze.jpg", tresc: "opcjonalny podpis" }
 *     (pliki wrzucaj do folderu public/, np. public/arg/zaplecze.jpg)
 *
 *  Cokolwiek innego = blad i wyczyszczone pole. Zadnych podpowiedzi.
 *  Wielkosc liter i polskie ogonki nie maja znaczenia.
 */

export type Kod =
  | { haslo: "chomiki"; reakcja: "tekst"; tresc: "one wiedzą one słyszą ben nie zdążył" }
  | { haslo: string; reakcja: "okienko"; tresc: string }
  | { haslo: string; reakcja: "link"; cel: string }
  | { haslo: string; reakcja: "obraz"; plik: string; tresc?: string };

export const WERYFIKACJA_SCIEZKA = "/WDDGUHSDFSODIFUFSDJHFSOUDFHSDF" as const;

export const KODY: Kod[] = [
  // ——— TWOJE HASLA. Dopisuj kolejne linijki ponizej. ———
  {
    haslo: "chomiki",
    reakcja: "tekst",
    tresc: "one wiedzą one słyszą ben nie zdążył",
  },
  {
    haslo: "jan99",
    reakcja: "link",
    cel: "/tajne-archiwum-jana-99",
  },
];

export function normalizuj(text: string) {
  return text
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function znajdzKod(wpisane: string): Kod | undefined {
  const n = normalizuj(wpisane);
  return KODY.find((k) => normalizuj(k.haslo) === n);
}
