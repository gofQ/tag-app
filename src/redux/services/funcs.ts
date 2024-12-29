import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { APIURL } from "../../utils/config";
import { getToken } from "../../utils/as";


export const funcs=createApi({
    reducerPath:'funcs',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token=await getToken()
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        incrementTagByLocation: builder.mutation({
            query:(data)=>({
                url:'/api/increment/increment',
                method:'POST',
                body:data
            }),
        }),

        saveGmail: builder.mutation({
            query:(data)=>({
                url:'/api/function/gmail',
                method:'POST',
                body:data
            }),
        }),

        saveContactMessage: builder.mutation({
            query:(data)=>({
                url:'/api/function/contact',
                method:'POST',
                body:data
            }),
        }),

        getContact: builder.query({
            query:()=>({
                url:'/api/function/contact',
                method:'GET'
            }),
        }),
        checkPhone: builder.mutation({
            query:(data)=>({
                url:'/api/users/check-phone',
                method:'POST',
                body:data
            }),
        }),

    }),
});

export const {useIncrementTagByLocationMutation,useSaveGmailMutation,useSaveContactMessageMutation,useGetContactQuery,useCheckPhoneMutation}:any=funcs;