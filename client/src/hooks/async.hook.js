import { useState, useCallback, useEffect } from "react";

export const useAsync = (asyncFunction, immediate = true) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  console.log("async rerender");

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setLoading(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        return response;
      })
      .catch((error) => {
        setError(error);
        throw error;
      })
      .finally((response) => {
        setLoading(false);
        return response;
      });
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, loading, value, error };
};
