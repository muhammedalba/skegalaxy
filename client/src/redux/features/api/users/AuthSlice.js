import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
// const token = cookies.get("token");
export const authSlice = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_API,
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
