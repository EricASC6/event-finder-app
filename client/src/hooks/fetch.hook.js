import { useState, useEffect } from "react";
import Cache from "../services/cache";

const cache = new Cache();

export const useFetch = (url, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      console.log(cache);

      // check if the result of the api call already exists in the cache
      if (cache.has(url)) {
        const data = cache.get(url);
        console.log(url);
        console.log("Already exists in cache");
        setResponse(data);
        setLoading(false);
      } else {
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          cache.set(url, json);
          setResponse(json);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { loading, error, response };
};
