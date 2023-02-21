import { ComponentChildren } from "preact";
import { Schemas } from "../FormDefinitions";

import formStyles from "../form.module.css";

interface Properties {
  children: ComponentChildren;
  className?: string;
  isValid?: boolean;
}

export const BaseField = (properties: Schemas.BaseField & Properties) => {
  const isValid = properties.isValid ?? true;

  return (
    <section
      className={[
        formStyles.field,
        properties.required ? formStyles.fieldRequired : "",
        properties.className,
        isValid ? "valid" : formStyles.invalid,
      ].join(" ")}
    >
      {properties.title && (
        <h1 className={formStyles.title}>
          {properties.required ? "* " : ""}
          {properties.title}
        </h1>
      )}
      {properties.description && (
        <p className={formStyles.description}>{properties.description}</p>
      )}
      {properties.children}
    </section>
  );
};
