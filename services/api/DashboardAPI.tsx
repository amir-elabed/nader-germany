import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'; // Import useRouter from next/router instead of Router


export const DashboardAPI = createApi({
  
  reducerPath: 'DashboardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
    prepareHeaders: headers => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter(); // Initialize useRouter hook
        router.push('/connexion'); // Use push method to redirect
      }

      return headers;
    }
  }),
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    getDashboardSuperAdmin: builder.query<any, any>({
      query: () => ({
        url: `/dashboard/superAdmin`
      })
    }),

    getDashboardAdminProjet: builder.query<any, any>({
      query: () => ({
        url: `/dashboard/admin`
      })
    }),


    getDashboardExpert: builder.query<any, any>({
      query: () => ({
        url: `/dashboard/expert`
      })
    }),

  })
});

export const { useGetDashboardSuperAdminQuery, useGetDashboardAdminProjetQuery, useGetDashboardExpertQuery } = DashboardAPI;