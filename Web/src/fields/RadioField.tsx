import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Results, Schemas } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const RadioField = (properties: Schemas.RadioField & Properties) => {
  const [groupName] = useState(Math.random().toString());
  const [selected, setSelected] = useState<string>("");
  const ctx = useContext(formContext);

  const validate = (): boolean => {
    if (properties.required) {
      return Object.keys(properties.items).includes(selected);
    }

    return true;
  };

  useEffect(() => {
    const result: Results.Field = {
      type: "radiobutton",
      hasValidationError: !validate(),
      selectedItem: selected,
    };

    ctx?.setFieldValue<Results.RadioField>(properties.fieldId, result);
  }, [selected]);

  return (
    <BaseField
      {...properties}
      isValid={validate()}
    >
      <ul>
        {Object.keys(properties.items).map((optionId) => {
          const box = properties.items[optionId];

          return (
            <li>
              <input
                type="radio"
                name={groupName}
                selected={selected === optionId}
                onClick={() => {
                  setSelected(optionId);
                }}
              />
              <label>{box.label}</label>
            </li>
          );
        })}
      </ul>
    </BaseField>
  );
};
