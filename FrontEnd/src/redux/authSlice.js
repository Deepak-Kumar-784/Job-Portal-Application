import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        //actions hote h jisko hum dispatch karte he
        
        setLoading:(state,action)=>{
            state.loading=action.payload
            //The value of user in setUser comes from 
            // //the action's payload. This payload is provided when you dispatch the action.
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }

})

export const {setLoading,setUser}=authSlice.actions;
export default authSlice.reducer