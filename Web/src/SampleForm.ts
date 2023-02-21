import { Schemas } from "./FormDefinitions";

const form: Schemas.Form = {
  title: "Formulário de impressão 3D",
  description: "Esse formulário busca padronizar os pedidos de impressão 3D.",
  fields: {
    nome: {
      type: "textfield",
      title: "Requisitante",
      description: "O nome de quem está pedindo a impressão da peça.",
      placeholderText: "Seu nome",
      required: true,
      maximumLength: 32,
    },
    arquivos: {
      type: "fileupload",
      title: "Arquivos a serem enviados",
      maximumFiles: 4,
      allowedExtensions: [".png"],
    },
    detalhes: {
      type: "textfield",
      title: "Detalhes",
      placeholderText: "Ex. ABS Preto, 2 peças de cada arquivo.",
      multiline: true,
    },
    opcoes: {
      type: "checkbox",
      title: "Quem serão os responsáveis por essa impressão?",
      items: {
        lucas: { label: "Lucas" },
        isis: { label: "Isis" },
        luis: { label: "Luis" },
        callebe: { label: "Callebe" },
        diogo: { label: "Diogo" },
      },
    },
    delegarPara: {
      type: "combobox",
      title: "Quem deve ser o responsável por essa impressão?",
      items: {
        lucas: { label: "Lucas" },
      },
    },
    ok: {
      type: "radiobutton",
      title: "Qual a prioridade da impressão?",
      required: false,
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
