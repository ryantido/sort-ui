"use client";

import { useState, useMemo, useCallback } from "react";
import type { TeamType } from "@/types";

interface UseTeamFilterOptions {
  team: TeamType;
  initialSearch?: string;
}

interface UseTeamFilterReturn {
  search: string;
  setSearch: (value: string) => void;
  filteredTeam: TeamType;
  hasResults: boolean;
}

export function useTeamFilter({
  team,
  initialSearch = "",
}: UseTeamFilterOptions): UseTeamFilterReturn {
  const [search, setSearch] = useState(initialSearch);

  const filteredTeam = useMemo(() => {
    const query = search.toLowerCase().trimStart();
    if (query === "") return team;

    return team.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query),
    );
  }, [team, search]);

  const hasResults = filteredTeam.length > 0;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return {
    search,
    setSearch: handleSearch,
    filteredTeam,
    hasResults,
  };
}
