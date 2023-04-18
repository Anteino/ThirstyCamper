import React from "react";
import MainView from "./MainView";

import ApiCall from "../../model/apicall";
import IResponse from "../../interface/response.interface";
import IUser from "../../interface/user.interface";

const MainViewController = () => {
  const [firstRun, setFirstRun] = React.useState<boolean>(true);
  const [responseData, setResponseData] = React.useState<IResponse | null>(
    null
  );
  const [responseCode, setResponseCode] = React.useState<number | null>(null);

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [ignoreUpdate, setIgnoreUpdate] = React.useState<boolean>(false);

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

      setUsers((current: IUser[]) => {
        return current.map((user: IUser) => {
          if (user.name === selectedUser.name) return selectedUser;
          else return user;
        });
      });
    }
  }, [selectedUser]);

  React.useEffect(() => {
    if (!firstRun) {
      // apiCall(
      //   "PUT",
      //   "users",
      //   {
      //     name: "Name",
      //   },
      //   setResponseCode,
      //   setResponseData
      // );
      apiCall("GET", "users", {}, setResponseCode, setUsers);
      // setUsers([
      //   {
      //     name: "Antoine",
      //     beers: 0,
      //     sodas: 0,
      //     arrivalDate: "",
      //     departureDate: "",
      //     skippedDinners: [],
      //   },
      // ]);
    }
    setFirstRun(false);
  }, [firstRun]);

  React.useEffect(() => {
    console.log(responseCode);
  }, [responseCode]);

  React.useEffect(() => {
    // console.log(responseData);
  }, [responseData]);

  const mainViewProps = {
    users: users,
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
    setIgnoreUpdate: setIgnoreUpdate,
  };

  return <MainView {...mainViewProps} />;
};

export default MainViewController;
