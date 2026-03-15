import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_me");

export async function signToken(payload: { email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { email: string };
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function setSession(email: string) {
  const token = await signToken({ email });
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
