import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";

const BASE_URL = "https://679f576924322f8329c3664b.mockapi.io/api/vi/"

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  tagTypes: ["User"], //Used for caching and refetching
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        method: "GET",
        url: "usersList"
      }),
      providesTags: ['User']
    }),
    getUserById: builder.query<User, string>({
      // query: (id) => `/users/${id}`,
      query: (id) => ({
        method: 'GET',
        url: `usersList/${id}`
      }),
      providesTags: (result, error, id) => [{type: 'User', id}]
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '/usersList',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<User, { id: string; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `/usersList/${id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/usersList/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = apiSlice;
