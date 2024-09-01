import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Router from 'next/navigation'

export const QuestionsAPI = createApi({
  reducerPath: 'QuestionsAPI',
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
  tagTypes: ['Post'],
  endpoints: builder => ({
    getQuestions: builder.query<any, any>({
      query: () => ({
        url: `/questions`
      })
    }),
    addQuestion: builder.mutation({
      query: payload => ({
        url: `/questions`,
        method: 'POST',
        body: { content: payload.question },
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    }),
    addComment: builder.mutation({
      query: payload => ({
        url: `/questions/${payload.questionId}/comments`,
        method: 'POST',
        body: { content: payload.comment },
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    }),
    addReplyToComment: builder.mutation({
      query: payload => ({
        url: `/questions/${payload.questionId}/comments/${payload.commentId}/replies`,
        method: 'POST',
        body: { content: payload.comment },
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    })
  })
})
export const { useGetQuestionsQuery, useAddCommentMutation, useAddQuestionMutation, useAddReplyToCommentMutation } =
  QuestionsAPI
