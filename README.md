# Garagem Inteligente Unificada

Uma aplicação web interativa que permite gerenciar uma garagem de veículos, demonstrando conceitos de Programação Orientada a Objetos (POO), armazenamento local e interface do usuário dinâmica.

## Visão Geral

Este projeto apresenta uma simulação de uma garagem, onde o usuário pode adicionar, visualizar e interagir com diferentes tipos de veículos (Carro, Carro Esportivo, Caminhão). Ele demonstra a aplicação prática de classes e herança em JavaScript (ES6+), persistência de dados usando a API `LocalStorage` do navegador e uma interface responsiva que se adapta às ações do usuário. O projeto foi desenvolvido com foco em boas práticas de organização de código, documentação e fácil compreensão.

## Funcionalidades Principais

*   **Adicionar Veículos:**
    *   Permite adicionar diferentes tipos de veículos: Carro, Carro Esportivo e Caminhão.
    *   Cada tipo de veículo possui atributos específicos (ex: número de portas, capacidade de carga).
*   **Listar Veículos:**
    *   Exibe uma lista dos veículos presentes na garagem.
    *   Exibe informações básicas de cada veículo (placa, modelo, cor, status).
*   **Detalhes e Interação:**
    *   Visualização detalhada de um veículo selecionado.
    *   Ações de interação: Ligar/Desligar, Acelerar, Frear, Buzinar.
    *   Ações específicas por tipo:
        *   Carro Esportivo: Ativar/Desativar Turbo.
        *   Caminhão: Carregar/Descarregar carga.
*   **Gerenciamento de Manutenção:**
    *   Permite agendar manutenções futuras para cada veículo (data, tipo de serviço, custo, descrição).
    *   Exibe o histórico de manutenções realizadas.
    *   Exibe os agendamentos futuros.
*   **Persistência de Dados:**
    *   Utiliza a API `LocalStorage` para salvar e carregar os dados da garagem, garantindo a persistência dos veículos mesmo após o fechamento do navegador.
*   **Interface do Usuário (UI) Dinâmica:**
    *   A interface é atualizada em tempo real para refletir as ações do usuário e o estado dos veículos.
    *   Utiliza notificações para fornecer feedback ao usuário.

## Tecnologias Utilizadas

*   **HTML5:** Para a estrutura da página.
*   **CSS3:** Para a estilização e layout responsivo.
*   **JavaScript (ES6+):**
    *   Programação Orientada a Objetos (Classes, Herança, Polimorfismo, `super()`).
    *   Manipulação do DOM (Seleção de elementos, Event Listeners, Atualização dinâmica).
    *   `LocalStorage API` para persistência de dados.
    *   Arrow functions, template literals, `let`/`const`.

## Estrutura do Projeto
