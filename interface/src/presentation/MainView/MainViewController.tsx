import React from "react";
import MainView from "./MainView";

import ApiCall from "../../model/apicall";
import IResponse from "../../interface/response.interface";
import IUser from "../../interface/user.interface";
import ISnackbarMessage from "../../interface/snackbarmessage.interface";

const MainViewController = () => {
  const [firstRun, setFirstRun] = React.useState<boolean>(true);
  const [responseData, setResponseData] = React.useState<IResponse | null>(
    null
  );
  const [responseCode, setResponseCode] = React.useState<number | null>(null);

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [usersBackup, setUsersBackup] = React.useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [ignoreUpdate, setIgnoreUpdate] = React.useState<boolean>(false);

  const [snackbarMessage, setSnackbarMessage] =
    React.useState<ISnackbarMessage>({ msg: "", id: 0 });

  const { apiCall } = ApiCall();

  React.useEffect(() => {
    if (selectedUser !== null) {
      if (!ignoreUpdate) {
        apiCall(
          "PATCH",
          "users",
          selectedUser,
          setResponseCode,
          setResponseData
        );
      }
      setIgnoreUpdate(false);
    }
  }, [selectedUser]);

  React.useEffect(() => {
    if (!firstRun) {
      apiCall("GET", "users", {}, setResponseCode, setUsers);
    }
    setFirstRun(false);
  }, [firstRun]);

  React.useEffect(() => {
    if (responseCode !== null) {
      if (responseCode < 200 || responseCode >= 300) {
        //  Restore local backup of user after failed API request
        setSnackbarMessage((current: ISnackbarMessage) => {
          return { msg: "Action failed.", id: current.id + 1 };
        });
        const tmp: IUser | undefined = users.find(
          (user: IUser) => user?.name === selectedUser?.name
        );
        setSelectedUser(tmp !== undefined ? tmp : null);
        setIgnoreUpdate(true);
      } else {
        //  Backup user locally after succesful API request
        if (selectedUser !== null) {
          setUsers((current: IUser[]) => {
            return current.map((user: IUser) => {
              if (user.name === selectedUser.name) return selectedUser;
              else return user;
            });
          });
        }
      }
    }
    setResponseCode(null);
  }, [responseCode]);

  React.useEffect(() => {}, [responseData]);

  const mainViewProps = {
    users: users,
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
    setIgnoreUpdate: setIgnoreUpdate,
    snackbarMessage: snackbarMessage,
  };

  return <MainView {...mainViewProps} />;
};

export default MainViewController;
