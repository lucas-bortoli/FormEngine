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

  const validate = (): string | undefined => {
    if (properties.required) {
      if (!Object.keys(properties.items).includes(selected)) {
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
    const result: Results.WithValidation<Results.Field> = {
      type: "radiobutton",
      validationError: validate(),
      selectedItem: selected,
    };

    ctx?.setFieldValue<Results.RadioField>(properties.fieldId, result);
    ctx?.provideTags(properties.fieldId, properties.items[selected]?.providesTags ?? []);
  }, [selected]);

  return (
    <BaseField {...properties} isValid={typeof validate() === "undefined"}>
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
