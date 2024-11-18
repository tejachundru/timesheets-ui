import { format } from "date-fns";

export const DATE_TIME_FORMAT = "dd-MMM-yyyy hh:mm a";
export const DATE_FORMAT = "dd-MMM-yyyy";

const DateTimeString = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, DATE_TIME_FORMAT)}</time>;
};

const DateOnlyString = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, DATE_FORMAT)}</time>;
};

/**
 * This component renders a date string in a table cell.
 */
const DateStringCell = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue() as string;
  return <DateTimeString dateString={value} />;
};

const DateOnlyStringCell = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue() as string;
  return <DateOnlyString dateString={value} />;
};

export { DateStringCell, DateOnlyStringCell, DateOnlyString, DateTimeString };
