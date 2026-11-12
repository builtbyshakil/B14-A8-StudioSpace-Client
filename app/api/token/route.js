import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

const COOKIE_NAME = "studio_token";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Please login first" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || "",
    },
    process.env.JWT_SECRET,
    { expiresIn: SEVEN_DAYS }
  );

  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
