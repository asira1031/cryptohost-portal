import fs from "fs";
import path from "path";

type ClientRecord = {
  fullName: string;
  email: string;
  password: string;
  companyName?: string;
  walletAddress?: string;
  createdAt: string;
};

export default function AdminPage() {
  const filePath = path.join(process.cwd(), "data", "clients.json");

  let clients: ClientRecord[] = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    clients = fileData ? JSON.parse(fileData) : [];
  }

  return (
    <div className="min-h-screen bg-[#061225] text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Admin Monitoring</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        {clients.length === 0 ? (
          <p className="text-white/70">No registered clients yet.</p>
        ) : (
          <div className="space-y-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-[#0b1b35] p-4"
              >
                <p><strong>Name:</strong> {client.fullName}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Company:</strong> {client.companyName || "-"}</p>
                <p><strong>Wallet:</strong> {client.walletAddress || "-"}</p>
                <p><strong>Created:</strong> {client.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}