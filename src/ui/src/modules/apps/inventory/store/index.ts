const INITIAL_STATE = {
    visible: false,
    data: {
        weight: 150,
        maxWeigh: 250,
        items: [],
    }
}

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_INVENTORY_STORE_VISIBILITY":
            return {
                ...state,
                visible: action.payload,
            }
        case "SET_INVENTORY_STORE_DATA":
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                }
            }
        default:
            return state
    }
}

export default reducer