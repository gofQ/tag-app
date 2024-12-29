import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {APIURL} from '../../utils/config'
import { getToken } from '../../utils/as';


export const notificationsAPI=createApi({
    reducerPath:'notificationsAPI',
    baseQuery:fetchBaseQuery({baseUrl:APIURL}),
    endpoints:(builder)=>({
        getNotifications:builder.query({
            query:()=>({
                url:'/api/notifications/list',
                method:'GET'
            }),
        }),
    }),
})

export const {useGetNotificationsQuery }:any = notificationsAPI;