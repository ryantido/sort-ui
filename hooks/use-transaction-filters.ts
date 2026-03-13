"use client";

import { useState, useMemo, useCallback } from "react";
import type { Transaction } from "@/types";
import { daysMap } from "@/constants";

interface TransactionFilterState {
  search: string;
  date: string | undefined;
  type: string | undefined;
  source: string | undefined;
}

interface UseTransactionFiltersOptions {
  transactions: Transaction[];
  accountsMap: Record<string, string>;
}

interface UseTransactionFiltersReturn extends TransactionFilterState {
  setSearch: (value: string) => void;
  setDate: (value: string | undefined) => void;
  setType: (value: string | undefined) => void;
  setSource: (value: string | undefined) => void;
  resetFilters: () => void;
  filteredTransactions: Transaction[];
  hasActiveFilters: boolean;
}

export function useTransactionFilters({
  transactions,
  accountsMap,
}: UseTransactionFiltersOptions): UseTransactionFiltersReturn {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);

  const filteredTransactions = useMemo(() => {
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
  }, [transactions, search, date, type, source, accountsMap]);

  const hasActiveFilters =
    search !== "" ||
    date !== undefined ||
    type !== undefined ||
    source !== undefined;

  const resetFilters = useCallback(() => {
    setSearch("");
    setDate(undefined);
    setType(undefined);
    setSource(undefined);
  }, []);

  return {
    search,
    setSearch: useCallback((value: string) => setSearch(value), []),
    date,
    setDate: useCallback((value: string | undefined) => setDate(value), []),
    type,
    setType: useCallback((value: string | undefined) => setType(value), []),
    source,
    setSource: useCallback((value: string | undefined) => setSource(value), []),
    resetFilters,
    filteredTransactions,
    hasActiveFilters,
  };
}
