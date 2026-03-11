import os
import re
from datetime import datetime

WIDTH = 80

def hr(char="="):
    return char * WIDTH

def center(text):
    return text.center(WIDTH)

def mask_card(card: str) -> str:
    digits = re.sub(r"\D", "", card)
    if len(digits) < 4:
        return "****"
    last4 = digits[-4:]
    return "**** **** **** " + last4

def mask_cvv(cvv: str) -> str:
    digits = re.sub(r"\D", "", cvv)
    if not digits:
        return "***"
    return "*" * len(digits)

def clean_amount(x: str) -> str:
    x = x.strip().replace(",", "")
    try:
        val = float(x)
        return f"{val:,.2f}"
    except:
        return "0.00"

def main():
    os.system("cls" if os.name == "nt" else "clear")

    print(hr("="))
    print("⬢  CRYPTOHOST SECURE PAYMENT TERMINAL (DEMO ONLY)".ljust(WIDTH-18) + "MODE: SIMULATION".rjust(18))
    print(hr("="))
    print()
    print("NOTE: This is a UI simulation. No payment is processed. No data is stored.")
    print(hr("-"))
    print()

    name = input("Cardholder Name      : ").strip()
    card = input("Card Number (demo)   : ").strip()
    expiry = input("Expiry (MM/YY)       : ").strip()
    cvv = input("CVV (demo)           : ").strip()
    amount = input("Amount               : ").strip()
    currency = input("Currency (e.g. USD)  : ").strip().upper() or "USD"

    masked_card = mask_card(card)
    masked_cvv = mask_cvv(cvv)
    amt = clean_amount(amount)

    ref = "CHX-DEMO-" + datetime.now().strftime("%Y%m%d-%H%M%S")
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    print()
    print(hr("-"))
    print("PROCESSING (SIMULATED) ...")
    print("Tokenizing card (demo) ............ OK")
    print("Risk checks (demo) ................ OK")
    print("Gateway route (demo) .............. OK")
    print("Authorization (demo) .............. APPROVED")
    print(hr("-"))
    print()

    print(hr("="))
    print(center("PAYMENT SUMMARY (DEMO)"))
    print(hr("="))
    print(f"Reference           : {ref}")
    print(f"Timestamp           : {ts}")
    print(f"Cardholder          : {name or '[NOT PROVIDED]'}")
    print(f"Card (masked)       : {masked_card}")
    print(f"Expiry              : {expiry or '**/**'}")
    print(f"CVV (masked)        : {masked_cvv}")
    print(f"Amount              : {currency} {amt}")
    print()
    print("STATUS              : APPROVED (SIMULATION)")
    print("NOTICE              : No funds moved. Screenshot-safe output.")
    print(hr("="))
    print(center("Powered by CryptoHost Exchange Infrastructure"))
    print(hr("="))
    input("\nPress Enter to exit...")

if __name__ == "__main__":
    main()