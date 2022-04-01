import { combineReducers } from 'redux';

import {
    HudStore,
    InventoryStore,
    PhoneStore,
} from '../modules/apps'

const rootReducer = combineReducers({
    hud: HudStore,
    inventory: InventoryStore,
    phone: PhoneStore,
})

export default rootReducer