import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DateStringCell } from "@/components/common/DateString";
import { DataTable } from "@/components/data-table/data-table";
import useTableColumns from "@/hooks/useTableColumns";
import { DEFAULT_PAGINATION } from "@/lib/constants";
import { useLazyGetRolesQuery } from "@/services/admin";
import type { IRole } from "@/services/admin/types";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const Roles = () => {
  const [getRoles, { isLoading, data }] = useLazyGetRolesQuery();
  const [pagination, setPagination] =
    useState<PaginationState>(DEFAULT_PAGINATION);

  const columns: Array<ColumnDef<IRole>> = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Created at",
      accessorKey: "created_at",
      cell: DateStringCell,
    },
    {
      header: "Updated at",
      accessorKey: "updated_at",
      cell: DateStringCell,
    },
  ];

  const cols = useTableColumns<IRole>({
    columns,
    loading: isLoading,
  });

  useEffect(() => {
    getRoles({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    })
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <ContentLayout title="Roles">
      <DataTable
        columns={cols}
        data={data?.data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </ContentLayout>
  );
};

export default Roles;
