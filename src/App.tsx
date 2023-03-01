import { useCallback } from "preact/hooks";
import { Form } from "./Form";

import formDefinition from "./SampleForm";

export function App() {
  const doSubmit = useCallback((payload: object) => {
    console.log("Form submit:", payload);
  }, []);

  return (
    <>
      <Form {...formDefinition} onSubmit={doSubmit} />
    </>
  );
}
