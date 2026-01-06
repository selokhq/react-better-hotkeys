import { vi } from "vitest";

export const MAC_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)";
export const WIN_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

export async function withUserAgent(ua: string) {
  vi.resetModules();
  Object.defineProperty(global.navigator, "userAgent", {
    value: ua,
    configurable: true,
  });
  const RH = await import("react-better-hotkeys");
  return RH;
}
