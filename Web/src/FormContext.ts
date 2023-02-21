import { createContext } from "preact";
import { Results } from "./FormDefinitions";

interface FormContext {
  /**
   * Todos os campos (fields) chamam essa função para sincronizar seu estado com o formulário.
   */
  setFieldValue: <T extends Results.Field>(fieldId: string, value: T) => void;
}

export const formContext = createContext<FormContext | null>(null);
