import { Results, Schemas } from "./FormDefinitions";
import { TextField } from "./fields/TextField";

import formStyles from "./form.module.css";

import "@lucas-bortoli/portinoli-css";
import { CheckboxField } from "./fields/CheckboxField";
import { useCallback, useEffect, useState } from "preact/hooks";
import { formContext } from "./FormContext";
import { RadioField } from "./fields/RadioField";
import { ComboboxField } from "./fields/ComboboxField";
import { FileField } from "./fields/FileField/FileField";

export const Form = (properties: Schemas.Form) => {
  const fieldNames = Object.keys(properties.fields);
  const [values, setValues] = useState<{
    [fieldId: string]: Results.Field;
  }>({});

  const doSubmit = useCallback(() => {
    console.log(values);
  }, [values]);

  return (
    <div className={formStyles.form}>
      <h1>{properties.title}</h1>
      {properties.description && <p>{properties.description}</p>}
      <formContext.Provider
        value={{
          setFieldValue<T extends Results.Field>(fieldId: string, value: T) {
            values[fieldId] = value;
            setValues(values);
            console.log(values);
          },
        }}
      >
        {fieldNames.map((name) => {
          const field = properties.fields[name];

          // Todos os campos são requeridos por padrão.
          // Se o campo "required" não for especificado, tornar o campo requerido.
          if (field.required ?? true) {
            field.required = true;
          }

          // Mapping do tipo das fields
          const fieldMap: { [key in Schemas.Field["type"]]: any } = {
            textfield: TextField,
            checkbox: CheckboxField,
            radiobutton: RadioField,
            combobox: ComboboxField,
            fileupload: FileField,
          };

          const FieldObj = fieldMap[field.type];

          return (
            <FieldObj
              {...field}
              fieldId={name}
            />
          );
        })}
      </formContext.Provider>
      <button
        className="teal"
        onClick={doSubmit}
      >
        Enviar
      </button>
    </div>
  );
};
