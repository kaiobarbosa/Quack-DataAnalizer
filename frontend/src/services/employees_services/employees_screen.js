document.addEventListener("DOMContentLoaded", () => {
  const users = [];
  const requests = [];
  let requestPendingRejection = null;

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

  function initials(person) {
    return [person.name, person.lastName]
      .filter(Boolean)
      .map((part) => part.trim()[0])
      .join("")
      .toUpperCase() || "U";
  }

  function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function actionButton(label, action, className) {
    const button = createElement("button", className || "action-button", label);
    button.type = "button";
    button.dataset.action = action;
    return button;
  }

  function updateCounters() {
    usersCount.textContent = `${users.length} ${users.length === 1 ? "usuário" : "usuários"}`;
    requestsBadge.textContent = requests.length;
  }

  function renderUsers() {
    usersList.replaceChildren();

    if (!users.length) {
      const emptyState = createElement("div", "empty-state");
      emptyState.id = "users-empty-state";
      emptyState.innerHTML = '<span class="empty-icon" aria-hidden="true">◌</span><h3>Nenhum usuário cadastrado.</h3><p>Os colaboradores aprovados aparecerão nesta área.</p>';
      usersList.append(emptyState);
      updateCounters();
      return;
    }

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
      usersList.append(row);
    });

    updateCounters();
  }

  function renderRequests() {
    requestsList.replaceChildren();

    if (!requests.length) {
      const emptyState = createElement("div", "empty-state");
      emptyState.id = "requests-empty-state";
      emptyState.innerHTML = '<span class="empty-icon" aria-hidden="true">✓</span><h3>Sem requisições</h3><p>Não há solicitações pendentes para aprovação.</p>';
      requestsList.append(emptyState);
      updateCounters();
      return;
    }

    requests.forEach((request) => {
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

      const actions = createElement("div", "request-actions");
      actions.append(
        actionButton("Ver detalhes", "toggle-details"),
        actionButton("Aceitar", "approve", "approve-button"),
        actionButton("Rejeitar", "reject", "danger-button")
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
      requestsList.append(card);
    });

    updateCounters();
  }

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
    requestPendingRejection = null;
  }

  function removeRequest(id) {
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) requests.splice(index, 1);
    renderRequests();
  }

  openRequestsButton.addEventListener("click", openRequests);
  closeRequestsButton.addEventListener("click", closeRequests);
  cancelRejectionButton.addEventListener("click", closeRejectionDialog);

  confirmRejectionButton.addEventListener("click", () => {
    if (requestPendingRejection) removeRequest(requestPendingRejection);
    closeRejectionDialog();
  });

  requestsList.addEventListener("click", (event) => {
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

    if (button.dataset.action === "approve") {
      users.push({ ...request, inactive: false });
      removeRequest(request.id);
      renderUsers();
      return;
    }

    if (button.dataset.action === "reject") {
      requestPendingRejection = request.id;
      rejectionDialog.hidden = false;
      confirmRejectionButton.focus();
    }
  });

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

  window.addEmployeeRequest = (data) => {
    const id = data.id || `request-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    requests.push({ id, name: data.name || "", lastName: data.lastName || "", role: data.role || "Não informado", department: data.department || "Não informado", email: data.email || "" });
    renderRequests();
  };

  window.setExistingEmployees = (data) => {
    users.splice(0, users.length, ...data.map((user, index) => ({ ...user, id: user.id || `employee-${index}`, inactive: Boolean(user.inactive) })));
    renderUsers();
  };

  renderUsers();
  renderRequests();
});
