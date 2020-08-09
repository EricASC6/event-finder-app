import { useState, useCallback, useEffect } from "react";

export const useAsync = ({
  fn = () => Promise.resolve(),
  immediate = true,
  initLoading = false,
  onResolve = () => {},
}) => {
  const [loading, setLoading] = useState(initLoading);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  // console.log("async rerender");

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (...args) => {
      console.log("executed");

      setLoading(true);
      setValue(null);
      setError(null);
      return fn(...args)
        .then((response) => {
          setValue(response);
          onResolve(response);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [fn, onResolve]
  );

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
