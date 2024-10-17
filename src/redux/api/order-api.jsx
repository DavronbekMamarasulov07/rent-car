import { api } from "./index"

const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: () => ({
        url: "/orders"
      }),
      providesTags: ["ORDERS"]
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: "/orders/create",
        method: "POST",
        body
      }),
      invalidatesTags: ["ORDERS"]
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["ORDERS"]
    }),
    updateOrder: build.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["ORDERS"]
    }),
  })
})

export const { useGetAllOrdersQuery, useCreateOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation } = ordersApi