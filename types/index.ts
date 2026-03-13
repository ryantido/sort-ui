import type { team } from "@/constants/team";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: "completed" | "pending" | "failed";
  accountId: string;
};

export type Account = {
  id: string;
  name: string;
  type: string;
  balance?: number;
  platform?: string;
};

export type FilterButtonLabel = "Date" | "Type" | "Source";

export type Organization = {
  id: string;
  name: string;
  plan: string;
  currency: string;
  createdAt: string;
};

export type Team = {
  id: string;
  name: string;
  memberCount: number;
  walletId: string | null;
};

export type Periods = {
  current: {
    start: string;
    end: string;
  };
  previous: {
    start: string;
    end: string;
  };
};

export type Data = {
  organization: Organization;
  transactions: Transaction[];
  accounts: Account[];
  teams: Team[];
  periods: Periods;
};

export type Items = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    embeded?: {
      title: string;
      url: string;
    }[];
  }[];
};

export type Projects = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

export type TeamType = typeof team;

export interface BalanceCardProps {
  organizationName: string;
  accounts: Account[];
  transactions: Transaction[];
  walletId?: string;
}

export interface BalanceStatProps {
  label: string;
  amount: number;
}

export interface MetricCardProps {
  title: string;
  amount: number;
  iconSrc: string;
  iconAlt: string;
  iconStyle: "blue" | "yellow";
  period?: string;
}

export interface OverviewMetricsProps {
  data: Data;
}

export interface OverviewTableProps {
  transactions: Transaction[];
  accounts: Account[];
  slice: number;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
  visible?: boolean;
}

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export interface FilterButtonProps {
  label: string;
  options: readonly string[] | string[];
  onSelect: (value: string) => void;
  "aria-label"?: string;
}

export interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export interface TransactionStatusBadgeProps {
  status: Transaction["status"];
}

export interface FilterTransactionsOptions {
  search?: string;
  date?: string;
  type?: string;
  source?: string;
  accountsMap: Record<string, string>;
  daysMap: Record<string, number>;
}

export type PaginationItem = number | "...";

export interface TransactionFilterFn {
  (transaction: Transaction): boolean;
}

export interface UseVisibilityToggleOptions {
  initialVisible?: boolean;
  onToggle?: (visible: boolean) => void;
}

export interface UseVisibilityToggleReturn {
  visible: boolean;
  toggle: () => void;
  setVisible: (visible: boolean) => void;
  show: () => void;
  hide: () => void;
}

export interface TransactionFilterState {
  search: string;
  date: string | undefined;
  type: string | undefined;
  source: string | undefined;
}

export interface UseTransactionFiltersOptions {
  transactions: Transaction[];
  accountsMap: Record<string, string>;
}

export interface UseTransactionFiltersReturn extends TransactionFilterState {
  setSearch: (value: string) => void;
  setDate: (value: string | undefined) => void;
  setType: (value: string | undefined) => void;
  setSource: (value: string | undefined) => void;
  resetFilters: () => void;
  filteredTransactions: Transaction[];
  hasActiveFilters: boolean;
}

export interface UseTeamFilterOptions {
  team: TeamType;
  initialSearch?: string;
}

export interface UseTeamFilterReturn {
  search: string;
  setSearch: (value: string) => void;
  filteredTeam: TeamType;
  hasResults: boolean;
}

export interface UsePaginationOptions {
  totalItems: number;
  initialPageSize?: number;
  initialPage?: number;
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}
