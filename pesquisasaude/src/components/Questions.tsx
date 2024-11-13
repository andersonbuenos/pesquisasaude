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
  fotoCapturada: boolean;
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
    fotoCapturada: false,
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
    { question: "Por favor, tire uma foto para continuar:", type: "photo", key: "fotoCapturada", isRequired: true },
    { question: "Manutenção da estrutura é feita regularmente?", options: ["Sim", "Não"], key: "manutencaoEstrutura", isRequired: true },
    { question: "Comentários sobre a manutenção da estrutura:", type: "text", key: "comentariosManutencao" },
    { question: "Equipamentos de conservação estão em boas condições?", options: ["Sim", "Não"], key: "equipamentoConservacao", isRequired: true },
    { question: "Por favor, tire uma foto para continuar:", type: "photo", key: "fotoCapturada", isRequired: true },
    { question: "Como é feito o armazenamento da conservação?", options: ["Adequado", "Inadequado"], key: "armazenamentoConservacao", isRequired: true },
    { question: "Comentários sobre a conservação:", type: "text", key: "comentariosConservacao" },
    { question: "Controle de estoque é feito regularmente?", options: ["Sim", "Não"], key: "controleEstoque", isRequired: true },
    { question: "Como a unidade lida com intercorrências?", options: ["Protocolo definido", "Não há protocolo"], key: "intercorrencia", isRequired: true },
    { question: "Registros e notificações são realizados corretamente?", options: ["Sim", "Não"], key: "registrosNotificacoes", isRequired: true },
    { question: "O transporte da vacina está adequado?", options: ["Sim", "Não"], key: "transporte", isRequired: true },
    { question: "Por favor, tire uma foto para continuar:", type: "photo", key: "fotoCapturada", isRequired: true },
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

    // Verifica se a foto foi capturada antes de avançar
    if (currentKey === "fotoCapturada" && !formData.fotoCapturada) {
      alert("Por favor, tire uma foto antes de continuar.");
      return;
    }

    if (formData[currentKey] !== undefined && formData[currentKey] !== '') {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleCapturePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      fotoCapturada: true, // Atualiza o estado para indicar que a foto foi capturada
    }));
    alert("Foto capturada com sucesso!");
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

  const currentKey = questions[currentQuestionIndex].key as keyof FormData;
  const value = formData[currentKey] as string;

  return (
    <div className="questions-container">
      {currentQuestionIndex < questions.length ? (
        <div className="question-card">
          <h3 className="question-title">{questions[currentQuestionIndex]?.question}</h3>

          {questions[currentQuestionIndex].key === "tipoSoros" ? (
            <div>
              {Object.keys(formData.tipoSoros).map((tipo) => (
                <div key={tipo} className="soro-item">
                  <label className="option-label" htmlFor={tipo}>
                    {tipo}
                  </label>
                  <input
                    type="number"
                    id={tipo}
                    name={tipo}
                    value={formData.tipoSoros[tipo]}
                    min="0"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        tipoSoros: {
                          ...prevData.tipoSoros,
                          [tipo]: e.target.value,
                        },
                      }))
                    }
                    className="soro-input"
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              ))}
            </div>
          ) : questions[currentQuestionIndex].type === "photo" ? (
            <button onClick={handleCapturePhoto} className="capture-button">
              Capturar Foto
            </button>
          ) : questions[currentQuestionIndex].type === "text" ? (
            <textarea
              value={value || ""}
              onChange={(e) => handleTextChange(currentKey, e.target.value)}
              className="input-text"
            />
          ) : (
            questions[currentQuestionIndex].options?.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={currentKey}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleOptionChange(currentKey, e.target.value)}
                />
                {option}
              </label>
            ))
          )}

          <button onClick={handleNextQuestion} className="next-button">
            Próxima
          </button>
        </div>
      ) : (
        <div className="completion-message">Obrigado por responder o questionário!</div>
      )}
    </div>
  );

};

export default Questions;
