"use client";
import Link from "next/link"; // make sure this is at the top

<Link
  href="https://www.binance.com/en/buy-sell-crypto"
  target="_blank"
  style={{
    background: "#f3c400",
    color: "#111",
    borderRadius: "10px",
    padding: "12px 20px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  Buy USDT
</Link>

const deposits = [
  {
    date: "3/21/2026, 12:26:13 PM",
    asset: "USDT",
    network: "BEP20",
    gross: "1,000.00",
    fee: "30.00",
    net: "970.00",
    status: "Pending",
    tx: "TEST-TX-001",
  },
  {
    date: "3/19/2026, 6:35:36 PM",
    asset: "USDT",
    network: "BEP20",
    gross: "0.00",
    fee: "0.00",
    net: "0.00",
    status: "Credited",
    tx: "0xTEST123456789",
  },
  {
    date: "3/18/2026, 4:21:34 PM",
    asset: "USDT",
    network: "ERC20",
    gross: "0.00",
    fee: "0.00",
    net: "0.00",
    status: "Credited",
    tx: "0x8d34demo91ab",
  },
];

export default function FundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#00090f",
        padding: "18px 20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "18px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                color: "#fff",
                fontSize: "26px",
                fontWeight: 800,
                margin: "0 0 8px 0",
              }}
            >
              Deposit USDT
            </h1>
            <div style={{ color: "#cbd5e1", fontSize: "15px" }}>
              Logged in as: jans103174@gmail.com
            </div>
          </div>

          <button
            style={{
              background: "#f3c400",
              color: "#111",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Buy USDT
          </button>
        </div>

        <section
          style={{
            background: "#141922",
            border: "1px solid #232b39",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Deposit Wallet
          </div>

          <div
            style={{
              color: "#8e9aab",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            Send only USDT using the supported network shown below.
          </div>

          <div
            style={{
              background: "#0c1117",
              border: "1px solid #263143",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "#f3c400",
              fontWeight: 700,
              fontSize: "15px",
              wordBreak: "break-all",
              marginBottom: "12px",
            }}
          >
            0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <InfoPill text="Asset: USDT" />
            <InfoPill text="Network: BEP20 / ERC20 only" />
            <InfoPill text="Platform Fee: 3%" />
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          <StatCard label="Total Deposits" value="1,000.00 USDT" color="#ffffff" />
          <StatCard label="Total Fees Earned" value="30.00 USDT" color="#f3c400" />
          <StatCard label="Net Balance" value="970.00 USDT" color="#19d38a" />
        </div>

        <section
          style={{
            background: "#141922",
            border: "1px solid #232b39",
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Deposit History
            </div>

            <Link
              href="/dashboard"
              style={{
                color: "#f3c400",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Back to Dashboard
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "#d8e2f1",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Asset</th>
                  <th style={thStyle}>Network</th>
                  <th style={thStyle}>Gross</th>
                  <th style={thStyle}>Fee</th>
                  <th style={thStyle}>Net</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((row) => (
                  <tr key={row.tx} style={{ borderTop: "1px solid #253041" }}>
                    <td style={tdStyle}>{row.date}</td>
                    <td style={tdStyle}>{row.asset}</td>
                    <td style={tdStyle}>{row.network}</td>
                    <td style={tdStyle}>{row.gross}</td>
                    <td style={{ ...tdStyle, color: "#f3c400", fontWeight: 700 }}>
                      {row.fee}
                    </td>
                    <td style={{ ...tdStyle, color: "#19d38a", fontWeight: 700 }}>
                      {row.net}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 700,
                          background:
                            row.status === "Pending"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(34,197,94,0.15)",
                          color:
                            row.status === "Pending" ? "#ef4444" : "#22c55e",
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.tx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoPill({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "#111722",
        border: "1px solid #243041",
        borderRadius: "10px",
        padding: "10px 14px",
        color: "#dbe5f3",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#141922",
        border: "1px solid #232b39",
        borderRadius: "14px",
        padding: "18px",
      }}
    >
      <div
        style={{
          color: "#8e9aab",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color,
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "14px 10px",
};