import { useCallback, useEffect, useState } from "preact/hooks";
import { Results, Schemas } from "./FormDefinitions";
import { FileField } from "./fields/FileField/FileField";
import { ComboboxField } from "./fields/ComboboxField";
import { CheckboxField } from "./fields/CheckboxField";
import { RadioField } from "./fields/RadioField";
import { TextField } from "./fields/TextField";
import { formContext } from "./FormContext";
import formStyles from "./form.module.css";

import "@lucas-bortoli/portinoli-css";

interface Properties {
  onSubmit?: (results: { [fieldId: string]: Results.Field }) => void;
}

export const Form = (properties: Properties & Schemas.Form) => {
  // Usado para remover valores de componentes escondidos do resultado do form
  const hiddenComponents: string[] = [];

  const [values, setValues] = useState<Results.SetOf<Results.WithValidation<Results.Field>>>({});

  // As tags providenciadas por cada componente
  const [tagsByComponent, setTagsbyComponent] = useState<{ [fieldId: string]: string[] }>({});

  const [scrollField, setScrollField] = useState<string>();

  const tags: string[] = [];

  for (const componentTags of Object.values(tagsByComponent)) {
    for (const tag of componentTags) {
      tags.push(tag);
    }
  }

  const doSubmit = useCallback(() => {
    const realValues: Results.SetOf<Results.Field> = {};

    for (const [fieldId, result] of Object.entries(values)) {
      // Não submitamos componentes escondidos
      if (hiddenComponents.includes(fieldId)) {
        console.log(fieldId, "escondido");
        continue;
      }

      // Se há um erro, não enviar
      if (typeof result.validationError === "string") {
        console.log(
          `Envio rejeitado, há um erro de validação em [${fieldId} ${properties.fields[fieldId].type}]: ${result.validationError}`
        );
        setScrollField(fieldId);
        return false;
      }

      const { validationError, ...r } = result;
      realValues[fieldId] = r;
    }

    // Fazer o submit do formulário
    if (properties.onSubmit) {
      properties.onSubmit(realValues);
    }
  }, [values, tagsByComponent]);

  // Chamado para centralizar uma field na página.
  // É preciso usar a função setScrollField(fieldId).
  useEffect(() => {
    const field = document.getElementById(`field-${scrollField}`);

    if (field) {
      field.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollField]);

  console.log(values);

  return (
    <div className={formStyles.form}>
      <h1>{properties.title}</h1>
      {properties.description && <p>{properties.description}</p>}
      <formContext.Provider
        value={{
          setFieldValue<T extends Results.Field>(fieldId: string, value: T) {
            console.log(`[${fieldId} ${properties.fields[fieldId].type}] value`, value);
            values[fieldId] = value;
            setValues(Object.assign({}, values));
          },

          provideTags(fieldId: string, componentTags: string[]) {
            console.log(`[${fieldId} ${properties.fields[fieldId].type}] tags`, tags);
            tagsByComponent[fieldId] = componentTags;
            setTagsbyComponent(Object.assign({}, tagsByComponent));
          },
        }}
      >
        {Object.keys(properties.fields).map((name) => {
          const field = properties.fields[name];

          // Todos os campos são requeridos por padrão.
          // Se o campo "required" não for especificado, tornar o campo requerido.
          if (field.required ?? true) {
            field.required = true;
          }

          for (const requiredTag of field.requiredTags ?? []) {
            // Se não temos essa tag, não renderizar o componente.
            if (!tags.includes(requiredTag)) {
              hiddenComponents.push(name);

              /*console.log(
                `Componente [${name} ${field.type}] não renderizado porque a tag [${requiredTag}] não existe.`
              );*/
              return;
            }
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

          return <FieldObj {...field} fieldId={name} />;
        })}
      </formContext.Provider>
      <button className="teal" onClick={doSubmit}>
        Enviar
      </button>
    </div>
  );
};
