export interface ReferredFriend {
  id: string;
  friend: string;
  tradingVolume: string;
  status: "Active" | "Pending" | "Inactive";
}

export const mockReferredFriends: ReferredFriend[] = [
  {
    id: "1",
    friend: "alice.crypto",
    tradingVolume: "$12,450.00",
    status: "Active",
  },
  {
    id: "2",
    friend: "bob_trader",
    tradingVolume: "$8,920.50",
    status: "Active",
  },
  {
    id: "3",
    friend: "charlie_defi",
    tradingVolume: "$5,670.25",
    status: "Pending",
  },
  {
    id: "4",
    friend: "diana_nft",
    tradingVolume: "$3,210.75",
    status: "Active",
  },
  {
    id: "5",
    friend: "eve_moon",
    tradingVolume: "$1,890.00",
    status: "Inactive",
  },
  {
    id: "6",
    friend: "frank_whale",
    tradingVolume: "$25,600.00",
    status: "Active",
  },
  {
    id: "7",
    friend: "grace_hodl",
    tradingVolume: "$4,320.80",
    status: "Pending",
  },
  {
    id: "8",
    friend: "henry_ape",
    tradingVolume: "$7,150.30",
    status: "Active",
  },
];
