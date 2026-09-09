/** Renderiza a navegação compartilhada das telas autenticadas. */
(function () {
  function renderSidebar(containerId) {
    const container = document.getElementById(containerId || "navbar-container");
    if (!container) return;

    container.innerHTML = `
      <aside class="sidebar" aria-label="Navegação principal">
        <a class="sidebar-brand" href="home.html" aria-label="Quack Analytics - Início">
          <span class="brand-symbol" aria-hidden="true">Q</span>
          <span class="brand-name">QUACK <small>ANALYTICS</small></span>
        </a>
        <nav class="sidebar-menu">
          <a id = "home_button" class="nav-item active" href="home.html" aria-current="page"><span class="nav-icon" aria-hidden="true">⌂</span><span>Home</span></a>
          <a id = "upload_csv_button" class="nav-item" href="#carregar-csv"><span class="nav-icon" aria-hidden="true">↑</span><span>Carregar CSV</span></a>
          <a id = "analysis_button" class="nav-item" href="#analise"><span class="nav-icon" aria-hidden="true">⌁</span><span>Análise</span></a>
          <a id = "reports_button" class="nav-item" href="#relatorios"><span class="nav-icon" aria-hidden="true">▤</span><span>Relatórios</span></a>
        </nav>
        <a id="profile-button" class="profile-button" href="#perfil">
          <span class="profile-avatar" aria-hidden="true">U</span>
          <span class="profile-copy"><small>CONTA</small><strong>user</strong></span>
          <span class="profile-more" aria-hidden="true">•••</span>
        </a>
      </aside>`;
  }

  window.renderSidebar = renderSidebar;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => renderSidebar());
  else renderSidebar();
})();