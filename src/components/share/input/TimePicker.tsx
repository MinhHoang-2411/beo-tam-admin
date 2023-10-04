import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface ITimePicker {
  value: any;
  onChange: (value: any) => void;
  label: string;
  inputRef?: any;
  slotProps?: any;
}
export default function TimePicker({
  value,
  onChange,
  label,
  inputRef,
  slotProps,
}: ITimePicker) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "100%" }}
          format="DD/MM/YYYY"
          label={label}
          value={value}
          onChange={onChange}
          slotProps={slotProps}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
