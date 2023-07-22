import { useEffect, useState } from "react";

type Options = {
  headers?: Headers;
};
type Headers = {
  "api-token"?: string;
  Accept?: string;
  "user-email"?: string;
  Authorization?: string;
};

const useFetch = (url: string, options?: Options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPIData = async (url: string) => {
    setLoading(true);

    try {
      const apiResponse = await fetch(url, { ...options });
      const json = await apiResponse.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPIData(url);
  }, []);

  const refetch = () => {
    fetchAPIData(url);
  };

  return { data, loading, error, refetch };
};

export default useFetch;
