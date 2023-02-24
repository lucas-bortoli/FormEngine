import { createContext } from "preact";
import { Results } from "./FormDefinitions";

interface FormContext {
  /**
   * Todos os campos (fields) chamam essa função para sincronizar seu estado com o formulário.
   */
  setFieldValue: <T extends Results.WithValidation<Results.Field>>(
    fieldId: string,
    value: T
  ) => void;

  provideTags: (fieldId: string, tags: string[]) => void;
}

export const formContext = createContext<FormContext | null>(null);
