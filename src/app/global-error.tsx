"use client";

import { useEffect } from "react";

// global-error remplace le layout entier — pas d'accès aux fonts/styles globaux
// On remet les bases manuellement
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#0c0a09", fontFamily: "Georgia, serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1,
              marginBottom: "4rem",
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "9px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#57534e",
              }}
            >
              Domaine
            </span>
            <span style={{ fontSize: "20px", color: "white", fontWeight: 300 }}>Gaud</span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#57534e",
              }}
            >
              Chinon
            </span>
          </div>

          {/* 500 fantôme */}
          <p
            style={{
              position: "absolute",
              fontSize: "clamp(8rem,20vw,14rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              userSelect: "none",
              margin: 0,
            }}
          >
            500
          </p>

          <div style={{ position: "relative" }}>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#d97706",
                marginBottom: "1rem",
              }}
            >
              Erreur critique
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem,6vw,4rem)",
                fontWeight: 300,
                color: "white",
                margin: "0 0 1.25rem",
                lineHeight: 1.2,
              }}
            >
              Le site rencontre
              <br />
              un problème
            </h1>
            <p
              style={{
                color: "#78716c",
                fontFamily: "sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "360px",
                margin: "0 auto 2.5rem",
              }}
            >
              Une erreur inattendue s'est produite. Nos équipes ont été notifiées.
            </p>

            <button
              onClick={reset}
              style={{
                padding: "0.875rem 2rem",
                background: "white",
                color: "#1c1917",
                fontFamily: "sans-serif",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
          </div>

          <p
            style={{
              position: "absolute",
              bottom: "1.5rem",
              fontFamily: "sans-serif",
              fontSize: "10px",
              color: "#44403c",
              letterSpacing: "0.05em",
            }}
          >
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </body>
    </html>
  );
}
