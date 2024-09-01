import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const GroupsAPI = createApi({
  reducerPath: 'GroupsAPI',
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
    getGroups: builder.query<any, any>({
      query: () => ({
        url: `/groups`
      })
    }),
    getGroup: builder.query<any, any>({
      query: id => ({
        url: `/groups/${id}`
      })
    }),
    addGroup: builder.mutation({
      query: payload => ({
        url: `/groups`,
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
export const { useGetGroupsQuery, useAddGroupMutation, useGetGroupQuery } = GroupsAPI
