import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const EvaluationAPI = createApi({
  reducerPath: 'EvaluationAPI',
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
    getEvaluation: builder.query<any, any>({
      query: id => ({
        url: `/evaluation/${id}`
      })
    }),
    getEvaluations: builder.query<any, any>({
      query: () => ({
        url: `/evaluation`
      })
    }),
    getEvaluationIncubes: builder.query<any, any>({
      query: id => ({
        url: `/evaluation/incube?evaluationPeriodeId=${id}`
      })
    }),
    getEvaluationIncube: builder.query<any, any>({
      query: id => ({
        url: `/evaluation/incube/${id}`
      })
    })
  })
})
export const { useGetEvaluationQuery, useGetEvaluationsQuery , useGetEvaluationIncubesQuery , useGetEvaluationIncubeQuery } = EvaluationAPI
