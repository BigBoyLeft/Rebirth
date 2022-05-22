import { AppState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  playerData: {
    ssn: string,
    fn: string,
    ln: string,
    dob: string,
    gender: number,
    phoneNumber: string,
    email: string,
    pAddress: string,
    mugshot: string,
    profilePic: string,
  }
}

const initialState: IInitialState = {
  playerData: {
    ssn: "765372666",
    fn: "Carter",
    ln: "Zamgato",
    dob: "1977-03-07T02:47:04.000Z",
    gender: 2,
    phoneNumber: "7796529630",
    email: "carterzamgato@rebirth.net",
    pAddress: "NONE",
    mugshot: "test",
    profilePic: "test2",
  },
};

export const rootStore = createSlice({
  name: "root",
  initialState,
  reducers: {
    setPlayerData: (state, action: any) => {
      state.playerData = action.payload;
    },
  },
  extraReducers: {},
});

export const playerData = (state: AppState) => state.root.playerData;

export const { setPlayerData } = rootStore.actions;

export default rootStore.reducer;
