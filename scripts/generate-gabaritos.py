# -*- coding: utf-8 -*-
"""
Script para gerar gabaritos e explicações usando OpenAI GPT-4
Processa questões em lotes para otimizar custos e tempo
"""

import json
import os
import time
from openai import OpenAI

# Configuração
INPUT_FILE = 'public/questoes-json/questoes_revalida.json'
OUTPUT_FILE = 'public/questoes-json/questoes_revalida.json'
PROGRESS_FILE = 'scripts/gabarito_progress.json'
BATCH_SIZE = 10  # Questões por requisição
DELAY_BETWEEN_BATCHES = 1  # segundos

# API Key from environment or .env file
import dotenv
dotenv.load_dotenv()

API_KEY = os.getenv('VITE_OPENAI_API_KEY') or os.getenv('OPENAI_API_KEY')
if not API_KEY:
    print("Erro: OPENAI_API_KEY não encontrada no .env")
    exit(1)

client = OpenAI(api_key=API_KEY)

def load_progress():
    """Carrega progresso anterior se existir"""
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'processed_ids': [], 'results': {}}

def save_progress(progress):
    """Salva progresso atual"""
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)

def generate_gabarito_batch(questoes):
    """Gera gabaritos para um lote de questões"""
    
    prompt = """Você é um especialista em medicina e professor de cursos preparatórios para o REVALIDA.
Analise as questões abaixo e para cada uma forneça:
1. A letra da alternativa correta (A, B, C, D ou E)
2. Uma explicação concisa (2-3 frases) do porquê essa é a resposta correta

Responda APENAS em formato JSON válido, assim:
{
  "respostas": [
    {"id": 1, "gabarito": "A", "explicacao": "Explicação aqui..."},
    {"id": 2, "gabarito": "B", "explicacao": "Explicação aqui..."}
  ]
}

QUESTÕES:
"""
    
    for q in questoes:
        prompt += f"""
---
ID: {q['id']}
Especialidade: {q['especialidade']}
Enunciado: {q['enunciado']}
Alternativas:
"""
        for alt in q['alternativas']:
            prompt += f"  {alt}\n"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Você é um médico especialista que responde questões do REVALIDA. Sempre responda em JSON válido."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=4000
        )
        
        content = response.choices[0].message.content
        # Limpar possíveis marcadores de código
        content = content.replace('```json', '').replace('```', '').strip()
        
        result = json.loads(content)
        return result.get('respostas', [])
        
    except Exception as e:
        print(f"Erro na API: {e}")
        return None

def main():
    print("Carregando questões...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        questoes = json.load(f)
    
    print(f"Total de questões: {len(questoes)}")
    
    # Carregar progresso
    progress = load_progress()
    processed_ids = set(progress['processed_ids'])
    results = progress['results']
    
    # Filtrar questões não processadas
    pending = [q for q in questoes if q['id'] not in processed_ids]
    print(f"Questões pendentes: {len(pending)}")
    
    if not pending:
        print("Todas as questões já foram processadas!")
    else:
        # Processar em lotes
        total_batches = (len(pending) + BATCH_SIZE - 1) // BATCH_SIZE
        
        for i in range(0, len(pending), BATCH_SIZE):
            batch = pending[i:i+BATCH_SIZE]
            batch_num = i // BATCH_SIZE + 1
            
            print(f"\nProcessando lote {batch_num}/{total_batches} (IDs: {batch[0]['id']}-{batch[-1]['id']})...")
            
            respostas = generate_gabarito_batch(batch)
            
            if respostas:
                for resp in respostas:
                    qid = str(resp['id'])
                    results[qid] = {
                        'gabarito': resp['gabarito'],
                        'explicacao': resp['explicacao']
                    }
                    processed_ids.add(resp['id'])
                
                # Salvar progresso
                progress['processed_ids'] = list(processed_ids)
                progress['results'] = results
                save_progress(progress)
                
                print(f"  ✓ {len(respostas)} questões processadas")
            else:
                print(f"  ✗ Erro no lote, tentando novamente...")
                time.sleep(5)
                continue
            
            # Delay entre lotes
            if i + BATCH_SIZE < len(pending):
                time.sleep(DELAY_BETWEEN_BATCHES)
    
    # Aplicar resultados às questões
    print("\nAplicando gabaritos ao arquivo...")
    for q in questoes:
        qid = str(q['id'])
        if qid in results:
            q['gabarito'] = results[qid]['gabarito']
            q['explicacao'] = results[qid]['explicacao']
    
    # Salvar arquivo final
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(questoes, f, ensure_ascii=False, indent=2)
    
    # Estatísticas
    with_gabarito = sum(1 for q in questoes if q.get('gabarito'))
    print(f"\n✓ Concluído!")
    print(f"  Questões com gabarito: {with_gabarito}/{len(questoes)}")

if __name__ == '__main__':
    main()
