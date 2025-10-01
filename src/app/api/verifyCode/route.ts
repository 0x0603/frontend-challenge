import { NextResponse } from "next/server";

import { isValidInviteCode } from "@/utils/validators";

import { MOCKUP_DATA } from "../_mock/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ ok: false, message: "Missing code" }, { status: 400 });
  }
  if (!isValidInviteCode(code)) {
    return NextResponse.json({ ok: false, message: "Invalid code format" }, { status: 400 });
  }

  // Simulate latency
  await new Promise((r) => setTimeout(r, 300));

  if (code === MOCKUP_DATA.invalidCode) {
    return NextResponse.json({ ok: false, message: "Invalid code" }, { status: 400 });
  }

  if (code === MOCKUP_DATA.usedCode) {
    return NextResponse.json({ ok: false, message: "Code already used" }, { status: 409 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
