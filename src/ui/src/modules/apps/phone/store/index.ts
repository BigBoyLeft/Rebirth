const INITIAL_STATE = {
    visible: false,
    data: {
        playerData: {
            fn: 'Carter',
            ln: 'Zamgato',
            pn: '7072075995',
        },
        contacts: [],
        messages: [],
        vehicles: [],
        properties: [],
        jobs: [],
    }
}

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_PHONE_STORE_VISIBILITY":
            return {
                ...state,
                visible: action.payload,
            }
        case "SET_PHONE_STORE_DATA":
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