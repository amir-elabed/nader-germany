import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const EventsAPI = createApi({
  reducerPath: 'EventsAPI',
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
    getEvent: builder.query<any, any>({
      query: id => ({
        url: `/events/${id}`
      })
    }),
    getEvents: builder.query<any, any>({
      query: (payload: any) => ({
        url: `/events${payload?.createdBy ? '?createdById=' + payload?.createdBy : ''}`
      })
    })
  })
})
export const { useGetEventQuery, useGetEventsQuery } = EventsAPI
