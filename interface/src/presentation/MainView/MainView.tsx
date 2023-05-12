import React from "react";

import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import BasicDatePicker from "./components/datepicker";

import { SNACKBAR_DURATION } from "../../utils/constants";

import IUser from "../../interface/user.interface";
import ISnackbarMessage from "../../interface/snackbarmessage.interface";

import updateUser from "../../utils/updateuser";

const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  padding: theme.spacing(2),
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  width: "calc(100% - " + theme.spacing(2) + ")",
  height: theme.spacing(10),

  margin:
    theme.spacing(2) +
    " " +
    theme.spacing(1) +
    " " +
    theme.spacing(2) +
    " " +
    theme.spacing(1),
}));

const Spacer = styled(Box)(({ theme }) => ({
  width: theme.spacing(1),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  minHeight: "40px",

  padding:
    "0 " + theme.spacing(1) + " " + theme.spacing(2) + " " + theme.spacing(1),
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
  snackbarMessage: ISnackbarMessage;
}

const MainView: React.FC<IMainViewProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  setIgnoreUpdate,
  snackbarMessage,
}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const handleUserSelect = (event: any) => {
    const selectedUserName = event.target.value as string;
    setIgnoreUpdate(true);
    setSelectedUser(
      users.find((user) => user.name === selectedUserName) || null
    );
  };

  React.useEffect(() => {
    if (snackbarMessage.msg !== "") {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage]);

  return (
    <>
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
                  minDate={""}
                  maxDate={selectedUser.departureDate}
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
                  minDate={selectedUser.arrivalDate}
                  maxDate={""}
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
            <ButtonBox>
              <Button
                variant="contained"
                onClick={() => {
                  updateUser("beers", selectedUser.beers + 1, setSelectedUser);
                }}
                style={{ flexGrow: 1, fontSize: "30px" }}
              >
                +1 Beer
              </Button>
              <Spacer />
              <Button
                variant="contained"
                onClick={() => {
                  updateUser("beers", selectedUser.sodas + 1, setSelectedUser);
                }}
                style={{ flexGrow: 1, fontSize: "30px" }}
              >
                +1 Soda
              </Button>
            </ButtonBox>
          </>
        )}
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="error"
        >
          {snackbarMessage.msg} ({snackbarMessage.id.toString()})
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainView;
