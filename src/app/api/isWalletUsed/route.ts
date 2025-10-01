import { NextResponse } from "next/server";

import { isValidEvmAddress } from "@/utils/validators";

import { MOCKUP_DATA } from "../_mock/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ ok: false, message: "Missing wallet" }, { status: 400 });
  }
  if (!isValidEvmAddress(wallet)) {
    return NextResponse.json({ ok: false, message: "Invalid wallet" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 300));

  if (wallet === MOCKUP_DATA.usedWallet) {
    return NextResponse.json({ ok: false, message: "Wallet already used" }, { status: 409 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
