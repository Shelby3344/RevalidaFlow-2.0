# -*- coding: utf-8 -*-
import json
import re

input_path = 'public/questoes-json/questoes_revalida.json'

with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def clean_enunciado(enunciado, alternativas):
    cleaned = enunciado
    
    # Metodo: se a primeira alternativa (sem A)) aparece no enunciado, cortar ali
    if alternativas and len(alternativas) > 0:
        first_alt_text = re.sub(r'^[A-E]\)\s*', '', alternativas[0]).strip()
        if len(first_alt_text) > 10:
            pos = cleaned.find(first_alt_text[:30])
            if pos > 100:
                search_area = cleaned[max(0, pos-20):pos]
                match = re.search(r'\n[A][\n\)]', search_area)
                if match:
                    cut_pos = max(0, pos-20) + match.start()
                    cleaned = cleaned[:cut_pos].strip()
    
    return cleaned

count = 0
for q in data:
    original = q['enunciado']
    q['enunciado'] = clean_enunciado(q['enunciado'], q.get('alternativas', []))
    if original != q['enunciado']:
        count += 1

with open(input_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Modificados: {count} de {len(data)}')
