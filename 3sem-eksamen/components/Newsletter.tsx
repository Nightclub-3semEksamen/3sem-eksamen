"use client";

import { FormEvent, useState } from "react";

const accentColor = "oklch(0.65 0.25 8)";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Please enter your email.");
      setMessageType("error");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!emailIsValid) {
      setMessage("Please enter a valid email.");
      setMessageType("error");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setMessage("API connection is missing.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      if (response.status === 409) {
        setMessage("This email is already subscribed.");
        setMessageType("error");
        return;
      }

      if (!response.ok) {
        setMessage("Something went wrong. Please try again.");
        setMessageType("error");
        return;
      }

      setMessage("Thanks for subscribing!");
      setMessageType("success");
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "56px 32px 64px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            lineHeight: 1.2,
          }}
        >
          Want The Latest Night Club News
        </h2>

        <p className="newsletter-subtitle">
          Subscribe to our newsletter and{" "}
          <br className="md:hidden" />
          never miss an{" "}
          <a
            href="/events"
            style={{
              color: accentColor,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Event
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "760px",
            margin: "48px auto 0",
            display: "flex",
            alignItems: "flex-end",
            gap: "32px",
          }}
        >
          <div style={{ flex: 1 }}>
            <label
              htmlFor="newsletter-email"
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              Enter Your Email
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Your Email"
              style={{
                width: "100%",
                background: "transparent",
                border: "0",
                borderBottom: "2px solid #fff",
                color: "#fff",
                outline: "none",
                padding: "0 16px 16px",
                fontSize: "16px",
                fontWeight: 500,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
              width: "150px",
              background: "transparent",
              color: isButtonHovered ? accentColor : "#fff",
              border: "0",
              borderTop: `2px solid ${isButtonHovered ? accentColor : "#fff"}`,
              borderBottom: `2px solid ${
                isButtonHovered ? accentColor : "#fff"
              }`,
              padding: "16px 0",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.6 : 1,
              transition: "color 0.25s ease, border-color 0.25s ease",
            }}
          >
            {isSubmitting ? "Sending..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              fontWeight: 500,
              color: messageType === "success" ? "#4ade80" : accentColor,
            }}
          >
            {message}
          </p>
        )}
      </div>

      <style jsx>{`
        .newsletter-subtitle {
          margin-top: 12px;
          font-size: 16px;
          font-weight: 500;
        }

        input::placeholder {
          color: #fff;
          opacity: 1;
          font-weight: 500;
        }

        @media (max-width: 767px) {
          .newsletter-subtitle {
            margin-top: 22px;
            font-size: 18px;
            line-height: 1.5;
          }

          form {
            flex-direction: column;
            align-items: stretch !important;
          }

          button {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}