import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import IUser from "../../../interface/user.interface";
import dayjs from "dayjs";

interface IBasicDatePickerProps {
  selectedUser: IUser;
  setSelectedUser: Function;
  field: string;
}

const BasicDatePicker: React.FC<IBasicDatePickerProps> = ({
  selectedUser,
  setSelectedUser,
  field,
}) => {
  const handleOnAccept = (date: Date | null) => {
    setSelectedUser((current: IUser) =>
      Object.entries(current).reduce(
        (acc: { [key: string]: any }, [key, value]) => {
          if (key === field) acc[key] = date?.toString();
          else acc[key] = value;
          return acc;
        },
        {}
      )
    );
  };

  const extractDateObject: Function = (
    dateString: string | null | undefined
  ) => {
    if (dateString === null || dateString === undefined) return null;
    const dateObject = dayjs(dateString, "ddd, DD MMM YYYY HH:mm:ss [GMT]");
    return dateObject;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={extractDateObject(
          selectedUser[field as keyof IUser] as string | null | undefined
        )}
        onAccept={handleOnAccept}
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
