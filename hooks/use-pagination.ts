"use client";

import { useState, useMemo, useCallback } from "react";

interface UsePaginationOptions {
  totalItems: number;
  initialPageSize?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
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

export function usePagination({
  totalItems,
  initialPageSize = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );

  const startIndex = useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const endIndex = useMemo(
    () => Math.min(startIndex + pageSize, totalItems),
    [startIndex, pageSize, totalItems],
  );

  const canGoNext = page < totalPages;
  const canGoPrevious = page > 1;

  const setPage = useCallback(
    (newPage: number) => {
      const clampedPage = Math.max(1, Math.min(newPage, totalPages));
      setPageState(clampedPage);
    },
    [totalPages],
  );

  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize);
    setPageState(1);
  }, []);

  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      setPageState((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      setPageState((prev) => Math.max(1, prev - 1));
    }
  }, [canGoPrevious]);

  return {
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    setPageSize,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrevious,
  };
}
