import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import IUser from "../../../interface/user.interface";
import updateUser from "../../../utils/updateuser";

interface IBasicDatePickerProps {
  selectedUser: IUser;
  setSelectedUser: Function;
  field: string;
  minDate: string;
  maxDate: string;
}

const BasicDatePicker: React.FC<IBasicDatePickerProps> = ({
  selectedUser,
  setSelectedUser,
  field,
  minDate,
  maxDate,
}) => {
  const handleOnAccept = (date: Date | null) => {
    // setSelectedUser((current: IUser) =>
    //   Object.entries(current).reduce(
    //     (acc: { [key: string]: any }, [key, value]) => {
    //       if (key === field) acc[key] = date?.toString();
    //       else acc[key] = value;
    //       return acc;
    //     },
    //     {}
    //   )
    // );
    updateUser(field, date?.toString(), setSelectedUser);
  };

  const extractDateObject: Function = (
    dateString: string | null | undefined
  ) => {
    if (dateString === null || dateString === undefined || dateString === "")
      return null;
    const dateObject = dayjs(dateString, "ddd, DD MMM YYYY HH:mm:ss [GMT]");
    return dateObject;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        minDate={extractDateObject(minDate)}
        maxDate={extractDateObject(maxDate)}
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
