// --- Estado da Aplicação ---
let garagem = []; // Array principal de veículos
let veiculoAtualPlaca = null; // Guarda a placa do veículo sendo visto nos detalhes

// --- Referências de Elementos ---
const btnVoltarGaragem = document.getElementById('btn-voltar-garagem');
// Listeners serão adicionados dinamicamente ou na inicialização

// --- Objetos de Áudio (Adicionados) ---
// Certifique-se de ter os arquivos mp3 na mesma pasta ou fornecer o caminho correto
const somLigar = new Audio("som_ligar.mp3");
const somDesligar = new Audio("som_desligar.mp3");
const somBuzina = new Audio("som_buzina.mp3");
const somAcelerar = new Audio("som_acelerar.mp3"); // Opcional
const somTurbo = new Audio("som_turbo.mp3"); // Opcional
const somCarga = new Audio("som_carga.mp3"); // Opcional

// --- Funções de Lógica ---

/** Encontra veículo pela placa (sem mudança). */
function encontrarVeiculo(placa) {
    return garagem.find(v => v.placa === placa);
}

/** Adiciona veículo (Atualizado para CarroEsportivo e Caminhao com capacidade) */
function handleAddVeiculo(event) {
    event.preventDefault();
    const tipo = document.getElementById('veiculo-tipo').value;
    const placa = document.getElementById('veiculo-placa').value.trim().toUpperCase();
    const modelo = document.getElementById('veiculo-modelo').value.trim();
    const cor = document.getElementById('veiculo-cor').value.trim();

    if (!placa || !modelo || !cor) {
        exibirNotificacao("Placa, modelo e cor são obrigatórios.", "error"); return;
    }
    if (encontrarVeiculo(placa)) {
        exibirNotificacao(`Placa ${placa} já existe.`, "error"); return;
    }

    let novoVeiculo = null;
    try {
        switch (tipo) {
            case 'Carro':
                const numPortasCarro = document.getElementById('carro-portas').value;
                novoVeiculo = new Carro(placa, modelo, cor, numPortasCarro);
                break;
            case 'CarroEsportivo': // Novo
                 const numPortasEsportivo = document.getElementById('carroesportivo-portas').value;
                 novoVeiculo = new CarroEsportivo(placa, modelo, cor, numPortasEsportivo);
                 break;
            case 'Caminhao':
                 const numEixos = document.getElementById('caminhao-eixos').value;
                 const capacidade = document.getElementById('caminhao-capacidade').value; // Pega capacidade
                 novoVeiculo = new Caminhao(placa, modelo, cor, numEixos, capacidade);
                 break;
            default:
                exibirNotificacao("Tipo de veículo inválido.", "error"); return;
        }

        garagem.push(novoVeiculo);
        salvarGaragem(garagem);
        exibirVeiculos(garagem);
        exibirNotificacao(`${tipo} ${placa} adicionado com sucesso!`, "success");
        limparFormulario('form-add-veiculo');

    } catch (error) {
        console.error("Erro ao criar veículo:", error);
        exibirNotificacao(`Erro ao adicionar: ${error.message}`, "error");
    }
}

/** Manipula clique nos botões de detalhes (Atualizado para nova função de UI) */
function handleClickDetalhesGaragem(event) {
    if (event.target.classList.contains('btn-detalhes')) {
        const placa = event.target.dataset.placa;
        const veiculo = encontrarVeiculo(placa);
        if (veiculo) {
            veiculoAtualPlaca = placa; // Guarda a placa do veículo atual
            exibirDetalhesCompletos(veiculo); // Chama a função que mostra tudo
        } else {
            exibirNotificacao(`Veículo ${placa} não encontrado.`, "error");
            veiculoAtualPlaca = null;
        }
    }
}

/** Adiciona agendamento de manutenção (sem grandes mudanças) */
function handleAgendarManutencao(event) {
    event.preventDefault();
    const placa = document.getElementById('agendamento-veiculo-placa').value;
    const data = document.getElementById('agenda-data').value;
    const tipo = document.getElementById('agenda-tipo').value.trim();
    const custo = document.getElementById('agenda-custo').value;
    const descricao = document.getElementById('agenda-descricao').value.trim();

    if (!placa || !data || !tipo || custo === '') {
         exibirNotificacao("Preencha Data, Tipo e Custo.", "error"); return;
    }
     if (parseFloat(custo) < 0) {
          exibirNotificacao("Custo não pode ser negativo.", "error"); return;
     }

    const veiculo = encontrarVeiculo(placa);
    if (!veiculo) {
        exibirNotificacao(`Veículo ${placa} não encontrado.`, "error"); return;
    }

    try {
        const novaManutencao = new Manutencao(data, tipo, parseFloat(custo), descricao);
        if (!novaManutencao.validar()) {
             exibirNotificacao("Dados da manutenção inválidos.", "error"); return;
        }
        if (veiculo.adicionarManutencao(novaManutencao)) {
            salvarGaragem(garagem);
            exibirDetalhesCompletos(veiculo); // Reexibe detalhes atualizados
            exibirNotificacao(`Manutenção para ${placa} agendada!`, "success");
            limparFormulario('form-agendamento');
        } else {
            exibirNotificacao("Não foi possível adicionar a manutenção.", "error");
        }
    } catch(error) {
         console.error("Erro ao agendar:", error);
         exibirNotificacao(`Erro ao agendar: ${error.message}`, "error");
    }
}

/** Verifica e exibe lembretes de agendamento (sem mudanças) */
function verificarAgendamentos() {
    const hoje = new Date(); const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);
    hoje.setHours(0, 0, 0, 0); amanha.setHours(0, 0, 0, 0);

    garagem.forEach(veiculo => {
        veiculo.historicoManutencao.forEach(manutencao => {
            const dataManutencao = new Date(manutencao.data);
            dataManutencao.setHours(0, 0, 0, 0);
            if (dataManutencao.getTime() === hoje.getTime()) {
                exibirNotificacao(`Lembrete HOJE: ${manutencao.formatar()} p/ ${veiculo.placa}`, 'warning', 10000);
            } else if (dataManutencao.getTime() === amanha.getTime()) {
                 exibirNotificacao(`Lembrete AMANHÃ: ${manutencao.formatar()} p/ ${veiculo.placa}`, 'info', 10000);
            }
        });
    });
}

// --- Funções de Interação (Novas) ---

/**
 * Função genérica para lidar com cliques nos botões de interação.
 * @param {'ligar'|'desligar'|'acelerar'|'buzinar'|'turbo'|'carregar'|'descarregar'} acao
 */
function handleInteracao(acao) {
    if (!veiculoAtualPlaca) {
        exibirNotificacao("Nenhum veículo selecionado para interação.", "error");
        return;
    }
    const veiculo = encontrarVeiculo(veiculoAtualPlaca);
    if (!veiculo) {
        exibirNotificacao("Erro: Veículo atual não encontrado.", "error");
        return;
    }

    let resultado = "";
    let somParaTocar = null;

    try {
        switch (acao) {
            case 'ligar':
                resultado = veiculo.ligar();
                if (resultado.includes("ligado!")) somParaTocar = somLigar;
                break;
            case 'desligar':
                resultado = veiculo.desligar();
                 if (resultado.includes("desligado!")) somParaTocar = somDesligar;
                break;
            case 'acelerar':
                resultado = veiculo.acelerar(); // Usa incremento padrão da classe
                // somParaTocar = somAcelerar; // Opcional
                break;
            case 'buzinar':
                resultado = veiculo.buzinar();
                somParaTocar = somBuzina;
                break;
            case 'turbo':
                if (veiculo instanceof CarroEsportivo) {
                     resultado = veiculo.turboAtivado ? veiculo.desativarTurbo() : veiculo.ativarTurbo();
                     if (resultado.includes("ativado!")) somParaTocar = somTurbo; // Opcional
                } else { resultado = "Ação não aplicável."; }
                break;
            case 'carregar':
                 if (veiculo instanceof Caminhao) {
                     resultado = veiculo.carregar(1000); // Valor fixo para o botão
                     if(resultado.includes("carregado")) somParaTocar = somCarga; // Opcional
                 } else { resultado = "Ação não aplicável."; }
                 break;
            case 'descarregar':
                 if (veiculo instanceof Caminhao) {
                     resultado = veiculo.descarregar(500); // Valor fixo
                     if(resultado.includes("descarregado")) somParaTocar = somCarga; // Opcional
                 } else { resultado = "Ação não aplicável."; }
                 break;
            default:
                resultado = "Ação desconhecida.";
        }

        // Exibe o resultado da ação
        exibirNotificacao(resultado, resultado.includes("Erro") || resultado.includes("não aplicável") || resultado.includes("Pare o veículo") ? "warning" : "info");

        // Toca o som se houver
        if (somParaTocar) {
            somParaTocar.currentTime = 0; // Reinicia caso esteja tocando
            somParaTocar.play().catch(e => console.warn("Erro ao tocar som:", e)); // Evita erro se interação rápida
        }

        // Atualiza a UI de status e botões
        atualizarDetalhesInteracao(veiculo);

        // Salva o estado alterado no LocalStorage
        salvarGaragem(garagem);

    } catch (error) {
        console.error(`Erro durante a ação ${acao}:`, error);
        exibirNotificacao(`Erro inesperado ao ${acao}. Verifique o console.`, "error");
    }
}


// --- Inicialização e Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    garagem = carregarGaragem();
    exibirVeiculos(garagem);

    // Listeners dos formulários
    formAddVeiculo.addEventListener('submit', handleAddVeiculo);
    formAgendamento.addEventListener('submit', handleAgendarManutencao);

    // Listener para botões de detalhes na lista da garagem
    listaGaragemElement.addEventListener('click', handleClickDetalhesGaragem);

    // Listener para voltar
    btnVoltarGaragem.addEventListener('click', () => {
        veiculoAtualPlaca = null; // Limpa seleção ao voltar
        mostrarGaragemView();
    });

    // Listeners para os botões de INTERAÇÃO (dentro da seção de detalhes)
    document.getElementById('btn-detail-ligar').addEventListener('click', () => handleInteracao('ligar'));
    document.getElementById('btn-detail-desligar').addEventListener('click', () => handleInteracao('desligar'));
    document.getElementById('btn-detail-acelerar').addEventListener('click', () => handleInteracao('acelerar'));
    document.getElementById('btn-detail-buzinar').addEventListener('click', () => handleInteracao('buzinar'));
    document.getElementById('btn-detail-turbo').addEventListener('click', () => handleInteracao('turbo'));
    document.getElementById('btn-detail-carregar').addEventListener('click', () => handleInteracao('carregar'));
    document.getElementById('btn-detail-descarregar').addEventListener('click', () => handleInteracao('descarregar'));
    // Adicionar listener para Frear se implementar o botão

    // Listener para select de tipo de veículo no form
    veiculoTipoSelect.addEventListener('change', atualizarCamposEspecificos);
    atualizarCamposEspecificos(); // Estado inicial

    verificarAgendamentos(); // Verifica lembretes

    console.log("Garagem Inteligente Unificada inicializada.");
});