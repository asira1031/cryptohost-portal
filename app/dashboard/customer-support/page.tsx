"use client";

import { useState } from "react";

export default function CustomerSupportPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [concern, setConcern] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const ticket =
      "CH-" + Date.now().toString().slice(-6);

    setTicketNumber(ticket);
    setSubmitted(true);

    setFullName("");
    setEmail("");
    setClientId("");
    setCategory("");
    setSubject("");
    setConcern("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#071a52",
        padding: 30,
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          CryptoHost Customer Support
        </h1>

        <p
          style={{
            color: "#9db7e8",
            marginBottom: 30,
          }}
        >
          Submit your concern and our support team
          will respond to your registered email
          address.
        </p>

        <div
          style={{
            background: "#0c255f",
            padding: 25,
            borderRadius: 16,
          }}
        >
          <h2
            style={{
              marginBottom: 20,
            }}
          >
            Support Request Form
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: 15,
            }}
          >
            <input
              style={inputStyle}
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Client ID (Optional)"
              value={clientId}
              onChange={(e) =>
                setClientId(e.target.value)
              }
            />

            <select
              style={inputStyle}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            >
              <option value="">
                Select Category
              </option>

              <option>
                Wallet Support
              </option>

              <option>
                Transaction Support
              </option>

              <option>
                Deposit Inquiry
              </option>

              <option>
                Withdrawal Inquiry
              </option>

              <option>
                Account Access
              </option>

              <option>
                KYC Verification
              </option>

              <option>
                Technical Support
              </option>

              <option>
                Billing & Subscription
              </option>

              <option>
                Other
              </option>
            </select>

            <input
              style={inputStyle}
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />

            <textarea
              style={{
                ...inputStyle,
                minHeight: 150,
              }}
              placeholder="Concern Details"
              value={concern}
              onChange={(e) =>
                setConcern(e.target.value)
              }
              required
            />

            <button
              type="submit"
              style={{
                background: "#16a34a",
                border: "none",
                padding: 14,
                borderRadius: 10,
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Submit Support Request
            </button>
          </form>
        </div>

        {submitted && (
          <div
            style={{
              marginTop: 20,
              background: "#0c255f",
              padding: 20,
              borderRadius: 16,
              border:
                "1px solid rgba(22,163,74,.5)",
            }}
          >
            <h3
              style={{
                color: "#4ade80",
              }}
            >
              Support Request Submitted
            </h3>

            <p>
              Reference ID:
              <strong>
                {" "}
                {ticketNumber}
              </strong>
            </p>

            <p>
              Status:
              <strong> OPEN</strong>
            </p>

            <p
              style={{
                color: "#9db7e8",
              }}
            >
              Your support request has
              been received successfully.
              A response will be sent to
              your registered email
              address.
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: 25,
            background: "#0c255f",
            padding: 20,
            borderRadius: 16,
          }}
        >
          <h3>
            Support Availability
          </h3>

          <p>
            ✓ Monday - Sunday
          </p>

          <p>
            ✓ Email Response Support
          </p>

          <p>
            ✓ Wallet Assistance
          </p>

          <p>
            ✓ Transaction Support
          </p>

          <p>
            ✓ Technical Assistance
          </p>

          <p>
            ✓ Account Verification
            Support
          </p>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border:
    "1px solid rgba(255,255,255,0.1)",
  background:
    "rgba(255,255,255,0.05)",
  color: "#fff",
  outline: "none",
};