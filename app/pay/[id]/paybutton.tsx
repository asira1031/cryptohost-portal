"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayButton({
  paymentId,
  amount,
}: {
  paymentId: string;
  amount: string;
}) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;

    script.onload = () => {
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  reference_id: paymentId,
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },

          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then(() => {
              alert("Payment completed");
              window.location.reload();
            });
          },
        })
        .render(paypalRef.current);
    };

    document.body.appendChild(script);
  }, [paymentId, amount]);

  return <div ref={paypalRef}></div>;
}