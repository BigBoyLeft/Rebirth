import { forwardRef } from "react";
import NumberFormat from "react-number-format";

interface NumberFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = forwardRef<NumberFormatCustomProps, any>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
);
