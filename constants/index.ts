export const headers = [
  "Transaction ID",
  "Description",
  "Type",
  "Amount",
  "Status",
  "Source",
  "Date",
  "",
] as const;

export const daysMap: Record<string, number> = {
  "Last 7 days": 7,
  "Last 15 days": 15,
  "Last 30 days": 30,
};

export * from "./styles";
