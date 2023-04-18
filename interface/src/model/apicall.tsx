import { API_BASE_URL } from "../utils/constants";

const ApiCall = () => {
  const apiCall = (
    method: string,
    url: string,
    data: any,
    setResponseCode: Function,
    setResponseData: Function,
    nested = false
  ) => {
    var xhr = new XMLHttpRequest();

    try {
      xhr.open(method, API_BASE_URL + url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          setResponseCode(xhr.status);
          if (xhr.status === 200 || xhr.status === 201) {
            const responseJSON = JSON.parse(xhr.responseText);
            if (responseJSON !== null)
              if ("data" in responseJSON) setResponseData(responseJSON["data"]);
          } else if (!nested) {
            apiCall(
              (method = method),
              (url = url),
              (data = data),
              (setResponseCode = setResponseCode),
              (setResponseData = setResponseData),
              (nested = true)
            );
          } else {
            console.log("Api call to " + API_BASE_URL + url + " failed.");
          }
        }
      };

      if (data.size === 0) xhr.send();
      else {
        xhr.send(JSON.stringify(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { apiCall };
};

export default ApiCall;
