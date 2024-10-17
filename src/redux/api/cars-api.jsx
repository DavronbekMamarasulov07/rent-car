import { api } from "./index";

const carApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCars: build.query({
            query: (params) => ({
                url: "/cars",
                params: {
                    categories: params?.ckategories,
                    ...params
                },
            }),
            providesTags: ["CARDATA"]
        }),
        getCar: build.query({
            query: (id) => ({
                url: `/cars/${id}`,
            }),
            providesTags: ["CARDATA"],
        }),
        createCar: build.mutation({
            query: (body) => ({
                url: "/cars/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["CARDATA"]
        }),
        deleteCar: build.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CARDATA"]
        }),
        deteleFile : build.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CARDATA"]
        }),
        updateCar : build.mutation({
            query: ({body, id}) => ({
                url: `/cars/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["CARDATA"]
            
        }),
        searchCars: build.query({
            query: (params) => ({
                url: "/cars/search",
                params
            }),
            providesTags: ["CARDATA"]
        }),
    }),
});

export const { useGetAllCarsQuery , useCreateCarMutation, useDeleteCarMutation, useDeteleFileMutation, useUpdateCarMutation, useGetCarQuery, useSearchCarsQuery } = carApi