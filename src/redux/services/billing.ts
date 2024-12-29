import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {APIURL} from '../../utils/config'
import {getToken} from '../../utils/as'

export const billingAPI=createApi({
    reducerPath:'billingAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token=await getToken()
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:['Billing'],
    endpoints:(builder)=>({
        getBillingAddress:builder.query({
            query:()=>`/api/billing-addresses`,
            providesTags:['Billing']
        }),
        addBillingAddress:builder.mutation({
            query:(data)=>({
                url:`/api/billing-addresses/add`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Billing']
        }),
    }),
})

export const {useGetBillingAddressQuery,useAddBillingAddressMutation}:any=billingAPI;