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

  minHeight: "40px",

  padding: "0px 8px 4px 8px",
}));

const AttrCol = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: "150px",
  maxWidth: "150px",
  height: "40px",

  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "20px",

  color: "#333035",
}));

const ValueCol = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
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
  selectedUser: IUser | null;
  setSelectedUser: Function;
  setIgnoreUpdate: Function;
}

const MainView: React.FC<IMainViewProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  setIgnoreUpdate,
}) => {
  const handleUserSelect = (event: any) => {
    const selectedUserName = event.target.value as string;
    setIgnoreUpdate(true);
    setSelectedUser(
      users.find((user) => user.name === selectedUserName) || null
    );
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
            <AttrCol>Arrival</AttrCol>
            <ValueCol>
              <BasicDatePicker
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                field="arrivalDate"
              />
            </ValueCol>
          </InfoRow>
          <InfoRow>
            <AttrCol>Departure</AttrCol>
            <ValueCol>
              <BasicDatePicker
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                field="departureDate"
              />
            </ValueCol>
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
