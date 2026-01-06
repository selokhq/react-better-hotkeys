export type OS =
  | "iOS/iPadOS"
  | "Android"
  | "Windows"
  | "macOS"
  | "Linux"
  | "Unknown";

let cachedOS: OS | null = null;

export function detectOS(): OS {
  if (cachedOS) return cachedOS;

  if (typeof navigator === "undefined") {
    cachedOS = "Unknown";
    return cachedOS;
  }

  const ua = (navigator.userAgent || "").toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) cachedOS = "iOS/iPadOS";
  else if (ua.includes("android")) cachedOS = "Android";
  else if (ua.includes("windows")) cachedOS = "Windows";
  else if (ua.includes("mac os")) cachedOS = "macOS";
  else if (ua.includes("linux")) cachedOS = "Linux";
  else cachedOS = "Unknown";

  return cachedOS;
}
