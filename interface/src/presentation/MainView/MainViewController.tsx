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

  const { apiCall } = ApiCall();

  React.useEffect(() => {
    if (!firstRun) {
      apiCall(
        "PUT",
        "users",
        {
          name: "Francien",
        },
        setResponseCode,
        setResponseData
      );
      apiCall("GET", "users", {}, setResponseCode, setUsers);
    }
    setFirstRun(false);
  }, [firstRun]);

  React.useEffect(() => {
    console.log(responseCode);
  }, [responseCode]);

  const mainViewProps = {
    users: users,
  };

  return <MainView {...mainViewProps} />;
};

export default MainViewController;
