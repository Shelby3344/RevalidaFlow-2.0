/**
 * Script para baixar TODOS os checklists do PEPList
 * ==================================================
 * 
 * INSTRUÇÕES:
 * 1. Abra o navegador com o site app.peplist.com.br/checklists logado
 * 2. Abra o DevTools (F12) → aba Network → filtre por Fetch/XHR
 * 3. Clique em qualquer requisição (ex: stations?select=...)
 * 4. Na aba "Cabeçalhos de solicitação", clique em "Bruto" 
 *    e copie as linhas Apikey e Authorization
 * 5. Cole os valores abaixo nas variáveis APIKEY e AUTH_TOKEN
 * 6. Execute no terminal: node baixar_checklists.js
 */

// ============================================================
// COLE AQUI SEUS TOKENS (pegue do DevTools → Headers)
// ============================================================

// Cole o valor COMPLETO do campo "Apikey" aqui:
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzUzMzI2MDAwLCJleHAiOjE5MTEwOTI0MDB9.7eC5zdKqLN_KAg5GX7GdhNPqMW4mIGWo2C032EmUsxg";

// Cole o valor do campo "Authorization" aqui (SEM o "Bearer " na frente):
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5TjJEaG1qMnNsTWhWc25oWUpIMXhHYjV0bE0yIiwidXNlcl9pZCI6IjlOMkRobWoyc2xNaFZzbmhZSkgxeEdiNXRsTTIiLCJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzcxNjkxMTcxLCJleHAiOjE3NzE2OTgzNzF9.psN0HOCNq0mvEtWWtGTHgbMfbChFMMJT0FeAyYRwF8U";

// ============================================================
// CONFIGURAÇÃO (não precisa mudar)
// ============================================================
const BASE_URL = "https://apisb.host.peplist.com.br/rest/v1";
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = __dirname;

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Apikey: APIKEY,
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Accept-Profile": "public",
  Prefer: "return=representation",
  "X-Client-Info": "supabase-dart/2.7.0",
};

// ============================================================
// FUNÇÕES
// ============================================================

async function fetchJSON(url, method = "GET", body = null) {
  const options = { method, headers: HEADERS };
  if (body) options.body = JSON.stringify(body);
  const resp = await fetch(url, options);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}: ${resp.statusText} - ${url}`);
  }
  return resp.json();
}

async function getStationList() {
  console.log("📋 Buscando lista de estações...");
  // Tenta buscar direto da tabela stations (sem limite)
  const stations = await fetchJSON(`${BASE_URL}/stations?select=id,area,name,edition&order=id.asc`, "GET");
  console.log(`   ✅ Encontradas ${stations.length} estações!`);
  return stations.map(s => ({
    station_id: s.id,
    station_area: s.area,
    station_name: s.name,
    station_edition: s.edition,
  }));
}

async function getStationDetail(stationId) {
  return fetchJSON(`${BASE_URL}/stations?select=*&id=eq.${stationId}&limit=1`);
}

async function getStationPrinteds(stationId) {
  return fetchJSON(`${BASE_URL}/printeds?select=*&station_id=eq.${stationId}&order=cod.asc.nullslast`);
}

async function getStationQuestions(stationId) {
  return fetchJSON(`${BASE_URL}/questions?select=*&station_id=eq.${stationId}&order=cod_int.asc.nullslast`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("=".repeat(60));
  console.log("  PEPList - Download de Checklists Completos");
  console.log("=".repeat(60));

  // Verificar tokens
  if (APIKEY.includes("COLE_AQUI") || AUTH_TOKEN.includes("COLE_AQUI")) {
    console.log("\n❌ ERRO: Você precisa colar os tokens no script!");
    console.log('   Abra o arquivo baixar_checklists.js e preencha:');
    console.log("   - APIKEY (campo Apikey dos headers)");
    console.log("   - AUTH_TOKEN (campo Authorization, SEM 'Bearer ')");
    console.log("   (Veja as instruções no topo do arquivo)");
    return;
  }

  // 1. Buscar lista
  let stations;
  try {
    stations = await getStationList();
  } catch (e) {
    console.log(`\n❌ Erro ao buscar estações: ${e.message}`);
    console.log("   Verifique se os tokens estão corretos e não expiraram.");
    console.log("   O AUTH_TOKEN expira rápido - copie um novo do DevTools.");
    return;
  }

  // 2. Buscar detalhes de cada estação
  const allChecklists = [];
  const errors = [];
  const total = stations.length;

  for (let i = 0; i < total; i++) {
    const station = stations[i];
    const sid = station.station_id;
    const name = station.station_name || "Sem nome";
    const area = station.station_area || "";

    process.stdout.write(`\r   📥 [${i + 1}/${total}] ${area} - ${name}...`.padEnd(80));

    try {
      const [detailArr, printeds, questions] = await Promise.all([
        getStationDetail(sid),
        getStationPrinteds(sid),
        getStationQuestions(sid),
      ]);

      allChecklists.push({
        info_basica: station,
        detalhes: detailArr[0] || {},
        conteudo_impresso: printeds,
        questoes_checklist: questions,
      });

      // Pausa para não sobrecarregar o servidor
      await sleep(150);
    } catch (e) {
      errors.push({ station_id: sid, nome: name, erro: e.message });
      process.stdout.write(" ⚠️ ERRO\n");
    }
  }

  console.log(); // Nova linha

  // 3. Salvar JSON completo
  const jsonPath = path.join(OUTPUT_DIR, "checklists_completos.json");
  fs.writeFileSync(jsonPath, JSON.stringify(allChecklists, null, 2), "utf-8");
  console.log(`\n✅ JSON completo salvo em: ${jsonPath}`);

  // 4. Salvar em formato texto legível
  const txtPath = path.join(OUTPUT_DIR, "checklists_completos.txt");
  let txt = "";

  for (const ck of allChecklists) {
    const info = ck.info_basica;
    const detail = ck.detalhes;
    const printeds = ck.conteudo_impresso;
    const questions = ck.questoes_checklist;

    txt += "=".repeat(80) + "\n";
    txt += `ESTAÇÃO ${info.station_id || ""} - ${info.station_name || ""}\n`;
    txt += `Área: ${info.station_area || ""}\n`;
    txt += `Edição: ${info.station_edition || ""}\n`;
    txt += "-".repeat(80) + "\n";

    // Detalhes
    if (detail) {
      for (const [key, val] of Object.entries(detail)) {
        if (val && !["id", "created_at", "updated_at"].includes(key)) {
          txt += `  ${key}: ${val}\n`;
        }
      }
    }

    txt += "\n--- CONTEÚDO IMPRESSO ---\n";
    for (const p of printeds) {
      const titulo = p.title || p.titulo || p.name || "";
      txt += `\n  [${p.cod || ""}] ${titulo}\n`;
      const content = p.content || p.conteudo || p.text || p.body || "";
      if (content) {
        txt += `  ${content}\n`;
      }
      for (const [key, val] of Object.entries(p)) {
        if (val && !["id", "station_id", "created_at", "updated_at", "cod", "title", "titulo", "name"].includes(key)) {
          txt += `    ${key}: ${typeof val === "object" ? JSON.stringify(val) : val}\n`;
        }
      }
    }

    txt += "\n--- CHECKLIST / QUESTÕES ---\n";
    for (const q of questions) {
      const cod = q.cod_int || q.cod || "";
      const titulo = q.title || q.titulo || q.text || q.name || "";
      txt += `  [${cod}] ${titulo}\n`;
      for (const [key, val] of Object.entries(q)) {
        if (
          val &&
          !["id", "station_id", "created_at", "updated_at", "cod_int", "cod", "title", "titulo", "text", "name"].includes(key)
        ) {
          txt += `       ${key}: ${typeof val === "object" ? JSON.stringify(val) : val}\n`;
        }
      }
    }
    txt += "\n\n";
  }

  fs.writeFileSync(txtPath, txt, "utf-8");
  console.log(`✅ Texto legível salvo em: ${txtPath}`);

  // 5. Resumo
  console.log(`\n${"=".repeat(60)}`);
  console.log("  RESUMO");
  console.log(`  ✅ Baixados: ${allChecklists.length} checklists`);
  if (errors.length > 0) {
    console.log(`  ⚠️  Erros: ${errors.length}`);
    for (const err of errors) {
      console.log(`     - ID ${err.station_id}: ${err.nome} → ${err.erro}`);
    }
  }
  console.log("=".repeat(60));
}

main().catch(console.error);
