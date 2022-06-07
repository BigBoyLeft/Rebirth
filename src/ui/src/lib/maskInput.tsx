import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface MaskInputProps {
  mask: string;
  definitions: any;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const MaskInput = forwardRef<MaskInputProps, any>(function MaskInput(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});

export default MaskInput;