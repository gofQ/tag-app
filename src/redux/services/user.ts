import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIURL } from '../../utils/config';
import { getToken } from "../../utils/as";


export const userAPI=createApi({
    reducerPath:'userAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token=await getToken();
            if(token){
                headers.set('authorization',`Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({
        getUser:builder.query({
            query:()=>`/api/users/info`,
            providesTags:['User']
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`/api/users/update`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['User']
        }),
    }),
})

export const {useGetUserQuery,useUpdateUserMutation}:any=userAPI;