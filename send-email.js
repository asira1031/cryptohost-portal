const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "asira1031@gmail.com",
    pass: "crqa hvll nmoi mwig",
  },
});

async function sendMail() {
  try {

    // VERIFY SMTP CONNECTION
    await transporter.verify();
    console.log("SMTP SERVER READY");

    // SEND EMAIL
    const info = await transporter.sendMail({

      from: '"CryptoHost Validation Department" <asira1031@gmail.com>',

      // MAIN RECEIVER
      to: "safamell@protonmail.com",

      // FURNISH / COPY
      cc: "asira1031@gmail.com",

      subject: "CryptoHost Validation Process Initiated",

      // PLAIN TEXT VERSION
      text: `
CryptoHost Validation Process Initiated

Your uploaded file package has been successfully received
by the CryptoHost validation server and is currently queued
for technical review and validation processing.

File Reception: CONFIRMED
Validation Queue: ACTIVE
Processing Layer: PENDING SUBSCRIPTION
System Response: WAITING FOR USER ACTION

Regards,
CryptoHost Validation Department
      `,

      // HTML VERSION
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; color:#222;">

          <h2 style="color:#111;">
            CryptoHost Validation Process Initiated
          </h2>

          <p>
            Your uploaded file package has been successfully received
            by the CryptoHost validation server and is currently queued
            for technical review and validation processing.
          </p>

          <p>
            To continue with the validation and transmission review
            procedure, please select the appropriate subscription
            plan from your dashboard panel.
          </p>

          <hr style="margin:20px 0;" />

          <p><strong>File Reception:</strong> CONFIRMED</p>
          <p><strong>Validation Queue:</strong> ACTIVE</p>
          <p><strong>Processing Layer:</strong> PENDING SUBSCRIPTION</p>
          <p><strong>System Response:</strong> WAITING FOR USER ACTION</p>

          <br />

          <p>
            Regards,<br/>
            CryptoHost Validation Department
          </p>

        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("MESSAGE ID:", info.messageId);

  } catch (err) {

    console.error("EMAIL ERROR:");
    console.error(err);

  }
}

sendMail();