import Link from "next/link";

<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Link href="/dashboard" className="sidebar-btn">Dashboard</Link>

  <Link href="/dashboard/upload" className="sidebar-btn">Upload File</Link>

  <Link href="/dashboard/my-files" className="sidebar-btn">My Files</Link>

  <Link href="/dashboard/subscription" className="sidebar-btn">Subscription</Link>

  <Link href="/dashboard/fund" className="sidebar-btn">💰 Fund Account</Link>

  <Link href="/dashboard/blockchain" className="sidebar-btn">Blockchain</Link>

  <Link href="/dashboard/bank-api" className="sidebar-btn">Bank API</Link>

  <Link href="/dashboard/security" className="sidebar-btn">Security</Link>
</div>