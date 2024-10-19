import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DateStringCell } from "@/components/common/DateString";
import { DataTable } from "@/components/data-table/data-table";
import useTableColumns from "@/hooks/useTableColumns";
import { DEFAULT_PAGINATION } from "@/lib/constants";
import { useLazyGetUsersQuery } from "@/services/admin";
import type { IUser } from "@/services/admin/types";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

// id: string;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   fullname: string;
//   email: string;
//   phone: string | null;
//   is_active: boolean;
//   is_blocked: boolean;
//   role_id: string;
//   team_id: string | null;
//   upload_id: string | null;
const Users = () => {
  const [getUsers, { isLoading, data }] = useLazyGetUsersQuery();
  const [pagination, setPagination] =
    useState<PaginationState>(DEFAULT_PAGINATION);

  const columns: Array<ColumnDef<IUser>> = [
    {
      header: "id",
      accessorKey: "id",
    },
    {
      header: "Fullname",
      accessorKey: "fullname",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Is active",
      accessorKey: "is_active",
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

    {
      header: "Is blocked",
      accessorKey: "is_blocked",
    },
    {
      header: "Role id",
      accessorKey: "role_id",
    },
    {
      header: "Team id",
      accessorKey: "team_id",
    },
  ];

  const cols = useTableColumns<IUser>({
    columns,
    loading: isLoading,
  });

  useEffect(() => {
    getUsers({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    })
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <ContentLayout title="Users">
      <DataTable
        columns={cols}
        data={data?.data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </ContentLayout>
  );
};

export default Users;
