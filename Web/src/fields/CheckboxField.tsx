import { useContext, useEffect, useState } from "preact/hooks";
import { formContext } from "../FormContext";
import { BaseField } from "./BaseField";
import { Schemas, Results } from "../FormDefinitions";

interface Properties {
  fieldId: string;
}

export const CheckboxField = (properties: Schemas.CheckboxField & Properties) => {
  const [checkedInputs, setCheckedInputs] = useState<{
    [key: string]: boolean;
  }>({});
  const ctx = useContext(formContext);

  const getSelectedItems = () =>
    Object.keys(checkedInputs).filter((boxId) => !!checkedInputs[boxId]);

  const validate = (): string | undefined => {
    if (properties.required) {
      if (getSelectedItems().length < 1) {
        return "É preciso selecionar uma caixa neste campo.";
      }
    }

    // ok
  };

  useEffect(() => {
    const checkedIds = getSelectedItems();

    const results: Results.WithValidation<Results.Field> = {
      type: "checkbox",
      validationError: validate(),
      checkedItems: checkedIds,
    };

    const tags: string[] = [];

    for (const id of checkedIds) {
      for (const tag of properties.items[id]?.providesTags ?? []) {
        tags.push(tag);
      }
    }

    ctx?.setFieldValue<Results.CheckboxField>(properties.fieldId, results);
    ctx?.provideTags(properties.fieldId, tags);
  }, [checkedInputs]);

  return (
    <BaseField {...properties} isValid={typeof validate() === "undefined"}>
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
