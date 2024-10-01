import React, { useState } from "react";
import './Questions.css'; // Importando o arquivo de estilos CSS

// Definindo a interface para formData
interface FormData {
  vigilanciaEpidemiologica: string;
  leitosUTI: string;
  observacoesA: string;
  nomeVigEpi: string;
  contatoVigEpi: string;
  rtRedeFrio: string;
  emailRT: string;
  telefoneRT: string;
  comentariosB: string;
  redeFrioMunicipal: string;
  tipoSoros: Record<string, string>;
  armazenamento: string;
  manutencaoEstrutura: string;
  comentariosManutencao: string;
  equipamentoConservacao: string;
  armazenamentoConservacao: string;
  comentariosConservacao: string;
  controleEstoque: string;
  intercorrencia: string;
  registrosNotificacoes: string;
  transporte: string;
  capacitacaoEquipe: string;
  pgrss: string;
  licencaSanitaria: string;
  rtStatus: string;
  substitutoRT: {
    nome: string;
    telefone: string;
    email: string;
  };
}

const Questions = () => {
  // Usando a interface FormData para tipar o estado
  const [formData, setFormData] = useState<FormData>({
    vigilanciaEpidemiologica: "",
    leitosUTI: "",
    observacoesA: "",
    nomeVigEpi: "",
    contatoVigEpi: "",
    rtRedeFrio: "",
    emailRT: "",
    telefoneRT: "",
    comentariosB: "",
    redeFrioMunicipal: "",
    tipoSoros: {
      "Anti-botrópico": "",
      "Anti-crotálico": "",
      "Anti-elapídico": "",
      "Anti-laquético": "",
      "Anti-botrópico/crotálico": "",
      "Anti-botrópico/laquético": "",
      "Anti-aracnídico": "",
      "Anti-escorpiônico": "",
      "Anti-loxoscélico": "",
      "Anti-lonômico": "",
    },
    armazenamento: "",
    manutencaoEstrutura: "",
    comentariosManutencao: "",
    equipamentoConservacao: "",
    armazenamentoConservacao: "",
    comentariosConservacao: "",
    controleEstoque: "",
    intercorrencia: "",
    registrosNotificacoes: "",
    transporte: "",
    capacitacaoEquipe: "",
    pgrss: "",
    licencaSanitaria: "",
    rtStatus: "",
    substitutoRT: {
      nome: "",
      telefone: "",
      email: "",
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    // Suas perguntas aqui...
    {
      question: "Esta unidade faz parte da Vigilância Epidemiológica?",
      options: ["Sim", "Não"],
      key: "vigilanciaEpidemiologica",
    },
    {
      question: "Possui leitos de UTI?",
      options: [
        "Somente UTI Adulto",
        "Somente UTI Infantil",
        "UTI Adulto e Pediátrico",
        "Não possui UTI",
      ],
      key: "leitosUTI",
    },
    // Continue adicionando suas perguntas
    {
      question: "Quais observações você gostaria de adicionar?",
      type: "text",
      key: "observacoesA",
    },
    {
      question: "Qual o nome do responsável pela Vigilância Epidemiológica?",
      type: "text",
      key: "nomeVigEpi",
    },
    {
      question: "Qual o contato da Vigilância Epidemiológica?",
      type: "text",
      key: "contatoVigEpi",
    },
    {
      question: "A unidade possui RT da Rede Frio?",
      options: ["Sim", "Não"],
      key: "rtRedeFrio",
    },
    {
      question: "Qual o e-mail do RT?",
      type: "text",
      key: "emailRT",
    },
    {
      question: "Qual o telefone do RT?",
      type: "text",
      key: "telefoneRT",
    },
    {
      question: "Quais comentários adicionais você gostaria de fazer?",
      type: "text",
      key: "comentariosB",
    },
    {
      question: "A unidade pertence à Rede Frio Municipal?",
      options: ["Sim", "Não"],
      key: "redeFrioMunicipal",
    },
    {
      question: "Que tipos de soros a unidade possui?",
      options: [
        "Anti-botrópico",
        "Anti-crotálico",
        "Anti-elapídico",
        "Anti-laquético",
        "Anti-botrópico/crotálico",
        "Anti-botrópico/laquético",
        "Anti-aracnídico",
        "Anti-escorpiônico",
        "Anti-loxoscélico",
        "Anti-lonômico",
      ],
      key: "tipoSoros",
    },
    {
      question: "Como está o armazenamento de soros?",
      options: ["Adequado", "Inadequado"],
      key: "armazenamento",
    },
    {
      question: "Como está a manutenção da estrutura?",
      options: ["Adequado", "Inadequado"],
      key: "manutencaoEstrutura",
    },
    {
      question: "Quais comentários sobre a manutenção você gostaria de adicionar?",
      type: "text",
      key: "comentariosManutencao",
    },
    {
      question: "A unidade possui equipamentos de conservação?",
      options: ["Sim", "Não"],
      key: "equipamentoConservacao",
    },
    {
      question: "Como está o armazenamento de conservação?",
      options: ["Adequado", "Inadequado"],
      key: "armazenamentoConservacao",
    },
    {
      question: "Quais comentários sobre a conservação você gostaria de adicionar?",
      type: "text",
      key: "comentariosConservacao",
    },
    {
      question: "Como está o controle de estoque?",
      options: ["Adequado", "Inadequado"],
      key: "controleEstoque",
    },
    {
      question: "Houve intercorrências?",
      options: ["Sim", "Não"],
      key: "intercorrencia",
    },
    {
      question: "Os registros de notificações estão adequados?",
      options: ["Sim", "Não"],
      key: "registrosNotificacoes",
    },
    {
      question: "Como está o transporte de soros?",
      options: ["Adequado", "Inadequado"],
      key: "transporte",
    },
    {
      question: "A equipe recebeu capacitação?",
      options: ["Sim", "Não"],
      key: "capacitacaoEquipe",
    },
    {
      question: "O PGRSS está implementado?",
      options: ["Sim", "Não"],
      key: "pgrss",
    },
    {
      question: "A unidade possui licença sanitária?",
      options: ["Sim", "Não"],
      key: "licencaSanitaria",
    },
    {
      question: "Qual o status do RT?",
      options: ["Ativo", "Inativo"],
      key: "rtStatus",
    },
    {
      question: "Qual o nome do substituto do RT?",
      type: "text",
      key: "substitutoRT.nome",
    },
    {
      question: "Qual o telefone do substituto do RT?",
      type: "text",
      key: "substitutoRT.telefone",
    },
    {
      question: "Qual o e-mail do substituto do RT?",
      type: "text",
      key: "substitutoRT.email",
    },
  ];

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSkipQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="questions-container">
      {currentQuestionIndex < questions.length ? (
        <div className="question-card">
          <h3 className="question-title">{questions[currentQuestionIndex]?.question}</h3>
          {questions[currentQuestionIndex]?.type === "text" ? (
            <input
              type="text"
              className="text-input"
              onChange={(e) =>
                handleChange(questions[currentQuestionIndex].key, e.target.value)
              }
            />
          ) : (
            questions[currentQuestionIndex]?.options?.map((option, index) => (
              <div className="option-container" key={index}>
                <input
                  type="radio"
                  name={questions[currentQuestionIndex].key}
                  value={option}
                  onChange={() =>
                    handleChange(questions[currentQuestionIndex].key, option)
                  }
                />
                <label className="option-label">{option}</label>
              </div>
            ))
          )}
          <div className="button-container">
            <button className="next-button" onClick={handleNextQuestion}>
              Próxima Pergunta
            </button>
            <button className="skip-button" onClick={handleSkipQuestion}>
              Pular Pergunta
            </button>
          </div>
        </div>
      ) : (
        <div className="thank-you-message">
          <h3>Obrigado por responder às perguntas!</h3>
        </div>
      )}
    </div>
  );
};

export default Questions;
