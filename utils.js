// Funcoes puras compartilhadas pela interface e pelos testes automatizados.
export function normalizar(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export function escaparHTML(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function idFavorito(marca, modelo) {
    return encodeURIComponent(`${normalizar(marca)}_${normalizar(modelo)}`);
}

// Filtra os modelos de uma marca por nome, ignorando maiusculas e acentos.
export function filtrarModelos(modelos, termo) {
    const busca = normalizar(termo);
    return modelos.filter(modelo => normalizar(modelo.nome).includes(busca));
}

export function ordenarModelos(modelos, criterio = "nome") {
    const copia = [...modelos];

    if (criterio === "mais-versoes") {
        return copia.sort((a, b) =>
            b.versoes.length - a.versoes.length ||
            a.nome.localeCompare(b.nome, "pt-BR")
        );
    }

    return copia.sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR")
    );
}
