export default function HSBCTPPHoldPage() {
  return (
    <div
      style={{
        padding: 30,
        color: "#dbe4ff",
        background: "#020617",
        minHeight: "100vh",
        fontFamily: "Consolas, monospace",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: "#8ec5ff" }}>
          CRYPTOHOST SECURE VALIDATION SYSTEM
        </div>

        <h1 style={{ fontSize: 28, margin: "6px 0 10px", color: "white" }}>
          TRANSACTION VALIDATION REPORT
        </h1>

        <div style={{ color: "#94a3b8", fontSize: 13 }}>
          SESSION MODE: ACTIVE
        </div>
      </div>

      <div
        style={{
          background: "#0b1220",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 20,
          lineHeight: 1.6,
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
{`============================================================
 FILE REFERENCE: HSBC-TPP-HOLD
 STATUS: READY FOR EXECUTION
 PROGRESS: 100%
============================================================

[ TRANSACTION SUMMARY ]
Reference ID    : HBUKG85H5CMAF590
Amount          : € 1,001,020,109.00
Currency        : EUR
Value Date      : 12 August 2025

[ ACCOUNT DETAILS ]
Sender          : MATECHPOWER LTD
Sender Acc      : GB91HBUK40362272831120
Beneficiary     : MATECHPOWER LTD
Beneficiary Acc : GB91HBUK40362272831120

[ VALIDATION CHECKS ]
✔ Infrastructure Validation ........ PASSED
✔ Routing Alignment ............... VERIFIED
✔ Allocation Sequencing ........... COMPLETED
✔ System Integrity Check .......... STABLE

[ SYSTEM STATE ]
• Validation Layer ................ COMPLETED
• Conversion Status ............... AUTHORIZED
• Broadcast Status ................ READY

[ EXECUTION NOTICE ]
The transaction has successfully completed all required
validation stages and is now prepared for execution
under secure system conditions.

No further action is required at this stage.

------------------------------------------------------------
Timestamp: April 21, 2026 • 18:40 (UTC+8)
------------------------------------------------------------`}
        </pre>
      </div>

      <div style={{ marginTop: 30, color: "#64748b", fontSize: 13 }}>
        Powered by CryptoHost Secure Automation
      </div>
    </div>
  );
}