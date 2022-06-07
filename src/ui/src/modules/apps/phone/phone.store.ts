import { AppState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPhone {
    app: number;
    type: "iphone" | "android" | "pixel",
    background: string,
    time: string,
    battery: number,
    signal: number,
}

const initialState = {
    app: 0,
    type: "iphone",
    background: "",
    time: "",
    battery: 100,
    signal: 2,
} 

export const phoneStore = createSlice({
    name: "Phone",
    initialState,
    reducers: {
        setApp: (state, action: PayloadAction<number>) => {
            state.app = action.payload;
        },
        setType: (state, action: PayloadAction<IPhone>) => {
            state.type = action.payload.type;
        },
        setBackground: (state, action: PayloadAction<IPhone>) => {
            state.background = action.payload.background;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setBattery: (state, action: PayloadAction<number>) => {
            state.battery = action.payload;
        },
        setSignal: (state, action: PayloadAction<number>) => {
            state.signal = action.payload;
        },
    }
})

export const app = (state: AppState) => state.phone.app;
export const type = (state: AppState) => state.phone.type;
export const background = (state: AppState) => state.phone.background;
export const time = (state: AppState) => state.phone.time;
export const battery = (state: AppState) => state.phone.battery;
export const signal = (state: AppState) => state.phone.signal;

export const {
    setApp,
    setType,
    setBackground,
    setTime,
    setBattery,
    setSignal,
} = phoneStore.actions;

export default phoneStore.reducer;