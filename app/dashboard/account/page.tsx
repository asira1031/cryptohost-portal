"use client";

type BankAccount = {
  bank: string;
  accountName: string;
  accountNumber: string;
  swift: string;
  currency: string;
  note: string;
};

export default function AccountPage() {
  const bankAccounts: BankAccount[] = [
    {
      bank: "MariBank",
      accountName: "Janica Maldives",
      accountNumber: "1032-431-2229",
      swift: "LAUIPHM2",
      currency: "PHP",
      note: "Primary digital banking option",
    },
    {
      bank: "Security Bank",
      accountName: "Janica Maldive",
      accountNumber: "0000076867520",
      swift: "SETCPHMM",
      currency: "PHP",
      note: "Local funding option",
    },
    {
      bank: "UnionBank",
      accountName: "Janica Maldives",
      accountNumber: "103200011788",
      swift: "UBPHPHMMXXX",
      currency: "PHP",
      note: "Primary local receiving account",
    },
    {
      bank: "BDO",
      accountName: "Janica Maldives",
      accountNumber: "012516004148",
      swift: "BNORPHMMXXX",
      currency: "PHP",
      note: "Standard bank transfer option",
    },
    {
      bank: "BPI",
      accountName: "JANICA MALDIVES",
      accountNumber: "0629075905",
      swift: "BOPIPHMM",
      currency: "PHP",
      note: "PHP receiving account",
    },
    {
      bank: "BPI",
      accountName: "JANICA MALDIVES",
      accountNumber: "0574196219",
      swift: "BOPIPHMM",
      currency: "USD",
      note: "USD receiving account",
    },
    {
      bank: "Maya Bank",
      accountName: "Janica Maldives",
      accountNumber: "808529591832",
      swift: "MYYAPHM2XX",
      currency: "PHP",
      note: "Digital funding option",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b2d",
        padding: "40px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          background: "#101a49",
          borderRadius: 22,
          padding: 32,
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          Fund Account
        </h1>

        <p
          style={{
            marginTop: 14,
            marginBottom: 28,
            color: "#c7d2fe",
            fontSize: 15,
            lineHeight: 1.8,
            maxWidth: 900,
          }}
        >
          Please use one of the approved bank accounts below to fund your
          CryptoHost transaction. After completing your transfer, proceed with
          file upload and confirmation inside the portal. Always use your
          registered CryptoHost email as your payment reference when possible.
        </p>

        <div
          style={{
            background: "#1f2b5c",
            border: "1px solid #33457a",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              color: "#93c5fd",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: 0.3,
            }}
          >
            FUNDING INSTRUCTIONS
          </div>

          <div
            style={{
              color: "#e5e7eb",
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            1. Select the most appropriate bank account below based on your
            transfer type and currency.
            <br />
            2. Complete your funding using the correct bank details.
            <br />
            3. Use your registered CryptoHost email as payment reference.
            <br />
            4. After payment, upload your file through the portal.
            <br />
            5. Monitor your processing status in the Reports section.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
          }}
        >
          {bankAccounts.map((account, index) => (
            <div
              key={`${account.bank}-${account.accountNumber}-${index}`}
              style={{
                background: "#1a2556",
                border: "1px solid #33457a",
                borderRadius: 16,
                padding: 22,
                boxShadow: "0 8px 20px rgba(0,0,0,0.14)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {account.bank}
                </div>

                <div
                  style={{
                    background: account.currency === "USD" ? "#2563eb" : "#f4b400",
                    color: account.currency === "USD" ? "#ffffff" : "#111827",
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "6px 10px",
                    borderRadius: 999,
                  }}
                >
                  {account.currency}
                </div>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <InfoRow label="Account Name" value={account.accountName} />
                <InfoRow label="Account Number" value={account.accountNumber} />
                <InfoRow label="SWIFT Code" value={account.swift} />
                <InfoRow label="Note" value={account.note} />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 26,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 18,
            color: "#cbd5e1",
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          Important: Please verify all transfer details carefully before sending
          funds. Incorrect account information, missing payment reference, or
          mismatched transfer currency may delay processing and confirmation.
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          color: "#93c5fd",
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 6,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 500,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}