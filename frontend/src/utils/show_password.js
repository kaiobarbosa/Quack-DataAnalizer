(function () {
  function togglePasswordVisibility(button) {
    const passwordField = button.closest(".password-field");
    const passwordInput = passwordField ? passwordField.querySelector("input") : null;

    if (!passwordInput) {
      return;
    }

    const shouldShowPassword = passwordInput.type === "password";
    passwordInput.type = shouldShowPassword ? "text" : "password";
    button.textContent = shouldShowPassword ? "🙈" : "👁";
    button.setAttribute("aria-label", shouldShowPassword ? "Ocultar senha" : "Mostrar senha");
  }

  function bindPasswordToggle(button) {
    if (!button || button.dataset.bound === "true") {
      return;
    }

    button.addEventListener("click", () => togglePasswordVisibility(button));
    button.dataset.bound = "true";
  }

  function initPasswordToggles() {
    document.querySelectorAll("[data-password-toggle]").forEach(bindPasswordToggle);
  }

  window.togglePasswordVisibility = togglePasswordVisibility;
  window.initPasswordToggles = initPasswordToggles;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPasswordToggles);
  } else {
    initPasswordToggles();
  }
})();
