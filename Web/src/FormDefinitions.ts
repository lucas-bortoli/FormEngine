export namespace Schemas {
  export interface BaseField {
    required?: boolean;
    title?: string;
    description?: string;

    /**
     * Indica as tags exigidos para a exibição deste campo.
     */
    requireTags?: string[];
  }

  export interface TextField extends BaseField {
    type: "textfield";
    multiline?: boolean;
    placeholderText?: string;
    minimumLength?: number;
    maximumLength?: number;
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
  }

  export interface FileField extends BaseField {
    type: "fileupload";
    minimumFiles?: number;
    maximumFiles?: number;
    maximumFileSize?: number;
    allowedExtensions?: string[];
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
    fields: { [id: string]: Field };
  }
}

export namespace Results {
  interface BaseField {
    hasValidationError: boolean;
  }

  export interface TextField extends BaseField {
    type: Schemas.TextField["type"];
    value: string;
  }

  /**
   * Um campo de checkboxes. Os checkboxes são dispostos em uma lista vertical.
   */
  export interface CheckboxField extends BaseField {
    type: Schemas.CheckboxField["type"];

    /**
     * Todas as caixas marcadas, por seus ids.
     */
    checkedItems: string[];
  }

  /**
   * Um campo de radio buttons. Os itens são dispostos em uma lista vertical.
   */
  export interface RadioField extends BaseField {
    type: Schemas.RadioField["type"];

    /**
     * O id do item marcado.
     */
    selectedItem: string;
  }

  /**
   * Um campo de combobox. Os itens são dispostos em um dropdown.
   */
  export interface ComboboxField extends BaseField {
    type: Schemas.ComboboxField["type"];

    /**
     * O id do item marcado.
     */
    selectedItem: string;
  }

  export interface FileField extends BaseField {
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

  export interface Form {
    /**
     * Os campos do formulário.
     */
    fields: { [id: string]: Field };
  }
}
