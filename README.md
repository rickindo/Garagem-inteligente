# Garagem Inteligente

Uma aplicação web interativa para gerenciar uma garagem de veículos, demonstrando conceitos de Programação Orientada a Objetos (POO), persistência de dados e interface de usuário dinâmica.

## Visão Geral

O projeto "Garagem Inteligente" foi desenvolvido para simular o gerenciamento de uma garagem, permitindo ao usuário adicionar, visualizar e interagir com diferentes tipos de veículos (Carro, Carro Esportivo, Caminhão). Ele serve como um exemplo prático de como implementar classes, herança, polimorfismo e encapsulamento em JavaScript (ES6+). A aplicação utiliza a API `LocalStorage` para persistir os dados dos veículos, garantindo que as informações sejam mantidas mesmo após o fechamento do navegador. A interface do usuário (UI) é dinâmica, atualizando-se em tempo real para refletir as ações do usuário e o estado dos veículos, focando em uma experiência de uso intuitiva.

## Funcionalidades Principais

*   **Adicionar Veículos:**
    *   Adiciona Carros, Carros Esportivos e Caminhões.
    *   Campos específicos para cada tipo (número de portas, turbo, capacidade de carga).
    *   Validação de dados.
*   **Listar Veículos:**
    *   Exibe a lista de veículos cadastrados.
    *   Mostra informações básicas (placa, modelo, cor, status).
*   **Detalhes e Interação:**
    *   Tela de detalhes com informações completas.
    *   Interação com: Ligar/Desligar, Acelerar, Frear, Buzinar.
    *   Ações específicas por tipo (Turbo, Carregar/Descarregar).
*   **Gerenciamento de Manutenção:**
    *   Agendamento de manutenções (data, tipo, custo, descrição).
    *   Exibição do histórico e agendamentos futuros.
*   **Persistência de Dados (LocalStorage):**
    *   Salva e carrega dados da garagem (veículos e estado).
    *   Tratamento de erros na carga dos dados.
*   **UI Dinâmica:**
    *   Atualização da interface em tempo real.
    *   Feedback visual e notificações.
*   **Lembretes de Manutenção:**
    *   Notificações de manutenções agendadas.

## Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **CSS3:** Estilização e layout responsivo.
*   **JavaScript (ES6+):**
    *   Programação Orientada a Objetos (Classes, Herança, Polimorfismo).
    *   Manipulação do DOM.
    *   `LocalStorage API`.
    *   Template literals, `const`/`let`, arrow functions, tratamento de erros.
*   **JSDoc:** Documentação do código.
