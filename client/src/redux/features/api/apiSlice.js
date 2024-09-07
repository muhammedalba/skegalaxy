
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const cookies= new Cookies()
      const token = cookies.get('token') 
  

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
  

   
  
      return headers;
    }
  }),
  tagTypes: ['data'],
  endpoints: (builder) => ({
        //  You send the data to the server. We determine that we can use it with more than one login process and create an account
       createOne: builder.mutation({
          query: ({ url, body,method }) =>({
            url: url,
            method: method,
            body: body,
          
          }),
          // يقوم باستدعاء التاغ
          invalidatesTags:['data']
        }),
    
        // get data from database
        getData: builder.query({
          query: (filter) =>`${filter}`,
          // يقوم باستدعاء التاغ وعمل ريلود للصفحه
          providesTags: ['data'],
        }),
      
    
        // get one data from database
        getOne: builder.query({
          query: (id) =>`${id}`,
           providesTags: ['data'],
        }),
        invalidatesTags:['data'],
        // delet one data from database
        deletOne: builder.mutation({
          query: (url) =>
         ({ 
          // url =/ route/id items
          url: url,
          method: 'DELETE',
        }),
              // // يقوم باستدعاء التاغ
              invalidatesTags:['data']
        }), 
        
        //update one data from database
        updateOne: builder.mutation({
          query: ({ url, body,method }) =>({
            url: url,
            method: method,
            body: body,
          
          }),
        //  // يقوم باستدعاء التاغ
         invalidatesTags:['data']
        }),
    
      }),
    });


export const {
  useCreateOneMutation,
  useGetDataQuery,
  useDeletOneMutation,
  useGetOneQuery,
  useUpdateOneMutation,
} = apiSlice;

