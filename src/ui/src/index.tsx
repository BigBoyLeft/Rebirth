import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Root from "./modules/root";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import store from "./store";

import "./index.scss";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#E53935",
        },
        red: { main: "#d32f2f", darker: "", contrastText: "" },
        blue: { main: "#1e88e5", darker: "", contrastText: "" },
        orange: { main: "#e64a19", darker: "", contrastText: "" },
        lightBlue: { main: "#35baf6", darker: "", contrastText: "" },
        lightRed: { main: "#ef5350", darker: "", contrastText: "" },
        orange2: { main: "#ffb300", darker: "", contrastText: "" },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        red: Palette["primary"];
        blue: Palette["primary"];
        orange: Palette["primary"];
        lightBlue: Palette["primary"];
        lightRed: Palette["primary"];
        orange2: Palette["primary"];
    }
    interface PaletteOptions {
        red: PaletteOptions["primary"];
        blue: PaletteOptions["primary"];
        orange: PaletteOptions["primary"];
        lightBlue: PaletteOptions["primary"];
        lightRed: PaletteOptions["primary"];
        orange2: PaletteOptions["primary"];
    }

    interface PaletteColor {
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
    }
}

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Root />
                </LocalizationProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
    document.getElementById("root")
);
