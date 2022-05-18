import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import {
    HudStore,
    InventoryStore,
    PhoneStore,
    BankingStore,
} from '../modules/apps'

import rootStore from "@/modules/root.store";

export function makeStore() {
    return configureStore({
        reducer: {
            root: rootStore,
            hud: HudStore,
            inventory: InventoryStore,
            phone: PhoneStore,
            banking: BankingStore,
        }
    })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store;