#!/usr/bin/env python3
"""
Script para classificar questões em Tema e Subtema usando IA.
Executa em lotes para evitar rate limits e salva progresso.
"""

import json
import os
import time
from openai import OpenAI
from pathlib import Path

# Configuração
INPUT_FILE = "public/questoes-json/questoes_revalida.json"
OUTPUT_FILE = "public/questoes-json/questoes_revalida_classified.json"
PROGRESS_FILE = "scripts/classification_progress.json"
BATCH_SIZE = 50
DELAY_BETWEEN_BATCHES = 2  # segundos

# Taxonomia médica para classificação
TAXONOMY = {
    "Clínica Médica": {
        "Cardiologia": [
            "Hipertensão Arterial Sistêmica",
            "Insuficiência Cardíaca",
            "Arritmias Cardíacas",
            "Doença Arterial Coronariana",
            "Valvopatias",
            "Endocardite Infecciosa",
            "Pericardite",
            "Miocardiopatias"
        ],
        "Pneumologia": [
            "Asma",
            "DPOC",
            "Pneumonias",
            "Tuberculose",
            "Derrame Pleural",
            "Tromboembolismo Pulmonar",
            "Neoplasias Pulmonares",
            "Doenças Intersticiais"
        ],
        "Gastroenterologia": [
            "DRGE",
            "Úlcera Péptica e H. pylori",
            "Hepatites Virais",
            "Cirrose e Complicações",
            "Doenças Inflamatórias Intestinais",
            "Pancreatite",
            "Hemorragia Digestiva",
            "Doença Diverticular"
        ],
        "Nefrologia": [
            "Insuficiência Renal Aguda",
            "Doença Renal Crônica",
            "Glomerulopatias",
            "Infecção do Trato Urinário",
            "Distúrbios Hidroeletrolíticos",
            "Distúrbios Ácido-Base",
            "Litíase Renal"
        ],
        "Endocrinologia": [
            "Diabetes Mellitus",
            "Doenças da Tireoide",
            "Doenças da Adrenal",
            "Obesidade",
            "Dislipidemias",
            "Osteoporose"
        ],
        "Reumatologia": [
            "Artrite Reumatoide",
            "Lúpus Eritematoso Sistêmico",
            "Espondiloartrites",
            "Gota",
            "Fibromialgia",
            "Vasculites"
        ],
        "Hematologia": [
            "Anemias",
            "Leucemias",
            "Linfomas",
            "Distúrbios da Coagulação",
            "Trombocitopenia"
        ],
        "Infectologia": [
            "HIV/AIDS",
            "Dengue e Arboviroses",
            "Meningites",
            "Sepse",
            "Infecções de Pele e Partes Moles",
            "Doenças Sexualmente Transmissíveis"
        ],
        "Neurologia": [
            "AVC",
            "Epilepsia",
            "Cefaléias",
            "Demências",
            "Doença de Parkinson",
            "Neuropatias Periféricas"
        ],
        "Dermatologia": [
            "Dermatites",
            "Psoríase",
            "Infecções Cutâneas",
            "Neoplasias de Pele"
        ]
    },
    "Cirurgia": {
        "Cirurgia Geral": [
            "Hérnias da Parede Abdominal",
            "Apendicite Aguda",
            "Colecistite e Colelitíase",
            "Obstrução Intestinal",
            "Abdome Agudo"
        ],
        "Cirurgia do Trauma": [
            "Trauma Abdominal",
            "Trauma Torácico",
            "Trauma Cranioencefálico",
            "Politrauma e ATLS",
            "Queimaduras"
        ],
        "Cirurgia Vascular": [
            "Doença Arterial Periférica",
            "Aneurismas",
            "Trombose Venosa Profunda",
            "Varizes"
        ],
        "Cirurgia Oncológica": [
            "Câncer de Mama",
            "Câncer Colorretal",
            "Câncer Gástrico",
            "Câncer de Pâncreas"
        ],
        "Urologia": [
            "Hiperplasia Prostática",
            "Câncer de Próstata",
            "Litíase Urinária",
            "Infecções Urinárias Complicadas"
        ],
        "Ortopedia": [
            "Fraturas",
            "Luxações",
            "Lesões de Partes Moles",
            "Doenças Degenerativas"
        ],
        "Cicatrização e Feridas": [
            "Cicatrização Normal e Patológica",
            "Queloides e Cicatrizes Hipertróficas",
            "Feridas Crônicas"
        ]
    },
    "Ginecologia": {
        "Ginecologia Geral": [
            "Ciclo Menstrual e Distúrbios",
            "Síndrome Pré-Menstrual e TDPM",
            "Amenorreia",
            "Sangramento Uterino Anormal"
        ],
        "Oncologia Ginecológica": [
            "Câncer de Colo Uterino",
            "Câncer de Endométrio",
            "Câncer de Ovário",
            "Câncer de Vulva"
        ],
        "Infertilidade": [
            "Infertilidade Conjugal",
            "Propedêutica do Casal Infértil",
            "Avaliação da Reserva Ovariana",
            "Fator Tuboperitoneal e Uterino",
            "Endometriose e Infertilidade"
        ],
        "Uroginecologia": [
            "Incontinência Urinária",
            "Prolapsos Genitais",
            "Fístulas Urogenitais",
            "Bexiga Hiperativa"
        ],
        "Doenças Benignas": [
            "Miomas Uterinos",
            "Endometriose",
            "Cistos Ovarianos",
            "Doença Inflamatória Pélvica"
        ],
        "Climatério e Menopausa": [
            "Síndrome Climatérica",
            "Terapia Hormonal",
            "Osteoporose Pós-Menopausa"
        ],
        "Ética e Aspectos Legais": [
            "Aborto Legal e Aspectos Éticos",
            "Violência Sexual",
            "Profilaxia Pós-Exposição Sexual"
        ]
    },
    "Obstetrícia": {
        "Pré-Natal": [
            "Assistência Pré-Natal",
            "Exames e Rastreamento",
            "Imunização na Gestação"
        ],
        "Patologias Obstétricas": [
            "Síndromes Hipertensivas",
            "Diabetes Gestacional",
            "Placenta Prévia",
            "Descolamento de Placenta",
            "Trabalho de Parto Prematuro"
        ],
        "Parto e Puerpério": [
            "Trabalho de Parto Normal",
            "Cesariana",
            "Hemorragia Pós-Parto",
            "Infecções Puerperais"
        ],
        "Medicina Fetal": [
            "Crescimento Fetal",
            "Malformações Fetais",
            "Sofrimento Fetal"
        ]
    },
    "Pediatria": {
        "Neonatologia": [
            "Reanimação Neonatal",
            "Icterícia Neonatal",
            "Sepse Neonatal",
            "Prematuridade"
        ],
        "Puericultura": [
            "Crescimento e Desenvolvimento",
            "Aleitamento Materno",
            "Alimentação Complementar",
            "Imunização"
        ],
        "Doenças Respiratórias": [
            "Bronquiolite",
            "Pneumonias na Infância",
            "Asma Infantil",
            "Infecções de Vias Aéreas Superiores"
        ],
        "Doenças Infecciosas": [
            "Doenças Exantemáticas",
            "Meningites na Infância",
            "Diarreia Aguda"
        ],
        "Oncologia Pediátrica": [
            "Leucemias na Infância",
            "Tumores Sólidos",
            "Neuroblastoma",
            "Tumor de Wilms"
        ],
        "Urgências Pediátricas": [
            "Desidratação",
            "Convulsões Febris",
            "Intoxicações"
        ]
    },
    "Medicina Preventiva": {
        "Epidemiologia": [
            "Indicadores de Saúde",
            "Estudos Epidemiológicos",
            "Vigilância Epidemiológica"
        ],
        "Saúde Pública": [
            "Sistema Único de Saúde",
            "Atenção Primária",
            "Programas de Saúde",
            "Políticas de Saúde"
        ],
        "Bioestatística": [
            "Medidas de Frequência",
            "Testes Diagnósticos",
            "Análise de Dados"
        ],
        "Saúde do Trabalhador": [
            "Doenças Ocupacionais",
            "Acidentes de Trabalho",
            "Legislação Trabalhista"
        ]
    }
}

def get_taxonomy_prompt():
    """Gera o prompt com a taxonomia para a IA."""
    lines = []
    for especialidade, temas in TAXONOMY.items():
        lines.append(f"\n{especialidade}:")
        for tema, subtemas in temas.items():
            lines.append(f"  {tema}:")
            for subtema in subtemas:
                lines.append(f"    - {subtema}")
    return "\n".join(lines)

def classify_question(client, questao):
    """Classifica uma questão usando a OpenAI API."""
    
    prompt = f"""Você é um especialista em classificação de questões médicas para o Revalida.

Classifique a seguinte questão médica em TEMA e SUBTEMA, baseado na taxonomia abaixo.

TAXONOMIA DISPONÍVEL:
{get_taxonomy_prompt()}

QUESTÃO:
Especialidade: {questao.get('especialidade', 'Não informada')}
Enunciado: {questao.get('enunciado', '')[:1500]}

REGRAS:
1. O TEMA deve ser uma das categorias principais dentro da especialidade
2. O SUBTEMA deve ser um dos itens listados dentro do tema
3. Se não encontrar correspondência exata, escolha o mais próximo
4. Responda APENAS no formato JSON abaixo, sem explicações

FORMATO DE RESPOSTA (JSON):
{{"tema": "Nome do Tema", "subtema": "Nome do Subtema"}}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Você classifica questões médicas. Responda apenas em JSON válido."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=100
        )
        
        result = response.choices[0].message.content.strip()
        # Limpar possíveis marcadores de código
        if result.startswith("```"):
            result = result.split("\n", 1)[1]
        if result.endswith("```"):
            result = result.rsplit("```", 1)[0]
        result = result.strip()
        
        classification = json.loads(result)
        return classification.get("tema", ""), classification.get("subtema", "")
    except Exception as e:
        print(f"Erro ao classificar questão {questao.get('id')}: {e}")
        return "", ""

def load_progress():
    """Carrega o progresso salvo."""
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"last_processed": 0, "classifications": {}}

def save_progress(progress):
    """Salva o progresso."""
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)

def main():
    # Verificar API key
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERRO: OPENAI_API_KEY não configurada")
        print("Execute: set OPENAI_API_KEY=sua_chave")
        return
    
    client = OpenAI(api_key=api_key)
    
    # Carregar questões
    print(f"Carregando questões de {INPUT_FILE}...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        questoes = json.load(f)
    
    print(f"Total de questões: {len(questoes)}")
    
    # Carregar progresso
    progress = load_progress()
    start_index = progress["last_processed"]
    classifications = progress["classifications"]
    
    print(f"Continuando do índice {start_index}...")
    
    # Processar em lotes
    total = len(questoes)
    for i in range(start_index, total, BATCH_SIZE):
        batch_end = min(i + BATCH_SIZE, total)
        print(f"\nProcessando lote {i+1}-{batch_end} de {total}...")
        
        for j in range(i, batch_end):
            questao = questoes[j]
            qid = str(questao["id"])
            
            # Pular se já classificado
            if qid in classifications:
                continue
            
            tema, subtema = classify_question(client, questao)
            classifications[qid] = {"tema": tema, "subtema": subtema}
            
            print(f"  [{j+1}/{total}] ID {qid}: {tema} > {subtema}")
        
        # Salvar progresso após cada lote
        progress["last_processed"] = batch_end
        progress["classifications"] = classifications
        save_progress(progress)
        
        # Delay entre lotes
        if batch_end < total:
            print(f"Aguardando {DELAY_BETWEEN_BATCHES}s...")
            time.sleep(DELAY_BETWEEN_BATCHES)
    
    # Aplicar classificações às questões
    print("\nAplicando classificações...")
    for questao in questoes:
        qid = str(questao["id"])
        if qid in classifications:
            questao["tema"] = classifications[qid]["tema"]
            questao["subtema"] = classifications[qid]["subtema"]
    
    # Salvar arquivo final
    print(f"Salvando em {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(questoes, f, ensure_ascii=False, indent=2)
    
    print("Classificação concluída!")
    
    # Estatísticas
    temas_count = {}
    for q in questoes:
        tema = q.get("tema", "Não classificado")
        temas_count[tema] = temas_count.get(tema, 0) + 1
    
    print("\nEstatísticas por tema:")
    for tema, count in sorted(temas_count.items(), key=lambda x: -x[1]):
        print(f"  {tema}: {count}")

if __name__ == "__main__":
    main()
