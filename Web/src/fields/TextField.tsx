import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Results, Schemas } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const TextField = (properties: Schemas.TextField & Properties) => {
  const [value, setValue] = useState("");
  const ctx = useContext(formContext);

  const validate = (): boolean => {
    const minLength = properties.minimumLength ?? 1;
    const maxLength = properties.maximumLength ?? value.length;

    if (value.length >= minLength && value.length <= maxLength) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const result: Results.Field = {
      type: "textfield",
      hasValidationError: !validate(),
      value: value,
    };

    ctx?.setFieldValue<Results.TextField>(properties.fieldId, result);
  }, [value]);

  const Text = properties.multiline ? "textarea" : "input";

  return (
    <BaseField
      {...properties}
      isValid={validate()}
    >
      <Text
        type="text"
        placeholder={properties.placeholderText}
        minLength={properties.minimumLength}
        maxLength={properties.maximumLength}
        onInput={(ev) => setValue((ev.target as HTMLInputElement).value)}
      />
    </BaseField>
  );
};
