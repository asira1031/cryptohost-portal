export default function BankApiPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: "28px 30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            Bank API
          </h1>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#c7d2fe",
              fontSize: 15,
            }}
          >
            Access supported banking developer portals and integration resources.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 18,
          }}
        >
          {[
            {
              name: "HSBC Developer Portal",
              url: "https://developer.hsbc.com",
            },
            {
              name: "Citibank Developer Portal",
              url: "https://developer.citi.com",
            },
            {
              name: "Barclays Developer Portal",
              url: "https://developer.barclays.com",
            },
            {
              name: "Deutsche Bank Developer Portal",
              url: "https://developer.db.com",
            },
            {
              name: "Yapily",
              url: "https://www.yapily.com",
            },
            {
              name: "UBS Developer Portal",
              url: "https://developer.ubs.com",
            },
            {
              name: "Bank of America Developer Portal",
              url: "https://developer.bankofamerica.com",
            },
          ].map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "#13205a",
                borderRadius: 18,
                padding: 22,
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
                boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                {item.name}
              </div>

              <div style={{ color: "#93c5fd", fontSize: 14 }}>
                Open portal →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}