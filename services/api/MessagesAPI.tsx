import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const MessagesAPI = createApi({
  reducerPath: 'MessagesAPI',
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
    getMessage: builder.query<any, any>({
      query: id => ({
        url: `/messaging/${id}`
      })
    }),
    getMessages: builder.query<any, any>({
      query: () => ({
        url: `/messaging`
      })
    }),
    getSentMessages: builder.query<any, any>({
      query: () => ({
        url: `/messaging/sent`
      })
    }),
    getMessageHistory: builder.query<any, any>({
      query: payload => ({
        url: `/messages/sender/receiver?sender=${payload.sender}&receiver=${payload.receiver}`
      })
    }),
    getMyMessages: builder.query<any, any>({
      query: userId => ({
        url: `/messages/received?receiverId=${userId}`
      })
    }),
    getMySentMessages: builder.query<any, any>({
      query: userId => ({
        url: `/messages/sended?senderId=${userId}`
      })
    })
  })
})
export const {
  useGetMessageQuery,
  useGetMessagesQuery,
  useGetSentMessagesQuery,
  useGetMessageHistoryQuery,
  useGetMyMessagesQuery,
  useGetMySentMessagesQuery
} = MessagesAPI
