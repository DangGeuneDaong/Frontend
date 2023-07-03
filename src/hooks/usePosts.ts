import { useQuery } from 'react-query';
import { getPosts } from '../apis/good';

export type keyValueType = {
  [key: string]: string | number | undefined;
};

export const usePosts = (queryParameters: keyValueType) => {
  let requestURL = '/good/taker/search/title?';
  for (const parameterKey in queryParameters) {
    if (
      queryParameters[parameterKey] &&
      queryParameters[parameterKey] !== 'all'
    )
      requestURL += `${parameterKey}=${queryParameters[parameterKey]}&`;
  }

  requestURL = requestURL.substring(0, requestURL.length - 1);

  const { isLoading, data } = useQuery(
    requestURL,
    () => getPosts(requestURL),
    {
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    }
  );

  return { isLoading, data };
};
