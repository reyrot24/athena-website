"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry?: () => void;
  reset: () => void;
};

export default function GlobalError({ retry, reset }: GlobalErrorProps) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          textAlign: "center",
          background: "#0b0b0c",
          color: "#f3f0ea",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div>
          <p style={{ color: "#f6a14c", fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            SSD CAM Athena
          </p>
          <h1 style={{ fontSize: 40, margin: "16px 0" }}>Qualcosa è andato storto</h1>
          <p style={{ opacity: 0.75 }}>Riprova tra qualche istante.</p>
          <button
            type="button"
            onClick={() => (retry ?? reset)()}
            style={{
              marginTop: 24,
              padding: "14px 28px",
              border: 0,
              borderRadius: 999,
              background: "#f6a14c",
              color: "#0b0b0c",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}
