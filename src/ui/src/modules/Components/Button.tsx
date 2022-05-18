import ButtonUnstyled, { buttonUnstyledClasses, ButtonUnstyledProps } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

const ButtonRoot = styled("button")`
    color: #ffd9da;
    background: #ab3339;
    height: auto !important;
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    padding: 12px 20px;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    // transform: skew(-10deg);
    letter-spacing: 1px;
    display: flex;
    justify-items: center;
    align-items: center;
    column-gap: 15px;

    svg {
        margin-top: 2%;
    }

    &:hover {
        background-color: #ffb3a9;
        color: #690005;
    } 

    &.${buttonUnstyledClasses.active} {
        background-color: #E53935;
    }

    &.${buttonUnstyledClasses.focusVisible} {
        outline: none
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;1
    }
`;

function Button(props: ButtonUnstyledProps | any) {
    return <ButtonUnstyled {...props} component={ButtonRoot} />;
}

export default Button;
