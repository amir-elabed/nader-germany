import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const ProjetAPI = createApi({
  reducerPath: 'ProjetAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
    prepareHeaders: headers => {
      const token = getCookie('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    getProjet: builder.query<any, any>({
      query: id => ({
        url: `/projects/project/by/${id}`
      })
    }),
    getProjetByLabel: builder.query<any, any>({
      query: payload => ({
        url: `/projects/label/${payload?.lang}/${payload?.label}`
      })
    }),
    getProjets: builder.query<any, any>({
      query: payload => ({
        url: `/projects/${payload?.lang}/${payload.label ? '/?label=' + payload.label : ''}`
      })
    })
  })
})
export const { useGetProjetQuery, useGetProjetsQuery, useGetProjetByLabelQuery } = ProjetAPI
