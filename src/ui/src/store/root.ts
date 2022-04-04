import { combineReducers } from 'redux';

import {
    HudStore,
    InventoryStore,
    PhoneStore,
    CharacterStore,
} from '../modules/apps'

const rootReducer = combineReducers({
    hud: HudStore,
    inventory: InventoryStore,
    phone: PhoneStore,
    character: CharacterStore,
})

export default rootReducer