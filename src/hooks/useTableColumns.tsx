import React from "react";
import type { ColumnDef } from "@tanstack/react-table"; // Adjust this import if needed
import { Skeleton } from "@/components/ui/skeleton";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  loading: boolean;
};

const useTableColumns = <T,>({
  columns,
  loading,
}: Props<T>): Array<ColumnDef<T>> => {
  return React.useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-9 w-full" />,
          }))
        : columns,
    [columns, loading] // Proper dependency array
  );
};

export default useTableColumns;
