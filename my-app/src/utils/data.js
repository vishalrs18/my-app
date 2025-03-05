import { useEffect, useState } from "react";
import { fetchApi } from "./fetchWrapper";

export const useFetchData = (isCall, fetchParams) => {
  const [data, setData] = useState();
  const [errors, SetErrors] = useState();
  useEffect(() => {
    if (isCall) {
      const getData = () => {
        fetchApi(fetchParams).then((res) => {
          if (res.statusCode !== 200 && res.statusCode !== 201) {
            SetErrors(res.message);
          } else {
            setData(res);
          }
        });
      };
      getData();
    }
  }, [isCall]);

  return [{ data, errors }];
};
