import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  DateOnlyStringCell,
  DateStringCell,
} from "@/components/common/DateString";
import { DataTable } from "@/components/data-table/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useTableColumns from "@/hooks/useTableColumns";
import { DEFAULT_PAGINATION } from "@/lib/constants";
import {
  useCreateTimesheetMutation,
  useLazyGetTimesheetQuery,
} from "@/services/admin";
import type { ITimesheet } from "@/services/admin/types";
import type { RootState } from "@/store";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateTimesheet from "./create-timesheet";
import { Button } from "@/components/ui/button";
import type { CreateTimesheetPayload } from "@/services/admin/create-timesheet";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const Timesheet = () => {
  const [open, setOpen] = useState(false);
  const [getTimesheet, { isLoading, data }] = useLazyGetTimesheetQuery();
  const [pagination, setPagination] =
    useState<PaginationState>(DEFAULT_PAGINATION);
  const { uid } = useSelector((state: RootState) => state.user);
  const [createTimesheet, { isLoading: createTimesheetLoading }] =
    useCreateTimesheetMutation();

  // user_id: string;
  // project_id: string;
  // date: string;
  // work_type: string;
  // description: string;
  // hours: number;

  const columns: Array<ColumnDef<ITimesheet>> = [
    {
      header: "Date",
      accessorKey: "date",
      cell: DateOnlyStringCell,
    },
    {
      header: "Project name",
      accessorKey: "project.name",
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

  const cols = useTableColumns<ITimesheet>({
    columns,
    loading: isLoading,
  });

  useEffect(() => {
    getTimesheet({
      pagination: pagination,
      userId: uid,
    })
      .then(() => {})
      .catch(() => {});
  }, [pagination]);

  const createTimeSheetItem = async (item: CreateTimesheetPayload) => {
    const data = await createTimesheet(item);
    if ("error" in data) {
      const error = data.error as { data: { message: string } };
      toast.error(`Error: ${error?.data?.message}`);
      return;
    }
    if ("data" in data) {
      toast.success("Timesheet created successfully");
    }
    setOpen(false);
  };

  return (
    <ContentLayout title="Timesheet">
      <div className="flex justify-end mb-3">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Create Timesheet
        </Button>
      </div>
      <DataTable
        columns={cols}
        data={data?.data || []}
        pagination={pagination}
        rowCount={data?.total}
        onPaginationChange={setPagination}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {createTimesheetLoading && <Progress indeterminate />}
          <CreateTimesheet createTimesheet={createTimeSheetItem} />
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
};

export default Timesheet;
