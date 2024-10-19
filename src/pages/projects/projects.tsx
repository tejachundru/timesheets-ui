import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DateStringCell } from "@/components/common/DateString";
import { DataTable } from "@/components/data-table/data-table";
import useTableColumns from "@/hooks/useTableColumns";
import { DEFAULT_PAGINATION } from "@/lib/constants";
import { useLazyGetProjectsQuery } from "@/services/admin";
import type { IProject } from "@/services/admin/types";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const Projects = () => {
  const [getProjects, { isLoading, data }] = useLazyGetProjectsQuery();
  const [pagination, setPagination] =
    useState<PaginationState>(DEFAULT_PAGINATION);

  const columns: Array<ColumnDef<IProject>> = [
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

  const cols = useTableColumns<IProject>({
    columns,
    loading: isLoading,
  });

  useEffect(() => {
    getProjects({
      pagination: pagination,
    })
      .then(() => {})
      .catch(() => {});
  }, [pagination]);

  return (
    <ContentLayout title="Projects">
      <DataTable
        columns={cols}
        data={data?.data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </ContentLayout>
  );
};

export default Projects;
