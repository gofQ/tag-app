import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIURL } from "../../utils/config";
import { getToken } from "../../utils/as";


export const permissionsAPI=createApi({
    reducerPath:'permissionsAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL,
        prepareHeaders:async(headers)=>{
            const token= await getToken()
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:['Permissions'],
    endpoints:(builder)=>({
        addPermission:builder.mutation({
            query:(data)=>({
                url:'/api/communication/permissions',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Permissions']
        }),
        getPermissions:builder.query({
            query:()=>({
                url:'/api/communication/permissions',
                method:'GET'
            }),
            providesTags:['Permissions']
        }),
    }),
})

export const { useAddPermissionMutation,useGetPermissionsQuery }:any = permissionsAPI;