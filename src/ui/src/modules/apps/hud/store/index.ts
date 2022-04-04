const INITIAL_STATE = {
    visible: true,
    vehicle: false,
    data: {
        health: {
            icon: 'favorite',
            iconColor: '#d32f2f',
            color: 'red',
            value: 100,
        },
        armour: {
            icon: 'shield',
            iconColor: '#1e88e5',
            color: 'blue',
            value: 0,
        },
        hunger: {
            icon: 'lunch_dining',
            iconColor: '#e64a19',
            color: 'orange',
            value: 0,
        },
        thirst: {
            icon: 'water_drop',
            iconColor: '#35baf6',
            color: 'lightBlue',
            value: 0,
        },
        stress: {
            icon: 'psychology',
            iconColor: '#ef5350',
            color: 'lightRed',
            value: 0,
        },
    }
}

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_HUD_STORE_VISIBILITY":
            return {
                ...state,
                visible: action.visible,
            }
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