import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const PartnersAPI = createApi({
  reducerPath: 'PartnersAPI',
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
    getPartner: builder.query<any, any>({
      query: id => ({
        url: `/partners/${id}`
      })
    }),
    getPartners: builder.query<any, any>({
      query: () => ({
        url: `/partners`
      })
    })
  })
})
export const { useGetPartnerQuery, useGetPartnersQuery } = PartnersAPI
