import React from "react";

import IUser from "../../interface/user.interface";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import BasicDatePicker from "./components/datepicker";

const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  padding: theme.spacing(2),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  padding: "8px 8px 8px 8px",
}));

const AttrCol = styled(Box)(({ theme }) => ({
  width: "150px",

  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "20px",

  color: "#333035",
}));

const ValueCol = styled(Box)(({ theme }) => ({
  flexGrow: 1,

  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "20px",

  color: "#333035",
}));

interface IMainViewProps {
  users: IUser[];
}

const MainView: React.FC<IMainViewProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [arrivalDate, setArrivalDate] = React.useState<Date | null>(null);

  const handleUserSelect = (event: any) => {
    const selectedUserName = event.target.value as string;
    const selectedUser =
      users.find((user) => user.name === selectedUserName) || null;
    setSelectedUser(selectedUser);
  };

  return (
    <Container>
      <Box mt={0} mb={4} width="100%">
        <Typography variant="h6">Select your account</Typography>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser ? selectedUser.name : ""}
          onChange={handleUserSelect}
          sx={{ width: "100%" }}
        >
          {users.map((user) => (
            <MenuItem key={user.name} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {selectedUser && (
        <>
          <InfoRow>
            <AttrCol>Name</AttrCol>
            <ValueCol>{selectedUser.name}</ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Date picker test</AttrCol>
            <ValueCol>
              <BasicDatePicker />
            </ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Arrival</AttrCol>
            <ValueCol>{selectedUser.arrivalDate}</ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Departure</AttrCol>
            <ValueCol>{selectedUser.departureDate}</ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Beers</AttrCol>
            <ValueCol>{selectedUser.beers}</ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Sodas</AttrCol>
            <ValueCol>{selectedUser.sodas}</ValueCol>
          </InfoRow>
        </>
      )}
    </Container>
  );
};

export default MainView;
