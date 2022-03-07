import { useEffect, useState } from "react";

export type Response = Record<string, unknown>[];

const useFetch = ({ page }) => {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<null | Error>(null);

  useEffect(() => {
    let timeout;

    const fetchData = async () => {
      try {
        const res = await fetch("dataX.json");
        const json = await res.json();
        // The timeout simulates a delay to demonstrate the isLoading mechanism
        timeout = setTimeout(() => {
          setData(
            json.filter((cat, i) => {
              if (page === 1) {
                return i <= 4;
              } else {
                return i > 4;
              }
            })
          );
          setIsLoading(false);
        }, 1500);
      } catch (e) {
        setIsError(e);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, page]);

  useEffect(() => {
    setIsLoading(true);
  }, [page]);

  return { data, isError, isLoading };
};
export default useFetch;
