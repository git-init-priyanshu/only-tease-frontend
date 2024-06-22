import { useQuery } from '@tanstack/react-query';

import { API_ROUTES, API_URL, fetchJSON } from '@/utils';

const useGetListedSubscriptions = () => {
  return useQuery({
    queryKey: [API_ROUTES.LIST_SUBSCRIPTION_BASE],
    queryFn: async () => {
      const data = await fetchJSON(
        API_URL + `/` + API_ROUTES.LIST_SUBSCRIPTIONS,
        {
          method: 'GET',
        }
      );
      return data.data.sort(
        (a: any, b: any) => parseFloat(b.price) - parseFloat(a.price)
      ) as [];
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetListedSubscriptions;
