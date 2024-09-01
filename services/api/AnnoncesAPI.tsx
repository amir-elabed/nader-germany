import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const AnnoncesAPI = createApi({
  reducerPath: 'AnnoncesAPI',
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
    getAnnonces: builder.query<any, any>({
      query: query => ({
        url: `/annonces${query?.status ? '?status=' + query.status : ''}${
          query?.date ? '&publish_date=' + query.date : ''
        }`
      })
    }),
    getAnnonce: builder.query<any, any>({
      query: id => ({
        url: `/annonces/${id}`
      })
    }),
    addAnnonce: builder.mutation({
      query: payload => ({
        url: `/annonces`,
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
export const { useGetAnnoncesQuery, useAddAnnonceMutation, useGetAnnonceQuery } = AnnoncesAPI
