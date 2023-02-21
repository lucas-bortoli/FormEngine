import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Results, Schemas } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const ComboboxField = (
  properties: Schemas.ComboboxField & Properties
) => {
  const [selected, setSelected] = useState<string>(
    Object.keys(properties.items)[0] ?? ""
  );
  const ctx = useContext(formContext);

  const validate = (): boolean => {
    if (properties.required) {
      return Object.keys(properties.items).includes(selected);
    }

    return false;
  };

  useEffect(() => {
    const results: Results.Field = {
      type: "combobox",
      hasValidationError: !validate(),
      selectedItem: selected,
    };

    ctx?.setFieldValue<Results.ComboboxField>(properties.fieldId, results);
  }, [selected]);

  return (
    <BaseField
      {...properties}
      isValid={validate()}
    >
      <select
        onChange={(ev) => setSelected((ev.target as HTMLSelectElement).value)}
      >
        {Object.keys(properties.items).map((optionId) => {
          const item = properties.items[optionId];

          return <option value={optionId}>{item.label}</option>;
        })}
      </select>
    </BaseField>
  );
};
