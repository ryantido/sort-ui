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
