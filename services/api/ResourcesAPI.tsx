import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const ResourcesAPI = createApi({
  reducerPath: 'ResourcesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
    prepareHeaders: headers => {
      const token = getCookie('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      } else {
        Router.redirect('/connexion')
      }

      return headers
    }
  }),
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    getResource: builder.query<any, any>({
      query: id => ({
        url: `/resources/${id}`
      })
    }),
    getResources: builder.query<any, any>({
      query: () => ({
        url: `/resources`
      })
    })
  })
})
export const { useGetResourceQuery, useGetResourcesQuery } = ResourcesAPI
