import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const CoursAPI = createApi({
  reducerPath: 'CoursAPI',
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
  tagTypes: ['Post'],
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    getCours: builder.query<any, any>({
      query: () => ({
        url: `/cours`
      })
    }),
    getCoursById: builder.query<any, any>({
      query: id => ({
        url: `/cours/${id}`
      })
    }),
    addCours: builder.mutation({
      query: payload => ({
        url: `/cours`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    })
  })
})
export const { useGetCoursQuery, useAddCoursMutation, useGetCoursByIdQuery } = CoursAPI
