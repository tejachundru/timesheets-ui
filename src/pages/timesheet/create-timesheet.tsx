/* eslint-disable camelcase */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CreateTimesheetPayload } from "@/services/admin/create-timesheet";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" }),
  hours: z.string().refine((value) => !Number.isNaN(Number(value)), {
    message: "Hours should be a number",
  }),
  projectId: z
    .string()
    .min(3, { message: "Project should be at least 3 characters" }),
  date: z.date({
    message: "Date should be a valid date",
  }),
  workType: z.enum(["WFH", "WFO"]),
});

type FormData = z.infer<typeof schema>;

export default function CreateTimesheet({
  createTimesheet,
}: {
  createTimesheet: (data: CreateTimesheetPayload) => Promise<any>;
}) {
  const { uid } = useSelector((state: RootState) => state.user);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      hours: "",
      projectId: "",
      date: new Date(),
      workType: "WFH",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (data: FormData) => {
    void createTimesheet({
      user_id: uid,
      description: data.description,
      hours: Number(data.hours),
      project_id: data.projectId,
      date: new Date(data.date.setHours(9, 0, 0, 0)),
      work_type: data.workType,
    });
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Date of the timesheet</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Work type</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="WFH" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Work from home
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="WFO" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Work from office
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours</FormLabel>
              <FormControl>
                <Input placeholder="Hours" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input placeholder="Project ID" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
