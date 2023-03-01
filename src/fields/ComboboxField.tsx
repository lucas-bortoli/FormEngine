import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Results, Schemas } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const ComboboxField = (properties: Schemas.ComboboxField & Properties) => {
  const [selected, setSelected] = useState<string>("");
  const ctx = useContext(formContext);

  const validate = (): string | undefined => {
    if (properties.required) {
      if (!properties.items[selected]) {
        return "É preciso selecionar um item neste campo.";
      }
    }

    if (properties.validate) {
      const customValidationResult = properties.validate(selected);

      if (customValidationResult?.error) {
        return customValidationResult.error;
      }
    }

    // ok
  };

  useEffect(() => {
    const results: Results.WithValidation<Results.Field> = {
      type: "combobox",
      validationError: validate(),
      selectedItem: selected,
    };

    ctx?.setFieldValue<Results.ComboboxField>(properties.fieldId, results);
    ctx?.provideTags(properties.fieldId, properties.items[selected]?.providesTags ?? []);
  }, [selected]);

  return (
    <BaseField {...properties} isValid={typeof validate() === "undefined"}>
      <select
        onChange={(ev) => setSelected((ev.target as HTMLSelectElement).value)}
        defaultChecked={true}
      >
        <option value="" disabled selected>
          Selecione uma opção...
        </option>
        {Object.keys(properties.items).map((optionId) => {
          const item = properties.items[optionId];

          return <option value={optionId}>{item.label}</option>;
        })}
      </select>
    </BaseField>
  );
};
