import { NextResponse } from "next/server";

import { isValidEmail, isValidEvmAddress, isValidInviteCode } from "@/utils/validators";

import type { ReservePayload } from "../_mock/constants";
import { MOCKUP_DATA } from "../_mock/constants";

export async function POST(request: Request) {
  let body: ReservePayload | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const { code, email, wallet, signature } = body || ({} as ReservePayload);
  if (!code || !email || !wallet || !signature) {
    return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 });
  }

  if (!isValidInviteCode(code)) {
    return NextResponse.json({ ok: false, message: "Invalid code format" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: "Invalid email" }, { status: 400 });
  }
  if (!isValidEvmAddress(wallet)) {
    return NextResponse.json({ ok: false, message: "Invalid wallet" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 300));

  if (code === MOCKUP_DATA.invalidCode) {
    return NextResponse.json({ ok: false, message: "Invalid code" }, { status: 400 });
  }
  if (code === MOCKUP_DATA.usedCode) {
    return NextResponse.json({ ok: false, message: "Code already used" }, { status: 409 });
  }
  if (email === MOCKUP_DATA.usedEmail) {
    return NextResponse.json({ ok: false, message: "Email already used" }, { status: 429 });
  }
  if (wallet === MOCKUP_DATA.usedWallet) {
    return NextResponse.json({ ok: false, message: "Wallet already used" }, { status: 429 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
