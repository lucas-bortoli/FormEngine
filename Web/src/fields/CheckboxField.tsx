import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Schemas, Results } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const CheckboxField = (
  properties: Schemas.CheckboxField & Properties
) => {
  const [checkedInputs, setCheckedInputs] = useState<{
    [key: string]: boolean;
  }>({});
  const ctx = useContext(formContext);

  const validate = (): boolean => {
    if (properties.required) {
      return Object.values(checkedInputs).filter((e) => e === true).length > 0;
    }

    return false;
  };

  useEffect(() => {
    const results: Results.Field = {
      type: "checkbox",
      hasValidationError: !validate(),
      checkedItems: Object.keys(checkedInputs).filter(
        (boxId) => !!checkedInputs[boxId]
      ),
    };

    ctx?.setFieldValue<Results.CheckboxField>(properties.fieldId, results);
  }, [checkedInputs]);

  return (
    <BaseField
      {...properties}
      isValid={validate()}
    >
      <ul>
        {Object.keys(properties.items).map((boxId) => {
          const box = properties.items[boxId];

          return (
            <li>
              <input
                type="checkbox"
                checked={!!checkedInputs[boxId]}
                onClick={() => {
                  setCheckedInputs({
                    ...checkedInputs,
                    [boxId]: !checkedInputs[boxId],
                  });
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
