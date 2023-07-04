import { useQuery } from 'react-query';
import { getPosts } from '../apis/good';

export type keyValueType = {
  [key: string]: string | number | undefined;
};

export const usePosts = (queryParameters: keyValueType) => {
  // console.log(!queryParameters['swLatitude'] && !queryParameters['swLongitude'] && !queryParameters['neLatitude'] && !queryParameters['neLongitude']);
  // if (!queryParameters['swLatitude'] && !queryParameters['swLongitude'] && !queryParameters['neLatitude'] && !queryParameters['neLongitude'])
  //   return {isLoading: true};

  let requestURL = Object.keys(queryParameters).includes('page') ? '/good/taker/search/title?' : '/good/taker/search/coordinate?';
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
      retry: 1,
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    }
  );

  return { isLoading, data };
};
