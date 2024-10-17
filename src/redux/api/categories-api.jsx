import  { api } from "./index";

const categoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["CATEGORY"],
        }),
        createCategory: build.mutation({
            query: (body) => ({
                url: "/categories/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["CATEGORY"],
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CATEGORY"],
        }),
        updateCategory: build.mutation({
            query: ({body, id}) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["CATEGORY"],
        }),
    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesApi