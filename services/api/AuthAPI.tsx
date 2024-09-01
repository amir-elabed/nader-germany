import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthAPI = createApi({
  reducerPath: 'AuthAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`
  }),
  tagTypes: ['Post'],
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    authUser: builder.mutation({
      query: payload => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    }),
    forgetPassword: builder.mutation({
      query: payload => ({
        url: `auth/forgot-password`,
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
export const { useAuthUserMutation, useForgetPasswordMutation } = AuthAPI
