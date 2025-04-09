// Referências de elementos (manter as anteriores)
const listaGaragemElement = document.getElementById('lista-garagem');
const detalhesSection = document.getElementById('detalhes-veiculo-section');
const garagemSection = document.getElementById('garage-section');
const addVehicleSection = document.getElementById('add-vehicle-section');
const detalhesTituloElement = document.getElementById('detalhes-veiculo-titulo');
const listaHistoricoElement = document.getElementById('lista-historico');
const listaAgendamentosElement = document.getElementById('lista-agendamentos');
const agendamentoPlacaInput = document.getElementById('agendamento-veiculo-placa');
const notificacoesContainer = document.getElementById('notificacoes-container');
const formAgendamento = document.getElementById('form-agendamento');
const formAddVeiculo = document.getElementById('form-add-veiculo');
const veiculoTipoSelect = document.getElementById('veiculo-tipo');

// Novas referências para interação
const detalhesStatusElement = document.getElementById('detalhes-veiculo-status');
const detalhesBotoesContainer = document.getElementById('detalhes-veiculo-botoes');
const detalhesImagemElement = document.getElementById('detalhes-veiculo-imagem'); // Opcional

/**
 * Exibe a lista de veículos na interface (sem grandes mudanças).
 * @param {Veiculo[]} veiculos
 */
function exibirVeiculos(veiculos) {
    listaGaragemElement.innerHTML = '';
    if (veiculos.length === 0) {
        listaGaragemElement.innerHTML = '<p>Nenhum veículo na garagem.</p>';
        return;
    }
    veiculos.forEach(veiculo => {
        const li = document.createElement('li');
         // Usar getInfo(false) para uma visualização mais limpa na lista
        li.innerHTML = `
            <p><strong>${veiculo.placa}</strong> - ${veiculo.modelo} (${veiculo.cor}) - <em>${veiculo.status}</em></p>
            <button class="btn-detalhes" data-placa="${veiculo.placa}">Detalhes / Interagir</button>
        `;
        li.classList.add(`veiculo-${veiculo._tipoVeiculo.toLowerCase()}`);
        listaGaragemElement.appendChild(li);
    });
}

/**
 * Atualiza a exibição do status e dos botões de interação na seção de detalhes.
 * @param {Veiculo} veiculo - O veículo sendo visualizado.
 */
function atualizarDetalhesInteracao(veiculo) {
    if (!veiculo) {
        detalhesStatusElement.textContent = 'Erro: Veículo não encontrado.';
        detalhesBotoesContainer.innerHTML = ''; // Limpa botões
        return;
    }

    // 1. Atualiza o texto de status
    detalhesStatusElement.textContent = veiculo.getInfo(true); // Pega info completa

    // 2. Mostra/Esconde botões específicos baseados no tipo e estado
    const btnTurbo = document.getElementById('btn-detail-turbo');
    const btnCarregar = document.getElementById('btn-detail-carregar');
    const btnDescarregar = document.getElementById('btn-detail-descarregar');
    const btnLigar = document.getElementById('btn-detail-ligar');
    const btnDesligar = document.getElementById('btn-detail-desligar');
    const btnAcelerar = document.getElementById('btn-detail-acelerar');
    const btnFrear = document.getElementById('btn-detail-frear'); // Adicionaremos o botão frear no HTML e listener
    const btnBuzinar = document.getElementById('btn-detail-buzinar');

    // Visibilidade por tipo
    btnTurbo.style.display = (veiculo instanceof CarroEsportivo) ? 'inline-block' : 'none';
    btnCarregar.style.display = (veiculo instanceof Caminhao) ? 'inline-block' : 'none';
    btnDescarregar.style.display = (veiculo instanceof Caminhao) ? 'inline-block' : 'none';

    // Habilitar/Desabilitar por estado
    btnLigar.disabled = veiculo.ligado;
    btnDesligar.disabled = !veiculo.ligado || veiculo.velocidade > 0; // Desabilita se ligado e em movimento
    btnAcelerar.disabled = !veiculo.ligado;
    //btnFrear.disabled = !veiculo.ligado || veiculo.velocidade === 0; // Desabilita se desligado ou parado
    btnBuzinar.disabled = false; // Buzina sempre funciona? Ou só ligado? Vamos deixar sempre.

    // Atualiza texto do botão turbo (se visível)
    if (veiculo instanceof CarroEsportivo) {
        btnTurbo.textContent = veiculo.turboAtivado ? 'Desativar Turbo' : 'Ativar Turbo';
    }

     // (Opcional) Atualiza imagem
     // detalhesImagemElement.src = `images/${veiculo._tipoVeiculo.toLowerCase()}.png`; // Exemplo
     // detalhesImagemElement.style.display = 'block';
}


/**
 * Exibe a seção de detalhes completa (Manutenção + Interação).
 * @param {Veiculo} veiculo - O veículo a ser exibido.
 */
function exibirDetalhesCompletos(veiculo) {
    if (!veiculo) return;

    detalhesTituloElement.textContent = `Detalhes - ${veiculo.placa} (${veiculo.modelo})`;
    agendamentoPlacaInput.value = veiculo.placa; // Para o form de agendamento

    // --- Atualiza Interação ---
    atualizarDetalhesInteracao(veiculo); // Chama a nova função para status e botões

    // --- Atualiza Manutenção (código existente) ---
    listaHistoricoElement.innerHTML = '';
    listaAgendamentosElement.innerHTML = '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let historicoCount = 0;
    let agendamentoCount = 0;
    veiculo.historicoManutencao.sort((a, b) => b.data - a.data); // Garante ordem
    veiculo.historicoManutencao.forEach(manutencao => {
        const li = document.createElement('li');
        li.textContent = manutencao.formatar();
        const dataManutencao = new Date(manutencao.data);
        dataManutencao.setHours(0,0,0,0);
        if (dataManutencao <= hoje) {
            listaHistoricoElement.appendChild(li); historicoCount++;
        } else {
            listaAgendamentosElement.appendChild(li); agendamentoCount++;
        }
    });
    if (historicoCount === 0) listaHistoricoElement.innerHTML = '<li>Nenhum histórico registrado.</li>';
    if (agendamentoCount === 0) listaAgendamentosElement.innerHTML = '<li>Nenhum agendamento futuro.</li>';

    // --- Mostra/Esconde Seções ---
    detalhesSection.style.display = 'block';
    garagemSection.style.display = 'none';
    addVehicleSection.style.display = 'none';
}

/** Mostra a visualização principal da garagem (sem mudanças). */
function mostrarGaragemView() {
    detalhesSection.style.display = 'none';
    garagemSection.style.display = 'block';
    addVehicleSection.style.display = 'block';
}

/** Exibe notificação (sem mudanças). */
function exibirNotificacao(mensagem, tipo = 'info', duracao = 4000) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    notificacoesContainer.appendChild(notificacao);
    if (duracao > 0) {
        setTimeout(() => {
            notificacao.classList.add('fade-out');
            setTimeout(() => { notificacao.remove(); }, 500);
        }, duracao);
    }
}

/** Limpa formulário (sem mudanças). */
function limparFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        if (formId === 'form-add-veiculo') {
            atualizarCamposEspecificos();
        }
    }
}

/** Atualiza campos específicos no form de adicionar (Atualizado). */
function atualizarCamposEspecificos() {
     const tipoSelecionado = veiculoTipoSelect.value;
     document.querySelectorAll('.campos-especificos').forEach(div => {
         div.style.display = 'none';
     });
     // Procura pelo ID correspondente (ex: campos-carro, campos-carroesportivo)
     const camposParaMostrar = document.getElementById(`campos-${tipoSelecionado.toLowerCase()}`);
     if (camposParaMostrar) {
         camposParaMostrar.style.display = 'block';
     }
}