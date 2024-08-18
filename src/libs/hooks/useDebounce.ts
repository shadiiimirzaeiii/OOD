import { ChangeEvent, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = (debounceFunc: (e: ChangeEvent<HTMLInputElement>) => void, delay?: number) => {
  const debouncedResults = useMemo(() => {
    return debounce(debounceFunc, delay ?? 600);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return debouncedResults;
};

export default useDebounce;
