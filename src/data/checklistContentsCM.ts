import { ChecklistContent } from '@/types/checklists';

// Content for Lavagem Gástrica (ID: 336, UID: 968)
export const lavagemGastricaContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Eletrocardiografia;",
      "- Laboratório de análises clínicas;",
      "- Centro cirúrgico."
    ],
    descricao: [
      "Você é um médico de plantão atuando na sala de emergência de uma unidade de pronto atendimento (UPA) e dialogará com uma enfermeira. Ela pedirá a você que avalie Ana, uma paciente de 30 anos de idade, trazida pelos familiares devido a uma ingestão aguda de aproximadamente 30 comprimidos de medicamentos variados não identificados como tentativa de suicídio, ocorrida há 30 minutos."
    ]
  },
  orientacoes: [
    "- Escutar o relato da enfermeira;",
    "- Solicitar exame físico relacionado à queixa principal;",
    "- Definir a conduta inicial com base no quadro clínico;",
    "- Responder aos questionamentos da enfermeira."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o(a) enfermeiro(a) que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.",
      "DADOS INICIAIS DO CASO: Doutor(a), boa tarde. Temos aqui a paciente Ana, de 30 anos, previamente hígida, trazida pela familia há cerca de 30 minutos, após ingestão de aproximadamente 30 comprimidos de medicamentos variados não identificados. No momento está ansiosa e queixa-se de náuseas leves e dor abdominal. Não houve vômito. Gostaria que o(a) senhor(a) me orientasse sobre a conduta imediata e a qual procedimento podemos realizar.",
      "QUALQUER OUTRA PERGUNTA REALIZADA SOBRE ANAMNESE/EXAME FÍSICO: Não consta no script.",
      "SE O CANDIDATO INDICAR CARVÃO ATIVADO VERBALIZAR: Não temos disponível no local Dr(a), tem mais alguma coisa que podemos fazer?",
      "SE O CANDIDATO INDICAR LAVAGEM GÁSTRICA, PERGUNTAR: Como é feito, Dr(a)? Você pode me pedir os materiais que você vai precisar, eu vou separando pra você.",
      "SE O CANDIDATO SOLICITAR TODOS OS MATERIAIS, RESPONDER: Considere os materiais disponíveis. Você poderia me explicar o passo-a-passo deste procedimento?",
      "SE O CANDIDATO EXPLICAR O PASSO-A-PASSO, PERGUNTAR: Quais são as contraindicações para a lavagem gástrica? E as complicações?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame Físico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Escuta atentamente o relato da enfermeira.",
      subItems: [],
      scoring: {
        adequate: "Escuta o relato.",
        partial: "—",
        inadequate: "Não escuta."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Indica o carvão ativado como primeira opção, indica lavagem gástrica como segunda opção.",
      subItems: [],
      scoring: {
        adequate: "Indica o carvão ativado como primeira opção, indica a lavagem gástrica como segunda opção.",
        partial: "Não indica o carvão ativado como primeira opção.",
        inadequate: "Não indica nenhuma das opções."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 4,
      title: "4. Solicita materiais necessários para a realização do procedimento:",
      subItems: [
        "(1) Sonda oro ou nasogástrica;",
        "(2) Lidocaína;",
        "(3) Soro fisiológico ou água;",
        "(4) Campo ou toalha ou gaze;",
        "(5) Luvas de procedimento;",
        "(6) Seringa de 20 ml;",
        "(7) Máscara;",
        "(8) Óculos;",
        "(9) Estetoscópio."
      ],
      scoring: {
        adequate: "Solicita seis ou mais itens.",
        partial: "Solicita quatro ou cinco itens.",
        inadequate: "Solicita três ou menos materiais."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 5,
      title: "5. Explica a realização do procedimento:",
      subItems: [
        "(1) Posição do paciente: decúbito lateral esquerdo ou sentado ou Fowler ou semi Fowler;",
        "(2) Higienização das mãos;",
        "(3) Paramentação;",
        "(4) Cobre o tórax do paciente com campo, toalha ou gaze;",
        "(5) Realiza a medida da sonda posicionando a ponta distal da sonda na ponta do nariz do paciente (ápice do nariz);",
        "(6) Estenda a sonda do nariz até o lóbulo da orelha (a parte mole na base da orelha);",
        "(7) A partir do lóbulo da orelha, desça a sonda em linha reta até o apêndice xifoide;",
        "(8) Usa um pedaço de fita adesiva ou uma caneta marcadora para registrar essa medida na sonda;",
        "(9) Coloca lidocaína gel na extremidade distal da sonda;",
        "(10) Pede ao paciente para deglutir durante a passagem da sonda;",
        "(11) Confirma o correto posicionamento da sonda: insufla ar com a seringa ao mesmo tempo em que ausculta a região epigástrica;",
        "(12) Conecta o cateter ao equipo com SF 0,9% e infunde o volume;",
        "(13) Drena o conteúdo infundido."
      ],
      scoring: {
        adequate: "Verbaliza onze itens ou mais.",
        partial: "Verbaliza de seis a dez itens.",
        inadequate: "Verbaliza cinco itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 6,
      title: "6. Cita contraindicações para a realização do procedimento:",
      subItems: [
        "(1) Glasgow ≤ 8;",
        "(2) Ingestão de cáusticos ou corrosivos;",
        "(3) Ingestão de solventes;",
        "(4) Varizes de esôfago de grosso calibre;",
        "(5) Hematêmese volumosa;",
        "(6) Cirurgia recente do trato gastrintestinal;",
        "(7) Ingestão de materiais sólidos com pontas;",
        "(8) Ingestão de pacotes contendo drogas."
      ],
      scoring: {
        adequate: "Cita quatro ou mais contraindicações.",
        partial: "Cita duas ou três contraindicações.",
        inadequate: "Cita uma ou nenhuma contraindicação."
      },
      scores: { min: 0, partial: 1, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Cita complicações da lavagem gástrica:",
      subItems: [
        "(1) Intubação traqueal inadvertida;",
        "(2) Traumatismo de vias aéreas;",
        "(3) Laringoespasmo;",
        "(4) Pneumonia aspirativa;",
        "(5) Perfuração de esôfago;",
        "(6) Perfuração de estômago;",
        "(7) Hiperêmese;",
        "(8) Hemorragia gastrintestinal."
      ],
      scoring: {
        adequate: "Cita quatro ou mais complicações.",
        partial: "Cita duas ou três complicações.",
        inadequate: "Cita uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 1, max: 1.5 }
    }
  ],
  references: []
};

// Content for Paracentese (novo checklist, UID: 969)
export const paracenteseContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção terciária à saúde",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiologia convencional;",
      "- Unidade de terapia intensiva (UTI) e leitos de internação."
    ],
    descricao: [
      "Você está de plantão e realizará o atendimento do paciente, etilista e com antecedente de cirrose que consulta por aumento do volume abdominal de 2 dias de evolução."
    ]
  },
  orientacoes: [
    "- Explicar ao paciente com linguagem acessível o procedimento de paracentese diagnóstica;",
    "- Citar quatro indicações e quatro contraindicações para a realização do procedimento;",
    "- Elencar possíveis complicações relacionadas à realização da paracentese;",
    "- Demonstrar a técnica de paracentese diagnóstica solicitando todos os materiais necessários.",
    "Atenção! Considere que a anamnese e o exame físico já foram realizados."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o(a) enfermeiro(a) que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.",
      "DADOS DA PACIENTE: Antônio, 53 anos de idade, desempregado.",
      "MOTIVO DE CONSULTA: Dr(a), eu vim porque eu notei que minha barriga está muito inchada.",
      "QUALQUER OUTRA PERGUNTA REALIZADA SOBRE ANAMNESE/EXAME FÍSICO: Não consta no script.",
      "SE O CANDIDATO SOLICITAR OS MATERIAIS, RESPONDER: Considere disponível."
    ]
  },
  impressos: [],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se; e,",
        "(2) Cumprimenta o paciente simulado e pergunta seu nome."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Indica e/ou explica com linguagem acessível sobre a necessidade de realizar a paracentese diagnóstica.",
      subItems: [],
      scoring: {
        adequate: "Indica/explica.",
        partial: "—",
        inadequate: "Não indica/explica."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 3,
      title: "3. Solicita a autorização do paciente para a realização da paracentese diagnóstica.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Cita indicações do procedimento:",
      subItems: [
        "(1) Avaliação de novas ascites;",
        "(2) Ascite de grande volume;",
        "(3) Ascite de repetição;",
        "(4) Ascite resistente ao uso de diuréticos;",
        "(5) Ascite com sinais de deterioração clínica;",
        "(6) Alívio de sintomas."
      ],
      scoring: {
        adequate: "Cita ao menos quatro indicações.",
        partial: "Cita duas ou três indicações.",
        inadequate: "Cita uma ou nenhuma indicação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Cita contraindicações relativas e/ou absolutas para a realização do procedimento:",
      subItems: [
        "(1) Infecção da parede abdominal;",
        "(2) Coagulação intravascular disseminada;",
        "(3) Obstrução intestinal;",
        "(4) Paciente não cooperativo;",
        "(5) Hiperfibrinólise;",
        "(6) Visceromegalia;",
        "(7) Grandes massas intra-abdominais."
      ],
      scoring: {
        adequate: "Cita quatro ou mais contraindicações.",
        partial: "Cita duas ou três contraindicações.",
        inadequate: "Cita duas ou menos contraindicações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Cita complicações da paracentese:",
      subItems: [
        "(1) Lesão de vísceras;",
        "(2) Sangramento intra-abdominal;",
        "(3) Lesão de artérias;",
        "(4) Infecção;",
        "(5) Hematoma da parede abdominal;",
        "(6) Persistência da saída de líquido ascítico."
      ],
      scoring: {
        adequate: "Cita três ou mais complicações.",
        partial: "Cita uma ou duas complicações.",
        inadequate: "Não cita nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita materiais necessários para a realização do procedimento:",
      subItems: [
        "(1) Aparelho de ultrassom;",
        "(2) Lidocaína 1%;",
        "(3) Frasco de coleta;",
        "(4) Campo estéril;",
        "(5) Gazes;",
        "(6) Clorexidina;",
        "(7) Máscara;",
        "(8) Óculos;",
        "(9) Gorro;",
        "(10) Capote;",
        "(11) Luva esterilizada;",
        "(12) Jelco 14 ou 16;",
        "(13) Seringas de 20ml;",
        "(14) Agulha: 22G ou 25G."
      ],
      scoring: {
        adequate: "Solicita ao menos oito materiais.",
        partial: "Solicita de quatro a sete materiais.",
        inadequate: "Solicita três ou menos materiais."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Identifica adequadamente o local de punção.",
      subItems: [
        "(1) Traça uma linha imaginária da espinha ilíaca ântero superior até a cicatriz umbilical.",
        "(2) Verbaliza que a punção deve ocorrer na junção do terço médio com o terço inferior desta linha.",
        "(3) Realiza a degermação do local e a paramentação adequada."
      ],
      scoring: {
        adequate: "Realiza duas ou três ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Verbaliza corretamente a realização do procedimento:",
      subItems: [
        "(1) Posição do paciente: decúbito dorsal;",
        "(2) Higienização das mãos;",
        "(3) Paramentação;",
        "(4) Antissepsia do local de punção;",
        "(5) Colocação do campo estéril;",
        "(6) Introdução da agulha do anestésico a 45° para anestesia local;",
        "(7) Realização da punção com Jelco 14 ou 16 no quadrante inferior do abdome;",
        "(8) Utilizar a técnica da punção em Z, para evitar extravasamento de líquido;",
        "(9) Coleta do material para análise;",
        "(10) Realização de curativo."
      ],
      scoring: {
        adequate: "Verbaliza ao menos sete itens.",
        partial: "Verbaliza de quatro a seis itens.",
        inadequate: "Verbaliza três ou menos itens."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 10,
      title: "10. Solicita adequadamente a análise do líquido ascítico.",
      subItems: [
        "(1) Celularidade;",
        "(2) Albumina;",
        "(3) LDH;",
        "(4) Glicose;",
        "(5) Culturas."
      ],
      scoring: {
        adequate: "Solicita os cinco itens.",
        partial: "Solicita a somente três ou quatro itens.",
        inadequate: "Solicita dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for RCP + DEA (ID: 450, UID: 978)
export const rcpDeaContent: ChecklistContent = {
  scenario: {
    nivel: "Terminal 1 - Aeroporto de Guarulhos",
    tipo: "Emergência",
    situacao: [
      "O local possui a seguinte infraestrutura:",
      "- DEA;",
      "- Pocket mask ou máscara pocket para RCP."
    ],
    descricao: [
      "Você é médico e está em um aeroporto esperando seu voo quando ouve pessoas gritando pedindo ajuda e solicitando a presença de um médico. De longe você vê uma mulher de aproximadamente 45 anos de idade que está caída e sem se mover. Os familiares estão desesperados pedindo ajuda."
    ]
  },
  orientacoes: [
    "- Realizar o atendimento inicial da paciente, garantindo abordagem segura e sistematizada;",
    "- Verbalizar e conduzir as ações iniciais do Suporte Básico de Vida, conforme a Cadeia de Sobrevivência;",
    "- Reconhecer e indicar intervenções adequadas conforme protocolos do ACLS;",
    "- Citar possíveis causas reversíveis do quadro apresentado."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o familiar que auxiliará o candidato e responderá suas perguntas de acordo ao roteiro.",
      "DADOS DO PACIENTE: Fernanda, 45 anos, hipertensa, cardiopata.",
      "SE PERGUNTADO O QUE ACONTECEU: Estávamos sentados esperando nosso voo e de repente ela começou a transpirar muito e caiu.",
      "SE O CANDIDATO REALIZAR QUALQUER OUTRA PERGUNTA DE ANAMNESE: Não consta no script.",
      "SE O CANDIDATO PERGUNTAR SE A PACIENTE RESPONDE A ESTÍMULO VERBAL: Liberar o IMPRESSO 1.",
      "SE O CANDIDATO PERGUNTAR SE A PACIENTE RESPONDE A ESTÍMULO TÁTIL: Liberar o IMPRESSO 2.",
      "SE O CANDIDATO PERGUNTAR SE A PACIENTE TEM PULSO E/OU RESPIRA: Liberar o IMPRESSO 3.",
      "SE O CANDIDATO SOLICITAR SERVIÇO DE EMERGÊNCIAS/AJUDA: Considere solicitado.",
      "SE O CANDIDATO SOLICITAR UM DESFIBRILADOR EXTERNO AUTOMÁTICO/DEA: Libere o IMPRESSO 4 e 5.",
      "QUANDO O CANDIDATO VERBALIZAR A COLOCAÇÃO DO DEA (LIGAR O DEA, COLOCAR AS PÁS, PLUGAR O CABO NO DEA), DIGA: Analisando ritmo…choque recomendado.",
      "SE O CANDIDATO VERBALIZAR A CONTINUAÇÃO DA MASSAGEM CARDÍACA, DIGA O SEGUINTE: A paciente se recuperou e será transportada pela ambulância!"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Resposta verbal", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Estímulo tátil", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Pulso e respiração", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – DEA", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – DEA: choque recomendado", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Verbalizou ou perguntou se a cena do atendimento é segura ANTES de aproximar, apresentar ou dirigir-se à vítima.",
      subItems: [],
      scoring: {
        adequate: "Realiza corretamente a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. (1) Se apresentou às pessoas como médico e (2) perguntou o que aconteceu.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realizou uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta algum dado de identificação da paciente e/ou histórico médico.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Comprova se a paciente responde por no máximo 10 segundos:",
      subItems: [
        "(1) Chama a paciente em voz alta;",
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
      id: 5,
      title: "5. Solicita que seja acionado o serviço de emergência.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita um Desfibrilador Externo Automático (DEA).",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Explica corretamente a técnica de massagem cardíaca:",
      subItems: [
        "(1) Ajoelhado ao lado da vítima;",
        "(2) Mãos sobrepostas e dedos entrelaçados;",
        "(3) Membros superiores esticados;",
        "(4) Base da mão sobre o esterno;",
        "(5) Compressão de ao menos 5 cm;",
        "(6) Frequência de 100 a 120 compressões por minuto;",
        "(7) Permite o retorno completo do tórax em cada compressão;",
        "(8) Interrupções mínimas das compressões."
      ],
      scoring: {
        adequate: "Verbaliza de seis a oito itens.",
        partial: "Verbaliza de quatro a cinco itens.",
        inadequate: "Verbaliza três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Explica corretamente a técnica de ventilação com a pocket mask.",
      subItems: [
        "(1) Posição da cabeça em leve extensão ou posição olfativa ou manter a via aérea pérvia;",
        "(2) Máscara bem posicionada no rosto da vítima;",
        "(3) Realizar 2 ventilações a cada 30 compressões;",
        "(4) Evitar ventilações excessivas."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou cinco itens.",
        partial: "Verbaliza três itens.",
        inadequate: "Verbaliza dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Explica corretamente o uso do DEA:",
      subItems: [
        "(1) Liga o aparelho;",
        "(2) Posiciona um eletrodo no lado direito do tórax e o outro na parte lateral esquerda;",
        "(3) Conecta os cabos;",
        "(4) Não toca no paciente durante a checagem de ritmo;",
        "(5) Antes do choque, verifica se todos estão afastados;",
        "(6) Aperta o botão de choque assim que disponível."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou cinco itens.",
        partial: "Verbaliza três itens.",
        inadequate: "Verbaliza dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Cita as possíveis causas reversíveis de PCR:",
      subItems: [
        "(1) Hipovolemia;",
        "(2) Hipóxia;",
        "(3) Hidrogênio (Acidemia);",
        "(4) Hipocalemia/Hipercalemia;",
        "(5) Hipotermia;",
        "(6) Tamponamento cardíaco;",
        "(7) Trombose cardíaca;",
        "(8) Trombose pulmonar;",
        "(9) Pneumotórax;",
        "(10) Toxinas."
      ],
      scoring: {
        adequate: "Verbaliza nove ou dez itens.",
        partial: "Verbaliza de sete a oito itens.",
        inadequate: "Verbaliza seis ou menos itens."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    }
  ],
  references: []
};

// Content for Demência / Doença de Alzheimer (ID: 161, UID: 986)
export const demenciaAlzheimerContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial e hospitalar",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você recebe para consulta o paciente de 65 anos de idade, contador aposentado. Vem à consulta acompanhado de seu filho Sebastião que também é seu cuidador e está muito preocupado com o seu pai. Refere que ele anda esquecendo muito as coisas e perdendo objetos pessoais como chave, celular, etc."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Realizar o diagnóstico sindrômico e citar a sua principal etiologia;",
    "- Verbalizar ao menos três diagnósticos diferenciais;",
    "- Propor conduta terapêutica e orientações pertinentes."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS DO PACIENTE: Victor, 65 anos de idade, contador aposentado.",
      "DADOS PESSOAIS DO ACOMPANHANTE: Sebastião, 40 anos de idade, solteiro, se dedica a cuidar do pai.",
      "MOTIVO DE CONSULTA: Meu pai está com a memória muito ruim doutor(a). Em todo lugar que vai, ele esquece alguma coisa (telefone, chave da casa). Queria saber o que pode ser feito pra melhorar isso porque ele não era assim.",
      "TEMPO DE EVOLUÇÃO: Faz uns 3 anos que ele começou a ficar assim. Já levei ele em outra consulta no ano passado mas o médico disse que era por causa da idade mesmo.",
      "FORMA DE INÍCIO: Começou aos poucos. Não lembro exatamente quando mas já faz uns 3 anos pelo menos.",
      "PROGRESSÃO: Senti que ele está pior desde o ano passado.",
      "DOENÇAS: Ele tem hipotiroidismo.",
      "MEDICAMENTOS: Levotiroxina.",
      "Se o candidato solicitar Mini Mental Test ou Mini Exame do Estado Mental: Liberar o IMPRESSO 2.",
      "Se o candidato solicitar tomografia ou ressonância de crânio: Liberar o IMPRESSO 4."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Mini exame do estado mental", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Tomografia/Ressonância de crânio", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta e pergunta o nome do paciente e de seu filho."
      ],
      scoring: {
        adequate: "Realiza as duas ações de forma completa.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza perguntas sobre:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Forma de início;",
        "(3) Progressão."
      ],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga sintomas associados:",
      subItems: [
        "(1) Alterações na memória recente/de curto prazo;",
        "(2) Alterações na personalidade ou comportamento ou humor;",
        "(3) Dificuldade em realizar tarefas complexas;",
        "(4) Sintomas de infecção (válido se perguntado por febre ou sintomas específicos)."
      ],
      scoring: {
        adequate: "Investiga três ou quatro itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos;",
        "(4) Drogas ilícitas;",
        "(5) Álcool."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico:",
      subItems: [
        "(1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta;",
        "(2) Interpreta exame físico;",
        "(3) Solicita e interpreta o Mini exame do estado mental."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR ou VHS;",
        "(3) TSH;",
        "(4) Vitamina B12;",
        "(5) Creatinina;",
        "(6) Ureia;",
        "(7) Glicemia;",
        "(8) Sódio;",
        "(9) Potássio;",
        "(10) Cálcio;",
        "(11) Perfil lipídico."
      ],
      scoring: {
        adequate: "Solicita oito ou mais exames da lista.",
        partial: "Solicita de quatro a sete exames.",
        inadequate: "Solicita três ou menos exames."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita tomografia ou ressonância magnética de crânio.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. (1) Realiza o diagnóstico sindrômico de Demência e (2) cita como principal etiologia a Doença de Alzheimer.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza apenas uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Verbaliza diagnósticos diferenciais:",
      subItems: [
        "(1) Delirium;",
        "(2) Hipotiroidismo;",
        "(3) Deficiência de vitamina B12;",
        "(4) Transtorno depressivo;",
        "(5) Alterações relacionadas à idade;",
        "(6) Demência vascular;",
        "(7) Demência infecciosa;",
        "(8) Demência por corpúsculos de Lewy;",
        "(9) Demência traumática;",
        "(10) Uremia crônica;",
        "(11) Intoxicação crônica;",
        "(12) Demência frontotemporal."
      ],
      scoring: {
        adequate: "Verbaliza três ou mais diagnósticos diferenciais.",
        partial: "Verbaliza dois diagnósticos diferenciais.",
        inadequate: "Verbaliza um ou nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Conduta medicamentosa: indicou inibidores da acetilcolinesterase (donepezila ou galantamina ou rivastigmina) associado ou não à memantina.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Conduta não medicamentosa:",
      subItems: [
        "(1) Indica exercício físico regular;",
        "(2) Suspensão do tabagismo;",
        "(3) Orienta sobre o risco do paciente dirigir;",
        "(4) Estimula a realização de atividades cognitivas;",
        "(5) Encaminha o paciente ao neurologista;",
        "(6) Oferece apoio ao filho/cuidador."
      ],
      scoring: {
        adequate: "Indica cinco ou mais itens.",
        partial: "Indica três ou quatro itens.",
        inadequate: "Indica dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1 }
    }
  ],
  references: []
};

// Content for Dermatite Atópica (ID: 170, UID: 994)
export const dermatiteAtopicaContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção Primária à Saúde",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios;",
      "- Laboratório de análises clínicas;",
      "- Leito de observação;",
      "- Ambulância para transporte do paciente."
    ],
    descricao: [
      "Você é um médico atuando em uma unidade de atenção primária e atenderá uma paciente de 24 anos, com queixa de coceira no corpo."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal da paciente;",
    "- Solicitar exame físico direcionado à queixa principal da paciente;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados da anamnese e exame físico;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Francisco, 24 anos de idade, solteiro, estudante.",
      "MOTIVO DE CONSULTA: Estou com muita coceira no corpo.",
      "TEMPO DE EVOLUÇÃO: Faz 1 ano mais ou menos que começou. Quando a coceira é muita, vou na farmácia e peço um remédio para coceira.",
      "LOCALIZAÇÃO: Coça principalmente nas dobras dos joelhos e braços. Às vezes coçam as mãos e os pés também.",
      "PRESENÇA DE LESÕES: Parece que a pele fica muito irritada, vermelha e com umas bolhinhas.",
      "PELE SECA: Sim, minha pele está sempre seca, principalmente no lugar que coça.",
      "RINITE ALÉRGICA: Acho que sim porque quando eu era mais novo espirrava muito, meu nariz coçava e ficava saindo uma secreção clarinha.",
      "ANTECEDENTES FAMILIARES: Meu pai tem asma.",
      "DÚVIDAS DO PACIENTE: Não pode ser outra coisa, Dr(a)?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Ectoscopia de pele e mucosas", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese, perguntando sobre as características da queixa principal:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Localização;",
        "(3) Presença de lesões ou manchas ou secreção;",
        "(4) Fatores de piora/Agravantes;",
        "(5) Fatores de melhora/Atenuantes;",
        "(6) Contato com substâncias irritantes/alergênicas/trauma."
      ],
      scoring: {
        adequate: "Investiga cinco ou seis itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre manifestações clínicas associadas ao quadro:",
      subItems: [
        "(1) Presença de febre;",
        "(2) Xerose ou pele seca."
      ],
      scoring: {
        adequate: "Investiga os dois itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Rinite alérgica ou asma;",
        "(2) Uso de medicamentos;",
        "(3) Alergia medicamentosa;",
        "(4) Alergia a alimentos;",
        "(5) Vida sexual."
      ],
      scoring: {
        adequate: "Investiga de quatro itens ou mais.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga prejuízos na qualidade de vida perguntando sobre aspectos pessoais, sociais ou familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Pergunta por antecedentes familiares de asma ou rinite alérgica ou dermatite atópica.",
      subItems: [],
      scoring: {
        adequate: "Pergunta sobre alguma das doenças citadas.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita:",
      subItems: [
        "(1) Exame físico;",
        "(2) Ectoscopia de pele e mucosas ou solicita ver as lesões."
      ],
      scoring: {
        adequate: "Solicita os dois itens.",
        partial: "Solicita somente o item (2).",
        inadequate: "Não solicita o item (2) ou não solicita item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Formula a hipótese diagnóstica: Dermatite atópica.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 9,
      title: "9. Cita diagnósticos diferenciais:",
      subItems: [
        "(1) Dermatite de contato alérgica ou irritante;",
        "(2) Líquen simples crônico;",
        "(3) Psoríase;",
        "(4) Escabiose;",
        "(5) Dermatite numular;",
        "(6) Tinea corporis;",
        "(7) Urticária."
      ],
      scoring: {
        adequate: "Cita três diagnósticos diferenciais.",
        partial: "Cita dois diagnósticos diferenciais.",
        inadequate: "Cita um ou nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Prescreve tratamento não medicamentoso:",
      subItems: [
        "(1) Uso de emoliente/hidratante corporal;",
        "(2) Banhos com água morna ou evitar água muito quente;",
        "(3) Usar preferencialmente sabonete com pH fisiológico (levemente ácido);",
        "(4) Evitar o hábito de coçar;",
        "(5) Usar roupas macias (como de algodão) ou evitar roupas/acessórios de lã;",
        "(6) Lavar as roupas com sabão suave e/ou evitar amaciante/alvejante;",
        "(7) Oferece apoio psicológico."
      ],
      scoring: {
        adequate: "Realiza quatro condutas ou mais.",
        partial: "Realiza três condutas.",
        inadequate: "Realiza duas condutas ou menos."
      },
      scores: { min: 0, partial: 1, max: 1.75 }
    },
    {
      id: 11,
      title: "11. Prescreve tratamento com corticóide tópico.",
      subItems: [],
      scoring: {
        adequate: "Prescreve.",
        partial: "—",
        inadequate: "Não prescreve."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    }
  ],
  references: []
};

// Content for Anemia por Deficiência de Ferro (ID: 51, UID: 996)
export const anemiaDeficienciaFerroContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção primária à saúde",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é um médico atuando em uma unidade básica de saúde da família (UBSF) e atenderá uma paciente de 42 anos, com queixa de cansaço."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal da paciente;",
    "- Solicitar exame físico direcionado à queixa principal da paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Maria, 42 anos de idade, casada, empregada doméstica.",
      "MOTIVO DE CONSULTA: Queria tomar algum remédio pra aumentar as energias doutor(a), me sinto muito cansada desde que voltei a trabalhar como empregada doméstica. Além disso estou tendo dor de cabeça umas duas vezes por semana.",
      "TEMPO DE EVOLUÇÃO: Quatro meses.",
      "INTENSIDADE DOS SINTOMAS: Caminhar 20 minutos até a casa que eu trabalho já me dá falta de ar. E cuidar da casa é muito pesado, fico mais cansada ainda.",
      "CIGARRO: Dois maços por dia há 20 anos.",
      "ANTECEDENTES FAMILIARES: Meu pai morreu de câncer de cólon quando tinha 78 anos.",
      "APÓS O DIAGNÓSTICO QUESTIONAR: Por que isso acontece, doutor? É grave?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Esfregaço de sangue periférico", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Colonoscopia", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Endoscopia digestiva alta", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Sangue oculto em matéria fecal", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se; e,",
        "(2) Cumprimenta o paciente simulado e pergunta seu nome."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro clínico:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Intensidade dos sintomas;",
        "(3) Fatores de melhora e/ou piora;",
        "(4) Frequência ou momentos de aparição dos sintomas."
      ],
      scoring: {
        adequate: "Pergunta quatro itens.",
        partial: "Pergunta dois ou três itens.",
        inadequate: "Pergunta um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga presença de sintomas associados:",
      subItems: [
        "(1) Fragilidade/queda/quebra dos cabelos e/ou unhas;",
        "(2) Irritabilidade/Palpitações;",
        "(3) Pernas inquietas ou desejo imperioso de movê-las;",
        "(4) Astenia/Fraqueza/Cansaço;",
        "(5) Hematêmese/Vômito com sangue;",
        "(6) Melena/Fezes escuras;",
        "(7) Hematoquezia/Fezes com sangue."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.625, max: 1.25 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Cirurgias;",
        "(4) Álcool e/ou cigarro e/ou drogas ilícitas;",
        "(5) Alimentação/Dieta;",
        "(6) Atividade física."
      ],
      scoring: {
        adequate: "Pergunta cinco ou mais itens.",
        partial: "Pergunta três ou quatro itens.",
        inadequate: "Pergunta sobre dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes ginecológicos e obstétricos:",
      subItems: [
        "(1) Data de última menstruação;",
        "(2) Regularidade e/ou duração/volume do fluxo;",
        "(3) Gestações prévias."
      ],
      scoring: {
        adequate: "Investiga os três itens.",
        partial: "—",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 7,
      title: "7. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) Cinética do ferro (ou cita dois componentes da cinética do ferro);",
        "(3) Vitamina B12;",
        "(4) TSH;",
        "(5) Ureia;",
        "(6) Creatinina;",
        "(7) Reticulócitos;",
        "(8) PCR e/ou VHS."
      ],
      scoring: {
        adequate: "Solicita seis ou mais itens (obrigatoriamente deve incluir os itens um e dois).",
        partial: "Solicita de dois a cinco itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Solicita esfregaço de sangue periférico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Solicita endoscopia digestiva alta e colonoscopia.",
      subItems: [],
      scoring: {
        adequate: "Solicita endoscopia digestiva alta e colonoscopia.",
        partial: "Solicita apenas um dos exames de imagem.",
        inadequate: "Não solicita nenhum dos exames de imagem."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Verbaliza o diagnóstico de anemia ferropriva.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza anemia ferropriva/ferropênica ou anemia por deficiência de ferro.",
        partial: "Verbaliza apenas anemia.",
        inadequate: "Não verbaliza o diagnóstico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Explica que a provável causa da anemia é o sangramento do pólipo intestinal.",
      subItems: [],
      scoring: {
        adequate: "Explica relacionando a anemia ao sangramento do trato gastrointestinal ou do pólipo intestinal.",
        partial: "—",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 13,
      title: "13. Indica a necessidade de realização de: (1) polipectomia (2) com biópsia.",
      subItems: [],
      scoring: {
        adequate: "Indica ambos itens.",
        partial: "Indica somente a polipectomia.",
        inadequate: "Não indica nenhum dos dois itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 14,
      title: "14. Prescreve reposição de ferro com sulfato ferroso via oral.",
      subItems: [],
      scoring: {
        adequate: "Prescreve.",
        partial: "—",
        inadequate: "Não prescreve."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Olho Vermelho – Conjuntivite Bacteriana (ID: 374, UID: 1001)
export const olhoVermelhoConjuntiviteContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você está de plantão na UBS e recebe por demanda espontânea o paciente 30 anos de idade, com queixas oculares."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Citar ao menos 5 diagnósticos diferenciais;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcio, 30 anos, casado, educador físico.",
      "MOTIVO DE CONSULTA: Meu olho esquerdo está muito vermelho.",
      "TEMPO DE EVOLUÇÃO: Dois dias.",
      "FORMA DE INÍCIO: Começou a incomodar aos poucos e hoje está pior.",
      "PRESENÇA DE SECREÇÃO: Sim, tem muita secreção.",
      "COR/ASPECTO DA SECREÇÃO: A secreção é amarelada e pegajosa.",
      "LACRIMEJAMENTO: Um pouco, parece que o olho está irritado.",
      "COCEIRA/PRURIDO: Coça um pouquinho.",
      "FEBRE: Não.",
      "DOR: Não.",
      "SE INVESTIGADO A VIDA SEXUAL: Tenho relação somente com minha esposa."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame ocular", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro perguntando:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Forma de início."
      ],
      scoring: {
        adequate: "Investiga dois itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga sintomas associados:",
      subItems: [
        "(1) Presença de secreção;",
        "(2) Aspecto da secreção;",
        "(3) Prurido/coceira;",
        "(4) Febre;",
        "(5) Lacrimejamento;",
        "(6) Dor."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga:",
      subItems: [
        "(1) Contato com substâncias irritantes/alergênicas;",
        "(2) Trauma ocular."
      ],
      scoring: {
        adequate: "Investiga dois itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Alergia a medicamentos e/ou outras substâncias;",
        "(4) Vida sexual."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita:",
      subItems: [
        "(1) Exame físico geral;",
        "(2) Exame ocular ou inspeção do olho."
      ],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita somente o item 2.",
        inadequate: "Não solicita o item 2."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Descreve o achado da imagem:",
      subItems: [
        "(1) Hiperemia conjuntival;",
        "(2) Secreção purulenta/mucopurulenta;",
        "(3) Edema palpebral."
      ],
      scoring: {
        adequate: "Descreve três achados.",
        partial: "Descreve um ou dois achados.",
        inadequate: "Não descreve nenhum achado."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de conjuntivite bacteriana.",
      subItems: [],
      scoring: {
        adequate: "Cita conjuntivite e a etiologia bacteriana.",
        partial: "Cita apenas conjuntivite.",
        inadequate: "Não cita o diagnóstico de conjuntivite."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Cita diagnósticos diferenciais:",
      subItems: [
        "(1) Conjuntivite viral;",
        "(2) Conjuntivite alérgica;",
        "(3) Conjuntivite fúngica;",
        "(4) Conjuntivite parasitária;",
        "(5) Hemorragia subconjuntival;",
        "(6) Episclerite;",
        "(7) Glaucoma agudo;",
        "(8) Trauma ocular;",
        "(9) Ceratite;",
        "(10) Iridociclite;",
        "(11) Corpo estranho."
      ],
      scoring: {
        adequate: "Cita cinco ou mais diagnósticos diferenciais.",
        partial: "Cita três ou quatro diagnósticos diferenciais.",
        inadequate: "Cita dois ou menos diagnósticos diferenciais."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Indica medidas de controle de transmissão da infecção:",
      subItems: [
        "(1) Manter o olho limpo ou lavá-lo frequentemente;",
        "(2) Lavagem frequente das mãos;",
        "(3) Não compartilhar objetos como travesseiro ou toalhas de banho ou de rosto;",
        "(4) Evitar tocar o olho não afetado."
      ],
      scoring: {
        adequate: "Indica três ou quatro medidas.",
        partial: "Indica duas medidas.",
        inadequate: "Indica uma ou nenhuma medida."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Indica tratamento medicamentoso: colírio de tobramicina ou ofloxacina ou ciprofloxacina.",
      subItems: [],
      scoring: {
        adequate: "Cita alguma das opções.",
        partial: "—",
        inadequate: "Não cita."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    }
  ],
  references: []
};

// Content for AVC Isquêmico | INEP 2023.2 (ID: 5, UID: 1018)
export const avcIsquemicoInep2023v2Content: ChecklistContent = {
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
      "Você está de plantão no pronto-socorro de um hospital terciário e atenderá um homem de 55 anos de idade, tabagista e hipertenso, que vem da sua casa, onde aguardava transporte para hospital há 8 horas. Ele chega ao hospital através da urgência. Encontra-se acompanhado pela esposa que refere que ele está com a fala \"embolada\" e com \"perda de movimentos no braço esquerdo\".",
      "ATENÇÃO! CONSIDERE QUE O PACIENTE ESTÁ DEITADO NA MACA DURANTE TODA A CONSULTA. A ANAMNESE SERÁ DIRIGIDA À ACOMPANHANTE DO PACIENTE. CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!"
    ]
  },
  orientacoes: [
    "- Realizar anamnese do paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Solicitar e interpretar o(s) exame(s) complementares pertinente(s);",
    "- Estabelecer e comunicar hipótese diagnóstica;",
    "- Propor conduta para o paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "MOTIVO DE CONSULTA: Meu esposo, Roberto, perdeu o movimento do braço esquerdo e também está com a fala enrolada. A gente estava na chácara e eu liguei para um vizinho pedindo ajuda para levar ele até a UPA. Porém ficamos 12 horas esperando na UPA até eles transferirem o Roberto para esse hospital.",
      "TEMPO DE EVOLUÇÃO: Ele está assim desde ontem.",
      "OUTRAS PARTES AFETADAS: Somente o braço ele não consegue mexer e está com a fala enrolada. Ele está andando normalmente.",
      "DOENÇAS: Ele é diabético e hipertenso.",
      "MEDICAMENTOS: Metformina e enalapril.",
      "CIGARRO: Dez cigarros por dia.",
      "ANTECEDENTES FAMILIARES: O pai dele morreu de derrame cerebral.",
      "Se o candidato solicitar exames de laboratório, liberar os IMPRESSOS 2 e 3."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório 1/2", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório 2/2", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Tomografia de crânio", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta a acompanhante."
      ],
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
        "(2) Perda de força MSE (tempo OU se notou perda de força em membro inferior esquerdo (MIE) concomitante OU tremores OU dormência OU sensibilidade a dor no local OU alterações na coordenação motora);",
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
      title: "4. (1) Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico.",
        partial: "—",
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
        "(3) Creatinina e Ureia OU função renal;",
        "(4) Eletrólitos (Na, K);",
        "(5) Tempo de protrombina/RNI (ou INR);",
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
      title: "6. Solicita a tomografia computadorizada de crânio ou ressonância magnética de crânio.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Formula hipótese diagnóstica de acidente vascular cerebral (OU encefálico) isquêmico (AVCi, AVC isquêmico, AVE, AVEi).",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese OU formula hipótese de AVCh OU formula hipótese de derrame cerebral OU formula hipótese verbalizando apenas acidente vascular cerebral OU formula hipótese verbalizando acidente vascular cerebral hemorrágico."
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
        inadequate: "Orienta apenas uma conduta OU orienta conduta incorreta, diferente das listadas, OU não orienta conduta alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica específica:",
      subItems: [
        "Controle pressórico (redução parcimoniosa de PA: 10 a 25% em 24 horas OU < 220 X 120 mmHg) e trombectomia mecânica OU craniectomia descompressiva."
      ],
      scoring: {
        adequate: "Orienta.",
        partial: "—",
        inadequate: "Não orienta OU orienta redução drástica da PA OU orienta a administração de trombolítico."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    }
  ],
  references: []
};

// Content for Urticária Aguda | INEP 2023.2 (ID: 565, UID: 1019)
export const urticariaAgudaInep2023Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você está em uma UBS e atenderá um homem de 20 anos de idade, estudante universitário, que procura atendimento na UBS com queixa de \"coceira na pele\".",
      "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
    ]
  },
  orientacoes: [
    "- Realizar anamnese do paciente;",
    "- Solicitar exame físico com foco na queixa;",
    "- Estabelecer e comunicar hipótese diagnóstica;",
    "- Propor conduta para o paciente e fornecer orientações educacionais."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 20 anos de idade, solteiro, estudante universitário.",
      "MOTIVO DE CONSULTA: Estou com uma coceira insuportável no corpo inteiro.",
      "TEMPO DE EVOLUÇÃO: Quatro dias.",
      "ASPECTO DAS LESÕES: São umas manchas avermelhadas e elevadas.",
      "FATORES DE MELHORA: Tomei um remédio que tinha na minha casa e melhorou um pouco, mas depois as lesões voltam. Não lembro o nome do remédio.",
      "USO DE MEDICAMENTOS: Tive uma contusão no tornozelo há 1 semana e o ortopedista me passou nimesulida 2 vezes ao dia e dipirona para dor. A dipirona tomei poucas vezes, só nos primeiros dias após o trauma.",
      "EPISÓDIOS ANTERIORES: Quando eu era criança tive algumas manchas parecidas a essas depois que minha mãe me deu um remédio para gripe, mas não sei te dizer o nome.",
      "No decorrer do atendimento, caso o(a) participante fizesse a anamnese adequada, o paciente simulado perguntaria: Qual é o diagnóstico? Qual é o tratamento? É necessário realizar algum exame?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza ação alguma de apresentação."
      },
      scores: { min: 0, partial: 0.125, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre as manifestações e suas características:",
      subItems: [
        "(1) Início ou duração do prurido;",
        "(2) Lesões de pele/solicita ver a lesão."
      ],
      scoring: {
        adequate: "Investiga os dois itens.",
        partial: "Investiga apenas um item.",
        inadequate: "Não investiga item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre as manifestações associadas:",
      subItems: [
        "(1) Febre;",
        "(2) Linfadenopatias;",
        "(3) Tosse;",
        "(4) Dispneia;",
        "(5) Manifestações digestivas (OU náuseas OU vômitos OU diarreia)."
      ],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga apenas um item OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.625, max: 1.25 }
    },
    {
      id: 4,
      title: "4. Pergunta sobre desencadeantes e agravantes:",
      subItems: [
        "(1) Uso de medicamentos;",
        "(2) Alimentos;",
        "(3) Produtos de higiene/limpeza/cosméticos;",
        "(4) Picadas/ferroadas de insetos/plantas;",
        "(5) Contatos com novas substâncias/joias;",
        "(6) Contatos com animais (pelo de gato e/ou de cão);",
        "(7) Estímulos físicos (frio e/ou calor)."
      ],
      scoring: {
        adequate: "Investiga quatro ou mais fatores.",
        partial: "Investiga dois ou três fatores.",
        inadequate: "Investiga apenas um fator OU não investiga fator algum."
      },
      scores: { min: 0, partial: 0.875, max: 1.75 }
    },
    {
      id: 5,
      title: "5. Pergunta sobre antecedentes pessoais:",
      subItems: [
        "(1) Doenças prévias (autoimunes; alérgicas; infecciosas);",
        "(2) Uso de drogas lícitas ou ilícitas."
      ],
      scoring: {
        adequate: "Pergunta os dois itens.",
        partial: "Pergunta apenas um item.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Formula hipótese diagnóstica da lesão de pele.",
      subItems: [],
      scoring: {
        adequate: "Formula uma das hipóteses: (1) Urticária aguda relacionada ao uso de medicamentos (AINEs e analgésico); OU (2) Urticária relacionada ao uso de medicamentos; OU (3) Farmacodermia; OU (4) Dermatite alérgica medicamentosa; OU (5) Dermatite alérgica induzida por medicamento.",
        partial: "Formula uma das hipóteses: (1) \"Reação alérgica\" relacionada ao uso de medicamentos; OU (2) Alergia relacionada ao uso de medicamentos; OU (3) Urticária.",
        inadequate: "Não verbaliza o diagnóstico correto OU verbaliza de forma inespecífica: \"reação alérgica\" ou alergia, sem especificar o uso de medicamentos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 7,
      title: "7. Conduta médica relacionada a farmacodermia.",
      subItems: [
        "(1) Suspende o uso das medicações (AINE e analgésico);",
        "(2) Prescreve anti-histamínico oral (associado ou não a um corticoide oral)."
      ],
      scoring: {
        adequate: "Indica as duas condutas.",
        partial: "Indica apenas uma das duas condutas.",
        inadequate: "Não indica qualquer uma das duas condutas OU indica outros grupos de medicamentos (incluindo corticoide isolado)."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 8,
      title: "8. Recomenda.",
      subItems: [
        "(1) Retorno se houver persistência ou piora dos sintomas;",
        "(2) Evitar uso futuro de dipirona e AINEs."
      ],
      scoring: {
        adequate: "Recomenda os dois itens.",
        partial: "Recomenda só um item.",
        inadequate: "Não recomenda item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Lavagem De Ouvido (ID: 335, UID: 1037)
export const lavagemOuvidoContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção primária à saúde",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios;",
      "- Sala de procedimentos;",
      "- Exame Audimétrico."
    ],
    descricao: [
      "Você realizará o atendimento de Larissa, 25 anos de idade, estudante, sem antecedentes patológicos que consulta queixando-se de audição diminuída no ouvido direito."
    ]
  },
  orientacoes: [
    "- Solicitar exame físico direcionado à queixa da paciente;",
    "- Adotar conduta terapeutica pertinente ao caso e verbalizar realização do procedimento necessário;",
    "- Citar ao menos quatro contraindicações para realização do procedimento;",
    "- Verbalizar possíveis complicações do procedimento.",
    "Atenção! A paciente simulada não deverá ser tocada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o(a) ENFERMEIRO(A) e PACIENTE que auxiliará e responderá as perguntas do(a) médico(a) de acordo ao roteiro.",
      "DADOS PESSOAIS: Larissa, 25 anos de idade, estudante.",
      "MOTIVO DE CONSULTA: Dr(a), eu venho porque sinto que não ouço direito com o ouvido direito e tenho a sensação de que está tapado.",
      "SE O CANDIDATO REALIZAR QUALQUER PERGUNTA AO PACIENTE REFERENTE À ANAMNESE: Não consta no script.",
      "QUANDO O CANDIDATO ESTIVER EXPLICANDO SOBRE O PROCEDIMENTO, REALIZAR AS SEGUINTES PERGUNTAS: Vai doer doutor(a)? A lavagem de ouvido pode gerar alguma complicação?",
      "QUANDO O CANDIDATO SOLICITAR OS MATERIAIS, RESPONDER: Considere disponível."
    ]
  },
  impressos: [
    { id: 1, title: "Otoscopia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Cita contraindicações para a remoção do cerume por meio do método de irrigação com solução salina:",
      subItems: [
        "(1) História de perfuração do tímpano;",
        "(2) Otite aguda;",
        "(3) História de cirurgia otológica;",
        "(4) Paciente não cooperativo."
      ],
      scoring: {
        adequate: "Cita as quatro contraindicações.",
        partial: "Cita duas ou três contraindicações.",
        inadequate: "Cita uma ou nenhuma contraindicação."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Indica a realização da lavagem de ouvido.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Explica à paciente com linguagem acessível sobre os seguintes aspectos:",
      subItems: [
        "(1) Como será realizado o procedimento;",
        "(2) Que o procedimento não deve ocasionar dor OU que pode ocasionar apenas um incômodo;",
        "(3) Que, apesar de raro, pode haver complicações devido ao procedimento."
      ],
      scoring: {
        adequate: "Explica sobre os três aspectos.",
        partial: "Explica sobre dois aspectos.",
        inadequate: "Explica sobre um ou nenhum aspecto."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Solicita os materiais para a realização do procedimento:",
      subItems: [
        "(1) Campo ou toalha limpa ou compressa;",
        "(2) Otoscópio;",
        "(3) Seringa de 20 ml ou maior;",
        "(4) Cuba redonda;",
        "(5) Cuba rim;",
        "(6) Luvas de procedimento;",
        "(7) Tesoura;",
        "(8) Cateter agulhado (scalp borboleta);",
        "(9) Solução salina 0,9% aquecida."
      ],
      scoring: {
        adequate: "Solicita todos os itens.",
        partial: "Solicita seis a oito itens.",
        inadequate: "Solicita cinco itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 6,
      title: "6. Verbaliza os passos da remoção do tampão de cerume:",
      subItems: [
        "(1) Posição do paciente: sentado com a cabeça reta;",
        "(2) Cortar o scalp para que o tubo fique com aproximadamente 4 cm e o acopla a uma seringa;",
        "(3) Higienizar as mãos e coloca as luvas de procedimento;",
        "(4) Coloca a solução aquecida na cuba redonda (ou verbaliza que vai aspirar diretamente do frasco);",
        "(5) Posicionar o campo, toalha ou compressas no ombro do paciente;",
        "(6) Posicionar a cuba rim junto à cabeça/pescoço do paciente, logo abaixo da orelha;",
        "(7) Tracionar o pavilhão auricular para trás e para cima e instila sob pressão a solução salina no conduto auditivo externo."
      ],
      scoring: {
        adequate: "Verbaliza seis ou sete itens.",
        partial: "Verbaliza quatro ou cinco itens.",
        inadequate: "Verbaliza três ou menos itens."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 7,
      title: "7. Realiza nova otoscopia após o procedimento.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Verbaliza complicações do procedimento:",
      subItems: [
        "(1) Dor;",
        "(2) Lesão de pele no conduto auditivo;",
        "(3) Otite externa;",
        "(4) Perfuração timpânica;",
        "(5) Vertigem."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou cinco complicações.",
        partial: "Verbaliza três ou duas complicações.",
        inadequate: "Verbaliza uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Osteoporose (ID: 375, UID: 1043)
export const osteoporoseContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você recebe para atendimento uma mulher de 71 anos de idade com consulta agendada que recentemente se mudou ao bairro e realizará a sua primeira consulta na unidade que você trabalha."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese;",
    "- Solicitar e interpretar os exames trazidos pela paciente;",
    "- Propor um projeto terapêutico singular adequado ao caso."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Valentina, 71 anos de idade, viúva, aposentada.",
      "MOTIVO DE CONSULTA: Oi doutor(a), acabei de me mudar para esse bairro e não levei os resultados de uns exames que fiz no mês passado para o médico do outro centro de saúde. Queria continuar meus atendimentos aqui com vocês.",
      "SE INVESTIGADO O MOTIVO DA SOLICITAÇÃO DOS EXAMES: São exames de rotina doutor(a).",
      "SE PERGUNTADO POR SINTOMAS ATUAIS: Negar todos.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Nega. Cirurgia: Fiz uma cirurgia no braço há 2 anos. Quedas e/ou fraturas: Já quebrei o úmero quando tropecei e caí há 2 anos.",
      "HÁBITOS: Cigarro: Um maço por dia. Álcool: Nega. Drogas: Nega. Alimentação: Gosto muito de comer pães e bolos com café. Às vezes não almoço e quase não como verduras e frutas. Atividade física: Nega. Urina e fezes: Nega alterações. Sono: Durmo bem e acordo descansada.",
      "ANTECEDENTES FAMILIARES: Meu pai era diabético e minha mãe tinha hipotiroidismo.",
      "Quando o candidato solicitar os exames trazidos pela paciente: Liberar os IMPRESSOS 2 e 3."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Laboratório geral", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Densitometria óssea", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta a paciente simulada;",
        "(3) Dá boas vindas à paciente ou demonstra com palavras atitude acolhedora."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.2, max: 0.5 }
    },
    {
      id: 2,
      title: "2. (1) Investiga sinais e sintomas e (2) pergunta o motivo da solicitação dos exames pelo outro médico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza apenas uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Alergias;",
        "(4) Cirurgias;",
        "(5) Quedas e/ou fraturas."
      ],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Investiga hábitos de vida:",
      subItems: [
        "(1) Tabagismo;",
        "(2) Alcoolismo;",
        "(3) Atividade física;",
        "(4) Alimentação;",
        "(5) Qualidade do sono."
      ],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. (1) Solicita exame físico geral e (2) identifica baixo IMC (índice de massa corporal) OU idoso com baixo peso.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e identifica idoso com baixo peso ou IMC baixo.",
        partial: "Solicita exame físico mas não identifica a alteração.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Identifica no laboratório trazido pela paciente:",
      subItems: [
        "(1) Hipocalcemia;",
        "(2) Colesterol HDL baixo;",
        "(3) Vitamina D baixa;",
        "(4) Paratormônio elevado."
      ],
      scoring: {
        adequate: "Identifica quatro itens.",
        partial: "Identifica três itens.",
        inadequate: "Identifica dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Identifica quadro de osteoporose na densitometria óssea.",
      subItems: [],
      scoring: {
        adequate: "Identifica.",
        partial: "—",
        inadequate: "Não identifica."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Cita tratamento medicamentoso:",
      subItems: [
        "(1) Bifosfonatos (ou cita algum medicamento da classe dos bifosfonatos);",
        "(2) Suplemento de vitamina D;",
        "(3) Suplemento de cálcio."
      ],
      scoring: {
        adequate: "Cita três itens.",
        partial: "Cita apenas bifosfonatos OU bifosfonatos e mais um item.",
        inadequate: "Não cita bifosfonatos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 10,
      title: "10. Cita medidas não farmacológicas:",
      subItems: [
        "(1) Atividade física regular;",
        "(2) Prevenção de quedas;",
        "(3) Oferece apoio para cesse do tabagismo;",
        "(4) Dieta adequada ou consulta com nutricionista;",
        "(5) Exposição solar adequada;",
        "(6) Indica necessidade de acompanhamento e/ou tratamento interdisciplinar."
      ],
      scoring: {
        adequate: "Cita cinco ou mais medidas não farmacológicas.",
        partial: "Cita quatro medidas.",
        inadequate: "Cita três ou menos medidas."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Paralisia Facial Periférica (ID: 389, UID: 1049)
export const paralisisFacialPerifericaContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Unidade de Pronto atendimento (UPA)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Exames de imagem básicos (raio-x e tomografia conforme disponibilidade);",
      "- Sala de emergência."
    ],
    descricao: [
      "Você atende um paciente masculino de 45 anos, trazido por familiares. O paciente refere perceber que sua boca está torta e está muito preocupado, pois seu irmão, de 59 anos, teve um AVC há 2 anos."
    ]
  },
  orientacoes: [
    "- Realizar anamnese completa;",
    "- Solicitar exame físico detalhado;",
    "- Solicitar exames complementares adequados;",
    "- Estabelecer hipótese diagnóstica;",
    "- Citar ao menos 3 etiologias para esse diagnóstico;",
    "- Verbalizar diagnósticos diferenciais;",
    "- Definir conduta terapêutica;",
    "- Responder às dúvidas do paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 45 anos de idade, carpinteiro.",
      "MOTIVO DE CONSULTA: Doutor(a), acho que tive um AVC. Acordei hoje de manhã com a boca torta.",
      "CARACTERÍSTICAS DO QUADRO: Início dos sintomas: Acordei assim, já faz umas 8 horas. Parestesia/formigamento/anestesia na face: Sim, do lado esquerdo não sinto bem. Qualquer outro sintoma perguntado: Não consta no script.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Cirurgias: Nega. Cartão de vacina: Atualizado. Viagens recentes: Nega. História de trauma de crânio ou face: Nega.",
      "HÁBITOS: Cigarro: Um maço por dia. Álcool: Cachaça e cerveja. Drogas: Nega. Fezes, urina: Nega alterações. Atividade física: Faço caminhada 3 vezes por semana. Alimentação: Variada. Peso corporal: Nega alterações.",
      "ANTECEDENTES FAMILIARES: Meu irmão teve AVC há 2 anos."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Otoscopia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Acolhimento:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou nenhuma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro perguntando:",
      subItems: [
        "(1) Início dos sintomas;",
        "(2) Alteração de sensibilidade na face;",
        "(3) Otalgia e/ou hipoacusia;",
        "(4) Vertigem;",
        "(5) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga de quatro a cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas:",
      subItems: [
        "(1) Perda de força muscular de membros superiores e/ou inferiores;",
        "(2) Desmaio ou queda ou convulsão;",
        "(3) Alteração auditiva;",
        "(4) Perda de equilíbrio;",
        "(5) História de trauma de crânio e/ou face;",
        "(6) Febre;",
        "(7) Perda de peso não intencional."
      ],
      scoring: {
        adequate: "Investiga de cinco a sete itens.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Cirurgias;",
        "(4) Alergias;",
        "(5) Cartão de vacinas."
      ],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita:",
      subItems: [
        "(1) Exame físico geral;",
        "(2) Exame neurológico;",
        "(3) Otoscopia."
      ],
      scoring: {
        adequate: "Solicita três itens.",
        partial: "Solicita dois itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Interpreta a imagem do exame físico:",
      subItems: [
        "(1) Incapacidade de levantar a sobrancelha esquerda ou franzir o lado esquerdo da testa;",
        "(2) Incapacidade de fechar completamente o olho esquerdo;",
        "(3) Deslocamento do globo ocular ou sinal de Bell;",
        "(4) Desvio da boca para a direita devido à paralisia do lado esquerdo."
      ],
      scoring: {
        adequate: "Interpreta de três a quatro achados.",
        partial: "Interpreta dois achados.",
        inadequate: "Interpreta um ou nenhum achado."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de Paralisia Facial Periférica ou Paralisia de Bell.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Cita etiologias para o diagnóstico:",
      subItems: [
        "(1) Infecções;",
        "(2) Trauma de crânio e/ou face;",
        "(3) Neoplasias;",
        "(4) Diabetes;",
        "(5) Amiloidose;",
        "(6) Lesão do nervo facial devido a procedimento cirúrgico;",
        "(7) Doença autoimune."
      ],
      scoring: {
        adequate: "Cita quatro etiologias.",
        partial: "Cita de duas a três etiologias.",
        inadequate: "Cita apenas uma ou nenhuma etiologia."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Corticoide via oral;",
        "(2) Colírio lubrificante;",
        "(3) Curativo oclusivo do olho durante o sono;",
        "(4) Fisioterapia."
      ],
      scoring: {
        adequate: "Indica de três a quatro ações.",
        partial: "Indica duas ações.",
        inadequate: "Indica uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Incontinência Urinária De Esforço (novo ID: 1055, UID: 1055)
export const incontinenciaUrinariaEsforcoContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção primária à saúde",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Sala de atenção médica;",
      "- Sala de medicação;",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você atenderá uma paciente de 57 anos de idade, com consulta agendada devido a queixas urinárias."
    ]
  },
  orientacoes: [
    "- Realizar anamnese dirigida à queixa principal da paciente;",
    "- Solicitar, descrever e interpretar o exame físico;",
    "- Estabelecer e comunicar a hipótese diagnóstica;",
    "- Solicitar exames complementares, se necessário, descrevendo os achados;",
    "- Propor conduta terapêutica e seguimento da paciente;",
    "- Dar orientações à paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Joana, 57 anos de idade, casada, comerciante.",
      "MOTIVO DE CONSULTA: Doutor(a), já faz uns 4 meses que estou perdendo urina. Não consigo controlar e acabo fazendo xixi na roupa.",
      "CARACTERÍSTICAS DO QUADRO: Frequência dos episódios: Várias vezes ao dia. Quantidade: Não é muito mas mesmo assim me incomoda. Quase sempre tenho que usar absorvente. Fatores desencadeantes: Já percebi que quando me levanto da cama, abaixo para pegar alguma coisa ou estou limpando a casa perco um pouco de urina. Também estou com uma tosse seca já faz vários meses e toda vez que tusso perco urina. Urgência/necessidade imperiosa para urinar: Não. Episódios durante o sono: Não.",
      "ANTECEDENTES PESSOAIS: Doenças: Descobri que tenho pressão alta há 6 meses. Medicamentos: Enalapril. Alergias: Que eu saiba não. Gestações, partos e abortos: Tenho 4 filhos. 2 por cesárea e 2 partos normais. Cirurgias: Somente as cesáreas. Data da última menstruação: Há 7 anos.",
      "HÁBITOS: Álcool: Nega. Cigarro: Nega. Drogas: Nega. Alimentação: Variada. Hábito intestinal: Meu intestino funciona bem.",
      "ANTECEDENTES FAMILIARES: Nega doenças."
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico Geral", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Laboratório de Urina", isOpen: false, color: "bg-primary" },
    { id: 3, title: "USG Pélvico e de Vias Urinárias", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Exame Físico Ginecológico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Apresenta-se adequadamente;",
        "(2) Cumprimenta e identifica a paciente simulada, falando seu nome."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro perguntando:",
      subItems: [
        "(1) Frequência dos episódios;",
        "(2) Volume das perdas;",
        "(3) Fatores desencadeantes;",
        "(4) Necessidade imperiosa de urinar ou urgência miccional;",
        "(5) Episódios noturnos."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre sintomas associados:",
      subItems: [
        "(1) Febre;",
        "(2) Disúria;",
        "(3) Poliúria;",
        "(4) Polaciúria;",
        "(5) Dor abdominal;",
        "(6) Constipação intestinal."
      ],
      scoring: {
        adequate: "Investiga de quatro a seis itens.",
        partial: "Investiga ao menos três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Cirurgias;",
        "(4) Gestações ou partos ou cesáreas;",
        "(5) Data da última menstruação."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 5,
      title: "5. Investigou antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico:",
      subItems: [
        "(1) Exame físico geral;",
        "(2) Exame físico ginecológico;",
        "(3) Manobras de esforço (tossir, espirrar, levantar peso) para observação da perda."
      ],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita somente dois itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita análise de urina.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita ecografia pélvica e/ou do trato urinário.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Formula o diagnóstico de incontinência urinária de esforço.",
      subItems: [],
      scoring: {
        adequate: "Formula corretamente o diagnóstico.",
        partial: "Formula somente o diagnóstico de incontinência urinária.",
        inadequate: "Não formula nenhum diagnóstico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Indica, em um primeiro momento, tratamento conservador:",
      subItems: [
        "(1) Diminuir o peso corporal;",
        "(2) Substituição do enalapril por outro anti-hipertensivo;",
        "(3) Exercícios de fortalecimento do assoalho pélvico;",
        "(4) Dieta balanceada;",
        "(5) Atividade física regular."
      ],
      scoring: {
        adequate: "Indica quatro ou cinco itens.",
        partial: "Indica três itens.",
        inadequate: "Indica dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Encaminha a paciente para acompanhamento com o serviço de Ginecologia ou Uroginecologia.",
      subItems: [],
      scoring: {
        adequate: "Indica o encaminhamento.",
        partial: "—",
        inadequate: "Não indica o encaminhamento."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Punção Lombar (ID: 440, UID: 1058)
export const puncaoLombarContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção terciária à saúde",
    tipo: "Urgência e emergência",
    situacao: [],
    descricao: [
      "Você é o médico de plantão e acaba de realizar a história clínica de um paciente masculino de 22 anos de idade que apresenta sinais e sintomas sugestivos de meningite de vários dias de evolução."
    ]
  },
  orientacoes: [
    "- Verbalizar ao menos três contraindicações (absolutas ou relativas) para a realização de punção lombar;",
    "- Verbalizar ao menos duas indicações para realizar tomografia de crânio antes da punção lombar;",
    "- Solicitar os materiais necessários e verbalizar o procedimento de punção lombar;",
    "- Interpretar o resultado de análise do líquido cefalorraquidiano e verbalizar etiologia mais provável;",
    "- Informar ao menos três possíveis complicações do procedimento."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Gabriel, 22 anos de idade, estudante de direito.",
      "SE O CANDIDATO TENTAR SE COMUNICAR COM O PACIENTE OU REALIZAR QUALQUER OUTRA PERGUNTA, RESPONDER: Não consta no script.",
      "QUANDO O CANDIDATO TERMINAR DE VERBALIZAR AS TAREFAS 1 E 2, PERGUNTAR: O que você vai precisar para realizar a punção lombar? Como será feito o procedimento?",
      "QUANDO SOLICITAR OS MATERIAIS, RESPONDER: Considere disponível.",
      "QUANDO O CANDIDATO TERMINAR DE EXPLICAR O PROCEDIMENTO OU SOLICITAR A ANÁLISE DO LÍQUIDO CEFALORRAQUIDIANO LIBERAR O IMPRESSO: RESULTADO DA ANÁLISE DO LÍQUOR."
    ]
  },
  impressos: [
    { id: 1, title: "Resultado da Análise do Líquor", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se;",
        "(2) Cumprimenta o paciente simulado e pergunta seu nome."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Solicita a autorização do paciente para a realização da punção lombar.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Verbaliza contraindicações para a realização da punção lombar:",
      subItems: [
        "(1) Infecção no local de punção;",
        "(2) Sinais de hipertensão intracraniana;",
        "(3) Plaquetopenia;",
        "(4) Coagulopatia (INR > 1,5);",
        "(5) Lesões neurológicas com efeito de massa."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou cinco contraindicações.",
        partial: "Verbaliza três ou duas contraindicações.",
        inadequate: "Verbaliza uma ou nenhuma contraindicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Verbaliza situações nas quais é necessário realizar tomografia de crânio antes da punção lombar:",
      subItems: [
        "(1) Imunodepressão;",
        "(2) Edema de papila;",
        "(3) Foco neurológico;",
        "(4) Rebaixamento do nível de consciência;",
        "(5) Histórico recente de convulsão."
      ],
      scoring: {
        adequate: "Verbaliza ao menos dois itens.",
        partial: "Verbaliza um item.",
        inadequate: "Não verbaliza nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita materiais para o procedimento:",
      subItems: [
        "(1) Equipamentos de proteção individual;",
        "(2) Campo cirúrgico;",
        "(3) Gazes;",
        "(4) Agulha para punção;",
        "(5) Anestésico local;",
        "(6) Clorexidina degermante ou iodo;",
        "(7) Tubo para coleta do líquido;",
        "(8) Termo de consentimento livre e esclarecido."
      ],
      scoring: {
        adequate: "Solicita de seis a oito itens da lista.",
        partial: "Solicita de quatro a cinco itens.",
        inadequate: "Solicita três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Verbaliza os passos para a realização da punção lombar:",
      subItems: [
        "(1) Posicionamento do paciente em decúbito lateral com posição fetal OU sentado com flexão de tronco;",
        "(2) Antissepsia no local da punção;",
        "(3) Colocação de campo cirúrgico;",
        "(4) Anestesia local;",
        "(5) Punção entre os espaços L3-L4 OU L4-L5;",
        "(6) Retirada de líquido cefalorraquidiano;",
        "(7) Curativo local."
      ],
      scoring: {
        adequate: "Verbaliza seis ou sete itens.",
        partial: "Verbaliza quatro ou cinco itens.",
        inadequate: "Verbaliza três ou menos itens."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 7,
      title: "7. Indica, com base na análise do LCR, a hipótese de meningite tuberculosa.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Cita as possíveis complicações do procedimento:",
      subItems: [
        "(1) Cefaleia;",
        "(2) Dor lombar;",
        "(3) Herniação cerebral;",
        "(4) Hematoma;",
        "(5) Infecção do sítio de punção."
      ],
      scoring: {
        adequate: "Cita quatro ou cinco complicações.",
        partial: "Cita três ou duas complicações.",
        inadequate: "Cita uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    }
  ],
  references: []
};

// Content for Suporte Avançado De Vida – Assistolia (ID: 475, UID: 1059)
export const suporteAvancadoAssistoliaContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Sala vermelha - Unidade de pronto atendimento",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Sala de emergências;",
      "- Laboratório de análises clínicas e banco de sangue;",
      "- Tomografia computadorizada;",
      "- Serviços de transfusão de sangue."
    ],
    descricao: [
      "Você recebe um paciente masculino de 62 anos, obeso, sedentário, diabético e hipertenso mal controlado há 15 anos. Os familiares relatam que o paciente queixava-se de dor intensa no peito com irradiação para o braço esquerdo há 40 minutos e episódio de desmaio há 10 minutos. O paciente permanece inconsciente e foi trazido de carro ao pronto-socorro. O paciente já se encontra na sala vermelha."
    ]
  },
  orientacoes: [
    "- Realizar o atendimento do paciente (nesse momento você conta com a ajuda de um enfermeiro);",
    "- Perguntar ou solicitar ao enfermeiro tudo que for necessário para o atendimento;",
    "- Verbalizar todos os passos do atendimento;",
    "- Responder as perguntas realizadas pelo enfermeiro."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o enfermeiro que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.",
      "SE PERGUNTADO SE O PACIENTE RESPONDE A ESTÍMULOS: Paciente não responde.",
      "SE PERGUNTADO SE O PACIENTE TEM PULSO E RESPIRA: Não tem pulso e não respira.",
      "SE SOLICITADA A AJUDA DA EQUIPE: Considere que a equipe já está aqui.",
      "SE SOLICITADO DESFIBRILADOR: Já vou preparar o desfibrilador, te aviso quando estiver pronto.",
      "SE SOLICITADO VER O RITMO DO PACIENTE: Liberar o IMPRESSO 1.",
      "CASO O CANDIDATO PEÇA PARA VERIFICAR A CONEXÃO DOS ELETRODOS OU AUMENTAR O GANHO DO MONITOR CARDÍACO: Verificado doutor(a), o ritmo realmente é esse!",
      "SE SOLICITADO ACESSO VENOSO PERIFÉRICO E ADMINISTRAÇÃO DE ADRENALINA: Realizado!",
      "DEPOIS QUE O CANDIDATO VERBALIZAR A CONTINUAÇÃO DAS COMPRESSÕES: Já se passaram 2 minutos de RCP doutor(a). Esse é o novo ritmo do paciente (libere o IMPRESSO 2).",
      "DEPOIS QUE O CANDIDATO VERBALIZAR A CONTINUAÇÃO DA RCP, PERGUNTAR: O que pode ter causado a parada cardiorrespiratória nesse paciente? Poderia me dizer 4 causas?",
      "QUANDO O CANDIDATO DISSER AS CAUSAS: Ok doutor(a), já se passaram 2 minutos de RCP. Esse é o novo ritmo (libere o IMPRESSO 3).",
      "CASO O CANDIDATO PERGUNTE SE TEM PULSO: Sim, doutor(a)! O paciente tem pulso e respira!",
      "SE SOLICITADO ELETROCARDIOGRAMA DE 12 DERIVAÇÕES: Libere o IMPRESSO 4."
    ]
  },
  impressos: [
    { id: 1, title: "Ritmo cardíaco 1", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Ritmo cardíaco 2", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Ritmo cardíaco 3", isOpen: false, color: "bg-primary" },
    { id: 4, title: "ECG de 12 derivações", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Comprova se o paciente responde:",
      subItems: [
        "(1) Chama o paciente em voz alta;",
        "(2) Realiza estímulo tátil."
      ],
      scoring: {
        adequate: "Verbaliza as duas ações.",
        partial: "Verbaliza apenas uma ação.",
        inadequate: "Não verbaliza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 2,
      title: "2. Verifica ou pergunta se o paciente:",
      subItems: [
        "(1) Tem pulso;",
        "(2) Se respira."
      ],
      scoring: {
        adequate: "Realiza as duas perguntas.",
        partial: "Realiza apenas uma pergunta.",
        inadequate: "Não realiza nenhuma pergunta."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Verbaliza que iniciará as compressões torácicas associadas à ventilação até a preparação do desfibrilador/monitor.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza início das compressões e ventilações.",
        partial: "Verbaliza apenas compressões torácicas.",
        inadequate: "Não verbaliza compressões torácicas ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Ao solicitar o ritmo o candidato:",
      subItems: [
        "(1) Interpreta o ritmo do IMPRESSO 1 como Assistolia;",
        "(2) Indica o protocolo para confirmar o traçado: checar se os cabos estão conectados e/ou aumentar ganhos no monitor e/ou verificar outras derivações."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 5,
      title: "5. Após identificar o IMPRESSO 1 e realizar o protocolo da linha reta, indica:",
      subItems: [
        "(1) Retorno das compressões torácicas;",
        "(2) Acesso venoso periférico;",
        "(3) Adrenalina 1 mg (validar esse item se indicado o nome da droga e a dose)."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Após ver o IMPRESSO 2, realiza as seguintes tarefas:",
      subItems: [
        "(1) Continua as compressões torácicas;",
        "(2) Ao ser questionado pelo enfermeiro, indica quatro das seguintes causas de PCR: Hipovolemia, hipóxia, acidose, hipoglicemia, hipo/hiperpotassemia, hipotermia, pneumotórax hipertensivo, tamponamento cardíaco, intoxicação, trombose pulmonar, trombose coronária (IAM)."
      ],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza a tarefa (2) e indica ao menos quatro causas.",
        inadequate: "Não realiza a tarefa um ou cita apenas duas causa de PCR."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Após ver o IMPRESSO 3, pergunta ou verifica se o paciente tem pulso.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita ECG de 12 derivações.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de infarto agudo do miocárdio.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Indica cuidados pós parada cardiorrespiratória e/ou ativa o serviço de hemodinâmica (ou indica angioplastia coronária, cateterismo cardíaco ou reperfusão coronária).",
      subItems: [],
      scoring: {
        adequate: "Realiza a tarefa.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Suporte Avançado De Vida – Fibrilação Ventricular (ID: 476, UID: 1062)
export const suporteAvancadoFVContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Emergencial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Sala de emergência;",
      "- Laboratório de análises clínicas;",
      "- Exames de imagem;",
      "- Serviços de suporte avançado."
    ],
    descricao: [
      "Você está de plantão e é chamado para avaliar um paciente que está deitado na maca referindo intenso mal-estar e tontura. O paciente, Joaquim, 52 anos, obeso e tabagista, relata ser hipertenso e diabético há 20 anos. Durante o interrogatório, Joaquim apresenta confusão ao responder, fica pálido, sudoreico e evolui com episódio de perda de consciência sem recuperação."
    ]
  },
  orientacoes: [
    "- Atendimento do paciente (nesse momento, você está com um enfermeiro ao lado do paciente);",
    "- Solicitar e perguntar ao enfermeiro tudo que for necessário para a assistência do paciente, verbalizando todos os passos do atendimento."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o enfermeiro que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.",
      "SE O CANDIDATO SE APRESENTAR OU SE COMUNICAR COM O PACIENTE, RESPONDER: Doutor(a), o paciente está desmaiado! Vamos atender ele!",
      "SE PERGUNTADO SE O PACIENTE RESPONDE A ESTÍMULOS: Paciente não responde.",
      "SE PERGUNTADO SE O PACIENTE TEM PULSO E RESPIRA: Não tem pulso e não respira.",
      "SE SOLICITADA A AJUDA DA EQUIPE: Considere que a equipe já está aqui.",
      "SE SOLICITADO DESFIBRILADOR: Já vou preparar o desfibrilador, te aviso quando estiver pronto.",
      "SE SOLICITADO VER O RITMO DO PACIENTE: Liberar o IMPRESSO 1.",
      "CASO O CANDIDATO INDIQUE A DESFIBRILAÇÃO: Choque realizado!",
      "SE APÓS O CHOQUE O CANDIDATO VERBALIZAR A CONTINUAÇÃO DAS COMPRESSÕES E SOLICITAR UM ACESSO VENOSO: Considere o paciente com acesso venoso.",
      "EM SEGUIDA: Já se passaram 2 minutos de RCP doutor(a), esse é o novo ritmo do paciente (libere o IMPRESSO 2).",
      "SE SOLICITADA UMA NOVA DESFIBRILAÇÃO: Choque realizado!",
      "SE O CANDIDATO RETOMAR AS COMPRESSÕES E SOLICITAR ADMINISTRAÇÃO DE ADRENALINA: A adrenalina foi administrada.",
      "DEPOIS QUE O CANDIDATO VERBALIZAR A CONTINUAÇÃO DA RCP: Já se passaram 2 minutos doutor(a), o novo ritmo do paciente é esse (libere o IMPRESSO 3).",
      "SE A DESFIBRILAÇÃO FOR SOLICITADA: Choque realizado!",
      "Nesse momento o candidato deveria retomar as compressões e solicitar administração de amiodarona: Responda que a amiodarona foi administrada.",
      "EM SEGUIDA: 2 minutos de RCP doutor(a), esse é o novo ritmo (libere o IMPRESSO 4).",
      "CASO O CANDIDATO PERGUNTE SE TEM PULSO: Sim, doutor(a)! O paciente tem pulso e respira!"
    ]
  },
  impressos: [
    { id: 1, title: "Ritmo cardíaco 1", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Ritmo cardíaco 2", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Ritmo cardíaco 3", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Ritmo cardíaco 4", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Comprova se o paciente responde:",
      subItems: [
        "(1) Chama o paciente em voz alta;",
        "(2) Realiza estímulo tátil."
      ],
      scoring: {
        adequate: "Verbaliza as duas ações.",
        partial: "Verbaliza apenas uma ação.",
        inadequate: "Não verbaliza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Verifica ou pergunta se o paciente:",
      subItems: [
        "(1) Tem pulso;",
        "(2) Se respira."
      ],
      scoring: {
        adequate: "Realiza as duas perguntas.",
        partial: "Realiza apenas uma pergunta.",
        inadequate: "Não realiza nenhuma pergunta."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Solicita:",
      subItems: [
        "(1) Ajuda;",
        "(2) Desfibrilador."
      ],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza apenas uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Verbaliza que iniciará as compressões torácicas associadas à ventilação até a preparação do desfibrilador.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza início das compressões e ventilações.",
        partial: "Verbaliza apenas compressões torácicas.",
        inadequate: "Não verbaliza compressões torácicas ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Ao receber o IMPRESSO 1, o candidato:",
      subItems: [
        "(1) Interpreta adequadamente o ritmo cardíaco do IMPRESSO 1 (fibrilação ventricular);",
        "(2) Indica desfibrilação."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Depois de ver o IMPRESSO 1 e indicar desfibrilação:",
      subItems: [
        "(1) Retoma as compressões cardíacas;",
        "(2) Solicita acesso venoso periférico."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Ao ver o ritmo do IMPRESSO 2 (fibrilação ventricular) realiza:",
      subItems: [
        "(1) Desfibrilação;",
        "(2) Retorno das compressões;",
        "(3) Administração de um miligrama de adrenalina (droga e dose verbalizadas)."
      ],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Ao ver o ritmo do IMPRESSO 3 (fibrilação ventricular) realiza:",
      subItems: [
        "(1) Desfibrilação;",
        "(2) Retorno das compressões;",
        "(3) Administração de 300 mg de amiodarona OU lidocaína 1-1,5mg/kg (validar se for verbalizado a droga e a dose)."
      ],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Ao ver o IMPRESSO 4:",
      subItems: [
        "(1) Identifica corretamente ritmo sinusal ou ritmo organizado;",
        "(2) Pergunta se o paciente tem pulso."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza ou indica que realizará os cuidados pós parada cardiorrespiratória.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Hemorragia Subaracnóidea (ID: 272, UID: 1064)
export const hemorragiaSubaracnoideaContent: ChecklistContent = {
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
      "Você é chamado para atender uma mulher de 50 anos de idade, dentista, casada, com forte dor de cabeça."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Indicar conduta terapêutica adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Joelma, 50 anos, dentista, casada.",
      "MOTIVO DE CONSULTA: Minha cabeça está doendo muito, não estou aguentando.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: Duas horas. Localização: Começou na frente e agora está doendo a cabeça inteira. Intensidade: Muito forte (10/10). Tipo de dor: Parece que a cabeça vai explodir. Irradiação: Não. Fatores de melhora: Tomei um paracetamol mas não resolveu nada. Fatores de piora: Não. Episódios anteriores: É a primeira vez que tenho uma dor tão forte como essa.",
      "SINTOMAS ACOMPANHANTES: Desmaio, queda ou convulsão: Tive um desmaio depois que começou a dor. Náuseas/vômitos: Estou com náusea e vomitei três vezes. Febre: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Anticoncepcional. Alergia: Nega. Cirurgia: Nega. História de trauma de crânio: Nega. Data da última menstruação: Há 20 dias.",
      "HÁBITOS: Álcool: Sim, tomo vinho de vez em quando. Cigarro: Nega. Drogas: Nega. Fezes e urina: Nega alterações. Perda de peso: Nega.",
      "ANTECEDENTES FAMILIARES: Minha mãe morreu de AVC há 5 anos."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Tomografia de crânio", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Cumprimentou a paciente simulada;",
        "(2) Se apresentou como médico(a)."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor:",
      subItems: [
        "(1) Tempo de início;",
        "(2) Localização;",
        "(3) Irradiação;",
        "(4) Tipo de dor;",
        "(5) Intensidade;",
        "(6) Fatores de melhora;",
        "(7) Fatores de piora;",
        "(8) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga seis ou mais características.",
        partial: "Investiga de quatro a cinco características.",
        inadequate: "Investiga três ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas:",
      subItems: [
        "(1) Febre;",
        "(2) Vômitos;",
        "(3) Fotofobia e/ou sonofobia;",
        "(4) Perda da consciência (ou desmaio) OU queda OU convulsão;",
        "(5) Perda do controle de esfíncteres;",
        "(6) Diminuição de força muscular."
      ],
      scoring: {
        adequate: "Pergunta cinco ou mais itens da lista.",
        partial: "Pergunta quatro itens.",
        inadequate: "Pergunta três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Alergias;",
        "(4) História de trauma de crânio;",
        "(5) Data da última menstruação."
      ],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investigou.",
        partial: "—",
        inadequate: "Não investigou."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita (1) exame físico geral e (2) exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico geral e neurológico.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita tomografia de crânio.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de hemorragia subaracnóidea.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Monitoração contínua;",
        "(2) Analgésico e/ou opioide;",
        "(3) Antiemético;",
        "(4) Suspender dieta oral;",
        "(5) Cabeceira elevada."
      ],
      scoring: {
        adequate: "Realiza quatro ou mais ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Realiza o encaminhamento de urgência para neurocirurgia.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Content for Suporte Básico De Vida (ID: 478, UID: 1065)
export const suporteBasicoVidaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Emergencial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Atendimento em via pública;",
      "- Recursos disponíveis conforme suporte pré-hospitalar básico."
    ],
    descricao: [
      "Você, médico recém-formado, está caminhando por uma avenida movimentada próxima a um shopping quando observa um homem caído, com aproximadamente 45 anos de idade. Há várias pessoas no local apenas observando."
    ]
  },
  orientacoes: [
    "- Atendimento inicial verbalizando todos os passos da cadeia de sobrevivência do Suporte Básico de Vida. Você será auxiliado por uma pessoa que responderá a todas as perguntas necessárias para seguir o atendimento."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Você será o assistente e responderá às perguntas do médico conforme disponível nesse roteiro.",
      "SE O MÉDICO PERGUNTAR SOBRE A SEGURANÇA DA CENA: Sim, a cena é segura.",
      "SE PERGUNTADO O QUE ACONTECEU: Doutor(a), esse homem estava atravessando a rua e de repente caiu. Ajuda ele por favor!",
      "SE PERGUNTADO SE A VÍTIMA RESPONDE A ESTÍMULOS: O paciente não responde.",
      "SE PERGUNTADO SE A VÍTIMA TEM PULSO E RESPIRA: Não tem pulso e nem respira.",
      "SE FOR SOLICITADO CHAMAR O SERVIÇO DE EMERGÊNCIA: Responder que estão a caminho.",
      "SE SOLICITADO UM DESFIBRILADOR EXTERNO AUTOMÁTICO (DEA): Uma pessoa foi ao Shopping pedir, doutor(a).",
      "Nesse momento o candidato deveria verbalizar o inicio das compressões torácicas. Quando ele terminar de explicar (ou mesmo se não verbalizar as compressões): Doutor(a), aqui está o DEA que você pediu.",
      "APÓS O CANDIDATO VERBALIZAR QUE CONECTOU O DEA: Analisando ritmo…choque recomendado…não toque o paciente…CHOQUE REALIZADO!",
      "A partir do choque, o candidato deveria verbalizar que continuará as compressões. Se ele verbalizar: OK, FIM DA ESTAÇÃO!"
    ]
  },
  impressos: [],
  evaluationItems: [
    {
      id: 1,
      title: "1. Verbaliza ou pergunta se a cena do atendimento é segura antes de aproximar, apresentar ou dirigir-se à vítima.",
      subItems: [],
      scoring: {
        adequate: "Realiza corretamente a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 2,
      title: "2. Após o cumprimento ou não do quesito um, o candidato:",
      subItems: [
        "(1) Se apresentou às pessoas como médico;",
        "(2) Perguntou o que aconteceu."
      ],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Comprova se o paciente responde:",
      subItems: [
        "(1) Chama o paciente em voz alta;",
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
      id: 4,
      title: "4. Verbaliza ou pergunta se o paciente:",
      subItems: [
        "(1) Tem pulso;",
        "(2) Se respira."
      ],
      scoring: {
        adequate: "Realiza as duas perguntas.",
        partial: "Realiza apenas uma pergunta.",
        inadequate: "Não realiza nenhuma pergunta."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita que seja acionado o serviço de emergência.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita um Desfibrilador Externo Automático (DEA).",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Verbaliza que iniciará as compressões torácicas (associadas ou não à ventilação) até a chegada do DEA.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Ao receber o aviso que chegou o DEA, verbaliza que irá ligar o aparelho e colocar os eletrodos.",
      subItems: [],
      scoring: {
        adequate: "Realiza as ações corretamente.",
        partial: "—",
        inadequate: "Não realiza as ações."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Após a realização do choque pelo DEA, verbaliza que reiniciará as compressões torácicas até uma nova análise do ritmo.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Pneumonia | INEP 2020.1 (ID: 411, UID: 1074)
export const pneumoniaInep2020Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiografia."
    ],
    descricao: [
      "Você está em um consultório da atenção secundária e vai atender um paciente do sexo masculino com 40 anos de idade."
    ]
  },
  orientacoes: [
    "- Realizar anamnese.",
    "- Analisar, interpretar e verbalizar os resultados dos exames apresentados pelo paciente simulado.",
    "- Estabelecer o diagnóstico.",
    "- Definir se há ou não necessidade de internação hospitalar."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Deivide, 40 anos de idade.",
      "MOTIVO DE CONSULTA: Tive gripe na semana passada e de ontem pra hoje comecei a sentir calafrios, febre de 38 graus, uma tosse com catarro amarelado e uma dor aqui de lado nas costelas. Também me sinto desanimado.",
      "OUTROS SINTOMAS PERGUNTADOS: Não consta no script.",
      "SE PERGUNTADO POR INGESTÃO DE MEDICAMENTOS: Tomei 20 gotas de dipirona há 4 horas.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergia: Nega. Internação prévia: Nega.",
      "QUALQUER OUTRA PERGUNTA REALIZADA: Não consta no script."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exames laboratoriais", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Cumprimenta o paciente e se apresenta.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre o uso de medicação, atual ou anterior.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre hospitalização prévia.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 4,
      title: "4. Pergunta sobre doenças crônicas.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não pede exames espontaneamente."
      },
      scores: { min: 0, partial: 0, max: 0.7 }
    },
    {
      id: 6,
      title: "6. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.6 }
    },
    {
      id: 7,
      title: "7. Interpreta o hemograma, que apresenta leucocitose com desvio à esquerda.",
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
      title: "8. Interpreta a radiografia de tórax, que demonstra uma imagem com padrão alveolar ou consolidação em terço inferior do hemitórax direito.",
      subItems: [],
      scoring: {
        adequate: "Interpreta.",
        partial: "—",
        inadequate: "Não interpreta."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Informa ao paciente o diagnóstico de pneumonia.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "—",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Informa que o tratamento será ambulatorial.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "—",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    }
  ],
  references: []
};

// Content for Leucemia Aguda | INEP 2020.1 (ID: 1078)
export const leucemiaAgudaInep2020Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial",
    situacao: [],
    descricao: [
      "Você fará atendimento ambulatorial, em hospital de Atenção Secundária, de um jovem com 30 anos de idade, previamente hígido, com queixas de cansaço, fraqueza, febre e sangramento gengival há 10 dias."
    ]
  },
  orientacoes: [
    "- Ler o impresso 1 (relato do caso clínico presente sobre a mesa do consultório).",
    "- Receber o paciente.",
    "- Realizar exame físico específico, conforme orientação do impresso 1.",
    "- Responder aos questionamentos do paciente simulado."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Quando o candidato terminar de ler as tarefas, liberar o IMPRESSO 1 (mesmo se ele não pedir).",
      "DADOS PESSOAIS: Marcelo, 30 anos de idade.",
      "MOTIVO DE CONSULTA: Estou me sentindo cansado, fraco, tenho tido febre, e há 10 dias comecei a ter sangramento na gengiva.",
      "QUANDO O CANDIDATO TERMINAR A DESCRIÇÃO DO EXAME FÍSICO, PERGUNTAR: Eu fiz um exame, você pode olhar por favor? (liberar o IMPRESSO 2). Em seguida, perguntar: o que eu tenho doutor? Pode ser sincero!",
      "SE O CANDIDATO DER ALGUM DIAGNÓSTICO, PERGUNTAR: Eu preciso fazer algum exame pra confirmar isso?",
      "SE O CANDIDATO INDICAR ALGUM EXAME PARA CONFIRMAR, PERGUNTAR: Como é feito esse exame?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Relato do caso clínico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Esfregaço de sangue periférico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Cumprimenta.",
        partial: "—",
        inadequate: "Não cumprimenta."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Verbaliza corretamente o exame abdominal: Posiciona o paciente simulado com os braços ao longo do corpo e ergue a camiseta para o exame abdominal.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza dois procedimentos.",
        partial: "—",
        inadequate: "Verbaliza um ou nenhum dos procedimentos."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Verbaliza a palpação do fígado: Palpação bimanual: posiciona a mão no gradeado costal direito e palpa com a outra mão, o bordo hepático, solicitando que o paciente simulado inspire profundamente em decúbito dorsal.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente a técnica.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Verbaliza a palpação bimanual do baço: Fixa o gradeado costal esquerdo com uma mão e palpa com a outra, com o paciente simulado em decúbito dorsal e em inspiração profunda.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente a execução.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Verbaliza outra técnica de palpação bimanual do baço: Palpação bimanual do baço em decúbito lateral direito, coloca o braço esquerdo dele atrás da cabeça, flexiona a perna esquerda dele e solicita inspiração profunda.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Hipótese diagnóstica: faz o diagnóstico de leucemia aguda ou leucose aguda.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Solicitação de procedimento: Solicita aspirado de medula e/ou biopsia de medula óssea e/ou imunofenotipagem (citometria de fluxo) de sangue periférico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Orientação sobre o procedimento ao paciente simulado: Explica que o aspirado e a biopsia de medula óssea são feitas no osso/na medula óssea e/ou que a imunofenotipagem é feita com coleta de sangue periférico.",
      subItems: [],
      scoring: {
        adequate: "Explica adequadamente.",
        partial: "—",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    }
  ],
  references: []
};

// Content for Gota | INEP 2022.1 (ID: 1080)
export const gotaInep2022Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial e hospitalar",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análise clínica;",
      "- Laboratório de imagem (radiologia e ecografia)."
    ],
    descricao: [
      "Paciente de 52 anos com queixa de dor no tornozelo esquerdo há 1 dia."
    ]
  },
  orientacoes: [
    "- Realizar anamnese;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Indicar hipóteses diagnósticas;",
    "- Indicar terapêutica inicial;",
    "- Orientar mudanças de hábitos de vida."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ricardo, 52 anos de idade.",
      "MOTIVO DE CONSULTA: Estou com muita dor no tornozelo esquerdo.",
      "CARACTERÍSTICAS DA DOR: Início: Começou ontem. Intensidade: É uma dor muito forte (8/10). Irradiação: Nega. Fatores de piora: Quando tento caminhar dói mais. Outras articulações afetadas: não.",
      "SINTOMAS ASSOCIADOS: Calor local: Sim. Edema: Sim. Vermelhidão: Sim. Febre: Estou me sentindo um pouco quente.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho diabetes. Medicamentos: Metformina. Alergias: Nega.",
      "HÁBITOS: Álcool: Tomo três latas de cerveja por dia. Consumo excessivo de proteínas/carnes vermelhas: Como muita carne vermelha e embutidos.",
      "Se o candidato solicitar radiografia de tornozelo e/ou pé OU ecografia do tornozelo esquerdo, liberar o IMPRESSO 4."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Exame de urina", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Exame de imagem", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Cumprimenta o paciente, (1) apresentando-se e (2) perguntando os dados do paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza os dois itens.",
        partial: "Realiza apenas um item.",
        inadequate: "Não realiza nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese. Questiona sobre: (1) Características da dor; (2) Febre ou calafrios.",
      subItems: [],
      scoring: {
        adequate: "Questiona os dois itens.",
        partial: "Questiona apenas um item.",
        inadequate: "Não questiona nenhum dos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre antecedentes pessoais e familiares:",
      subItems: [
        "(1) Ingesta de bebida alcoólica;",
        "(2) Medicamentos;",
        "(3) Dieta hiperproteica;",
        "(4) Trauma;",
        "(5) Episódio prévio semelhante;",
        "(6) Síndrome metabólica ou comorbidades;",
        "(7) História familiar."
      ],
      scoring: {
        adequate: "Pergunta cinco ou mais itens.",
        partial: "Pergunta três ou quatro itens.",
        inadequate: "Pergunta apenas dois ou menos itens."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 4,
      title: "4. Interpreta exames laboratoriais: Identifica hiperuricemia.",
      subItems: [],
      scoring: {
        adequate: "Identifica hiperuricemia.",
        partial: "—",
        inadequate: "Não identifica hiperuricemia."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames de imagem: radiografia de tornozelo e/ou pé, ou ecografia do tornozelo esquerdo.",
      subItems: [],
      scoring: {
        adequate: "Solicita um dos exames.",
        partial: "—",
        inadequate: "Não solicita nenhum dos exames."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Hipótese diagnóstica: Cita o diagnóstico de artrite por gota.",
      subItems: [],
      scoring: {
        adequate: "Cita gota, artrite gotosa, monoartrite gotosa ou crise gotosa.",
        partial: "Cita diagnóstico diferencial (artrite séptica, celulite ou erisipela).",
        inadequate: "Não cita nenhum dos diagnósticos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 7,
      title: "7. Proposta medicamentosa para tratamento inicial: uso de anti-inflamatórios não esteroidais e/ou corticoide e/ou colchicina.",
      subItems: [],
      scoring: {
        adequate: "Cita pelo menos uma das opções.",
        partial: "—",
        inadequate: "Não cita nenhuma das opções."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Proposta terapêutica para estilo de vida após a crise aguda:",
      subItems: [
        "(1) Orientação dietética;",
        "(2) Recomendação de atividade física regular."
      ],
      scoring: {
        adequate: "Propõe as duas orientações.",
        partial: "Propõe uma das orientações apenas.",
        inadequate: "Não propõe orientações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for DPOC – Diagnóstico | INEP 2021.1 (ID: 1081)
export const dpocDiagnosticoInep2021Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiografia."
    ],
    descricao: [
      "Atendimento ambulatorial em uma Unidade Básica de Saúde onde realizará o atendimento de um paciente com 60 anos de idade, aposentado (ex-comerciante), que se queixa de tosse há 6 meses."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese do paciente.",
    "- Interpretar adequadamente os exames pertinentes ao caso.",
    "- Estabelecer hipótese diagnóstica do caso clínico.",
    "- Responder aos questionamentos do paciente simulado.",
    "- Realizar o manejo do caso clínico exposto."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Emanuel, 60 anos de idade, ex-comerciante.",
      "MOTIVO DE CONSULTA: Venho porque estou tossindo muito já faz uns 6 meses.",
      "CARACTERÍSTICAS DA TOSSE: Presença de secreção: Sim, sempre tem um pouco secreção. Frequência: Tenho tosse praticamente todos os dias, de dia e de noite.",
      "SINTOMAS ACOMPANHANTES: Falta de ar: Sim, sinto falta de ar há muitos anos.",
      "ANTECEDENTES PESSOAIS: Doenças: Que eu saiba nenhuma. Internação prévia: Nega. Cirurgias: Nega. Medicamentos: Nega. Alergias: Nega.",
      "HÁBITOS: Álcool: Tomo cerveja e vinho. Cigarro: Fumo desde os 20 anos. Antigamente fumava meio maço por dia e hoje fumo 2 maços.",
      "Se o candidato mencionar a hipótese de câncer/tumor de pulmão, perguntar: Preciso fazer algum exame pra confirmar?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Espirometria e pesquisa TMR-TB", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: Apresenta-se (1) e identifica adequadamente o paciente (2).",
      subItems: [],
      scoring: {
        adequate: "Realiza dois comandos.",
        partial: "Realiza somente um comando.",
        inadequate: "Não realiza nenhum dos comandos."
      },
      scores: { min: 0, partial: 0.12, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese, com perguntas referentes a:",
      subItems: [
        "(1) Tosse;",
        "(2) Dispneia;",
        "(3) Febre;",
        "(4) Antecedente de asma;",
        "(5) Alergias."
      ],
      scoring: {
        adequate: "Pergunta quatro ou cinco itens.",
        partial: "Pergunta dois ou três itens.",
        inadequate: "Pergunta apenas um item ou nenhum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Solicita exame físico (1) e cita achados anormais (2).",
      subItems: [],
      scoring: {
        adequate: "Realiza dois comandos.",
        partial: "—",
        inadequate: "Realiza apenas um comando ou nenhum."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita Radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Interpreta a espirometria.",
      subItems: [],
      scoring: {
        adequate: "Interpreta.",
        partial: "—",
        inadequate: "Não interpreta."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Estabelece o diagnóstico de DPOC (Doença Pulmonar Obstrutiva Crônica).",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Estabelece uma hipótese diagnóstica associada de tumor pulmonar.",
      subItems: [],
      scoring: {
        adequate: "Estabelece.",
        partial: "—",
        inadequate: "Não estabelece."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Orienta terapêutica para DPOC: cessação do tabagismo (1) e broncodilatadores (2).",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "Realiza somente um item.",
        inadequate: "Não realiza nenhum dos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Encaminha o paciente para serviço de referência (oncologia ou pneumologia).",
      subItems: [],
      scoring: {
        adequate: "Encaminha.",
        partial: "—",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Esclarece que o diagnóstico definitivo se dá por meio de biopsia.",
      subItems: [],
      scoring: {
        adequate: "Esclarece.",
        partial: "—",
        inadequate: "Não esclarece."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Oferece ao paciente oportunidade de esclarecer todas as dúvidas.",
      subItems: [],
      scoring: {
        adequate: "Pergunta se tem dúvidas.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    }
  ],
  references: []
};

// Content for Enterobíase/Oxiuríase (ID: 1100)
export const enterobiaseOxiuriaseContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Suporte para laboratório de análises clínicas;",
      "- Suporte para exames de imagem;",
      "- Microscópio óptico."
    ],
    descricao: [
      "Você recebe para consulta uma mulher de 39 anos de idade que se queixa de intensa coceira na região anal."
    ]
  },
  orientacoes: [
    "- Realizar anamnese dirigida à queixa principal da paciente;",
    "- Solicitar, descrever e interpretar o exame físico;",
    "- Estabelecer e comunicar a hipótese diagnóstica;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Propor conduta terapêutica e seguimento da paciente;",
    "- Dar orientações à paciente e citar ao menos duas complicações da doença."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Júlia, 39 anos de idade, desempregada, casada.",
      "MOTIVO DE CONSULTA: Estou com uma coceira insuportável na região anal.",
      "CARACTERÍSTICAS DO QUADRO: Tempo de evolução: Começou já tem uns 3 dias. Outras partes do corpo afetadas: Nega. Fatores ou momentos de piora: De noite a coceira é muito pior. Episódios anteriores: Ano passado também tive essa coceira.",
      "CONTATOS ESTREITOS COM SINTOMAS SIMILARES: Minha familia inteira está assim. Começou com meu filho de 8 anos, depois o mais novo de 5 anos, meu marido e agora eu.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhuma doença. Medicamentos: Somente meu anticoncepcional. Alergias: Não tenho nenhuma alergia."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Inspeção anal", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Análise microscópica de Swab anal ou fita adesiva", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta a paciente simulada.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características do quadro:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Fatores/momentos de piora;",
        "(3) Fatores de melhora;",
        "(4) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga os quatro itens.",
        partial: "Investiga ao menos três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas associados:",
      subItems: [
        "(1) Presença de secreção perianal;",
        "(2) Dor anal;",
        "(3) Presença de sangue;",
        "(4) Alteração do hábito intestinal;",
        "(5) Dor abdominal;",
        "(6) Prurido vulvar e/ou vaginal;",
        "(7) Corrimento vaginal."
      ],
      scoring: {
        adequate: "Investiga de cinco a sete itens.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga os antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Alergias;",
        "(4) Data da última menstruação;",
        "(5) Viagens recentes;",
        "(6) Contato com pessoas com sintomas similares."
      ],
      scoring: {
        adequate: "Investiga cinco ou seis itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico geral.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita:",
      subItems: [
        "(1) Permissão para realizar inspeção anal;",
        "(2) Oferece a presença de outro(a) profissional;",
        "(3) Calça luvas de procedimento;",
        "(4) Solicita ou verbaliza que irá realizar inspeção anal."
      ],
      scoring: {
        adequate: "Realiza os quatro itens.",
        partial: "Realiza dois ou três itens.",
        inadequate: "Realiza um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita análise microscópica de swab anal ou de fita adesiva.",
      subItems: [],
      scoring: {
        adequate: "Solicita adequadamente uma das técnicas.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Formula o diagnóstico de oxiuríase ou enterobíase.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Indica a conduta terapêutica adequada com mebendazol OU albendazol OU pamoato de pirvínio OU pamoato de pirantel.",
      subItems: [],
      scoring: {
        adequate: "Indica algum dos medicamentos listados.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 10,
      title: "10. Fornece orientações gerais à paciente:",
      subItems: [
        "(1) Informa que os membros da família também devem ser tratados;",
        "(2) Orienta sobre hábitos de higiene pessoal."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Informa à paciente sobre ao menos duas complicações:",
      subItems: [
        "(1) Sobreinfecção bacteriana;",
        "(2) Salpingite;",
        "(3) Vulvovaginite;",
        "(4) Granulomas pelvianos."
      ],
      scoring: {
        adequate: "Cita duas complicações.",
        partial: "Cita uma complicação.",
        inadequate: "Não cita nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Diarreia Aguda (ID: 1105)
export const diarreiaAgudaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial - demanda espontânea",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Sala de atenção médica;",
      "- Sala de medicação;",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia convencional."
    ],
    descricao: [
      "Você atende por demanda espontânea um homem de 30 anos de idade, morador da região que consulta por quadro de diarreia."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal da paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Estabelecer e comunicar a hipótese diagnóstica;",
    "- Solicitar exames complementares, se necessário;",
    "- Propor conduta terapêutica e dar orientações à paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Luís, 30 anos, contador.",
      "MOTIVO DE CONSULTA: Dr(a), eu vim porque estou com diarreia e queria tomar algum remédio pra cortar pois preciso voltar ao trabalho amanhã.",
      "CARACTERÍSTICAS DA DIARREIA: Tempo de evolução: Começou há 4 dias. Número de episódios por dia: Umas 5 vezes. Consistência: Pastosa e às vezes líquida. Presença de sangue ou pus nas fezes: Sim, está saindo sangue junto com as fezes.",
      "SINTOMAS ASSOCIADOS: Febre: Comecei ontem a ter mal-estar, medi a temperatura e tava com 39.5 graus. Dor abdominal: Só umas cólicas quando dá vontade de ir no banheiro.",
      "ANTECEDENTES EPIDEMIOLÓGICOS: Histórico de viagem recente: Sim, estou de férias e fiquei 10 dias na praia. Consumo de alimentos de origem duvidosa: Eu comi muitas coisas diferentes nessa viagem.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergia: Nega."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exames de laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Exame macroscópico de fezes e coprocultura", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da diarreia perguntando:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Número de episódios diários;",
        "(3) Consistência das fezes;",
        "(4) Presença de sangue e/ou pus;",
        "(5) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco características.",
        partial: "Investiga três ou duas características.",
        inadequate: "Investiga uma ou nenhuma característica."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por outros sintomas associados:",
      subItems: [
        "(1) Febre;",
        "(2) Vômito;",
        "(3) Dor abdominal;",
        "(4) Aumento da sede."
      ],
      scoring: {
        adequate: "Investiga os quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investigou dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes epidemiológicos:",
      subItems: [
        "(1) Contatos estreitos com sintomas similares;",
        "(2) Viagens recentes;",
        "(3) Consumo de água e/ou comida de origem duvidosa;",
        "(4) Cartão de vacina."
      ],
      scoring: {
        adequate: "Investiga três ou quatro itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos de uso contínuo;",
        "(3) Uso recente de antibióticos;",
        "(4) Hospitalização recente;",
        "(5) Alergias."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico; e (2) Avalia o estado de hidratação.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza somente uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.375, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) Glicemia;",
        "(3) Ureia e/ou creatinina;",
        "(4) PCR e/ou VHS;",
        "(5) Sódio e/ou potássio."
      ],
      scoring: {
        adequate: "Solicita os cinco itens.",
        partial: "Solicita quatro itens.",
        inadequate: "Solicita três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita coprocultura ou cultura de fezes.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita ou verbaliza apenas exame/análise de fezes."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Formula o diagnóstico de disenteria ou diarreia aguda por Shigella ou Shigelose.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Indica conduta terapêutica medicamentosa específica:",
      subItems: [
        "(1) Ciprofloxacino via oral;",
        "(2) Tomar a cada 12 horas por 3 dias."
      ],
      scoring: {
        adequate: "Indica o nome da droga e tempo total de tratamento.",
        partial: "Indica somente o nome da droga ou indica a droga mas não verbaliza o tempo correto de tratamento.",
        inadequate: "Não indica o medicamento correto."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Indica tratamento de suporte:",
      subItems: [
        "(1) Antitérmicos;",
        "(2) Antieméticos;",
        "(3) Reposição hídrica;",
        "(4) Manter a alimentação habitual;",
        "(5) Contraindica antidiarreicos."
      ],
      scoring: {
        adequate: "Indica cinco itens.",
        partial: "Indica quatro ou três itens.",
        inadequate: "Indica dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Fornece orientações gerais:",
      subItems: [
        "(1) Lavagem frequente de mãos;",
        "(2) Solicita retorno em 48 horas;",
        "(3) Orienta sinais de alarme."
      ],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Lúpus Eritematoso Sistêmico (ID: 1113)
export const lupusEritematosoSistemicoContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você recebe para consulta agendada uma mulher de 30 anos de idade, casada, vendedora, que se queixa de cansaço de vários meses de evolução e dor nas articulações. A paciente associa esses sintomas ao seu trabalho já que caminha várias horas por dia oferecendo seus produtos. Decide consultar devido ao aparecimento de uma mancha no rosto que a deixou preocupada."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Orientar medidas terapêuticas iniciais e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Raíssa, 30 anos de idade, casada, vendedora de roupas.",
      "MOTIVO DE CONSULTA: Já faz uns 4 meses que estou me sentindo muito cansada e com dor nas articulações. E esses dias apareceu uma mancha no meu rosto que me deixou preocupada.",
      "SE PERGUNTADO PELA DOR NAS ARTICULAÇÕES: Tempo de evolução: Quatro meses. Localização: Às vezes dói as mãos e os pés, às vezes só os joelhos. Rigidez associada: Quando acordo às vezes a articulação fica meio dura e depois de uns 40 minutos começa a melhorar.",
      "SE INVESTIGADO SOBRE A MANCHA NO ROSTO: Tempo de evolução: Dez dias. Cor: Avermelhada. Fatores de piora: Quando tomo sol a mancha fica mais forte. Uso de protetor solar: Não.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Anticoncepcional. Alergias: Que eu saiba não.",
      "ANTECEDENTES FAMILIARES: Pai: Tem doença inflamatória intestinal. Mãe: Sem problemas de saúde.",
      "AO RECEBER ALGUM DIAGNÓSTICO, PERGUNTAR: Como se trata essa doença?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Análise de urina", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – FAN/Anti Smith/Anti DNAds/Complemento C3 e C4", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga a dor articular perguntando:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Articulações afetadas;",
        "(3) Intensidade;",
        "(4) Momento de aparição;",
        "(5) Fatores de melhora;",
        "(6) Fatores de piora;",
        "(7) Progressão."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Realiza perguntas relacionadas à mancha:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Cor;",
        "(3) Descamação;",
        "(4) Prurido;",
        "(5) Saída de secreção;",
        "(6) Fatores de piora;",
        "(7) Fatores de melhora;",
        "(8) Uso de protetor solar."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças crônicas;",
        "(2) Infecções;",
        "(3) Medicamentos;",
        "(4) Alergias;",
        "(5) Hábitos tóxicos;",
        "(6) Alteração no hábito urinário e/ou intestinal;",
        "(7) Alimentação;",
        "(8) Exercício físico."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. (1) Solicita exame físico e (2) verbaliza a presença de exantema eritematoso na região malar.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e descreve adequadamente a lesão.",
        partial: "Solicita exame físico sem descrever adequadamente a lesão.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Glicemia;",
        "(4) Ureia;",
        "(5) Creatinina;",
        "(6) Sódio;",
        "(7) Potássio;",
        "(8) TSH."
      ],
      scoring: {
        adequate: "Solicita seis ou mais exames da lista.",
        partial: "Solicita quatro ou cinco exames.",
        inadequate: "Solicita três ou menos exames da lista."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita análise de urina.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita laboratório imunológico:",
      subItems: [
        "(1) Fator antinuclear (FAN);",
        "(2) Anti Smith e/ou Anti DNAds;",
        "(3) Complemento C3 e/ou complemento C4."
      ],
      scoring: {
        adequate: "Solicita três itens.",
        partial: "Solicita dois itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de Lúpus eritematoso sistêmico.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 11,
      title: "11. Conduta terapêutica:",
      subItems: [
        "(1) Explica tratamento com hidroxicloroquina e/ou corticoide e/ou imunossupressores;",
        "(2) Orienta evitar exposição solar e/ou usar protetor solar;",
        "(3) Praticar exercício físico regular;",
        "(4) Evitar hábitos tóxicos;",
        "(5) Alimentação saudável;",
        "(6) Encaminhamento ao reumatologista."
      ],
      scoring: {
        adequate: "Realiza cinco ou mais ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Vertigem Posicional Paroxística Benigna – VPPB (ID: 1124)
export const vertigemVPPBContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório;",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é o médico da unidade e irá atender uma mulher de 55 anos de idade, com queixa de tontura recorrente."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa da paciente;",
    "- Realizar exame físico direcionado à queixa da paciente;",
    "- Solicitar demais exames pertinentes ao caso;",
    "- Formular o diagnóstico específico mais provável;",
    "- Estabelecer a conduta terapêutica adequada;",
    "- Explicar o prognóstico à paciente;",
    "- Esclarecer eventuais dúvidas."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Sara, 55 anos de idade, diarista.",
      "MOTIVO DE CONSULTA: Estou tendo muita tontura.",
      "SOBRE O MOTIVO DE CONSULTA: Tempo de evolução: Dois meses. Como é a tontura: Tudo começa a girar. Fatores desencadeantes: Quando abaixo para limpar o chão, pegar algum objeto no armário ou quando deito e levanto da cama. Frequência: Às vezes. Duração das crises: Alguns segundos, depois passa.",
      "SINTOMAS ACOMPANHANTES: Náusea: Sim. Vômito: Não. Qualquer outro sintoma: Negar.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos: Anticoncepcional. Alergias: Nega. Trauma de crânio prévio: Nega.",
      "DÚVIDAS: Doutor(a), isso é grave?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Otoscopia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Cumprimenta o paciente;",
        "(2) Identifica-se e pergunta o nome do paciente;",
        "(3) Pergunta o motivo da consulta."
      ],
      scoring: {
        adequate: "Realiza três itens.",
        partial: "Realiza dois itens.",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Investiga sobre o motivo de consulta:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Sensação de giro dos objetos ou do próprio corpo;",
        "(3) Frequência dos episódios;",
        "(4) Duração dos episódios;",
        "(5) Fatores desencadeantes;",
        "(6) Fatores de melhora e piora."
      ],
      scoring: {
        adequate: "Investiga seis itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga a existência de outros sinais ou sintomas relacionados:",
      subItems: [
        "(1) Náuseas ou vômitos;",
        "(2) Desequilíbrio ou instabilidade ao andar;",
        "(3) Alterações auditivas;",
        "(4) Cefaleia;",
        "(5) Alterações visuais/oculares;",
        "(6) Fraqueza."
      ],
      scoring: {
        adequate: "Investiga quatro itens ou mais.",
        partial: "Investiga de dois a três itens.",
        inadequate: "Investiga um item ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos;",
        "(4) História de trauma de crânio;",
        "(5) Álcool;",
        "(6) Drogas ilícitas;",
        "(7) Data da última menstruação;",
        "(8) Antecedentes familiares."
      ],
      scoring: {
        adequate: "Investiga cinco itens ou mais.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita:",
      subItems: [
        "(1) Exame físico geral;",
        "(2) Exame neurológico;",
        "(3) Otoscopia."
      ],
      scoring: {
        adequate: "Solicita três itens.",
        partial: "Solicita dois itens.",
        inadequate: "Solicita um item ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita a realização do teste de Dix–Hallpike.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Formula a hipótese diagnóstica: Vertigem posicional paroxística benigna.",
      subItems: [],
      scoring: {
        adequate: "Formula corretamente.",
        partial: "—",
        inadequate: "Não formula ou verbaliza apenas vertigem."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Indica tratamento com a manobra de Epley ou reposicionamento dos otólitos.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Orienta a paciente sobre o prognóstico: Informa que trata-se de uma condição benigna e autolimitada.",
      subItems: [],
      scoring: {
        adequate: "Orienta adequadamente.",
        partial: "—",
        inadequate: "Não orienta ou orienta incorretamente."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Lombalgia (ID: 1143)
export const lombalgiaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você atende um paciente do sexo masculino, 35 anos de idade, que trabalha em uma empresa como entregador de bebidas aos comerciantes da cidade há 5 anos. O paciente faltou ao trabalho por dores na coluna e foi ao centro de saúde para ser medicado e pedir um atestado médico para justificar a sua falta no trabalho. Ao consultar o sistema, você identifica 6 consultas desse paciente no último ano, todas por dor lombar."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Verbalizar ao menos 5 diagnósticos diferenciais de dor lombar;",
    "- Orientar medidas terapêuticas iniciais e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Thiago, 35 anos de idade, entregador de bebidas.",
      "MOTIVO DE CONSULTA: Estou com dor na coluna. Não consegui ir ao trabalho hoje e vim aqui pra tomar algum remédio e também preciso de um atestado por causa da minha falta.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: Está doendo desde ontem e hoje quando acordei não consegui ir trabalhar. Localização: Dói no meio e dos lados da coluna lombar. Intensidade: Dor moderada (6/10). Tipo de dor: Parece uma dor em aperto. Irradiação: Nega. Fatores de melhora: Se eu deitar de lado e ficar quieto melhora um pouco. Os dias que estava de férias também não tive dor. Fatores de piora: Piora quando estou no trabalho.",
      "SE INVESTIGADO EPISÓDIOS ANTERIORES: Comecei a ter dor depois que entrei nessa empresa, antes disso nunca tive dor na coluna.",
      "SE PERGUNTADO PELA SITUAÇÃO TRABALHISTA: Contribuo para a Previdência Social e também tenho seguro de acidente de trabalho.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: De vez em quando tomo dipirona para dor. Alergias: Acho que não. Cirurgias: Nega."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor lombar:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Localização;",
        "(3) Intensidade;",
        "(4) Tipo de dor;",
        "(5) Irradiação;",
        "(6) Fatores de melhora;",
        "(7) Fatores de piora;",
        "(8) Frequência dos episódios;",
        "(9) Mudança no padrão da dor."
      ],
      scoring: {
        adequate: "Investiga sete ou mais itens.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre sintomas associados:",
      subItems: [
        "(1) Febre;",
        "(2) Alterações urinárias;",
        "(3) Alterações nas fezes;",
        "(4) Diminuição de força muscular de membros inferiores;",
        "(5) Alteração da sensibilidade de membros inferiores;",
        "(6) Perda de peso."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga a situação trabalhista.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Cirurgias;",
        "(4) História de trauma;",
        "(5) Uso de drogas ilícitas;",
        "(6) Exercício físico."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 7,
      title: "7. Solicita: (1) exame físico geral mencionando (2) aspecto neurológico e/ou exame da coluna lombar.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e menciona exame da coluna lombar e/ou aspecto neurológico.",
        partial: "Solicita exame físico sem citar aspecto neurológico ou exame da coluna lombar.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de Lombalgia Mecânica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Cita diagnósticos diferenciais de dor lombar:",
      subItems: [
        "(1) Distensão lombar;",
        "(2) Entorse;",
        "(3) Processos degenerativos;",
        "(4) Hérnia de disco;",
        "(5) Fratura;",
        "(6) Estenose do canal raquidiano;",
        "(7) Escoliose;",
        "(8) Neoplasia;",
        "(9) Infecção;",
        "(10) Prostatite;",
        "(11) Herpes zóster;",
        "(12) Pielonefrite."
      ],
      scoring: {
        adequate: "Cita cinco ou mais diagnósticos diferenciais.",
        partial: "Cita três ou quatro diagnósticos diferenciais.",
        inadequate: "Cita dois ou menos diagnósticos diferenciais."
      },
      scores: { min: 0, partial: 1, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Indica analgésico e/ou anti-inflamatório;",
        "(2) Orienta sobre a importância de atividade física;",
        "(3) Indica a necessidade de acompanhamento."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Fornece e/ou informa sobre o direito de atestado médico e/ou afastamento do trabalho.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "—",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 12,
      title: "12. Realiza notificação ao Sistema de Informação de Agravos de Notificação (SINAN).",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 13,
      title: "13. Emite a Comunicação de Acidente de Trabalho (CAT).",
      subItems: [],
      scoring: {
        adequate: "Emite.",
        partial: "—",
        inadequate: "Não emite."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Erisipela (ID: 1144)
export const erisipelaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Demanda espontânea – Unidade básica de saúde da família (UBSF)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios."
    ],
    descricao: [
      "Você atende uma mulher de 35 anos de idade, obesa e hipertensa controlada com medicação, com histórico de Tinea Pedis (pé de atleta) de meses de evolução não tratada. Porém decide consultar devido ao aparecimento de uma outra mancha na perna. A paciente está preocupada pois pensa que pode ser algo grave."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa do paciente;",
    "- Realizar exame físico direcionado à queixa do paciente;",
    "- Solicitar demais exames pertinentes ao caso se necessário;",
    "- Formular o diagnóstico específico e mencionar pelo menos dois diagnósticos diferenciais;",
    "- Estabelecer a conduta adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Clara, 45 anos de idade, casada.",
      "MOTIVO DE CONSULTA: Venho porque apareceu uma mancha na minha perna e estou muito preocupada.",
      "CARACTERÍSTICAS DA MANCHA: Tempo de evolução: Dois dias. Coceira: Nega. Dor: Dói um pouco. Secreção: Nega. Descamação: Nega. Aumento da temperatura local: Sim. Episódios anteriores: Nega.",
      "SINTOMAS ASSOCIADOS: Febre: Sim, de 38 graus. Negar qualquer outro sintoma perguntado.",
      "SE PERGUNTADO POR: Traumatismo local, corte ou picada de insetos: Responder que não. Contato com substâncias alergênicas/irritantes: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta desde os 40 anos e tenho micose nos pés. Medicamentos: Losartana e hidroclorotiazida. Alergia: Nega. Cirurgias: Nega. Cartão de vacina: Atualizado."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Ectoscopia do membro", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza perguntas sobre a lesão:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Saída de secreção;",
        "(3) Prurido/coceira;",
        "(4) Dor;",
        "(5) Aumento da temperatura local;",
        "(6) Descamação."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 3,
      title: "3. Investiga:",
      subItems: [
        "(1) Sintomas associados;",
        "(2) Trauma local OU picada de inseto;",
        "(3) Episódios anteriores;",
        "(4) Uso recente de antibióticos."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças crônicas;",
        "(2) Uso de outros fármacos;",
        "(3) Alergias;",
        "(4) Internações/hospitalizações prévias;",
        "(5) Antecedentes familiares;",
        "(6) Hábitos tóxicos;",
        "(7) Alimentação/atividade física."
      ],
      scoring: {
        adequate: "Investiga sete itens.",
        partial: "Investiga de três a seis itens.",
        inadequate: "Investiga dois ou não investiga nenhum item."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Descreve a imagem do impresso 2: Lesão/placa eritematosa com bordas bem delimitadas.",
      subItems: [],
      scoring: {
        adequate: "Descreve corretamente.",
        partial: "—",
        inadequate: "Não descreve."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de erisipela.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Conduta terapêutica:",
      subItems: [
        "(1) Indica tratamento antibiótico com amoxicilina/clavulanato OU cefalexina OU clindamicina;",
        "(2) Antitérmico/analgésico;",
        "(3) Elevação do membro inferior;",
        "(4) Retorno em 48 a 72 horas;",
        "(5) Informa que será necessário tratar a Tinea Pedis;",
        "(6) Pautas de alarme."
      ],
      scoring: {
        adequate: "Realiza cinco ou seis ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 9,
      title: "9. Verbaliza dois diagnósticos diferenciais:",
      subItems: [
        "(1) Celulite;",
        "(2) Trombose Venosa Profunda (TVP);",
        "(3) Flebite superficial/Tromboflebite;",
        "(4) Dermatite de contato;",
        "(5) Fasciíte necrosante;",
        "(6) Picada de inseto."
      ],
      scoring: {
        adequate: "Verbaliza dois ou mais itens.",
        partial: "Verbaliza um item.",
        inadequate: "Não verbaliza nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    }
  ],
  references: []
};

// Content for Hepatite B aguda (ID: 1150)
export const hepatiteBAgudaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade conta com a seguinte infraestrutura:",
      "- Consultório;",
      "- Laboratório de análises clínicas;",
      "- Apoio para realização de radiografias."
    ],
    descricao: [
      "Você é o médico responsável pela USF e atende um homem de 37 anos de idade, com queixa de dor abdominal e febre."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese;",
    "- Solicitar o exame físico;",
    "- Solicitar os exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a hipótese diagnóstica;",
    "- Propor a conduta terapêutica adequada;",
    "- Orientar e responder eventuais dúvidas do paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Gabriel, 37 anos de idade, solteiro, trabalha em uma fábrica de móveis.",
      "MOTIVO DE CONSULTA: Doutor(a), estou precisando fazer alguns exames porque não me sinto bem. Estou tendo muita febre, cansaço e faz dois dias que tenho dor na barriga.",
      "CARACTERÍSTICAS DA DOR ABDOMINAL: Tempo de evolução: dois dias. Localização: dói do lado direito perto da costela. Intensidade: é uma dorzinha leve (4/10) mas que incomoda. Tipo de dor: às vezes fica dando umas pontadas.",
      "CARACTERÍSTICAS DA FEBRE: Tempo de início: duas semanas. Temperatura: geralmente 38 graus. Horário da febre: de tarde e noite quase sempre.",
      "ANTECEDENTES PESSOAIS: Doenças: nega. Cirurgias: nega. Medicamentos: nega. Alergias: nega. Cartão de vacina: perdi meu cartão e já faz muitos anos que não tomo nenhuma vacina.",
      "SE PERGUNTADO SOBRE VIDA SEXUAL: Ativa: sim, estou solteiro então acabo tendo várias parceiras. Uso de preservativo: quase nunca uso.",
      "Se o candidato solicitar qualquer exame para hepatite (A, B, C ou D): Liberar o IMPRESSO 3."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Sorologia para hepatite", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "—",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga a dor abdominal:",
      subItems: [
        "(1) Localização;",
        "(2) Irradiação;",
        "(3) Tipo de dor;",
        "(4) Intensidade;",
        "(5) Atenuantes e/ou agravantes;",
        "(6) Progressão;",
        "(7) Sintomas acompanhantes;",
        "(8) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga seis itens ou mais.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta por sintomas acompanhantes:",
      subItems: [
        "(1) Acolia ou fezes claras;",
        "(2) Colúria ou urina escura;",
        "(3) Icterícia ou pele/mucosa amarelada;",
        "(4) Prurido ou coceira;",
        "(5) Características da febre."
      ],
      scoring: {
        adequate: "Pergunta cinco itens.",
        partial: "Pergunta de três a quatro itens.",
        inadequate: "Pergunta dois itens ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Álcool;",
        "(4) Drogas ilícitas;",
        "(5) Vida sexual e/ou se usa preservativo;",
        "(6) Tratamentos prévios para doenças de transmissão sexual;",
        "(7) Cartão de vacina."
      ],
      scoring: {
        adequate: "Investiga seis itens ou mais.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita o exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Ureia;",
        "(4) Creatinina;",
        "(5) Coagulograma;",
        "(6) HBsAg;",
        "(7) Anti-HCV;",
        "(8) Anti-HAV;",
        "(9) Anti-HIV ou teste rápido para HIV;",
        "(10) Hepatograma."
      ],
      scoring: {
        adequate: "Solicita sete itens ou mais.",
        partial: "Solicita de quatro a cinco itens.",
        inadequate: "Solicita três itens ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Formula e verbaliza a hipótese diagnóstica: hepatite B aguda.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese corretamente.",
        partial: "—",
        inadequate: "Não formula a hipótese corretamente."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica:",
      subItems: [
        "(1) Informa que o tratamento é sintomático/de suporte;",
        "(2) Orienta não ingerir bebida alcoólica e/ou medicamentos hepatotóxicos;",
        "(3) Orienta sobre práticas sexuais seguras;",
        "(4) Informa a necessidade de contatar parceiros(as) sexuais;",
        "(5) Indica acompanhamento ambulatorial."
      ],
      scoring: {
        adequate: "Realiza quatro itens ou mais.",
        partial: "Realiza três itens.",
        inadequate: "Realiza dois itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 10,
      title: "10. Realiza a notificação ao SINAN (Sistema de Informação de Agravos de Notificação).",
      subItems: [],
      scoring: {
        adequate: "Notifica.",
        partial: "—",
        inadequate: "Não notifica."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Rinossinusite Aguda (UID: 1159)
export const rinossinusiteAgudaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você atende um jovem de 18 anos de idade com queixas respiratórias."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico;",
    "- Verbalize ao menos duas complicações que poderiam ocorrer no quadro do paciente.",
    "",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Igor, 18 anos de idade, estudante, solteiro.",
      "MOTIVO DE CONSULTA: Estou muito gripado, queria algum remédio pra melhorar mais rápido porque estou em semana de prova e não consigo estudar assim.",
      "CARACTERÍSTICAS DO QUADRO: Sintomas: Estava espirrando muito, nariz tapado e saindo uma secreção clara. Tempo de evolução: Já faz doze dias que começou. Evolução/progressão: Estava melhorando aos poucos mas desde antes de ontem piorou de novo.",
      "SE PERGUNTADO POR: Dor na face: Sim, dói no lado direito do nariz e quando inclino a cabeça pra frente parece que aumenta a dor. Mudança na secreção nasal: Agora está uma secreção muito espessa, verde e com um cheiro horrível, saindo só do lado direito. Febre: Sim, medi hoje e estava com 39.4 graus. Dificuldade respiratória/falta de ar: Não. Episódios anteriores: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos de uso contínuo: Nega. Uso recente de antibióticos: Nega. Alergias: Nega.",
      "HÁBITOS: Cigarro: Nega. Álcool: Nega. Drogas ilícitas: Nega. Atividade física: Musculação 3 vezes por semana. Alimentação: Variada.",
      "ANTECEDENTES FAMILIARES: Pai e mãe sem doenças."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Rinoscopia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese perguntando por:",
      subItems: [
        "(1) Tempo de início dos sintomas;",
        "(2) Progressão do quadro;",
        "(4) Episódios anteriores;",
        "(5) Dor na face;",
        "(6) Mudança no aspecto da secreção nasal;",
        "(7) Febre;",
        "(8) Dispneia."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens da lista.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos de uso contínuo;",
        "(4) Uso recente de antibióticos;",
        "(5) Tabagismo;",
        "(6) Álcool;",
        "(7) Drogas ilícitas."
      ],
      scoring: {
        adequate: "Investiga sete itens.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) exame físico geral e (2) rinoscopia.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita exame físico geral mas não menciona rinoscopia.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Não solicita exames de imagem.",
      subItems: [],
      scoring: {
        adequate: "Não solicita.",
        partial: "—",
        inadequate: "Solicita algum exame de imagem."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Formula a hipótese diagnóstica de rinossinusite bacteriana.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Verbaliza complicações da rinossinusite bacteriana:",
      subItems: [
        "(1) Celulite orbitária;",
        "(2) Abscesso sub e/ou extradural;",
        "(3) Abscesso subperiosteo;",
        "(4) Abscesso cerebral;",
        "(5) Abscesso orbitário;",
        "(6) Tromboflebite do seio cavernoso;",
        "(7) Osteomielite;",
        "(8) Meningite;",
        "(9) Encefalite."
      ],
      scoring: {
        adequate: "Verbaliza quatro ou mais complicações.",
        partial: "Verbaliza duas ou três complicações.",
        inadequate: "Verbaliza uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica:",
      subItems: [
        "(1) Amoxicilina ou Amoxicilina com ácido clavulânico por 7 a 14 dias;",
        "(2) Antitérmico e/ou analgésico;",
        "(3) Retorno em 48 a 72 horas para nova avaliação;",
        "(4) Pautas de alarme."
      ],
      scoring: {
        adequate: "Realiza quatro ações.",
        partial: "Realiza de duas a três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.75 }
    }
  ],
  references: []
};

// Content for Acidente Por Aranha (UID: 1162)
export const acidentePorAranhaContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção terciária à saúde",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiologia convencional e tomografia computadorizada;",
      "- Centro cirúrgico."
    ],
    descricao: [
      "Você é médico(a) plantonista em um pronto socorro de um hospital de 3º nível e recebe para atendimento um homem que refere ter sido picado por uma aranha enquanto limpava o quintal da sua casa. O paciente trouxe uma foto da aranha pensando que poderia te ajudar."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Identificar e verbalizar corretamente o gênero da aranha mostrada pelo paciente;",
    "- Solicitar exames complementares, se necessário;",
    "- Propor conduta terapêutica adequada;",
    "- Realizar orientações sobre prevenção de acidentes por animais peçonhentos."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Miguel, 40 anos de idade, mecânico.",
      "MOTIVO DE CONSULTA: Estava limpando o quintal da minha casa e uma aranha me picou.",
      "CARACTERÍSTICAS DO ACIDENTE: Tempo de evolução: Já tem umas duas horas. Local: Foi na mão direita. Dor: Sim, começou logo depois da picada. Intensidade: Muito forte (8/10) na mão inteira. Irradiação: Não. Tipo de dor: Queimação.",
      "SINTOMAS ASSOCIADOS: Vômitos: Vomitei umas 4 vezes. Alterações visuais: Minha visão está embaçada. Excesso de salivação/sialorréia: Sim, estou até babando. Outros sintomas: Nega. Priapismo: Sim. Astenia: Dr, eu me sinto muito fraco.",
      "SE PERGUNTADO POR LIMPEZA OU ANTISSEPSIA DO LOCAL: Responder que não.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhuma doença. Medicamentos: Não uso nenhuma medicação. Alergias: Que eu saiba não. Cartão de vacina: Atualizado.",
      "HÁBITOS: Álcool: Cerveja de vez em quando. Cigarro: Não fumo. Drogas: Não uso nenhuma droga. Alteração na urina: Minha urina está normal, eu acho."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Imagem da Aranha", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese direcionada perguntando por:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Dor no local da picada;",
        "(3) Salivação excessiva ou sialorréia;",
        "(4) Vômitos;",
        "(5) Priapismo;",
        "(6) Sudorese;",
        "(7) Limpeza da região afetada."
      ],
      scoring: {
        adequate: "Pergunta seis ou sete itens.",
        partial: "Pergunta de três a cinco itens.",
        inadequate: "Pergunta por dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga os antecedentes pessoais.",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Alergias;",
        "(4) Álcool;",
        "(5) Drogas ilícitas;",
        "(6) Estado vacinal."
      ],
      scoring: {
        adequate: "Investiga cinco ou seis itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita o exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita os exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Gasometria arterial;",
        "(4) Ureia e/ou Creatinina;",
        "(5) Urina 1 ou EAS;",
        "(6) Sódio e Potássio."
      ],
      scoring: {
        adequate: "Solicita de cinco a seis itens.",
        partial: "Solicita três ou quatro itens.",
        inadequate: "Solicita dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Identifica corretamente a aranha mostrada na foto:",
      subItems: [],
      scoring: {
        adequate: "Identifica o gênero Phoneutria ou aranha armadeira.",
        partial: "—",
        inadequate: "Não identifica."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de acidente grave por Phoneutria ou aranha armadeira.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico (acidente por Phoneutria/aranha armadeira) e classifica como grave.",
        partial: "Realiza o diagnóstico mas não classifica como grave.",
        inadequate: "Não realiza o diagnóstico."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 8,
      title: "8. Realiza a conduta terapêutica adequada.",
      subItems: [
        "(1) Indica soro antiaracnídico, 5 a 10 ampolas;",
        "(2) Indica analgesia endovenosa;",
        "(3) Limpeza e/ou antissepsia da região afetada;",
        "(4) Solicita internação em unidade de cuidados intensivos."
      ],
      scoring: {
        adequate: "Realiza as quatro ações.",
        partial: "Realiza de uma a três ações (obrigatoriamente deve incluir o item 1).",
        inadequate: "Não indica corretamente o item 1 ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Orienta sobre prevenção de acidentes com animais peçonhentos.",
      subItems: [
        "(1) Manter jardins e quintais limpos;",
        "(2) Usar luvas ou botas;",
        "(3) Verificar roupas e sapatos antes de usá-los;",
        "(4) Combater a proliferação de insetos;",
        "(5) Evitar folhagens densas."
      ],
      scoring: {
        adequate: "Orienta ao menos dois itens.",
        partial: "—",
        inadequate: "Orienta um ou nenhum item."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Realiza a notificação de acidente por animais peçonhentos ao SINAN.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Content for Artrite Infecciosa (UID: 1163)
export const artriteInfecciosaContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de Pronto Atendimento (UPA)",
    tipo: "Demanda espontânea",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiologia convencional e tomografia computadorizada;",
      "- Centro cirúrgico."
    ],
    descricao: [
      "Você atende um paciente masculino de 40 anos de idade que se queixa de dor no joelho direito."
    ]
  },
  orientacoes: [
    "- Realizar anamnese do paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Solicitar e interpretar exames complementares caso clínico, se necessário;",
    "- Definir a principal hipótese diagnóstica;",
    "- Propor a conduta terapêutica necessária."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Paulo, 40 anos de idade, mecânico, casado.",
      "MOTIVO DE CONSULTA: Estou com muita dor no joelho.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: 4 dias. Localização: Dói o joelho inteiro. Intensidade: Muito forte (8/10). Progressão: Começou leve e foi piorando. Tipo de dor: Parece que fica latejando. Irradiação: Nega. Fatores de piora: Caminhar, apoiar o pé ou movimentar o joelho. Fatores de melhora: Não. Episódios anteriores: Nega. Outras articulações afetadas: Nega.",
      "SINTOMAS ACOMPANHANTES: Faz 2 dias que estou tendo febre e mal estar, medi a temperatura e estava com 39 graus.",
      "SE PERGUNTADO POR TRAUMA, CORTES, LESÕES OU PROCEDIMENTOS NA ARTICULAÇÃO: Aplicaram umas injeções de corticoide no meu joelho há alguns dias porque machuquei jogando bola. Mas parece que não resolveu porque agora está doendo mais ainda.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos: Nega. Alergias: Nega. Uso recente de antibióticos: Nega. Cartão de vacinas: Atualizado.",
      "HÁBITOS: Álcool: Cerveja de vez em quando. Drogas lícitas: Nega. Cigarro: Nega. Atividade física: Jogava bola 3 vezes por semana mas esses dias não estou jogando. Alimentação: Variada. Vida sexual: Ativa, somente com minha esposa."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Radiografia/ecografia do joelho", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Artrocentese/Análise do líquido sinovial", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Localização;",
        "(3) Intensidade;",
        "(4) Tipo de dor;",
        "(5) Irradiação;",
        "(6) Fatores de melhora;",
        "(7) Fatores de piora;",
        "(8) Progressão;",
        "(9) Sintomas acompanhantes."
      ],
      scoring: {
        adequate: "Investiga ao menos sete características da dor.",
        partial: "Investiga de quatro a seis características.",
        inadequate: "Investiga três ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga:",
      subItems: [
        "(1) Trauma ou corte ou infecção na pele ou procedimentos invasivos na articulação;",
        "(2) Outras articulações afetadas;",
        "(3) Episódios anteriores;",
        "(4) Condutas sexuais de risco OU número de parceiros(as) sexuais OU uso de preservativo;",
        "(5) Lesões de pele e/ou mucosas;",
        "(6) Corrimento uretral;",
        "(7) Uso de drogas injetáveis."
      ],
      scoring: {
        adequate: "Investiga ao menos cinco itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico, verbaliza que há a presença de sinais de inflamação ou flogísticos e menciona ao menos dois sinais.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e VERBALIZA sinais inflamatórios.",
        partial: "Solicita exame físico mas não verbaliza sinais inflamatórios.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Ureia;",
        "(4) Creatinina;",
        "(5) Hemocultura."
      ],
      scoring: {
        adequate: "Solicita ao menos quatro itens.",
        partial: "Solicita ao menos três itens.",
        inadequate: "Solicita dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita radiografia OU ecografia de joelho.",
      subItems: [],
      scoring: {
        adequate: "Solicita algum dos exames.",
        partial: "—",
        inadequate: "Não solicita nenhum exame."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 7,
      title: "7. Solicita artrocentese do joelho ou análise do líquido sinovial.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de artrite infecciosa/séptica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica:",
      subItems: [
        "(1) Internação;",
        "(2) Indica tratamento empírico inicial com Oxacilina OU Vancomicina;",
        "(3) Aspiração/drenagem da articulação;",
        "(4) Analgesia."
      ],
      scoring: {
        adequate: "Realiza as quatro ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Exacerbação de Asma (UID: 1164)
export const exacerbacaoAsmaContent: ChecklistContent = {
  scenario: {
    nivel: "Hospital de atenção terciária - Sala de emergências",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade conta com a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Exames de radiografia, tomografia e ressonância magnética;",
      "- Internação em enfermaria e terapia intensiva."
    ],
    descricao: [
      "Você é médico plantonista e é chamado às 4hrs da madrugada para atender uma mulher de 35 anos de idade com dificuldade respiratória.",
      "",
      "Dados da triagem:",
      "- Pressão arterial: 130x80 mm Hg",
      "- Frequência cardíaca: 110 batimentos por minuto",
      "- Frequência respiratória: 28 incursões por minuto",
      "- Saturação de O2: 92%",
      "- Temperatura: 36 °C",
      "",
      "A paciente já se encontra na sala vermelha e monitorizada."
    ]
  },
  orientacoes: [
    "- Anamnese (ATENÇÃO! A ANAMNESE DEVERÁ SER CONCLUÍDA ANTES DE PASSAR PARA AS PRÓXIMAS TAREFAS).",
    "- Solicitar exame físico.",
    "- Solicitar exames complementares, se necessário.",
    "- Verbalizar Hipótese diagnóstica.",
    "- Citar ao menos um diagnóstico diferencial.",
    "- Mencionar conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Rafaela, 35 anos de idade, motorista de aplicativo.",
      "MOTIVO DE CONSULTA: Estou com muita falta de ar.",
      "CARACTERÍSTICAS DA DISPNEIA: Início: Começou há 40 minutos, estava dormindo e acordei assim. Fatores de melhora/piora: Nega. Episódios anteriores: Já tive essa falta de ar há 2 anos.",
      "SINTOMAS ACOMPANHANTES: Aperto no peito.",
      "SE PERGUNTADO POR FATORES DESENCADEANTES: Única coisa que fiz de diferente ontem foi limpar a casa, tinha muita poeira acumulada.",
      "ANTECEDENTES PESSOAIS: Doenças: Um médico tinha me falado que tenho asma. Comecei a usar uma bombinha mas como me sentia melhor parei de usar. Medicamentos: Anticoncepcional oral. Cirurgias: Nega. Imobilização recente: Nega. Alergias: Acho que tenho alergia a poeira e pelo de gato.",
      "HÁBITOS: Álcool: De vez em quando tomo cerveja. Cigarro: Nega. Drogas: Nega. Atividade física: Não faço porque trabalho muito. Alimentação: Variada.",
      "ANTECEDENTES FAMILIARES: Minha mãe tem rinite alérgica. Meu pai não tem nenhum problema de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro apresentado perguntando por:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Episódios anteriores;",
        "(3) Infecções;",
        "(4) Situações de estresse;",
        "(5) Contato com poluentes ambientais;",
        "(6) Uso de medicamentos para alívio do quadro;",
        "(7) Imobilização recente;",
        "(8) Edema ou dor em membro inferior."
      ],
      scoring: {
        adequate: "Investiga ao menos seis itens da lista.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Pergunta antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) História de trombose venosa profunda e/ou tromboembolismo pulmonar;",
        "(4) Cirurgias;",
        "(5) Alergias;",
        "(6) Tabagismo;",
        "(7) Internações prévias."
      ],
      scoring: {
        adequate: "Investiga ao menos cinco itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Interpreta e VERBALIZA que há obstrução/resistência ao fluxo de ar, evidenciada através da prova de Pico de Fluxo Expiratório (Peak Flow).",
      subItems: [],
      scoring: {
        adequate: "Verbaliza a obstrução/resistência ao fluxo ar.",
        partial: "—",
        inadequate: "Não verbaliza a obstrução/resistência ao fluxo de ar."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de crise de asma.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Cita ao menos 1 dos seguintes diagnósticos diferenciais:",
      subItems: [
        "crise de angústia/pânico, tromboembolismo pulmonar, reação anafilática, obstrução de via aérea por corpo estranho."
      ],
      scoring: {
        adequate: "Cita algum diagnóstico diferencial da lista.",
        partial: "—",
        inadequate: "Não cita nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica:",
      subItems: [
        "(1) Beta 2 agonista de curta duração;",
        "(2) Corticoide sistêmico ou inalatório (CI);",
        "(3) Oxigênio suplementar;",
        "(4) Orienta sobre a importância de não interromper o tratamento;",
        "(5) Orienta sobre evitar poluentes ambientais;",
        "(6) Indica acompanhamento ambulatorial."
      ],
      scoring: {
        adequate: "Realiza as seis ações.",
        partial: "Realiza de três a cinco ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Orienta medidas de redução de exposição ambiental.",
      subItems: [
        "(1) Evitar contato com animais;",
        "(2) Não usar tapetes e cortinas, evitar bichinhos de pelúcias;",
        "(3) Não varrer;",
        "(4) Afastamento do trabalho;",
        "(5) Evitar fumaça de cigarro;",
        "(6) Manter o ambiente arejado, ventilado."
      ],
      scoring: {
        adequate: "Orienta cinco ou seis medidas.",
        partial: "Orienta três ou quatro medidas.",
        inadequate: "Orienta duas ou menos."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Content for Retocolite Ulcerativa | INEP 2022.1 (UID: 1165)
export const retocoliteUlcerativaInep2022Content: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios;",
      "- Setor de endoscopia;",
      "- Laboratório de análise clínica."
    ],
    descricao: [
      "Paciente de 60 anos com queixa de diarreia há três meses e dor abdominal."
    ]
  },
  orientacoes: [
    "- Anamnese da paciente;",
    "- Solicitar qualquer exame físico e/ou complementar que seja pertinente ao caso;",
    "- Decidir sobre investigação complementar;",
    "- Formular hipóteses diagnósticas;",
    "- Elaborar plano terapêutico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Fátima, 60 anos de idade.",
      "MOTIVO DE CONSULTA: Estou tendo muita diarreia e dor de barriga.",
      "CARACTERÍSTICAS DA DIARREIA: Tempo de evolução: Três meses. Frequência das evacuações: Várias vezes ao dia. Consistência das fezes: Na maioria das vezes é liquida ou pastosa. Presença de sangue: Algumas vezes sim. Presença de pus: Que eu tenha visto não. Presença de alimentos não digeridos: Não.",
      "CARACTERÍSTICAS DA DOR ABDOMINAL: Tempo de evolução: Três meses. Localização: No meio da barriga. Intensidade: Dor forte (7/10). Tipo de dor: Cólicas. Irradiação: Não.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos: Nega. Alergias: Nega.",
      "HÁBITOS: Álcool: Nega. Cigarro: Um maço por dia desde os 35 anos de idade. Drogas: Nega. Alimentação: Como um pouco de tudo. Urina: Nega alterações. Sono: Durmo umas 6 horas por noite. Peso corporal: Sinto que diminuiu bastante meu peso, sem ter mudado a dieta.",
      "SE PERGUNTADO POR ACESSO A SANEAMENTO BÁSICO OU ÁGUA POTÁVEL: Responder que sim.",
      "ANTECEDENTES FAMILIARES: Minha mãe faleceu de acidente de carro mas tinha um problema no intestino. Não sei dizer o que era. Meu pai é diabético."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Colonoscopia", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Biópsia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Apresenta-se e (2) cumprimenta a paciente simulada."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma das ações."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese, perguntando sobre as características da diarreia:",
      subItems: [
        "(1) Frequência da diarreia;",
        "(2) Número de evacuações por dia;",
        "(3) Consistência das fezes;",
        "(4) Presença de muco;",
        "(5) Presença de sangue;",
        "(6) Despertar noturno;",
        "(7) Presença de alimentos não digeridos."
      ],
      scoring: {
        adequate: "Pergunta cinco ou mais características.",
        partial: "Pergunta apenas três ou quatro características.",
        inadequate: "Não pergunta ou pergunta apenas duas ou menos características."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Pergunta manifestações clínicas associadas ao quadro:",
      subItems: [
        "(1) Febre;",
        "(2) Perda de peso;",
        "(3) Anorexia (perda de apetite);",
        "(4) Artralgia;",
        "(5) Dor abdominal;",
        "(6) Distensão abdominal;",
        "(7) Fadiga (fraqueza, cansaço ou indisposição);",
        "(8) Sinais sugestivos de anemia."
      ],
      scoring: {
        adequate: "Pergunta cinco ou mais características.",
        partial: "Pergunta apenas três ou quatro características.",
        inadequate: "Não pergunta ou pergunta apenas duas ou menos características."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita colonoscopia (endoscopia digestiva baixa) e o resultado da biópsia.",
      subItems: [],
      scoring: {
        adequate: "Solicita a colonoscopia (endoscopia digestiva baixa) e a biópsia.",
        partial: "Solicita apenas a colonoscopia (endoscopia digestiva baixa).",
        inadequate: "Não solicita nenhum dos dois."
      },
      scores: { min: 0, partial: 1.5, max: 2 }
    },
    {
      id: 7,
      title: "7. Estabelece o diagnóstico de retocolite ulcerativa (RCUI).",
      subItems: [],
      scoring: {
        adequate: "Estabelece o diagnóstico de RCUI.",
        partial: "Não estabelece o diagnóstico de RCUI, mas estabelece o diagnóstico de doença de Crohn ou doença inflamatória intestinal.",
        inadequate: "Lista qualquer outro diagnóstico que não seja RCUI, doença de Crohn ou doença inflamatória intestinal."
      },
      scores: { min: 0, partial: 0.5, max: 2 }
    },
    {
      id: 8,
      title: "8. Prescreve tratamento específico para retocolite ulcerativa de intensidade leve a moderada.",
      subItems: [],
      scoring: {
        adequate: "Propõe somente derivados do 5-ASA (mesalazina ou sulfasalazina) OU propõe derivados do 5-ASA (mesalazina ou sulfasalazina) com corticoide via oral.",
        partial: "—",
        inadequate: "Não propõe o tratamento adequado conforme os esquemas mencionados ou propõe só o corticoide via oral."
      },
      scores: { min: 0, partial: 0, max: 2 }
    }
  ],
  references: []
};

// Content for Insuficiência Cardíaca Aguda Perfil B (UID: 1166)
export const insuficienciaCardiacaAgudaPerfilBContent: ChecklistContent = {
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
      "Você é chamado para atender um paciente masculino de 65 anos de idade com intensa falta de ar.",
      "",
      "Dados da triagem:",
      "- PA: 140x85 mm Hg",
      "- FC: 112 batimentos por minuto",
      "- FR: 26 incursões por minuto",
      "- Saturação de O2: 86%",
      "- Temperatura: 36,8 °C",
      "",
      "O paciente já se encontra na sala vermelha e monitorizado."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Classificar conforme o perfil hemodinâmico;",
    "- Orientar medidas terapêuticas iniciais;",
    "- Menciona complicações do quadro. (Mínimo 3)"
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Malon, 65 anos, aposentado, casado.",
      "MOTIVO DE CONSULTA: Comecei a ter falta de ar há 2 dias, mas hoje está muito forte e não estou aguentando mais.",
      "CARACTERÍSTICAS DA FALTA DE AR: Início: Há 2 dias. Intensidade: Até sentado sinto falta de ar. Fatores de melhora: Nenhum. Fatores de piora: Se eu deitar ou caminhar piora muito. Progressão: Começou leve e foi piorando. Episódios anteriores: De vez em quando tenho falta de ar mas não tão forte como hoje.",
      "SINTOMAS ACOMPANHANTES: Edema ou inchaço em membros inferiores: Minhas pernas estão muito inchadas. Alterações nas fezes e urina: Nega alterações. Aumento do peso corporal: Senti que a roupa está mais ajustada esses dias.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta e há 2 anos o médico falou que meu coração já não está funcionando bem. Medicamentos: Enalapril, carvedilol e rosuvastatina. Cirurgias: Nega. Alergias: Nega. Cartão de vacina: Atualizado.",
      "SE PERGUNTADO POR ABANDONO DA MEDICAÇÃO OU TRANSGRESSÃO ALIMENTAR: Estou comendo muito esses dias, churrasco, cerveja e tira gosto. Os remédios às vezes esqueço do tomar.",
      "HÁBITOS: Cigarro: Nega. Álcool: Cerveja e cachaça nos fins de semana. Drogas: Nega. Alimentação: Comida com muito sal, embutidos, carnes.",
      "ANTECEDENTES FAMILIARES: Meu pai era hipertenso e faleceu em um acidente."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga a dispneia perguntando:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Intensidade;",
        "(3) Fatores de melhora;",
        "(4) Fatores de piora;",
        "(5) Progressão;",
        "(6) Sintomas acompanhantes;",
        "(7) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga:",
      subItems: [
        "(1) Abandono do tratamento ou uso incorreto dos medicamentos;",
        "(2) Infecções;",
        "(3) Dor torácica ou palpitações;",
        "(4) Edemas em membros inferiores."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Tabagismo;",
        "(4) Álcool;",
        "(5) Drogas;",
        "(6) Alimentação;",
        "(7) Cartão de vacina."
      ],
      scoring: {
        adequate: "Investiga todos os itens listados.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita exames de laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) Creatinina e ureia (ou função renal);",
        "(3) Potássio;",
        "(4) Sódio;",
        "(5) BNP ou NT-próBNP;",
        "(6) Gasometria arterial."
      ],
      scoring: {
        adequate: "Solicita seis exames listados.",
        partial: "Solicita quatro ou cinco exames listados.",
        inadequate: "Solicita três ou menos exames."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita eletrocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de insuficiência cardíaca aguda descompensada e classifica como perfil B.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico e classifica adequadamente como perfil B.",
        partial: "Realiza o diagnóstico de insuficiência cardíaca aguda mas não cita a classificação correta.",
        inadequate: "Não realiza o diagnóstico."
      },
      scores: { min: 0, partial: 0.75, max: 2 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Furosemida + nitroglicerina ou nitroprussiato de sódio;",
        "(2) Oxigênio suplementar;",
        "(3) Restrição hidrossalina;",
        "(4) Manter cabeceira elevada."
      ],
      scoring: {
        adequate: "Realiza quatro ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 1.75 }
    },
    {
      id: 11,
      title: "11. Menciona complicações:",
      subItems: [
        "(1) Edema agudo de pulmão;",
        "(2) Fibrilação atrial ou outras arritmias;",
        "(3) Isquemia miocárdica;",
        "(4) Síndrome cardiorrenal tipo 1;",
        "(5) Congestão hepática;",
        "(6) Trombose venosa profunda/embolia pulmonar."
      ],
      scoring: {
        adequate: "Menciona três ou mais complicações.",
        partial: "Menciona duas complicações.",
        inadequate: "Menciona uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Insuficiência Cardíaca Crônica (UID: 1167)
export const insuficienciaCardiacaCronicaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Eletrocardiograma (ECG)."
    ],
    descricao: [
      "Você recebe para consulta agendada um paciente masculino de 60 anos de idade, com queixas frequentes de falta de ar."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Eduardo, 60 anos, empresário, casado.",
      "MOTIVO DE CONSULTA: Ultimamente me sinto muito cansado, sem energia e com falta de ar.",
      "CARACTERÍSTICAS DA FALTA DE AR: Tempo de evolução: Começou há um ano. Intensidade: Quando caminho uns dois ou três quarteirões me da falta de ar e tenho que diminuir a velocidade ou parar pra respirar. Episódios noturnos: Sim, às vezes acordo de madrugada por causa da falta de ar. Progressão: Começou leve e sinto que ao longo desse ano piorou muito. Fatores de piora: Caminhar rápido e às vezes quando estou deitado. Fatores de melhora: Ficar sentado em repouso.",
      "SINTOMAS ACOMPANHANTES: Às vezes tenho uma tosse seca de noite quando já estou deitado. Negar outros sintomas perguntados.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho diabetes e minha pressão sempre foi um pouco mais alta. Cirurgias: Nega. Medicamentos: Único que tomo é a metformina. Alergias: Nega. Cartão de vacina: Faz muitos anos que não tomo nenhuma vacina, nem tenho mais o cartão.",
      "HÁBITOS: Cigarro: Um maço por dia há 15 anos. Drogas: Nega. Álcool: Vinho de vez em quando. Sono, urina, fezes e peso corporal: Nega alterações. Alimentação: Minha comida é bem salgada e não como muitas coisas saudáveis. Atividade física: Não realizo.",
      "ANTECEDENTES FAMILIARES: Pai: era diabético e morreu de infarto. Mãe: faleceu devido a câncer de mama."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Radiografia de tórax", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Ecocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dispneia:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Intensidade;",
        "(3) Progressão;",
        "(4) Fatores de melhora;",
        "(5) Fatores de piora;",
        "(6) Episódios noturnos."
      ],
      scoring: {
        adequate: "Investiga seis características.",
        partial: "Investiga de três a cinco características.",
        inadequate: "Investiga duas ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas associados:",
      subItems: [
        "(1) Alterações no peso corporal;",
        "(2) Edema de membros inferiores;",
        "(3) Dor torácica;",
        "(4) Noctúria."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças prévias;",
        "(2) Medicamentos;",
        "(3) Cigarro;",
        "(4) Álcool;",
        "(5) Alimentação;",
        "(6) Atividade física;",
        "(7) Cartão de vacina."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Pergunta sobre antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico geral.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita laboratório:",
      subItems: [
        "(1) Hemograma;",
        "(2) Perfil lipídico;",
        "(3) Sódio;",
        "(4) Potássio;",
        "(5) Função renal (ou ureia e creatinina);",
        "(6) TSH;",
        "(7) BNP ou NT-pro BNP."
      ],
      scoring: {
        adequate: "Solicita cinco dos itens listados (obrigatoriamente deve incluir o item sete).",
        partial: "Solicita o item sete e mais dois ou três itens da lista.",
        inadequate: "Investiga dois ou menos itens ou não solicita o item 7."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita eletrocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Solicita ecocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Realiza o diagnóstico de Insuficiência Cardíaca Crônica.",
      subItems: [],
      scoring: {
        adequate: "Realiza corretamente.",
        partial: "Realiza Insuficiência Cardíaca.",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica:",
      subItems: [
        "(1) Indicou beta bloqueador + IECA;",
        "(2) Atividade física regular;",
        "(3) Dieta normossódica OU evitar excesso de sódio;",
        "(4) Abandono do tabagismo;",
        "(5) Atualização do cartão de vacinas;",
        "(6) Adiciona glifozinas e espironolactona conforme tolerância."
      ],
      scoring: {
        adequate: "Realiza cinco ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Hipertensão Arterial Sistêmica | INEP 2023.1 (UID: 1171)
export const hipertensaoArterialSistemicaInep2023Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Unidade portátil para radiografia;",
      "- Eletrocardiograma."
    ],
    descricao: [
      "Você atende um homem, preto, hipertenso, em tratamento com enalapril 20 mg/dia e hidroclorotiazida 25 mg/dia, que retorna com queixa de pressão elevada. Na consulta anterior, foram solicitados exames complementares, mas o paciente não retornou na data agendada.",
      "",
      "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
      "O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
    ]
  },
  orientacoes: [
    "- Anamnese do paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Verbalizar os passos de uma correta aferição da pressão arterial;",
    "- Solicitar e interpretar os exames pertinentes ao caso;",
    "- Estabelecer e comunicar hipóteses diagnósticas;",
    "- Propor conduta para o paciente.",
    "",
    "ATENÇÃO! VOCÊ DEVERÁ REALIZAR AS TAREFAS NA SEQUÊNCIA DESCRITA ACIMA."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 47 anos, operador de caixa de supermercado.",
      "MOTIVO DE CONSULTA: Comecei a ter muita tosse, pensei que poderia ser uma virose, mas a tosse não passou.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: Algumas semanas. Secreção: Não, é uma tosse bem seca.",
      "OUTROS SINTOMAS: Não consta no script.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta há 6 meses. Até trouxe umas medidas da pressão arterial que o médico pediu pra eu fazer em casa e anotar os valores. Cirurgias: Nega. Medicamentos: Enalapril e hidroclorotiazida. Alergias: Desconhece.",
      "HÁBITOS: Cigarro: Nega. Drogas: Nega. Álcool: Cerveja nos fins de semana. Alimentação: Acho que não é muito boa, como muito salgadinho, doces e refrigerantes. Atividade física: Não faço por falta de tempo. Sono: Durmo umas 5 horas por noite.",
      "ANTECEDENTES FAMILIARES: Mãe: Diabética e hipertensa. Pai: Hipertenso e teve um infarto do coração. Irmã mais velha: Diabética e hipertensa."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório 1/2", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório 2/2", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Medida residencial da pressão arterial", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se e cumprimenta o paciente simulado;",
        "(2) Pergunta algum dado de identificação (nome, idade, estado civil, profissão e/ou naturalidade)."
      ],
      scoring: {
        adequate: "Realiza os dois procedimentos.",
        partial: "Realiza um dos procedimentos.",
        inadequate: "Não realiza procedimento algum."
      },
      scores: { min: 0, partial: 0.125, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sintomas relacionados à queixa principal:",
      subItems: [
        "(1) Dor torácica;",
        "(2) Febre;",
        "(3) Expectoração;",
        "(4) Dispneia;",
        "(5) Sintomas relacionados a DRGE (pirose, epigastralgia);",
        "(6) Manifestações de vias aéreas superiores (coriza, secreção pós-nasal)."
      ],
      scoring: {
        adequate: "Investiga de cinco a seis itens listados.",
        partial: "Investiga de três a quatro itens listados.",
        inadequate: "Investiga um ou dois itens OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.375, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre desencadeantes, agravantes e atenuantes da HAS e síndrome metabólica:",
      subItems: [
        "(1) Consumo de bebida alcoólica;",
        "(2) Tabagismo;",
        "(3) Qualidade do sono;",
        "(4) Atividade física;",
        "(5) Alimentação."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco dos itens listados.",
        partial: "Investiga até três itens.",
        inadequate: "Investiga um ou dois itens OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico geral.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico.",
        partial: "—",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Verbaliza adequadamente a técnica de aferição da pressão arterial:",
      subItems: [
        "(1) Posicionamento apropriado do paciente (sentado, pernas descruzadas e pés apoiados no chão);",
        "(2) Posicionamento apropriado do manguito;",
        "(3) Mensuração da pressão arterial sistólica pelo método palpatório;",
        "(4) Mensuração da pressão arterial pelo método auscultatório (sistólica e diastólica)."
      ],
      scoring: {
        adequate: "Verbaliza adequadamente as quatro etapas.",
        partial: "Verbaliza duas ou três ações.",
        inadequate: "Verbaliza uma etapa ou não verbaliza etapa alguma."
      },
      scores: { min: 0, partial: 0.625, max: 1.25 }
    },
    {
      id: 6,
      title: "6. Solicita exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) Lipidograma;",
        "(3) Glicose;",
        "(4) Creatinina;",
        "(5) Na;",
        "(6) K."
      ],
      scoring: {
        adequate: "Solicita quatro ou mais dos exames listados.",
        partial: "Solicita dois ou três dos exames listados.",
        inadequate: "Solicita um exame OU não solicita exame algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita e analisa o eletrocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita e associa as alterações do ECG à hipertensão.",
        partial: "Solicita, mas não associa corretamente os achados.",
        inadequate: "Não solicita o exame."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Interpreta o exame MRPA, identificando HAS sem controle.",
      subItems: [],
      scoring: {
        adequate: "Interpreta os achados identificando HAS sem controle.",
        partial: "—",
        inadequate: "Não interpreta os achados."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 9,
      title: "9. Formula hipóteses diagnósticas:",
      subItems: [
        "(1) Tosse associada ao uso de Enalapril;",
        "(2) Confirma o diagnóstico de hipertensão descompensada."
      ],
      scoring: {
        adequate: "Formula as duas hipóteses.",
        partial: "Formula uma das hipóteses.",
        inadequate: "Não formula hipótese alguma."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 10,
      title: "10. Orientação sobre mudanças de estilo de vida (MEV):",
      subItems: [
        "(1) Redução do peso;",
        "(2) Redução do sódio na dieta;",
        "(3) Redução da ingesta de álcool;",
        "(4) Atividade física regular."
      ],
      scoring: {
        adequate: "Orienta as quatro medidas listadas.",
        partial: "Orienta duas ou três das medidas listadas.",
        inadequate: "Orienta uma medida listada OU não orienta medida alguma."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 11,
      title: "11. Conduta medicamentosa:",
      subItems: [
        "(1) Prescreve combinação de anti-hipertensivos, preferencialmente bloqueador receptor + bloqueador de canal de cálcio;",
        "(2) Suspende enalapril."
      ],
      scoring: {
        adequate: "Executa as duas condutas listadas.",
        partial: "Executa uma conduta listada.",
        inadequate: "Não executa conduta listada alguma."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Asma | INEP 2023.1 (UID: 1172)
export const asmaInep2023Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Aparelhos para exames radiológicos convencionais (Raio-x)."
    ],
    descricao: [
      "Homem de 34 anos de idade, operário da indústria têxtil, procura atendimento na unidade com queixa de episódios frequentes de falta de ar.",
      "",
      "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
      "O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
    ]
  },
  orientacoes: [
    "- Anamnese do paciente;",
    "- Solicitar e interpretar exame físico;",
    "- Solicitar e interpretar os exames pertinentes;",
    "- Estabelecer e comunicar hipótese diagnóstica;",
    "- Propor conduta para o paciente e fornecer orientações."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Pedro, 34 anos, casado, trabalhador da indústria têxtil.",
      "MOTIVO DE CONSULTA: Estou sentindo muita tosse e falta de ar há cerca de 5 meses.",
      "CARACTERÍSTICAS DA TOSSE: Secreção: Não, é uma tosse seca.",
      "CARACTERÍSTICAS DA DISPNEIA: Frequência: Duas a três vezes por semana. Fatores desencadeantes: Quando vou para o trabalho e quando jogo bola. Fatores de melhora: Quando volto do trabalho me sinto melhor e nos finais de semana que estou de folga não sinto nada. Fatores de piora: Sempre que estou no trabalho é pior. Despertar noturno por falta de ar: Nega.",
      "PRESENÇA DE SIBILOS: Sim, mas nunca havia tido esse tipo de sintoma antes desses 5 meses.",
      "USO DE MEDICAMENTOS PARA ALIVIAR OS SINTOMAS: Não.",
      "SE PERGUNTADO PELA FUNÇÃO NO TRABALHO: Eu trabalho no preparo de tintas e tingimento de tecidos há 1 ano, antes trabalhava na segurança da empresa.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Que eu saiba não, mas quando fui trabalhar no setor de tingimento, meus olhos e nariz passaram a coçar muito. Quando eu era criança espirrava muito quando brincava com meu gato, mas hoje já não tenho animais em casa. Cigarro: Não fumo e nem tenho contato com pessoas que fumam. Exposição a outros poluentes: Nega. Cartão de vacina: Atualizado, incluindo gripe e COVID.",
      "ANTECEDENTES FAMILIARES: Meu pai tinha muita alergia e um chiado constante no peito."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório 1/2", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório 2/2", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Espirometria", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.125, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre os sintomas e suas características nas crises:",
      subItems: [
        "(1) Pergunta sobre a presença de sibilância;",
        "(2) Caracteriza a tosse (produtiva OU não produtiva);",
        "(3) Caracteriza a dispneia."
      ],
      scoring: {
        adequate: "Investiga dois ou mais achados clínicos listados.",
        partial: "Investiga um achado clínico.",
        inadequate: "Não investiga achado clínico algum entre os listados."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre desencadeantes, agravantes e atenuantes:",
      subItems: [
        "(1) Uso de medicamentos que causam tosse ou se relacionam à piora de broncoespasmo;",
        "(2) Uso de medicamentos para alívio dos sintomas;",
        "(3) Relação dos sintomas com o trabalho ou agentes ambientais;",
        "(4) Relação com a atividade física;",
        "(5) Cronologia das crises (início, duração, períodos intercríticos)."
      ],
      scoring: {
        adequate: "Investiga três ou mais achados, incluindo obrigatoriamente o item 3.",
        partial: "Investiga o item 3 e mais um achado.",
        inadequate: "Não investiga o item 3 OU investiga apenas o item 3 OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico.",
        partial: "—",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita hemograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Relaciona os achados da Espirometria ao diagnóstico de asma.",
      subItems: [],
      scoring: {
        adequate: "Relaciona.",
        partial: "—",
        inadequate: "Não relaciona."
      },
      scores: { min: 0, partial: 0, max: 1.3 }
    },
    {
      id: 8,
      title: "8. Formula hipótese diagnóstica de asma brônquica.",
      subItems: [],
      scoring: {
        adequate: "Formula o diagnóstico.",
        partial: "—",
        inadequate: "Não formula o diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Orienta sobre alguma das seguintes medidas de redução de exposição ambiental domiciliar e no ambiente de trabalho.",
      subItems: [],
      scoring: {
        adequate: "Orienta.",
        partial: "—",
        inadequate: "Não orienta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica: Prescreve corticoide inalatório associado ou não a beta-agonista.",
      subItems: [],
      scoring: {
        adequate: "Prescreve.",
        partial: "—",
        inadequate: "Não prescreve."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 11,
      title: "11. Orienta que o paciente mantenha o acompanhamento ambulatorial.",
      subItems: [],
      scoring: {
        adequate: "Orienta.",
        partial: "—",
        inadequate: "Não orienta."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 12,
      title: "12. Executa as tarefas na ordem determinada.",
      subItems: [],
      scoring: {
        adequate: "Executa as etapas na ordem determinada.",
        partial: "—",
        inadequate: "Não executa as etapas na ordem determinada."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    }
  ],
  references: []
};

// Content for DPOC – Diagnóstico (UID: 1175)
export const dpocDiagnosticoContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia convencional e ultrassonografia."
    ],
    descricao: [
      "Você é o médico responsável por uma Equipe de Saúde da Família (ESF) e recebe para consulta um paciente masculino de 65 anos de idade."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Roberto, 65 anos de idade, casado, policial civil aposentado.",
      "MOTIVO DE CONSULTA: Queria algum remédio pra essa tosse que não me deixa descansar.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: Faz muito tempo que tenho tosse, uns 7 anos mais ou menos. Porém desde o ano passado sinto que aumentou bastante. Presença de secreção: Sim, sempre tem secreção.",
      "SINTOMAS ACOMPANHANTES: Também sinto falta de ar há muitos anos.",
      "SE INVESTIGADO A INTENSIDADE E/OU MOMENTO DE APARIÇÃO DA DISPNEIA: Quando estou caminhando no meu ritmo preciso parar de vez em quando pra respirar melhor. Negar qualquer outro sintoma perguntado.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Internações prévias: Ano passado tive uma crise de falta de ar, mas não precisei ficar internado. Cirurgias: Nega. Medicamentos: Às vezes tomo remédio para dor na coluna. Alergias: Nega. Cartão de vacina: Não tenho, faz muitos anos que não tomo nenhuma vacina.",
      "HÁBITOS: Álcool: De vez em quando tomo cachaça. Cigarro: Sim, fumo desde os 25 anos de idade, 2 maços por dia mais ou menos. Drogas: Nega. Urina, fezes e peso corporal: Nega alterações. Sono: Durmo mal por causa da tosse e no outro dia estou sem energia."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Radiografia de tórax", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Espirometria", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investigou os seguintes itens:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Presença de secreção e/ou sangue;",
        "(3) Grau de dispneia;",
        "(4) Febre."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Medicamentos;",
        "(3) Tabagismo;",
        "(4) Drogas;",
        "(5) Cartão de vacina;",
        "(6) Ocupação/profissão."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita espirometria.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de doença pulmonar obstrutiva crônica (DPOC).",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Tratamento com beta 2 agonista de longa duração (LABA) + antimuscarínico de longa duração (LAMA);",
        "(2) Reabilitação pulmonar;",
        "(3) Atualização do cartão de vacina;",
        "(4) Oferece apoio para cessar o tabagismo."
      ],
      scoring: {
        adequate: "Realiza quatro tarefas.",
        partial: "Realiza duas ou três tarefas.",
        inadequate: "Realiza uma ou nenhuma tarefa."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Doença de Parkinson (UID: 1176)
export const doencaParkinsonContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você recebe para consulta agendada um paciente do sexo masculino, 72 anos de idade, acompanhado por seu cuidador."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Citar ao menos 2 diagnósticos diferenciais;",
    "- Orientar sobre medidas terapêuticas iniciais e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Júlio, 72 anos de idade, aposentado, viúvo.",
      "MOTIVO DE CONSULTA: Estou com dificuldade pra caminhar e fazer as tarefas do dia a dia, sinto que já não sou mais produtivo como antes e estou muito lento pra fazer as coisas.",
      "CARACTERÍSTICA DO QUADRO: Tempo de evolução: Já faz 1 ano que comecei a ficar assim. Momentos em que aparecem os sintomas/duração: Estou assim o tempo todo praticamente. Progressão: Sinto que está piorando.",
      "SINTOMAS ASSOCIADOS: Sinto que meu corpo está muito duro, minhas mãos ficam tremendo quando estou parado; antes era só a direita e agora as duas. Também não estou com muita confiança para caminhar, às vezes penso que vou cair pra frente. Negar outros sintomas perguntados.",
      "SE PERGUNTADO POR QUEDAS: Tive uma queda da própria altura há 2 anos porque tropecei em um tapete.",
      "ANTECEDENTES PESSOAIS: Doenças: Hipertensão arterial, hiperplasia prostática benigna. Cirurgias: Retirada da vesícula biliar aos 45 anos de idade. Medicamentos: Enalapril, hidroclorotiazida e tansulosina. Alergias: Nega.",
      "HÁBITOS: Álcool: Nega. Cigarro: Nega. Drogas: Nega. Fezes, urina, sono, peso corporal: Nega alterações. Cartão de vacina: Atualizado.",
      "ANTECEDENTES FAMILIARES: Não sabe informar."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza perguntas sobre:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Duração ou momento de aparição;",
        "(3) Progressão;",
        "(4) Quedas;",
        "(5) Alterações na personalidade ou comportamento ou humor."
      ],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos;",
        "(4) Alergias;",
        "(5) Drogas ilícitas;",
        "(6) Álcool."
      ],
      scoring: {
        adequate: "Investiga cinco ou seis itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investigou."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) exame físico geral e (2) exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicitou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Realiza a hipótese diagnóstica de Doença de Parkinson.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Verbaliza diagnósticos diferenciais:",
      subItems: [
        "(1) Demência por corpúsculos de Lewy;",
        "(2) Parkinsonismo induzido por medicamentos;",
        "(3) Parkinsonismo de origem vascular;",
        "(4) Atrofia multisistêmica;",
        "(5) Paralisia supranuclear progressiva;",
        "(6) Tremor essencial."
      ],
      scoring: {
        adequate: "Verbaliza dois ou mais diagnósticos diferenciais.",
        partial: "Verbaliza apenas um diagnóstico diferencial.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica inicial:",
      subItems: [
        "(1) Encaminha o paciente ao neurologista;",
        "(2) Indicou levodopa + carbidopa OU levodopa + benserazida."
      ],
      scoring: {
        adequate: "Realiza duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 1.75 }
    }
  ],
  references: []
};

// Content for Doença Celíaca (UID: 1177)
export const doencaCeliacaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Serviço de endoscopia."
    ],
    descricao: [
      "Você recebe para consulta agendada uma paciente do sexo feminino, 28 anos de idade, estudante."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais e acompanhamento clínico;",
    "- Resolver as dúvidas da paciente se houver."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Aline, 28 anos de idade, estudante, solteira.",
      "MOTIVO DE CONSULTA: Consulto porque estou tendo muita diarreia.",
      "CARACTERÍSTICAS DO QUADRO: Tempo de evolução: Quatro meses. Consistência das fezes: Pastosa e às vezes líquida. Elementos anormais nas fezes: percebi que às vezes sai meio amarelada. Frequência: Geralmente umas 4 vezes por dia.",
      "SINTOMAS ACOMPANHANTES: Também estou tendo muitos gases, a barriga parece que está sempre inchada e estou emagrecendo. Negar outros sintomas perguntados.",
      "SE PERGUNTADO SOBRE A RELAÇÃO DA DIARREIA COM O CONSUMO DE ALIMENTOS OU ÁGUA: Sempre que como pães, bolos, macarrão, sorvete ou tomo cerveja tenho diarreia. Os dias que eu não como esses alimentos, me sinto bem melhor.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Internações: Nega. Medicamentos: Anticoncepcional oral. Alergias: Nega. Data da última menstruação: Há 20 dias. Viagens recentes: Nega. Cartão de vacina: Atualizado.",
      "HÁBITOS: Álcool: De vez em quando tomo cerveja e vinho. Cigarro: Nega. Drogas: Nega. Alimentação: Variada.",
      "ANTECEDENTES FAMILIARES: Irmão mais novo tem diabetes tipo 1.",
      "AO RECEBER O DIAGNÓSTICO DE DOENÇA CELÍACA, PERGUNTAR: Por que apareceu essa doença doutor(a)? Sempre comi esse tipo de alimento e nunca tive nada."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Parasitológico de fezes", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Anticorpos", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Endoscopia digestiva alta com biopsia", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características do quadro:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Número de episódios;",
        "(3) Consistência das fezes;",
        "(4) Presença de sangue, pus ou gordura nas fezes;",
        "(5) Sintomas associados."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Investiga a relação entre alimentos ou água consumida com os episódios de diarreia.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Uso de medicamentos;",
        "(4) Alergias."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita análise de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita:",
      subItems: [
        "(1) Anticorpos antitransglutaminase OU antiendomísio OU antigliadina;",
        "(2) IgA total."
      ],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas o item 1.",
        inadequate: "Não solicita o item 1 ou item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1.75 }
    },
    {
      id: 9,
      title: "9. Solicita parasitológico de fezes.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Solicita endoscopia digestiva alta (EDA) com biopsia do duodeno.",
      subItems: [],
      scoring: {
        adequate: "Solicita (necessariamente deve incluir biopsia).",
        partial: "—",
        inadequate: "Não solicita EDA ou não menciona biopsia."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 11,
      title: "11. (1) Realiza o diagnóstico de doença celíaca e (2) explica a relação da doença com alguns alimentos.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza o diagnóstico mas não explica a relação.",
        inadequate: "Não realiza corretamente o diagnóstico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica:",
      subItems: [
        "(1) Explica que o tratamento consiste na dieta isenta de glúten;",
        "(2) Orienta consulta com nutricionista;",
        "(3) Solicita retorno entre quatro e seis semanas para nova avaliação;",
        "(4) Pergunta se a paciente tem dúvidas."
      ],
      scoring: {
        adequate: "Realiza quatro tarefas.",
        partial: "Realiza duas ou três tarefas.",
        inadequate: "Realiza uma ou nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    }
  ],
  references: []
};

// Content for Síndrome de Guillain Barré (UID: 1178)
export const sindromeGuillainBarreContent: ChecklistContent = {
  scenario: {
    nivel: "Terciário",
    tipo: "Ambulatorial e hospitalar",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios;",
      "- Laboratórios;",
      "- Setor de Eletromiografia;",
      "- Serviços de Hemoterapia/Hemocentros."
    ],
    descricao: [
      "Você é o médico de plantão em um hospital de terceiro nível de atenção e recebe para consulta um paciente de 40 anos, com queixas de fraqueza nos membros inferiores.",
      "Dados da triagem: PA: 115x75 mmHg. FC: 92 bpm. FR: 16 irpm. Temperatura axilar: 36.2. Saturação: 98%."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa do paciente;",
    "- Realizar exame físico direcionado à queixa do paciente;",
    "- Solicitar demais exames pertinentes ao caso;",
    "- Formular o diagnóstico específico e ao menos dois diagnósticos diferenciais;",
    "- Estabelecer a conduta adequada;",
    "- Verbalizar ao menos duas complicações do quadro."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcos, 40 anos de idade, mecânico, casado.",
      "MOTIVO DE CONSULTA: Estou com fraqueza nas pernas e dificuldade pra caminhar.",
      "CARACTERÍSTICAS DO QUADRO: Tempo de evolução: Duas semanas. Forma início: Começou aos poucos. Progressão: Sinto que está aumentando a fraqueza porque agora estou com dificuldade pra caminhar. Episódios anteriores: Nega. Fraqueza em outras partes do corpo: Nega.",
      "SINTOMAS ACOMPANHANTES: Sinto formigamento nas mãos e pés que também começou há 2 semanas. Negar qualquer outro sintoma perguntado.",
      "SE PERGUNTADO POR INFECÇÕES PRÉVIAS: Há 3 semanas tive muita diarreia mas já estou melhor.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias prévias: Nega. Medicamentos: Nega. Alergias: Nega. Viagens recentes: Nega. Cartão de vacina: Atualizado.",
      "HÁBITOS: Álcool: Cerveja de vez em quando. Cigarro: Nega. Drogas: Nega. Fezes, urina, sono, peso corporal: Nega alterações.",
      "ANTECEDENTES FAMILIARES: Pais e irmã sem problemas de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Eletroneuromiografia", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Punção lombar/análise LCR", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Cumprimenta o paciente;", "(2) Identifica-se e pergunta o nome do paciente;", "(3) Pergunta o motivo da consulta ou a queixa principal do paciente."],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza apenas uma ou duas ações.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características do quadro apresentado:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Forma de início;",
        "(3) Progressão;",
        "(4) Outros segmentos afetados;",
        "(5) Episódios anteriores;",
        "(6) Sinais e sintomas acompanhantes."
      ],
      scoring: {
        adequate: "Investiga seis características.",
        partial: "Investiga de três a cinco características.",
        inadequate: "Investiga duas ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos;",
        "(4) Uso de drogas ilícitas;",
        "(5) Cartão de vacina;",
        "(6) Viagens recentes;",
        "(7) Infecção prévia ao início dos sintomas."
      ],
      scoring: {
        adequate: "Investiga sete características.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Pergunta por antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Pergunta antecedentes familiares.",
        partial: "—",
        inadequate: "Não pergunta antecedentes familiares."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Solicita:",
      subItems: ["(1) Exame físico geral;", "(2) Exame neurológico."],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita exame físico geral mas não menciona exame neurológico.",
        inadequate: "Não solicita nenhuma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita eletroneuromiografia.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Solicita punção lombar OU análise do LCR.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de síndrome de Guillain Barré OU polirradiculoneuropatia inflamatória desmielinizante aguda.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 10,
      title: "10. Verbaliza diagnósticos diferenciais:",
      subItems: [
        "(1) Miastenia grave;",
        "(2) Polirradiculoneuropatia inflamatória desmielinizante crônica;",
        "(3) Miopatias;",
        "(4) Doença medular aguda;",
        "(5) Doença de Lyme;",
        "(6) Tóxicos;",
        "(7) Medicamentos."
      ],
      scoring: {
        adequate: "Verbaliza dois ou mais diagnósticos diferenciais.",
        partial: "Verbaliza apenas um diagnóstico diferencial.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Indica tratamento com plasmaférese OU imunoglobulina humana.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Verbaliza possíveis complicações:",
      subItems: [
        "(1) Insuficiência respiratória;",
        "(2) Arritmias;",
        "(3) Retenção urinária;",
        "(4) Trombose venosa;",
        "(5) Pneumonia aspirativa;",
        "(6) Embolia pulmonar;",
        "(7) Sepse hospitalar;",
        "(8) Parada cardíaca."
      ],
      scoring: {
        adequate: "Verbaliza quatro complicações.",
        partial: "Verbaliza duas ou três complicações.",
        inadequate: "Não verbaliza nenhuma complicação."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    }
  ],
  references: []
};

// Content for Celulite Infecciosa (UID: 1192)
export const celuliteInfecciosaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você atende o paciente do sexo masculino, 40 anos de idade, com queixa de dor no membro inferior direito."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Citar ao menos 2 diagnósticos diferenciais;",
    "- Orientar medidas terapêuticas;",
    "- Citar ao menos uma possível complicação do quadro.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Carlos, 40 anos de idade, pedreiro, casado.",
      "MOTIVO DE CONSULTA: Estou com uma dor aqui na perna.",
      "CARACTERÍSTICAS DA DOR: Início: Há 3 dias. Localização: Na minha perna direita. Intensidade: É uma dor moderada (5/10) desde o começo. Progressão: Não piorou nem melhorou. Tipo de dor: Pontadas. Irradiação: Nega. Fatores de melhora: Tomei diclofenaco e aliviou um pouco, mas continua doendo. Fatores de piora: Nega. Episódios anteriores: Nega.",
      "SE PERGUNTADO POR TRAUMA, CORTE OU PICADA DE INSETO: Eu tive um corte na perna há uma semana enquanto trabalhava.",
      "SINTOMAS ACOMPANHANTES: Apareceu uma mancha no mesmo lugar da dor. Tempo de evolução: Um dia. Prurido/coceira: Nega. Descamação: Nega. Saída de secreção: Nega. Temperatura local: Percebi que está quente no local. Contato com materiais irritantes: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Tenho alergia à penicilina. Uma vez fui internado porque tive anafilaxia. Cirurgias: De hérnia inguinal há 7 anos. Cartão de vacina: Atualizado.",
      "HÁBITOS: Álcool: Nos fins de semana. Cigarro: Um maço por dia. Drogas: Nega. Atividade física: Futebol nos fins de semana. Urina e fezes: Sem alterações.",
      "ANTECEDENTES FAMILIARES: Pai, mãe e irmãos: sem problemas de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Avaliação do membro inferior/mancha", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Localização;",
        "(3) Intensidade;",
        "(4) Progressão;",
        "(5) Tipo de dor;",
        "(6) Irradiação;",
        "(7) Fatores de melhora;",
        "(8) Fatores de piora;",
        "(9) Episódios anteriores;",
        "(10) Sintomas associados."
      ],
      scoring: {
        adequate: "Investiga sete ou mais itens.",
        partial: "Investiga de quatro a seis itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta se houve trauma local OU corte OU picada de inseto OU contato com substâncias irritantes.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Uso de drogas ilícitas;",
        "(4) Medicamentos;",
        "(5) Alergias;",
        "(6) Cartão de vacinas."
      ],
      scoring: {
        adequate: "Investiga seis itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. (1) Solicita exame físico e (2) descreve os achados da imagem: lesão eritematosa com limites mal definidos.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Solicita o exame físico mas não descreveu adequadamente a lesão.",
        inadequate: "Não realizou nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 6,
      title: "6. Realiza o diagnóstico de celulite infecciosa.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Verbaliza ao menos dois dos seguintes diagnósticos diferenciais: erisipela, fasciíte necrotizante, traumatismo, picada de inseto, dermatite de contato, trombose venosa profunda.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza dois diagnósticos diferenciais.",
        partial: "Verbaliza apenas um diagnóstico diferencial.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 8,
      title: "8. Conduta terapêutica:",
      subItems: [
        "(1) Tratamento ambulatorial com clindamicina via oral;",
        "(2) Analgésicos e/ou AINEs;",
        "(3) Retorno em 48 a 72 horas para nova avaliação;",
        "(4) Orientou sobre pautas de alarme para retorno imediato."
      ],
      scoring: {
        adequate: "Realiza quatro itens.",
        partial: "Realiza dois ou três itens.",
        inadequate: "Realiza um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Não indica antibióticos do grupo beta-lactâmico devido ao histórico de alergia grave à penicilina.",
      subItems: [],
      scoring: {
        adequate: "Não indica nenhum antibiótico do grupo beta-lactâmico.",
        partial: "—",
        inadequate: "Indica algum antibiótico do grupo beta-lactâmico."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Informa ao menos uma das seguintes complicações: fasciíte necrotizante, osteomielite, sepse, formação de abscessos.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "—",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Endocardite Infecciosa (UID: 1201)
export const endocarditeInfecciosaContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção terciária à saúde",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clínicas;",
      "- Serviço de radiologia convencional;",
      "- Unidade de terapia intensiva (UTI) e leitos de internação."
    ],
    descricao: [
      "Você é o(a) médico(a) de plantão, e irá realizar o atendimento de um paciente de 35 anos de idade com queixa de febre."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar exames complementares, se necessário;",
    "- Formular e verbalizar a hipótese diagnóstica definitiva;",
    "- Indicar a conduta terapêutica adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Felipe, 35, casado, comerciante.",
      "MOTIVO DE CONSULTA: Estou tendo muita febre.",
      "CARACTERÍSTICAS DA FEBRE: Início: Faz duas semanas que estou tendo febre. Frequência: Todos os dias. Momento de aparição: De tarde e de noite. Fatores de melhora: Tomo remédio mas depois a febre sempre volta.",
      "SINTOMAS ACOMPANHANTES: Estou me sentindo muito decaído e apareceu umas manchas na minha mão e no meu pé.",
      "CARACTERÍSTICAS DAS MANCHAS: Tempo de evolução: As manchas apareceram há uns 3 dias. Descamação: Não descamam. Secreção: Não apresentam secreção. Dor: Só a mancha do pé que dói.",
      "ANTECEDENTES PESSOAIS: Doenças prévias: Não tenho nenhuma doença. Cirurgias: Nunca fiz nenhuma cirurgia. Uso de medicamentos: Nega. Alergias: Nega. Cartão de vacina: Não trouxe mas está atualizado. Viagens recentes: Nega.",
      "HÁBITOS: Uso de drogas: Uso cocaína. Via de administração da cocaína: Injetável. Álcool: Cerveja. Cigarro: Não fumo. Atividade física: Não realiza. Alimentação: Variada. Sono, urina e fezes: Sem alterações. Peso: Sem alterações.",
      "ANTECEDENTES FAMILIARES: Mãe hipertensa. Pai sem doenças."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Inspeção das mãos", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Inspeção dos pés", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Hemocultura", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Ecocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da febre:",
      subItems: [
        "(1) Tempo de início;",
        "(2) Valores de temperatura obtidos;",
        "(3) Se é persistente ou intermitente;",
        "(4) Fatores de melhora;",
        "(5) Momentos de aparição."
      ],
      scoring: {
        adequate: "Investiga quatro ou cinco características da febre.",
        partial: "Investiga duas ou três características.",
        inadequate: "Investiga uma ou nenhuma característica."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por sinais/sintomas acompanhantes.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não perguntou."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investigou antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Cirurgias;",
        "(3) Medicamentos;",
        "(4) Alergias;",
        "(5) Uso de drogas ilícitas e via de administração;",
        "(6) Cartão de vacinas;",
        "(7) Viagens recentes."
      ],
      scoring: {
        adequate: "Investiga de cinco a sete itens.",
        partial: "Investiga ao menos quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita:",
      subItems: ["(1) Exame físico geral;", "(2) Ectoscopia das lesões."],
      scoring: {
        adequate: "Solicita os dois itens.",
        partial: "—",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Identifica e verbaliza o achado semiológico da mão: lesões de Janeway.",
      subItems: [],
      scoring: {
        adequate: "Identifica e verbaliza corretamente.",
        partial: "—",
        inadequate: "Não identifica nem verbaliza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Identifica e verbaliza o achado semiológico do pé: nódulos de Osler.",
      subItems: [],
      scoring: {
        adequate: "Identifica e verbaliza corretamente.",
        partial: "—",
        inadequate: "Não identifica nem verbaliza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita os exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Ureia e/ou creatinina;",
        "(4) Sódio e potássio;",
        "(5) Hemocultura (mínimo de 2 amostras)."
      ],
      scoring: {
        adequate: "Solicita todos os itens.",
        partial: "Investiga ao menos quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Verbaliza os achados do laboratório: leucocitose com desvio à esquerda e PCR aumentada.",
      subItems: [],
      scoring: {
        adequate: "Verbalizou os dois achados.",
        partial: "Verbaliza apenas um achado.",
        inadequate: "Não verbaliza nenhum achado."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 10,
      title: "10. Solicita ecocardiograma transtorácico e/ou transesofágico e/ou tomografia computadorizada do coração.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 11,
      title: "11. Realiza o diagnóstico de endocardite infecciosa.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 1, max: 1.25 }
    },
    {
      id: 12,
      title: "12. Realiza a indicação da conduta terapêutica adequada:",
      subItems: [
        "(1) Tratamento antibiótico endovenoso com vancomicina;",
        "(2) Antitérmico;",
        "(3) Internação."
      ],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza apenas o item 1.",
        inadequate: "Não realiza o item 1."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Transtorno do Pânico (UID: 1202)
export const transtornoPanicoContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você atende uma paciente de 27 anos de idade, solteira, vendedora."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ângela, 27 anos, solteira, vendedora.",
      "MOTIVO DE CONSULTA: Está acontecendo uma coisa estranha comigo. Do nada eu começo a ficar ansiosa, desesperada e com medo das coisas.",
      "SE PERGUNTADO POR SINTOMAS ATUAIS: Negar (a paciente está assintomática no momento).",
      "CARACTERÍSTICAS DOS EPISÓDIOS: Início: Comecei a ter isso há 4 meses. Frequência: Acontece umas duas vezes por mês. Duração das crises: Dura alguns minutos. Fatores desencadeantes: Não sei doutor(a), acontece do nada, quando eu menos espero.",
      "SINTOMAS ASSOCIADOS: Me dá uma sensação de morte, que vou enlouquecer e perder o controle. Depois começo a transpirar muito, tremer e o coração fica acelerado. Outros sintomas: Nega.",
      "SE PERGUNTADO POR ALTERAÇÕES NA ROTINA POR MEDO DAS CRISES: Nos últimos 2 meses estou evitando sair na rua com medo de acontecer de novo e não saber o que fazer.",
      "SE PERGUNTADO POR ALTERAÇÕES NO HUMOR: Responder que não. SE PERGUNTADO POR IDEAÇÃO SUICIDA: Responder que não. SE PERGUNTADO POR TRAUMA PSICOLÓGICO OU PROBLEMAS FAMILIARES/SOCIAIS/TRABALHO: Responder que não.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Internação prévia: Nega. Medicamentos: Anticoncepcional oral. Alergias: Que eu saiba não.",
      "HÁBITOS: Álcool: De vez em quando tomo cerveja, mas muito pouco. Drogas: Nega. Cigarro: Nega. Sono, urina, fezes: Nega alterações.",
      "ANTECEDENTES FAMILIARES: Pai, mãe e irmãos sem problemas de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Ouve atentamente a paciente simulada sem interrompê-la.",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 3,
      title: "3. Realiza anamnese, perguntando sobre as características da queixa inicial:",
      subItems: [
        "(1) Início das crises;",
        "(2) Frequência das crises;",
        "(3) Duração dos episódios;",
        "(4) Sintomas associados às crises."
      ],
      scoring: {
        adequate: "Investiga quatro características.",
        partial: "Investiga dois ou três características.",
        inadequate: "Investiga uma ou nenhuma característica."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 4,
      title: "4. Investiga:",
      subItems: [
        "(1) Medo de ter novas crises e/ou mudança de comportamento/rotina por causa dos ataques;",
        "(2) Traumas psicológicos ou conflitos sociais, familiares, no trabalho;",
        "(3) Alterações no humor: tristeza excessiva e/ou momentos de euforia;",
        "(4) Ideação suicida."
      ],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.75 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Comorbidades ou doenças conhecidas;",
        "(2) Uso de medicamentos;",
        "(3) Alergias;",
        "(4) Uso de drogas ilícitas;",
        "(5) Álcool;",
        "(6) Tabagismo;",
        "(7) Sono."
      ],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Investiga sobre história familiar de transtorno mental.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita exames laboratoriais:",
      subItems: [
        "(1) Hemograma;",
        "(2) TSH;",
        "(3) T4 livre;",
        "(4) Glicemia;",
        "(5) Ureia;",
        "(6) Creatinina;",
        "(7) Sódio;",
        "(8) Cálcio;",
        "(9) Potássio;",
        "(10) Eletrocardiograma."
      ],
      scoring: {
        adequate: "Solicita seis ou mais exames.",
        partial: "Solicita três ou quatro exames.",
        inadequate: "Solicita dois ou menos exames."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 9,
      title: "9. Formula a hipótese diagnóstica: Transtorno do pânico.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Indica tratamento com psicoterapia (terapia cognitivo-comportamental);",
        "(2) Inibidores seletivos da recaptação de serotonina (ISRS);",
        "(3) Orienta sobre hábitos saudáveis;",
        "(4) Solicita retorno para nova avaliação."
      ],
      scoring: {
        adequate: "Realiza três ou mais ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Solicita:",
      subItems: ["(1) Apoio da E-multi;", "(2) Apoio de psiquiatria."],
      scoring: {
        adequate: "Solicita os dois apoios.",
        partial: "Solicita somente um apoio.",
        inadequate: "Não solicita nenhum apoio."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Content for Gota (UID: 1203)
export const gotaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Ultrassonografia."
    ],
    descricao: [
      "Você recebe para atendimento um paciente de 40 anos queixando-se de dor no pé."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Verbalizar ao menos 2 diagnósticos diferenciais;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcos, 40 anos, caminhoneiro, casado.",
      "MOTIVO DE CONSULTA: Estou com muita dor no pé direito.",
      "CARACTERÍSTICAS DA DOR: Início da dor: Começou há 12 horas. Localização: Dói no dedão do pé direito. Intensidade: Forte intensidade (8/10). Progressão: Começou leve e agora está pior. Tipo de dor: Latejante. Irradiação: Nega. Fatores de melhora: Tomei ibuprofeno e aliviou um pouco mas continua doendo. Fatores de piora: Apoiar o pé e caminhar. Episódios anteriores: Já aconteceu várias vezes. Só no ano passado tive duas vezes esse tipo de dor. Outras articulações afetadas: Nega.",
      "SE PERGUNTADO POR TRAUMATISMO, CORTE OU PICADURA DE INSETO: Nega.",
      "SINTOMAS ACOMPANHANTES: Calor local: Sim. Edema: Sim. Vermelhidão: Sim. Febre: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Hipertensão arterial há 11 anos. Cirurgias: Nega. Medicamentos: Enalapril e anlodipino. Alergias: Nega. Cartão de vacina: Atualizado.",
      "HÁBITOS: Álcool: Cerveja, duas latas por dia. Cigarro: Um maço por dia. Drogas: Nega. Alimentação: Costumo comer alimentos gordurosos e com muito sal. Atividade física: De vez em quando. Fezes e urina: Nega alterações.",
      "ANTECEDENTES FAMILIARES: Pai morreu de infarto há 2 anos. Mãe diabética."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame do pé direito", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Radiografia/USG da articulação", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Análise do líquido sinovial", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor:",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Localização;",
        "(3) Intensidade;",
        "(4) Progressão;",
        "(5) Tipo de dor;",
        "(6) Fatores de melhora;",
        "(7) Fatores de piora;",
        "(8) Sintomas acompanhantes."
      ],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por:",
      subItems: [
        "(1) Traumatismo ou corte ou picadura de inseto no local;",
        "(2) Outras articulações afetadas;",
        "(3) Episódios anteriores."
      ],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga um ou dois itens.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Alergias;",
        "(4) Ingestão de álcool;",
        "(5) Tipo de alimentação;",
        "(6) Atividade física."
      ],
      scoring: {
        adequate: "Investiga cinco ou seis itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. (1) Solicita exame físico geral e (2) identifica sobrepeso e aumento da circunferência abdominal.",
      subItems: [],
      scoring: {
        adequate: "Solicita e identifica as duas alterações.",
        partial: "Solicita exame físico mas não verbaliza as duas alterações.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. (1) Solicita exame específico da articulação/pé e (2) verbaliza a presença de sinais inflamatórios na articulação afetada.",
      subItems: [],
      scoring: {
        adequate: "Solicita o exame específico do pé e interpreta os achados.",
        partial: "Solicita mas não interpretou os achados.",
        inadequate: "Não solicita exame do pé/articulação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita laboratório:",
      subItems: [
        "(1) Hemograma completo;",
        "(2) PCR e/ou VHS;",
        "(3) Função renal;",
        "(4) Ácido úrico."
      ],
      scoring: {
        adequate: "Solicita quatro itens.",
        partial: "Solicita dois ou três itens.",
        inadequate: "Solicita apenas um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita Artrocentese ou análise do líquido sinovial.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Solicita radiografia OU ultrassonografia da articulação afetada.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de gota OU artrite gotosa aguda OU crise de gota OU artropatia por depósito de cristais de urato monossódico.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Verbaliza diagnósticos diferenciais:",
      subItems: [
        "(1) Artrite séptica;",
        "(2) Doença por depósito de pirofosfato de cálcio;",
        "(3) Infecção de pele;",
        "(4) Bursite;",
        "(5) Trauma."
      ],
      scoring: {
        adequate: "Verbaliza dois ou mais diagnósticos diferenciais.",
        partial: "Verbaliza um diagnóstico diferencial.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica:",
      subItems: [
        "(1) Tratamento da crise de dor com colchicina OU AINEs OU corticoides sistêmicos OU corticoide intra-articular;",
        "(2) Orienta sobre medidas higiênico dietéticas;",
        "(3) Indica a necessidade de acompanhamento ambulatorial e/ou tratamento profilático."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    }
  ],
  references: []
};

// Content for Urolitíase (UID: 1241)
export const urolitiaseContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório médico;",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia convencional e ultrassonografia;",
      "- Setor de tomografia."
    ],
    descricao: [
      "Você é médico plantonista em uma UPA e recebe o paciente de 28 anos, estudante, previamente hígido, com queixa de dor abdominal de início súbito.",
      "DADOS DA TRIAGEM: Pressão arterial: 150x90 mmHg. Frequência cardíaca: 105 bpm. Saturação de O2: 98%. Frequência respiratória: 14 irpm. Temperatura: 36.1°C. Paciente se encontra inquieto e com fácies de dor intensa."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Bruno, 28 anos, estudante.",
      "MOTIVO DE CONSULTA: Dr(a) estou com uma dor muito forte na barriga.",
      "CARACTERÍSTICAS DA DOR: Localização: É do lado direito da barriga. Início: Começou de repente a mais ou menos uma hora. Intensidade: É uma dor muito forte (9/10). Tipo de dor: Parece uma cólica que vai e volta. Irradiação: Não irradia, fica só aqui do lado direito. Fatores de melhora/piora: Tomei dipirona, mas não adiantou. Episódios anteriores: Ano passado senti algo parecido, mas era bem mais fraco.",
      "SINTOMAS ACOMPANHANTES: Náuseas: Estou enjoado, mas não cheguei a vomitar. Vômitos: Nega. Febre: Nega. Disúria: Nega. Polaciúria: Às vezes, sim. Alterações na urina: Minha urina é muito escura. Fezes: Sem alterações.",
      "ANTECEDENTES PESSOAIS: Doenças: Nenhuma. Cirurgias: Nega. Medicamentos: Nega. Alergias: Acho que não.",
      "HÁBITOS: Álcool: Bebo vinho de vez em quando. Cigarro: Nega. Drogas: Nega. Ingestão hídrica: Tomo pouca água, só quando tenho sede. Retenção urinária: Vou poucas vezes ao banheiro porque, no mercado, passo muito tempo repondo mercadorias nas prateleiras.",
      "ANTECEDENTES FAMILIARES: Pai, mãe e irmão sem problemas de saúde.",
      "Se o candidato solicitar apenas TOMOGRAFIA, você deverá dizer: Seja mais específico (só liberar o impresso quando for verbalizado tomografia de abdome sem contraste)."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Análise de urina", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Tomografia de abdome sem contraste", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma das ações."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Investiga:",
      subItems: [
        "(1) Episódios similares;",
        "(2) Sangue na urina ou urina vermelha;",
        "(3) Disúria;",
        "(4) Polaciúria;",
        "(5) Dor lombar;",
        "(6) Febre ou calafrios;",
        "(7) Náuseas ou vômitos."
      ],
      scoring: {
        adequate: "Investiga de cinco a sete itens.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por:",
      subItems: [
        "(1) Ingestão hídrica;",
        "(2) Hábito de retenção urinária;",
        "(3) Alteração nas fezes."
      ],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga de um a dois itens.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita manobra de punho percussão (Giordano).",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita:",
      subItems: [
        "(1) Hemograma;",
        "(2) PCR e/ou VHS;",
        "(3) Creatinina;",
        "(4) Ureia;",
        "(5) Sódio;",
        "(6) Potássio;",
        "(7) Rotina de urina/sumário de urina/urina tipo 1;",
        "(8) Urocultura."
      ],
      scoring: {
        adequate: "Solicita de sete a oito itens (e obrigatoriamente o exame de urina).",
        partial: "Solicita de quatro a seis itens e obrigatoriamente o exame de urina.",
        inadequate: "Não solicita ou solicita de uma a três itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita:",
      subItems: [
        "(1) Tomografia computadorizada de abdome com/sem contraste ou de rins e vias urinárias;",
        "(2) Ultrassom/USG/ecografia de abdome ou de rins e vias urinárias."
      ],
      scoring: {
        adequate: "Solicita ambos os itens ou solicita apenas o item 1.",
        partial: "Solicita apenas o item 2.",
        inadequate: "Não solicita nenhum dos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Define o diagnóstico de ureterolitíase/litíase urinária/urolitíase/uropatia obstrutiva por cálculo.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica:",
      subItems: [
        "(1) Anti-inflamatórios não hormonais e/ou analgésicos e/ou opioides;",
        "(2) Terapia medicamentosa de expulsão de cálculos;",
        "(3) Orienta sobre a importância de ingestão hídrica adequada;",
        "(4) Encaminha o paciente para acompanhamento ambulatorial."
      ],
      scoring: {
        adequate: "Realiza quatro ações.",
        partial: "Realiza de duas a três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Fibrilação Atrial (FA) (UID: 1243)
export const fibrilacaoAtrialContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Exames radiológicos convencionais;",
      "- Eletrocardiografia (ECG);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você atende um homem de 65 anos de idade, aposentado, que procura o serviço de saúde devido a sintomas recorrentes de palpitação.",
      "DADOS DA TRIAGEM: Pressão arterial: 140x90 mmHg. Frequência cardíaca: 125 bpm. Saturação de O2: 98%. Frequência respiratória: 14 irpm. Temperatura: 36,5°C."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais e acompanhamento clínico;",
    "- Resolver as dúvidas da paciente se houver."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: José, 65 anos de idade, aposentado.",
      "MOTIVO DE CONSULTA: Estou sentindo o coração batendo muito forte e acelerado. Fiquei preocupado e resolvi vim aqui pra ver se está tudo bem comigo.",
      "CARACTERÍSTICAS DO QUADRO: Tempo de início: Começou faz 2 horas. Episódios anteriores: Já faz 2 meses que estou sentindo isso, umas duas vezes na semana mais ou menos.",
      "SINTOMAS ACOMPANHANTES: Única coisa que sinto é a batedeira no peito.",
      "ANTECEDENTES PESSOAIS: Doenças: Pressão alta, diabetes e já tive um ataque isquêmico transitório há 14 anos. Medicamentos: Metformina, insulina, anlodipino, enalapril e aspirina. Alergias: Nega. Cirurgias: Nega. Cartão de vacina: Atualizado.",
      "HÁBITOS: Cigarro: Deixei de fumar faz 14 anos, fumava 1 maço por dia. Álcool: Nega. Drogas ilícitas: Nega. Sono, urina, fezes: Nega alterações. Alterações no peso: Nega.",
      "ANTECEDENTES FAMILIARES: Meu pai morreu de infarto aos 60 anos.",
      "DÚVIDAS: Doutor(a), quais fatores podem agravar minha condição de saúde?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Eletrocardiograma de 12 derivações", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: ["(1) Identifica-se;", "(2) Cumprimenta o paciente simulado."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese perguntando:",
      subItems: [
        "(1) Episódios anteriores;",
        "(2) Dispneia;",
        "(3) Dor torácica;",
        "(4) Desmaio ou perda de consciência ou queda;",
        "(5) Convulsão;",
        "(6) Liberação esfincteriana."
      ],
      scoring: {
        adequate: "Investiga de quatro a seis.",
        partial: "Investiga de dois a três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre antecedentes pessoais:",
      subItems: [
        "(1) Doenças;",
        "(2) Uso de medicamentos;",
        "(3) Drogas ilícitas;",
        "(4) Álcool;",
        "(5) Tabagismo;",
        "(6) Cirurgias."
      ],
      scoring: {
        adequate: "Investiga de cinco a seis itens.",
        partial: "Investiga quatro itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita:",
      subItems: ["(1) Exame físico geral;", "(2) Exame físico neurológico."],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Solicita eletrocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita exames laboratoriais.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de fibrilação atrial.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica:",
      subItems: [
        "(1) Controle da frequência cardíaca;",
        "(2) Anticoagulante oral;",
        "(3) Solicita interconsulta ou encaminha ao cardiologista."
      ],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 2 }
    },
    {
      id: 10,
      title: "10. Verbaliza corretamente fatores de risco:",
      subItems: [
        "(1) Hipertensão arterial sistêmica;",
        "(2) Idade avançada (>65 anos);",
        "(3) Doença cardíaca estrutural;",
        "(4) Diabetes mellitus;",
        "(5) Hipertireoidismo;",
        "(6) Apneia obstrutiva do sono;",
        "(7) Obesidade;",
        "(8) Consumo excessivo de álcool;",
        "(9) Histórico familiar de FA."
      ],
      scoring: {
        adequate: "Verbaliza de cinco a nove itens.",
        partial: "Verbaliza de dois a quatro itens.",
        inadequate: "Verbaliza um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    }
  ],
  references: []
};

// Content for Dispepsia – DRGE | INEP 2020.1 (UID: 1244)
export const dispepsiaDrgeInep2020Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial",
    situacao: [],
    descricao: [
      "Atendimento ambulatorial, em hospital de atenção secundária, de uma mulher de 45 anos de idade com queixa de queimação retroesternal e pirose intermitente há anos, em crise de epigastralgia, com náuseas e piora da queimação retroesternal há 10 dias após exagero alimentar e consumo de bebida alcoólica."
    ]
  },
  orientacoes: [
    "- Dirigir-se à mesa do consultório;",
    "- Ler as orientações gerais do cenário e as tarefas a cumprir;",
    "- Responder aos questionamentos da paciente simulada;",
    "- Definir hipóteses diagnósticas;",
    "- Definir plano diagnóstico e terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Fernanda, 45 anos, casada, dona de casa.",
      "MOTIVO DE CONSULTA: Estou com muita queimação no peito e dor no estômago.",
      "CARACTERÍSTICAS DO QUADRO: Tempo de evolução: Começou faz duas horas. Intensidade: Muito forte. Irradiação: Nega. Fatores de piora: Depois que eu acabo de jantar e deito é pior. Fatores de melhora: Quando tomo omeprazol melhora. Progressão: Sempre tenho essa queimação, mas já faz 10 dias que piorou depois que fui numa festa e comi e bebi muito. Mas hoje a dor está insuportável. Plenitude pós-prandial: Sim, sempre tenho isso. Enjoo: Sim. Vômitos: Vomitei duas vezes.",
      "SINTOMAS ACOMPANHANTES: Náuseas: Sim. Febre: Nega. Perda de peso: Nega. Alteração do hábito intestinal: Nega. Refluxo: Às vezes sinto um líquido quente subindo pela garganta. Outros sintomas: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Sou diabética. Medicamentos: Tomo metformina e de vez em quando omeprazol. Cirurgias: Nega. Alergias: Nega.",
      "HÁBITOS: Álcool: Gosto de tomar cerveja. Cigarro: Um maço por dia desde os 17 anos. Drogas: Nega. Alimentação: Minha alimentação não é muito boa. Como muita coisa frita, gordurosa, doces e suco de caixinha. Atividade física: Nega.",
      "SE QUESTIONADO SOBRE DÚVIDAS, PERGUNTAR: Depois do tratamento, posso continuar usando omeprazol sempre que precisar? Quais problemas posso ter com ele?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Enzimas cardíacas", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Cumprimenta a paciente simulada, questiona sua idade e sua profissão.",
      subItems: [],
      scoring: {
        adequate: "Realiza as ações.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Faz anamnese com perguntas direcionadas: questiona sobre plenitude pós-prandial, enjoo, vômitos, tipo de dor, intensidade da dor, evolução da dor, fatores de melhora e piora, irradiação.",
      subItems: [],
      scoring: {
        adequate: "Faz três ou mais perguntas direcionadas.",
        partial: "Faz até duas perguntas direcionadas.",
        inadequate: "Não faz perguntas direcionadas."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Questiona sintomas associados: náuseas, febre, perda de peso, hábito intestinal.",
      subItems: [],
      scoring: {
        adequate: "Questiona.",
        partial: "—",
        inadequate: "Não questiona."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 4,
      title: "4. Questiona antecedentes: tabagismo, etilismo, cirurgias prévias, medicações em uso.",
      subItems: [],
      scoring: {
        adequate: "Questiona.",
        partial: "—",
        inadequate: "Não questiona."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Hipótese diagnóstica: dispepsia (DRGE); gastrite, úlcera péptica.",
      subItems: [],
      scoring: {
        adequate: "Levanta a hipótese de dispepsia (DRGE).",
        partial: "Levanta a hipótese de gastrite, úlcera péptica.",
        inadequate: "Não levanta hipótese diagnóstica relacionada ao caso."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Descarta insuficiência coronariana aguda com ECG e enzimas cardíacas.",
      subItems: [],
      scoring: {
        adequate: "Descarta.",
        partial: "—",
        inadequate: "Não descarta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita procedimento: endoscopia digestiva alta; ultrassonografia e exames laboratoriais.",
      subItems: [],
      scoring: {
        adequate: "Solicita endoscopia digestiva alta.",
        partial: "Solicita apenas ultrassonografia, exames laboratoriais ECG ou enzimas cardíacas.",
        inadequate: "Não solicita nenhum procedimento adequado ao caso."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Manejo da paciente: tratamento clínico com inibidores de bomba de prótons e procinéticos por 12 semanas; medidas comportamentais para DRGE.",
      subItems: [],
      scoring: {
        adequate: "Apresenta medidas medicamentosas e comportamentais.",
        partial: "Apresenta apenas medidas medicamentosas ou medidas comportamentais.",
        inadequate: "Não apresenta nenhum tratamento."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Orienta sobre os riscos e benefícios do uso contínuo de IBP (omeprazol).",
      subItems: [],
      scoring: {
        adequate: "Orienta.",
        partial: "—",
        inadequate: "Não orienta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Síndrome de Wolff-Parkinson-White | INEP 2022.2 (UID: 1245)
export const sindromeWolffParkinsonWhiteInep2022Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Exames radiológicos convencionais;",
      "- Eletrocardiografia (ECG);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você atende um homem de 19 anos, estudante universitário que procura atendimento na unidade após episódio de desmaio ocorrido há aproximadamente 20 minutos."
    ]
  },
  orientacoes: [
    "- Anamnese.",
    "- Solicitar e interpretar exame físico.",
    "- Solicitar e interpretar exames laboratoriais (no máximo SEIS exames).",
    "- Solicitar e interpretar outros exames complementares pertinentes ao caso (no máximo DOIS exames). Só serão pontuados os DOIS primeiros exames complementares citados.",
    "- Estabelecer e comunicar hipótese diagnóstica inicial.",
    "- Propor tratamento e/ou encaminhamento do paciente para seguimento adequado.",
    "ATENÇÃO! VOCÊ DEVERÁ, OBRIGATORIAMENTE, REALIZAR AS TAREFAS NA SEQUÊNCIA DESCRITA ACIMA."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ricardo, 19 anos de idade, estudante.",
      "MOTIVO DE CONSULTA: Há 20 minutos mais ou menos eu tive um desmaio e fiquei preocupado porque pode ser grave né. Eu tava conversando com meus amigos e de repente senti o coração batendo forte e acelerado, minha visão escureceu e quando acordei tava todo mundo em volta de mim.",
      "SE PERGUNTADO POR EPISÓDIOS ANTERIORES: É a primeira vez que eu desmaio, mas essa palpitação ja tive outras vezes.",
      "SE PERGUNTADO POR SINTOMAS ANTES DO DESMAIO: Somente a palpitação e a visão escura.",
      "SE PERGUNTADO POR SINTOMAS DEPOIS DA RECUPERAÇÃO DO DESMAIO: Negar todos.",
      "SINTOMAS ACOMPANHANTES: Só senti a palpitação e a visão escura mesmo.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho problemas de saúde. Medicamentos: Não uso medicamentos. Alergias: Nega.",
      "HÁBITOS: Cigarro: Não fumo. Álcool: Não. Drogas ilícitas: Nega.",
      "AO RECEBER O DIAGNÓSTICO, PERGUNTAR: O que é isso doutor, poderia me explicar? O que a gente vai fazer?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Eletrocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se e cumprimenta o paciente simulado; (2) Pergunta algum dado de identificação (idade, estado civil, profissão e/ou naturalidade).",
      subItems: [],
      scoring: {
        adequate: "Realiza todos os procedimentos.",
        partial: "Realiza um dos procedimentos.",
        inadequate: "Não realiza procedimento algum."
      },
      scores: { min: 0, partial: 0.125, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre manifestações durante e após a crise: (1) Movimentos involuntários (ou convulsão); (2) Liberação esfincteriana; (3) Lesões na língua, crânio ou na face (ou se bateu com a cabeça); (4) Padrão de recuperação.",
      subItems: [],
      scoring: {
        adequate: "Investiga três ou mais achados clínicos.",
        partial: "Investiga dois achados clínicos.",
        inadequate: "Investiga apenas um achado clínico ou não investiga achado clínico algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre manifestações que precedem a crise: (1) Uso de medicamentos, drogas lícitas e ilícitas; (2) Alimentação e jejum; (3) Atividade física; (4) Eventos similares anteriores; (5) Doenças prévias e traumas.",
      subItems: [],
      scoring: {
        adequate: "Investiga três ou mais achados.",
        partial: "Investiga dois achados.",
        inadequate: "Investiga apenas um achado ou não investiga achado algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Solicita: (1) exame físico geral e (2) exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico especificando aspecto neurológico.",
        partial: "Solicita exame físico mas não especifica aspecto neurológico.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais: (1) Glicemia; (2) Sódio; (3) Potássio; (4) Hematócrito/hemoglobina ou hemograma; (5) Cálcio; (6) Magnésio.",
      subItems: [],
      scoring: {
        adequate: "Solicita de quatro a seis dos exames listados.",
        partial: "Solicita de dois a três dos exames listados.",
        inadequate: "Solicita um dos exames listados ou não solicita exame algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. (1) Solicita e (2) interpreta o eletrocardiograma (ECG).",
      subItems: [],
      scoring: {
        adequate: "Solicita e relaciona os achados do ECG (PR- Curto ou Wolf-Parkinson-White ou presença de onda delta) a riscos de arritmia.",
        partial: "Solicita, mas não interpreta corretamente o achado.",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Formula hipóteses diagnósticas.",
      subItems: [],
      scoring: {
        adequate: "Identifica e explica o diagnóstico de síncope ou desmaio/perda de consciência de origem cardíaca, relacionando-o à arritmia ou alteração da atividade elétrica do coração.",
        partial: "—",
        inadequate: "Não identifica a síncope ou desmaio/perda de consciência de origem cardíaca."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Seguimento do paciente: encaminha para a cardiologia e/ou realização de Holter.",
      subItems: [],
      scoring: {
        adequate: "Encaminha.",
        partial: "—",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Realiza adequadamente a sequência das tarefas, conforme solicitado nas orientações ao participante.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    }
  ],
  references: []
};

// Content for Infecção do trato urinário – Cistite (UID: 1256)
export const infeccaoTratoUrinarioCistiteContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção primária à saúde",
    tipo: "Demanda espontânea - Unidade Básica de Saúde (UBS)",
    situacao: [],
    descricao: [
      "Você é médico da Unidade Primária de Saúde do bairro e recebe por demanda espontânea uma mulher com queixas urinárias."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese;",
    "- Solicitar exame físico.",
    "- Solicitar exames complementares se necessário. (MÁXIMO 1 EXAME COMPLEMENTAR. SÓ SERÁ CONSIDERADO O PRIMEIRO EXAME VERBALIZADO!).",
    "- Definir a conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Michele, 22 anos, solteira, estudante.",
      "MOTIVO DE CONSULTA: Faz 3 dias que estou com dificuldade pra urinar, quando tento fazer arde muito.",
      "SINTOMAS ACOMPANHANTES: Tenesmo: Sim, sinto que não consigo esvaziar bem a bexiga. Urina escura/vermelha/turva: Nega. Febre: Nega. Dor abdominal: Sim, também estou com dor. Outros sintomas: Nega.",
      "CARACTERÍSTICAS DA DOR ABDOMINAL: Tempo evolução: 3 dias. Localização: Pra baixo do umbigo. Intensidade: Leve (4/10). Tipo de dor: Dor em pontada. Irradiação: Não irradia. Fatores de melhora: Tomei ibuprofeno e melhorou um pouco. Fatores de piora: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Tiraram o meu apêndice aos 12 anos. Medicamentos: Nega. Alergias: Nega. Infecções urinárias prévias: Nega. Data da última menstruação: Há 2 meses.",
      "HÁBITOS: Cigarro: Nega. Drogas: Nega. Álcool: De vez em quando tomo vinho. Ingesta hídrica: Tomo pouca água. Retenção urinaria: Nega. Atividade física: 3 vezes por semana. Alimentação: Variada.",
      "VIDA SEXUAL: Ativa: Sim, com meu namorado. Uso de preservativo: De vez em quando. Dor nas relações sexuais: Nega. Corrimento vaginal: Nega."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Beta HCG/teste de gravidez", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga outros sinais e sintomas de infecção urinária: (1) Polaciúria; (2) Sangue na urina OU urina vermelha OU urina turva; (3) Tenesmo vesical; (4) Urgência miccional; (5) Dor infra umbilical; (6) Febre.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga as características da dor abdominal.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Pergunta por episódios anteriores de infecção urinária.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga: (1) Data da última menstruação; (2) Dispareunia; (3) Corrimento vaginal.",
      subItems: [],
      scoring: {
        adequate: "Investiga os três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Investiga antecedentes pessoais.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Investiga hábitos: (1) Ingestão hídrica; (2) Retenção urinária.",
      subItems: [],
      scoring: {
        adequate: "Investiga os dois itens.",
        partial: "Investiga apenas um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita teste de gravidez ou Beta HCG.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de infecção urinária baixa OU cistite.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 11,
      title: "11. Conduta terapêutica: (1) Indica tratamento empírico com Nitrofurantoína via oral por 5 dias OU Fosfomicina VO dose única; (2) Fornece orientações para evitar infecções urinárias; (3) Pautas de alarme e/ou retorno em 48/72 horas.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza uma ou duas ações (sendo obrigatório o item um).",
        inadequate: "Não realiza nenhuma ação ou não cita o item um."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Exacerbação de DPOC (UID: 1262)
export const exacerbacaoDpocContent: ChecklistContent = {
  scenario: {
    nivel: "Hospital terciário - Pronto Socorro",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório;",
      "- Exames de imagem;",
      "- Salas de internação geral e UTI."
    ],
    descricao: [
      "Paciente masculino de 57 anos de idade que consulta por quadro de tosse."
    ]
  },
  orientacoes: [
    "- Anamnese. ATENÇÃO! A ANAMNESE DEVERÁ SER CONCLUÍDA ANTES DE PASSAR PARA AS PRÓXIMAS TAREFAS).",
    "- Solicitar e interpretar o exame físico.",
    "- Solicitar exames complementares se necessário.",
    "- Hipótese diagnóstica.",
    "- Conduta terapêutica e orientações adequadas."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Josué, 57 anos de idade, aposentado e casado.",
      "MOTIVO DE CONSULTA: Vim porque estou com muita tosse.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: 4 dias. Presença de secreção: Sim, com secreção clara, mas é igual a que eu sempre tive.",
      "OUTROS SINTOMAS ASSOCIADOS: Falta de ar: Faz 4 dias também que estou com falta de ar e me sinto agitado quando caminho. Febre: Acho que não. Outros sintomas: Nega.",
      "INFECÇÃO PRÉVIA AO INÍCIO DOS SINTOMAS: Nega.",
      "EPISÓDIOS ANTERIORES: Sempre tenho tosse e falta de ar, deve ser pelo cigarro né doutor? O problema é que dessa vez está pior!",
      "EXACERBAÇÕES, INTERNAÇÕES E NECESSIDADE DE INTUBAÇÃO PRÉVIA: No ano passado eu tive a mesma coisa e precisei ficar internado.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho essa doença que dá no pulmão de quem fuma. Medicamentos: Uso uma bombinha que o médico me passou. Alergias: Que eu saiba não. Cartão de vacina: Atualizado.",
      "HÁBITOS: Cigarro: Fumo 2 maços de cigarro por dia desde os 20 anos de idade. Drogas: Não. Álcool: Bebo nos fins de semana.",
      "ANTECEDENTES FAMILIARES: Meu pai morreu de infarto e minha mãe de câncer de mama."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga: (1) Tempo de evolução da tosse; (2) Presença de secreção; (3) Dispneia; (4) Febre e/ou calafrios.",
      subItems: [],
      scoring: {
        adequate: "Investiga os quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga: (1) Fatores desencadeantes; (2) Internação e/ou exacerbação e/ou intubação prévia; (3) Situação vacinal.",
      subItems: [],
      scoring: {
        adequate: "Investiga os três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita: (1) Radiografia de tórax e (2) Verbaliza as alterações da radiografia.",
      subItems: [],
      scoring: {
        adequate: "Solicita e verbaliza as alterações.",
        partial: "Solicita apenas a radiografia.",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 8,
      title: "8. Cita como hipótese diagnóstica exacerbação de doença pulmonar obstrutiva crônica (DPOC).",
      subItems: [],
      scoring: {
        adequate: "Cita exacerbação de DPOC.",
        partial: "—",
        inadequate: "Não cita ou menciona outro diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Beta 2 agonista de ação curta por via inalatória associado ou não a um anticolinérgico de ação curta por via inalatória; (2) Corticoide via oral ou IV.",
      subItems: [],
      scoring: {
        adequate: "Realiza os dois itens.",
        partial: "—",
        inadequate: "Realiza um ou nenhum item."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Orienta sobre: (1) Tratamento de manutenção para o domicilio; (2) Necessidade de seguimento ambulatorial; (3) Abandono do cigarro.",
      subItems: [],
      scoring: {
        adequate: "Orienta os três itens.",
        partial: "Orienta dois itens.",
        inadequate: "Orienta um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Sepse de foco urinário (UID: 1268)
export const sepseFocoUrinarioContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção terciária à saúde - hospitalar",
    tipo: "Urgência e Emergência",
    situacao: [
      "Dados da triagem colhidos pela enfermagem:",
      "- Pressão arterial: 70x40 mm Hg",
      "- Frequência cardíaca: 115 batimentos por minuto",
      "- Frequência respiratória: 26 incursões por minuto",
      "- Saturação de O2: 92%",
      "- Temperatura: 38,1 C",
      "- Glicemia capilar: 114 mg/dl",
      "A paciente já se encontra na sala vermelha e monitorizada."
    ],
    descricao: [
      "Você é médico plantonista em um pronto socorro de um hospital terciário e atende Maria de 75 anos, diabética há 30 anos, acamada por uma sequela de AVC e que vive em uma Instituição de Longa Permanência para Idosos (ILPIs).",
      "Os cuidadores afirmam que há duas semanas a paciente se queixava de dor na região inferior do abdome e ardor para urinar. A paciente recebeu analgésicos por 5 dias e houve melhora da dor. Porém, perceberam que há 3 dias Maria não se alimenta direito e está muito decaída."
    ]
  },
  orientacoes: [
    "- Realizar anamnese do paciente;",
    "- Solicitar e interpretar o exame físico pertinente ao caso;",
    "- Solicitar exames complementares, se necessário, descrevendo os achados;",
    "- Estabelecer e comunicar a hipótese diagnóstica;",
    "- Propor conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Maria, 75 anos de idade, aposentada.",
      "MOTIVO DE CONSULTA: Faz 2 semanas que comecei a sentir dor na barriga e ardor pra urinar. Me deram remédio e a dor passou, mas agora voltou a doer e me sinto mal.",
      "CARACTERÍSTICAS DA DOR: Localização: Dói pra baixo do umbigo. Outras características da dor: Não consta no script.",
      "SINTOMAS ASSOCIADOS: Dor lombar: Sim, do lado direito. Febre: Tenho calafrios. Outros sintomas que forem perguntados: Responder que não.",
      "INFECÇÕES URINÁRIAS PRÉVIAS: Já tive infecção de urina, mas não lembro quando.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho diabetes. Medicamentos: Metformina e insulina. Alergias: Nega. Uso recente de antibióticos: Nega. Cirurgias: Nega. Internações recentes: Nega.",
      "HÁBITOS: Álcool, cigarro e drogas ilícitas: Nega. Ingestão de água: Responder que não toma muita água porque não tem sede. Urina: Usa fraldas e refere que a urina tem cheiro forte e está muito escura. Fezes: Sem alterações."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Análise de urina", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Urocultura", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Hemocultura", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor abdominal: (1) Tipo de dor; (2) Intensidade; (3) Irradiação; (4) Fatores de melhora; (5) Fatores de piora; (6) Progressão.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos cinco itens.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas: (1) Polaciúria; (2) Tenesmo vesical; (3) Alteração no aspecto da urina; (4) Febre ou calafrios; (5) Náuseas ou vômitos.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Pergunta sobre: (1) Uso recente de antibióticos; (2) Medicamentos de uso contínuo; (3) Alergias; (4) Ingestão hídrica; (5) Infecções de urina prévias; (6) Internações recentes.",
      subItems: [],
      scoring: {
        adequate: "Investiga os seis itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. (1) Solicita exames de laboratório e (2) verbalizou as seguintes alterações: leucocitose com predomínio de neutrófilos e desvio à esquerda, PCR aumentada, lactato aumentado.",
      subItems: [],
      scoring: {
        adequate: "Solicita e verbaliza as três alterações.",
        partial: "Solicita mas não verbaliza as três alterações.",
        inadequate: "Não solicita exames de laboratório."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita: (1) Análise de urina OU urina tipo 1 OU urina rotina; (2) Urocultura; (3) Hemocultura.",
      subItems: [],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita dois itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 1, max: 1.75 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de sepse de foco urinário OU pielonefrite aguda com sepse OU infecção do trato urinário com sepse.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Expansão de volume com cristalóides; (2) Antibiótico IV de amplo espectro; (3) Antitérmico; (4) Internação em UTI.",
      subItems: [],
      scoring: {
        adequate: "Realiza os quatro itens.",
        partial: "Realiza dois ou três itens.",
        inadequate: "Realiza dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 10,
      title: "10. Realiza a administração do antibiótico dentro da primeira hora após o reconhecimento da sepse.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    }
  ],
  references: []
};

// Content for Doença Meningocócica (UID: 1271)
export const doencaMeningococicaContent: ChecklistContent = {
  scenario: {
    nivel: "Hospital terciário - Unidade de Pronto Socorro",
    tipo: "Urgência e Emergência",
    situacao: [],
    descricao: [
      "Você é chamado para atender um paciente chamado Marcos de 28 anos de idade, pessoa privada de liberdade, trazido do sistema prisional da cidade, com queixas de dor de cabeça intensa, náuseas, vômitos e mal estar há 1 dia."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Realizar o exame físico direcionado à queixa principal do paciente com as principais manobras a serem realizadas;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcos, 28 anos de idade, solteiro.",
      "MOTIVO DE CONSULTA: Desde ontem que estou com uma dor forte na cabeça, vomitando e estou me sentindo muito mal. Talvez tenha comido algo estragado porque ontem a comida do presídio estava horrível.",
      "CARACTERÍSTICAS DA CEFALEIA: Tempo de início: Começou ontem. Localização: Dói toda a cabeça. Intensidade: Muito forte (8/10). Tipo de dor: Parece que é uma facada na cabeça. Irradiação: Chega doer até a nuca. Fatores de melhora: A enfermeira do presídio me deu um remédio pra dor mas não adiantou nada. Fatores de piora: Movimentar a cabeça aumenta a dor.",
      "CARACTERÍSTICAS DO VÔMITO: Vomitei 4 vezes. É um vômito muito forte, sai um jato enorme, nunca vomitei assim.",
      "SINTOMAS ASSOCIADOS: Acho que estou com febre e apareceu umas manchas na perna que não doem e nem coçam. Negar outros sintomas perguntados.",
      "SE PERGUNTADO POR CONTATO COM PESSOAS COM MESMOS SINTOMAS: Na cadeia tem muita doença né doutor(a), todo mundo apertado na mesma cela. Muitos presos que ficam gripados, tossindo e a gente não tem o que fazer.",
      "ANTECEDENTES PESSOAIS: Doenças: Que eu saiba não. Medicamentos: Não. Alergia: Acho que não.",
      "HÁBITOS: Cigarro: Fumo meio maço de cigarro por dia. Álcool: Nega. Drogas ilícitas: Nega.",
      "SE PERGUNTADO POR ESTADO VACINAL: Só tomei vacina quando era criança."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Manobras de Kernig e Brudzinski/Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Hemocultura", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Análise do líquido cefalorraquidiano", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Fatores de melhora; (7) Fatores de piora; (8) Progressão; (9) Sintomas acompanhantes; (10) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos oito itens.",
        partial: "Investiga de seis a sete itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga: (1) Fotofobia; (2) Febre; (3) Convulsão; (4) Desmaio ou perda de consciência; (5) Rigidez de nuca.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga contato com pessoas com sintomas similares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes pessoais: (1) Estado vacinal; (2) Doenças prévias; (3) Drogas ilícitas; (4) Medicamentos; (5) Alergias.",
      subItems: [],
      scoring: {
        adequate: "Investiga os cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico geral; (2) Exame neurológico; (3) Manobras de Kernig e/ou Brudzinski.",
      subItems: [],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita um ou dois itens.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.2, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Após leitura do impresso Exame Neurológico é capaz de verbalizar: (1) Rigidez de nuca; (2) Kernig; (3) Brudzinski.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza a realização adequada das três manobras.",
        partial: "Verbaliza a realização adequada de uma OU duas manobras.",
        inadequate: "Não verbaliza a realização adequada de nenhuma manobra."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Solicita: (1) Laboratório geral; (2) Hemocultura; (3) Análise do líquido cefalorraquidiano ou punção lombar.",
      subItems: [],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita dois itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.8, max: 1.75 }
    },
    {
      id: 9,
      title: "9. Realiza a hipótese diagnóstica de doença meningocócica OU meningite bacteriana associada a meningococcemia.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica: (1) Indica ceftriaxona IV; (2) Analgésico e/ou antitérmico; (3) Internação; (4) Isolamento respiratório.",
      subItems: [],
      scoring: {
        adequate: "Realiza as quatro ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Realiza: (1) Notificação compulsória de caso suspeito de doença meningocócica; (2) Informa a necessidade de realizar quimioprofilaxia para os contatos próximos do paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Cirrose Hepática Descompensada | INEP 2021.1 (UID: 1272)
export const cirroseHepaticaDescompensadaInep2021Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Homem de 40 anos de idade, solteiro, pedreiro, natural e procedente de São Paulo, que procura serviço médico devido a aumento do volume abdominal e edema de membros inferiores, percebido há 15 dias."
    ]
  },
  orientacoes: [
    "- Realizar anamnese.",
    "- Solicitar exame físico.",
    "- Responder aos questionamentos do paciente simulado.",
    "- Estabelecer o diagnóstico e fazer orientação adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Pedro, 40 anos de idade, solteiro, pedreiro.",
      "MOTIVO DE CONSULTA: Faz 15 dias mais ou menos que percebi minha barriga muito distendida e as pernas estão muito inchadas.",
      "SINAIS E SINTOMAS ASSOCIADOS (RESPONDER CONFORME PERGUNTADO): Icterícia/pele amarelada: As vezes minha pele e meus olhos ficam meio amarelados. Sangramentos: Fui internado há 2 anos porque estava vomitando sangue.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega.",
      "HÁBITOS: Álcool: Bebo desde os 15 anos de idade, todos os dias, cachaça e cerveja. Cigarro: Nega. Drogas ilícitas: Nega. Alimentação: Como muita carne, embutidos, coisas salgadas.",
      "Ao receber algum diagnóstico/proposta terapêutica, perguntar: Como terá que ser minha alimentação daqui pra frente?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese perguntando fatores concomitantes para hepatopatia: (1) Icterícia ou pele amarelada; (2) Hemorragia; (3) Alteração no sono; (4) Febre; (5) Dor; (6) Volume de diurese; (7) Aspecto da urina; (8) Coloração de fezes.",
      subItems: [],
      scoring: {
        adequate: "Cita mais que três itens.",
        partial: "Cita três itens.",
        inadequate: "Não cita nenhum item ou até dois itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Solicita exame físico geral.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 4,
      title: "4. Interpreta exames laboratoriais: aumento de taxas hepáticas, aumento de bilirrubinas mista corroborando com icterícia. Plaquetopenia, hipertensão portal.",
      subItems: [],
      scoring: {
        adequate: "Interpreta.",
        partial: "—",
        inadequate: "Não interpreta."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 5,
      title: "5. Realiza o diagnóstico de cirrose hepática descompensada com ascite.",
      subItems: [],
      scoring: {
        adequate: "Diagnostica.",
        partial: "—",
        inadequate: "Não diagnostica."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) paracentese diagnóstica e de alívio e (2) encaminha ao serviço de referência.",
      subItems: [],
      scoring: {
        adequate: "Solicita o procedimento e encaminha ao serviço de referência.",
        partial: "—",
        inadequate: "Não solicita e não encaminha ao serviço de referência."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Proposta terapêutica: dieta hipossódica e diuréticos (espironolactona e furosemida).",
      subItems: [],
      scoring: {
        adequate: "Orienta.",
        partial: "—",
        inadequate: "Não orienta."
      },
      scores: { min: 0, partial: 0, max: 2 }
    }
  ],
  references: []
};

// Content for Profilaxia Pós exposição ao HIV (UID: 1280)
export const profilaxiaPosExposicaoHivContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção primária à saúde",
    tipo: "Demanda espontânea",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios médicos;",
      "- Enfermaria;",
      "- Farmácia;",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você recebe por demanda espontânea o paciente que se mostra muito ansioso e aflito."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar exames complementares, se necessário;",
    "- Propor conduta terapêutica adequada;",
    "- Dar as orientações ao paciente pertinentes ao caso."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcelo, 23 anos, solteiro, estudante de direito.",
      "MOTIVO DE CONSULTA: Preciso muito da sua ajuda, me dá muita vergonha falar isso porque não queria que ninguém soubesse mas não tenho outra opção. Tive relação sexual com uma menina e hoje ela me ligou chorando e pedindo desculpa dizendo que o resultado do exame de HIV que ela tinha feito deu positivo. Estou desesperado e não sei o que fazer.",
      "DETALHES DO MOTIVO DE CONSULTA: Tempo de exposição: Tivemos relação sexual ontem à noite. Uso de preservativo: Não usamos preservativo. Tipo de exposição: Fizemos sexo oral, vaginal e anal. Antecedentes da pessoa-fonte: Ela descobriu que está com HIV hoje de manhã quando pegou o resultado de um exame de rotina. Me disse que foi o único resultado positivo. Uso de droga ou tóxicos durante a relação sexual: Tomamos cerveja e usamos cocaína.",
      "SINTOMAS ATUAIS: Negar qualquer sintoma perguntado (paciente assintomático).",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Medicamentos: Não tomo remédios. Alergias: Que eu saiba não tenho alergias. Cartão de vacina: Atualizado. Cirurgias: Nunca realizei nenhuma cirurgia.",
      "HÁBITOS: Álcool: Bebo nos fins de semana. Cigarro: Não fumo. Drogas ilícitas: De vez em quando uso cocaína. Alimentação: Variada. Sono: Durmo bem. Atividade física: Jogo bola duas vezes por semana. Fezes e urina: Sem alterações.",
      "ANTECEDENTES FAMILIARES: Meu pai e minha mãe não tem problemas de saúde.",
      "Conceder autorização para realizar testes para infecções sexualmente transmissíveis no caso de que ela seja solicitada pelo candidato(a)."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Teste rápido para HIV", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Teste rápido para sífilis", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Sorologia Hepatite B", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Sorologia Hepatite C", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Tenta tranquilizar o paciente com palavras e/ou oferecendo água e/ou informando sobre o sigilo médico.",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Realiza anamnese dirigida investigando sobre: (1) Tempo transcorrido entre a exposição e a consulta; (2) Status sorológico da pessoa-fonte; (3) Tipo de exposição (mucosa ou cutânea em pele não integra); (4) Contato com materiais biológicos com risco de transmissão do HIV; (5) Corrimento uretral.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou cinco itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 4,
      title: "4. Investiga sobre: (1) Antecedentes pessoais, e; (2) Antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga os dois itens.",
        partial: "Investiga apenas um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita o exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita a autorização do paciente para realizar teste de HIV e outras IST's.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames laboratoriais para acompanhamento do paciente: (1) Hemograma; (2) Transaminases (TGO/TGP); (3) Creatinina.",
      subItems: [],
      scoring: {
        adequate: "Solicita os três itens.",
        partial: "Solicita apenas dois itens.",
        inadequate: "Solicita apenas um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita exames séricos: (1) HIV (Teste rápido ou sorologia); (2) Sífilis (VDRL ou teste rápido); (3) Hepatite B (HBS-Ag/Anti-HBS); (4) Hepatite C (Anti-HCV).",
      subItems: [],
      scoring: {
        adequate: "Solicita os quatro itens.",
        partial: "Solicita três itens.",
        inadequate: "Solicita apenas dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Inicia esquema antirretroviral para profilaxia pós exposição ao HIV pelo tempo correto: (1) Tenofovir + lamivudina + dolutegravir; (2) Durante 28 dias.",
      subItems: [],
      scoring: {
        adequate: "Indica corretamente os dois itens.",
        partial: "Indica somente o item 1.",
        inadequate: "Não indica o item 1."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 10,
      title: "10. Realiza as devidas orientações ao paciente: (1) Necessidade de retorno para seguimento; (2) Importância do uso de preservativo nas relações sexuais; (3) Não usar drogas/oferece apoio para deixar.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Emergência Hipertensiva – Dissecção aguda de aorta (UID: 1282)
export const emergenciaHipertensivaDisseccaoAortaContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção terciária à saúde",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Setor de radiologia (Raio X e tomografia computadorizada);",
      "- Laboratório de análises clínicas;",
      "- Centro cirúrgico;",
      "- Unidade de terapia intensiva."
    ],
    descricao: [
      "Você é o médico de plantão e irá atender um homem de 65 anos de idade, diabético e hipertenso mal controlado há 15 anos, trazido pelo SAMU por forte dor no peito de início súbito."
    ]
  },
  orientacoes: [
    "- Realizar anamnese e solicitar o exame físico do paciente, verbalizando as alterações;",
    "- Solicitar e interpretar exames laboratoriais;",
    "- Solicitar e interpretar exames de imagem;",
    "- Estabelecer e comunicar diagnóstico e conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 65 anos de idade, aposentado.",
      "MOTIVO DE CONSULTA: Estava arrumando o quintal da minha casa e começou uma dor muita forte no peito e nas costas, me ajuda por favor!",
      "CARACTERÍSTICAS DA DOR: Início: Começou há uma hora mais ou menos. Localização: Dói no meio do peito. Intensidade: Muito forte (10/10). Tipo de dor: Parece que está rasgando meu peito. Irradiação: A dor vai para as costas. Fatores de melhora/piora: Não sei dizer, está doendo muito.",
      "SINTOMAS ASSOCIADOS: Estou com vontade de vomitar. Negar qualquer outro sintoma perguntado.",
      "FATORES DESENCADEANTES: Não tomo o remédio da pressão todos os dias, só quando vejo que ela tá alta. Negar qualquer outro fator desencadeante perguntado.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta e diabetes há 15 anos. Medicamentos: Enalapril, metformina e insulina. Alergias: Alérgico a dipirona. Cirurgia: Me operaram da vesícula há 3 anos.",
      "HÁBITOS: Cigarro: 2 maços de cigarro por dia há 18 anos. Álcool: Uma garrafa de cerveja quase todos os dias. Drogas ilícitas: Não uso drogas.",
      "ANTECEDENTES FAMILIARES: Meu pai faleceu de infarto há 14 anos mais ou menos. Minha mãe é viva e tem pressão alta também."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – ECG de 12 derivações", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Angiotomografia computadorizada de tórax", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Fatores de melhora; (7) Fatores de piora; (8) Progressão; (9) Sintomas acompanhantes; (10) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos oito características.",
        partial: "Investiga de cinco a sete características.",
        inadequate: "Investiga quatro ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais e hábitos: (1) Doenças; (2) Cirurgias; (3) Medicamentos; (4) Alergias; (5) Tabagismo; (6) Álcool; (7) Drogas ilícitas.",
      subItems: [],
      scoring: {
        adequate: "Investiga todos os itens.",
        partial: "Investiga cinco ou seis itens.",
        inadequate: "Investiga quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) Exame físico; e, (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita os dois itens.",
        partial: "Solicita somente um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Solicita eletrocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita exames de imagem: (1) Radiografia de tórax; (2) Tomografia computadorizada/Angiotomografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita ambos itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita exames laboratoriais: (1) Hemograma completo; (2) Creatinina e(ou) Ureia; (3) Glicemia; (4) Troponinas; (5) Lactato; (6) Gasometria arterial; (7) Tipagem sanguínea; (8) TP/INR, TTPa.",
      subItems: [],
      scoring: {
        adequate: "Solicita sete ou oito itens.",
        partial: "Solicita cinco ou seis itens.",
        inadequate: "Solicita quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Verbaliza o diagnóstico de emergência hipertensiva com dissecção aguda de aorta.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente.",
        partial: "—",
        inadequate: "Não verbaliza ou verbaliza outro diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Realiza tratamento medicamentoso inicial: (1) Analgesia endovenosa com opióides; (2) Controle da frequência cardíaca com betabloqueador; (3) Controle da pressão arterial com nitroprussiato de sódio.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 11,
      title: "11. Indica monitorização contínua em UTI.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "—",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    }
  ],
  references: []
};

// Content for Emergência Hipertensiva – Edema agudo de pulmão (UID: 1283)
export const emergenciaHipertensivaEdemaAgudoPulmaoContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Eletrocardiograma.",
      "Dados da triagem colhidos pela enfermagem:",
      "- Pressão arterial: 230x130 mm Hg",
      "- Frequência cardíaca: 74 batimentos por minuto",
      "- Frequência respiratória: 28 incursões por minuto",
      "- Temperatura: 36,6 C",
      "- Saturação de oxigênio: 86%",
      "O paciente já se encontra deitado na maca da sala vermelha."
    ],
    descricao: [
      "Você atende a João, 65 anos de idade, diabético e hipertenso, trazido pelo SAMU às 3 horas da madrugada por falta de ar de início há uma hora."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 65 anos de idade, mecânico.",
      "MOTIVO DE CONSULTA: Estava dormindo e acordei com muita falta de ar, parece que estou afogando.",
      "SE PERGUNTADO POR EPISÓDIOS ANTERIORES: É a primeira vez que isso acontece.",
      "SINTOMAS ASSOCIADOS: Também estou tossindo e está saindo uma coisa estranha como se fosse espuma. Negar qualquer outro sintoma perguntado.",
      "SE PERGUNTADO POR FATORES DESENCADEANTES OU ADESÃO À MEDICAÇÃO: Faz muitos anos que não vou ao médico para controlar a pressão arterial porque é difícil marcar consulta no centro de saúde. Negar qualquer sintoma de infecção perguntado, fatores estressantes, etc.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta e diabetes há 8 anos. Cirurgias: Sem história de cirurgia. Medicamentos: Enalapril 2 vezes por dia e metformina 1 vez por dia. Alergias: Nega.",
      "HÁBITOS: Álcool, cigarro e drogas ilícitas: Nega. Fezes e urina: Sem alteração. Atividade física: Ocasionalmente. Alimentação: Pouco variada, com muito sal."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – ECG de 12 derivações", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Gasometria arterial", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Radiografia de tórax", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga características da falta de ar (dispneia): (1) Tempo de evolução; (2) Progressão; (3) Frequência; (4) Fatores de melhora e/ou piora.",
      subItems: [],
      scoring: {
        adequate: "Investiga três ou mais características.",
        partial: "Investiga duas características.",
        inadequate: "Investiga uma ou nenhuma característica."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Realiza anamnese perguntando: (1) Dor torácica; (2) Palpitação; (3) Alteração visual; (4) Desmaio ou perda de consciência ou queda; (5) Perda de força; (6) Anúria/oligúria; (7) Fatores desencadeantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Medicação de uso contínuo; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Hábitos alimentares; (8) Prática de atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga as oito ações.",
        partial: "Investiga de cinco a sete ações.",
        inadequate: "Investiga quatro ou não investiga."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) Exame físico geral; (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exames de laboratório; (2) Gasometria arterial.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 7,
      title: "7. Solicita: (1) Eletrocardiograma; (2) Radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de emergência hipertensiva com edema agudo de pulmão.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Solicita cabeceira elevada; (2) Monitoramento contínuo; (3) Suporte ventilatório (catéter nasal OU máscara de O2 OU CPAP OU BIPAP); (4) Nitratos (nitroprussiato de sódio OU nitroglicerina); (5) Furosemida; (6) Internação em unidade de tratamento intensivo.",
      subItems: [],
      scoring: {
        adequate: "Realiza cinco ou mais itens.",
        partial: "Realiza de dois a quatro itens.",
        inadequate: "Realiza apenas um ou nenhum item."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Urgência Hipertensiva (UID: 1285)
export const urgenciaHipertensivaContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Unidade de pronto atendimento (UPA)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Exames de imagem básicos;",
      "- Sala de emergência."
    ],
    descricao: [
      "Você atende Jandira, 58 anos, obesa e hipertensa. A paciente refere que sua sobrinha, estudante de medicina, aferiu sua pressão e observou níveis muito elevados. Imediatamente, a sobrinha acompanhou a tia até a UPA do bairro."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa do paciente;",
    "- Solicitar exame físico direcionado à queixa do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Jandira, 58 anos de idade, cozinheira, casada.",
      "MOTIVO DE CONSULTA: Minha sobrinha me trouxe aqui porque minha pressão está 200x100 mmHg. Ela aferiu minha pressão há 1 hora.",
      "SINTOMAS ASSOCIADOS: Sinto que meu coração palpitando e minha cabeça dói.",
      "SE PERGUNTADO POR FATORES DESENCADEANTES: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho pressão alta há 9 anos. Medicamentos: Enalapril e hidroclorotiazida. Cirurgia: Nega. Alergia: Nega.",
      "HÁBITOS: Cigarro: Nega. Álcool: Nega. Drogas ilícitas: Nega. Alimentação: Minha alimentação não é muito boa, como muita coisa salgada, refrigerante e embutidos. Atividade física: Não faço atividade física porque não tenho muito tempo. Fezes e urina: Sem alteração.",
      "ANTECEDENTES FAMILIARES: Mãe e pai sem problemas de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma (ECG)", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese perguntando por: (1) Dispneia; (2) Dor torácica e/ou dor epigástrica/abdominal; (3) Palpitação; (4) Alterações visuais; (5) Desmaio ou perda de consciência ou queda; (6) Perda de força.",
      subItems: [],
      scoring: {
        adequate: "Pergunta de quatro a seis itens.",
        partial: "Pergunta três itens.",
        inadequate: "Pergunta dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga ao menos um dos seguintes fatores desencadeantes: (1) Estresse; (2) Morte de parente/amigo ou má notícia; (3) Uso de drogas estimulantes; (4) Abandono da medicação para hipertensão ou uso irregular; (5) Transgressão alimentar.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos um item da lista.",
        partial: "—",
        inadequate: "Não investigou."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças; (2) Medicamentos de uso contínuo/recente; (3) Alergias; (4) Tipo de alimentação; (5) Prática de atividade física; (6) Álcool; (7) Tabagismo.",
      subItems: [],
      scoring: {
        adequate: "Investiga de cinco a sete itens da lista.",
        partial: "Investiga de três a quatro itens da lista.",
        inadequate: "Investiga dois ou menos itens da lista."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico geral; e (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita os dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita exames laboratoriais: (1) Hemograma completo; (2) Função renal ou ureia/creatinina; (3) Eletrólitos ou sódio/potássio; (4) Marcadores cardíacos ou troponina; (5) Eletrocardiograma (ECG).",
      subItems: [],
      scoring: {
        adequate: "Solicita de quatro a cinco itens.",
        partial: "Solicita de dois a três itens.",
        inadequate: "Solicita um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de: Urgência hipertensiva.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Indicou anti-hipertensivo por via oral: captopril OU clonidina; (2) Repouso e/ou observação; (3) Orientou sobre alimentação e/ou atividade física regular; (4) Encaminhou a paciente para acompanhamento ambulatorial.",
      subItems: [],
      scoring: {
        adequate: "Realiza de três a quatro ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Pseudo Crise Hipertensiva (UID: 1288)
export const pseudoCriseHipertensivaContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de atenção secundária à saúde",
    tipo: "Urgência e Emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clinicas;",
      "- Serviço de radiologia convencional."
    ],
    descricao: [
      "Você é o médico de uma UPA (Unidade de Pronto Atendimento) e recebe um paciente trazido pelos filhos com queixa de dor de cabeça e náuseas. Os familiares referem que ao começar a sentir a dor, aferiram sua pressão e estava em 160x100 mmHg. Os familiares e o paciente estão angustiados com medo de acontecer algo grave."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar exames complementares, se necessário;",
    "- Verbalizar a hipótese diagnóstica;",
    "- Propor conduta terapêutica e esclarecer as dúvidas do paciente, se houver."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 57 anos, vendedor.",
      "MOTIVO DE CONSULTA: Me trouxeram porque estou com a pressão muito alta e com dor de cabeça.",
      "CARACTERÍSTICAS DA CEFALEIA: Tempo de evolução: Ela iniciou há umas 5 horas. Localização: Dói toda a cabeça. Intensidade: Moderada (6/10). Tipo de dor: Sensação de aperto. Irradiação: Não muda de lugar. Fatores de melhora/ piora: Sem fatores de melhora ou piora. Episódios anteriores: Às vezes tenho dor de cabeça como essa.",
      "SINTOMAS ACOMPANHANTES: Somente náuseas.",
      "SE PERGUNTADO POR FATORES DESENCADEANTES: Hoje de manhã briguei com minha esposa, ela saiu de casa e disse que não vai voltar. Depois disso fiquei muito angustiado e começou a dor de cabeça.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Medicamentos: Nega. Alergias: Nega. Cirurgia: Fiz uma cirurgia de hernia inguinal há 5 anos.",
      "HÁBITOS: Cigarro: 1 maço por dia. Álcool: Uma lata de cerveja por dia. Drogas ilícitas: Não uso nenhuma droga. Fezes e urina: Não percebi nenhuma alteração. Alimentação: Dieta variada. Atividade física: Faço caminhada duas vezes por semana.",
      "ANTECEDENTES FAMILIARES: Acho que minha mãe tem artrite reumatóide.",
      "Ao ser informado do tratamento e caso o candidato não mencionar anti-hipertensivo, perguntar: Não vai me passar algum remédio pra baixar a pressão?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.30 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Fatores de melhora; (7) Fatores de piora; (8) Sintomas acompanhantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga todos os itens.",
        partial: "Investiga de cinco a sete itens.",
        inadequate: "Investiga quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga sintomas de lesão aguda em órgão alvo: (1) Dispneia; (2) Dor torácica; (3) Alteração visual aguda; (4) Desmaio ou perda de consciência ou queda; (5) Perda de força; (6) Convulsão.",
      subItems: [],
      scoring: {
        adequate: "Investiga de cinco a seis itens.",
        partial: "Investiga quatro ou três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga algum dos seguintes fatores desencadeantes: (1) Estresse; (2) Morte de parente/amigo ou má notícia; (3) Uso de drogas estimulantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos um item.",
        partial: "—",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Questiona a respeito dos antecedentes: (1) Antecedentes pessoais; (2) Antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.60, max: 1.2 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico geral; (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Verbaliza o diagnóstico de pseudocrise hipertensiva.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza o diagnóstico.",
        partial: "—",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Propõe conduta terapêutica: (1) Indica tratamento sintomático com analgésico e/ou ansiolítico; (2) Acomoda o paciente em um ambiente tranquilo para observação. (3) Informa que não há necessidade de utilizar anti-hipertensivos nesse momento.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza nenhuma ação ou indica anti-hipertensivo."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};

// Content for Cefaleia em salvas – Trigêmino autonômica (UID: 1297)
export const cefaleiaSalvasContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Pronto-Atendimento",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você é médico da UPA e é chamado pela equipe de enfermagem para atender um paciente de 30 anos de idade, que chega desesperado e gritando que está tendo um derrame cerebral. Refere que sua cabeça parece que vai explodir."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica e verbalizar dois diagnósticos diferenciais;",
    "- Prescrever tratamento inicial e orientar sobre medidas de prevenção.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR O EXAME FÍSICO, VERBALIZE!",
    "O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO"
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marlon, 30 anos de idade, advogado.",
      "MOTIVO DE CONSULTA: Me ajuda pelo amor de Deus, acho que estou tendo um derrame. Estava vendo TV e tive uma dor muito forte de cabeça há 2 horas e melhorou sem eu fazer nada. 20 minutos depois a dor voltou e desapareceu em poucos minutos. E de novo tive a dor de cabeça, então vim correndo pra cá, porque pensei que pudesse ser um derrame cerebral.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: Começou de novo há 25 minutos. Localização: Dói do lado direito da cabeça em volta do olho. Intensidade: Muito forte (10/10). Tipo de dor: Parece que a cabeça vai explodir. Irradiação: Não muda de lugar. Episódios anteriores: É a segunda vez que tenho esse tipo de dor. Mudança no padrão da dor: Nega.",
      "SINTOMAS ASSOCIADOS: Meu olho está muito vermelho e meu nariz está escorrendo.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema, sempre cuidei muito da minha saúde. Cirurgias: Nega. Medicamentos: Nega. Alergias: Não sei te dizer.",
      "HÁBITOS: Cigarro: Não fumo. Álcool: Bebo de vez em quando. Drogas ilícitas: Não uso drogas. Atividade física: Faço musculação 5 vezes por semana. Alimentação: Variada.",
      "ANTECEDENTES FAMILIARES: Pai e mãe sem problemas de saúde.",
      "Ao receber algum diagnóstico, perguntar: Não quero ter essa dor nunca mais na minha vida! O que preciso fazer?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma das ações."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Fatores de melhora; (7) Fatores de piora; (8) Mudança no padrão da dor; (9) Frequência ou número de episódios por semana. (10) Duração das crises; (11) Sintomas acompanhantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito ou mais características da dor.",
        partial: "Investiga de quatro a sete características da dor.",
        inadequate: "Investiga três ou menos características da dor."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Comorbidades; (2) Uso de medicamentos; (3) Alergias; (4) Internações ou cirurgias prévias; (5) Antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga sobre os hábitos de vida: (1) Qualidade do sono; (2) Alimentação; (3) Atividade física; (4) Estresse; (5) Álcool e/ou cigarro e/ou drogas.",
      subItems: [],
      scoring: {
        adequate: "Investiga os cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Identifica as alterações no exame físico: (1) Ptose palpebral à direita; (2) Hiperemia de conjuntiva à direita; (3) Lacrimejamento à direita; (4) Rinorreia à direita. (5) Miose à direita ou anisocoria.",
      subItems: [],
      scoring: {
        adequate: "Identifica quatro ou mais alterações.",
        partial: "Identifica duas ou três alterações.",
        inadequate: "Identifica uma ou nenhuma alteração."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) exame físico e (2) neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Formula a hipótese diagnóstica: cefaleia em salvas OU cefaleia trigêmino-autonômica.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 8,
      title: "8. Verbaliza diagnósticos diferenciais da cefaleia em salvas: (1) Hemicrania paroxística; (2) Hemicrania contínua; (3) Enxaqueca (migrânea); (4) Cefaleia tensional; (5) Glaucoma agudo; (6) Sinusite esfenoidal ou etmoidal.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza dois ou mais diagnósticos diferenciais.",
        partial: "Verbaliza um diagnóstico.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Orienta o paciente a respeito da conduta terapêutica: (1) Inicia oxigênio a 100% com máscara facial não reinalante ou sumatriptano; (2) Inicia uso de verapamil para profilaxia; (3) Solicita interconsulta com neurologia.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.8, max: 1.75 }
    }
  ],
  references: []
};

// Content for Cefaleia Tensional (UID: 1298)
export const cefaleiaTensionalContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado)."
    ],
    descricao: [
      "Você é o médico da unidade básica de saúde do bairro e atende um homem de 35 anos de idade, programador de sistemas, com queixa de dores de cabeça há 8 meses."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares se pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR O EXAME FÍSICO, VERBALIZE!",
    "O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Túlio, 35 anos, casado, programador de sistemas.",
      "MOTIVO DE CONSULTA: Tenho dores de cabeça desde que comecei a trabalhar como programador de sistemas. Passo em média 12 horas na frente do computador. E ontem tomei minha pressão por causa da dor e estava 160x100, fiquei muito assustado porque nunca tive pressão alta. Queria ser examinado pra saber se está tudo bem comigo.",
      "SE PERGUNTADO POR SINTOMAS ATUAIS: Negar todos (paciente está assintomático).",
      "CARACTERÍSTICAS DOS EPISÓDIOS DE DOR DE CABEÇA: Localização: Dói na parte de traz da cabeça e na nuca. Intensidade: Geralmente é uma dor leve e às vezes moderada. Tipo de dor: Sinto um aperto na cabeça. Irradiação: Não muda de lugar. Fatores de melhora: Tomar paracetamol. Fatores de piora: Nega. Frequência: Uma ou duas vezes por semana. Duração: Se eu não tomar remédio dura quase 2 dias. Mudança no padrão da dor: Nega.",
      "SINTOMAS ASSOCIADOS: Sinto os músculos do pescoço e ombro duros.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergia: Tenho alergia à penicilina. Cirurgias: Nega.",
      "HÁBITOS: Cigarro: Nega. Álcool: Bebe de vez em quando em pouca quantidade. Drogas ilícitas: Nega. Atividade física: Nega. Alimentação: Massas, frituras. Poucas frutas e verduras. Sono: Tenho dificuldade para adormecer à noite. Estresse: Trabalho muito todos os dias e não tenho muito tempo para lazer.",
      "ANTECEDENTES FAMILIARES: Minha mãe não tem problemas de saúde e meu pai tem diabetes.",
      "AO RECEBER ALGUM DIAGNÓSTICO, PERGUNTAR: O que eu posso fazer pra melhorar? Não aguento mais ter dor de cabeça. Vou precisar tomar algum remédio para controlar a pressão?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma das ações."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Fatores de melhora; (7) Fatores de piora; (8) Mudança no padrão da dor; (9) Frequência ou número de episódios por semana; (10) Duração das crises; (11) Sintomas acompanhantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito ou mais características da dor.",
        partial: "Investiga de quatro a sete características da dor.",
        inadequate: "Investiga três ou menos características da dor."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Comorbidades; (2) Uso de medicamentos; (3) Alergias; (4) Internações ou cirurgias prévias; (5) Antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga sobre os hábitos de vida: (1) Qualidade do sono; (2) Alimentação; (3) Atividade física; (4) Estresse; (5) Álcool e/ou cigarro e/ou drogas.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) exame físico e (2) neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.6, max: 1.25 }
    },
    {
      id: 6,
      title: "6. Formula a hipótese diagnóstica: cefaleia tensional.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese.",
        partial: "—",
        inadequate: "Não formula a hipótese."
      },
      scores: { min: 0, partial: 0, max: 2.5 }
    },
    {
      id: 7,
      title: "7. Informa ao paciente que a pressão nesse momento está normal e que provavelmente estava alta devido à dor.",
      subItems: [],
      scoring: {
        adequate: "Informa corretamente.",
        partial: "—",
        inadequate: "Não informa ou indica algum anti-hipertensivo."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 8,
      title: "8. Conduta terapêutica: (1) Prescreve analgésico e/ou AINE para as crises; (2) Orienta sobre estilo de vida saudável; (3) Orienta sobre ergonomia ou mudanças no ambiente de trabalho; (4) Orienta retorno para reavaliação.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.75 }
    }
  ],
  references: []
};

// Content for Migrânea (UID: 1310)
export const migraneaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Demanda espontânea – Unidade básica de saúde da família (UBSF)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios."
    ],
    descricao: [
      "Você é o médico da UBS do bairro e atende uma mulher de 30 anos, professora, com queixa de frequentes episódios de cefaleia."
    ]
  },
  orientacoes: [
    "- Anamnese (ATENÇÃO! A ANAMNESE DEVERÁ SER CONCLUÍDA ANTES DE PASSAR PARA A PRÓXIMA TAREFA).",
    "- Exame físico.",
    "- Exames complementares se necessários à investigação.",
    "- Conduta terapêutica.",
    "- Orientações à paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Sabrina, 30 anos, professora, em uma relação estável.",
      "MOTIVO DE CONSULTA: Estou tendo muita dor de cabeça. Sempre tomo remédio quando dói, as vezes melhora e as vezes preciso ir ao pronto socorro pra tomar um remédio mais forte. Essas dores estão atrapalhando meu rendimento no trabalho.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: faz 1 ano que comecei a ter esse tipo de dor (sem dor nesse momento). Localização: do lado direito da cabeça quase sempre. Intensidade: forte (7/10). Tipo de dor: sinto que a cabeça fica latejando. Irradiação: não muda de lugar. Frequência: uma ou duas vezes por semana. Duração das crises: 1 dia e meio mais ou menos. Fatores de melhora: deitar num quarto escuro sem barulho e tomar remédio. Fatores de piora: atividade física. Mudança no padrão da dor: não, a dor é sempre do mesmo jeito.",
      "SINTOMAS ASSOCIADOS: Sempre me da náuseas e às vezes chego a vomitar e meus olhos ficam muito sensíveis à luz.",
      "SE PERGUNTADO POR SINTOMAS ANTES DO INÍCIO DA DOR (AURA): Antes de doer começo a ver uns pontos pretos e sinto a cabeça vazia; isso dura uns 20 minutos. Depois disso já sei que vem a dor.",
      "ANTECEDENTES PESSOAIS: Doenças: não tenho problemas de saúde. Cigarro: fumo meio maço de cigarro por dia. Álcool: bebo de vez em quando. Drogas: nega. Atividade física: musculação 3 vezes por semana. Alimentação: dieta variada. Sono: considero que tenho bom descanso noturno.",
      "ANTECEDENTES FAMILIARES: Minha mãe e minha tia também têm essas dores de cabeça.",
      "AO RECEBER O DIAGNÓSTICO DE ENXAQUECA/ MIGRÂNEA, PERGUNTAR: Vou precisar fazer algum exame da cabeça ou de sangue?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investigou as características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Atenuantes e/ou agravantes; (7) Mudança do padrão da dor; (8) Sintomas associados.",
      subItems: [],
      scoring: {
        adequate: "Investigou ao menos 6 itens.",
        partial: "Investigou de 4 a 5 itens.",
        inadequate: "Investigou 3 ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investigou antecedentes (1) pessoais e (2) familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga os 2 itens.",
        partial: "Investiga apenas 1 item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.75 }
    },
    {
      id: 4,
      title: "4. Investigou hábitos: (1) Sono; (2) Alimentação; (3) Atividade física; (4) Estresse; (5) Cigarro e/ou álcool e/ou drogas.",
      subItems: [],
      scoring: {
        adequate: "Investiga os 5 itens.",
        partial: "Investiga 3 ou 4 itens.",
        inadequate: "Investiga 2 ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Solicitou (1) exame físico e (2) exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas tarefas.",
        partial: "Realiza apenas uma tarefa.",
        inadequate: "Não realiza nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Realizou o diagnóstico de enxaqueca/ migrânea.",
      subItems: [],
      scoring: {
        adequate: "Realizou.",
        partial: "—",
        inadequate: "Não realizou."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 7,
      title: "7. Informou que não há necessidade de nenhum exame para confirmar o diagnóstico.",
      subItems: [],
      scoring: {
        adequate: "Informou.",
        partial: "—",
        inadequate: "Não informou ou solicitou algum exame."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Conduta terapêutica: (1) Indicou medicamentos para profilaxia e/ou encaminhou ao neurologista; (2) Analgésico, AINH, triptanos ou derivados da ergotamina para as crises; (3) Orientou sobre estilo de vida saudável; (4) Solicitou que o paciente anote/ realize um diário dos episódios de cefaleia; (5) Solicitou retorno.",
      subItems: [],
      scoring: {
        adequate: "Realizou 4 ou 5 ações (obrigatoriamente deve incluir o item 1).",
        partial: "Realizou duas ou três ações.",
        inadequate: "Não realiza o item 1 ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 9,
      title: "9. Realizou as tarefas conforme a orientação.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Content for Transtorno Depressivo Maior (UID: 1311)
export const transtornoDepressivoMaiorContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é médico de uma Unidade Primária de Saúde e recebe para consulta o paciente do sexo masculino, de 30 anos de idade, estudante de medicina do segundo ano."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica;",
    "- Verbalizar ao menos um diagnóstico diferencial;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Igor, 30 anos, solteiro, estudante de medicina.",
      "MOTIVO DE CONSULTA: Venho porque estou me sentindo muito mal, estou triste e não sei o motivo.",
      "CARACTERÍSTICAS DOS SINTOMAS: Início: Faz três meses que estou assim. Frequência: Me sinto assim todos os dias, a maior parte do tempo.",
      "SINTOMAS ASSOCIADOS (RESPONDER CONFORME PERGUNTADO): Perda de concentração ou memória: Sim, estou com dificuldade pra estudar. Insônia ou excesso de sono: Estou dormindo praticamente o dia todo, me sinto sem energia e cansado. Perda de prazer/ interesse nas atividades: Gosto muito de jogar bola nos finais de semana, mas ultimamente nem isso estou fazendo. Perda ou aumento excessivo de apetite ou peso: Sim, perdi vários quilos nesses últimos meses porque não tenho fome. Outros sintomas: Nega.",
      "SE PERGUNTADO POR PROBLEMAS PESSOAIS/ SOCIAIS: Tenho uma boa relação com minha familia e amigos. O curso de medicina está muito difícil, mas sempre temos apoio dos professores e colegas.",
      "SE PERGUNTADO POR IDEAÇÃO SUICIDA: Não doutor (a), isso nunca!",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Nega. Cirurgias: Nega.",
      "HÁBITOS: Cigarro: Nega. Drogas ilícitas: Nega. Álcool: Bebo mais nos finais de semana. Alimentação: Não me alimento bem porque o tempo é pouco e ultimamente não tenho fome. Atividade física: Não.",
      "SE INVESTIGADO ANTECEDENTES FAMILIARES DE DEPRESSÃO: Que eu saiba não."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Escuta atentamente o paciente sem interrompê-lo e mantém postura empática.",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.20 }
    },
    {
      id: 3,
      title: "3. Pergunta por outros sinais e sintomas: (1) Perda de concentração ou memória; (2) Insônia ou excesso de sono; (3) Perda de prazer/interesse nas atividades; (4) Perda ou aumento excessivo de apetite ou peso.",
      subItems: [],
      scoring: {
        adequate: "Investiga três ou mais itens.",
        partial: "Investiga um ou dois itens.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Pergunta de forma clara e direta sobre ideação suicida.",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga episódios de mania perguntando: (1) Aumento repentino de energia; (2) Momentos de euforia; (3) Momentos de nervosismo; (4) Pensamento acelerado; (5) Não conseguir manter uma linha de pensamento e falar sobre diversos assuntos ao mesmo tempo.",
      subItems: [],
      scoring: {
        adequate: "Investiga dois ou mais itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.4, max: 0.8 }
    },
    {
      id: 6,
      title: "6. Investiga antecedentes pessoais: (1) Doenças; (2) Consumo de álcool; (3) Drogas ilícitas; (4) Medicamentos; (5) Cigarro; (6) Alergias.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Investiga antecedente familiar de depressão.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita laboratório: (1) Hemograma; (2) Função da tireoide ou TSH e T4 livre; (3) Vitamina D; (4) Vitamina B12.",
      subItems: [],
      scoring: {
        adequate: "Solicita três ou mais itens.",
        partial: "Solicita um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de transtorno depressivo maior ou depressão.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.75 }
    },
    {
      id: 11,
      title: "11. Verbaliza diagnóstico diferencial: (1) Hipotiroidismo; (2) Anemia por deficiência de ferro; (3) Anemia megaloblástica.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza ao menos um diagnóstico diferencial.",
        partial: "—",
        inadequate: "Não verbaliza diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica: (1) Indica tratamento com antidepressivos; (2) Oferece apoio com equipe multidisciplinar ou psicologia; (3) Orienta retorno para acompanhamento. (4) Reforça hábitos de vida saudáveis.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ações.",
        partial: "Realiza duas ou três ações (deve incluir obrigatoriamente o item um).",
        inadequate: "Não realiza o item um ou item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Artrite Reumatoide (UID: 1312)
export const artriteReumatoideContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Ultrassonografia."
    ],
    descricao: [
      "Paciente procura serviço de saúde por queixas de dores."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico.",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
    "O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ana, 37 anos de idade, professora.",
      "MOTIVO DE CONSULTA: Estou com dor nas articulações.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: Sete meses. Localização: Inicialmente nas mãos, e agora também nos punhos e pés. Intensidade: Leve (4/10). Tipo de dor: Continua. Irradiação: Não irradia. Fatores de piora: A dor é pior quando fico muito tempo em repouso. Fatores de melhora: Quando tomo diclofenaco ou movimento a articulação alivia um pouco.",
      "SE PERGUNTADO POR RIGIDEZ NAS ARTICULAÇÕES: Quase todos os dias de manhã. Dura umas duas horas e depois melhora.",
      "SINTOMAS ACOMPANHANTES: Vermelhidão ou calor local ou edema: às vezes sim.",
      "SE PERGUNTADO POR MANIFESTAÇÕES SISTÊMICAS: Febre: Nega. Fadiga: Últimamente à tarde me sinto muito cansada. Lesões ou nódulos na pele: Não vi lesões nem nódulos na pele.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega doenças prévias. Medicamentos: Nega. Alergias: Nega. Cirurgias: Nega.",
      "HÁBITOS: Álcool: Bebo cerveja de vez em quando. Cigarro: Fumo 1 maço por dia. Drogas ilícitas: Nega. Alterações em urina e fezes: Nega.",
      "ANTECEDENTES FAMILIARES: Pai e mãe não tem problemas de saúde.",
      "Se o candidato solicitar radiografía de mãos e/ou pés: liberar o IMPRESSO 4."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Fator reumatoide e Anti CCP", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Radiografia de mãos", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor: (1) Tempo de evolução; (2) Articulações afetadas; (3) Intensidade; (4) Irradiação; (5) Fatores de melhora; (6) Fatores de piora.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais características.",
        partial: "Investiga três ou quatro características.",
        inadequate: "Investiga duas ou menos características."
      },
      scores: { min: 0, partial: 0.75, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por sintomas associados: (1) Rigidez matinal; (2) Duração da rigidez; (3) Sinais de inflamação local (vermelhidão e/ou calor local e/ou edema); (4) Febre; (5) Astenia; (6) Nódulos subcutâneos e/ou lesões de pele.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças; (2) Cigarro; (3) Álcool; (4) Drogas ilícitas; (5) Alergias.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares de doenças reumatológicas.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita o exame físico articular.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames gerais de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita sorologia para artrite reumatóide: (1) Fator reumatóide; (2) Anticorpo antipeptídeo citrulinado cíclico (anti-CCP).",
      subItems: [],
      scoring: {
        adequate: "Solicita dois exames.",
        partial: "Solicita um exame.",
        inadequate: "Não solicita nenhum dos exames."
      },
      scores: { min: 0, partial: 0.5, max: 1.75 }
    },
    {
      id: 9,
      title: "9. Solicita radiografia de mãos e/ou pés.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de artrite reumatóide.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico corretamente.",
        partial: "—",
        inadequate: "Não realiza ou cita outro diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 11,
      title: "11. Conduta terapêutica: (1) Tratamento com drogas reumáticas modificadoras da doença (metotrexato OU leflunomida OU sulfassalazina OU hidroxicloroquina); (2) Anti-inflamatório não hormonal ou glicocorticoides para controle da dor; (3) Encaminha a paciente ao reumatologista.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Orienta medidas de cuidado geral: (1) Alimentação balanceada; (2) Atividade física regular; (3) Abandono do cigarro; (4) Evitar álcool e drogas; (5) Evitar atividade física extenuante ou longos períodos de pé.",
      subItems: [],
      scoring: {
        adequate: "Orienta quatro itens.",
        partial: "Orienta três itens.",
        inadequate: "Orienta dois ou menos itens."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    }
  ],
  references: []
};

// Content for Pielonefrite Aguda (UID: 1316)
export const pielonefriteAgudaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é médico plantonista, e recebe uma paciente de 25 anos anos, que mora a poucos metros da UPA e consulta por queixas urinárias."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marina, 25 anos de idade, secretária.",
      "MOTIVO DE CONSULTA: Estou com ardor para urinar e uma dorzinha chata na barriga.",
      "CARACTERÍSTICAS DA DOR ABDOMINAL: Tempo de evolução: Oito dias. Localização: Embaixo do umbigo. Intensidade: 5/10. Tipo de dor: Em pontada. Irradiação: Nega. Fatores de melhora/ piora: Nega.",
      "SINTOMAS ACOMPANHANTES: Tenesmo vesical: Sim, toda hora me da vontade de ir ao banheiro, sinto que não esvazio bem a bexiga. Dor lombar: Sim, do lado direito. Calafrios/ febre: Sim. Vômitos: Nega. Episódios anteriores: É a primeira vez que tenho isso.",
      "USO RECENTE DE ANTIBIÓTICOS: Tomei amoxicilina por 3 dias que encontrei na minha casa pensando que era infecção de urina mas não resolveu nada.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Cirurgias: Nega. Medicamentos: Anticoncepcional oral. Alergias: Até hoje nunca tive alergia a nada. Data da última menstruação: Há 15 dias.",
      "HÁBITOS: Álcool: Não. Cigarro: Não. Drogas: Não. Ingesta hídrica: Não tomo muita água. Retenção urinária: Seguro muito o xixi porque não da pra ficar parando toda hora no trabalho para ir ao banheiro.",
      "VIDA SEXUAL: Ativa: Sim. Parceiros sexuais: Somente meu namorado. Uso de preservativos: Não. Dor nas relações sexuais: Não. Corrimento vaginal: Não."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Análise de urina", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Urocultura", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor abdominal.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga outros sinais e sintomas: (1) Hematúria (ou urina vermelha); (2) Dor lombar; (3) Febre e/ou calafrio; (4) Náusea e/ou vômitos; (5) Tenesmo vesical.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças prévias; (2) Uso recente de antibióticos; (3) Alergias; (4) Ingesta hídrica e/ou hábito de reter urina; (5) Episódios anteriores similares; (6) Data da última menstruação.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga três ou quatro itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga vida sexual perguntando: (1) Se tem vida sexual ativa; (2) Novo parceiro sexual e/ou número de parceiros; (3) Uso de preservativo; (4) Corrimento vaginal; (5) Dispareunia.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga 2 ou 3 itens.",
        inadequate: "Investiga apenas 1 ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico geral; (2) Manobra de Giordano.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. (1) Solicita exames de laboratório e (2) verbaliza as seguintes alterações: leucocitose com predomínio de neutrófilos e PCR aumentada.",
      subItems: [],
      scoring: {
        adequate: "Solicita e verbaliza as alterações.",
        partial: "Solicita mas não verbaliza as alterações.",
        inadequate: "Não solicita exames."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita: (1) Análise de urina OU urina tipo 1 OU urina rotina; (2) Urocultura.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois exames.",
        partial: "Solicita apenas um dos exames.",
        inadequate: "Não solicita nenhum exame."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Realiza o diagnóstico de pielonefrite aguda.",
      subItems: [],
      scoring: {
        adequate: "Realiza corretamente o diagnóstico.",
        partial: "—",
        inadequate: "Não realiza ou informou outro diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Conduta terapêutica: (1) Indica tratamento ambulatorial com ciprofloxacina via oral; (2) Antitérmico e/ou analgésico; (3) Indica retorno diário na UPA OU em 48/72 horas para novas avaliações do quadro clínico e da urocultura.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realizou duas ações.",
        inadequate: "Realiza apenas uma ação ou nenhuma delas."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 11,
      title: "11. Deu orientações gerais sobre: (1) Prevenção de infecções urinárias; (2) Uso racional de antibióticos: não usar antibióticos sem recomendação médica.",
      subItems: [],
      scoring: {
        adequate: "Orienta dois itens.",
        partial: "—",
        inadequate: "Orienta sobre um ou nenhum item."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    }
  ],
  references: []
};

// Content for Cetoacidose Diabética (UID: 1317)
export const cetoacidoseDiabeticaContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é chamado para atender uma mulher de 20 anos de idade, com diagnóstico prévio de diabetes mellitus tipo 1, com queixas de dor abdominal intensa, náuseas e vômitos."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Verbalizar e escrever a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Verbalizar e escrever a prescrição médica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ana, 20 anos de idade, estudante.",
      "MOTIVO DE CONSULTA: Estou com uma dor na barriga muito forte e vomitei 4 vezes.",
      "CARACTERÍSTICAS DA DOR: Tempo de evolução: Começou ontem (há 20 horas mais ou menos). Localização: Dói a barriga inteira. Intensidade: 7/10. Tipo de dor: Contínua. Irradiação: Sem irradiação. Fatores de melhora ou piora: Nega. Progressão: Começou leve e faz umas 6 horas que está mais forte.",
      "SE PERGUNTADO POR SINTOMAS DE INFECÇÃO OU FEBRE: Negar qualquer sintoma perguntado.",
      "SE PERGUNTADO POR: Aumento da sede ou volume urinário ou ingestão alimentar: Sim, senti que tenho mais sede do que o normal e estou urinando muito esses dias.",
      "SE INVESTIGADO SOBRE O USO DA INSULINA OU ABANDONO: Estou sem insulina há vários dias porque não consegui retirar a medicação no posto de saúde.",
      "ANTECEDENTES PESSOAIS: Doenças: Diabetes tipo 1. Medicamentos: Tomo insulina e anticoncepcional oral. Alergias: Que eu saiba não tenho alergias. Cirurgias: Nega. Data da última menstruação: Há 5 dias.",
      "HÁBITOS: Drogas: Nega. Cigarro: Nega. Álcool: Nega. Alimentação: Sigo uma dieta que o nutricionista me passou.",
      "ANTECEDENTES FAMILIARES: Minha mãe é diabética. Meu pai não tem problema de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Glicemia capilar aleatória", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor abdominal: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Atenuantes e/ou agravantes; (7) Progressão; (8) Sintomas acompanhantes; (9) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga sete ou mais características.",
        partial: "Investiga de três a seis características.",
        inadequate: "Investiga duas ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta por algum dos seguintes sintomas de diabetes descompensada: polidipsia, polifagia, poliúria, perda de peso.",
      subItems: [],
      scoring: {
        adequate: "Pergunta.",
        partial: "—",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais perguntando: (1) Doenças; (2) Cirurgias; (3) Álcool e/ou cigarro e/ou drogas ilícitas; (4) Medicamentos; (5) Alergias; (6) Data da última menstruação.",
      subItems: [],
      scoring: {
        adequate: "Investiga seis itens.",
        partial: "Investiga de três a cinco itens.",
        inadequate: "Investiga duas ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga possíveis fatores desencadeantes do quadro atual perguntando: (1) Abandono ou uso incorreto da insulina; (2) Infecções; (3) Transgressão alimentar.",
      subItems: [],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga um ou dois itens.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita glicemia capilar.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita ou verbaliza apenas glicemia ou glicemia sérica."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Solicita laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Verbaliza as alterações do laboratório: (1) Acidose metabólica; (2) Anion gap aumentado; (3) Corpos cetônicos aumentados; (4) Glicemia sérica aumentada.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza quatro alterações.",
        partial: "Verbalizou duas ou três alterações.",
        inadequate: "Verbaliza uma ou nenhuma alteração."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza o diagnóstico de cetoacidose diabética.",
      subItems: [],
      scoring: {
        adequate: "Realiza corretamente o diagnóstico.",
        partial: "—",
        inadequate: "Não informa ou realizou outro diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 1.3 }
    },
    {
      id: 11,
      title: "11. Conduta terapêutica: (1) Reposição volêmica com SF 0,9%; (2) Reposição de potássio; (3) Verifica se potássio está devidamente corrigido; (4) Inicia Insulina IV; (5) Internação.",
      subItems: [],
      scoring: {
        adequate: "Realiza as cinco ações.",
        partial: "Realiza duas a quatro ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Explica à paciente que o tratamento com insulina não deve ser interrompido para evitar complicações.",
      subItems: [],
      scoring: {
        adequate: "Explica.",
        partial: "—",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Hipertireoidismo | INEP 2021.1 (UID: 1322)
export const hipertireoidismoInep2021Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Um homem de 35 anos de idade, chamado Fábio, que se queixa de nos últimos tempos sentir-se muito irritado e ansioso. Está sempre incomodado com o calor, perdeu 15Kg em 3 semanas e seus colegas de trabalho passaram a chamá-lo de 'olho de peixe' ('olhos saltados')."
    ]
  },
  orientacoes: [
    "- Anamnese.",
    "- Exame físico.",
    "- Solicitar e interpretar adequadamente exames complementares pertinentes ao caso.",
    "- Informar o diagnóstico.",
    "- Realizar a conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Fábio, 35 anos, pedreiro, casado.",
      "MOTIVO DE CONSULTA: Faz uns 6 meses que me sinto muito irritado e ansioso, tenho calor o tempo todo e perdi 15Kg em 3 semanas. Percebi também que meus olhos estão muito grandes.",
      "QUALQUER PERGUNTA QUE FOR REALIZADA SOBRE OS SINTOMAS DO MOTIVO DE CONSULTA: Não consta no script.",
      "SINTOMAS ASSOCIADOS: Negar todos.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Transtornos psiquiátricos: Nega. Medicamentos: Nega. Alergias: Nega.",
      "HÁBITOS: Cigarro: Fumo 1 maço por dia há 3 anos. Álcool: Bebo cerveja nos finais de semana. Drogas: Nega."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Ultrassonografia de tireoide", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Não realiza nenhuma ação ou realiza apenas 1 item."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Realiza perguntas pertinentes ao caso: (1) Uso de medicamentos; (2) Drogas ilícitas; (3) Doenças; (4) Presença de transtornos psiquiátricos (exceto sintomas de ansiedade e de irritabilidade).",
      subItems: [],
      scoring: {
        adequate: "Pergunta quatro itens.",
        partial: "Pergunta dois ou três itens.",
        inadequate: "Pergunta apenas um item ou não pergunta nenhum."
      },
      scores: { min: 0, partial: 0.75, max: 1.75 }
    },
    {
      id: 3,
      title: "3. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 4,
      title: "4. Solicita exames laboratoriais de hormônios tireoideanos (validar se solicitar explicitamente hormônios tireoideanos, ou TSH e T4 livre).",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 5,
      title: "5. Solicita ecografia da glândula tireoide.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Hipótese diagnóstica: Faz o diagnóstico de hipertireoidismo.",
      subItems: [],
      scoring: {
        adequate: "Faz.",
        partial: "—",
        inadequate: "Não faz."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 7,
      title: "7. Cita o tratamento clínico: Betabloqueadores (Propranolol, atenolol, metoprolol) ou bloqueador canal de cálcio (verapamil, ou diltiazem) e tionamidas: propiltiouracil, metimazol (esses se for doença de Graves).",
      subItems: [],
      scoring: {
        adequate: "Cita Betabloqueadores ou bloqueador canal de cálcio e tionamidas.",
        partial: "Cita pelo menos tionamidas: propiltiouracil, metimazol.",
        inadequate: "Não cita nenhum tratamento medicamentoso ou cita tratamento inadequado."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Content for Tromboembolismo Pulmonar – TEP (UID: 1337)
export const tromboembolismoPulmonarTepContent: ChecklistContent = {
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
      "Você recebe uma paciente de 45 anos de idade com queixas de dispneia e dor torácica."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Indicar conduta terapêutica adequada.",
    "ATENÇÃO! AS TAREFAS DEVEM SER REALIZADAS NA ORDEM DESCRITA ACIMA!"
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Bruna, 45 anos de idade, farmacêutica.",
      "MOTIVO DE CONSULTA: Estou com falta de ar e dor no peito.",
      "CARACTERÍSTICAS DA DOR NO PEITO: Início: Começou há 6 horas, tava em casa vendo TV e começou do nada. Intensidade: Moderada (6/10). Tipo de dor: Parece que é uma pontada. Fatores de piora: Quando respiro fundo. Fatores de melhora: Nenhum. Irradiação: Não muda de lugar.",
      "SE PERGUNTADO PELA FALTA DE AR: Está o tempo todo, independente se estou deitada ou de pé.",
      "SINTOMAS ASSOCIADOS: A minha panturrilha direita está muito inchada e dolorida (se nesse momento o candidato perguntar por histórico de TVP, responder: que eu saiba nunca tive isso).",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgia: Fiz uma cirurgia no joelho há três meses. Medicamentos: Anticoncepcional oral combinado. Imobilização prolongada: Devido à cirurgia que fiz no joelho não podia caminhar e fiquei só deitada por vários dias. Data da última menstruação: Há 2 dias.",
      "HÁBITOS: Álcool: Cerveja eu tomo todos os fins de semana. Cigarro: Fumo 1 maço de cigarro por dia há 18 anos. Drogas ilícitas: Nega.",
      "Antecedentes familiares: Pai e mãe sem problemas de saúde."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Radiografia de tórax", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Ecocardiograma transtorácico", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Eletrocardiograma de 12 derivações", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta a paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor torácica: (1) Tempo de início; (2) Irradiação; (3) Tipo de dor; (4) Intensidade; (5) Fatores de melhora; (6) Fatores de piora; (7) Progressão; (8) Sintomas acompanhantes; (9) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga sete ou mais características.",
        partial: "Investiga de quatro a seis características.",
        inadequate: "Investiga três ou menos características."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga as características da dispneia.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga fatores de risco para TVP/TEP perguntando: (1) Antecedentes de TVP e/ou TEP; (2) Câncer; (3) Coagulopatias; (4) Viagens prolongadas e/ou imobilização recente; (5) Uso de anticoncepcional oral combinado. (6) Tabagismo; (7) Gravidez atual ou data da última menstruação.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga de dois a quatro itens.",
        inadequate: "Investigou 1 ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "—",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico e identificou a instabilidade hemodinâmica.",
      subItems: [],
      scoring: {
        adequate: "Solicita e identificou a instabilidade hemodinâmica.",
        partial: "Solicita exame fisico sem identificar a instabilidade hemodinâmica.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. (1) Solicita radiografía de tórax e (2) verbaliza os achados: corcova de Hampton ou opacidade triangular com base voltada para a pleura e vértice voltado para o hilo.",
      subItems: [],
      scoring: {
        adequate: "Solicita e interpreta adequadamente.",
        partial: "Solicita mas não verbaliza os achados.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Solicita eletrocardiograma de 12 derivações.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Solicita ecocardiograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 11,
      title: "11. Realiza o diagnóstico de Tromboembolismo Pulmonar.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "—",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica: (1) Internação; (2) Anticoagulação; (3) Trombólise; (4) Suporte ventilatório e/ou hemodinâmico.",
      subItems: [],
      scoring: {
        adequate: "Indica quatro itens.",
        partial: "Indica dois ou três itens (obrigatoriamente deve incluir trombólise).",
        inadequate: "Não indicou trombólise OU indicou somente algum dos outros itens OU não indicou item algum."
      },
      scores: { min: 0, partial: 0.75, max: 2 }
    }
  ],
  references: []
};

// Anemia Megaloblástica | INEP 2022.2 (ID: 1339)
export const anemiaMegaloblasticaInep2022Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Mulher de 26 anos, com queixas de fadiga, cefaleia e dormência nas mãos há seis meses."
    ]
  },
  orientacoes: [
    "- Realizar anamnese da paciente.",
    "- Solicitar e interpretar exame físico.",
    "- Solicitar e interpretar exames complementares caso clínico, se necessário.",
    "- Definir a(s) hipótese(s) diagnóstica(s) e sua(s) etiologia(s).",
    "- Propor a conduta terapêutica necessária.",
    "",
    "ATENÇÃO: VOCÊ DEVERÁ, OBRIGATORIAMENTE, REALIZAR AS TAREFAS NA SEQUÊNCIA DESCRITA ACIMA."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Fernanda, 26 anos, casada, comerciante.",
      "MOTIVO DE CONSULTA: Faz uns 6 meses que estou sentindo dormência nas mãos, nos pés, dor de cabeça e cansaço.",
      "SE PERGUNTADO SOBRE OS SINTOMAS DO MOTIVO DE CONSULTA: Não consta no script (a única informação disponível é o tempo de evolução de 6 meses).",
      "SE PERGUNTADO POR: Alteração na marcha: Sinto que estou caminhando meio estranho. Perda de força/fraqueza: Sim, parece que estou sem força nas pernas. Perda de equilíbrio: Nega. Queda: Sim, duas vezes. Acho que foi pela fraqueza nas pernas. Tontura: Nega. Alteração em mucosas/língua: Sinto que a língua está meio inflamada.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Alergias: Nega. Cirurgias: Fiz cirurgia bariátrica há 5 anos. Medicamentos/suplementos/vitaminas: Não tomo nada.",
      "HÁBITOS: Álcool: Bebo no fins de semana. Cigarro: Nega. Drogas ilícitas: Nega. Peso corporal: Não percebi alteração no peso. Fezes: Nega alterações. Urina: Nega alterações. Alimentação: Como pequenas porções ao longo do dia. Alterações menstruais ou sangramento vaginal anormal: Nega.",
      "AO SER INFORMADO DO TRATAMENTO, PERGUNTAR: Tenho que tomar essas vitaminas por quanto tempo?",
      "SE O CANDIDATO MENCIONAR INJEÇÕES DE VITAMINA B12, QUESTIONAR: Não queria tomar injeções, existe outra opção?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta por sinais e sintomas relacionados à anemia: (1) TGI: perda sanguínea como melena ou hematêmese; (2) Ginecológico: alterações menstruais/sangramento anormal; (3) Nutricional: alteração de apetite; (4) Neoplásica: perda de peso não intencional.",
      subItems: [],
      scoring: {
        adequate: "Pergunta quatro itens.",
        partial: "Pergunta dois ou três itens.",
        inadequate: "Pergunta um item ou não pergunta item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: null
    },
    {
      id: 3,
      title: "3. Investiga manifestações neurológicas: (1) Alterações na marcha; (2) Perda de força (ou fraqueza); (3) Alterações do equilíbrio (queda ou tontura).",
      subItems: [],
      scoring: {
        adequate: "Pergunta qualquer um dos itens.",
        partial: "-",
        inadequate: "Não pergunta."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "A vitamina B12 é importante para produção de energia intracelular e geração de aminoácidos como a metionina que são importantes para a produção de bainha de mielina."
    },
    {
      id: 4,
      title: "4. Solicita: (1) exame físico geral e (2) exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita ambos.",
        partial: "Solicita apenas um exame.",
        inadequate: "Não solicita exame algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) Hemograma; (2) Vitamina B12 (cianocobalamina); (3) Qualquer exame da cinética do ferro.",
      subItems: [],
      scoring: {
        adequate: "Solicita todos os três exames.",
        partial: "Solicita pelo menos hemograma e nível sérico de vitamina B12.",
        inadequate: "Solicita um ou nenhum dos exames listados."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Identifica achados laboratoriais: (1) Hemograma com VCM aumentado (ou macrocitose); (2) Vitamina B12 baixa; (3) Cinética do ferro normal.",
      subItems: [],
      scoring: {
        adequate: "Identifica as três alterações.",
        partial: "Identifica duas alterações.",
        inadequate: "Identifica uma alteração ou não identifica alteração alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Estabelece o diagnóstico de anemia megaloblástica secundária à deficiência de vitamina B12 decorrente da gastroplastia.",
      subItems: [],
      scoring: {
        adequate: "Estabelece o diagnóstico da anemia megaloblástica (ou anemia por deficiência de vitamina B12 ou anemia perniciosa).",
        partial: "Estabelece somente o diagnóstico de anemia, sem especificá-la.",
        inadequate: "Não estabelece o diagnóstico de anemia."
      },
      scores: { min: 0, partial: 1, max: 2 },
      dica_teorica: "Algumas causas de deficiência de vitamina B12: Anemia perniciosa, diminuição da absorção, uso de metformina, disfunção pancreática, alterações no intestino delgado, ingestão insuficiente."
    },
    {
      id: 8,
      title: "8. Indica tratamento da anemia megaloblástica por via parenteral ou sublingual de manutenção com vitamina B12.",
      subItems: [],
      scoring: {
        adequate: "Indica vitamina B12 e o tempo de tratamento.",
        partial: "Indica vitamina B12, mas não refere o tempo de tratamento.",
        inadequate: "Não indica o tempo ou indica o tempo incorretamente."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Indica a necessidade de monitoramento dos níveis séricos de vitamina B12.",
      subItems: [],
      scoring: {
        adequate: "Indica monitoramento.",
        partial: "-",
        inadequate: "Não indica monitoramento."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza adequadamente a sequência das tarefas, conforme solicitado nas orientações ao participante.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    }
  ],
  references: []
};

// Pericardite (ID: 1345)
export const pericarditeContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Emergencial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório;",
      "- Exames de imagem;",
      "- Salas de internação geral e UTI;",
      "- Pronto socorro hospitalar."
    ],
    descricao: [
      "Você é chamado para atender um paciente masculino de 36 anos de idade com queixa de dor no peito."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa do paciente;",
    "- Solicitar e interpretar o exame físico direcionado à queixa do paciente;",
    "- Solicitar e interpretar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, e citar ao menos três diagnósticos diferenciais;",
    "- Orientar medidas terapêuticas iniciais."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Adriano, 36 anos de idade, solteiro, técnico de informática.",
      "MOTIVO DE CONSULTA: Doutor(a), estou com dor no peito e tenho medo que seja infarto. Meu pai morreu no ano passado de infarto.",
      "CARACTERÍSTICAS DA DOR: Início: Começou faz 12 horas. Localização: Dói no meio do peito. Intensidade: Moderada (6/10). Tipo de dor: Parece que tem alguma coisa me apertando. Irradiação: Nega. Fatores de piora: Quando respiro fundo dói mais. Fatores de melhora: Se eu sentar e inclinar o corpo pra frente melhora um pouco. Progressão: Está do mesmo jeito. Episódios anteriores: Nega.",
      "SINTOMAS ASSOCIADOS: Negar todos os sintomas que forem perguntados.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Semana passada eu estava gripado, mas já estou melhor. Medicamentos: Não tomo remédios. Alergias: Não tenho alergia. Cirurgias: Não. Trauma no tórax: Nega.",
      "HÁBITOS: Cigarro: Meio maço por dia. Álcool: Sim, nos finais de semana. Drogas ilícitas: Nega.",
      "ANTECEDENTES FAMILIARES: Pai falecido de infarto agudo do miocárdio há 1 ano. Mãe e irmãos sem problemas de saúde.",
      "AO RECEBER O DIAGNÓSTICO PERGUNTAR: Vou precisar ficar internado? Quais os próximos passos do meu tratamento?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Radiografia de tórax", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Ecocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado e pergunta o motivo da consulta.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor: (1) Tempo de início; (2) Localização; (3) Irradiação; (4) Tipo de dor; (5) Intensidade; (6) Atenuantes e/ou agravantes; (7) Progressão; (8) Sintomas acompanhantes; (9) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos sete características/itens.",
        partial: "Investiga de cinco a seis itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "A dor torácica é um dos critérios para o diagnóstico de pericardite junto com atrito pericárdico, alterações típicas no eletrocardiograma e ecocardiograma."
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças e/ou processos infecciosos prévios; (2) Trauma torácico; (3) Cirurgias; (4) Uso de medicamentos; (5) Uso de drogas ilícitas; (6) Álcool; (7) Alergias; (8) Cigarro.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos seis itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.3 }
    },
    {
      id: 5,
      title: "5. Solicita: (1) Exame físico; e (2) Verbaliza presença de atrito pericárdico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e interpreta presença de atrito pericárdico.",
        partial: "Solicita exame físico e não interpreta presença de atrito pericárdico.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Eletrocardiograma; e (2) Verbaliza que está alterado.",
      subItems: [],
      scoring: {
        adequate: "Solicita eletrocardiograma e verbaliza que está alterado.",
        partial: "Solicita eletrocardiograma e não verbaliza que está alterado.",
        inadequate: "Não solicita eletrocardiograma."
      },
      scores: { min: 0, partial: 0.5, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Solicita ecocardiograma transtorácico ou transesofágico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.75 },
      dica_teorica: "O ecocardiograma normal não exclui o diagnóstico e é um método importante para excluir complicações da inflamação, como derrame pericárdico e evolução para tamponamento."
    },
    {
      id: 8,
      title: "8. Solicita radiografia de tórax.",
      subItems: [],
      scoring: {
        adequate: "Solicita radiografia de tórax.",
        partial: "-",
        inadequate: "Não solicita radiografia de tórax."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "Nos casos de derrame pericárdico é possível observar aumento da área cardíaca."
    },
    {
      id: 9,
      title: "9. Solicita: (1) Exames de laboratório; e (2) Identifica a seguinte alteração: proteína C reativa aumentada.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Informa o diagnóstico de pericardite aguda.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "-",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 1 },
      dica_teorica: "Provavelmente secundário à infecção viral, de acordo ao antecedente referido pelo paciente."
    },
    {
      id: 11,
      title: "11. Cita diagnósticos diferenciais: (1) Tromboembolismo pulmonar; (2) Osteocondrite; (3) Doença do refluxo gastroesofágico; (4) Dissecção de aorta; (5) IAM; (6) Pneumotórax; (7) Neuralgia por herpes zóster; (8) Crise de angústia.",
      subItems: [],
      scoring: {
        adequate: "Cita quatro diagnósticos diferenciais.",
        partial: "Cita três diagnósticos diferenciais.",
        inadequate: "Cita apenas um diagnóstico diferencial ou não cita nenhum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 12,
      title: "12. Conduta terapêutica: (1) Anti-inflamatório não hormonal; (2) Colchicina.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Esquema terapêutico possível: Ibuprofeno 600 mg de 8/8hrs por duas semanas e logo retirar gradualmente nas próximas duas semanas; Colchicina 0,5 mg de 12/12hrs por 3 meses. Associar inibidores da bomba de prótons."
    },
    {
      id: 13,
      title: "13. Informa que não há critérios para internação, mas sim para acompanhamento do quadro.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "-",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 1 },
      dica_teorica: "Critérios de internação: Febre > 38 C e leucocitose; Derrame pericárdico e evidências de tamponamento cardíaco; Troponina elevada; Falha terapêutica com AINEs e colchicina."
    }
  ],
  references: []
};

// Diabetes Mellitus (ID: 1346)
export const diabetesMellitusContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Sala de medicação;",
      "- Suporte de laboratório."
    ],
    descricao: [
      "Você atende um paciente masculino de 42 anos de idade que recentemente se mudou para o bairro e traz à consulta os exames de laboratório solicitados pelo médico da outra UBS."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada;",
    "- Solicitar exames adicionais se necessário;",
    "- Verbalizar conduta terapêutica;",
    "- Esclarecer as dúvidas do paciente, se houver."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Paulo, 42 anos de idade, casado, vendedor.",
      "MOTIVO DE CONSULTA: Acabei de me mudar pra esse bairro. Tinha feito uma consulta na outra UBS e o médico me pediu alguns exames mas não deu pra voltar lá. Queria que você olhasse se estão normais.",
      "SE PERGUNTADO PELO MOTIVO DA SOLICITAÇÃO DOS EXAMES OU POR SINTOMAS: Fazia muito tempo que não ia ao médico, então ele me pediu esses exames. Mas não estou sentindo nada!",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Medicamentos: Não tomo nenhum remédio. Alergias: Sou alérgico à penicilina. Cirurgias: Nega.",
      "HÁBITOS: Álcool: Tomo cerveja nos finais de semana. Cigarro: Nega. Drogas ilícitas: Nega. Atividade física: Sou meio preguiçoso pra atividade física, mas de vez em quando saio pra caminhar. Alimentação: Não é muita boa. Como muito sanduíche, refrigerante, sorvete e quase nada de fruta e verduras. Fezes: Não notei nenhuma alteração. Urina: Nega alterações.",
      "ANTECEDENTES FAMILIARES: Meu pai tem pressão alta e diabetes e minha mãe tem hipotiroidismo."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exames complementares", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Glicemia de jejum/hemoglobina glicada/prova de tolerância oral à glicose", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; e (2) Cumprimenta o paciente simulado e pergunta o motivo da consulta.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga: (1) O motivo da solicitação dos exames; ou (2) A presença de sintomas.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos um item.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças; (2) Cirurgias prévias; (3) Uso de medicamentos; (4) Alergias; (5) Hábitos tóxicos; (6) Alimentação; (7) Atividade física; (8) Estresse.",
      subItems: [],
      scoring: {
        adequate: "Investiga de seis a oito itens.",
        partial: "Investiga de três a cinco itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Verbaliza as alterações do exame físico: (1) Sobrepeso; (2) Aumento da circunferência abdominal; (3) Manchas compatíveis com Acantose Nigricans.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza as três alterações.",
        partial: "Verbaliza duas alterações.",
        inadequate: "Verbaliza uma alteração ou nenhuma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Os exames complementares trazidos pelo paciente; e (2) Identifica glicemia de jejum acima dos valores normais.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Solicita os exames mas não identifica elevação da glicemia ou cita apenas glicemia de jejum alterada.",
        inadequate: "Não realiza nenhuma das ações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Indica novos exames para confirmação: (1) Glicemia em jejum; (2) Hemoglobina glicada; (3) Teste de tolerância oral à glicose.",
      subItems: [],
      scoring: {
        adequate: "Indica ao menos um item.",
        partial: "-",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 8,
      title: "8. Confirma o diagnóstico de diabetes mellitus.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico de diabetes mellitus.",
        partial: "Cita como diagnóstico síndrome metabólica.",
        inadequate: "Realiza outros diagnósticos ou não cita nenhum diagnóstico."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Indica tratamento com metformina; (2) Orienta sobre mudança do estilo de vida.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza somente tratamento com metformina.",
        inadequate: "Cita apenas mudança do estilo de vida ou inicia tratamento com insulina ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.3 }
    },
    {
      id: 10,
      title: "10. Solicita retorno do paciente para novas avaliações e/ou seguimento.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.25 },
      dica_teorica: "O retorno de um paciente recém-diagnosticado com diabetes deve ocorrer aproximadamente 2 a 4 semanas após o início do tratamento."
    }
  ],
  references: []
};

// Hipertensão Arterial Sistêmica (HAS) (ID: 1347)
export const hipertensaoArterialSistemicaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você atende o paciente Lúcio, gerente de banco aposentado, 45 anos de idade, com consulta agendada."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais e acompanhamento clínico;",
    "- Responde questionamentos do paciente."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Lucio, 45 anos, casado, gerente de banco.",
      "MOTIVO DE CONSULTA: Doutor um tempo atrás vim ao medico que aferiu minha pressão e estava alta, então ele pediu que verificasse em casa. Então na semana passada minha vizinha aferiu minha pressão com aquele aparelhinho que coloca no punho e tava muito alta (não lembro o valor). Fiquei preocupado e queria que você desse uma olhadinha.",
      "SE PERGUNTADO POR SINTOMAS ATUAIS/ASSOCIADOS: Negar todos os sintomas que forem perguntados.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos: Não tomo nenhum remédio. Alergias: Desconhece.",
      "HÁBITOS: Álcool: Bebo uma ou duas latinhas de cerveja quase todos os dias. Cigarro: Nega. Drogas ilícitas: Nega. Alimentação: É muito boa, como muito e de tudo. Atividade física: Não faço atividade física, só saio pra fazer compras no supermercado e ir na padaria.",
      "ANTECEDENTES FAMILIARES: Não sei se meu pai e minha mãe tinham problemas de saúde. Os dois já faleceram.",
      "DÚVIDA: Doutor(a), isso pode ocasionar complicações se não tratado adequadamente?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Eletrocardiograma de 12 derivações", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Urina tipo 1", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.3 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese perguntando por: (1) Dispneia aos esforços e/ou em repouso; (2) Dispneia paroxística noturna; (3) Astenia; (4) Edema periférico; (5) Tosse noturna; (6) Alterações urinárias; (7) Alterações visuais; (8) Dor torácica relacionada aos esforços.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco ou mais itens.",
        partial: "Investiga de dois a quatro itens.",
        inadequate: "Investiga somente um item ou item algum."
      },
      scores: { min: 0, partial: 1, max: 2 },
      dica_teorica: "Podem representar sinais tardios de lesão de órgãos alvo."
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. (1) Solicita exame físico e (2) verbaliza que os valores pressóricos estão elevados.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico e identificou pressão arterial elevada.",
        partial: "Solicita exame físico sem verbalizar a alteração da pressão arterial.",
        inadequate: "Não solicita exame físico."
      },
      scores: { min: 0, partial: 0.3, max: 0.7 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Análise de sangue; (2) Análise de urina.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicitou apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "A avaliação do paciente com HAS pode incluir vários exames como análise de urina com determinação de proteinúria, ácido úrico, TSH, ECG, ecocardiograma, etc."
    },
    {
      id: 7,
      title: "7. Solicita eletrocardiograma (ECG).",
      subItems: [],
      scoring: {
        adequate: "Solicita ECG.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 },
      dica_teorica: "Procurar sinais de hipertrofia ventricular e outras alterações."
    },
    {
      id: 8,
      title: "8. Informa o diagnóstico de (1) hipertensão arterial sistêmica e (2) classificou como estágio 1.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico e classificou como estágio 1.",
        partial: "Realiza o diagnóstico mas não classifica em estágio 1 ou cita outro estágio de hipertensão.",
        inadequate: "Não informa o diagnóstico de hipertensão arterial sistêmica."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Hipertensão Estágio 1: Entre 140/90 mmHg e 159/99 mmHg."
    },
    {
      id: 9,
      title: "9. Realiza orientações sobre mudança do estilo de vida: (1) Manter o peso ou IMC adequado; (2) Atividade física regular; (3) Alimentação balanceada; (4) Evitar o tabagismo e/ou álcool; (5) Evitar o estresse.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ou mais orientações.",
        partial: "Realiza três orientações.",
        inadequate: "Realiza duas ou menos orientações."
      },
      scores: { min: 0, partial: 0.5, max: 1.25 }
    },
    {
      id: 10,
      title: "10. Informa o paciente que: (1) Deverá retornar à consulta para nova avaliação; (2) Caso não haja diminuição da pressão arterial em 3 a 6 meses, será instituído tratamento farmacológico.",
      subItems: [],
      scoring: {
        adequate: "Informa dois itens.",
        partial: "Informa apenas um item.",
        inadequate: "Não informa nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Menciona as seguintes complicações: (1) AVC isquêmico; (2) Encefalopatia hipertensiva; (3) Comprometimento cognitivo/demência vascular; (4) Hipertrofia ventricular esquerda; (5) Insuficiência cardíaca; (6) Doença arterial coronariana; (7) Insuficiência renal crônica; (8) Retinopatia hipertensiva.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza três ou mais complicações.",
        partial: "Verbaliza uma ou duas complicações.",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Hipotireoidismo (ID: 1348)
export const hipotireoidismoContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você recebe para atendimento a paciente do sexo feminino, 32 anos de idade, com consulta agendada."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Verbalizar ao menos um diagnóstico diferencial;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Lara, 32 anos de idade, solteira, desempregada.",
      "MOTIVO DE CONSULTA: Já faz uns 6 meses que estou me sentindo muito estranha, meio triste e sem vontade de sair com minhas amigas, parece que estou sempre cansada.",
      "SE PERGUNTADO POR: Sensação de inchaço ou aumento de peso: Sim, percebi que estou mais inchada. Hábito intestinal/alteração nas fezes: O intestino tá mais preguiçoso, as vezes fico alguns dias sem ir ao banheiro. Excesso de frio: Estou sentindo muito frio ultimamente. Alteração no cabelo ou pele ou unhas: Meu cabelo está caindo muito e minha pele tá sempre seca.",
      "ANTECEDENTES PESSOAIS: Doenças: Não tenho nenhum problema de saúde. Cirurgia: Tiraram meu apêndice aos 12 anos de idade. Medicamentos: Anticoncepcional oral. Alergia: Nega. Data da última menstruação: Há 10 dias.",
      "HÁBITOS: Álcool: Nega. Cigarro: Nega. Drogas ilícitas: Nega.",
      "ANTECEDENTES FAMILIARES: Minha mãe tem pressão alta."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Perfil da tireoide/TSH, T3 e T4", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.3 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro apresentado perguntando: (1) Intolerância ao frio; (2) Alterações no hábito intestinal; (3) Alterações na personalidade e/ou humor; (4) Alterações no cabelo e/ou pele e/ou unhas; (5) Parestesia das mãos e/ou pés; (6) Inchaço ou aumento do peso corporal; (7) Bócio ou inchaço cervical.",
      subItems: [],
      scoring: {
        adequate: "Pergunta seis ou mais itens.",
        partial: "Pergunta de três a cinco itens.",
        inadequate: "Pergunta um ou nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 2 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Medicação de uso contínuo; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Hábitos alimentares; (8) Prática de atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito itens.",
        partial: "Investiga cinco a sete itens.",
        inadequate: "Investiga quatro ou não investiga."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Realiza exame físico cervical ou da tireoide.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames de laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "Importante para descartar anemia."
    },
    {
      id: 6,
      title: "6. Solicita exames complementares: (1) Hemograma; (2) TSH; (3) T3/T4 livre; (4) Anti-TPO.",
      subItems: [],
      scoring: {
        adequate: "Solicita quatro exames.",
        partial: "Solicita três exames.",
        inadequate: "Solicita dois ou menos."
      },
      scores: { min: 0, partial: 0.6, max: 1.2 }
    },
    {
      id: 7,
      title: "7. Informa o diagnóstico de hipotireoidismo.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "-",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 2 },
      dica_teorica: "A causa mais comum de hipotireoidismo primário é a Tiroidite de Hashimoto (condição autoimune). Hipotireoidismo primário: TSH elevado e T4L baixo."
    },
    {
      id: 8,
      title: "8. Verbaliza diagnóstico diferencial: (1) Transtorno depressivo maior OU depressão; (2) Anemia por deficiência de ferro; (3) Anemia megaloblástica.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza ao menos um diagnóstico diferencial.",
        partial: "-",
        inadequate: "Não verbaliza diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Indica levotiroxina; (2) Marca retorno para nova avaliação.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza apenas o item um.",
        inadequate: "Não realiza o item um ou item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Dose inicial: 1,2 a 1,7 mcg/kg/dia em jejum. Retorno: em 6 a 8 semanas com nova dosagem de TSH."
    }
  ],
  references: []
};

// AVC Isquêmico (ID: 1349)
export const avcIsquemicoContent: ChecklistContent = {
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
      "Você recebe um paciente masculino de 70 anos de idade, trazido por familiares por apresentar quadro de déficit súbito de força no membro superior direito, membro inferior direito e dificuldade para falar."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares;",
    "- Informar o diagnóstico, citando ao menos 2 diagnósticos diferenciais;",
    "- Indicar conduta terapêutica adequada e descartar ao menos 3 das condições que contraindicam o tratamento;",
    "- Orientar a família sobre pelo menos 4 cuidados com o paciente após a alta hospitalar."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 70 anos de idade, aposentado.",
      "MOTIVO DE CONSULTA: Estava almoçando e de repente meu braço perdeu a força, deixei o garfo cair e não estou conseguindo caminhar nem falar direito.",
      "SE PERGUNTADO PELO TEMPO DE INÍCIO DOS SINTOMAS: Isso aconteceu há 40 minutos, vim rápido pro hospital porque fiquei muito assustado.",
      "SINTOMAS ASSOCIADOS: Negar qualquer sintoma perguntado.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho diabetes, pressão alta e o colesterol tava alto na última consulta. Medicamentos: Uso metformina, insulina, anlodipino, losartana e sinvastatina. Alergias: Não tenho nenhuma alergia a medicamentos. AVC prévio: Nega. Trauma de crânio prévio: Nega. Hemorragia recente ou uso de anticoagulante: Nega.",
      "HÁBITOS: Cigarro: Fumo um maço por dia há 16 anos. Álcool: Duas latas de cerveja por dia. Drogas: Nega. Atividade física: Não realiza. Alimentação: Pouco variada.",
      "ANTECEDENTES FAMILIARES: Meu pai era diabético e morreu por AVC, tenho muito medo de acontecer a mesma coisa comigo. O que eu tenho doutor(a)? Corro risco de morrer?",
      "PERGUNTAR AO FINAL DA CONSULTA: Depois que eu sair do hospital, o que tenho que fazer?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Glicemia capilar aleatória", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Eletrocardiograma de 12 derivações", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Tomografia de crânio sem contraste", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Impresso 6 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro apresentado pelo paciente perguntando: (1) Tempo de inicio dos sintomas; (2) Palpitação; (3) Perda de consciência; (4) Convulsão; (5) Eventos similares.",
      subItems: [],
      scoring: {
        adequate: "Pergunta ao menos quatro itens (obrigatoriamente deve conter o item um).",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes: (1) Pessoais; (2) Familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga dois itens.",
        partial: "Investiga um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita: (1) Exame físico geral; (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita dois itens.",
        partial: "Solicita um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita glicemia capilar.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita ou solicita apenas glicemia ou glicemia sérica."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "Sempre avaliar a glicemia capilar em pacientes com alterações neurológicas."
    },
    {
      id: 6,
      title: "6. Solicita laboratório.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita ECG de 12 derivações.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "Estar atento com fibrilação atrial (causa importante de AVC isquêmico)."
    },
    {
      id: 8,
      title: "8. Solicita tomografia de crânio sem contraste.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Informa o diagnóstico de acidente vascular cerebral isquêmico.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente o diagnóstico.",
        partial: "-",
        inadequate: "Não verbaliza o diagnóstico."
      },
      scores: { min: 0, partial: 0, max: 1.3 }
    },
    {
      id: 10,
      title: "10. Realiza diagnósticos diferenciais: (1) AVC hemorrágico; (2) Ataque isquêmico transitório; (3) Hipoglicemia; (4) Paralisia facial periférica; (5) Paralisia de Todd.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza dois diagnósticos diferenciais.",
        partial: "Verbaliza um diagnóstico diferencial.",
        inadequate: "Não verbaliza nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Indica trombólise química depois de descartar ao menos 3 das seguintes condições: (1) INR > 1,7; (2) Inicio dos sintomas > 4,5 horas; (3) Tumor cerebral; (4) Histórico recente de trauma de crânio; (5) AVC hemorrágico; (6) Sangramentos não investigados.",
      subItems: [],
      scoring: {
        adequate: "Indica trombólise química e descarta ao menos três condições.",
        partial: "Indica trombólise química e descarta uma ou duas condições.",
        inadequate: "Não indica trombólise química e/ou não descarta nenhuma condição."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Alteplase: 0,9 mg/kg (dose máxima 90 mg). Realizar 10% da dose total em bólus."
    },
    {
      id: 12,
      title: "12. Realiza orientações gerais sobre os cuidados e recuperação funcional do paciente: (1) Prevenção de quedas; (2) Reabilitação com fisioterapia; (3) Reabilitação com fonoaudiologia; (4) Controle das doenças de base; (5) Alimentação adequada; (6) Evitar tabagismo; (7) Evitar consumo de álcool.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza quatro ou mais itens.",
        partial: "Verbaliza dois ou três itens.",
        inadequate: "Verbaliza um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Pneumonia Adquirida na Comunidade (ID: 1350)
export const pneumoniaAdquiridaComunidadeContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Leitos de internação."
    ],
    descricao: [
      "Você recebe para atendimento um paciente masculino de 68 anos de idade, que consulta por quadro de tosse."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais;",
    "- Questionar dúvidas."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Carlos, 68 anos, aposentado.",
      "MOTIVO DE CONSULTA: Estou com muita tosse e me sinto mal.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: Já faz 5 dias que estou tossindo. Presença de secreção: Está saindo um catarro com cheiro forte e amarelado.",
      "SINTOMAS ASSOCIADOS: Também estou com falta de ar e essa madrugada acordei molhado de suor.",
      "ANTECEDENTES PESSOAIS: Doenças: Sou hipertenso. Cirurgias: Há 2 anos fui internado com uma dor forte na barriga mas não me lembro o que eu tinha. Medicamentos: Enalapril e hidrocloratiazida. Alergias: Que eu saiba não tenho nenhuma alergia.",
      "HÁBITOS: Cigarro: Não. Álcool: Não. Drogas: Não.",
      "SE PERGUNTADO POR ANTECEDENTES EPIDEMIOLÓGICOS: Que eu me lembre não tive contato com ninguém com tosse.",
      "DÚVIDAS: Doutor(a), que problemas podem acontecer no meu pulmão por causa da pneumonia? E existem complicações que podem acontecer em outras partes do corpo também?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Radiografia de Tórax", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Laboratório", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga os sinais e sintomas apresentados pelo paciente: (1) Tempo de evolução; (2) Características da tosse (presença de secreção); (3) Presença de febre e/ou calafrios; (4) Falta de ar.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga apenas um item ou não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Tosse: Aguda (< 3 semanas); Subaguda (3 a 4 semanas); Crônica (> 4 semanas)."
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Uso de fármacos; (3) Alergia medicamentosa; (4) Internações prévias; (5) Contato estreito com pessoas com sintomas similares e/ou tosse crônica.",
      subItems: [],
      scoring: {
        adequate: "Investiga 4 ou mais itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. (1) Solicita exame físico, e verbalizou a presença de (2) taquipneia e (3) estertores crepitantes.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três tarefas.",
        partial: "Realiza duas tarefas.",
        inadequate: "Não realiza ou realiza apenas uma tarefa."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita laboratório: (1) Hemograma completo; (2) PCR; (3) Gasometria arterial.",
      subItems: [],
      scoring: {
        adequate: "Solicita três itens.",
        partial: "Solicita um ou dois itens.",
        inadequate: "Não solicita nenhum exame de laboratório."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Quando existe desvio à esquerda quer dizer que os neutrófilos foram liberados da medula óssea antes mesmo da maduração completa e indica infecção aguda."
    },
    {
      id: 6,
      title: "6. (1) Solicita radiografia de tórax e (2) identifica padrão de consolidação lobar.",
      subItems: [],
      scoring: {
        adequate: "Solicita e interpretou corretamente os achados.",
        partial: "Solicita a radiografia mas não interpretou.",
        inadequate: "Não solicita radiografia."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de pneumonia adquirida na comunidade.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico corretamente.",
        partial: "-",
        inadequate: "Não realiza o diagnóstico ou cita outros diagnósticos."
      },
      scores: { min: 0, partial: 0, max: 1.3 },
      dica_teorica: "Lembrar que o diagnóstico de PAC é clínico. A radiografia deve ser usada principalmente para descartar complicações."
    },
    {
      id: 8,
      title: "8. Indica internação do paciente.",
      subItems: [],
      scoring: {
        adequate: "Indica internação.",
        partial: "-",
        inadequate: "Não indica internação."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "A escala CURB 65 ou CRB 65 permite estimar a mortalidade e decidir entre internação ou tratamento ambulatorial."
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Indica tratamento antibiótico empírico com beta-lactâmico + macrolídeo OU quinolona em monoterapia; (2) Antitérmico; (3) Oxigênio.",
      subItems: [],
      scoring: {
        adequate: "Realiza o item (1) e ao menos outro item da lista.",
        partial: "Realiza apenas o item (1).",
        inadequate: "Não realiza o item (1)."
      },
      scores: { min: 0, partial: 1, max: 2 },
      dica_teorica: "Opções de beta-lactâmicos: Amoxicilina/clavulanato, Ampicilina/sulbactam, Ceftriaxona. Opções de macrolídeos: Azitromicina, Claritromicina. Opções de quinolonas: Levofloxacina, Moxifloxacina."
    },
    {
      id: 10,
      title: "10. Verbaliza complicações pulmonares/pleurais: (1) Derrame pleural parapneumônico; (2) Empiema pleural; (3) Abscesso pulmonar; (4) Necrose pulmonar/pneumonia necrosante; (5) Bronquiectasias pós-infecção; (6) Fístula broncopleural.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza duas ou mais complicações.",
        partial: "Verbaliza uma complicação.",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Verbaliza complicações extrapulmonares (sistêmicas): (1) Sepse e choque séptico; (2) SARA/ARDS; (3) Bacteremia; (4) Endocardite infecciosa; (5) Meningite/artrite séptica/osteomielite; (6) Insuficiência respiratória aguda.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza duas ou mais complicações.",
        partial: "Verbaliza uma complicação.",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Asma | INEP 2024.1 (ID: 1354)
export const asmaInep2024Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Unidade portátil para radiografia."
    ],
    descricao: [
      "Você é um médico atuante em uma unidade básica de saúde (UBS) e deverá atender a uma paciente de 32 anos que vai à consulta com queixa de falta de ar e tosse há 5 dias."
    ]
  },
  orientacoes: [
    "- Realizar anamnese da paciente;",
    "- Interpretar exames complementares, verbalizando as alterações relevantes para o caso;",
    "- Estabelecer e comunicar hipótese diagnóstica;",
    "- Orientar e demonstrar o uso de dispositivo inalatório na paciente;",
    "- Orientar medidas não farmacológicas para a prevenção de crises.",
    "",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
    "A PACIENTE SIMULADA NÃO DEVERÁ SER TOCADA DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Rita, tenho 32 anos, sou casada e sou professora do ensino fundamental.",
      "MOTIVO DE CONSULTA: Faz 5 dias que estou com falta de ar e muita tosse seca.",
      "SINTOMAS ACOMPANHANTES: Percebi um chiado no peito.",
      "FATORES DE MELHORA: Nega.",
      "FATORES DE PIORA: A tosse piora de noite e de madrugada e acordo com dificuldade para respirar.",
      "SE INVESTIGADO EXPOSIÇÃO AMBIENTAL: Na escola que trabalho tem muito mofo e bolor. Na minha casa tem cortinas e durmo com um cobertor mas não deixo nenhum objeto em cima da cama. Limpo a casa uma vez por semana.",
      "EPISÓDIOS SIMILARES: Já tive isso várias vezes desde a infância. A última vez foi há 6 meses e eles me pediram exame de sangue e uma espirometria (liberar os IMPRESSOS 2 e 3) e também me passaram uma bombinha mas não sei usar. Você poderia me ensinar e demonstrar como se usa?",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Não, mas na infancia fazia nebulizações.",
      "HÁBITOS: Álcool: Nega. Tabagismo: Nega. Drogas: Nega.",
      "ANTECEDENTES FAMILIARES: Minha mãe tem problemas respiratórios.",
      "No decorrer do atendimento, dizer/perguntar: Porque estou sentindo isso? Qual é o diagnóstico? Tem alguma alteração nos meus exames? O que eu posso fazer para evitar novas crises?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Laboratório", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Espirometria", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se: (1) identifica-se; e, (2) pergunta o nome e cumprimenta a paciente simulada.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre os sintomas associados relevantes para o estabelecimento de diagnósticos diferenciais: (1) Febre OU calafrios; (2) Dor torácica; (3) Expectoração; (4) Cianose; (5) Sintomas gripais; (6) Dispneia paroxística noturna; (7) Edema de membros inferiores.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro itens ou mais.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um item OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre fatores desencadeantes, agravantes e atenuantes: (1) Uso de medicamentos; (2) Contato com animais; (3) Ambiente com mofo ou poeira; (4) Tabagismo; (5) Atividade física; (6) Mudança climática.",
      subItems: [],
      scoring: {
        adequate: "Investiga três itens ou mais.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um item OU não investiga item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Interpreta corretamente os achados do hemograma, identificando a eosinofilia, ou identificando o aumento dos eosinófilos, e a associa ao quadro.",
      subItems: [],
      scoring: {
        adequate: "Identifica.",
        partial: "-",
        inadequate: "Não identifica."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Interpreta o achado da espirometria: reversibilidade do distúrbio obstrutivo OU distúrbio obstrutivo com resposta ao broncodilatador.",
      subItems: [],
      scoring: {
        adequate: "Interpreta.",
        partial: "-",
        inadequate: "Não interpreta."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 6,
      title: "6. Comunica o diagnóstico de asma.",
      subItems: [],
      scoring: {
        adequate: "Comunica o diagnóstico de asma (ou 'bronquite asmática' ou de 'asma brônquica' ou de 'crise de asma' ou de 'crise asmática').",
        partial: "-",
        inadequate: "Não comunica."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Orienta e demonstra o uso do dispositivo inalatório corretamente: (1) Agitar o dispositivo; (2) Expirar completamente; (3) Posicionar o dispositivo próximo ou diretamente na boca; (4) Disparar o dispositivo e inalar lenta e profundamente; (5) Prender a respiração durante 5 a 10 segundos; (6) Orientar a lavar a boca após o uso do dispositivo.",
      subItems: [],
      scoring: {
        adequate: "Orienta e demonstra, na sequência correta, todas as etapas.",
        partial: "Orienta e demonstra, na sequência correta, da etapa 2 a etapa 5 OU apenas orienta, sem demonstrar OU apenas demonstra, sem orientar.",
        inadequate: "Não demonstra e não orienta alguma das etapas de 2 a 5 ou fez a demonstração com o dispositivo tampado."
      },
      scores: { min: 0, partial: 2, max: 3 }
    },
    {
      id: 8,
      title: "8. Orienta medidas não farmacológicas para a prevenção de crise, tais como evitar contato com: (1) Mofo OU fungo; (2) Poeira doméstica/ácaros; (3) Irritantes inespecíficos; (4) Animais/pelo de animais; (5) Fumaça de cigarros; (6) Orienta manter ambientes arejados.",
      subItems: [],
      scoring: {
        adequate: "Orienta três itens ou mais.",
        partial: "Orienta um ou dois itens.",
        inadequate: "Não orienta item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    }
  ],
  references: []
};

// Hipertensão Portal com Ascite | INEP 2024.1 (ID: 1355)
export const hipertensaoPortalAsciteInep2024Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de exames clínicos e unidade de radiologia."
    ],
    descricao: [
      "Você é médico de uma Unidade Básica de Saúde (UBS) e vai atender a paciente Eliana, 26 anos de idade, costureira, com queixa de aumento do volume abdominal."
    ]
  },
  orientacoes: [
    "- Realizar anamnese;",
    "- Solicitar o exame físico;",
    "- Realizar o exame do abdome no manequim (PALPAÇÃO E PERCUSSÃO), nomeando e descrevendo as manobras realizadas;",
    "- Interpretar os achados do exame físico do abdome;",
    "- Relacionar os resultados dos exames às hipóteses diagnósticas;",
    "- Estabelecer hipótese diagnóstica e definir plano de seguimento.",
    "",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
    "A PACIENTE SIMULADA NÃO DEVERÁ SER TOCADA DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS DO PACIENTE: Eliana, 26 anos de idade, casada, costureira.",
      "MOTIVO DE CONSULTA: Eu percebi um inchaço na minha barriga há 3 meses e sinto que está aumentando. No começo pensei que era gravidez, mas tomo anticonceptivo oral e fiz 2 testes de gravidez e deram negativos.",
      "SINTOMAS ASSOCIADOS: Estou com um desconforto aqui perto das costelas do lado direito.",
      "FATORES DE MELHORA: Quando eu tomo dipirona melhora.",
      "FATORES DE PIORA: Nega.",
      "SE PERGUNTADO SE REALIZOU ALGUM ESTUDO OU SE FOI AO MÉDICO: Fiz uma ultrassonografia na semana passada, você quer ver?",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Cirurgias: Nega. Medicamentos: Anticonceptivo oral. Gestações prévias: Nega.",
      "HÁBITOS: Álcool: Nega. Tabagismo: Nega. Drogas: Nega.",
      "ANTECEDENTES FAMILIARES: Meu pai tem pressão alta."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Exame físico do fígado", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – Exame físico do baço", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Impresso 4 – Exame físico da ascite", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Impresso 5 – Ultrassonografia de abdome", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) identifica-se; e, (2) cumprimenta a paciente simulada e pergunta seu nome.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Pergunta a existência de outros sinais, ou sintomas associados: (1) Dor; (2) Náuseas; (3) Vômitos; (4) Diarreia OU alterações das fezes; (5) Disúria; (6) Febre; (7) Icterícia; (8) Alteração na cor das fezes; (9) Alteração na cor do xixi.",
      subItems: [],
      scoring: {
        adequate: "Investiga seis ou mais itens.",
        partial: "Investiga de um a cinco itens.",
        inadequate: "Não investiga item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre: (1) Fatores de melhora ou atenuantes; e, (2) Fatores de piora ou agravantes.",
      subItems: [],
      scoring: {
        adequate: "Pergunta os dois itens.",
        partial: "Pergunta apenas um item.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Realiza o exame no fígado: (1) Palpação; e, (2) Percussão.",
      subItems: [],
      scoring: {
        adequate: "Realiza os dois itens.",
        partial: "Realiza apenas um item.",
        inadequate: "Não realiza item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 5,
      title: "5. Realiza: (1) Palpação esplênica; e, (2) Percussão esplênica.",
      subItems: [],
      scoring: {
        adequate: "Realiza uma técnica de percussão esplênica e realiza uma técnica de palpação esplênica.",
        partial: "Realiza apenas a palpação esplênica OU realiza apenas a percussão esplênica.",
        inadequate: "Não realiza a palpação nem realiza a percussão esplênica."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Realiza pesquisa de ascite por pelo menos duas técnicas.",
      subItems: [],
      scoring: {
        adequate: "Realiza duas técnicas de pesquisa de ascite.",
        partial: "Realiza apenas uma técnica de pesquisa de ascite.",
        inadequate: "Não realiza nenhuma técnica de pesquisa de ascite."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 7,
      title: "7. Formula hipótese diagnóstica de: (1) Ascite; (2) Por hipertensão portal.",
      subItems: [],
      scoring: {
        adequate: "Formula o diagnóstico citando os dois itens.",
        partial: "Formula o diagnóstico citando um item.",
        inadequate: "Não formula diagnóstico OU formula diagnóstico não citando item algum."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 8,
      title: "8. Elabora plano de seguimento da paciente: (1) Solicita pelo menos um exame complementar; e (2) Encaminhamento para seguimento em avaliação terciária com gastroenterologia ou hepatologista.",
      subItems: [],
      scoring: {
        adequate: "Elabora plano de seguimento contendo o encaminhamento da paciente (2) e solicita pelo menos um dos exames relacionados (1).",
        partial: "Apenas solicita exame (1) OU apenas encaminha ao especialista (2).",
        inadequate: "Não encaminha a paciente na forma do item (2) nem solicita algum dos exames listados no item (1)."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// MPOX (Monkeypox) (ID: 1364)
export const mpoxMonkeypoxContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Pronto Atendimento",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratórios de análises clínicas."
    ],
    descricao: [
      "Homem, de 32 anos, solteiro, com queixa de febre e erupções cutâneas."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Jonas, 32 anos, solteiro, trabalho em um hotel.",
      "MOTIVO DE CONSULTA: Doutor, estou com febre e apareceram manchas no meu corpo.",
      "SOBRE A FEBRE: Tempo de evolução: Cinco dias; Temperatura: 38,5°C; Calafrios: Sim.",
      "SOBRE AS LESÕES DE PELE: Tempo de evolução: Começou há uns 2 dias. Localização: Rosto, tronco, mãos e pés. Lesões urogenitais: Nega. Evolução: Começou no rosto umas manchinhas, depois foram mudando e espalhando. Características: Algumas são tipo manchinhas, outras parecem ter secreção dentro. Dor: Sim. Prurido: Um pouco.",
      "SINAIS E SINTOMAS ACOMPANHANTES: Cefaleia: Nega. Náuseas: Nega. Vômitos: Nega. Mialgia: Sim. Artralgia: Nega. Fadiga: Sim. Sintomas gastrointestinais: Nega. Sintomas respiratórios: Nega.",
      "SE PERGUNTADO POR: Vacinação prévia: Vacinas completas. Contato com pessoas doentes: Tenho dois amigos com os mesmos sintomas. Viagens recentes: Fui a uma festa em outra cidade. Práticas sexuais: Sim, tive relações recentes com parceiros diferentes, mas usei camisinha. Tabagismo, etilismo e drogas: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Alergias: Não. Medicamentos: Não. Cirurgias: Não.",
      "AO SER INFORMADO DO DIAGNÓSTICO, PERGUNTAR: Dr(a), eu moro sozinho, preciso ficar isolado em casa? Por quanto tempo?",
      "SE PERGUNTADO SOBRE TRATAMENTO: E o que eu faço com essas manchas? Não preciso passar nada?"
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Ectoscopia (Lesões de pele)", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Impresso 3 – PCR Mpox", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.15 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre o motivo de consulta: (1) Tempo de evolução; (2) Progressão; (3) Características das lesões.",
      subItems: [],
      scoring: {
        adequate: "Pergunta três itens.",
        partial: "Pergunta sobre um ou dois itens.",
        inadequate: "Não pergunta nenhum item."
      },
      scores: { min: 0, partial: 0.3, max: 0.6 }
    },
    {
      id: 3,
      title: "3. Pergunta por sinais e sintomas associados: (1) Mialgia; (2) Cefaleia; (3) Linfadenopatia; (4) Náuseas e Vômitos; (5) Sintomas gastrointestinais; (6) Sintomas respiratórios; (7) Lesões urogenitais.",
      subItems: [],
      scoring: {
        adequate: "Pergunta de cinco a sete itens.",
        partial: "Pergunta três ou quatro itens.",
        inadequate: "Pergunta sobre dois ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga o perfil epidemiológico do paciente: (1) Contato com pessoas com os mesmos sintomas; (2) Vacinação prévia; (3) Viagens recentes; (4) Práticas sexuais de risco.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga dois ou três itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.3, max: 0.7 },
      dica_teorica: "Práticas sexuais de risco aumentam a chance de transmissão e complicações da doença."
    },
    {
      id: 5,
      title: "5. Solicita exame físico geral.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exames laboratoriais específicos: (1) PCR/qPCR para MPOX.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 7,
      title: "7. Estabelece a hipótese diagnóstica de MPOX (Monkeypox).",
      subItems: [],
      scoring: {
        adequate: "Estabelece.",
        partial: "-",
        inadequate: "Não estabelece."
      },
      scores: { min: 0, partial: 0, max: 1.6 }
    },
    {
      id: 8,
      title: "8. Indica tratamento sintomático: (1) Antipiréticos, se febre; (2) Analgésicos, se dor; (3) Anti-histamínicos, se prurido.",
      subItems: [],
      scoring: {
        adequate: "Indica três itens.",
        partial: "Indica dois itens.",
        inadequate: "Indica um ou nenhum item."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 },
      dica_teorica: "O tratamento dos casos de MPOX tem se sustentado em medidas de suporte clínico que envolvem manejo da dor e do prurido, cuidados de higiene na área afetada e manutenção do balanço hidroeletrolítico."
    },
    {
      id: 9,
      title: "9. Responde adequadamente que os casos confirmados e prováveis de MPOX devem permanecer em (1) isolamento domiciliar (2) até a remissão completa dos sinais e sintomas, com (3) desaparecimento das crostas e epitelização da pele.",
      subItems: [],
      scoring: {
        adequate: "Responde três itens.",
        partial: "Responde somente o item um.",
        inadequate: "Não responde o item um."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 10,
      title: "10. Orienta sobre cuidados com as lesões de pele: (1) Evitar tocar nas lesões e levar as mãos à boca e/ou aos olhos; (2) Não romper vesículas e pústulas; (3) Realizar a higienização da pele e das lesões com água e sabonete.",
      subItems: [],
      scoring: {
        adequate: "Orienta três cuidados.",
        partial: "Orienta somente dois cuidados.",
        inadequate: "Orienta um ou nenhum cuidado."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 11,
      title: "11. Realiza notificação Compulsória de forma imediata (24 horas).",
      subItems: [],
      scoring: {
        adequate: "Notificou imediatamente.",
        partial: "Somente menciona notificação, sem abordar o tempo necessário para tal.",
        inadequate: "Não notifica."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    }
  ],
  references: []
};

// Síndrome de Guillain-Barré 2 (ID: 1370)
export const sindromeGuillainBarre2Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Ambulatorial e Hospitalar",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Unidade de terapia intensiva (UTI);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Mulher de 45 anos, busca o pronto atendimento com queixa de fraqueza muscular, relata que o quadro começou após uma infecção respiratória leve cerca de quatro semanas antes do início dos sintomas."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Detalhar o exame neurológico citando cada ponto a ser avaliado;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Ana Paula, 45 anos, casada, professora.",
      "MOTIVO DE CONSULTA: Estou sentindo muita fraqueza e dificuldade para me movimentar.",
      "CARACTERÍSTICAS DA FRAQUEZA: Início há 3 semanas. Evolução: Começou como uma fraqueza nas pernas, mas agora subiu para os braços também. Lateralidade: As duas pernas e os dois braços/simétrica.",
      "SINAIS E SINTOMAS ACOMPANHANTES: Formigamento/parestesia: Sim. Febre: Nega. Hipoestesia: Sim. Alodinia: Sim.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Nega. Cirurgias: Nega.",
      "HÁBITOS: Cigarro: Nunca fumei. Álcool: Socialmente. Drogas: Nega. Exercícios: Faço caminhadas regularmente. Vacinação: Caderneta completa, a última há 4 anos.",
      "Se perguntado sobre infecções gastrointestinais e/ou respiratórias recentes: Tive um resfriado leve há cerca de um mês.",
      "Após o diagnóstico indagar: Isso é grave?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Exame neurológico", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Laboratório", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Punção Lombar", isOpen: false, color: "#038ffb" },
    { id: 5, title: "Eletroneuromiografia", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta a paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese detalhada sobre a fraqueza muscular: (1) Início dos sintomas; (2) Progressão dos sintomas; (3) Alterações sensoriais (alodinia e/ou hipoestesia e/ou parestesia).",
      subItems: [],
      scoring: {
        adequate: "Investiga todos os pontos.",
        partial: "Investiga dois pontos.",
        inadequate: "Investiga um ou nenhum ponto."
      },
      scores: { min: 0, partial: 0.6, max: 1.2 },
      dica_teorica: "A síndrome de Guillain-Barré é caracterizada por fraqueza muscular progressiva e simétrica que pode levar à paralisia."
    },
    {
      id: 3,
      title: "3. Pergunta sobre infecções recentes ou outras doenças: (1) Infecções respiratórias; (2) Infecções gastrointestinais; (3) Vacinações recentes.",
      subItems: [],
      scoring: {
        adequate: "Investiga pelo menos dois pontos.",
        partial: "Investiga um ponto.",
        inadequate: "Não investiga nenhum ponto."
      },
      scores: { min: 0, partial: 0.6, max: 1.2 },
      dica_teorica: "Infecções prévias, especialmente por Campylobacter jejuni, podem preceder o início da Síndrome de Guillain-Barré."
    },
    {
      id: 4,
      title: "4. Solicita exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "O exame neurológico é crucial para avaliar a fraqueza muscular e a perda de reflexos."
    },
    {
      id: 5,
      title: "5. Detalha o exame físico neurológico: (1) Estado mental; (2) Nervos cranianos; (3) Força muscular; (4) Tônus muscular; (5) Reflexos tendinosos; (6) Sensibilidade; (7) Coordenação; (8) Marcha.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza cinco ou mais pontos.",
        partial: "Verbaliza quatro ou três pontos.",
        inadequate: "Investiga dois, um ou nenhum ponto."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 6,
      title: "6. Solicita punção lombar.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.2 },
      dica_teorica: "A análise do líquor pode mostrar dissociação albuminocitológica (alta proteína, poucas células), típica na síndrome."
    },
    {
      id: 7,
      title: "7. Solicita eletroneuromiografia.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.2 },
      dica_teorica: "A eletroneuromiografia é utilizada para confirmar a presença de polineuropatia desmielinizante."
    },
    {
      id: 8,
      title: "8. Estabelece hipótese diagnóstica de Síndrome de Guillain-Barré.",
      subItems: [],
      scoring: {
        adequate: "Estabelece corretamente.",
        partial: "-",
        inadequate: "Não estabelece ou sugere diagnóstico incorreto."
      },
      scores: { min: 0, partial: 0, max: 1.5 },
      dica_teorica: "O diagnóstico é baseado na apresentação clínica, exame físico e testes diagnósticos."
    },
    {
      id: 9,
      title: "9. (1) Interna a paciente e considerar (2) imunoglobulina intravenosa ou plasmaférese.",
      subItems: [],
      scoring: {
        adequate: "Propõe tratamento completo adequado.",
        partial: "Verbaliza o item (2), mas não interna a paciente.",
        inadequate: "Não propõe o tratamento correto."
      },
      scores: { min: 0, partial: 1.0, max: 2.0 },
      dica_teorica: "A imunoglobulina intravenosa e a plasmaférese são tratamentos eficazes para acelerar a recuperação."
    }
  ],
  references: []
};

// Mieloma Múltiplo (ID: 1372)
export const mielomaMultiploContent: ChecklistContent = {
  scenario: {
    nivel: "Atenção terciária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultórios médicos;",
      "- Laboratório de análises clínicas;",
      "- Setor de diagnostico por imagem com radiologia convencional, ressonância magnética e tomografia computadorizada."
    ],
    descricao: [
      "Você irá realizar o atendimento de um homem de 65 anos, negro, com histórico de dor lombar persistente e fraqueza há 8 meses."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar conduta subsequente."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 65 anos, casado, aposentado.",
      "MOTIVO DE CONSULTA: Dr(a). Eu tenho sentido muita dor lombar e estou me sentindo fraco há alguns meses.",
      "SOBRE A DOR: Tempo de evolução: Não me lembro bem, mas já faz uns 8 meses. Localização: Na lombar, dos dois lados. Irradiação: Nega. Características: Parece que dói o osso mesmo. Intensidade: 8/10, às vezes não consigo dormir. Fatores agravantes e atenuantes: Tomei dipirona, mas não melhorou. Essa dor piora bastante de noite e quando eu me movimento. Progressão: Começou fraca, agora dói bastante todos os dias.",
      "SINAIS E SINTOMAS ACOMPANHANTES: Perda de peso: Sim, perdi cerca de 6 kg nos últimos meses. Fadiga: Sim, sinto-me cansado o tempo todo. Fraqueza muscular: Sim. Anorexia: Sim. Náuseas: Um pouco. Infecções frequentes: Sim, tive algumas gripes e até uma pneumonia recentemente.",
      "ANTECEDENTES PESSOAIS: Doenças: Hipertensão. Alergias: Nega. Medicamentos: Hidroclorotiazida 25 mg 1 pela manhã e losartana 50 mg de 12 em 12 horas.",
      "HÁBITOS: Álcool: Consumo ocasional. Tabagismo: Ex-fumante, parou há 10 anos.",
      "ANTECEDENTES FAMILIARES: Meu pai teve câncer de próstata.",
      "APÓS A FORMULAÇÃO DA HIPÓTESE DIAGNÓSTICA, QUESTIONAR: Dr, e agora? Vou precisar tomar algum remédio?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Laboratório", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Tomografia Computadorizada ou Ressonância Magnética de Tórax, Coluna e Pelve", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Eletroforese de Proteínas", isOpen: false, color: "#038ffb" },
    { id: 5, title: "Beta 2 microglobulina", isOpen: false, color: "#038ffb" },
    { id: 6, title: "Proteína Urinária (Bence Jones)", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Realiza anamnese, perguntando sobre as características da dor: (1) Início; (2) Frequência; (3) Fatores desencadeantes; (4) Agravantes; (5) Atenuantes; (6) Intensidade; (7) Irradiação; (8) Despertar noturno; (9) Rigidez matinal; (10) Tipo da dor.",
      subItems: [],
      scoring: {
        adequate: "Pergunta sobre cinco ou mais características.",
        partial: "Pergunta apenas sobre três ou quatro características.",
        inadequate: "Não pergunta ou pergunta apenas sobre duas ou menos características."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "A dor óssea no mieloma múltiplo é frequentemente associada a lesões líticas e pode ser debilitante."
    },
    {
      id: 3,
      title: "3. Pesquisa a existência de outros sinais e sintomas relacionados à queixa principal: (1) Febre; (2) Alterações sensitivas; (3) Acometimento de outras articulações; (4) Fadiga/astenia; (5) Sinais flogísticos; (6) Alterações esfincterianas; (7) Perda de peso; (8) Hipercalcemia.",
      subItems: [],
      scoring: {
        adequate: "Investiga ao menos seis itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Esses sintomas são comuns em pacientes com mieloma múltiplo devido à produção anormal de células plasmáticas."
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais e hábitos de vida: (1) Trauma; (2) Tabagismo; (3) História de infecções virais; (4) Fraturas recentes e/ou patológicas; (5) Comorbidades; (6) Uso de medicamentos contínuos.",
      subItems: [],
      scoring: {
        adequate: "Investiga os seis itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 },
      dica_teorica: "O conhecimento de fatores de risco pode ajudar no diagnóstico precoce e manejo do mieloma múltiplo."
    },
    {
      id: 5,
      title: "5. Solicita exame físico específico do aparelho locomotor.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita Tomografia Computadorizada e/ou Ressonância Magnética da coluna lombar.",
      subItems: [],
      scoring: {
        adequate: "Solicita radiografia ou ressonância magnética ou tomografia de coluna.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.05 }
    },
    {
      id: 7,
      title: "7. Solicita exames laboratoriais de investigação inicial: (1) Hemograma completo; (2) Função Renal; (3) Cálcio; (4) Albumina; (5) Fosfatase alcalina; (6) Ácido Úrico; (7) LDH; (8) Urina tipo 1; (9) PCR e/ou VHS.",
      subItems: [],
      scoring: {
        adequate: "Solicita ao menos oito exames.",
        partial: "Solicita seis ou sete exames.",
        inadequate: "Solicita apenas cinco ou menos exames."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Os exames laboratoriais e de imagem são essenciais para confirmar o diagnóstico de mieloma múltiplo."
    },
    {
      id: 8,
      title: "8. Solicita exames complementares de maior especificidade: (1) Eletroforese de proteínas; (2) Pesquisa de proteína de Bence Jones; (3) Beta 2 microglobulina; (4) Hematoscopia ou Esfregaço; (5) Aspirado ou Biópsia de Medula óssea.",
      subItems: [],
      scoring: {
        adequate: "Solicita quatro ou cinco itens.",
        partial: "Solicita três ou dois itens.",
        inadequate: "Solicita apenas um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Critérios diagnósticos do mieloma múltiplo: Presença de plasmócitos clonais na medula óssea em proporção maior que 10% OU um plasmocitoma + pelo menos um dos critérios de dano a órgãos-alvo (CRAB)."
    },
    {
      id: 9,
      title: "9. Interpreta os achados laboratoriais e identifica as alterações sugestivas de mieloma múltiplo: (1) Anemia; (2) Hipercalcemia; (3) Pico monoclonal em Gamma; (4) Leucopenia; (5) Plaquetopenia; (6) Proteinúria de Bence Jones; (7) Ácido Úrico aumentado; (8) Albumina diminuída; (9) Fosfatase alcalina normal; (10) Beta-2 microglobulina aumentada.",
      subItems: [],
      scoring: {
        adequate: "Identifica oito achados.",
        partial: "Identifica de cinco a sete achados.",
        inadequate: "Identifica quatro ou menos achados."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Esses achados laboratoriais são indicativos de mieloma múltiplo e ajudam a diferenciar de outras condições."
    },
    {
      id: 10,
      title: "10. Formula hipótese diagnóstica de mieloma múltiplo.",
      subItems: [],
      scoring: {
        adequate: "Formula hipótese.",
        partial: "-",
        inadequate: "Não formula hipótese."
      },
      scores: { min: 0, partial: 0, max: 2.0 },
      dica_teorica: "O diagnóstico precoce de mieloma múltiplo pode melhorar o prognóstico e a qualidade de vida do paciente."
    },
    {
      id: 11,
      title: "11. Encaminha para o especialista.",
      subItems: [],
      scoring: {
        adequate: "Encaminha.",
        partial: "-",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 1.0 },
      dica_teorica: "O tratamento do mieloma múltiplo é multidisciplinar, envolvendo quimioterapia e cuidados de suporte."
    }
  ],
  references: []
};

// AVC - Escala NIHSS | INEP 2024.2 (ID: 1385)
export const avcNihssInep2024Content: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
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
      "Você atenderá um paciente com 58 anos de idade, histórico de arritmia cardíaca, diabetes melito e dislipidemia, com suspeita de acidente vascular cerebral por apresentar déficit neurológico (hemiplegia E) e cefaleia, iniciados há cerca de 1 hora. Paciente encontra-se com respiração espontânea, via aérea pérvia, boa saturação de O2 em ar ambiente e parâmetros hemodinâmicos adequados."
    ]
  },
  orientacoes: [
    "- Aplicar a escala NIHSS ao paciente.",
    "- Totalizar a pontuação da escala NIHSS e VERBALIZAR.",
    "- Solicitar exames complementares necessários à avaliação inicial do caso."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Anderson, 58 anos, motorista de ônibus.",
      "MOTIVO DE CONSULTA: Não consigo movimentar o braço e a perna esquerda.",
      "INÍCIO DOS SINTOMAS: Começou há pouco mais de uma hora.",
      "ANTECEDENTES PESSOAIS: Tenho diabetes, arritmia e colesterol alto.",
      "SE PERGUNTADO A IDADE E MÊS QUE ESTAMOS: Tenho 58 anos e estamos no mês de dezembro.",
      "SE SOLICITADO PARA FECHAR E ABRIR OS OLHOS E FECHAR E ABRIR A MÃO: Feche e abra os olhos, feche e abra a mão direita.",
      "SE SOLICITADO PARA MOVIMENTAR OS OLHOS NA HORIZONTAL: Movimente os olhos para os 2 lados.",
      "SE SOLICITADO PARA SUSTENTAR O BRAÇO DIREITO A 90° POR 10 SEGUNDOS: Realize a ação corretamente.",
      "SE SOLICITADO PARA MOVER A PERNA ESQUERDA: Simule que não consegue.",
      "SE SOLICITADO PARA SUSTENTAR A PERNA DIREITA A 30° POR 5 SEGUNDOS: Realize a ação corretamente.",
      "SE O CANDIDATO TOCAR/BELISCAR OS MEMBROS DO LADO ESQUERDO: Responder que não sentiu nada.",
      "SE O CANDIDATO TOCAR/BELISCAR OS MEMBROS DO LADO DIREITO: Responder que consegue sentir."
    ]
  },
  impressos: [
    { id: 1, title: "Imagem para descrever", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Itens para identificação", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Sentenças para leitura", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Palavras para ler/repetir", isOpen: false, color: "#038ffb" },
    { id: 5, title: "NIHSS 1/4", isOpen: false, color: "#038ffb" },
    { id: 6, title: "NIHSS 2/4", isOpen: false, color: "#038ffb" },
    { id: 7, title: "NIHSS 3/4", isOpen: false, color: "#038ffb" },
    { id: 8, title: "NIHSS 4/4", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; e, (2) Cumprimenta o paciente simulado e pergunta seu nome.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Realiza a avaliação 1a do NIHSS: Avalia se o paciente está alerta, falando com ele(a).",
      subItems: [],
      scoring: {
        adequate: "Avalia se o paciente está alerta.",
        partial: "-",
        inadequate: "Não avalia."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Realiza a avaliação 1b do NIHSS. Pergunta: (1) idade do paciente; e (2) em que mês estamos.",
      subItems: [],
      scoring: {
        adequate: "Pergunta os dois itens.",
        partial: "Pergunta apenas um item.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Realiza a avaliação 1c do NIHSS. Solicita que o paciente: (1) Abra e feche os olhos e (2) Abra e feche a mão.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas solicitações.",
        partial: "Realiza apenas uma solicitação.",
        inadequate: "Não solicita nenhuma das duas ações."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Realiza a avaliação 2 do NIHSS. Pede que o paciente movimente os olhos horizontalmente para os dois lados.",
      subItems: [],
      scoring: {
        adequate: "Avalia a movimentação para os dois lados.",
        partial: "Avalia a movimentação para um lado.",
        inadequate: "Não avalia a movimentação ocular."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Realiza a avaliação 3 do NIHSS. Avalia os campos visuais (superiores e inferiores).",
      subItems: [],
      scoring: {
        adequate: "Avalia os quatro quadrantes.",
        partial: "-",
        inadequate: "Não avalia os quatro quadrantes."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Realiza a avaliação 4 do NIHSS. Pede que o paciente sorria (ou mostre os dentes) e feche os olhos com força.",
      subItems: [],
      scoring: {
        adequate: "Faz as duas solicitações.",
        partial: "Faz apenas uma solicitação.",
        inadequate: "Não faz nenhuma dessas solicitações."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Realiza a avaliação 5 do NIHSS. Solicita que o paciente sustente os braços a 90°, com as palmas das mãos para baixo.",
      subItems: [],
      scoring: {
        adequate: "Realiza com ângulo E posicionamento das mãos adequados.",
        partial: "Realiza com ângulo OU posicionamento das mãos inadequados.",
        inadequate: "Não realiza a pesquisa ou a faz com ângulo E posicionamento inadequados."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Realiza a avaliação 6 do NIHSS. Solicita que o paciente sustente as pernas a 30°, em extensão.",
      subItems: [],
      scoring: {
        adequate: "Realiza com ângulo E extensão adequados.",
        partial: "Realiza com ângulo OU extensão inadequados.",
        inadequate: "Não realiza a pesquisa ou a faz com ângulo E extensão inadequados."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Realiza a avaliação 7 do NIHSS. Solicita que o paciente faça o teste index-nariz OU calcanhar-joelho.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Realiza a avaliação 8 do NIHSS. Testa a sensibilidade do paciente.",
      subItems: [],
      scoring: {
        adequate: "Testa.",
        partial: "-",
        inadequate: "Não testa."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 12,
      title: "12. Realiza a avaliação 9 do NIHSS. Solicita que o paciente descreva a imagem.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 13,
      title: "13. Realiza a avaliação 10 do NIHSS. Solicita que o paciente leia (ou repita) a lista de palavras.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 14,
      title: "14. Totaliza corretamente a escala NIHSS. Verbaliza total de 10 pontos.",
      subItems: [],
      scoring: {
        adequate: "Totaliza corretamente.",
        partial: "-",
        inadequate: "Não totaliza ou totaliza com outro valor."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 15,
      title: "15. Solicita TC ou tomografia computadorizada ou ressonância magnética de crânio SEM CONTRASTE.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "Solicita COM CONTRASTE.",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 16,
      title: "16. Solicita outros exames complementares: (1) ECG; (2) Glicemia capilar; (3) Hemograma; (4) Coagulograma; (5) Potássio e sódio; (6) Ureia e creatinina; (7) Troponina.",
      subItems: [],
      scoring: {
        adequate: "Solicita ao menos cinco exames.",
        partial: "-",
        inadequate: "Solicita menos que cinco exames."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Dengue Grupo A | INEP 2024.2 (ID: 1386)
export const dengueGrupoAInep2024Content: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios;",
      "- Laboratório de análises clínicas;",
      "- Leito de observação;",
      "- Ambulância para transporte do paciente."
    ],
    descricao: [
      "Paciente com 21 anos procura atendimento com queixa de febre e cefaleia há 4 dias.",
      "",
      "O TOQUE NO PACIENTE SIMULADO É PERMITIDO APENAS PARA A UTILIZAÇÃO DO ESFIGMOMANÔMETRO, SEM INSUFLÁ-LO."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese direcionada à queixa principal do paciente.",
    "- Solicitar / realizar exames físicos necessários à avaliação do caso.",
    "- Solicitar exames complementares pertinentes ao caso.",
    "- Relacionar os resultados dos exames às hipóteses diagnósticas.",
    "- Verbalizar o diagnóstico, sua classificação de gravidade e elaborar a conduta terapêutica."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Marcos, 21 anos, solteiro, estudante universitário.",
      "MOTIVO DE CONSULTA: Estou tendo febre e dor de cabeça há 4 dias.",
      "CARACTERÍSTICAS DA CEFALEIA: Localização: Dói no fundo dos olhos.",
      "CARACTERÍSTICAS DA FEBRE: Aferida: Sim, deu temperaturas de até 39.5°C.",
      "SINTOMAS ACOMPANHANTES: Dor do corpo: Sim, dói o corpo inteiro. Fraqueza: Sim. Cansaço: Sim. Falta de apetite: Não tenho vontade de comer nada esses dias.",
      "SE PERGUNTADO POR USO DE MEDICAÇÕES DE ALÍVIO: Tomei paracetamol, mas em pouco tempo a febre e a dor voltam.",
      "CONTATOS COM SINTOMAS SIMILARES: Que eu saiba não.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Nega. Cirurgias: Nega.",
      "HÁBITOS: Álcool: Bebo duas latas de cerveja aos domingos. Drogas: Nega. Cigarro: Nega.",
      "CONTATO COM ÁGUA DE ENCHENTE, RATO, CAPIVARA OU CARRAPATO: Não, mas no lugar que trabalho tem muitos mosquitos.",
      "Ao indicar a PROVA DO LAÇO, oriente o candidato a posicionar o esfigmomanômetro no braço do paciente e descrever as etapas."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Sorologia IgM, IgG e NS1", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Laboratório", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Prova do laço", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; e, (2) Cumprimenta o paciente simulado e pergunta seu nome.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Pergunta a existência de outros sinais ou sintomas associados: (1) Sintomas gripais; (2) Mialgia; (3) Artralgia; (4) Diarreia; (5) Náuseas; (6) Queixas oftalmológicas; (7) Icterícia.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga de um a três itens.",
        inadequate: "Não investiga item algum."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre: (1) Fatores de melhora; e, (2) Fatores de piora.",
      subItems: [],
      scoring: {
        adequate: "Pergunta os dois itens.",
        partial: "Pergunta apenas um item.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Pergunta sobre a história patológica pregressa: (1) Comorbidades; (2) Medicações; (3) Alergias.",
      subItems: [],
      scoring: {
        adequate: "Pergunta os três itens.",
        partial: "Pergunta um ou dois itens.",
        inadequate: "Não pergunta item algum."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    },
    {
      id: 5,
      title: "5. Investiga sinais de alarme ou choque: (1) Dor abdominal; (2) Vômitos; (3) Rebaixamento de sensório; (4) Lipotimia; (5) Irritabilidade; (6) Acúmulo de líquido em cavidades; (7) Sangramentos ou manchas na pele; (8) Hipotensão.",
      subItems: [],
      scoring: {
        adequate: "Pergunta quatro ou mais sintomas.",
        partial: "Pergunta dois ou três sintomas.",
        inadequate: "Pergunta um sintoma ou não pergunta sintoma algum."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    },
    {
      id: 6,
      title: "6. Investiga história epidemiológica: (1) Viagens recentes; (2) Contato com água de enchente; (3) Contato com rato ou capivara ou carrapato; (4) Mosquitos nos ambientes que frequenta; (5) Familiares e ou vizinhos com os mesmos sintomas.",
      subItems: [],
      scoring: {
        adequate: "Investiga três ou mais itens.",
        partial: "Investiga um ou dois itens.",
        inadequate: "Não investiga item algum."
      },
      scores: { min: 0, partial: 0.4, max: 0.75 }
    },
    {
      id: 7,
      title: "7. Solicita Hemograma.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Realiza a prova do laço, obedecendo as etapas: (1) coloca o manguito; (2) descreve a insuflação até o valor médio da PA; (3) descreve que deixará o manguito insuflado por 5 minutos; (4) descreve que desenha um quadrado de 2,5 cm e conta as petéquias.",
      subItems: [],
      scoring: {
        adequate: "Realiza a prova, seguindo todas as etapas.",
        partial: "-",
        inadequate: "Não realiza ou não segue todas as etapas."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 9,
      title: "9. Verbaliza o diagnóstico de dengue sem sinais de alarme (Grupo A).",
      subItems: [],
      scoring: {
        adequate: "Verbaliza o diagnóstico e a gravidade.",
        partial: "Verbaliza o diagnóstico de dengue, sem especificar gravidade.",
        inadequate: "Não verbaliza o diagnóstico de dengue ou verbaliza com gravidade diferente."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Orienta repouso e hidratação oral.",
      subItems: [],
      scoring: {
        adequate: "Orienta as duas condutas.",
        partial: "Orienta apenas uma conduta.",
        inadequate: "Não orienta conduta alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Orienta uso de paracetamol e/ou dipirona para dor e febre.",
      subItems: [],
      scoring: {
        adequate: "Orienta.",
        partial: "-",
        inadequate: "Não orienta."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 12,
      title: "12. Orienta a não utilizar anti-inflamatórios não esteroidais (AINEs) ou AAS.",
      subItems: [],
      scoring: {
        adequate: "Orienta ao menos uma medicação.",
        partial: "-",
        inadequate: "Não orienta nenhuma medicação."
      },
      scores: { min: 0, partial: 0, max: 0.75 }
    },
    {
      id: 13,
      title: "13. Orienta sobre sinais de alarme: (1) Dor abdominal; (2) Vômitos; (3) Alteração de consciência; (4) Sangramentos.",
      subItems: [],
      scoring: {
        adequate: "Orienta os quatro sinais.",
        partial: "Orienta dois ou três sinais.",
        inadequate: "Orienta um sinal ou não orienta sinal algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 14,
      title: "14. Verbaliza a necessidade de notificação do caso no SINAN.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza.",
        partial: "-",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    }
  ],
  references: []
};

// Artrite Psoríaca (ID: 1389)
export const artritePsoriacaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [],
    descricao: [
      "Você é o médico de uma Unidade Básica de Saúde e irá atender a Mariana, uma paciente de 44 anos de idade, que consulta queixando-se de dores em articulações."
    ]
  },
  orientacoes: [
    "- Realizar anamnese da paciente;",
    "- Solicitar exame físico;",
    "- Interpretar exames complementares, verbalizando as alterações relevantes para o caso;",
    "- Estabelecer e comunicar hipótese diagnóstica e ao menos três diagnósticos diferenciais;",
    "- Elaborar a conduta terapêutica.",
    "",
    "ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!",
    "A PACIENTE SIMULADA NÃO DEVERÁ SER TOCADA DURANTE O ATENDIMENTO."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Mariana, 44 anos, solteira, professora.",
      "MOTIVO DE CONSULTA: Doutor(a), ultimamente tenho tido muita dor nas articulações das mãos, punhos e dedos.",
      "CARACTERÍSTICAS DO QUADRO: Duração: Já faz uns 6 meses. Localização: Dói nas mãos, na pontinha dos dedos e nos punhos. Intensidade: É uma dor moderada (5/10). Tipo de dor: Latejante. Irradiação: Não irradia. Fatores de melhora: Melhora quando tomo um anti-inflamatório.",
      "SINTOMAS ASSOCIADOS: Febre: Não. Rigidez articular: Às vezes de manhã sinto as mãos duras. Lesões de pele: Quando estou estressada noto que aparece umas manchas avermelhadas nos cotovelos, joelhos e nas costas que descamam e coçam.",
      "ANTECEDENTES PESSOAIS: Doenças: Tenho psoríase diagnosticada há 4 anos. Medicamentos: De vez em quando uso anti-inflamatórios pra dor. Alergias: Nego. Cirurgias: Nego.",
      "HÁBITOS: Álcool: Cerveja de vez em quando. Cigarro: Não fumo. Drogas: Não uso drogas.",
      "ANTECEDENTES FAMILIARES: Minha mãe tem psoríase."
    ]
  },
  impressos: [
    { id: 1, title: "EXAME FÍSICO", isOpen: false, color: "#038ffb" },
    { id: 2, title: "LABORATÓRIO", isOpen: false, color: "#038ffb" },
    { id: 3, title: "RADIOGRAFIA DAS MÃOS", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta a paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza ambas as ações.",
        partial: "-",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro apresentado: (1) Tempo de evolução; (2) Intensidade da dor; (3) Tipo de dor; (4) Irradiação; (5) Fatores de melhora e/ou piora; (6) Presença de edema; (7) Rigidez; (8) Lesões cutâneas associadas; (9) Febre.",
      subItems: [],
      scoring: {
        adequate: "Pergunta oito ou nove itens.",
        partial: "Pergunta de cinco a sete itens.",
        inadequate: "Pergunta quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes: (1) Doenças prévias; (2) Medicamentos em uso; (3) Alergias; (4) Doenças na família.",
      subItems: [],
      scoring: {
        adequate: "Investiga todos os itens.",
        partial: "-",
        inadequate: "Não investiga todos os itens."
      },
      scores: { min: 0, partial: 0, max: 1.0 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita exame físico geral e articular.",
        partial: "Solicita apenas exame físico geral.",
        inadequate: "Não solicita exame físico geral."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Solicita exames laboratoriais: (1) Hemograma; (2) VHS e/ou PCR; (3) TGO; (4) TGP; (5) Creatinina; (6) Ureia; (7) Fator reumatoide; (8) Anti-CCP.",
      subItems: [],
      scoring: {
        adequate: "Solicita ao menos sete itens.",
        partial: "Solicita cinco ou seis itens.",
        inadequate: "Solicita quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Ocasionalmente o fator reumatoide poderá ser positivo. No entanto, o anti-CCP raramente será positivo."
    },
    {
      id: 6,
      title: "6. Solicita radiografia das mãos.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 },
      dica_teorica: "A radiografia é útil para avaliar alterações estruturais nas articulações e fazer futuras comparações."
    },
    {
      id: 7,
      title: "7. Realiza o diagnóstico de artrite psoríaca.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico corretamente.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.25 },
      dica_teorica: "A artrite psoriática periférica pode envolver pequenas, médias e grandes articulações, com alta tendência a afetar as articulações interfalângicas distais."
    },
    {
      id: 8,
      title: "8. Cita diagnósticos diferenciais: (1) Artrite Reumatoide; (2) Lúpus Eritematoso Sistêmico; (3) Osteoartrite; (4) Artrite reativa; (5) Gota.",
      subItems: [],
      scoring: {
        adequate: "Cita ao menos três diagnósticos diferenciais.",
        partial: "Cita apenas dois diagnósticos diferenciais.",
        inadequate: "Cita um ou nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Indica conduta terapêutica adequada: (1) Indica inibidores do TNF-alfa; (2) Indica drogas antirreumáticas; (3) Corticosteroides e/ou anti-inflamatórios não esteroides.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ou uma ação.",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Drogas antirreumáticas modificadoras da doença que podem ser utilizadas: Metotrexato, Sulfassalazina, Leflunomida."
    },
    {
      id: 10,
      title: "10. Encaminha a paciente para reumatologia.",
      subItems: [],
      scoring: {
        adequate: "Encaminha.",
        partial: "-",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 1.0 }
    }
  ],
  references: []
};

// Síndrome do Intestino Irritável (ID: 1390)
export const sindromeIntestinoIrritavelContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é médico em uma Unidade de Atenção Primária e atende o paciente João Silva, 39 anos, que relata episódios frequentes de dor abdominal."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João Silva, 39 anos, casado, engenheiro civil.",
      "MOTIVO DE CONSULTA: Estou tendo muita dor abdominal.",
      "CARACTERÍSTICAS DA DOR ABDOMINAL: Início: Há 9 meses. Localização: A barriga inteira. Intensidade: Às vezes é uma dor forte (7/10). Tipo de dor: Cólica. Irradiação: Não. Fatores de melhora: A evacuação melhora um pouco a dor. Fatores de piora: Quando como comidas gordurosas, álcool, açúcar, café. Frequência: Umas duas vezes por semana.",
      "SINTOMAS ASSOCIADOS: Alterações do hábito intestinal: Sim, às vezes tenho constipação. Sangue nas fezes: Nega. Distensão abdominal: Sim, de vez em quando. Febre: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: De vez em quando tomo analgésicos. Alergias: Nega. Cirurgias: Apendicectomia aos 20 anos.",
      "HÁBITOS: Cigarro: Um maço por dia. Álcool: Socialmente. Drogas: Nega. Alimentação: Irregular, com ingestão frequente de fast-food. Atividade física: Nega.",
      "SE INVESTIGADO FATORES PSICOSSOCIAIS OU ESTRESSE: Ultimamente estou bastante estressado com o trabalho. Acho que isso tem piorado a minha dor.",
      "SE INVESTIGADO HISTÓRICO FAMILIAR DE CÂNCER DE CÓLON: Negar."
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Laboratório", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Parasitológico de fezes", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza apenas uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre características da dor abdominal: (1) Tempo de evolução; (2) Localização; (3) Intensidade; (4) Tipo de dor; (5) Irradiação; (6) Fatores de melhora; (7) Fatores de piora; (8) Frequência.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito itens.",
        partial: "Investiga de cinco a sete itens.",
        inadequate: "Investiga quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga sintomas acompanhantes: (1) Alteração do hábito intestinal; (2) Perda de peso não intencional; (3) Febre; (4) Presença de sangue nas fezes; (5) Distensão abdominal.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro ou mais itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças; (2) Uso de medicamentos; (3) Alergias; (4) Cirurgias; (5) Estresse e/ou fatores psicossociais; (6) Alimentação.",
      subItems: [],
      scoring: {
        adequate: "Investiga todos os itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares de câncer de cólon.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 1.25 }
    },
    {
      id: 6,
      title: "6. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames laboratoriais: (1) Hemograma; (2) PCR e/ou VHS; (3) Antitransglutaminase IgA; (4) IgA total; (5) TSH; (6) Exame parasitológico de fezes.",
      subItems: [],
      scoring: {
        adequate: "Solicita quatro ou mais exames.",
        partial: "Solicita três exames.",
        inadequate: "Solicita dois ou menos exames."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza diagnóstico de Síndrome do Intestino Irritável.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 },
      dica_teorica: "A Síndrome do Intestino Irritável (SII) é diagnosticada pelos critérios de Roma IV, que estabelecem a presença de dor abdominal recorrente em média pelo menos 1 dia por semana nos últimos 3 meses, com início dos sintomas há pelo menos 6 meses."
    },
    {
      id: 9,
      title: "9. Propõe plano terapêutico: (1) Prática regular de atividade física; (2) Ingestão hídrica adequada; (3) Mudança dos hábitos alimentares; (4) Antiespasmódico em caso de dor abdominal; (5) Controle do estresse.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ou mais ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "O tratamento varia amplamente de acordo com cada paciente e pode incluir mudanças dietéticas, comportamentais, medicamentos, suplementos, etc."
    }
  ],
  references: []
};

// Tinea Corporis (ID: 1391)
export const tineaCorporisContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é o médico de plantão em uma Unidade Básica de Saúde e atende um homem de 27 anos de idade, policial militar, com queixa de uma mancha na pele."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a principal hipótese diagnóstica, e ao menos 3 diagnósticos diferenciais;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João, 27 anos, solteiro, policial militar.",
      "MOTIVO DE CONSULTA: Apareceu uma mancha na minha pele que não desaparece.",
      "CARACTERÍSTICAS DA MANCHA: Tempo de evolução: Sete dias. Localização: Na parte lateral da barriga e costelas. Cor: Avermelhada. Coceira: Sim. Presença de secreção: Não. Fatores de melhora: quando passo creme hidratante diminui um pouco a coceira. Fatores de piora: Coçar aumenta a irritação. Episódios anteriores: Não. Progressão: Está igual desde que apareceu.",
      "SINTOMAS ASSOCIADOS: Coceira: Sim. Febre: Não.",
      "SE INVESTIGADO CONTATOS COM SINTOMAS SIMILARES: No alojamento do quartel tem mais 2 companheiros com a mesma mancha.",
      "SE INVESTIGADO CONTATO COM SUBSTÂNCIAS IRRITANTES: Nega.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Medicamentos: Nega. Alergias: Nega.",
      "HÁBITOS: Cigarro: Nega. Álcool: Socialmente. Drogas ilícitas: Nega. Atividade física: Corrida duas vezes por semana. Alimentação: Dieta balanceada.",
      "AO RECEBER ALGUM DIAGNÓSTICO, PERGUNTAR: Como posso tratar isso? É contagioso?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Microscopia direta", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga o quadro perguntando: (1) Tempo de aparecimento; (2) Localização; (3) Coceira; (4) Cor; (5) Presença de secreção; (6) Fatores de melhora; (7) Fatores de piora; (8) Progressão; (9) Febre.",
      subItems: [],
      scoring: {
        adequate: "Investiga 6 ou mais itens.",
        partial: "Investiga de três a cinco itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Investigou: (1) Contato com pessoas com sintomas similares; (2) Contato com substâncias irritantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga dois itens.",
        partial: "Investiga apenas um item.",
        inadequate: "Não investiga nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Descreve adequadamente o exame físico: lesão/mancha eritematosa, arredondada com limites bem delimitados e com centro claro.",
      subItems: [],
      scoring: {
        adequate: "Descreve.",
        partial: "-",
        inadequate: "Não descreve."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Realiza o diagnóstico de Tinea Corporis.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 2 }
    },
    {
      id: 7,
      title: "7. Cita diagnósticos diferenciais: (1) Dermatite de contato; (2) Dermatite atópica; (3) Dermatite seborreica; (4) Psoríase; (5) Hanseníase; (6) Sífilis secundária; (7) Erupção por fármacos.",
      subItems: [],
      scoring: {
        adequate: "Cita três ou mais diagnósticos diferenciais.",
        partial: "Cita dois diagnósticos diferenciais.",
        inadequate: "Cita um ou nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Informa sobre a natureza contagiosa da infecção.",
      subItems: [],
      scoring: {
        adequate: "Informa.",
        partial: "-",
        inadequate: "Não informa."
      },
      scores: { min: 0, partial: 0, max: 0.75 },
      dica_teorica: "Tinea Corporis é uma infecção contagiosa e pode ser transmitida por contato direto ou indireto."
    },
    {
      id: 9,
      title: "9. Conduta terapêutica: (1) Prescreve antifúngico tópico; (2) Deu orientações sobre higiene e não compartilhar objetos pessoais; (3) Indica retorno para acompanhamento.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realizou duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Opções de antifúngico tópico imidazólico: clotrimazol, miconazol, cetoconazol, econazol, oxiconazol, sulconazol, sertacolazol."
    }
  ],
  references: []
};

// Punção arterial para gasometria (ID: 1392)
export const puncaoArterialGasometriaContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório;",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia."
    ],
    descricao: [
      "Você é um médico responsável pelo atendimento na sala de emergência e precisa realizar uma punção arterial para gasometria em um paciente de 68 anos, com queixa de dificuldade respiratória intensa."
    ]
  },
  orientacoes: [
    "- Explicar brevemente e com linguagem acessível ao paciente o procedimento da punção arterial e o objetivo;",
    "- Solicitar todos os materiais necessários para o procedimento;",
    "- Verbalizar de forma técnica as etapas da punção da artéria radial;",
    "- Esclarecer possíveis complicações do procedimento;",
    "- Interpretar o resultado da gasometria arterial;",
    "- Indicar a conduta terapêutica imediata."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Luis, 68 anos, comerciante.",
      "QUALQUER OUTRA PERGUNTA REALIZADA: Não consta no script.",
      "SE SOLICITADO OS MATERIAIS: Considere disponível.",
      "QUANDO SOLICITADO O RESULTADO DA GASOMETRIA: Liberar o IMPRESSO 1."
    ]
  },
  impressos: [
    { id: 1, title: "Gasometria arterial", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "-",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 2,
      title: "2. Explica com linguagem acessível o procedimento ao paciente: (1) Descreve brevemente o procedimento e o objetivo da punção; (2) Informa sobre possíveis desconfortos.",
      subItems: [],
      scoring: {
        adequate: "Explica dois itens.",
        partial: "Explica um item.",
        inadequate: "Não explica nenhum item."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 3,
      title: "3. Solicita os materiais: (1) Luvas; (2) Seringa heparinizada; (3) Agulha para anestesia; (4) Agulha para punção; (5) Gases ou algodão; (6) Álcool; (7) Anestésico local; (8) Material para curativo.",
      subItems: [],
      scoring: {
        adequate: "Solicita seis itens ou mais.",
        partial: "Solicita de quatro a cinco itens.",
        inadequate: "Solicita três itens ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 4,
      title: "4. Descreve a técnica de punção da artéria radial: (1) Higieniza as mãos; (2) Coloca as luvas; (3) Palpa a artéria radial; (4) Realiza o teste de Allen; (5) Realiza antissepsia; (6) Anestesia o local; (7) Estende o punho do paciente; (8) Introduz a agulha a 30-45 graus; (9) Pressiona o local por alguns minutos; (10) Realiza curativo oclusivo; (11) Realiza a homogeneização do sangue com a heparina.",
      subItems: [],
      scoring: {
        adequate: "Descreve oito itens ou mais.",
        partial: "Descreve de cinco a sete itens.",
        inadequate: "Descreve quatro itens ou menos."
      },
      scores: { min: 0, partial: 1.0, max: 2.0 },
      dica_teorica: "Teste de Allen modificado: verifica a viabilidade da artéria ulnar, responsável pela circulação colateral da artéria radial."
    },
    {
      id: 5,
      title: "5. Interpreta a gasometria: Acidose respiratória aguda com hipoxemia.",
      subItems: [],
      scoring: {
        adequate: "Interpreta corretamente.",
        partial: "Interpreta apenas como acidose respiratória.",
        inadequate: "Não interpreta ou interpreta incorretamente."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Cita possíveis complicações: (1) Hematoma; (2) Dor local; (3) Infecção; (4) Trombose; (5) Vasoespasmo; (6) Síndrome compartimental; (7) Neuropatia compressiva; (8) Necrose distal.",
      subItems: [],
      scoring: {
        adequate: "Cita cinco itens ou mais.",
        partial: "Cita quatro itens.",
        inadequate: "Cita três itens ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Indica a conduta imediata para o caso: Suporte ventilatório/oxigenação.",
      subItems: [],
      scoring: {
        adequate: "Indica.",
        partial: "-",
        inadequate: "Não indica."
      },
      scores: { min: 0, partial: 0, max: 1.5 }
    }
  ],
  references: []
};

// Semiologia Respiratória/Pneumonia (ID: 1460)
export const semiologiaRespiratoriaPneumoniaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia convencional e ultrassonografia."
    ],
    descricao: [
      "Você recebe para atendimento um paciente do sexo masculino relatando falta de ar."
    ]
  },
  orientacoes: [
    "Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:",
    "- Realizar anamnese do paciente;",
    "- Realizar e verbalizar todas as etapas do exame físico semiológico direcionado para a queixa do paciente;",
    "- Solicitar exames complementares, se necessário;",
    "- Definir a conduta explicando ao paciente, de acordo com a classificação de gravidade."
  ],
  instrucoes: {
    titulo: "Orientações do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Breno, 66 anos, pedreiro, casado.",
      "MOTIVO DE CONSULTA: Doutor venho sentindo falta de ar e estou me sentindo quente.",
      "CARACTERÍSTICAS DA FEBRE: Febre: me senti quente doutor(a), mas não medi. Calafrios e sudorese: Nega.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: Quatro dias. Presença de secreção: Sim doutor, um catarro amarelo com cheiro ruim.",
      "CARACTERÍSTICAS DA FALTA DE AR: Começou há 3 dias, e sinto até em repouso às vezes.",
      "ANTECEDENTES PESSOAIS: Doenças: Hipertenso e diabético. Medicamentos: Enalapril e metformina. Alergias: Nega. Cirurgias ou internações: Nega.",
      "HÁBITOS: Cigarro: Nega. Álcool: Nega.",
      "Caso o candidato solicite a INTERNAÇÃO DO PACIENTE, indagar: Dr(a), por que vou ficar internado?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Exame Físico (RESULTADO)", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Laboratório", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Radiografia de Tórax", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza duas ações.",
        partial: "-",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga os sinais e sintomas apresentados pelo paciente: (1) Tempo de evolução; (2) Tosse e características; (3) Presença de febre e/ou calafrios; (4) Falta de ar.",
      subItems: [],
      scoring: {
        adequate: "Realiza todas ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Uso de fármacos; (3) Alergia medicamentosa; (4) Internações prévias.",
      subItems: [],
      scoring: {
        adequate: "Realiza todas ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.25, max: 0.55 }
    },
    {
      id: 4,
      title: "4. Exame Físico: (1) Solicita permissão para realizar o exame físico; (2) Lava as mãos se paramentou.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Preparação para o exame físico: (1) Aquece as mãos antes de tocar no paciente; (2) Solicita de maneira educada que o paciente retire a blusa.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Inspeção: (1) Inspeção estática: Observa forma do tórax e condição da pele; (2) Inspeção dinâmica: Avalia frequência respiratória, amplitude e ritmo.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ou não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Realiza o exame das vias aéreas superiores: (1) Inspeciona o nariz; (2) Avalia a mucosa; (3) Palpa os seios frontais e maxilares; (4) Examina a cavidade oral; (5) Utiliza o abaixador de língua.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ou mais ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 8,
      title: "8. Palpação: (1) Realiza a palpação direta avaliando simetria, amplitude e expansibilidade; (2) Palpação dos ápices pulmonares; (3) Avalia as bases pulmonares; (4) Faz o mesmo procedimento se posicionando à frente do paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ou mais ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 9,
      title: "9. Percussão: (1) Realiza a percussão na parede anterior; (2) Realiza a percussão na parede posterior; (3) Realiza a percussão na parede lateral de ambos hemitórax.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ou mais ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Tipos de sons pulmonares: Som claro pulmonar (normal), Som timpânico (ar), Som submaciço (líquido), Som maciço (diminuição de ar)."
    },
    {
      id: 10,
      title: "10. Ausculta: (1) Aquece o estetoscópio; (2) Ausculta região cervical; (3) Ausculta região anterior; (4) Ausculta região posterior; (5) Ausculta região lateral; (6) Avalia a transmissão da voz (trinta e três).",
      subItems: [],
      scoring: {
        adequate: "Realiza cinco ou mais ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "Sons normais: traqueal, brônquico, vesicular. Sons anormais: estertores crepitantes, estridor, roncos, atrito pleural."
    },
    {
      id: 11,
      title: "11. Exames complementares: (1) Solicita Radiografia de tórax; (2) Identifica o padrão de consolidação na radiografia.",
      subItems: [],
      scoring: {
        adequate: "Realiza ambas ações.",
        partial: "Solicita a radiografia de tórax, mas não identifica o padrão de consolidação.",
        inadequate: "Não solicita radiografia de tórax."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 12,
      title: "12. Verbaliza o diagnóstico como: Pneumonia adquirida na comunidade.",
      subItems: [],
      scoring: {
        adequate: "Realiza diagnóstico correto.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 13,
      title: "13. Conduta: (1) Indica internação; (2) Inicia antibiótico beta-lactâmico+macrolídeo ou quinolona; (3) Antitérmico; (4) Suporte ventilatório; (5) Explica o motivo de internação.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ou mais ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 14,
      title: "14. Explica o motivo da internação: Menciona que o paciente deverá ficar internado devido a um CURB-65 igual a 3, que significa risco alto de morbidade e mortalidade.",
      subItems: [],
      scoring: {
        adequate: "Explica corretamente.",
        partial: "Explica parcialmente.",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 },
      dica_teorica: "CURB-65: Confusão, Ureia > 50 mg/dL, Respiração ≥ 30/min, Baixa pressão arterial, Idade ≥ 65 anos. 0 pontos: baixo risco. 1-2 pontos: risco moderado. 3-5 pontos: alto risco."
    }
  ],
  references: []
};

// Abcesso Pulmonar (ID: 1465)
export const abcessoPulmonar2Content: ChecklistContent = {
  scenario: {
    nivel: "Terciária - Hospitalar",
    tipo: "Urgência e emergência",
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
      "MOTIVO DE CONSULTA: Doutor(a) tenho sentido muita falta de ar, tosse e mal-estar.",
      "CARACTERÍSTICAS DA FALTA DE AR: Tempo de início: Começou há 2 semanas. Progressão: Piorou nos últimos 5 dias. Frequência: Constante. Fatores de piora: Intensifica com o esforço físico.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de início: Começou há 3 semanas. Progressão: Piorou nos últimos 2 dias. Frequência: Durante todo o dia. Característica: É uma tosse produtiva com catarro esverdeado e fedido.",
      "SINTOMAS ASSOCIADOS: Febre: Me sinto quente em alguns períodos do dia há 5 dias. Calafrios: À noite sinto arrepios. Sudorese: Sim, estou suando bastante. Hemoptise: Já tive expectoração com sangue 3x. Perda de peso e/ou anorexia: Sim, sinto que perdi peso. Gripe: Tive um episódio de gripe mês passado.",
      "ANTECEDENTES PESSOAIS: Doenças: Desconheço. Medicamentos: Nega. Alergias: Nega.",
      "HÁBITOS: Cigarro: Fumo 2 maços por dia, há 20 anos. Álcool: Bebo uma cachaça umas 3 vezes na semana. Droga: Eu uso crack e cocaína às vezes.",
      "APÓS VERBALIZAR O DIAGNÓSTICO: Quais as complicações posso apresentar?",
      "APÓS VERBALIZAR A CONDUTA COM ANTIBIOTICOTERAPIA: Doutor(a), e se a conduta medicamentosa não funcionar?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "#038ffb" },
    { id: 2, title: "Hemocultura", isOpen: false, color: "#038ffb" },
    { id: 3, title: "Broncoscopia / cultura do escarro", isOpen: false, color: "#038ffb" },
    { id: 4, title: "Laboratórios", isOpen: false, color: "#038ffb" },
    { id: 5, title: "Radiografia de Tórax", isOpen: false, color: "#038ffb" },
    { id: 6, title: "TRM-TB", isOpen: false, color: "#038ffb" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se, e; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Não realiza nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga sobre os sintomas associados relevantes: (1) Febre ou calafrios ou sudorese; (2) Dor torácica; (3) Expectoração purulenta; (4) Hemoptise; (5) Cianose e/ou palidez; (6) Sintomas gripais; (7) Despertar noturno por falta de ar.",
      subItems: [],
      scoring: {
        adequate: "Investiga sete ou seis itens.",
        partial: "Investiga cinco ou quatro itens.",
        inadequate: "Investiga três itens ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Uso de fármacos; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes de neoplasia.",
      subItems: [],
      scoring: {
        adequate: "Investiga as cinco ações.",
        partial: "Investiga três ou quatro ações.",
        inadequate: "Investiga dois ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.3, max: 0.6 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Realiza a ação.",
        partial: "-",
        inadequate: "Não realiza a ação."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 5,
      title: "5. Solicita exames complementares: (1) Solicita RX de tórax e Identifica as alterações (cavitação com nível hidroaéreo); (2) Solicita laboratórios; (3) Solicita TRM-TB.",
      subItems: [],
      scoring: {
        adequate: "Solicita três exames.",
        partial: "Solicita dois exames.",
        inadequate: "Não solicita nenhum exame."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Solicita broncoscopia E/OU cultura do escarro.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Realiza o Diagnóstico de: Abcesso Pulmonar.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "As causas se resumem em: Aspiração das secreções orais (mais comum), Obstrução endobrônquica e Disseminação hematogênica. A maioria dos abscessos pulmonares desenvolve-se após a aspiração de secreções orais por pacientes com gengivite ou higiene oral precária."
    },
    {
      id: 8,
      title: "8. Cita dois diagnósticos diferenciais: (1) Carcinoma brônquico; (2) Tuberculose; (3) Empiema pleural; (4) Bolhas enfisematosas infectadas; (5) Pneumonia adquirida na comunidade; (6) Granulomatose de Wegener.",
      subItems: [],
      scoring: {
        adequate: "Cita pelo menos dois.",
        partial: "Cita um.",
        inadequate: "Não cita nenhum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Estabelece conduta: (1) Internação hospitalar; (2) Inicia hidratação endovenosa; (3) Indica monitorização e suporte ventilatório; (4) Prescreve antibioticoterapia endovenosa empírica; (5) Indica fisioterapia respiratória; (6) Indica controle radiológico da doença.",
      subItems: [],
      scoring: {
        adequate: "Realiza quatro ou mais ações.",
        partial: "Realiza três ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Orienta sobre as medidas de pós alta: (1) Mudança no estilo de vida (cessar tabagismo, etilismo e drogas); (2) Prática de atividade física e alimentação saudável; (3) Acompanhamento ambulatorial; (4) Reabilitação pulmonar; (5) Encaminha para E-multi/CAPS-AD/Consultório na Rua.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ou mais ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 11,
      title: "11. Responde que, caso ocorra falha no tratamento com antibioticoterapia, será considerada uma drenagem percutânea, endobrônquica ou cirúrgica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 12,
      title: "12. Menciona complicações: (1) Empiema; (2) Fibrose pulmonar; (3) Insuficiência respiratória; (4) Fístula broncopleural; (5) Infecção disseminada.",
      subItems: [],
      scoring: {
        adequate: "Menciona três a cinco complicações.",
        partial: "Menciona duas complicações.",
        inadequate: "Menciona uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    }
  ],
  references: []
};

// Content for Hanseníase - Exame Dermatoneurólogico (ID: 1468)
export const hanseniaseExameDermatoneurologicoContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade conta com a seguinte infraestrutura:",
      "- Consultório;",
      "- Leitos de observação;",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você é médico de uma unidade de atendimento na atenção primária e atende uma paciente de 45 anos, com queixa de manchas no corpo."
    ]
  },
  orientacoes: [
    "- Realizar anamnese da paciente;",
    "- Solicitar o exame físico e verbalizar procedimentos condizentes ao motivo de consulta;",
    "- Solicitar exames complementares, se pertinentes ao caso;",
    "- Verbalizar a principal hipótese diagnostica e sua classificação operacional;",
    "- Propor o plano terapêutico adequado e medidas necessárias."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Maria, 45 anos, solteira, empregada doméstica.",
      "MOTIVO DA CONSULTA: Dr (a), estou preocupada com algumas manchas que apareceram na minha pele.",
      "LOCALIZAÇÃO: Nas costas. QUANTIDADE: 4 ou 5 manchas.",
      "TEMPO DE EVOLUÇÃO DAS LESÕES: Mais de três anos.",
      "EVOLUÇÃO: Primeiramente apareceram manchinhas brancas, mas estão crescendo e ficando avermelhadas.",
      "CONTATO PRÉVIO COM ALGUÉM COM HANSENÍASE: Sim, o pai. O pai tratou por 1 ano.",
      "DÚVIDAS: Isso é grave? Como pega isso?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Ectoscopia da mancha", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Baciloscopia/Biópsia", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Avaliação Neurológica dos nervos periféricos", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Testes Sensoriais", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "-",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga a queixa principal: (1) Localização; (2) Quantidade; (3) Caracteristica e/ou coloração; (4) Evolução; (5) Alteração da sensibilidade e/ou formigamentos; (6) Alopécia local.",
      subItems: [],
      scoring: {
        adequate: "Investiga seis itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais relevantes: (1) Comorbidades; (2) Uso de medicamentos; (3) Alergias; (4) Internações e/ou cirurgias; (5) Histórico familiares; (6) Hábitos tóxicos.",
      subItems: [],
      scoring: {
        adequate: "Investiga seis itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três itens ou menos."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 4,
      title: "4. Exame físico: (1) Solicita permissão para realizar o exame físico; (2) Se paramenta; (3) Pede para inspecionar a mancha/lesão; (4) Explica ao paciente o exame a seguir.",
      subItems: [],
      scoring: {
        adequate: "Realiza três itens ou mais.",
        partial: "Realiza dois itens.",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Descreve as alterações encontradas: (1) Lesão em relevo, avermelhada; (2) Bordes elevados; mal definidos; (3) Regiões claras ao centro (faveolamento).",
      subItems: [],
      scoring: {
        adequate: "Descreve três itens.",
        partial: "Descreve dois itens.",
        inadequate: "Descreve um item ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Realiza inspeção dos olhos, nariz, membros superiores e inferiores, buscando alterações relacionadas a doença.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 7,
      title: "7. Realiza palpação dos troncos nervosos periféricos: (1) Radial; (2) Ulnar; (3) Mediano; (4) Fibular comum; (5) Tibial posterior; (6) Auricular magno.",
      subItems: [],
      scoring: {
        adequate: "Realiza palpação de cinco itens ou mais.",
        partial: "Realiza a palpação de quatro itens.",
        inadequate: "Realiza a palpação de três itens ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Lembre-se. Quando o paciente queixa-se de dor, dormência, formigamento, etc, solicite ao paciente localizar a área, para que você possa palpar os nervos ali existentes, além dos nervos palpados rotineiramente."
    },
    {
      id: 8,
      title: "8. Avalia a força muscular.",
      subItems: [],
      scoring: {
        adequate: "Avalia.",
        partial: "-",
        inadequate: "Não avalia."
      },
      scores: { min: 0, partial: 0, max: 0.5 },
      dica_teorica: "O teste de força muscular é feito pedindo ao paciente que empurre ou puxe contra uma resistência. O médico avalia a força muscular de 0 a 5, onde 0 é sem contração muscular e 5 é força total."
    },
    {
      id: 9,
      title: "9. Realiza teste de mobilidade articular das mãos e pés.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 10,
      title: "10. Realiza teste de sensibilidade térmica: testa a sensibilidade térmica utilizando 2 tubos de ensaio frio e quente em todas as áreas afetadas.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Realiza teste de sensibilidade dolorosa: testa a sensibilidade dolorosa utilizando uma agulha ou objeto ponteagudo em todas as áreas afetadas.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 12,
      title: "12. Realiza teste de sensibilidade tátil: testa a sensibilidade tátil ultilizando estesiômetro (monofilamentos) ou caneta esferográfica comum em todas as áreas afetadas.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 13,
      title: "13. Verbaliza a hipótese diagnóstica e classificação operacional: (1) Hanseniase dimorfa; (2) Multibacilar.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza dois itens.",
        partial: "Verbaliza um item.",
        inadequate: "Não verbaliza nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "A hanseníase é classificada por tipo e número de lesões na pele. Paucibacilar: Até 5 lesões na pele. Multibacilar: Mais de 6 lesões na pele."
    },
    {
      id: 14,
      title: "14. Solicita baciloscopia e/ou biópsia da lesão.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 15,
      title: "15. Propõe o tratamento medicamentoso adequado: Diário: (1) Dapsona 100 mg/dia; (2) Clofazimina 50 mg/dia. Mensal: (3) Dapsona 100 mg 1x/mês (TDO); (4) Clofazimina 300 mg 1x/mês (TDO); (5) Rifampicina 600 mg 1x/mês (TDO).",
      subItems: [],
      scoring: {
        adequate: "Prescreve tratamento medicamentoso correto e completo, verbalizando a dose e o tempo de administração.",
        partial: "Prescreve o tratamento medicamentoso sem verbalizar a dose e/ou tempo de administração.",
        inadequate: "Não prescreve o tratamento medicamentoso adequado."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 16,
      title: "16. Estabelece o tempo correto de seguimento para a paciente multibacilar: entre 12 e 18 meses.",
      subItems: [],
      scoring: {
        adequate: "Estabelece.",
        partial: "-",
        inadequate: "Não estabelece."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 17,
      title: "17. Solicita que os contatos domiciliares compareçam na UBS para avaliação clínica e do status vacinal.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 18,
      title: "18. Realiza a notificação ao SINAN.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Hipoglicemia (ID: 1483)
export const hipoglicemiaContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Unidade de Pronto Atendimento (UPA)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Laboratório de análises clínicas;",
      "- Glicosímetro;",
      "- Leitos de internação."
    ],
    descricao: [
      "Paciente do sexo masculino, 19 anos, diabético tipo 1, ingressa na UPA relatando episódios frequentes de tontura."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada ao motivo de consulta;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar e interpretar exames complementares pertinentes;",
    "- Informar o diagnóstico, citando os possíveis motivos do ocorrido;",
    "- Indicar conduta terapêutica adequada;",
    "- Orientar sobre pelo menos 4 cuidados com o paciente após a alta."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Victor, 19 anos, solteiro.",
      "MOTIVO DE CONSULTA: Dr (a), estou tendo momentos de tonturas.",
      "TEMPO DE EVOLUÇÃO: Faz umas 3 semanas que venho sentindo isso.",
      "COMORBIDADES: Eu tenho Diabetes tipo I desde pequeno.",
      "MEDICAMENTOS: Uso terapia com insulina só. Há 3 semanas aumentou a dose.",
      "ATIVIDADE FÍSICA: Comecei a fazer academia no mês passado.",
      "DÚVIDAS: Como eu posso prevenir isso? Pode complicar se não for tratado na hora?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame neurológico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Glicemia capilar", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. O candidato: (1) Se apresenta e se identifica; (2) Pergunta o nome e cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga a tontura: (1) Tempo de evolução; (2) Episódios anteriores; (3) Sensação de giro; (4) Sensação de desmaio e/ou desequilíbrio e/ou flutuação; (5) Frequência; (6) Progressão; (7) Fatores desencadeantes; (8) Fatores atenuantes.",
      subItems: [],
      scoring: {
        adequate: "Investiga de seis a oito itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga de um a três itens."
      },
      scores: { min: 0, partial: 0.35, max: 0.75 }
    },
    {
      id: 3,
      title: "3. Investiga sinais e sintomas acompanhantes: (1) Sudorese; (2) Palpitações; (3) Tremores; (4) Convulsões; (5) Náuseas; (6) Vômitos; (7) Cefaleia; (8) Sintomas motores e/ou fraqueza muscular; (9) Alterações acústicas e/ou zumbidos e/ou perda auditiva.",
      subItems: [],
      scoring: {
        adequate: "Investiga de sete a nove itens.",
        partial: "Investiga de cinco a seis itens.",
        inadequate: "Investiga de um a quatro itens."
      },
      scores: { min: 0, partial: 0.4, max: 0.8 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais perguntando: (1) Comorbidades; (2) Uso de medicamentos; (3) Hábitos tóxicos; (4) Alimentação; (5) Atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga de quatro a cinco itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga de um a dois itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Investiga antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga.",
        partial: "-",
        inadequate: "Não investiga."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita: (1) Exame físico geral; (2) Exame neurológico.",
      subItems: [],
      scoring: {
        adequate: "Solicita os dois itens.",
        partial: "Solicita apenas um item.",
        inadequate: "Não solicita nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita glicemia capilar no momento da consulta.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.0 }
    },
    {
      id: 8,
      title: "8. Informa o diagnóstico de hipoglicemia.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza corretamente o diagnóstico.",
        partial: "-",
        inadequate: "Não verbaliza o diagnóstico ou o faz incorretamente."
      },
      scores: { min: 0, partial: 0, max: 1.0 },
      dica_teorica: "A hipoglicemia é classificada em três níveis: leve (54-70 mg/dL), moderada (<54 mg/dL) e grave (exige assistência de outra pessoa)."
    },
    {
      id: 9,
      title: "9. Questiona sobre fatores desencadeantes de hipoglicemia no paciente DM1: (1) Alterações na insulinoterapia; (2) Dieta e/ou jejum e/ou atraso na alimentação; (3) Atividade física intensa ou prolongada; (4) Ingestão insuficiente de carboidratos; (5) Uso de álcool.",
      subItems: [],
      scoring: {
        adequate: "Questiona de quatro a cinco itens.",
        partial: "Questiona três itens.",
        inadequate: "Questiona de um a dois itens."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 10,
      title: "10. Realiza hipótese diagnóstica relacionando condição atual do paciente à mudança da insulinoterapia e ao início recente da prática de exercícios físicos.",
      subItems: [],
      scoring: {
        adequate: "Realiza hipótese correlacionando etiologia do quadro com a mudança na insulinoterapia e com a prática de atividade física.",
        partial: "Realiza hipótese correlacionando etiologia do quadro apenas com a mudança na insulinoterapia.",
        inadequate: "Não realiza corretamente a hipótese."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 11,
      title: "11. Conduta: (1) Oferece carboidratos de absorção rápida; (2) Reavalia após quinze minutos com nova glicemia capilar.",
      subItems: [],
      scoring: {
        adequate: "Realiza os dois itens.",
        partial: "Realiza apenas um item.",
        inadequate: "Não realiza nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 12,
      title: "12. Orientações: (1) Ajustar a dose de insulina e a ingestão de carboidratos antes de fazer atividade física; (2) Manter os níveis de glicose dentro do alvo estabelecido; (3) Fazer refeições menores e mais frequentes ao longo do dia; (4) Comer uma refeição leve mas com carboidratos antes de dormir; (5) Alimentar-se antes e depois de atividades físicas; (6) Evitar alimentos que contêm sacarose; (7) Consumir álcool de forma moderada; (8) Monitorar a glicemia periodicamente.",
      subItems: [],
      scoring: {
        adequate: "Orienta de quatro a oito itens.",
        partial: "Orienta de duas a três ações.",
        inadequate: "Orienta um ou nenhum item."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 13,
      title: "13. Encaminha o paciente ao endocrinologista.",
      subItems: [],
      scoring: {
        adequate: "Encaminha.",
        partial: "-",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 14,
      title: "14. Complicações: (1) Perda da consciência; (2) Convulsões; (3) Coma; (4) Torpor.",
      subItems: [],
      scoring: {
        adequate: "Menciona ao menos dois itens.",
        partial: "Menciona um item.",
        inadequate: "Não menciona nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    }
  ],
  references: []
};

// Content for Ascite e PBE (ID: 1484)
export const ascitePbeContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Consultórios de atenção médica;",
      "- Enfermaria;",
      "- Laboratório de análises clinicas;",
      "- Serviço de radiologia convencional, endoscopia e ultrassonografia;",
      "- Unidade de terapia intensiva (UTI) e leitos de internação."
    ],
    descricao: [
      "Você é plantonista de um hospital de médio porte e irá realizar o atendimento de um paciente com queixa de distensão e desconforto abdominal."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa do paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular hipótese diagnóstica;",
    "- Estabelecer conduta terapêutica adequada;",
    "- Orientar e esclarecer as dúvidas do paciente."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Lucio, 52 anos de idade, atualmente em situação de rua.",
      "MOTIVO DE CONSULTA: Dr(a), tem alguns dias que percebo minha barriga inchada e com uma dor que causa bastante desconforto.",
      "INÍCIO: Começou há uns 10 dias. Dói toda a barriga.",
      "COMORBIDADES: Dr(a), já fui diagnosticado com cirrose, por conta do meu vício.",
      "ÁLCOOL: Eu bebo praticamente todos os dias desde minha adolescência.",
      "DÚVIDAS: Por que isso aconteceu, Dr(a)? Tenho que tomar algum remédio após a alta?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Análise do Líquido Ascítico", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Exames Laboratoriais", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente simulado e pergunta seu nome.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.125, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre o motivo de consulta: (1) Tempo de evolução; (2) Localização; (3) Irradiação; (4) Características; (5) Intensidade; (6) Frequência/Primeiro episódio; (7) Duração; (8) Atenuantes e agravantes.",
      subItems: [],
      scoring: {
        adequate: "Pergunta sete ou oito itens.",
        partial: "Pergunta de quatro a seis itens.",
        inadequate: "Pergunta três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta sobre sinais e sintomas associados: (1) Náuseas; (2) Vômitos; (3) Febre; (4) Alterações gastrointestinais; (5) Alterações urinárias; (6) Icterícia; (7) Hemorragias ou Sangramentos; (8) Alteração do estado de consciência; (9) Mal-estar.",
      subItems: [],
      scoring: {
        adequate: "Pergunta sete ou mais itens.",
        partial: "Pergunta quatro a seis itens.",
        inadequate: "Pergunta sobre três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga os antecedentes pessoais do paciente: (1) Comorbidades; (2) Uso de medicamentos; (3) Cirurgias; (4) Álcool e/ou cigarro e/ou drogas ilícitas; (5) Alimentação; (6) Atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga os seis itens.",
        partial: "Investiga quatro ou cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita os exames laboratoriais: (1) Hemograma; (2) Glicemia; (3) Sódio e Potássio; (4) Bilirrubinas total e frações; (5) TGO e TGP; (6) Ureia e creatinina; (7) Coagulograma e/ou INR; (8) Albumina sérica; (9) EAS ou rotina de urina; (10) Hemocultura.",
      subItems: [],
      scoring: {
        adequate: "Solicita oito ou mais exames.",
        partial: "Solicita seis ou sete exames.",
        inadequate: "Solicita cinco ou menos exames."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 7,
      title: "7. Solicita a paracentese diagnóstica.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1.0 },
      dica_teorica: "Deve ser realizada uma paracentese diagnóstica a todos os doentes com cirrose hepática e ascite admitidos no hospital, para excluir PBE."
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de ascite complicada com peritonite bacteriana espontânea.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico corretamente.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.5 },
      dica_teorica: "PBE clássica: contagem de polimorfonucleares > 250 cel/mm3 e cultura positiva monobacteriana."
    },
    {
      id: 9,
      title: "9. Explica sobre a condição ser uma complicação do seu diagnóstico prévio de cirrose hepática.",
      subItems: [],
      scoring: {
        adequate: "Explica adequadamente.",
        partial: "-",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza conduta adequada: (1) Internação hospitalar; (2) Analgésicos e/ou antitérmicos; (3) Antibioticoterapia endovenosa; (4) Reposição de Albumina 10%; (5) Indica paracentese de alívio, se necessário.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza quatro ou mais itens.",
        partial: "Verbaliza dois ou três itens.",
        inadequate: "Verbaliza dois ou menos itens."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 11,
      title: "11. Encaminha o paciente para E-multi e/ou CAPS-AD e/ou Consultório na Rua.",
      subItems: [],
      scoring: {
        adequate: "Encaminha adequadamente.",
        partial: "-",
        inadequate: "Não encaminha."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 12,
      title: "12. Realiza profilaxia para casos futuros de peritonite bacteriana espontânea e hemorragia digestiva alta com Norfloxacina, após a alta do paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1 }
    }
  ],
  references: []
};

// Content for Angioedema Hereditário (ID: 1503)
export const angioedemaHereditarioContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Urgência e emergência",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Pronto-socorro;",
      "- Consultório;",
      "- Laboratório de análises clínicas;",
      "- Sala de radiologia com radiografia;",
      "- Unidade de terapia intensiva."
    ],
    descricao: [
      "Você é um médico de plantão no pronto-socorro de um hospital terciário e irá atender uma mulher de 19 anos, acompanhada de sua irmã, com queixas de inchaço da face, lábios e língua."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese direcionada da paciente;",
    "- Solicitar e interpretar o exame físico;",
    "- Estabelecer a principal hipótese diagnóstica;",
    "- Citar demais fatores desencadeantes da patologia em questão;",
    "- Propor conduta pertinente ao caso."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "Paciente: Joyce, 19 anos, solteira e estudante. Irmã da paciente: Estella, 25 anos.",
      "MOTIVO DA CONSULTA: Oi, Dr(a)! Eu vou responder pela minha irmã, ela não consegue falar por conta da boca inchada.",
      "TEMPO DE EVOLUÇÃO: começou há cerca de 3 horas.",
      "EPISÓDIOS ANTERIORES: sim, já aconteceu umas duas ou três vezes.",
      "MEDICAMENTOS: ela começou a tomar anticonceptivo oral combinado há 1 semana.",
      "DÚVIDAS: Dra (a), por que não melhorou da última vez com a adrenalina? Ela vai ter que passar por algum especialista?"
    ]
  },
  impressos: [
    { id: 1, title: "Ectoscopia/Face", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame físico", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se: (1) Identifica-se; (2) Cumprimenta a acompanhante.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "Realiza um item.",
        inadequate: "Não realiza nenhum item."
      },
      scores: { min: 0, partial: 0.2, max: 0.4 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre os sinais e sintomas principais: (1) Início e tempo de evolução do edema; (2) Localização; (3) Prurido; (4) Urticária; (5) Sintomas gastrointestinais e/ou diarreia e/ou náuseas e vômitos; (6) Sintomas respiratórios ou dispneia, tosse; (7) Sintomas neurológicos ou síncope; (8) Dor abdominal.",
      subItems: [],
      scoring: {
        adequate: "Investiga seis itens ou mais.",
        partial: "Investiga cinco itens.",
        inadequate: "Investiga quatro itens ou menos."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 },
      dica_teorica: "Sempre avaliar angioedema por histamina e possibilidade de anafilaxia como primeira opção (mais frequente)."
    },
    {
      id: 3,
      title: "3. Pergunta sobre possíveis fatores desencadeantes: (1) Histórico de reações anteriores; (2) Uso de novos medicamentos; (3) Ingestão alimentar incomum; (4) Picadas de insetos.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 4,
      title: "4. Formula hipótese diagnóstica: angioedema hereditário com o uso de estrogênios como possível fator desencadeante.",
      subItems: [],
      scoring: {
        adequate: "Formula a hipótese corretamente, citando o fator desencadeante.",
        partial: "Formula a hipótese diagnóstica, sem citar o fator desencadeante.",
        inadequate: "Não formula corretamente a hipótese ou cita choque anafilático ou anafilaxia."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 },
      dica_teorica: "Ponto chave do diagnóstico: angioedema RECORRENTE, AUSÊNCIA DE URTICÁRIA e PRURIDO, AUSÊNCIA DE RESPOSTA ao uso de ANTI H1, associação com ESTROGÊNIOS."
    },
    {
      id: 5,
      title: "5. Cita fatores desencadeantes do angioedema hereditário: (1) Estresse emocional; (2) Trauma físico leve; (3) Infecções virais e bacterianas; (4) Menstruação/variações hormonais; (5) Uso de estrôgenios; (6) Cirurgias e/ou procedimentos médicos; (7) Uso de medicamentos específicos (IECA); (8) Uso de álcool.",
      subItems: [],
      scoring: {
        adequate: "Cita seis itens ou mais.",
        partial: "Cita cinco itens.",
        inadequate: "Cita quatro itens ou menos."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 6,
      title: "6. Propõe a conduta terapêutica adequada: (1) Suspensão dos anticonceptivos; (2) Suporte de vias aéreas e/ou monitoramento dos sinais vitais; (3) Administração de icatibanto ou inibidor de C1-esterase ou plasma fresco congelado; (4) Internação para observação.",
      subItems: [],
      scoring: {
        adequate: "Realiza três itens ou mais.",
        partial: "Realiza dois itens.",
        inadequate: "Realiza um item ou menos ou indica anti-H1, corticoide ou adrenalina."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 7,
      title: "7. Responde que a não melhorou com a adrenalina e os antihistamínicos pois o angioedema não é mediado por histamina e sim por bradicinina.",
      subItems: [],
      scoring: {
        adequate: "Explica adequadamente.",
        partial: "-",
        inadequate: "Não explica."
      },
      scores: { min: 0, partial: 0.6, max: 1.2 }
    },
    {
      id: 8,
      title: "8. Responde que a paciente terá que ser encaminhada ao alergologista.",
      subItems: [],
      scoring: {
        adequate: "Responde que será encaminhada ao alergologista.",
        partial: "-",
        inadequate: "Não encaminha ao alergologista."
      },
      scores: { min: 0, partial: 0.6, max: 1.4 }
    }
  ],
  references: []
};

// Content for DRESS (ID: 1504)
export const dressContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Hospitalar",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório;",
      "- Laboratório de análises clínicas;",
      "- Setor de radiologia com aparelho de radiografia;",
      "- Tomografia e ressonância magnética."
    ],
    descricao: [
      "Você é um médico atuando em um hospital e atende uma mulher de 35 anos, com queixa de febre e lesões na pele."
    ]
  },
  orientacoes: [
    "- Realizar anamnese da paciente;",
    "- Solicitar exame físico;",
    "- Solicitar exames complementares, se necessário;",
    "- Verbalizar a hipótese diagnóstica e possível fator desencadeante;",
    "- Propor conduta terapêutica adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Meu nome é Juliana, tenho 35 anos, sou casada e advogada.",
      "MOTIVO DE CONSULTA: Dr (a), estou com muita febre e manchas na pele.",
      "TEMPO DE EVOLUÇÃO: seis dias.",
      "PROGRESSÃO: começou no tronco e depois foi para os braços e face.",
      "MEDICAMENTOS: Dr (a), eu não tomava nada, mas passei no neurologista e ele me receitou carbamazepina, começei a tomar há umas 5 semanas.",
      "DÚVIDAS: O que é isso Dr (a)? Por que isso acontece? Há outros remédios que podem causar isso?"
    ]
  },
  impressos: [
    { id: 1, title: "Ectoscopia/Lesões de Pele", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame Físico Geral", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Exames Complementares", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se: (1) Identifica-se; (2) Cumprimenta a acompanhante.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "Realiza um item.",
        inadequate: "Não realiza nenhum item."
      },
      scores: { min: 0, partial: 0.1, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga os sintomas principais e acompanhantes: (1) Tempo de evolução do quadro; (2) Prurido; (3) Náuseas e vômitos; (4) Icterícia; (5) Mal estar; (6) Mialgia e/ou artralgia.",
      subItems: [],
      scoring: {
        adequate: "Investiga cinco itens ou mais.",
        partial: "Investiga de três a quatro itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Questiona sobre fatores desencadeantes: (1) Uso de medicamentos; (2) Picada de insetos; (3) Doenças autoimunes; (4) Episódios prévios; (5) Alergias.",
      subItems: [],
      scoring: {
        adequate: "Questiona quatro itens ou mais.",
        partial: "Questiona três itens.",
        inadequate: "Questiona dois itens ou menos."
      },
      scores: { min: 0, partial: 0.4, max: 0.8 }
    },
    {
      id: 4,
      title: "4. Solicita o exame físico.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "-",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita e interpreta exames complementares: (1) Hemograma; (2) TGO e TGP; (3) Bilirrubinas totais e frações; (4) Ureia e creatinina; (5) PCR ou VHS; (6) Eosinofilia.",
      subItems: [],
      scoring: {
        adequate: "Solicita o item (6) e mais três itens.",
        partial: "Solicita o item (6) e mais dois itens.",
        inadequate: "Solicita o item (6) e mais um item ou não solicita item algum ou não solicita o item (6)."
      },
      scores: { min: 0, partial: 0.5, max: 1.0 }
    },
    {
      id: 6,
      title: "6. Verbaliza a hipótese diagnóstica: DRESS ou Drug rash with eosinophilia and systemic symptoms ou síndrome de hipersensibilidade induzida por droga.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza adequadamente.",
        partial: "-",
        inadequate: "Não verbaliza adequadamente."
      },
      scores: { min: 0, partial: 0, max: 1.2 }
    },
    {
      id: 7,
      title: "7. Cita diagnósticos diferenciais: (1) Síndrome de Stevens Johnson; (2) Necrólise Epidérmica Tóxica; (3) Exantema viral; (4) Doenças autoimunes; (5) Síndrome hipereosinofílica; (6) Vasculites sistêmicas.",
      subItems: [],
      scoring: {
        adequate: "Cita dois itens ou mais.",
        partial: "Cita um item.",
        inadequate: "Não cita nenhum item."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    },
    {
      id: 8,
      title: "8. Explica o quadro: é uma reação de hipersensibilidade de tipo IV devido ao uso de carbamazepina.",
      subItems: [],
      scoring: {
        adequate: "Explica corretamente o quadro.",
        partial: "Verbaliza apenas sobre a carbamazepina.",
        inadequate: "Não explica adequadamente o quadro."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 9,
      title: "9. Cita outros medicamentos que podem causar o DRESS: (1) Alopurinol; (2) Fenitoína; (3) Lamotrigina; (4) Oxcarbazepina; (5) Fenobarbital; (6) Sulfonamidas.",
      subItems: [],
      scoring: {
        adequate: "Cita um item ou mais.",
        partial: "-",
        inadequate: "Não cita nenhum item."
      },
      scores: { min: 0, partial: 0, max: 1.0 }
    },
    {
      id: 10,
      title: "10. Propõe a conduta inicial: (1) Internação hospitalar; (2) Suspensão imediata do medicamento suspeito (carbamazepina); (3) Corticoesteroides sistêmicos; (4) Monitorização contínua; (5) Antitérmicos.",
      subItems: [],
      scoring: {
        adequate: "Propõe cinco itens.",
        partial: "Propõe o item (2) mais três itens.",
        inadequate: "Não propõe o item (2) ou propõe o item (2) mais dois itens."
      },
      scores: { min: 0, partial: 0.7, max: 1.4 }
    }
  ],
  references: []
};

// Content for Hipercalemia secundária à doença renal crônica (ID: 1507)
export const hipercalemiaSecundariaDrcContent: ChecklistContent = {
  scenario: {
    nivel: "Secundária",
    tipo: "Unidade de Pronto-Atendimento (UPA)",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Exames radiológicos convencionais;",
      "- Eletrocardiografia (ECG);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Paciente do sexo feminino procura a UPA devido a sintomas recorrentes de fraqueza muscular intensa, episódios de palpitações, e relatos de sensação de formigamento nas extremidades.",
      "Dados da triagem: PA 150x90 mmHg, FC 108 bpm, SatO2 98%, FR 14 irpm, Temp 36,5°C."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese;",
    "- Solicitar e interpretar os exames físicos geral e específico;",
    "- Solicitar e interpretar os exames laboratoriais específicos;",
    "- Solicitar e interpretar os exames complementares específicos;",
    "- Verbalizar hipótese diagnóstica explicando a causa do quadro ao paciente;",
    "- Formular dois diagnósticos diferenciais;",
    "- Orientar a conduta inicial mais indicada ao quadro clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Luana, 62 anos de idade, dona de casa, casada.",
      "MOTIVO DE CONSULTA: Estou sentindo o coração batendo muito forte e acelerado.",
      "TEMPO: Teve início há 2 horas.",
      "SINTOMAS: Fraqueza muscular, astenia, formigamento nas mãos e pés.",
      "DOENÇAS: Pressão alta, diabetes e tenho problemas nos rins.",
      "MEDICAMENTOS: Metformina, anlodipino, enalapril.",
      "DÚVIDAS: Dr.(a), terei que passar por diálise? Quais os critérios de indicação para a realização da diálise?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exames complementares", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Urina tipo 1", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Eletrocardiograma", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se: (1) Identifica-se; (2) Pergunta o nome e cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Pergunta sobre as características do quadro: (1) Tempo desde o início do quadro; (2) Frequência OU duração; (3) Progressão; (4) Fatores de melhoria; (5) Fatores de agravamento; (6) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Pergunta cinco ou mais características.",
        partial: "Pergunta três ou quatro características.",
        inadequate: "Pergunta uma ou duas características."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Pergunta a existência de outros sinais, ou sintomas associados: (1) Manifestações sistêmicas (astenia OU fadiga); (2) Dispneia OU esforço respiratório; (3) Fraqueza muscular OU Cãibras OU espasmos musculares; (4) Alterações neurológicas; (5) Queixas cardiovasculares; (6) Diarreia OU dor abdominal OU náuseas OU vômitos.",
      subItems: [],
      scoring: {
        adequate: "Pergunta seis ou mais itens.",
        partial: "Pergunta quatro ou cinco itens.",
        inadequate: "Pergunta três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Uso de fármacos; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Alimentação/atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga as cinco ações.",
        partial: "Investiga três ou quatro ações.",
        inadequate: "Investiga dois ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico: (1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta; (2) Interpreta exame físico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Solicita exames complementares: (1) Hemograma; (2) Ureia; (3) Creatinina; (4) Exame de urina; (5) Glicemia em jejum; (6) Hemoglobina glicada; (7) Perfil lipídico completo; (8) Sódio; (9) Potássio; (10) Fósforo; (11) Cálcio; (12) Gasometria arterial.",
      subItems: [],
      scoring: {
        adequate: "Solicita oito exames.",
        partial: "Solicita cinco a sete exames.",
        inadequate: "Solicita quatro ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Verbaliza e explica as alterações encontradas nos exames complementares: (1) Anemia normocítica e normocrômica; (2) Glicemia sérica e hemoglobina glicada alterados; (3) Ureia e creatinina elevadas; (4) Hipercalemia; (5) Hiperfosfatemia; (6) Hipocalcemia.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza seis alterações.",
        partial: "Verbaliza cinco alterações.",
        inadequate: "Verbaliza quatro ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Solicita e interpreta corretamente as alterações do ECG: (1) Onda T alta e pontiaguda ou apiculada; (2) Alargamento do complexo QRS; (3) Diminuição da amplitude da onda P.",
      subItems: [],
      scoring: {
        adequate: "Interpreta adequadamente três alterações.",
        partial: "Interpreta duas alterações.",
        inadequate: "Interpreta dois ou não interpreta."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Verbaliza hipótese diagnóstica de hipercalemia e identifica corretamente a causa (etiologia) como sendo secundária doença renal crônica.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza a hipótese corretamente e identifica como sendo secundária a doença renal crônica.",
        partial: "Verbaliza somente hipercalemia.",
        inadequate: "Não verbaliza o diagnóstico e não identifica a causa."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 10,
      title: "10. Formula diagnósticos diferenciais: (1) TEP; (2) AVC isquêmico OU hemorrágico; (3) Taquiarritmias; (4) Cetoacidose diabética; (5) Hipercalemia medicamentosa.",
      subItems: [],
      scoring: {
        adequate: "Formula dois ou mais diagnósticos diferenciais.",
        partial: "Formula um diagnóstico diferencial.",
        inadequate: "Não formula diagnóstico algum."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Estabelece conduta: (1) Internação; (2) Monitoramento contínuo dos níveis de potássio e função renal; (3) Administra gluconato de cálcio para estabilizar a membrana cardíaca; (4) Administra Insulina e glicose; (5) Administra resina trocadora de íons de potássio; (6) Orienta ajuste nutricional; (7) Controle adequado da diabetes e hipertensão.",
      subItems: [],
      scoring: {
        adequate: "Realiza cinco ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Responde mencionando as indicações de diálise: (1) Sintomas Urêmicos; (2) Hipercalemia grave refratária; (3) Acidose metabólica severa; (4) Hipervolemia refratária; (5) TFG Reduzida abaixo de 10-15 ml/min/1,73 m².",
      subItems: [],
      scoring: {
        adequate: "Menciona quatro ou cinco indicações.",
        partial: "Menciona três indicações.",
        inadequate: "Menciona duas ou nenhuma indicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Lombalgia - Exame físico da coluna lombar (ID: 1513)
export const lombalgiaExameFisicoColunaLombarContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Sala de atenção médica;",
      "- Sala de medicação;",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Você irá atender a um paciente de 35 anos que apresenta dor lombar há duas semanas, sem irradiação aparente."
    ]
  },
  orientacoes: [
    "- Realizar anamnese dirigida à queixa principal do paciente;",
    "- Realizar e verbalizar todas as etapas do exame físico semiológico direcionado à queixa do paciente;",
    "- Solicitar exames complementares, se necessário;",
    "- Definir a conduta explicando ao paciente;",
    "- Indica medidas de recuperação funcional e prevenção da cronificação."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Pedro, 35 anos de idade, programador.",
      "MOTIVO DE CONSULTA: Estou com dor na coluna doutor(a).",
      "TEMPO DE EVOLUÇÃO: Está doendo já tem duas semanas.",
      "LOCALIZAÇÃO: Dói no meio e dos lados da coluna lombar.",
      "INTENSIDADE: Dor moderada (6/10). Tipo: Parece uma dor em aperto.",
      "FATORES DE MELHORA: Se eu deitar de lado e ficar quieto melhora um pouco.",
      "FATORES DE PIORA: Piora quando estou no trabalho.",
      "DÚVIDAS: Doutor(a), quais os sinais de alarme que devo ter maior atenção?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame da Coluna Lombar", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Achados do Exame da Coluna Lombar", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se: (1) Identifica-se; (2) Pergunta o nome e cumprimenta o paciente simulado.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.12, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga as características da dor lombar: (1) Tempo de evolução; (2) Localização; (3) Intensidade; (4) Tipo de dor; (5) Irradiação; (6) Fatores de melhora; (7) Fatores de piora; (8) Frequência dos episódios; (9) Mudança no padrão da dor.",
      subItems: [],
      scoring: {
        adequate: "Investiga sete a nove itens.",
        partial: "Investiga cinco ou seis itens.",
        inadequate: "Investiga quatro ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Medicação de uso contínuo; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Hábitos alimentares; (8) Prática de atividade física; (9) Sono; (10) Vínculo trabalhista.",
      subItems: [],
      scoring: {
        adequate: "Investiga as dez ações.",
        partial: "Investiga seis a nove ações.",
        inadequate: "Investiga cinco ou não investiga item algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico: (1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta; (2) Interpreta exame físico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Realiza a inspeção estática: (1) Observa a postura do paciente em pé, verificando a presença de lordose, cifose ou escoliose; (2) Verifica a simetria dos músculos paravertebrais e a presença de atrofia ou hipertrofia muscular.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Realiza não nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 6,
      title: "6. Realize a inspeção dinâmica: (1) Solicita ao paciente que realize movimentos de flexão, extensão, inclinação lateral e rotação da coluna lombar; (2) Observa a amplitude de movimento e a presença de dor durante esses movimentos; (3) Peça para caminhar na ponta dos pés e nos calcanhares para avaliar a função das raízes nervosas L5 e S1.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 },
      dica_teorica: "Pedir para o paciente caminhar na ponta dos pés durante o exame físico lombar tem como principal objetivo avaliar a função das raízes nervosas lombossacrais, especialmente a raiz S1."
    },
    {
      id: 7,
      title: "7. Realiza a palpação: (1) Palpa os processos espinhosos das vértebras lombares, começando de L1 até S1; (2) Palpa as articulações sacroilíacas; (3) Palpa a região abdominal.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o exame físico neurológico: (1) Força: Avalia a força dos principais grupos musculares dos membros inferiores; (2) Reflexos: Avalia os reflexos patelar (L4) e aquileu (S1); (3) Sensibilidade: Avalia a sensibilidade nos dermátomos L4, L5 e S1.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Não realiza nenhuma manobra."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 9,
      title: "9. Realiza testes funcionais E/OU manobras especiais: (1) Teste de Schober; (2) Manobra de Lasègue (Sinal de Lasègue); (3) Teste de Fabere (Patrick).",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas manobras.",
        partial: "Realiza uma manobra.",
        inadequate: "Não realiza nenhuma manobra."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Realiza diagnóstico de lombalgia mecânica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 0.5 }
    },
    {
      id: 11,
      title: "11. Realiza conduta adequada: (1) Indica repouso relativo; (2) Prescreve analgésicos/anti-inflamatórios; (3) Prescreve relaxantes musculares; (4) Compressas quentes ou frias; (5) Passa uma orientação postural.",
      subItems: [],
      scoring: {
        adequate: "Realiza duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza nenhuma manobra."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 12,
      title: "12. Indica medidas de recuperação funcional e prevenção da cronificação: (1) Fisioterapia; (2) Alongamento; (3) Fortalecimento; (4) Treinamento de estabilidade lombopélvica; (5) Terapias manuais e liberação miofascial; (6) Exercícios de baixo impacto.",
      subItems: [],
      scoring: {
        adequate: "Indica quatro ou mais medidas.",
        partial: "Indica duas ou três medidas.",
        inadequate: "Realiza uma ou nenhuma medida."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 13,
      title: "13. Menciona sinais de alarme: (1) Febre associada à dor lombar; (2) Perda de peso inexplicada; (3) Histórico de câncer; (4) Trauma significativo; (5) Déficit neurológico progressivo; (6) Incontinência urinária ou fecal; (7) Idade avançada (>50 anos) com início recente da dor.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza cinco sinais de alarme.",
        partial: "Verbaliza três ou quatro sinais de alarme.",
        inadequate: "Verbaliza dois sinais de alarme."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    }
  ],
  references: []
};

// Content for Hipertireoidismo/Doença de Graves (ID: 1516)
export const hipertireoidismoDoencaGravesContent: ChecklistContent = {
  scenario: {
    nivel: "Terciária",
    tipo: "Ambulatorial e Hospitalar",
    situacao: [
      "Considere que todos os recursos necessários para atendimento estão disponíveis:",
      "- Exames radiológicos convencionais;",
      "- Ultrassonografia;",
      "- Eletrocardiografia (ECG);",
      "- Laboratório de análises clínicas;",
      "- Cintilografia."
    ],
    descricao: [
      "Você recebe para consulta agendada a paciente Maria Silva, 32 anos de idade, que vem apresentando palpitações."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese;",
    "- Realize o exame específico direcionado a queixa e interprete os resultados;",
    "- Solicitar e interpretar os exames laboratoriais específicos;",
    "- Solicitar e interpretar os exames complementares específicos;",
    "- Estabelecer diagnóstico;",
    "- Verbalize ao menos dois diagnóstico diferenciais;",
    "- Orientar a conduta inicial mais indicada ao quadro clínico;",
    "- Verbalize ao menos duas complicações do quadro."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Maria Silva, 32 anos de idade, professora, solteira.",
      "MOTIVO DE CONSULTA: Estou perdendo peso e sinto meu coração muito acelerado.",
      "TEMPO DE EVOLUÇÃO: Três meses.",
      "SINTOMAS: Perda de peso (uns cinco quilos), tremores nas mãos, sudorese excessiva, ansiedade, nervosismo, insônia, bócio, exoftalmia.",
      "ANTECEDENTES FAMILIARES: Mãe com hipotireoidismo.",
      "DÚVIDAS: E se esse tratamento não funcionar, quais seriam as alternativas? Quais as complicações do quadro?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame físico geral", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Exame da tireoide", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Laboratório", isOpen: false, color: "bg-primary" },
    { id: 4, title: "Cintilografia", isOpen: false, color: "bg-primary" },
    { id: 5, title: "Eletrocardiograma", isOpen: false, color: "bg-primary" },
    { id: 6, title: "Ultrassonografia cervical", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta a paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza apenas uma ação ou não realiza nenhuma."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga as características do quadro apresentado: (1) Tempo de evolução; (2) Forma de início; (3) Progressão; (4) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga os quatro itens.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga sobre os sintomas associados: (1) Perda de peso; (2) Tremores; (3) Sudorese; (4) Ansiedade/irritabilidade/nervosismo; (5) Insônia; (6) Presença de bócio; (7) Disfagia/rouquidão/alterações na voz; (8) Exoftalmia/alteração nos olhos; (9) Menstruação irregular.",
      subItems: [],
      scoring: {
        adequate: "Investiga nove sintomas.",
        partial: "Investiga cinco a oito sintomas.",
        inadequate: "Investiga quatro sintomas ou não investiga sintoma algum."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Comorbidades; (2) Cirurgias ou internações prévias; (3) Medicamentos de uso contínuo; (4) Alergias; (5) Cartão de vacina; (6) Antecedentes familiares.",
      subItems: [],
      scoring: {
        adequate: "Investiga os seis itens.",
        partial: "Investiga de quatro a cinco itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico: (1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta; (2) Interpreta exame físico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 6,
      title: "6. Realiza exame físico cervical: (1) Realiza a inspeção estática; (2) Realiza a inspeção dinâmica; (3) Realiza palpação; (4) Busca por linfonodos regionais; (5) Realiza percussão E/OU Auscultação.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza os três itens.",
        partial: "Verbaliza dois itens.",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 7,
      title: "7. Solicita exames complementares: (1) Hemograma; (2) TSH; (3) T3/T4 livre; (4) Anticorpo TRAb; (5) Ultrassonografia de tireoide; (6) Eletrocardiograma; (7) Cintilografia.",
      subItems: [],
      scoring: {
        adequate: "Solicita cinco exames.",
        partial: "Solicita três ou quatro exames.",
        inadequate: "Solicita dois ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de: (1) Hipertireoidismo; (2) Doença de Graves.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0, max: 1.55 }
    },
    {
      id: 9,
      title: "9. Cita diagnósticos diferenciais: (1) Tireoidite subaguda; (2) Bócio multinodular tóxico; (3) Adenoma tóxico.",
      subItems: [],
      scoring: {
        adequate: "Cita ao menos dois diagnósticos diferenciais.",
        partial: "Cita apenas um diagnóstico diferencial.",
        inadequate: "Não cita nenhum diagnóstico diferencial."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 10,
      title: "10. Estabelece conduta: (1) Administra betabloqueadores; (2) Administra Metimazol ou propiltiouracil; (3) Monitoramento periódico dos níveis de TSH, T3, T4.",
      subItems: [],
      scoring: {
        adequate: "Realiza três ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Na doença de Graves, indica-se o uso de betabloqueadores, em especial o propranolol, em doses de 20 mg até 80mg, 2 ou 3 vezes ao dia. Deve-se utilizar também drogas antitireoidianas como metimazol."
    },
    {
      id: 11,
      title: "11. Responde sobre as alternativas se falha no tratamento: (1) Radioiodoterapia; (2) Cirurgia/tireoidectomia total.",
      subItems: [],
      scoring: {
        adequate: "Responde a dúvida do paciente.",
        partial: "-",
        inadequate: "Não responde."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 12,
      title: "12. Verbaliza complicações: (1) Crise tireotóxica; (2) Orbitopatia de Graves; (3) Bócio grande; (4) Osteoporose; (5) Arritmias cardíacas; (6) Complicações obstétricas.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza ao menos duas complicações.",
        partial: "Verbaliza ao menos uma complicação.",
        inadequate: "Não verbaliza."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Síndrome metabólica (ID: 1517)
export const sindromeMetabolicaContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade possui a seguinte infraestrutura:",
      "- Consultório (sala de atendimento simulado);",
      "- Laboratório de análises clínicas."
    ],
    descricao: [
      "Um paciente de 52 anos chega para uma avaliação de saúde."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Solicitar exame físico direcionado à queixa principal do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Estabelecer diagnóstico sindrômico correlacionando-a aos resultados dos exames complementares;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Carlos, 52 anos, casado, gerente de vendas.",
      "MOTIVO DE CONSULTA: Estou preocupado com meu peso e sinto que estou sempre cansado.",
      "CARACTERÍSTICAS: Sempre fui mais cheinho, mas no último ano tenho ganhado bastante peso (10 quilos).",
      "SINTOMAS: Fadiga/cansaço frequente, dispneia ao esforço, ansiedade, insônia.",
      "COMORBIDADES: Tenho hipertensão arterial. Tomo losartana.",
      "PAI: Meu pai teve um infarto aos 65 anos. MÃE: Minha mãe é diabética.",
      "DÚVIDAS: Preciso tomar mais algum remédio? Isso pode se complicar se eu não tratar adequadamente?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Ectoscopia", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Exames laboratoriais", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresenta-se e cumprimenta o paciente: (1) Identifica-se; (2) Cumprimenta o paciente.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza apenas uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga sobre características do quadro (PESO): (1) Tempo de evolução desde o início do quadro; (2) Quilos ganhos no período; (3) Tentativas prévias para diminuir o peso.",
      subItems: [],
      scoring: {
        adequate: "Investiga três itens.",
        partial: "Investiga dois itens.",
        inadequate: "Investiga um ou nenhum item."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga sinais e sintomas associados: (1) Fadiga/astenia; (2) Dispneia; (3) Palpitações; (4) Poliúria; (5) Polidipsia; (6) Polifagia; (7) Alterações no humor/ansiedade/depressão; (8) Insônia; (9) Acantose nigricans.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito itens.",
        partial: "Investiga de quatro a sete itens.",
        inadequate: "Investiga três ou menos itens."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Medicação de uso contínuo; (3) Alergia medicamentosa; (4) Internações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Hábitos alimentares; (8) Prática de atividade física.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito itens.",
        partial: "Investiga de cinco a sete itens.",
        inadequate: "Investiga quatro ou não investiga item algum."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico: (1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta; (2) Interpreta exame físico.",
      subItems: [],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "-",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 6,
      title: "6. Identifica e menciona as seguintes alterações: (1) Obesidade Grau I; (2) Circunferência abdominal aumentada; (3) Pressão arterial não controlada.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "-",
        inadequate: "Realiza duas, uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Solicita exames complementares: (1) Hemograma; (2) Ureia; (3) Creatinina; (4) Exame de urina; (5) Glicemia em jejum; (6) Hemoglobina glicada; (7) Perfil lipídico completo; (8) TSH.",
      subItems: [],
      scoring: {
        adequate: "Solicita sete ou mais exames.",
        partial: "Solicita cinco ou seis exames.",
        inadequate: "Solicita quatro ou menos exames."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Realiza o diagnóstico de síndrome metabólica.",
      subItems: [],
      scoring: {
        adequate: "Realiza.",
        partial: "-",
        inadequate: "Não realiza."
      },
      scores: { min: 0, partial: 0.65, max: 1.3 }
    },
    {
      id: 9,
      title: "9. Verbaliza sobre as alterações que levaram a esse diagnóstico: (1) Aumento da circunferência abdominal; (2) IMC aumentado OU obesidade Grau I; (3) Pressão arterial aumentada; (4) HDL reduzido; (5) Hipertrigliceridemia; (6) Glicemia aumentada OU intolerância à glicose.",
      subItems: [],
      scoring: {
        adequate: "Verbaliza seis alterações.",
        partial: "Verbaliza cinco alterações.",
        inadequate: "Verbaliza quatro ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 },
      dica_teorica: "Critérios Diagnósticos: Circunferência Abdominal (Homens >102 cm, Mulheres >88 cm), Triglicerídeos ≥150 mg/dL, HDL baixo, PA ≥130/85 mmHg, Glicemia de jejum ≥100 mg/dL. A presença de pelo menos três destes critérios indica a síndrome metabólica."
    },
    {
      id: 10,
      title: "10. Condutas iniciais mais indicadas: (1) Orienta sobre alimentação saudável; (2) Incentiva a prática regular de atividade física; (3) Incentiva a perda de peso; (4) Higiene do sono; (5) Incentiva a cessação do tabagismo e alcoolismo; (6) Avalia a eficácia da losartana OU ajustar a dose; (7) Explica que o retorno deverá ser realizado em um período de três a seis meses; (8) Oferece apoio multidisciplinar (E-multi).",
      subItems: [],
      scoring: {
        adequate: "Realiza seis ou mais ações.",
        partial: "Realiza de três a cinco ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 1, max: 2 }
    },
    {
      id: 11,
      title: "11. Menciona complicações: (1) Doença cardiovascular; (2) Diabetes mellitus tipo 2; (3) Doenças hepáticas; (4) Doença renal crônica; (5) Problemas de circulação e saúde vascular; (6) Obesidade OU transtornos osteoarticulares; (7) Disfunção hormonal; (8) Aumento do risco de certos tipos de câncer; (9) Transtornos depressivos OU ansiosos.",
      subItems: [],
      scoring: {
        adequate: "Menciona cinco complicações.",
        partial: "Menciona de duas a quatro complicações.",
        inadequate: "Menciona uma ou nenhuma complicação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    }
  ],
  references: []
};

// Content for Hipermedicação no Idoso/Síndromes Geriátricas (ID: 1523)
export const hipermedicacaoIdosoSindromesGeriatricasContent: ChecklistContent = {
  scenario: {
    nivel: "Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade conta com a seguinte infraestrutura:",
      "- Consultório;",
      "- Laboratório de análises clínicas;",
      "- Ultrassonografia;",
      "- Apoio para realização de radiografias."
    ],
    descricao: [
      "Você é um médico atendendo em uma unidade de saúde e recebe um paciente de 78 anos, trazido por sua filha, com queixa de fraqueza e tonturas."
    ]
  },
  orientacoes: [
    "- Realizar a anamnese;",
    "- Solicitar e interpretar o exame físico geral e testes essenciais específicos;",
    "- Solicitar e interpretar os exames laboratoriais;",
    "- Identificar os diagnósticos síndrômicos presentes na rotina do paciente;",
    "- Verbalizar a principal hipótese diagnóstica relacionada a queixa principal do paciente;",
    "- Orientar medidas terapêuticas iniciais (farmacológicas e não farmacológicas) e acompanhamento clínico."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: João Silva, 78 anos, aposentado, viúvo.",
      "MOTIVO DE CONSULTA: Minha filha está preocupada comigo porque venho me sentindo fraco e com tonturas ultimamente.",
      "TEMPO DE EVOLUÇÃO: Três meses.",
      "FATORES AGRAVANTES: Piora após tomar os remédios.",
      "SINTOMAS: Confusão às vezes, astenia, quedas frequentes, incontinência urinária leve, alterações na memória.",
      "DOENÇAS: Hipertensão, diabetes tipo 2, osteoartrite e histórico de AVC isquêmico há 5 anos.",
      "MEDICAMENTOS: Muitos, incluindo medicamentos para pressão, para gordura no sangue, analgésicos, entre outros.",
      "DÚVIDAS: Dr(a), eu ouvi falar dessas síndromes geriátricas, o que são elas? E quais são essas síndromes?"
    ]
  },
  impressos: [
    { id: 1, title: "Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Lista de Medicamentos", isOpen: false, color: "bg-primary" },
    { id: 3, title: "Mini Exame do Estado Mental", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação: (1) Identifica-se; (2) Cumprimenta o paciente e a filha.",
      subItems: [],
      scoring: {
        adequate: "Realiza dois itens.",
        partial: "-",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0, max: 0.2 }
    },
    {
      id: 2,
      title: "2. Investiga as características do quadro apresentado: (1) Tempo de evolução; (2) Frequência; (3) Progressão; (4) Fatores agravantes e atenuantes; (5) Episódios anteriores.",
      subItems: [],
      scoring: {
        adequate: "Investiga quatro itens ou mais.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Realiza anamnese direcionada investigando: (1) Histórico de quedas; (2) Episódios de confusão; (3) Astenia; (4) Incontinência esfincteriana/urinária; (5) Dificuldade em atividades diárias; (6) Alterações na memória; (7) Alterações no sono; (8) Alterações no humor/ansiedade/depressão; (9) Alterações auditivas e/ou visuais.",
      subItems: [],
      scoring: {
        adequate: "Investiga oito itens ou mais.",
        partial: "Investiga de cinco a sete itens.",
        inadequate: "Investiga quatro itens ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 4,
      title: "4. Investiga antecedentes pessoais: (1) Doenças crônicas; (2) Uso de fármacos; (3) Alergia medicamentosa; (4) Internações/hospitalizações prévias; (5) Antecedentes familiares; (6) Hábitos tóxicos; (7) Alimentação/atividade física; (8) Rede de apoio.",
      subItems: [],
      scoring: {
        adequate: "Investiga as cinco itens ou mais.",
        partial: "Investiga três itens.",
        inadequate: "Investiga dois itens ou menos."
      },
      scores: { min: 0, partial: 0.4, max: 0.8 }
    },
    {
      id: 5,
      title: "5. Solicita exame físico: (1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta; (2) Interpreta exame físico; (3) Solicita e interpreta o Mini exame do estado mental.",
      subItems: [],
      scoring: {
        adequate: "Realiza as três itens.",
        partial: "Realiza dois itens.",
        inadequate: "Realiza um item ou menos."
      },
      scores: { min: 0, partial: 0.75, max: 1.5 }
    },
    {
      id: 6,
      title: "6. Identifica síndromes geriátricas presentes: (1) Instabilidade postural; (2) Incontinência esfincteriana/urinária; (3) Incapacidade cognitiva; (4) Iatrogenia.",
      subItems: [],
      scoring: {
        adequate: "Identifica quatro itens.",
        partial: "Identifica de dois a três itens.",
        inadequate: "Identifica um item ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 },
      dica_teorica: "Os 7 I's das Síndromes geriátricas são: Incapacidade cognitiva, iatrogenia, incontinência urinária e fecal, instabilidade postural, imobilidade, incapacidade de comunicação e insuficiência familiar."
    },
    {
      id: 7,
      title: "7. Formula e verbaliza a hipótese diagnóstica: polifarmácia associada à hipermedicação.",
      subItems: [],
      scoring: {
        adequate: "Realiza o diagnóstico corretamente.",
        partial: "Realiza o diagnóstico de maneira incompleta.",
        inadequate: "Não diagnostica corretamente."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Polifarmácia é definida pela OMS como o uso rotineiro de quatro ou mais medicamentos simultaneamente. Hipermedicação refere-se ao uso excessivo e desnecessário de medicamentos."
    },
    {
      id: 8,
      title: "8. Solicita exames de laboratório: (1) Hemograma; (2) PCR ou VHS; (3) TSH; (4) Vitamina B12; (5) Creatinina; (6) Ureia; (7) Glicemia; (8) Sódio; (9) Potássio; (10) Cálcio; (11) Perfil lipídico.",
      subItems: [],
      scoring: {
        adequate: "Solicita oito itens ou mais.",
        partial: "Solicita de quatro a sete itens.",
        inadequate: "Solicita três itens ou menos."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Estabelece conduta: (1) Suspende um dos anti-hipertensivos; (2) Considera alternativas não farmacológicas para controle da dor da artrite; (3) Considera descontinuar a cavalinha e a copaíba; (4) Indica a prática regular de atividade física com exercícios de fortalecimento pélvico; (5) Indica alimentação saudável e ingesta hídrica adequadas; (6) Orienta sobre prevenção de quedas; (7) Reforça a educação do paciente e dos cuidadores; (8) Agenda retorno para acompanhamento.",
      subItems: [],
      scoring: {
        adequate: "Realiza sete itens ou mais.",
        partial: "Realiza de três a seis itens.",
        inadequate: "Realiza dois itens ou menos."
      },
      scores: { min: 0, partial: 1, max: 2 }
    }
  ],
  references: []
};


// Content for DPOC/ Exame Físico Respiratório (UID: 1579)
export const dpocExameFisicoRespiratorioContent: ChecklistContent = {
  scenario: {
    nivel: "Unidade de Atenção Primária",
    tipo: "Ambulatorial",
    situacao: [
      "A unidade apresenta a seguinte infraestrutura:",
      "- Sala de atenção médica;",
      "- Sala de medicação;",
      "- Apoio para exames de leve e moderada complexidade como a espirometria."
    ],
    descricao: [
      "Você realizará o atendimento de um paciente do sexo masculino relatando tosse e falta de ar."
    ]
  },
  orientacoes: [
    "- Realizar anamnese direcionada à queixa principal do paciente;",
    "- Realizar e verbalizar todas as etapas do exame físico semiológico direcionado para a queixa do paciente;",
    "- Solicitar exames complementares pertinentes ao caso;",
    "- Formular e verbalizar a hipótese diagnóstica definitiva;",
    "- Indicar a conduta terapêutica adequada."
  ],
  instrucoes: {
    titulo: "Script do Ator/Atriz",
    itens: [
      "DADOS PESSOAIS: Bruno, 66 anos de idade, casado, aposentado.",
      "MOTIVO DE CONSULTA: Queria algum remédio para essa tosse que não me deixa descansar, e também tenho sentido faltar de ar.",
      "CARACTERÍSTICAS DA TOSSE: Tempo de evolução: Faz muito tempo que tenho tosse, uns 5 anos mais ou menos. Porém desde o ano passado sinto que aumentou bastante. Presença de secreção: Tem sempre tem secreção, de cor clara.",
      "CARACTERÍSTICAS DA DISPNEIA: Tempo de evolução: Tem um ano que comecei a sentir. Frequência: Sinto a todo momento. Progressão: Tem piorado cada vez mais com o passar dos meses. Fatores de melhora/piora: Quando estou caminhando no meu ritmo preciso parar de vez em quando para respirar melhor.",
      "ANTECEDENTES PESSOAIS: Doenças: Nega. Internações prévias: Ano passado tive uma crise de falta de ar, mas não precisei ficar internado. Cirurgias: Nega. Medicamentos: Nega. Alergias: Nega. Cartão de vacina: Não tenho, faz muitos anos que não tomo nenhuma vacina.",
      "HÁBITOS: Álcool: Nega. Cigarro: Sim, fumo desde os 15 anos de idade, 2 maços por dia mais ou menos. Drogas: Nega. Alimentação: Como o que tem em casa, arroz, feijão e carne. Atividade física: Nega. Sono: Durmo mal por causa da tosse e no outro dia estou sem energia.",
      "APÓS A VERBALIZAÇÃO/REALIZAÇÃO DO EXAME FÍSICO COMPLETO DE APARELHO RESPIRATÓRIO DEVERÁ SER ENTREGUE O IMPRESSO: ACHADOS DO EXAME FÍSICO."
    ]
  },
  impressos: [
    { id: 1, title: "Impresso 1 – Achados do Exame Físico", isOpen: false, color: "bg-primary" },
    { id: 2, title: "Impresso 2 – Espirometria", isOpen: false, color: "bg-primary" }
  ],
  evaluationItems: [
    {
      id: 1,
      title: "1. Apresentação:",
      subItems: [
        "(1) Identifica-se; e,",
        "(2) Cumprimenta o paciente simulado."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 2,
      title: "2. Investiga os sinais e sintomas apresentados pelo paciente.",
      subItems: [
        "(1) Tempo de evolução;",
        "(2) Tosse e características (presença de secreção);",
        "(3) Presença de febre e/ou calafrios;",
        "(4) Dispneia."
      ],
      scoring: {
        adequate: "Realiza todas ações.",
        partial: "Realiza duas ou três ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 3,
      title: "3. Investiga sobre os antecedentes pessoais.",
      subItems: [
        "(1) Doenças crônicas;",
        "(2) Medicação de uso contínuo;",
        "(3) Alergia medicamentosa;",
        "(4) Internações prévias;",
        "(5) Antecedentes familiares;",
        "(6) Hábitos tóxicos;",
        "(7) Hábitos alimentares;",
        "(8) Prática de atividade física;",
        "(9) Sono."
      ],
      scoring: {
        adequate: "Investiga oito ou nove itens.",
        partial: "Investiga de cinco a sete itens.",
        inadequate: "Investiga quatro itens ou menos."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 4,
      title: "4. Solicita exame físico:",
      subItems: [
        "(1) Solicita permissão para realizar o exame físico, lava as mãos e se paramenta;",
        "(2) Interpreta o exame físico."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "—",
        inadequate: "Realiza uma ação ou nenhuma ação."
      },
      scores: { min: 0, partial: 0, max: 0.25 }
    },
    {
      id: 5,
      title: "5. Preparação para o exame físico:",
      subItems: [
        "(1) Aquece as mãos antes de tocar no paciente;",
        "(2) Solicita de maneira educada que o paciente retire a blusa."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.25, max: 0.5 }
    },
    {
      id: 6,
      title: "6. Verbaliza a técnica adequada da inspeção estática respiratória.",
      subItems: [
        "(1) Observa forma do tórax;",
        "(2) Condição da pele (cicatrizes, lesões, simetria, implantação de pelos, abaulamentos, circulação colateral)."
      ],
      scoring: {
        adequate: "Realiza as duas ações.",
        partial: "Realiza uma ação.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 7,
      title: "7. Verbaliza a técnica adequada da inspeção dinâmica respiratória.",
      subItems: [
        "(1) Avalia a frequência respiratória;",
        "(2) Avalia amplitude do tórax;",
        "(3) Avalia o ritmo respiratório;",
        "(4) Observa se há uso de musculatura acessória."
      ],
      scoring: {
        adequate: "Realiza três ou mais ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 8,
      title: "8. Verbaliza a técnica adequada da palpação respiratória.",
      subItems: [
        "(1) Realiza a palpação direta com as pontas dos dedos ou palma das mãos, avaliando simetria, amplitude e expansibilidade.",
        "(2) Se posiciona atrás do paciente, realiza a palpação dos ápices pulmonares, solicitando que o paciente respire fundo, observando a movimentação simétrica das mãos.",
        "(3) Coloca as mãos espalmadas no rebordo costal para avaliar as bases pulmonares, solicitando que o paciente respire profundamente, avaliando expansão e simetria.",
        "(4) Faz o mesmo procedimento se posicionando a frente do paciente.",
        "(5) Avalia o frêmito toracovocal na parede anterior, posterior e lateral de ambos hemitórax, solicitando que o paciente verbalize trinta e três."
      ],
      scoring: {
        adequate: "Realiza de três a cinco ações.",
        partial: "Realiza duas ações.",
        inadequate: "Realiza uma ou nenhuma ação."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 9,
      title: "9. Verbaliza a técnica adequada da percussão respiratória.",
      subItems: [
        "(1) Realiza a percussão na parede anterior;",
        "(2) Realiza a percussão na parede posterior;",
        "(3) Realiza a percussão na parede lateral de ambos hemitórax."
      ],
      scoring: {
        adequate: "Realiza as três ações.",
        partial: "Realiza uma ou duas ações.",
        inadequate: "Não realiza ação alguma."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "O examinador percute o tórax do paciente com o dedo médio ou indicador da mão dominante; O dedo percutor bate no dedo plexímetro, que é o dedo médio ou indicador da outra mão; O examinador compara os sons produzidos em cada hemitórax. Tipos de sons pulmonares: Som claro pulmonar, que é o som normal do pulmão; Som timpânico, que é característico de estruturas com ar; Som submaciço, que ocorre quando há líquido entre o pulmão e a parede torácica; Som maciço, que ocorre quando há diminuição da quantidade de ar no pulmão."
    },
    {
      id: 10,
      title: "10. Verbaliza a técnica adequada da ausculta respiratória.",
      subItems: [
        "(1) Aquece o estetoscópio;",
        "(2) Realiza ausculta da região cervical;",
        "(3) Realiza ausculta em região anterior;",
        "(4) Realiza ausculta em região posterior e lateral de ambos hemitórax;",
        "(5) Avalia a transmissão da voz pela parede torácica, na parede anterior, posterior e lateral de ambos hemitórax, solicitando que o paciente verbalize trinta e três."
      ],
      scoring: {
        adequate: "Realiza as cinco ações.",
        partial: "Realiza três ou quatro ações.",
        inadequate: "Realiza duas ou menos ações."
      },
      scores: { min: 0, partial: 0.5, max: 1 }
    },
    {
      id: 11,
      title: "11. Solicita e interpreta a espirometria.",
      subItems: [],
      scoring: {
        adequate: "Solicita.",
        partial: "—",
        inadequate: "Não solicita."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 12,
      title: "12. Formula o diagnóstico de doença pulmonar obstrutiva crônica (DPOC).",
      subItems: [],
      scoring: {
        adequate: "Formula.",
        partial: "—",
        inadequate: "Não formula."
      },
      scores: { min: 0, partial: 0, max: 1 }
    },
    {
      id: 13,
      title: "13. Propõe conduta terapêutica e realiza as devidas orientações.",
      subItems: [
        "(1) Indica tratamento medicamentoso com beta 2 agonista de longa duração (LABA) e antimuscarínico de longa duração (LAMA) (validar esse item se citar as duas drogas);",
        "(2) Reabilitação pulmonar;",
        "(3) Atualização do cartão de vacina (Influenza e Pneumocócica);",
        "(4) Apoio para cessação do tabagismo."
      ],
      scoring: {
        adequate: "Realiza três ou mais tarefas.",
        partial: "Realiza duas tarefas.",
        inadequate: "Realiza uma ou nenhuma tarefa."
      },
      scores: { min: 0, partial: 0.5, max: 1 },
      dica_teorica: "Tratamento Inicial da DPOC: O Essencial O tratamento inicial da DPOC foca em melhorar a vida do paciente e frear a doença. As medidas mais importantes são: Parar de Fumar: Ação número um para retardar a doença. Ofereça todo o suporte necessário. Vacinação: Contra gripe (anual) e pneumonia (pneumocócica), para evitar infecções que pioram a DPOC. Medicamentos (Inaladores): Broncodilatadores de longa ação (LABA e/ou LAMA): São a base do tratamento diário."
    }
  ],
  references: []
};
