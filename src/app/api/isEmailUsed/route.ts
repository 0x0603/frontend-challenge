import { NextResponse } from "next/server";

import { isValidEmail } from "@/utils/validators";

import { MOCKUP_DATA } from "../_mock/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ ok: false, message: "Missing email" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: "Invalid email" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 300));

  if (email === MOCKUP_DATA.usedEmail) {
    return NextResponse.json({ ok: false, message: "Email already used" }, { status: 409 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
