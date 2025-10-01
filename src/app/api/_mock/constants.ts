export const MOCKUP_DATA = {
  invalidCode: "abc123",
  usedCode: "xyz123",
  usedEmail: "test@test.com",
  usedWallet: "0xccb1c45EF084b344B71e29B365fEFeCc8F3fd689",
};

export type ReservePayload = {
  code: string;
  email: string;
  wallet: string;
  signature: string;
};
