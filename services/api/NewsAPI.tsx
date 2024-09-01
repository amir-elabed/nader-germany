import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const NewsAPI = createApi({
  reducerPath: 'NewsAPI',
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
    getArticle: builder.query<any, any>({
      query: id => ({
        url: `/news/find/by/${id}`
      })
    }),
    getArticles: builder.query<any, any>({
      query: lang => ({
        url: `/news/${lang}`
      })
    })
  })
})
export const { useGetArticleQuery, useGetArticlesQuery } = NewsAPI
