import { ChecklistContent } from '@/types/checklists';
import {
  lavagemGastricaContent,
  paracenteseContent,
  rcpDeaContent,
  demenciaAlzheimerContent,
  dermatiteAtopicaContent,
  anemiaDeficienciaFerroContent,
  olhoVermelhoConjuntiviteContent,
  avcIsquemicoInep2023v2Content,
  urticariaAgudaInep2023Content,
  lavagemOuvidoContent,
  osteoporoseContent,
  paralisisFacialPerifericaContent,
  incontinenciaUrinariaEsforcoContent,
  puncaoLombarContent,
  suporteAvancadoAssistoliaContent,
  suporteAvancadoFVContent,
  hemorragiaSubaracnoideaContent,
  suporteBasicoVidaContent,
  pneumoniaInep2020Content,
  leucemiaAgudaInep2020Content,
  gotaInep2022Content,
  dpocDiagnosticoInep2021Content,
  enterobiaseOxiuriaseContent,
  diarreiaAgudaContent,
  lupusEritematosoSistemicoContent,
  vertigemVPPBContent,
  lombalgiaContent,
  erisipelaContent,
  hepatiteBAgudaContent,
  rinossinusiteAgudaContent,
  acidentePorAranhaContent,
  artriteInfecciosaContent,
  exacerbacaoAsmaContent,
  retocoliteUlcerativaInep2022Content,
  insuficienciaCardiacaAgudaPerfilBContent,
  insuficienciaCardiacaCronicaContent,
  hipertensaoArterialSistemicaInep2023Content,
  asmaInep2023Content,
  dpocDiagnosticoContent,
  doencaParkinsonContent,
  doencaCeliacaContent,
  sindromeGuillainBarreContent,
  celuliteInfecciosaContent,
  endocarditeInfecciosaContent,
  transtornoPanicoContent,
  gotaContent,
  urolitiaseContent,
  fibrilacaoAtrialContent,
  dispepsiaDrgeInep2020Content,
  sindromeWolffParkinsonWhiteInep2022Content,
  infeccaoTratoUrinarioCistiteContent,
  exacerbacaoDpocContent,
  sepseFocoUrinarioContent,
  doencaMeningococicaContent,
  cirroseHepaticaDescompensadaInep2021Content,
  profilaxiaPosExposicaoHivContent,
  emergenciaHipertensivaDisseccaoAortaContent,
  emergenciaHipertensivaEdemaAgudoPulmaoContent,
  urgenciaHipertensivaContent,
  pseudoCriseHipertensivaContent,
  cefaleiaSalvasContent,
  cefaleiaTensionalContent,
  migraneaContent,
  transtornoDepressivoMaiorContent,
  artriteReumatoideContent,
  pielonefriteAgudaContent,
  cetoacidoseDiabeticaContent,
  hipertireoidismoInep2021Content,
  tromboembolismoPulmonarTepContent,
  anemiaMegaloblasticaInep2022Content,
  pericarditeContent,
  diabetesMellitusContent,
  hipertensaoArterialSistemicaContent,
  hipotireoidismoContent,
  avcIsquemicoContent,
  pneumoniaAdquiridaComunidadeContent,
  asmaInep2024Content,
  hipertensaoPortalAsciteInep2024Content,
  mpoxMonkeypoxContent,
  sindromeGuillainBarre2Content,
  mielomaMultiploContent,
  avcNihssInep2024Content,
  dengueGrupoAInep2024Content,
  artritePsoriacaContent,
  sindromeIntestinoIrritavelContent,
  tineaCorporisContent,
  puncaoArterialGasometriaContent,
  semiologiaRespiratoriaPneumoniaContent,
  abcessoPulmonar2Content,
  hanseniaseExameDermatoneurologicoContent,
  hipoglicemiaContent,
  ascitePbeContent,
  angioedemaHereditarioContent,
  dressContent,
  hipercalemiaSecundariaDrcContent,
  lombalgiaExameFisicoColunaLombarContent,
  hipertireoidismoDoencaGravesContent,
  sindromeMetabolicaContent,
  hipermedicacaoIdosoSindromesGeriatricasContent,
  dpocExameFisicoRespiratorioContent
} from './checklistContentsCM';

// Content for ACLS - AESP (ID: 1)
const aclsAespContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Emergencial",
    situacao: [
      "A unidade dispõe de: carrinho de parada contendo todas as drogas necessárias para emergências; dispositivo bolsa-válvula-máscara (ambu); equipe treinada para suporte avançado de vida."
    ],
    descricao: [
      "Dona Maria, 72 anos, residente na zona rural de Barreiras (BA), tem histórico de diabetes tipo 2 e hipertensão arterial, com acompanhamento irregular em UBS na zona urbana da cidade.",
      "Foi encontrada inconsciente pela manhã, deitada na cama, pelo familiar, que relata que ela vinha apresentando fraqueza e tonturas há alguns dias.",
      "A família chega desesperada ao Centro de Saúde, com a paciente inconsciente no banco de triagem da unidade. A equipe de enfermagem e o médico de plantão são acionados.",
      "No 1º minuto de duração da estação, você deverá executar as seguintes tarefas: realizar o manejo de emergência seguindo o protocolo preconizado pela ACLS e responder aos questionamentos do chefe de plantão."
    ]
  },
  orientacoes: [
    "Você será o enfermeiro que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.",
    "Olá, eu me chamo Matheus, enfermeiro que o auxiliará durante todo o atendimento."
  ],
  instrucoes: {
    titulo: "Roteiro de respostas e liberação de impressos",
    itens: [
      "Se perguntado se o paciente responde a estímulos: liberar Impresso 1 (Resposta a estímulos).",
      "Se perguntado se o paciente tem pulso e respira: liberar Impresso 2 (Pulso e respiração).",
      "Se solicitada a ajuda da equipe: liberar Impresso 3 (Ajuda da equipe).",
      "Se solicitado desfibrilador: liberar Impresso 4 (Preparação do desfibrilador).",
      "Se o candidato verbalizar o início das compressões torácicas e ventilação: liberar Impresso 5 (Compressões e ventilações).",
      "Após o participante terminar de descrever as compressões/ventilações, ou solicitar para reavaliar o pulso: liberar Impresso 6 (Reavaliação após a massagem).",
      "Se solicitado o ritmo do paciente ou solicitado o monitor: liberar Impresso 7 (Ritmo do paciente).",
      "Se solicitado acesso venoso periférico e administração de adrenalina: considerar realizado.",
      "Se questionado por dúvida do chefe do plantão: liberar Impresso 8 (Dúvida do chefe do plantão)."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Resposta a estímulos", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Pulso e respiração", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Ajuda da equipe", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Preparação do desfibrilador", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Compressões e ventilações", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Reavaliação após a massagem", isOpen: false, color: "bg-primary" },
    { id: 7, title: "Impresso 7 – Ritmo do paciente", isOpen: false, color: "bg-primary" },
    { id: 8, title: "Impresso 8 – Dúvida do chefe do plantão", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação",
      subItems: [
        "(1) Identifica-se; e",
        "(2) Cumprimenta o enfermeiro auxiliar."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 2,
      title: "2. Verifica responsividade do paciente",
      subItems: [
        "(1) Chama o paciente em voz alta; e",
        "(2) Realiza estímulo tátil."
      ],
      scoring: {
        adequate: "Verbaliza as duas ações.",
        partial: "Verbaliza apenas uma ação.",
        inadequate: "Não verbaliza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Verifica pulso e respiração do paciente",
      subItems: [
        "(1) Verifica pulso; e",
        "(2) Verifica respiração."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Solicita ajuda e preparação do desfibrilador",
      subItems: [
        "(1) Ajuda da equipe treinada; e",
        "(2) Preparação do desfibrilador."
      ],
      scoring: {
        adequate: "Verbaliza as duas ações.",
        partial: "Verbaliza apenas uma ação.",
        inadequate: "Não verbaliza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Explica corretamente a técnica de massagem cardíaca",
      subItems: [
        "(1) Posicionamento da prancha de reanimação (rígida) sob o tórax do paciente;",
        "(2) Mãos sobrepostas e dedos entrelaçados;",
        "(3) Membros superiores esticados;",
        "(4) Base da mão sobre o esterno;",
        "(5) Compressão de ao menos 5 cm;",
        "(6) Frequência de 100 a 120 compressões por minuto;",
        "(7) Permite o retorno completo do tórax em cada compressão;",
        "(8) Interrupções mínimas das compressões."
      ],
      scoring: {
        adequate: "Verbaliza de seis a oito ações.",
        partial: "Verbaliza de três a cinco ações.",
        inadequate: "Verbaliza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Explica corretamente a técnica de ventilação com ambu",
      subItems: [
        "(1) Posição da cabeça em leve extensão ou posição olfativa ou manter a via aérea pérvia;",
        "(2) Máscara bem posicionada no rosto da vítima;",
        "(3) Técnica em C e em E dos dedos;",
        "(4) Realizar 2 ventilações a cada 30 compressões;",
        "(5) Evitar ventilações excessivas."
      ],
      scoring: {
        adequate: "Verbaliza de quatro a cinco ações.",
        partial: "Verbaliza três ações.",
        inadequate: "Verbaliza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Interpreta o ritmo do impresso como uma Atividade Elétrica Sem Pulso (AESP)",
      subItems: [],
      scoring: {
        adequate: "Interpreta.",
        partial: "—",
        inadequate: "Não interpreta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 8,
      title: "8. Após identificação do ritmo, indica",
      subItems: [
        "(1) Retorno das compressões torácicas;",
        "(2) Acesso intravenoso (IV) ou intraósseo (IO);",
        "(3) Adrenalina/Epinefrina 1 mg."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Responde à dúvida do chefe de plantão, informando possíveis causas reversíveis para o quadro",
      subItems: [
        "(1) Hipovolemia;",
        "(2) Hipóxia;",
        "(3) Acidose metabólica;",
        "(4) Hipoglicemia;",
        "(5) Hipo/hiperpotassemia;",
        "(6) Hipotermia;",
        "(7) Pneumotórax hipertensivo;",
        "(8) Tamponamento cardíaco;",
        "(9) Intoxicação;",
        "(10) Trombose pulmonar;",
        "(11) Trombose coronariana (IAM)."
      ],
      scoring: {
        adequate: "Verbaliza de sete a dez causas.",
        partial: "Verbaliza de três a seis causas.",
        inadequate: "Verbaliza uma ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    }
  ],
  references: []
};

// Content for Abcesso Pulmonar (ID: 8)
const abcessoPulmonarContent: ChecklistContent = {
  scenario: {
    nivel: "atenção terciária à saúde – hospitalar",
    tipo: "urgência e emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Setor de radiologia convencional e ultrassonografia;",
      "- Eletrocardiograma;",
      "- Laboratório de análises clínicas;",
      "- Centro cirúrgico."
    ],
    descricao: [
      "Um homem com 50 anos, baixa renda, procura atendimento na unidade queixando-se de tosse e sensação febril."
    ]
  },
  orientacoes: [
    "Nos 10 min. de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada.",
    "- Solicitar e interpretar o exame físico.",
    "- Solicitar e interpretar exames complementares pertinentes ao caso.",
    "- Correlacionar os achados dos exames associando-os ao quadro e citar dois diagnósticos diferenciais.",
    "- Estabelecer o diagnóstico e conduta terapêutica adequada.",
    "- Orientar sobre as medidas de pós alta do paciente."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Cleiton, tenho 50 anos, morador de rua.",
      "MOTIVO DE CONSULTA: \"Doutor(a), tenho sentido muita falta de ar, tosse e mal-estar.\"",
      "CARACTERÍSTICAS DA FALTA DE AR (DISPNEIA): Tempo de início: Começou há 2 semanas. Progressão: Piorou nos últimos 5 dias. Frequência: Constante. Fatores de melhora e/ou piora: intensifica com o esforço físico.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de início: Começou há 3 semanas. Progressão: Piorou nos últimos 2 dias. Frequência: Durante todo o dia. Característica: tosse produtiva com catarro esverdeado e fétido. Fatores de melhora e/ou piora: nega.",
      "CARACTERÍSTICAS DO MAL-ESTAR: Tempo de início: há 5 dias, quando percebi que estava mais quente.",
      "SINTOMAS ASSOCIADOS: Febre: sente-se quente em alguns períodos do dia há 5 dias, mas não mediu. Calafrios: à noite sente arrepios. Sudorese: sim, está suando bastante. Hemoptise: já teve expectoração com sangue 3x nos últimos 2 dias. Sintomas gripais: nega. Alterações neurológicas: nega. Palpitações e/ou desmaios e/ou dor torácica: nega. Náuseas/vômitos: não tem náuseas, mas vomitou 3 vezes ontem. Diarreia / constipação: nega. Alterações urinárias: nega. Alterações cutâneas: nega. Perda de peso e/ou anorexia: sim, sente que perdeu peso e tem tido pouca fome. História de infecção / ou PAC nos últimos 30 dias: teve um episódio de gripe mês passado.",
      "ANTECEDENTES PESSOAIS: Doenças: desconhece. Medicamentos: nega. Alergias: nega. Cirurgias ou internações: nega. Estado vacinal: não consta.",
      "HÁBITOS: Cigarro: fuma 2 maços por dia, há 20 anos. Álcool: bebe cachaça umas 3 vezes na semana. Drogas: usa crack e cocaína às vezes. Via de droga: não consta.",
      "NEGAR SEMPRE: Episódios anteriores de tosse crônica e febre; Contato com paciente tuberculoso e com COVID-19; Viagens nos últimos 5 anos; Tratamento prévio para ITS.",
      "DÚVIDAS PARA O CANDIDATO: 1) Após o candidato verbalizar o diagnóstico, perguntar: \"Quais as complicações posso apresentar?\" 2) Após o candidato verbalizar a conduta com antibioticoterapia, perguntar: \"Doutor(a), e se a conduta medicamentosa não funcionar? Qual seria a conduta a se tomar?\""
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 (Exame físico)", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 (Hemocultura)", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 (Broncoscopia / cultura do escarro)", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 (Laboratórios)", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 (Radiografia de tórax)", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 (TRM-TB)", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se, e;",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações;",
        partial: "",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga sobre os sintomas associados relevantes para o estabelecimento de diagnósticos diferenciais:",
      subItems: [
        "(1) Febre ou calafrios ou sudorese;",
        "(2) Dor torácica ou dor no peito ou dor ao respirar;",
        "(3) Expectoração ou secreção purulenta ou catarro;",
        "(4) Hemoptise ou expectoração com sangue;",
        "(5) Cianose e/ou palidez;",
        "(6) Sintomas gripais (rinorreia, secreção nasal, espirros);",
        "(7) Despertar noturno por falta de ar ou palpitações ou desmaios."
      ],
      scoring: {
        adequate: "Investiga sete ou seis itens;",
        partial: "Investiga cinco ou quatro itens;",
        inadequate: "Investiga três itens ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças crônicas;",
        "(2) Uso de fármacos;",
        "(3) Alergia medicamentosa;",
        "(4) Internações prévias;",
        "(5) Antecedentes de neoplasia."
      ],
      scoring: {
        adequate: "Investiga as cinco ações;",
        partial: "Investiga três ou quatro ações;",
        inadequate: "Investiga dois ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.3, max: 0.6 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico:",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "",
        inadequate: "Não realiza a ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 5,
      title: "5. Solicita exames complementares:",
      subItems: [
        "(1) Solicita RX de tórax e identifica as alterações na radiografia (cavitação com nível hidroaéreo em região do lobo inferior do pulmão direito);",
        "(2) Solicita laboratórios;",
        "(3) Solicita TRM-TB."
      ],
      scoring: {
        adequate: "Solicita três exames;",
        partial: "Solicita dois exames;",
        inadequate: "Não solicita nenhum exame."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita broncoscopia E/OU cultura do escarro;",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de: Abscesso Pulmonar.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Cita dois diagnósticos diferenciais:",
      subItems: [
        "(1) Carcinoma brônquico;",
        "(2) Tuberculose;",
        "(3) Empiema pleural;",
        "(4) Bolhas enfisematosas infectadas;",
        "(5) Pneumoconiose cavitária;",
        "(7) Hérnia de hiato;",
        "(8) Pneumonia adquirida na comunidade;",
        "(9) Granulomatose de Wegener."
      ],
      scoring: {
        adequate: "Cita pelo menos dois;",
        partial: "Cita um;",
        inadequate: "Não cita nenhum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Estabelece conduta:",
      subItems: [
        "(1) Internação hospitalar;",
        "(2) Inicia hidratação endovenosa;",
        "(3) Indica monitorização contínua dos sinais vitais e suporte ventilatório;",
        "(4) Prescreve antibioticoterapia endovenosa empírica;",
        "(5) Indica fisioterapia respiratória;",
        "(6) Indica controle radiológico da doença."
      ],
      scoring: {
        adequate: "Realiza quatro ou mais ações;",
        partial: "Realiza três ações;",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Orienta sobre as medidas de pós alta:",
      subItems: [
        "(1) Orienta sobre mudança no estilo de vida como cessar tabagismo, etilismo e uso de drogas ilícitas;",
        "(2) Orienta sobre mudança no estilo de vida como prática de atividade física regular e alimentação saudável;",
        "(3) Acompanhamento ambulatorial para monitorização da função pulmonar;",
        "(4) Reabilitação pulmonar para otimizar a recuperação da capacidade respiratória;",
        "(6) Encaminha paciente para E-multi e/ou CAPS-AD e/ou Consultório na Rua."
      ],
      scoring: {
        adequate: "Realiza três ou mais ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Responde que, caso ocorra falha no tratamento com antibioticoterapia, será considerada uma drenagem percutânea, endobrônquica ou cirúrgica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 12,
      title: "12. Menciona complicações:",
      subItems: [
        "(1) Empiema;",
        "(2) Fibrose pulmonar;",
        "(3) Insuficiência respiratória;",
        "(4) Fístula broncopleural;",
        "(5) Infecção disseminada."
      ],
      scoring: {
        adequate: "Menciona três a cinco complicações;",
        partial: "Menciona duas complicações;",
        inadequate: "Menciona uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Anemia Hemolítica Autoimune (ID: 49)
const anemiaHemoliticaContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção primária",
    tipo: "Ambulatorial - consulta básica de saúde.",
    situacao: [
      "Consultório.",
      "Laboratório.",
      "Farmácia.",
      "Paciente S.A."
    ],
    descricao: [
      "Após um resultado de exame em uma UBS a mesma uma mulher de 45 anos de idade esta passada na fila de e espera."
    ]
  },
  orientacoes: [
    "Ator: 10:30: a duração de a prova de 10 minutos, você recebe a sua paciente é pode começar.",
    "Rescrever anamnese direcionando a suspeita principal de síndrome.",
    "Realizar exame físico direcionada à queixa e suspeitas (se paciente).",
    "Solicitar exames laboratoriais pertinente à sua.",
    "Realizar a correlação e avaliar o relatório diagnóstico c/ dêscription a estratégia para a questão.",
    "Usar os menos dois exames complementares para o diagnóstico em questão."
  ],
  instrucoes: {
    titulo: "",
    itens: []
  },
  impressos: [
    { id: 1, title: "Impresso 1 ( Exame Tórax )", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 ( Laboratório )", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 ( Esfregaço de sangue periférico )", isOpen: false, color: "bg-blue-500" },
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "[1] Identifica-se; e",
        "[2] Cumprimenta o paciente com ubuato."
      ],
      scoring: { adequate: "Realiza as duas ações.", partial: "Realiza uma ação ou não realiza nenhuma ação.", inadequate: "Realiza uma ação ou não realiza nenhuma ação." },
      scores: { min: 0, partial: 0.25, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga a queixa perguntando:",
      subItems: [
        "[1] Fraqueza/adinamia;",
        "[2] Icterícia/dor nos olhos, escuros, ou dispneia;",
        "[3] Fatores desencadeantes ou de piora."
      ],
      scoring: { adequate: "Pergunta sobre três ações.", partial: "Pergunta sobre dois itens.", inadequate: "Pergunta sobre um item ou menos itens." },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga sintomas associados:",
      subItems: [
        "[1] Turgidência jugular/ queijo quente nos calores ou/o urina;",
        "[2] Alteração do fluxo urinário;",
        "[3] Fezes claras ou acólicas;",
        "[4] Pele seca/desidratação ou/o prurido;",
        "[5] Edema de membros inferiores."
      ],
      scoring: { adequate: "Investiga de quatro a cinco ações.", partial: "Investiga sobre três itens.", inadequate: "Investiga dois ou menos itens." },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Pesquisa sobre antecedentes pessoais:",
      subItems: [
        "[1] Doenças;",
        "[2] Uso de medicamentos;",
        "[3] Internação;",
        "[4] Resultado prévio sugere vício Étaque Délai;",
        "[5] Intervenções;",
        "[6] Alergias-Vacina."
      ],
      scoring: { adequate: "Pergunta sobre os seis ações itens.", partial: "Pergunta sobre quatro de cinco itens.", inadequate: "Pergunta três itens ou menos itens." },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Investiga anormalidades ginecológicas:",
      subItems: [
        "[1] Data da última menstruação;",
        "[2] Uso de anticoncepcional;",
        "[3] Se SOP (anormaldade menstrual ou ovulatória e/ou aumento de andrógenos);",
        "[4] Gestação atual;",
        "[5] Sangramento vaginal anormal."
      ],
      scoring: { adequate: "Investiga de quatro a cinco ações.", partial: "Investiga sobre três itens.", inadequate: "Investiga dois ou menos itens." },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita ou realiza Exame Físico:",
      subItems: [
        "[1] Inspeção geral;",
        "[2] Sinais vitais (FC, FR, PA, Tax);",
        "[3] Ausculta cardíaca;",
        "[4] Ausculta pulmonar;",
        "[5] Palpação abdominal;",
        "[6] Exame de extremidades (edema MMII)."
      ],
      scoring: { adequate: "Realiza de cinco a seis ações.", partial: "Realiza três ou quatro ações.", inadequate: "Realiza duas ou menos ações." },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita hemograma completo:",
      subItems: [],
      scoring: { adequate: "Solicitou.", partial: "", inadequate: "Não solicitou." },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita reticulócitos e LDH:",
      subItems: [],
      scoring: { adequate: "Solicitou ambos.", partial: "Solicitou um dos dois exames.", inadequate: "Não solicitou nenhum." },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita Haptoglobina e bilirrubina indireta:",
      subItems: [],
      scoring: { adequate: "Solicitou ambos.", partial: "Solicitou um dos dois exames.", inadequate: "Não solicitou nenhum." },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Solicita Coombs direto e indireto:",
      subItems: [],
      scoring: { adequate: "Solicitou ambos.", partial: "Solicitou um dos dois exames.", inadequate: "Não solicitou nenhum." },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Realiza diagnóstico de Anemia Hemolítica Autoimune:",
      subItems: [],
      scoring: { adequate: "Realizou o diagnóstico.", partial: "", inadequate: "Não realizou o diagnóstico." },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 12,
      title: "12. Cita diagnósticos diferenciais:",
      subItems: [
        "[1] Anemia megaloblástica;",
        "[2] Esferocitose hereditária;",
        "[3] Hemoglobinúria paroxística noturna;",
        "[4] Microangiopatia trombótica;",
        "[5] Anemia por deficiência de G6PD."
      ],
      scoring: { adequate: "Cita três ou mais diagnósticos diferenciais.", partial: "Cita um ou dois diagnósticos diferenciais.", inadequate: "Não cita nenhum diagnóstico diferencial." },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 13,
      title: "13. Orienta sobre opções terapêuticas:",
      subItems: [
        "[1] Corticóides;",
        "[2] Ácido fólico/reposição;",
        "[3] Imunos cirurgico;",
        "[4] Anticorpos monoclonais;",
        "[5] Imunoglobulina humana;",
        "[6] Esplenectomia."
      ],
      scoring: { adequate: "Cita os mínimo/ação opções terapêuticas.", partial: "Cita uma opção terapêutica.", inadequate: "Não cita nenhum item." },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: [
    "https://www.uptodate.com/pt/ferro-diagnosticação-anemial-pediatric_screening_FOLHA002"
  ]
};

// Default content for checklists without specific content
export const defaultChecklistContent: ChecklistContent = {
  scenario: {
    nivel: "A definir",
    tipo: "A definir",
    situacao: [
      "Cenário ainda não configurado para este checklist."
    ],
    descricao: [
      "O conteúdo específico deste checklist ainda não foi adicionado.",
      "Por favor, aguarde a atualização do conteúdo ou entre em contato com o suporte."
    ]
  },
  orientacoes: [
    "Conteúdo em desenvolvimento."
  ],
  instrucoes: {
    titulo: "Instruções ainda não disponíveis para este checklist.",
    itens: []
  },
  impressos: [],
  evaluationItems: [
    {
      id: 1,
      title: "1. Item de avaliação padrão:",
      subItems: ["[1] Sub-item exemplo."],
      scoring: { adequate: "Realizou corretamente.", partial: "Realizou parcialmente.", inadequate: "Não realizou." },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: [
    "Referências bibliográficas serão adicionadas em breve."
  ]
};

/**
 * Objeto que armazena o conteúdo de cada checklist, indexado pelo ID.
 * 
 * Para adicionar um novo conteúdo, basta adicionar uma nova entrada:
 * 
 * checklistContents['ID_DO_CHECKLIST'] = {
 *   scenario: { ... },
 *   orientacoes: [...],
 *   instrucoes: { ... },
 *   impressos: [...],
 *   evaluationItems: [...],
 *   references: [...]
 * };
 */
// AVC - ESCALA NIHSS INEP 2024.2
const avcNihssContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção secundária à saúde",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios;",
      "- Sala de estabilização;",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiologia com aparelho de radiografia e tomografia computadorizada;",
      "- Leitos de internação – enfermaria e terapia intensiva."
    ],
    descricao: [
      "Você atenderá um paciente com 58 anos de idade, histórico de arritmia cardíaca, diabetes melito e dislipidemia, com suspeita de acidente vascular cerebral por apresentar déficit neurológico (hemiplegia esquerda) e cefaleia, iniciados há cerca de 1 hora.",
      "Paciente encontra-se com respiração espontânea, via aérea pérvia, boa saturação de O2 em ar ambiente e parâmetros hemodinâmicos adequados.",
      "Durante os 10 min de duração da estação, você deverá executar as seguintes tarefas: aplicar a escala NIHSS no paciente e, ao final, VERBALIZAR a pontuação total obtida; solicitar exames complementares necessários à avaliação inicial do caso."
    ]
  },
  orientacoes: [
    "DADOS PESSOAIS: Anderson, 58 anos, motorista de ônibus.",
    "MOTIVO DE CONSULTA: 'Não consigo movimentar o braço e a perna esquerda.'",
    "INÍCIO DOS SINTOMAS: começou há pouco mais de uma hora.",
    "ANTECEDENTES PESSOAIS: diabetes, arritmia e colesterol alto.",
    "Ao verbalizar/solicitar a realização da escala NIHSS, liberar TODOS os impressos disponíveis."
  ],
  instrucoes: {
    titulo: "Roteiro de respostas durante a aplicação da NIHSS",
    itens: [
      "Se perguntado a idade e mês que estamos: responder 'Tenho 58 anos e estamos no mês de dezembro'.",
      "Se solicitado para fechar e abrir os olhos e fechar e abrir a mão: fechar e abrir os olhos, fechar e abrir a mão direita.",
      "Se solicitado para movimentar os olhos na horizontal para os dois lados: movimentar os olhos para os dois lados.",
      "Se perguntado quantos dedos o paciente vê: responder adequadamente de acordo ao que for mostrado.",
      "Se solicitado para acompanhar o movimento dos dedos do participante: acompanhar adequadamente e/ou responder que consegue.",
      "Se solicitado mostrar os dentes/sorrir e fechar os olhos com força: mostrar os dentes/sorrir e fechar os olhos com força.",
      "Se solicitado para sustentar o braço direito a 90° por 10 segundos: realizar a ação corretamente.",
      "Se solicitado para mover a perna esquerda: simular e/ou verbalizar que NÃO consegue.",
      "Se solicitado sustentar a perna direita a 30° por 5 segundos: simular e/ou verbalizar que consegue realizar a ação.",
      "Se solicitado que o paciente faça o teste index-nariz ou calcanhar-joelho: realizar adequadamente com o lado direito.",
      "Se o candidato verbalizar que irá tocar/beliscar os membros do lado esquerdo: responder que NÃO sentiu nada.",
      "Se o candidato verbalizar que irá tocar/beliscar os membros do lado direito: responder que consegue sentir o toque e a dor.",
      "Se solicitado a descrever o que está acontecendo no quadro do Impresso 1: descrever adequadamente a cena.",
      "Se solicitado a nomear os itens na lista de identificação do Impresso 2: nomear adequadamente.",
      "Se solicitado a ler a lista de sentença do Impresso 3: ler adequadamente.",
      "Se solicitado a ler ou repetir as palavras da lista do Impresso 4: realizar a tarefa adequadamente.",
      "Se o candidato solicitar exame laboratorial ou de imagem de forma inespecífica: dizer 'Seja mais específico com o pedido'.",
      "Se o candidato solicitar exames complementares laboratoriais e/ou de imagem de forma específica: dizer 'Considere solicitado'.",
      "No decorrer da estação, caso o participante conclua a aplicação da escala NIHSS e não verbalize seu total, perguntar se concluiu a aplicação e, após confirmar o término, perguntar qual foi a pontuação."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Imagem para descrição", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Itens para identificação", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Sentenças para leitura", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Palavras para repetição/leitura", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – NIHSS (itens iniciais)", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – NIHSS (avaliação motora)", isOpen: false, color: "bg-primary" },
    { id: 7, title: "Impresso 7 – NIHSS (sensibilidade/linguagem)", isOpen: false, color: "bg-primary" },
    { id: 8, title: "Impresso 8 – NIHSS (complementar)", isOpen: false, color: "bg-primary" },
    { id: 9, title: "Impresso 9 – NIHSS (resumo final)", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação",
      subItems: [
        "(1) Identifica-se; e",
        "(2) Cumprimenta o paciente simulado e pergunta seu nome."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 2,
      title: "2. Realiza a avaliação 1a do NIHSS",
      subItems: [
        "Avalia se o paciente está alerta, falando com ele(a)."
      ],
      scoring: {
        adequate: "Avalia se o paciente está alerta.",
        partial: "—",
        inadequate: "Não avalia se o paciente está alerta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 3,
      title: "3. Realiza a avaliação 1b do NIHSS",
      subItems: [
        "(1) Pergunta a idade do paciente; e",
        "(2) Pergunta em que mês estamos."
      ],
      scoring: {
        adequate: "Pergunta os dois itens.",
        partial: "Pergunta apenas um item.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Realiza a avaliação 1c do NIHSS",
      subItems: [
        "(1) Solicita que abra e feche os olhos; e",
        "(2) Solicita que abra e feche a mão."
      ],
      scoring: {
        adequate: "Realiza as duas solicitações.",
        partial: "Realiza apenas uma solicitação.",
        inadequate: "Não solicita nenhuma das duas ações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Realiza a avaliação 2 do NIHSS",
      subItems: [
        "Pede que o paciente movimente os olhos horizontalmente para os dois lados (direita e esquerda)."
      ],
      scoring: {
        adequate: "Avalia a movimentação para os dois lados.",
        partial: "Avalia a movimentação para um lado.",
        inadequate: "Não avalia a movimentação ocular."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Realiza a avaliação 3 do NIHSS",
      subItems: [
        "Avalia os campos visuais (superiores e inferiores)."
      ],
      scoring: {
        adequate: "Avalia os quatro quadrantes.",
        partial: "—",
        inadequate: "Não avalia os quatro quadrantes."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Realiza a avaliação 4 do NIHSS",
      subItems: [
        "Pede que o paciente sorria (ou mostre os dentes) e feche os olhos com força."
      ],
      scoring: {
        adequate: "Faz as duas solicitações.",
        partial: "Faz apenas uma solicitação.",
        inadequate: "Não faz nenhuma das solicitações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza a avaliação 5 do NIHSS",
      subItems: [
        "Solicita que o paciente sustente os braços a 90°, com as palmas das mãos para baixo."
      ],
      scoring: {
        adequate: "Realiza com ângulo e posicionamento das mãos adequados.",
        partial: "Realiza com ângulo OU posicionamento das mãos inadequados.",
        inadequate: "Não realiza ou realiza com ângulo e posicionamento inadequados."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Realiza a avaliação 6 do NIHSS",
      subItems: [
        "Solicita que o paciente sustente as pernas a 30°, em extensão."
      ],
      scoring: {
        adequate: "Realiza com ângulo e extensão adequados.",
        partial: "Realiza com ângulo OU extensão inadequados.",
        inadequate: "Não realiza ou realiza com ângulo e extensão inadequados."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza a avaliação 7 do NIHSS",
      subItems: [
        "Solicita que o paciente faça o teste index-nariz OU calcanhar-joelho."
      ],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 11,
      title: "11. Realiza a avaliação 8 do NIHSS",
      subItems: [
        "Testa a sensibilidade do paciente."
      ],
      scoring: {
        adequate: "Testa.",
        partial: "—",
        inadequate: "Não testa."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 12,
      title: "12. Realiza a avaliação 9 do NIHSS",
      subItems: [
        "Solicita que o paciente descreva a imagem."
      ],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 13,
      title: "13. Realiza a avaliação 10 do NIHSS",
      subItems: [
        "Solicita que o paciente leia (ou repita) a lista de palavras."
      ],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 14,
      title: "14. Totaliza corretamente a escala NIHSS",
      subItems: [
        "Verbaliza total de 10 pontos."
      ],
      scoring: {
        adequate: "Totaliza corretamente.",
        partial: "—",
        inadequate: "Não totaliza ou totaliza com outro valor."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 15,
      title: "15. Solicita TC/ressonância de crânio SEM contraste",
      subItems: [
        "Solicita TC, tomografia, tomografia computadorizada, ressonância ou ressonância magnética de crânio SEM CONTRASTE."
      ],
      scoring: {
        adequate: "Solicita sem contraste.",
        partial: "Solicita COM contraste.",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 16,
      title: "16. Solicita outros exames complementares",
      subItems: [
        "(1) Eletrocardiograma;",
        "(2) Glicemia capilar;",
        "(3) Hemograma;",
        "(4) Coagulograma (TAP / INR e TTPA);",
        "(5) Potássio e sódio;",
        "(6) Ureia e creatinina;",
        "(7) Troponina."
      ],
      scoring: {
        adequate: "Solicita ao menos cinco exames.",
        partial: "—",
        inadequate: "Solicita menos que cinco exames."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// 🧠 CM AVC Isquêmico - Híbrido
const avcIsquemicoHibridoContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório;",
      "- Exames de imagem;",
      "- Salas de internação geral e UTI."
    ],
    descricao: [
      "Homem, 67 anos, hipertenso e diabético, em uso irregular de captopril e metformina. Trazido ao pronto-socorro há 1h30 do início súbito de fraqueza em dimídio direito, associada a dificuldade de falar."
    ]
  },
  orientacoes: [
    "Nos 10 min. de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Verbalizar e escrever a prescrição médica do paciente;",
    "- Orientar a família sobre pelo menos 4 cuidados com o paciente após a alta hospitalar."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 67 anos de idade, aposentado.",
      "MOTIVO DE CONSULTA: \"Doutor, eu estava bem, mas de repente senti fraqueza no lado direito do corpo e fiquei com a fala enrolada. Isso começou faz pouco tempo.\"",
      "SE PERGUNTADO PELO TEMPO DE INÍCIO DOS SINTOMAS: \"Começaram há cerca de 1 hora e meia.\"",
      "SINTOMAS ASSOCIADOS: Só a fraqueza e a dificuldade na fala.",
      "ANTECEDENTES PESSOAIS: Doenças: tenho diabetes, pressão alta e o colesterol estava alto na última consulta. Medicamentos: uso metformina 500 mg duas vezes ao dia e enalapril 20 mg uma vez. Alergias: não tenho nenhuma alergia a medicamentos. AVC prévio: nega. Trauma de crânio prévio: nega. Hemorragia recente ou uso de anticoagulante: nega.",
      "HÁBITOS: Cigarro: fumo um maço por dia há 16 anos. Álcool: duas latas de cerveja por dia. Drogas: nega. Atividade física: não realiza. Alimentação: \"Doutor(a), eu gosto muito de comer, de tudo um pouco.\"",
      "ANTECEDENTES FAMILIARES: \"Meu pai era diabético e morreu por AVC, tenho muito medo de acontecer a mesma coisa comigo. O que eu tenho doutor(a)? Corro risco de morrer?\"",
      "PERGUNTAR AO FINAL DA CONSULTA: \"Depois que eu sair do hospital, o que tenho que fazer?\"",
      "INSTRUÇÕES AO EXAMINADOR / ENTREGA DE IMPRESSOS: Se o candidato verbalizar EXAME FÍSICO, liberar Impresso 1. Se o candidato verbalizar EXAME NEUROLÓGICO, liberar Impresso 2. Se o candidato verbalizar GLICEMIA, liberar Impresso 3. Se o candidato verbalizar ELETROCARDIOGRAMA, liberar Impresso 4. Se o candidato verbalizar LABORATÓRIOS, liberar Impresso 6. Se o candidato verbalizar TOMOGRAFIA, liberar Impresso 5. Se o candidato verbalizar HIPÓTESE DIAGNÓSTICA, liberar Impresso 7. Se o candidato verbalizar TRATAMENTO / PRESCRIÇÃO / INTERNAÇÃO, liberar Impresso 8."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 (Exame físico)", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 (Exame neurológico)", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 (Glicemia capilar aleatória)", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 (Eletrocardiograma de 12 derivações)", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 (Tomografia de crânio sem contraste)", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 (Laboratório)", isOpen: false, color: "bg-primary" },
    { id: 7, title: "Impresso 7 (Diagnóstico)", isOpen: false, color: "bg-primary" },
    { id: 8, title: "Impresso 8 (Prescrição)", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre o quadro apresentado pelo paciente:",
      subItems: [
        "(1) Tempo de início dos sintomas;",
        "(2) Palpitação;",
        "(3) Perda de consciência;",
        "(4) Convulsão;",
        "(5) Eventos similares."
      ],
      scoring: {
        adequate: "Pergunta ao menos quatro itens (obrigatoriamente deve conter o item um).",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes:",
      subItems: ["(1) Pessoais;", "(2) Familiares."],
      scoring: {
        adequate: "Investiga dois itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita:",
      subItems: ["(1) Exame físico geral;", "(2) Exame neurológico."],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita laboratórios:",
      subItems: [
        "(1) Hemograma;",
        "(2) Glicemia capilar e plasmática;",
        "(3) Ureia e creatinina;",
        "(4) Ionograma ou (sódio e potássio);",
        "(5) Coagulograma;",
        "(6) PCR / VHS."
      ],
      scoring: {
        adequate: "Solicita cinco ou mais exames.",
        partial: "Solicita de dois a quatro exames.",
        inadequate: "Solicita um ou não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita ECG de 12 derivações.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.3 }
    },
    {
      id: 8,
      title: "8. Solicita tomografia de crânio sem contraste:",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Escreve e verbaliza o diagnóstico de acidente vascular cerebral isquêmico.",
      subItems: ["Obs: o item só será pontuado se verbalizado, escrito de maneira legível e mostrado para a câmera."],
      scoring: {
        adequate: "Verbaliza e escreve corretamente o diagnóstico.",
        partial: "Verbaliza e/ou escreve corretamente o diagnóstico.",
        inadequate: "Não verbaliza e nem escreve o diagnóstico correto."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 11,
      title: "11. Realiza a seguinte prescrição ao paciente:",
      subItems: [
        "(1) Cabeceira elevada a 30°;",
        "(2) Monitorização;",
        "(3) Dieta zero;",
        "(4) Oxigenoterapia se SatO₂ < 94%;",
        "(5) Alteplase (rt-PA) 0,9 mg/kg 10% em bolus EV, restante em infusão contínua.",
        "Obs: o item só será pontuado se verbalizado, escrito de maneira legível e mostrado para a câmera."
      ],
      scoring: {
        adequate: "Verbaliza e escreve quatro ou mais itens da prescrição corretamente.",
        partial: "Verbaliza e/ou escreve dois ou três itens.",
        inadequate: "Verbaliza e/ou escreve dois itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 12,
      title: "12. Realiza orientações gerais sobre os cuidados e recuperação funcional do paciente:",
      subItems: [
        "(1) Prevenção de quedas;",
        "(2) Reabilitação com fisioterapia;",
        "(3) Reabilitação com fonoaudiologia;",
        "(4) Controle das doenças de base;",
        "(5) Alimentação adequada;",
        "(6) Evitar tabagismo;",
        "(7) Evitar consumo de álcool."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou mais itens.",
        partial: "Verbaliza dois ou três itens.",
        inadequate: "Verbaliza um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: ["https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-cuidados-avc.pdf"]
};

// 🧠 CM AVC Isquêmico - INEP | 2023.2
const avcIsquemicoInep2023Content: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Hospital de referência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Pronto-socorro;",
      "- Laboratório de análises clínicas;",
      "- Exames de imagem;",
      "- Terapia intensiva e leitos de enfermaria."
    ],
    descricao: [
      "Você está de plantão no pronto-socorro de um hospital terciário e atenderá um homem de 55 anos de idade, tabagista e hipertenso, que vem da sua casa, onde aguardava transporte para hospital há 8 horas.",
      "Ele chega ao hospital através da urgência. Encontra-se acompanhado pela esposa que refere que ele está com a fala 'embolada' e com 'perda de movimentos no braço esquerdo'.",
      "ATENÇÃO! Considere que o paciente está deitado na maca durante toda a consulta. A anamnese será dirigida à acompanhante do paciente. Caso julgue necessário realizar exame físico, verbalize!"
    ]
  },
  orientacoes: [
    "Nos 10 min. de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese do paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Solicitar e interpretar o(s) exame(s) complementares pertinente(s);",
    "- Estabelecer e comunicar hipótese diagnóstica;",
    "- Propor conduta para o paciente."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "MOTIVO DE CONSULTA: \"Meu esposo, Roberto, perdeu o movimento do braço esquerdo e também está com a fala enrolada. A gente estava na chácara e eu liguei para um vizinho pedindo ajuda para levar ele até a UPA. Porém ficamos 12 horas esperando na UPA até eles transferirem o Roberto para esse hospital.\"",
      "CARACTERÍSTICAS DO QUADRO: Tempo de evolução: ele está assim desde ontem. Outras partes afetadas: somente o braço ele não consegue mexer e está com a fala enrolada. Ele está andando normalmente. Episódios anteriores: nega.",
      "SINTOMAS ASSOCIADOS: Negar todos.",
      "ANTECEDENTES PESSOAIS: Doenças: ele é diabético e hipertenso. Medicamentos: metformina e enalapril. Alergias: nega. Cirurgias: nega. Trauma, queda, acidente ou violência nos últimos meses: nega.",
      "HÁBITOS: Álcool: nega. Cigarro: dez cigarros por dia. Drogas: nega. Alimentação: come muito mal, só comidas gordurosas e doces. Atividade física: não faz atividade física.",
      "ANTECEDENTES FAMILIARES: \"O pai dele morreu de derrame cerebral.\"",
      "INSTRUÇÕES AO EXAMINADOR / IMPRESSOS: Se o candidato solicitar exames de laboratório, liberar os Impressos 2 e 3."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 (Exame físico)", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 (Laboratório 1/2)", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 (Laboratório 2/2)", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 (Tomografia de crânio)", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta a acompanhante."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação apenas.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.2, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre afasia e perda de força em membro superior esquerdo (MSE):",
      subItems: [
        "(1) Afasia (tempo OU disartria OU nível de consciência);",
        "(2) Perda de força MSE (tempo OU se notou perda de força em MIE concomitante OU tremores OU dormência OU sensibilidade à dor no local OU alterações na coordenação motora);",
        "(3) Manifestações associadas (queda, convulsão, febre, vômitos, cefaleia, alterações visuais, alterações do equilíbrio)."
      ],
      scoring: {
        adequate: "Investiga dois ou mais itens.",
        partial: "Investiga apenas um item.",
        inadequate: "Não investiga item algum."
      },
      scores: { min: 0, partial: 0.7, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Questiona sobre antecedentes pessoais e familiares:",
      subItems: [
        "(1) Hipertensão;",
        "(2) Diabetes;",
        "(3) Tabagismo;",
        "(4) Uso de drogas (cocaína, anfetamina);",
        "(5) História familiar de AVC;",
        "(6) Doenças cardíacas;",
        "(7) Distúrbios lipídicos (colesterol alto, dislipidemias);",
        "(8) Sedentarismo;",
        "(9) Consumo de álcool."
      ],
      scoring: {
        adequate: "Questiona quatro ou mais itens.",
        partial: "Questiona dois ou três itens.",
        inadequate: "Questiona apenas um item OU não questiona item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico.",
      subItems: ["(1) Solicita exame físico."],
      scoring: {
        adequate: "Solicita exame físico.",
        partial: "",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) Glicemia;",
        "(3) Creatinina e ureia OU função renal;",
        "(4) Eletrólitos (Na, K);",
        "(5) Tempo de protrombina / RNI (INR);",
        "(6) Tempo parcial de tromboplastina ativada;",
        "(7) Troponina."
      ],
      scoring: {
        adequate: "Solicita cinco ou mais exames.",
        partial: "Solicita três ou quatro exames.",
        inadequate: "Solicita um ou dois exames OU não solicita exame algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita tomografia computadorizada de crânio ou ressonância magnética de crânio.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Formula hipótese diagnóstica de acidente vascular cerebral (OU encefálico) isquêmico (AVCi, AVC isquêmico, AVE, AVEi).",
      subItems: ["Obs.: inadequado se formular hipótese de AVCh, 'derrame cerebral' isolado, 'acidente vascular cerebral' sem especificar, ou AVC hemorrágico."],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "",
        inadequate: "Não formula a hipótese OU formula hipóteses inadequadas."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Conduta médica inicial:",
      subItems: [
        "(1) Monitorização;",
        "(2) Hidratação venosa;",
        "(3) Internação em box de emergência OU terapia intensiva OU sala vermelha;",
        "(4) Oxigenoterapia;",
        "(5) Suspensão da dieta oral;",
        "(6) Cabeceira a 0º (ou 30º, se vômitos)."
      ],
      scoring: {
        adequate: "Orienta três ou mais condutas.",
        partial: "Orienta duas condutas.",
        inadequate: "Orienta apenas uma conduta OU orienta conduta incorreta OU não orienta conduta alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica específica:",
      subItems: [
        "Controle pressórico (redução parcimoniosa de PA: 10 a 25% em 24 horas OU < 220 x 120 mmHg) E trombectomia mecânica OU craniectomia descompressiva.",
        "Obs.: caso o candidato cite nitroprussiato venoso não pontuar esse item. A administração de nitroprussiato resultará em rebaixamento brusco do nível de consciência (transformação hemorrágica)."
      ],
      scoring: {
        adequate: "Orienta.",
        partial: "",
        inadequate: "Não orienta OU orienta redução drástica da PA OU orienta a administração de trombolítico."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    }
  ],
  references: ["https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-cuidados-avc.pdf"]
};

// 🧠 PR AVC na UBS
const avcUbsContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção primária à saúde",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios;",
      "- Sala de medicação;",
      "- Laboratório de análises clínicas;",
      "- Eletrocardiograma, radiografia beira leito;",
      "- Ambulância para transporte do paciente."
    ],
    descricao: [
      "Você é o(a) médico(a) na UBS e é chamado(a) para atender uma paciente trazida por familiares encontrada caída no banheiro.",
      "Na cidade em que você atua, há um Hospital Regional, de grande porte, com serviços de tomografia e neurocirurgia, distante a 30 minutos de ambulância da UBS.",
      "O Serviço Médico de Emergência desta cidade atende pelo número 192 (SAMU).",
      "ATENÇÃO! Caso julgue necessário realizar exame físico, verbalize! A paciente simulada não deverá ser tocada durante o atendimento."
    ]
  },
  orientacoes: [
    "Nos 10 min. de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada a queixa principal da paciente;",
    "- Solicitar e interpretar o exame físico geral e específico;",
    "- Verbalizar a hipótese diagnóstica;",
    "- Indicar exames complementares pertinentes à suspeita diagnóstica;",
    "- Avaliar a classificação de gravidade do caso, eventual necessidade de remoção, medidas para realização de transporte seguro (se houver)."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Acompanhante: Zion, 34 anos. Paciente: Inês, 82 anos.",
      "MOTIVO DE CONSULTA: \"Dr(a), encontrei minha vó caída no chão do banheiro da casa dela.\"",
      "SOBRE A QUEIXA PRINCIPAL: Tempo do ocorrido: \"Foi só o tempo de levantar ela e vir, acredito que 20 ou 30 minutos.\" Perda de consciência: \"Eu não sei te dizer, quando eu entrei no banheiro ela estava com o rosto virado para o chão, com o shorts e calcinha baixos e com esse sangue na testa, está um pouco confusa e com dificuldade para se expressar.\" Primeiro episódio: \"Sim Dr(a), isso nunca tinha acontecido antes.\" Situação de estresse prévia: \"Não Dr(a), tínhamos tomado café da manhã e aí percebi que a casa ficou em silêncio; quando fui procurar ela encontrei ela no banheiro caída.\" Sintomas prévios: \"Estava tudo bem Dr(a), ela não estava doente e nem reclamando de nada, tomamos nosso café da manhã como sempre e aí isso aconteceu.\"",
      "SINTOMAS ASSOCIADOS: \"Desde que encontrei ela, ela não fica muito tempo com os olhos abertos, não responde e fica se tremendo, não sei nem o que pensar, também não tem força nas mãos e pernas.\"",
      "ANTECEDENTES PESSOAIS/PATOLÓGICOS: Comorbidades: \"Não, ela é idosa, mas não tem nenhuma doença.\" Uso de medicação crônica: \"Faz uso de melatonina para conseguir dormir melhor e toma chá de casca de berinjela pois tem dificuldade para fazer cocô todos os dias.\" Alergias: \"Que eu saiba ela não tem nenhuma.\" Internações: \"Não sei te dizer.\" Cirurgias: \"Não sei te dizer.\" Neoplasia: Não tem nenhuma. Situação vacinal: \"Acho que está tudo em dia sim, minha vó é super preocupada com a saúde dela, tem um mês mais ou menos que tomou a da gripe.\"",
      "ANTECEDENTES FAMILIARES: \"Eu não sei te dizer, não conheci os pais da minha avó, mas o meu pai mesmo não tem nada.\"",
      "DÚVIDAS: Pergunta 1: \"O que está acontecendo com a minha vó Dr(a)?\" Pergunta 2: \"Ela tem que fazer algum exame?\" Pergunta 3: \"Nós vamos ficar aqui internados?\" CASO O CANDIDATO REFIRA QUE IRÁ TRANSFERIR A PACIENTE EM AMBULÂNCIA, REALIZAR A PRÓXIMA PERGUNTA DE FORMA ESPONTÂNEA: Pergunta 4: \"Eu senti muita confiança no seu atendimento, você poderia ir conosco na ambulância, por favor?\""
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 (Exame físico)", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 (Exame neurológico)", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 (Ectoscopia)", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 (Eletrocardiograma)", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 (Raio X de crâneo)", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Cumprimenta o familiar da paciente;",
        "(2) Identifica-se;",
        "(3) Identifica a paciente;",
        "(4) Pergunta; e,",
        "(5) Ouve com atenção o motivo da consulta."
      ],
      scoring: {
        adequate: "Realiza as cinco ações.",
        partial: "Realiza de duas a quatro ações.",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Demonstra empatia com a paciente:",
      subItems: ["(1) Estabelece contato visual; e,", "(2) Mantém postura empática ao longo da consulta."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "",
        inadequate: "Não realiza as duas ações."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 3,
      title: "3. Usa linguagem acessível, evitando termos técnicos de difícil compreensão.",
      subItems: [],
      scoring: {
        adequate: "Usa linguagem acessível.",
        partial: "",
        inadequate: "Não usa linguagem acessível."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 4,
      title: "4. Responde às perguntas trazidas pelo familiar da paciente.",
      subItems: [],
      scoring: {
        adequate: "Responde às perguntas da paciente.",
        partial: "",
        inadequate: "Não responde às perguntas da paciente."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Investiga sobre a queixa:",
      subItems: ["(1) Tempo do ocorrido;", "(2) Perda de consciência; e,", "(3) Episódios anteriores;"],
      scoring: {
        adequate: "Investiga os três itens.",
        partial: "Investiga somente dois itens.",
        inadequate: "Investiga um ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Investiga:",
      subItems: ["(1) Situação de estresse prévia; e,", "(2) Presença de sintomas prévios a queda."],
      scoring: {
        adequate: "Investiga os dois itens.",
        partial: "Investiga somente um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.4 }
    },
    {
      id: 7,
      title: "7. Investiga história patológica pregressa:",
      subItems: [
        "(1) Comorbidades;",
        "(2) Uso de medicamentos crônicos;",
        "(3) Alergias;",
        "(4) Internações prévias;",
        "(5) Cirurgias prévias; e,",
        "(6) Situação vacinal."
      ],
      scoring: {
        adequate: "Investiga os seis itens.",
        partial: "Investiga de dois a cinco itens.",
        inadequate: "Investiga somente um item ou não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita:",
      subItems: ["(1) Exame físico geral;", "(2) Exame físico neurológico; e,", "(3) Ectoscopia."],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita ao menos o item dois.",
        inadequate: "Não solicita o item dois."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Solicita eletrocardiograma:",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Solicita Raio X de crâneo:",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Indica:",
      subItems: ["(1) Necessidade de monitorização contínua; e,", "(2) Acesso venoso periférico."],
      scoring: {
        adequate: "Indica os dois itens.",
        partial: "Indica um item.",
        inadequate: "Não indica nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 12,
      title: "12. Informa:",
      subItems: ["(1) Necessidade de intubação;", "(2) Transferência da paciente para unidade de saúde de maior complexidade."],
      scoring: {
        adequate: "Informa os dois itens.",
        partial: "Informa ao menos sobre a necessidade de transferência.",
        inadequate: "Não informa sobre a necessidade de transferência."
      },
      scores: { min: 0, partial: 0.5, max: 1.35 }
    },
    {
      id: 13,
      title: "13. Responde às perguntas do familiar, informando que: uma das principais hipóteses diagnósticas é Acidente Vascular Cerebral.",
      subItems: [],
      scoring: {
        adequate: "Informa sobre a hipótese de acidente vascular cerebral.",
        partial: "",
        inadequate: "Não informa sobre a hipótese de acidente vascular cerebral."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 14,
      title: "14. Responde às perguntas do familiar, informando que: será necessária a realização de tomografia de crâneo na unidade de maior complexidade.",
      subItems: [],
      scoring: {
        adequate: "Informa sobre a necessidade de realização de tomografia.",
        partial: "",
        inadequate: "Não informa sobre a necessidade de realização de tomografia."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 15,
      title: "15. Responde às perguntas do familiar, informando que:",
      subItems: [
        "(1) Existe a necessidade de remoção segura por uma ambulância gratuita com profissionais de saúde treinados para serviço de saúde de maior complexidade;",
        "(2) Informa a necessidade de contato prévio com o hospital de referência; e,",
        "(3) Não afasta a possibilidade de que possa ir junto na ambulância para realizar a remoção."
      ],
      scoring: {
        adequate: "Informa os três itens.",
        partial: "Informa um item.",
        inadequate: "Não informa nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: ["http://189.28.128.100/dab/docs/portaldab/publicacoes/LC_AVC_no_adulto.pdf"]
};

export const checklistContents: Record<string, ChecklistContent> = {
  '1': aclsAespContent,
  '8': abcessoPulmonarContent,
  '49': anemiaHemoliticaContent,
  '2': avcNihssContent,
  '3': avcIsquemicoHibridoContent,
  '4': avcIsquemicoInep2023Content,
  '586': avcUbsContent,
  // CM Checklists
  '336': lavagemGastricaContent,
  '450': rcpDeaContent,
  '161': demenciaAlzheimerContent,
  '170': dermatiteAtopicaContent,
  '51': anemiaDeficienciaFerroContent,
  '374': olhoVermelhoConjuntiviteContent,
  '5': avcIsquemicoInep2023v2Content,
  '565': urticariaAgudaInep2023Content,
  '969': paracenteseContent,
  '335': lavagemOuvidoContent,
  '375': osteoporoseContent,
  '389': paralisisFacialPerifericaContent,
  '1055': incontinenciaUrinariaEsforcoContent,
  '440': puncaoLombarContent,
  '475': suporteAvancadoAssistoliaContent,
  '476': suporteAvancadoFVContent,
  '272': hemorragiaSubaracnoideaContent,
  '478': suporteBasicoVidaContent,
  '411': pneumoniaInep2020Content,
  '1078': leucemiaAgudaInep2020Content,
  '1080': gotaInep2022Content,
  '1081': dpocDiagnosticoInep2021Content,
  '1100': enterobiaseOxiuriaseContent,
  '1105': diarreiaAgudaContent,
  '1113': lupusEritematosoSistemicoContent,
  '1124': vertigemVPPBContent,
  '1143': lombalgiaContent,
  '1144': erisipelaContent,
  '1150': hepatiteBAgudaContent,
  '1159': rinossinusiteAgudaContent,
  '1162': acidentePorAranhaContent,
  '1163': artriteInfecciosaContent,
  '1164': exacerbacaoAsmaContent,
  '1165': retocoliteUlcerativaInep2022Content,
  '1166': insuficienciaCardiacaAgudaPerfilBContent,
  '1167': insuficienciaCardiacaCronicaContent,
  '1171': hipertensaoArterialSistemicaInep2023Content,
  '1172': asmaInep2023Content,
  '1175': dpocDiagnosticoContent,
  '1176': doencaParkinsonContent,
  '1177': doencaCeliacaContent,
  '1178': sindromeGuillainBarreContent,
  '1192': celuliteInfecciosaContent,
  '1201': endocarditeInfecciosaContent,
  '1202': transtornoPanicoContent,
  '1203': gotaContent,
  '1241': urolitiaseContent,
  '1243': fibrilacaoAtrialContent,
  '1244': dispepsiaDrgeInep2020Content,
  '1245': sindromeWolffParkinsonWhiteInep2022Content,
  '1256': infeccaoTratoUrinarioCistiteContent,
  '1262': exacerbacaoDpocContent,
  '1268': sepseFocoUrinarioContent,
  '1271': doencaMeningococicaContent,
  '1272': cirroseHepaticaDescompensadaInep2021Content,
  '1280': profilaxiaPosExposicaoHivContent,
  '1282': emergenciaHipertensivaDisseccaoAortaContent,
  '1283': emergenciaHipertensivaEdemaAgudoPulmaoContent,
  '1285': urgenciaHipertensivaContent,
  '1288': pseudoCriseHipertensivaContent,
  '1297': cefaleiaSalvasContent,
  '1298': cefaleiaTensionalContent,
  '1310': migraneaContent,
  '1311': transtornoDepressivoMaiorContent,
  '1312': artriteReumatoideContent,
  '1316': pielonefriteAgudaContent,
  '1317': cetoacidoseDiabeticaContent,
  '1322': hipertireoidismoInep2021Content,
  '1337': tromboembolismoPulmonarTepContent,
  '1339': anemiaMegaloblasticaInep2022Content,
  '1345': pericarditeContent,
  '1346': diabetesMellitusContent,
  '1347': hipertensaoArterialSistemicaContent,
  '1348': hipotireoidismoContent,
  '1349': avcIsquemicoContent,
  '1350': pneumoniaAdquiridaComunidadeContent,
  '1354': asmaInep2024Content,
  '1355': hipertensaoPortalAsciteInep2024Content,
  '1364': mpoxMonkeypoxContent,
  '1370': sindromeGuillainBarre2Content,
  '1372': mielomaMultiploContent,
  '1385': avcNihssInep2024Content,
  '1386': dengueGrupoAInep2024Content,
  '1389': artritePsoriacaContent,
  '1390': sindromeIntestinoIrritavelContent,
  '1391': tineaCorporisContent,
  '1392': puncaoArterialGasometriaContent,
  '1460': semiologiaRespiratoriaPneumoniaContent,
  '1465': abcessoPulmonar2Content,
  '1468': hanseniaseExameDermatoneurologicoContent,
  '1483': hipoglicemiaContent,
  '1484': ascitePbeContent,
  '1503': angioedemaHereditarioContent,
  '1504': dressContent,
  '1507': hipercalemiaSecundariaDrcContent,
  '1513': lombalgiaExameFisicoColunaLombarContent,
  '1516': hipertireoidismoDoencaGravesContent,
  '1517': sindromeMetabolicaContent,
  '1523': hipermedicacaoIdosoSindromesGeriatricasContent,
  '1579': dpocExameFisicoRespiratorioContent,
};

/**
 * Função para obter o conteúdo de um checklist pelo ID.
 * Se o ID não existir, retorna o conteúdo padrão.
 */
export const getChecklistContentById = (id: string): ChecklistContent => {
  return checklistContents[id] ?? defaultChecklistContent;
};

/**
 * Função assíncrona para obter o conteúdo de um checklist pelo ID.
 * Primeiro tenta carregar do JSON, depois do cache estático.
 */
export const getChecklistContentByIdAsync = async (id: string): Promise<ChecklistContent> => {
  // Primeiro verifica se já existe no objeto estático
  if (checklistContents[id]) {
    return checklistContents[id];
  }
  
  // Tenta carregar do JSON via fetch
  try {
    const { loadChecklistByUidAsync } = await import('./checklistLoader');
    const content = await loadChecklistByUidAsync(id);
    if (content) {
      // Adiciona ao cache estático para próximas chamadas
      checklistContents[id] = content;
      return content;
    }
  } catch (error) {
    console.error(`Erro ao carregar checklist ${id}:`, error);
  }
  
  return defaultChecklistContent;
};
