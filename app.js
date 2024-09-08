function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // se campoPesquisa for uma string vazia
    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome do autor ou do livro</p>";
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";

    // Itera sobre cada dado da lista de dados
    for (let dado of dados) {
        let titulo = dado.titulo.toLowerCase();
        let descricao = dado.descricao.toLowerCase();
        let tags = dado.tags.toLowerCase();

        // Verifica se o campo de pesquisa está presente no título, descrição ou tags
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            // Cria a estrutura de resultado para autor e descrição
            let livrosHTML = "";

            // Itera sobre cada livro do autor
            dado.livros.forEach((livro, index) => {
                livrosHTML += `
                    <div class="livro-resultado">
                        <h3 onclick="toggleResenha(${index}, '${dado.titulo}')">${livro.livro}</h3>
                        <p id="resenha-${dado.titulo}-${index}" class="resenha" style="display:none;">
                            ${livro.resenha[0]}
                        </p>
                    </div>
                `;
            });

            // Adiciona os livros ao resultado final
            resultados += `
            <div class="item-resultado">
                <h2>${dado.titulo}</h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
                <div class="livros">
                    ${livrosHTML}
                </div>
            </div>
            `;
        }
    }

    // Se não houver resultados, exibe a mensagem correspondente
    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>";
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}

// Função que alterna a visibilidade da resenha
function toggleResenha(index, titulo) {
    let resenhaElement = document.getElementById(`resenha-${titulo}-${index}`);
    if (resenhaElement.style.display === "none") {
        resenhaElement.style.display = "block";
    } else {
        resenhaElement.style.display = "none";
    }
}
