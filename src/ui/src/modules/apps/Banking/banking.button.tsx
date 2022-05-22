import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const ButtonRoot = styled(Button)({
    background: "#1c313d",
    fontSize: "0.833vw",
    padding: "10px 16px",
    boxShadow: "none",
    textTransform: "none",
    borderRadius: "0",
    justifyContent: "flex-start",
    "&:hover": {
        background: "#15252e",
        boxShadow: "none",
    },
    "svg": {
        marginTop: "-10%",
    }
})

function BButton(props: ButtonProps | any) {
    return <ButtonRoot {...props} component={ButtonRoot} />;
}

export default BButton;
