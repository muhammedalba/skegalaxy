import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authapi",
   
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_API,
    credentials: "include",
  }),
  // انشاء تاغ
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    //  You send the data to the server. We determine that we can use it with more than one login process and create an account
    Autapi: builder.mutation({
      query: ({ url, body, method }) => ({
        url: url,
        method: method,
        body: body,
      }),
      // يقوم باستدعاء التاغ
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useAutapiMutation } = authSlice;
