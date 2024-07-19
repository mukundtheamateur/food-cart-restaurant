import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const login=createAsyncThunk('user/login',async({email,password})=>{
    const data=await axios.post("http://localhost:4000/login",{email,password},{withCredentials:true})
    console.log(data.data)
    return data.data;
})

export const register=createAsyncThunk('user/register',async({name,email,password})=>{
    const data=await axios.post("http://localhost:4000/register",{name,email,password},{withCredentials:true})
    console.log(data.data)
    return data.data;
})

export const loadUser=createAsyncThunk('user/loadUser',async()=>{
    const data=await axios.post("http://localhost:4000/load-user",{},{withCredentials:true})
    console.log(data.data)
    return data.data;
})


export const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading:false,
        user:null,
        isAuthenticated:null,
        error:false,
    },
    reducers:{
        clearState(state,action){
            state.user=null;
            state.isAuthenticated=null;
            state.error=false;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(login.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.isAuthenticated=true
            state.error=null
            state.loading=false
        })
        .addCase(login.rejected,(state,action)=>{
            state.user=null
            state.isAuthenticated=false
            state.error=action.error.message
            state.loading=false
        })
        .addCase(register.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.isAuthenticated=true
            state.error=null
            state.loading=false
        })
        .addCase(register.rejected,(state,action)=>{
            state.user=null
            state.isAuthenticated=false
            state.error=action.error.message
            state.loading=false
        })
        .addCase(loadUser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.isAuthenticated=true
            state.error=null
            state.loading=false
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.user=null
            state.isAuthenticated=false
            state.loading=false
        })
    }
})


export const {clearState} = userSlice.actions;

export default userSlice.reducer;