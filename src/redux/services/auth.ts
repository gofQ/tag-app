import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIURL } from "../../utils/config";


export const auth=createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({baseUrl:APIURL}),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(body)=>({
                url:'/api/users/login',
                method:'POST',
                body
            })
        }),
        register:builder.mutation({
            query:(body)=>({
                url:'/api/users/register',
                method:'POST',
                body
            })
        }),
        checkPhone:builder.mutation({
            query:(body)=>({
                url:'/api/users/check-phone',
                method:'POST',
                body
            })
        }),
    })
})

export const {useLoginMutation,useRegisterMutation,checkPhone}:any=auth;