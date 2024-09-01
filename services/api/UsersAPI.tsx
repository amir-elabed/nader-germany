import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const UsersAPI = createApi({
  reducerPath: 'UsersAPI',
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
    getUsers: builder.query<any, any>({
      query: payload => ({
        url: `/users?${payload?.status ? `&status=${payload?.status}` : ''}${
          payload?.role ? `&role=${payload?.role}` : ''
        }${payload?.projectId ? `&projectId=${payload?.projectId}` : ''}`
      })
    }),
    getUser: builder.query<any, any>({
      query: id => ({
        url: `/users/${id}`
      })
    })
  })
})
export const { useGetUsersQuery, useGetUserQuery } = UsersAPI
