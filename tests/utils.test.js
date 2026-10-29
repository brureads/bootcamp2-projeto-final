import test from "node:test";
import assert from "node:assert/strict";
import { normalizar, escaparHTML, idFavorito } from "../utils.js";

test("normaliza marca com acentos e pontuacao", () => {
    assert.equal(normalizar("  Citroën!  "), "citroen");
});

test("normaliza valor nulo para texto vazio", () => {
    assert.equal(normalizar(null), "");
});

test("escapa HTML para evitar injetar marcacao", () => {
    assert.equal(escaparHTML(`<img src="x" onerror='x'>`),
        "&lt;img src=&quot;x&quot; onerror=&#039;x&#039;&gt;");
});

test("escapa caracteres de ampersand sem dupla substituicao", () => {
    assert.equal(escaparHTML("A & B"), "A &amp; B");
});

test("cria identificador deterministico de favorito", () => {
    assert.equal(idFavorito("Citroën", "C3 Aircross"), "citroen_c3%20aircross");
});

test("modelos diferentes geram identificadores diferentes", () => {
    assert.notEqual(idFavorito("Fiat", "Argo"), idFavorito("Fiat", "Mobi"));
});

import { filtrarModelos } from "../utils.js";

test("filtra os modelos por trecho do nome", () => {
    const lista = [{ nome: "Corolla" }, { nome: "Yaris" }];
    assert.deepEqual(filtrarModelos(lista, "roll"), [{ nome: "Corolla" }]);
});

test("pesquisa de modelos ignora acentos", () => {
    assert.equal(filtrarModelos([{ nome: "Série 3" }], "serie").length, 1);
});
