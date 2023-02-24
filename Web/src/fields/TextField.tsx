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

  const validate = (): string | undefined => {
    const minLength = properties.minimumLength ?? 1;
    const maxLength = properties.maximumLength ?? value.length;

    if (value.length === 0) {
      return "É preciso preencher este campo.";
    }

    if (value.length < minLength) {
      return "O valor dado é muito curto.";
    }

    if (value.length > maxLength) {
      return "O valor dado é muito longo.";
    }

    // ok
  };

  useEffect(() => {
    const result: Results.WithValidation<Results.Field> = {
      type: "textfield",
      validationError: validate(),
      value: value,
    };

    ctx?.setFieldValue<Results.TextField>(properties.fieldId, result);
  }, [value]);

  const Text = properties.multiline ? "textarea" : "input";

  return (
    <BaseField {...properties} isValid={typeof validate() === "undefined"}>
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
