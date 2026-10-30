
import { pesquisarFavoritos } from "../utils.js";
import test from "node:test";
import assert from "node:assert/strict";
import { normalizar, escaparHTML, idFavorito } from "../utils.js";
import { ordenarModelos } from "../utils.js";

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

test("ordena modelos alfabeticamente", () => {
    const dados = [
        { nome: "Z", versoes: [] },
        { nome: "A", versoes: [] }
    ];

    assert.deepEqual(
        ordenarModelos(dados).map(x => x.nome),
        ["A", "Z"]
    );
});

test("ordena por quantidade de versoes", () => {
    const dados = [
        { nome: "A", versoes: [1] },
        { nome: "B", versoes: [1, 2] }
    ];

    assert.deepEqual(
        ordenarModelos(dados, "mais-versoes")
            .map(x => x.nome),
        ["B", "A"]
    );
});

test("pesquisa favoritos por marca", () => {
    const itens = [
        { marca: "Fiat", modelo: "Argo" },
        { marca: "Honda", modelo: "Civic" }
    ];

    assert.deepEqual(
        pesquisarFavoritos(itens, "fiat"),
        [itens[0]]
    );
});

test("pesquisa favoritos por modelo ignorando acento", () => {
    const itens = [
        { marca: "BMW", modelo: "Série 3" }
    ];

    assert.equal(
        pesquisarFavoritos(itens, "serie").length,
        1
    );
});

test("DEMONSTRACAO - CI deve bloquear a PR", () => {
    assert.equal(1, 2);
});
