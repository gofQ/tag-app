import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIURL } from "../../utils/config";
import { getToken } from "../../utils/as";


export const rentalAPI=createApi({
    reducerPath:'rentalAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token=await getToken()
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Rental'],
    endpoints:(builder)=>({
        rentScooter:builder.mutation({
            query:(data)=>({
                url:'/api/rentals/rent',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Rental']
        }),
        getCurrentScooter:builder.query({
            query:()=>({
                url:'/api/rentals/current-scooter',
                method:'GET',
            }),
            providesTags:['Rental']
        }),
        endRental:builder.mutation({
            query:(data)=>({
                url:'/api/rentals/end-rental',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Rental']
        }),
        getScooters:builder.query({
            query:()=>({
                url:'/api/scooters/all',
                method:'GET'
            }),
            providesTags:['Rental']
        }),
    }),
    
});

export const {useRentScooterMutation,useGetCurrentScooterQuery,useEndRentalMutation,useGetScootersQuery}:any=rentalAPI;