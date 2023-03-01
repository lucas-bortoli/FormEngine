export namespace Schemas {
  type ValidationError = { error: string };
  type ValidationFunction<T> = (value: T) => ValidationError | undefined;

  export interface BaseField {
    /**
     * Se "false", o campo é opcional.
     * Todos os campos são exigidos por padrão.
     */
    required?: boolean;

    /**
     * Título do campo.
     */
    title?: string;

    /**
     * Descrição do campo, mostrada após o título.
     */
    description?: string;

    /**
     * Indica as tags exigidos para a exibição deste campo.
     */
    requiredTags?: string[];
  }

  export interface TextField extends BaseField {
    type: "textfield";
    multiline?: boolean;
    placeholderText?: string;
    minimumLength?: number;
    maximumLength?: number;
    validate?: ValidationFunction<string>;
  }

  /**
   * Um campo de checkboxes. Os checkboxes são dispostos em uma lista vertical.
   */
  export interface CheckboxField extends BaseField {
    type: "checkbox";

    /**
     * Indica se pelo menos uma das caixas deve estar preenchida antes de ocorrer a submissão do formulário.
     */
    required?: boolean;

    /**
     * Todos as caixas.
     */
    items: {
      [itemId: string]: {
        /**
         * Indica se esta caixa deve estar selecionada por padrão
         */
        initialState?: boolean;

        /**
         * O texto mostrado ao lado da caixa
         */
        label: string;

        /**
         * Indica quais tags são providenciadas se este item estiver marcado.
         */
        providesTags?: string[];
      };
    };

    validate?: ValidationFunction<string[]>;
  }

  /**
   * Um campo de radio buttons. Os itens são dispostos em uma lista vertical.
   */
  export interface RadioField extends BaseField {
    type: "radiobutton";

    /**
     * Indica se pelo menos uma das caixas deve estar preenchida antes de ocorrer a submissão do formulário.
     */
    required?: boolean;

    /**
     * Todos as caixas.
     */
    items: {
      [itemId: string]: {
        /**
         * O texto mostrado ao lado da caixa
         */
        label: string;

        /**
         * Indica quais tags são providenciadas se este item estiver marcado.
         */
        providesTags?: string[];
      };
    };

    validate?: ValidationFunction<string>;
  }

  /**
   * Um campo de combobox. Os itens são dispostos em um dropdown.
   */
  export interface ComboboxField extends BaseField {
    type: "combobox";

    /**
     * Todos as opções da lista.
     */
    items: {
      [itemId: string]: {
        /**
         * O texto mostrado para esta opção.
         */
        label: string;

        /**
         * Indica quais tags são providenciadas se este item estiver selecionado.
         */
        providesTags?: string[];
      };
    };

    validate?: ValidationFunction<string>;
  }

  export interface FileField extends BaseField {
    type: "fileupload";
    minimumFiles?: number;
    maximumFiles?: number;
    maximumFileSize?: number;
    allowedExtensions?: string[];

    validate?: ValidationFunction<File[]>;
  }

  export type Field =
    | TextField
    | CheckboxField
    | RadioField
    | ComboboxField
    | FileField;

  export interface Form {
    /**
     * O título do formulário, mostrado em fonte grande antes dos campos.
     */
    title: string;

    /**
     * A descrição do formulário, mostrada antes dos campos e após o título.
     */
    description?: string;

    /**
     * Os campos do formulário.
     */
    fields: Record<string, Field>;

    /**
     * URL onde o formulário deve enviar os dados.
     * A requisição é feita em HTTP Post, com `Content-Type: application/json`.
     * O resultado do formulário é enviado em JSON no corpo da requisição.
     */
    action: string;
  }
}

export namespace Results {
  export interface TextField {
    type: Schemas.TextField["type"];
    value: string;
  }

  /**
   * Um campo de checkboxes. Os checkboxes são dispostos em uma lista vertical.
   */
  export interface CheckboxField {
    type: Schemas.CheckboxField["type"];

    /**
     * Todas as caixas marcadas, por seus ids.
     */
    checkedItems: string[];
  }

  /**
   * Um campo de radio buttons. Os itens são dispostos em uma lista vertical.
   */
  export interface RadioField {
    type: Schemas.RadioField["type"];

    /**
     * O id do item marcado.
     */
    selectedItem: string;
  }

  /**
   * Um campo de combobox. Os itens são dispostos em um dropdown.
   */
  export interface ComboboxField {
    type: Schemas.ComboboxField["type"];

    /**
     * O id do item marcado.
     */
    selectedItem: string;
  }

  export interface FileField {
    type: Schemas.FileField["type"];

    files: {
      name: string;
      size: number;
    }[];
  }

  export type Field =
    | TextField
    | CheckboxField
    | RadioField
    | ComboboxField
    | FileField;
  export type SetOf<T extends Field> = { [fieldId: string]: T };
  export type WithValidation<T> = T & {
    /**
     * Se há um erro de validação, ele estará aqui
     */
    validationError?: string;
  };

  export type Result<
    T extends Schemas.Form,
    Keys extends keyof T["fields"] = keyof T["fields"]
  > = {
    [FieldId in Keys]: T["fields"][FieldId];
  };
}
