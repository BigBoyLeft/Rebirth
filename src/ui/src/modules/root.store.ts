import { AppState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  playerData: {
    ssn: "",
    fn: "",
    ln: "",
    dob: "",
    gender: "",
    mugshot: "",
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
