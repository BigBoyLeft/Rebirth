const INITIAL_STATE = {
    visible: false,
    characters: [
        {
            ssn: "617155906",
            fn: "Carter",
            ln: "Zamgato",
            gender: "Male",
            dob: "03/06/1990",
            phoneNumber: "7072075995",
            email: "carterzamgato@rebirth.net",
            accounts: [
                {
                    Number: "907084145",
                    Routing: "80501490",
                    Type: "CHECKING",
                    Balance: 15145,
                    Status: "ACTIVE",
                },
            ],
        },
        {
            ssn: "611235906",
            fn: "Carter",
            ln: "Zamgato",
            gender: "Male",
            dob: "03/06/1990",
            phoneNumber: "7072075995",
            email: "carterzamgato@rebirth.net",
            accounts: [
                {
                    Number: "504509997",
                    Routing: "74343539",
                    Type: "CHECKING",
                    Balance: 10571.91,
                    Status: "ACTIVE",
                },
            ],
        },
    ],
};

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_CHARACTER_STORE_VISIBILITY":
            return {
                ...state,
                visible: action.visible,
            };
        case "SET_CHARACTER_STORE_CHARACTERS":
            return {
                ...state,
                characters: action.characters,
            };
        default:
            return state;
    }
}

export default reducer;
