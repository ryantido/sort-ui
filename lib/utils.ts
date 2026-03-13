import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transaction } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface TransactionFilterFn {
  (transaction: Transaction): boolean;
}

export function sumTransactions(
  transactions: Transaction[],
  filter: TransactionFilterFn
): number {
  return transactions.filter(filter).reduce((acc, t) => acc + t.amount, 0);
}

export function getPendingDeposit(transactions: Transaction[]): number {
  return sumTransactions(
    transactions,
    (t) => t.category === "deposit" && t.status === "pending"
  );
}

export function getPendingWithdrawal(transactions: Transaction[]): number {
  return sumTransactions(
    transactions,
    (t) => t.category === "withdraw" && t.status === "pending"
  );
}

export function getTotalAllocated(transactions: Transaction[]): number {
  return sumTransactions(
    transactions,
    (t) => t.category === "allocation" && t.status === "completed"
  );
}

export function getTotalSpent(transactions: Transaction[]): number {
  return sumTransactions(
    transactions,
    (t) => t.category === "ad_spending" && t.status === "completed"
  );
}

export type PaginationItem = number | "...";

export function getPagination(
  totalPages: number,
  page: number
): PaginationItem[] {
  const pages: PaginationItem[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (page > 3) pages.push("...");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - 2) pages.push("...");
  pages.push(totalPages);

  return pages;
}

export interface FilterTransactionsOptions {
  search?: string;
  date?: string;
  type?: string;
  source?: string;
  accountsMap: Record<string, string>;
  daysMap: Record<string, number>;
}

export function filterTransactions(
  transactions: Transaction[],
  options: FilterTransactionsOptions
): Transaction[] {
  const { search, date, type, source, accountsMap, daysMap } = options;
  const now = new Date();

  return transactions.filter((transaction) => {
    
    if (search) {
      const query = search.toLowerCase();
      const sourceName =
        accountsMap[transaction.accountId]?.toLowerCase() ?? "";

      const matchesSearch =
        transaction.id.toLowerCase().includes(query) ||
        sourceName.includes(query) ||
        transaction.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;
    }

    if (date) {
      const days = daysMap[date];
      if (days) {
        const limit = new Date(now.getTime());
        limit.setDate(now.getDate() - days);
        const transactionDate = new Date(transaction.date);

        if (transactionDate < limit || transactionDate > now) return false;
      }
    }

    if (type) {
      const transactionType =
        transaction.category === "ad_spending" ? "Debit" : "Credit";
      if (transactionType !== type) return false;
    }

    if (source) {
      if (accountsMap[transaction.accountId] !== source) return false;
    }

    return true;
  });
}

export function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const formatted = date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(
      `${now.getFullYear().toString().charAt(3)},`,
      now.getFullYear().toString().charAt(3)
    );

  return formatted;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function maskSensitiveData(value: string, visible: boolean): string {
  return visible ? value : "*".repeat(value.length);
}
