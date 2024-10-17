import { api } from "../api";


const fileApi = api.injectEndpoints({
    endpoints: (build) => ({
        deleteFile: build.mutation({
            query: ({name}) => ({
                url: `/upload/delete/${name}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useDeleteFileMutation } = fileApi