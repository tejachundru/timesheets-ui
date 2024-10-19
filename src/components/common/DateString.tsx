const DateString = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{date.toLocaleString()}</time>;
};

/**
 * This component renders a date string in a table cell.
 */
const DateStringCell = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue() as string;
  return <DateString dateString={value} />;
};

export { DateStringCell };
export default DateString;
