document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. ESTADOS DA APLICAÇÃO (Variáveis globais da tela)
  // =========================================================================
  const users = []; // Guarda os funcionários já aprovados
  const requests = []; // Guarda as solicitações de novas contas (vindos do backend)
  let requestPendingRejection = null; // Guarda o ID do usuário que estamos prestes a rejeitar

  // =========================================================================
  // 2. REFERÊNCIAS DO DOM (Elementos do HTML)
  // =========================================================================
  const usersList = document.getElementById("users-list");
  const requestsList = document.getElementById("requests-list");
  const usersCount = document.getElementById("users-count");
  const requestsBadge = document.getElementById("requests-badge");
  const requestsPanel = document.getElementById("requests-panel");
  const openRequestsButton = document.getElementById("open-requests-button");
  const closeRequestsButton = document.getElementById("close-requests-button");
  const rejectionDialog = document.getElementById("rejection-dialog");
  const cancelRejectionButton = document.getElementById("cancel-rejection-button");
  const confirmRejectionButton = document.getElementById("confirm-rejection-button");

  // =========================================================================
  // 3. FUNÇÕES AUXILIARES (Helpers)
  // =========================================================================
  
  // Pega a primeira letra do nome e do sobrenome para fazer o ícone redondo
  function initials(person) {
    return [person.name, person.lastName]
      .filter(Boolean)
      .map((part) => part.trim()[0])
      .join("")
      .toUpperCase() || "U";
  }

  // Função utilitária que encurta a criação de elementos HTML (tags) no JS
  function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  // Função utilitária específica para criar botões de ação (Aceitar, Rejeitar, Detalhes)
  // O "data.action" é fundamental aqui, pois ele vai dizer ao evento de clique o que esse botão faz
  function actionButton(label, action, className) {
    const button = createElement("button", className || "action-button", label);
    button.type = "button";
    button.dataset.action = action; 
    return button;
  }

  // Atualiza os números na tela (quantidade de funcionários e selo vermelho de notificações)
  function updateCounters() {
    usersCount.textContent = `${users.length} ${users.length === 1 ? "usuário" : "usuários"}`;
    requestsBadge.textContent = requests.length;
  }

  // =========================================================================
  // 4. RENDERIZAÇÃO: FUNCIONÁRIOS ATIVOS
  // =========================================================================
  function renderUsers() {
    usersList.replaceChildren(); // Limpa a lista atual para não duplicar

    // Estado vazio: se não tem ninguém, mostra a mensagem bonitinha
    if (!users.length) {
      const emptyState = createElement("div", "empty-state");
      emptyState.id = "users-empty-state";
      emptyState.innerHTML = '<span class="empty-icon" aria-hidden="true">◌</span><h3>Nenhum usuário cadastrado.</h3><p>Os colaboradores aprovados aparecerão nesta área.</p>';
      usersList.append(emptyState);
      updateCounters();
      return;
    }

    // Se tem usuários, cria um "card" (linha) para cada um
    users.forEach((user) => {
      const row = createElement("article", "user-row");
      row.dataset.id = user.id;
      if (user.inactive) row.classList.add("is-inactive");

      const mark = createElement("span", "user-mark", initials(user));
      mark.setAttribute("aria-hidden", "true");
      
      const info = createElement("div", "user-info");
      info.append(
        createElement("strong", "", `${user.name} ${user.lastName}`.trim()),
        createElement("span", "", user.role),
        createElement("small", "", user.department)
      );

      const details = createElement("div", "user-details", `E-mail: ${user.email}`);
      details.hidden = true;
      details.style.gridColumn = "2 / -1";
      
      const actions = createElement("div", "user-actions");
      actions.append(
        actionButton("Detalhes", "toggle-details"),
        actionButton("Editar", "edit"),
        actionButton(user.inactive ? "Reativar" : "Inativar", "toggle-active", "action-button deactivate")
      );

      row.append(mark, info, actions, details);
      usersList.append(row); // Adiciona o card finalizado na tela
    });

    updateCounters();
  }

  // =========================================================================
  // 5. RENDERIZAÇÃO: SOLICITAÇÕES PENDENTES (AQUI É O SEU FOCO ATUAL)
  // =========================================================================
  function renderRequests() {
    requestsList.replaceChildren(); // Limpa as solicitações antigas

    if (!requests.length) {
      const emptyState = createElement("div", "empty-state");
      emptyState.id = "requests-empty-state";
      emptyState.innerHTML = '<span class="empty-icon" aria-hidden="true">✓</span><h3>Sem requisições</h3><p>Não há solicitações pendentes para aprovação.</p>';
      requestsList.append(emptyState);
      updateCounters();
      return;
    }

    // Passa por cada pedido recebido do banco de dados
    requests.forEach((request) => {
      // ➔ AQUI É CRIADO O ELEMENTO PRINCIPAL COMO UM TODO (O Card do Pedido)
      const card = createElement("article", "request-card");
      card.dataset.id = request.id; 
      
      const main = createElement("div", "request-main");
      const mark = createElement("span", "request-mark", initials(request));
      mark.setAttribute("aria-hidden", "true");
      
      const summary = createElement("div");
      summary.append(createElement("strong", "request-name", `${request.name} ${request.lastName}`.trim()));
      
      const metadata = createElement("div", "request-summary");
      metadata.append(createElement("span", "", request.role), createElement("span", "", request.department));
      summary.append(metadata);

      // ➔ AQUI SÃO CRIADOS OS BOTÕES DE AÇÃO DO CARD
      const actions = createElement("div", "request-actions");
      actions.append(
        actionButton("Ver detalhes", "toggle-details"), // Botão de detalhes
        actionButton("Aceitar", "approve", "approve-button"), // Botão de Aceitar (tem a action "approve")
        actionButton("Rejeitar", "reject", "danger-button")   // Botão de Rejeitar (tem a action "reject")
      );

      const details = createElement("div", "request-details");
      details.hidden = true;
      const email = createElement("p");
      const emailLabel = createElement("strong", "", "E-mail: ");
      email.append(emailLabel, document.createTextNode(request.email));
      const fullName = createElement("p");
      const fullNameLabel = createElement("strong", "", "Nome completo: ");
      fullName.append(fullNameLabel, document.createTextNode(`${request.name} ${request.lastName}`.trim()));
      details.append(email, fullName);

      main.append(mark, summary, actions);
      card.append(main, details);
      
      // Joga o card montado pra dentro do HTML real
      requestsList.append(card);
    });

    updateCounters();
  }

  // =========================================================================
  // 6. CONTROLE DE MODAIS E PAINÉIS
  // =========================================================================
  function openRequests() {
    requestsPanel.classList.add("is-open");
    requestsPanel.setAttribute("aria-hidden", "false");
    openRequestsButton.setAttribute("aria-expanded", "true");
    closeRequestsButton.focus();
  }

  function closeRequests() {
    requestsPanel.classList.remove("is-open");
    requestsPanel.setAttribute("aria-hidden", "true");
    openRequestsButton.setAttribute("aria-expanded", "false");
    openRequestsButton.focus();
  }

  function closeRejectionDialog() {
    rejectionDialog.hidden = true;
    requestPendingRejection = null; // Limpa a variável, já que cancelamos a rejeição
  }

  // Remove a solicitação do array e renderiza a tela de novo
  function removeRequest(id) {
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) requests.splice(index, 1);
    renderRequests();
  }

  // Escutadores de eventos para os modais e painéis
  openRequestsButton.addEventListener("click", openRequests);
  closeRequestsButton.addEventListener("click", closeRequests);
  cancelRejectionButton.addEventListener("click", closeRejectionDialog);

  // Quando clica no modal perguntando "Tem certeza que quer rejeitar?"
  confirmRejectionButton.addEventListener("click", () => {
    if (requestPendingRejection) removeRequest(requestPendingRejection);
    closeRejectionDialog();
  });

  // =========================================================================
  // 7. DELEGAÇÃO DE EVENTOS: CLIQUES NAS SOLICITAÇÕES
  // =========================================================================
  // Em vez de botar um "addEventListener" em CADA botão de aceitar/rejeitar, 
  // escutamos os cliques no painel inteiro e verificamos se o que foi clicado foi um botão.
    // 1. ADICIONE O 'async' AQUI NO EVENTO DE CLIQUE
  requestsList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    
    const card = button.closest(".request-card");
    const request = requests.find((item) => item.id === card.dataset.id);
    if (!request) return;

    if (button.dataset.action === "toggle-details") {
      const details = card.querySelector(".request-details");
      details.hidden = !details.hidden;
      button.textContent = details.hidden ? "Ver detalhes" : "Ocultar detalhes";
      return;
    }

    // ==========================================
    // ➔ QUANDO CLICA EM ACEITAR
    // ==========================================
    if (button.dataset.action === "approve") {
      
      const token = localStorage.getItem('access_token');
      
      // Muda o texto do botão para dar um feedback visual
      button.textContent = "Aprovando...";
      button.disabled = true;

      try {
        // Envia o ID para o seu backend no Flask
        const response = await fetch('http://127.0.0.1:5000/acept_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // O request.id já foi capturado pelo seu código!
            body: JSON.stringify({ "id_user": request.id }) 
        });

        if (response.ok) {
            // Se o banco de dados atualizou com sucesso, aí sim alteramos a tela:
            users.push({ ...request, inactive: false });
            removeRequest(request.id);
            renderUsers();
        } else {
            const result = await response.json();
            alert(`Erro ao aprovar: ${result.message}`);
            button.textContent = "Aceitar";
            button.disabled = false;
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        button.textContent = "Aceitar";
        button.disabled = false;
      }
      return;
    }

    if (button.dataset.action === "reject") {
      requestPendingRejection = request.id;
      rejectionDialog.hidden = false;
      confirmRejectionButton.focus();
    }
  });

  // =========================================================================
  // 8. DELEGAÇÃO DE EVENTOS: CLIQUES NOS USUÁRIOS ATIVOS
  // =========================================================================
  usersList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const row = button.closest(".user-row");
    const user = users.find((item) => item.id === row.dataset.id);
    if (!user) return;

    if (button.dataset.action === "toggle-details") {
      const details = row.querySelector(".user-details");
      details.hidden = !details.hidden;
      button.textContent = details.hidden ? "Detalhes" : "Ocultar";
    }

    if (button.dataset.action === "toggle-active") {
      user.inactive = !user.inactive;
      renderUsers();
    }

    if (button.dataset.action === "edit") {
      const updatedRole = window.prompt("Função do funcionário:", user.role);
      if (updatedRole?.trim()) {
        user.role = updatedRole.trim();
        renderUsers();
      }
    }
  });

  // =========================================================================
  // 9. FUNÇÕES GLOBAIS (Ponte com o requests_panel.js)
  // =========================================================================
  // Essa função é acessada por aquele seu arquivo de requisição do backend
  window.addEmployeeRequest = (data) => {
    // Cria um ID único caso o backend não mande um
    const id = data.id || `request-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    // Adiciona o pedido no array
    requests.push({ id, name: data.name || "", lastName: data.lastName || "", role: data.role || "Não informado", department: data.department || "Não informado", email: data.email || "" });
    // Refaz a tela com os dados novos
    renderRequests();
  };

  window.setExistingEmployees = (data) => {
    users.splice(0, users.length, ...data.map((user, index) => ({ ...user, id: user.id || `employee-${index}`, inactive: Boolean(user.inactive) })));
    renderUsers();
  };

  // Inicializa as duas telas vazias (ou com os dados iniciais)
  renderUsers();
  renderRequests();
});
