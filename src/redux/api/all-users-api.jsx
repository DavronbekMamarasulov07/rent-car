import { api } from "./index";

const allUsersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["ALLUSERS"],
    }),
    getUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["ALLUSERS"],
    }),
    getMe: build.query({
      query: () => ({
        url: "/auth/profile"
      }),
      providesTags: ["ALLUSERS"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ALLUSERS"],
    }),
    updateUser: build.mutation({
      query: ({body, id}) => ({
        url: `/users/${id}`,
        method: "PUT",
        body : {
          ...body
        }
      }),
      invalidatesTags: ["ALLUSERS"],
    }),
    promoteUser: build.mutation({
      query: (id) => ({
        url: `/users/promote/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["ALLUSERS"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMeQuery, useDeleteUserMutation, useUpdateUserMutation , usePromoteUserMutation, useGetUserQuery } =
  allUsersApi;
