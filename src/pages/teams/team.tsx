import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DateStringCell } from "@/components/common/DateString";
import { DataTable } from "@/components/data-table/data-table";
import useTableColumns from "@/hooks/useTableColumns";
import { DEFAULT_PAGINATION } from "@/lib/constants";
import { useLazyGetTeamsQuery } from "@/services/admin";
import type { ITeam } from "@/services/admin/types";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const Teams = () => {
  const [getTeams, { isLoading, data }] = useLazyGetTeamsQuery();
  const [pagination, setPagination] =
    useState<PaginationState>(DEFAULT_PAGINATION);

  const columns: Array<ColumnDef<ITeam>> = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
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

  const cols = useTableColumns<ITeam>({
    columns,
    loading: isLoading,
  });

  useEffect(() => {
    getTeams({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    })
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <ContentLayout title="Teams">
      <DataTable
        columns={cols}
        data={data?.data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </ContentLayout>
  );
};

export default Teams;
