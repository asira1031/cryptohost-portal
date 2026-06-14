
import crypto from "crypto";

function generateApprovalHash(wallet: string) {
  return (
    "APP-" +
    crypto
      .createHash("sha256")
      .update(wallet)
      .digest("hex")
      .slice(0, 40)
  );
}

const wallets = [
  {
    address: "0x3c18E822138b051Ed2423BE7Db6556c5662e1784",
    percent: 30.0,
    amount: "€30,000,000.00",
  },
  {
    address: "0xC3caF75dfa344eAE9BE95A01c94258c1Bafe0D18",
    percent: 5.0,
    amount: "€5,000,000.00",
  },
  {
    address: "0x1808b0871ff42FfDb2e30472b1102fa97F9Cc181",
    percent: 5.0,
    amount: "€5,000,000.00",
  },
  {
    address: "0xaCe8f4fA54c312cf3e3802aeA085348fBb548Ed6",
    percent: 8.0,
    amount: "€8,000,000.00",
  },
  {
    address: "0x50eBd98c74e610B90A422c2F25B0E0C1EeAB9Bd2",
    percent: 2.0,
    amount: "€2,000,000.00",
  },
  {
    address: "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd",
    percent: 40.0,
    amount: "€40,000,000.00",
  },
  {
    address: "0x4e0b4d9930d85200eb4ace7633b3f2c25bc79991",
    percent: 10.0,
    amount: "€10,000,000.00",
  },
];

export const walletsWithHashes = wallets.map((wallet) => ({
  ...wallet,
  approvalHash: generateApprovalHash(wallet.address),
}));

