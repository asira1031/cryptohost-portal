export default function SupportAdminPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#071a52",
        color: "#fff",
        padding: 30,
      }}
    >
      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          marginBottom: 20,
        }}
      >
        Customer Support Admin
      </h1>

      <div
        style={{
          background: "#0c255f",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <h2>Support Tickets</h2>

        <table
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th align="left">Ticket ID</th>
              <th align="left">Client</th>
              <th align="left">Category</th>
              <th align="left">Subject</th>
              <th align="left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>CH-000001</td>
              <td>Sample Client</td>
              <td>Wallet Support</td>
              <td>Login Issue</td>
              <td>OPEN</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}