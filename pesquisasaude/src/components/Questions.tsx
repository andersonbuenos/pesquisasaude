import React, { useState } from "react";
import './Questions.css';

// Defina a estrutura do objeto de dados do formulário
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
    { question: "Esta unidade faz parte da Vigilância Epidemiológica?", options: ["Sim", "Não"], key: "vigilanciaEpidemiologica", isRequired: true },
    { question: "Possui leitos de UTI?", options: ["Somente UTI Adulto", "Somente UTI Infantil", "UTI Adulto e Pediátrico", "Não possui UTI"], key: "leitosUTI", isRequired: true },
    { question: "Quais observações você gostaria de adicionar?", type: "text", key: "observacoesA" },
    { question: "Qual o nome do RT da Vigilância Epidemiológica?", type: "text", key: "nomeVigEpi", isRequired: true },
    { question: "Qual o contato do RT da Vigilância Epidemiológica?", type: "text", key: "contatoVigEpi", isRequired: true },
    { question: "Qual o nome do RT da Rede de Frio?", type: "text", key: "rtRedeFrio", isRequired: true },
    { question: "Qual o e-mail do RT da Rede de Frio?", type: "text", key: "emailRT", isRequired: true },
    { question: "Qual o telefone do RT da Rede de Frio?", type: "text", key: "telefoneRT", isRequired: true },
    { question: "Comentários adicionais sobre o RT da Rede de Frio:", type: "text", key: "comentariosB" },
    { question: "A unidade possui rede de frio municipal?", options: ["Sim", "Não"], key: "redeFrioMunicipal", isRequired: true },
    { question: "Qual o tipo de soros disponíveis?", options: ["Anti-botrópico", "Anti-crotálico", "Anti-elapídico", "Anti-laquético"], key: "tipoSoros", isRequired: true },
    { question: "Como é feito o armazenamento?", options: ["Adequado", "Inadequado"], key: "armazenamento", isRequired: true },
    { question: "Manutenção da estrutura é feita regularmente?", options: ["Sim", "Não"], key: "manutencaoEstrutura", isRequired: true },
    { question: "Comentários sobre a manutenção da estrutura:", type: "text", key: "comentariosManutencao" },
    { question: "Equipamentos de conservação estão em boas condições?", options: ["Sim", "Não"], key: "equipamentoConservacao", isRequired: true },
    { question: "Como é feito o armazenamento da conservação?", options: ["Adequado", "Inadequado"], key: "armazenamentoConservacao", isRequired: true },
    { question: "Comentários sobre a conservação:", type: "text", key: "comentariosConservacao" },
    { question: "Controle de estoque é feito regularmente?", options: ["Sim", "Não"], key: "controleEstoque", isRequired: true },
    { question: "Como a unidade lida com intercorrências?", options: ["Protocolo definido", "Não há protocolo"], key: "intercorrencia", isRequired: true },
    { question: "Registros e notificações são realizados corretamente?", options: ["Sim", "Não"], key: "registrosNotificacoes", isRequired: true },
    { question: "O transporte da vacina está adequado?", options: ["Sim", "Não"], key: "transporte", isRequired: true },
    { question: "A equipe foi capacitada para a conservação da vacina?", options: ["Sim", "Não"], key: "capacitacaoEquipe", isRequired: true },
    { question: "O PGRSS está implementado na unidade?", options: ["Sim", "Não"], key: "pgrss", isRequired: true },
    { question: "A unidade possui licença sanitária?", options: ["Sim", "Não"], key: "licencaSanitaria", isRequired: true },
    { question: "Qual é o status do RT da unidade?", options: ["Ativo", "Substituto"], key: "rtStatus", isRequired: true },
    { question: "Nome do substituto do RT:", type: "text", key: "substitutoRT.nome" },
    { question: "Telefone do substituto do RT:", type: "text", key: "substitutoRT.telefone" },
    { question: "E-mail do substituto do RT:", type: "text", key: "substitutoRT.email" },
  ];

  const handleNextQuestion = () => {
    const currentKey = questions[currentQuestionIndex].key as keyof FormData;

    if (formData[currentKey] !== undefined && formData[currentKey] !== '') {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };


  const handleSkipQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTextChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const TextInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );


  type FormDataKeys = keyof FormData;

  const currentKey: FormDataKeys = questions[currentQuestionIndex].key as FormDataKeys;
  const value = formData[currentKey] as string;

  return (
    <div className="questions-container">
      {currentQuestionIndex < questions.length ? (
        <div className="question-card">
          <h3 className="question-title">{questions[currentQuestionIndex]?.question}</h3>
          {questions[currentQuestionIndex].options ? (
            <div>
              {questions[currentQuestionIndex].options.map((option) => (
                <label class="option-label" key={option}>
                  <input
                    type="radio"
                    name={questions[currentQuestionIndex].key}
                    value={option}
                    onChange={() => handleOptionChange(questions[currentQuestionIndex].key, option)}
                    style={{ margin: '5px' }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="text-input"
              onChange={(e) => handleTextChange(currentKey, e.target.value)}
            />
          )}
          <div className="navigation-buttons">
            <button onClick={handleSkipQuestion}></button>
            <button class="skip-button" onClick={handleNextQuestion}>Próximo</button>
          </div>
        </div>
      ) : (
        <div className="end-message">
          <h3>Obrigado por responder!</h3>
        </div>
      )}
    </div>
  );
};

export default Questions;
