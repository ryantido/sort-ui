import type { PaginationControlsProps } from "@/types";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { PAGE_SIZE_OPTIONS } from "@/constants/styles";
import { TEXT_COLORS } from "@/constants/styles";

export function PaginationControls({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="w-13.5 h-8"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(page - 1)}
          style={{ color: TEXT_COLORS.darkGray }}
          aria-label="Go to previous page"
        >
          Prev
        </Button>

        <Button
          variant="outline"
          className="w-13.5 h-8"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
          style={{ color: TEXT_COLORS.darkGray }}
          aria-label="Go to next page"
        >
          Next
        </Button>

        <div className="ml-4 text-sm text-muted-foreground">
          Page {page} of {totalPages || "1"}
        </div>
      </div>

      <ToggleGroup
        type="single"
        value={String(pageSize)}
        onValueChange={(val) => {
          if (!val) return;
          onPageSizeChange(Number(val));
        }}
        aria-label="Select page size"
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <ToggleGroupItem
            key={size}
            value={String(size)}
            className="focus:text-active focus:border focus:border-active focus:rounded"
            aria-label={`Show ${size} items per page`}
          >
            {size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
