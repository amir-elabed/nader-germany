import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const ModulesAPI = createApi({
  reducerPath: 'ModulesAPI',
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
  endpoints: builder => ({
    getModules: builder.query<any, any>({
      query: payload => ({
        url: `/modules${payload?.createdById ? '?createdById=' + payload?.createdById : ''}${
          payload?.expertId ? '?expertId=' + payload?.expertId : ''
        }`
      })
    }),
    getModule: builder.query<any, any>({
      query: payload => ({
        url: `/modules/${payload.id}`
      })
    }),
    addModule: builder.mutation({
      query: payload => ({
        url: `/modules`,
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
export const { useGetModulesQuery, useAddModuleMutation, useGetModuleQuery } = ModulesAPI
