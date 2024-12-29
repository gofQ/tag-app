import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIURL } from "../../utils/config";
import { getToken } from "../../utils/as";



export const balanceAPI=createApi({ 
    reducerPath:'balanceAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token= await getToken()
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:['Balance'],
    endpoints:(builder)=>({
        getBalance:builder.query({
            query:()=>({
                url:'/api/balance',
                method:'GET'
            }),
            providesTags:['Balance']
        }),
        addBalance:builder.mutation({
            query:(data)=>({
                url:'/api/balance/load',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Balance']
        }),
        getTransactions:builder.query({
            query:()=>({
                url:'/api/balance/transactions',
                method:'GET'
            }),
            providesTags:['Balance']
        }),
        transferBalance:builder.mutation({
            query:(data)=>({
                url:'/api/balance/transfer-by-phone',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Balance']
        }),
        


    }),
});

export const {useGetBalanceQuery,useAddBalanceMutation,useGetTransactionsQuery,useTransferBalanceMutation}:any=balanceAPI;