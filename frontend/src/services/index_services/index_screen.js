document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".auth-panel");
  const tabButtons = document.querySelectorAll(".tab-button");
  const linkButtons = document.querySelectorAll(".link-button");
  const typeButtons = document.querySelectorAll(".type-button");

  const changePanel = (panelId) => {
    panels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    tabButtons.forEach((button) => {
      const isActive = button.dataset.panel === panelId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  const changeFormType = (formName, type) => {
    const typeButtonsForForm = document.querySelectorAll(`.type-button[data-form="${formName}"]`);
    const fieldsForForm = document.querySelectorAll(
      `[data-form="${formName}"].login-field, [data-form="${formName}"].register-fields`
    );

    typeButtonsForForm.forEach((button) => {
      const isActive = button.dataset.type === type;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    fieldsForForm.forEach((field) => {
      const isVisible = field.dataset.type === type;
      field.classList.toggle("hidden", !isVisible);
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changePanel(button.dataset.panel);
    });
  });

  linkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changePanel(button.dataset.panel);
    });
  });

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { form, type } = button.dataset;
      changeFormType(form, type);
    });
  });

  document.querySelectorAll(".auth-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitButton = form.querySelector(".primary-button");
      submitButton.classList.add("is-loading");
      submitButton.textContent = form.id === "login-form" ? "Entrando..." : "Cadastrando...";

      window.setTimeout(() => {
        submitButton.classList.remove("is-loading");
        submitButton.textContent = form.id === "login-form" ? "Entrar" : "Cadastrar";
      }, 900);
    });
  });

  changeFormType("login", "physical");
  changeFormType("register", "physical");

  if (typeof window.initPasswordToggles === "function") {
    window.initPasswordToggles();
  }
});
