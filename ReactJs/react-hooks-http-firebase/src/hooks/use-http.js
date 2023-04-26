import React, { useState } from "react";

const useHttp = (reqConfig, formatFunc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendReq = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-demo-e866b-default-rtdb.firebaseio.com/tasks.json",
        {
          method: reqConfig.method,
          headers: reqConfig.headers,
          body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        }
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      formatFunc(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return { isLoading, error, sendReq };
};
export default useHttp;
