"use client";

import type {
  UseVisibilityToggleOptions,
  UseVisibilityToggleReturn,
} from "@/types";
import { useState, useCallback } from "react";

export function useVisibilityToggle({
  initialVisible = true,
  onToggle,
}: UseVisibilityToggleOptions = {}): UseVisibilityToggleReturn {
  const [visible, setVisibleState] = useState(initialVisible);

  const toggle = useCallback(() => {
    setVisibleState((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  }, [onToggle]);

  const setVisible = useCallback(
    (value: boolean) => {
      setVisibleState(value);
      onToggle?.(value);
    },
    [onToggle],
  );

  const show = useCallback(() => setVisible(true), [setVisible]);
  const hide = useCallback(() => setVisible(false), [setVisible]);

  return {
    visible,
    toggle,
    setVisible,
    show,
    hide,
  };
}
