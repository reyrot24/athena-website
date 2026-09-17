import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "athena_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASS;
  if (!secret) throw new Error("Configura SESSION_SECRET (o ADMIN_PASS) per l'area riservata.");
  return secret;
}

/** Confronto a tempo costante anche con stringhe di lunghezza diversa. */
function safeEqual(a: string, b: string) {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function checkCredentials(user: string, password: string) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASS;
  if (!expectedUser || !expectedPassword) return false;
  const userOk = safeEqual(user, expectedUser);
  const passwordOk = safeEqual(password, expectedPassword);
  return userOk && passwordOk;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expiresAt = Number(payload.split(".")[1]);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function createSession() {
  const payload = `admin.${Date.now() + MAX_AGE_SECONDS * 1000}`;
  const jar = await cookies();
  jar.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function isAuthenticated() {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
