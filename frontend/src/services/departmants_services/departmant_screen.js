document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("departments-header");
  const form = document.getElementById("department-form");
  const nameInput = document.getElementById("department-name");
  const createButton = document.getElementById("create-department-button");
  const cancelButton = document.getElementById("cancel-department-button");
  const saveButton = document.getElementById("save-department-button");
  const list = document.getElementById("department-list");
  const count = document.getElementById("departments-count");

  function getRows() {
    return [...list.querySelectorAll(".department-row")];
  }

  function updateCount() {
    const total = getRows().length;
    count.textContent = `${total} ${total === 1 ? "departamento" : "departamentos"}`;
  }

  function toggleSaveButton() {
    saveButton.disabled = nameInput.value.trim().length === 0;
  }

  function closeForm() {
    form.reset();
    toggleSaveButton();
    header.classList.remove("is-form-open");
    createButton.setAttribute("aria-expanded", "false");
    createButton.focus();
  }

  function openForm() {
    header.classList.add("is-form-open");
    createButton.setAttribute("aria-expanded", "true");
    nameInput.focus();
  }

  function createDepartmentRow(name) {
    const row = document.createElement("article");
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    row.className = "department-row";
    row.innerHTML = `
      <span class="department-mark" aria-hidden="true"></span>
      <div class="department-info">
        <strong></strong>
        <small>Departamento ativo</small>
      </div>
      <div class="department-actions">
        <button class="action-button" type="button" data-action="edit">Editar</button>
        <button class="action-button deactivate" type="button" data-action="deactivate">Inativar</button>
      </div>`;

    row.querySelector(".department-mark").textContent = initials || "D";
    row.querySelector("strong").textContent = name;
    return row;
  }

  createButton.addEventListener("click", () => {
    if (header.classList.contains("is-form-open")) closeForm();
    else openForm();
  });

  cancelButton.addEventListener("click", closeForm);
  nameInput.addEventListener("input", toggleSaveButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    list.querySelector("#empty-state")?.remove();
    list.append(createDepartmentRow(name));
    updateCount();
    closeForm();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const row = button.closest(".department-row");
    const name = row.querySelector("strong");
    const description = row.querySelector("small");

    if (button.dataset.action === "deactivate") {
      const isInactive = row.classList.toggle("is-inactive");
      button.textContent = isInactive ? "Reativar" : "Inativar";
      description.textContent = isInactive ? "Departamento inativo" : "Departamento ativo";
      return;
    }

    if (button.dataset.action === "edit") {
      const editor = document.createElement("input");
      editor.type = "text";
      editor.value = name.textContent;
      editor.className = "department-name-editor";
      editor.maxLength = 80;
      name.replaceWith(editor);
      button.dataset.action = "save";
      button.textContent = "Salvar";
      editor.focus();
      editor.select();
      return;
    }

    if (button.dataset.action === "save") {
      const editor = row.querySelector(".department-name-editor");
      const newName = editor.value.trim();
      if (!newName) {
        editor.focus();
        return;
      }

      const updatedName = document.createElement("strong");
      updatedName.textContent = newName;
      editor.replaceWith(updatedName);
      row.querySelector(".department-mark").textContent = newName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      button.dataset.action = "edit";
      button.textContent = "Editar";
    }
  });

  window.inserirDepartamentoNaLista = function(nomeDoDepartamento) {
    // 1. Remove a mensagem de "Ainda não há departamentos" (se existir)
    list.querySelector("#empty-state")?.remove();
    
    // 2. Cria a linha visual do departamento
    const novaLinha = createDepartmentRow(nomeDoDepartamento);
    
    // 3. Adiciona a linha na lista da tela
    list.append(novaLinha);
    
    // 4. Atualiza o contador de departamentos (ex: "2 departamentos")
    updateCount();
  };

  toggleSaveButton();
  updateCount();

});
