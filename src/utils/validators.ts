export const CODE_LENGTH = 6;

export function isValidEmail(email: string): boolean {
  // Simple RFC 5322-ish email pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidEvmAddress(address: string): boolean {
  // Accept 0x-prefixed 40-hex addresses (EIP-55 checksum not enforced here)
  const re = /^0x[a-fA-F0-9]{40}$/;
  return re.test(address);
}

export function isValidInviteCode(code: string): boolean {
  return typeof code === "string" && code.length === CODE_LENGTH;
}
