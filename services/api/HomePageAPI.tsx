import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const HomePageAPI = createApi({
  reducerPath: 'HomePageAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`
  }),
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    getHomePage: builder.query<any, any>({
      query: () => ({
        url: `/pages/homePage`
      })
    })
  })
})
export const { useGetHomePageQuery } = HomePageAPI