import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tajne-archiwum-jana-99")({
  head: () => ({
    meta: [
      { title: "ARCHIWUM_JAN_99 :: dostęp nieautoryzowany" },
      { name: "description", content: "Prywatne logi systemowe. Dostęp tylko dla właściciela." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "ARCHIWUM_JAN_99" },
      { property: "og:description", content: "Prywatne logi systemowe." },
    ],
  }),
  component: Archiwum,
});

function Archiwum() {
  return (
    <div className="retro-terminal min-h-screen px-4 py-8 text-sm">
      <div className="mx-auto max-w-2xl space-y-4">
        <pre className="whitespace-pre-wrap">{`C:\\ARCHIWUM> dostep_uzyskany
UWAGA: ten katalog nie istnieje w kopii zapasowej.
UZYTKOWNIK: nieznany   TERMINAL: 1   PODGLAD: aktywny`}</pre>

        <pre className="mt-6 whitespace-pre-wrap border border-current p-3 text-xs">
{`C:\\ARCHIWUM> _`}
        </pre>

        <p className="pt-6 text-xs opacity-70">
          <Link to="/" className="underline">
            [ zamknij terminal i wróć do kawiarni ]
          </Link>
        </p>
      </div>
    </div>
  );
}
