import { Results, Schemas } from "./FormDefinitions";

const form = {
  title: "Formulário de impressão 3D",
  description: "Esse formulário busca padronizar os pedidos de impressão 3D.",
  action: "/post/3d",
  fields: {
    nome: <Schemas.TextField>{
      type: "textfield",
      title: "Requisitante",
      description: "O nome de quem está pedindo a impressão da peça.",
      placeholderText: "Seu nome",
      maximumLength: 32,
    },
    opcaoFormulario: <Schemas.ComboboxField>{
      type: "combobox",
      title: "Selecione um caminho",
      items: {
        caminho1: { label: "Caminho 1", providesTags: ["caminho1"] },
        caminho2: { label: "Caminho 2", providesTags: ["caminho2"] },
      },
    },
    arquivos: <Schemas.FileField>{
      type: "fileupload",
      title: "Arquivos a serem enviados",
      maximumFiles: 4,
      allowedExtensions: [".gko", ".gtl", ".gbl"],
      validate: (arquivos) => {
        return { error: "OK" }
      }
    },
    detalhes: <Schemas.TextField>{
      type: "textfield",
      title: "Detalhes",
      placeholderText: "Ex. ABS Preto, 2 peças de cada arquivo.",
      multiline: true,
    },
    opcoes: <Schemas.CheckboxField>{
      type: "checkbox",
      title: "Quem serão os responsáveis por essa impressão?",
      items: {
        lucas: { label: "Lucas" },
        isis: { label: "Isis" },
        luis: { label: "Luis" },
        callebe: { label: "Callebe" },
        diogo: { label: "Diogo" },
      }
    },
    delegarPara: <Schemas.ComboboxField>{
      type: "combobox",
      title: "Quem deve ser o responsável por essa impressão?",
      items: {
        lucas: { label: "Lucas" },
      },
    },
    prioridade: <Schemas.RadioField>{
      type: "radiobutton",
      title: "Qual a prioridade da impressão?",
      items: {
        1: { label: "mínima" },
        2: { label: "normal" },
        3: { label: "alta" },
        4: { label: "urgente" },
      },
    },
  },
};

export default form;
