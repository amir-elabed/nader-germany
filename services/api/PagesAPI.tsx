import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const PagesAPI = createApi({
  reducerPath: 'PagesAPI',
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
    getPage: builder.query<any, any>({
      query: id => ({
        url: `/pages/find/by/${id}`
      })
    }),
    getPages: builder.query<any, any>({
      query: payload => ({
        url: `/pages/${payload?.lang}`
      })
    }),
    getPagesByProjects: builder.query<any, any>({
      query: payload => ({
        url: `/pages/project-pages/${payload?.id}/${payload?.lang}`
      })
    }),
    getPagesBySlug: builder.query<any, any>({
      query: payload => ({
        url: `/pages/slug/${payload?.lang}/${payload?.slug}`
      })
    })
  })
})
export const { useGetPageQuery, useGetPagesQuery, useGetPagesBySlugQuery, useGetPagesByProjectsQuery } = PagesAPI
