import { Form } from "./Form";

import formDefinition from "./SampleForm";

export function App() {
  return (
    <>
      <Form {...formDefinition} />
    </>
  );
}
