const logoData = {
  nilgiris: { logo: "nilgiris" },
  naturesbasket: { logo: "naturesbasket" },
  spencersretail: { logo: "spencersretail" },
  reliancefresh: { logo: "reliancefresh" },
  dmartindia: { logo: "dmartindia" },
  myntra: { logo: "myntra" },
  snapdeal: { logo: "snapdeal" },
  shopclues: { logo: "shopclues" },
  ajio: { logo: "ajio" },
  paytmmall: { logo: "paytmmall" },
  foodpanda: { logo: "foodpanda" },
  ubereats: { logo: "ubereats" },
  dunzo: { logo: "dunzo" },
};
export function getLogo(title: string): string | undefined {
  const lowercaseTitle = title.toLowerCase().split(/\s+/); // Split on whitespace
  return lowercaseTitle.find((word) => word in logoData); // Find in logoData
}
