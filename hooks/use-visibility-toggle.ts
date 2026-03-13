"use client";

import { useState, useCallback } from "react";

interface UseVisibilityToggleOptions {
  initialVisible?: boolean;
  onToggle?: (visible: boolean) => void;
}

interface UseVisibilityToggleReturn {
  visible: boolean;
  toggle: () => void;
  setVisible: (visible: boolean) => void;
  show: () => void;
  hide: () => void;
}

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
