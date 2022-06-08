const INITIAL_STATE = {
    vehicle: false,
    data: {
        health: {
            icon: 'favorite',
            color: '#d32f2f',
            value: 0,
        },
        armour: {
            icon: 'shield',
            color: '#1e88e5',
            value: 40,
        },
        hunger: {
            icon: 'lunch_dining',
            color: '#e64a19',
            value: 60,
        },
        thirst: {
            icon: 'water_drop',
            color: '#35baf6',
            value: 80,
        },
        stress: {
            icon: 'psychology',
            color: '#ef5350',
            value: 100,
        },
    },
    speed: {
        value: 0,
    },
    fuel: {
        value: 0,
    },
}

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_HUD_STORE_VEHICLE":
            return {
                ...state,
                vehicle: action.vehicle,
            }
        case "SET_HUD_STORE_DATA":
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.data,
                }
            }
        default:
            return state
    }
}

export default reducer