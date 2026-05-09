// @ts-nocheck

Deno.serve(async (req) => {
  try {
    const { to } = await req.json();

    const resendKey = Deno.env.get("RESEND_API_KEY");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CryptoHost <onboarding@resend.dev>",
        to,
        subject: "CryptoHost Validation Process Initiated",
        html: `
          <div style="font-family: Arial; padding: 20px;">
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
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});