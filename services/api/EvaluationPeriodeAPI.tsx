import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const EvaluationPeriodeAPI = createApi({
  reducerPath: 'EvaluationPeriodeAPI',
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
    getEvaluationPeriode: builder.query<any, any>({
      query: id => ({
        url: `/evaluation-periode/${id}`
      })
    }),
    getEvaluationsPeriode: builder.query<any, any>({
      query: () => ({
        url: `/evaluation-periode`
      })
    })
  })
})
export const { useGetEvaluationPeriodeQuery, useGetEvaluationsPeriodeQuery } = EvaluationPeriodeAPI
