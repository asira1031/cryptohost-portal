const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asira1031@gmail.com",
    pass: "crqa hvll nmoi mwig",
  },
});

async function sendMail() {
  try {
    const info = await transporter.sendMail({
      from: '"CryptoHost" <asira1031@gmail.com>',
      to: "system342@proton.me",
      subject: "CryptoHost Validation Process Initiated",

      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>CryptoHost Validation Process Initiated</h2>

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

          <hr />

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

    console.log("EMAIL SENT:", info.messageId);
  } catch (err) {
    console.error(err);
  }
}

sendMail();