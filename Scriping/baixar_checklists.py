"""
Script para baixar TODOS os checklists do PEPList
=================================================
INSTRUÇÕES:
1. Abra o navegador com o site app.peplist.com.br/checklists logado
2. Abra o DevTools (F12) → aba Network → filtre por Fetch/XHR
3. Clique em qualquer requisição (ex: stations?select=...)
4. Na aba "Cabeçalhos de solicitação", copie:
   - O valor do campo "Apikey"
   - O valor do campo "Authorization" (sem o "Bearer " na frente)
5. Cole os valores abaixo nas variáveis APIKEY e AUTH_TOKEN
6. Execute: python baixar_checklists.py
"""

import requests
import json
import time
import os

# ============================================================
# COLE AQUI SEUS TOKENS (pegue do DevTools → Headers)
# ============================================================

# Cole o valor do campo "Apikey" aqui:
APIKEY = "COLE_AQUI_SEU_APIKEY"

# Cole o valor do campo "Authorization" aqui (SEM o "Bearer " na frente):
AUTH_TOKEN = "COLE_AQUI_SEU_AUTH_TOKEN"

# ============================================================
# CONFIGURAÇÃO (não precisa mudar)
# ============================================================
BASE_URL = "https://apisb.host.peplist.com.br/rest/v1"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Apikey": APIKEY,
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Accept-Profile": "public",
    "Prefer": "return=representation",
    "X-Client-Info": "supabase-dart/2.7.0",
}


def get_station_list():
    """Busca a lista de todas as estações/checklists disponíveis."""
    print("📋 Buscando lista de estações...")
    url = f"{BASE_URL}/rpc/get_station_list_for_medic2"
    resp = requests.post(url, headers=HEADERS, json={})
    resp.raise_for_status()
    stations = resp.json()
    print(f"   ✅ Encontradas {len(stations)} estações!")
    return stations


def get_station_detail(station_id):
    """Busca os dados detalhados de uma estação."""
    url = f"{BASE_URL}/stations?select=%2A&id=eq.{station_id}&limit=1"
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    data = resp.json()
    return data[0] if data else {}


def get_station_printeds(station_id):
    """Busca o conteúdo impresso (caso clínico, script do ator, etc.)."""
    url = f"{BASE_URL}/printeds?select=%2A&station_id=eq.{station_id}&order=cod.asc.nullslast"
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    return resp.json()


def get_station_questions(station_id):
    """Busca os itens do checklist/questões."""
    url = f"{BASE_URL}/questions?select=%2A&station_id=eq.{station_id}&order=cod_int.asc.nullslast"
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    return resp.json()


def main():
    print("=" * 60)
    print("  PEPList - Download de Checklists Completos")
    print("=" * 60)

    # Verificar se os tokens foram preenchidos
    if "COLE_AQUI" in APIKEY or "COLE_AQUI" in AUTH_TOKEN:
        print("\n❌ ERRO: Você precisa colar os tokens no script!")
        print("   Abra o arquivo baixar_checklists.py e preencha:")
        print("   - APIKEY")
        print("   - AUTH_TOKEN")
        print("   (Veja as instruções no topo do arquivo)")
        return

    # 1. Buscar lista de estações
    try:
        stations = get_station_list()
    except requests.exceptions.HTTPError as e:
        print(f"\n❌ Erro ao buscar estações: {e}")
        print("   Verifique se os tokens estão corretos e não expiraram.")
        print("   O AUTH_TOKEN expira rapidamente - copie um novo do DevTools.")
        return

    # 2. Buscar detalhes de cada estação
    all_checklists = []
    total = len(stations)
    errors = []

    for i, station in enumerate(stations, 1):
        sid = station["station_id"]
        name = station.get("station_name", "Sem nome")
        area = station.get("station_area", "")
        print(f"\r   📥 [{i}/{total}] {area} - {name}...", end="", flush=True)

        try:
            detail = get_station_detail(sid)
            printeds = get_station_printeds(sid)
            questions = get_station_questions(sid)

            checklist_completo = {
                "info_basica": station,
                "detalhes": detail,
                "conteudo_impresso": printeds,
                "questoes_checklist": questions,
            }
            all_checklists.append(checklist_completo)

            # Pausa pequena para não sobrecarregar o servidor
            time.sleep(0.15)

        except Exception as e:
            errors.append({"station_id": sid, "nome": name, "erro": str(e)})
            print(f" ⚠️ ERRO")

    print()  # Nova linha

    # 3. Salvar JSON completo
    json_path = os.path.join(OUTPUT_DIR, "checklists_completos.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_checklists, f, ensure_ascii=False, indent=2)
    print(f"\n✅ JSON completo salvo em: {json_path}")

    # 4. Salvar também em formato legível (texto)
    txt_path = os.path.join(OUTPUT_DIR, "checklists_completos.txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        for ck in all_checklists:
            info = ck["info_basica"]
            detail = ck["detalhes"]
            printeds = ck["conteudo_impresso"]
            questions = ck["questoes_checklist"]

            f.write("=" * 80 + "\n")
            f.write(f"ESTAÇÃO {info.get('station_id', '')} - {info.get('station_name', '')}\n")
            f.write(f"Área: {info.get('station_area', '')}\n")
            f.write(f"Edição: {info.get('station_edition', '')}\n")
            f.write("-" * 80 + "\n")

            # Detalhes da estação
            if detail:
                for key, val in detail.items():
                    if val and key not in ("id", "created_at", "updated_at"):
                        f.write(f"  {key}: {val}\n")

            f.write("\n--- CONTEÚDO IMPRESSO ---\n")
            for p in printeds:
                f.write(f"\n  [{p.get('cod', '')}] {p.get('title', p.get('titulo', ''))}\n")
                content = p.get("content", p.get("conteudo", p.get("text", "")))
                if content:
                    f.write(f"  {content}\n")
                # Escrever todos os campos relevantes
                for key, val in p.items():
                    if val and key not in ("id", "station_id", "created_at", "updated_at", "cod"):
                        f.write(f"    {key}: {val}\n")

            f.write("\n--- CHECKLIST / QUESTÕES ---\n")
            for q in questions:
                cod = q.get("cod_int", q.get("cod", ""))
                titulo = q.get("title", q.get("titulo", q.get("text", "")))
                f.write(f"  [{cod}] {titulo}\n")
                for key, val in q.items():
                    if val and key not in ("id", "station_id", "created_at", "updated_at",
                                           "cod_int", "cod", "title", "titulo", "text"):
                        f.write(f"       {key}: {val}\n")

            f.write("\n\n")

    print(f"✅ Texto legível salvo em: {txt_path}")

    # 5. Resumo
    print(f"\n{'=' * 60}")
    print(f"  RESUMO")
    print(f"  ✅ Baixados: {len(all_checklists)} checklists")
    if errors:
        print(f"  ⚠️  Erros: {len(errors)}")
        for err in errors:
            print(f"     - ID {err['station_id']}: {err['nome']} → {err['erro']}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
