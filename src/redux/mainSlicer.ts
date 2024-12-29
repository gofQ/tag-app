import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../utils/as";
import { APIURL } from "../utils/config";

type initialStateType={
    myLocation:{
        latitude:number | undefined,
        longitude:number | undefined
    },
    userInfos:{} | any
}

const initialState:initialStateType={
    myLocation:{
        latitude:undefined,
        longitude:undefined
    },
    userInfos:{}
}

export const getUserInformations=createAsyncThunk(
    'main/getUserInformations',
    async()=>{
        const token=await getToken();
        const response=await fetch(`${APIURL}/api/users/info`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
            }
        }
        );
        
        
        return response.json();
    }
)


const mainSlice=createSlice({
    name:'main',
    initialState,
    reducers:{
        setMyLocation:(state,action)=>{
            state.myLocation.latitude=action.payload.latitude;
            state.myLocation.longitude=action.payload.longitude;
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserInformations.fulfilled,(state,action)=>{
            state.userInfos=action.payload;
        })
    }
});


export const {setMyLocation}=mainSlice.actions;

export default mainSlice.reducer;