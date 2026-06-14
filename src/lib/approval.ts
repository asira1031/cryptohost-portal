import crypto from "crypto";

export function createApprovalRequest(amount: string) {
  const approvalHash = crypto
    .createHash("sha256")
    .update(`${amount}-${Date.now()}`)
    .digest("hex");

  return {
    approvalHash: `APP-${approvalHash}`,
    amount,
    status: "PENDING_APPROVAL",
    transactionHash: "VACANT",
  };
}