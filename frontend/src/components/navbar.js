/** Renderiza a navegação compartilhada das telas autenticadas. */
(function () {
  function setActiveItem(item, items) {
    items.forEach((navItem) => {
      navItem.classList.remove("active");
      navItem.removeAttribute("aria-current");
    });

    item.classList.add("active");
    item.setAttribute("aria-current", "page");
  }

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
          <a id="home_button" class="nav-item" href="home.html"><span class="nav-icon" aria-hidden="true">⌂</span><span>Home</span></a>
          <a id = "upload_csv_button" class="nav-item" href="#carregar-csv"><span class="nav-icon" aria-hidden="true">↑</span><span>Carregar CSV</span></a>
          <a id = "reports_button" class="nav-item" href="#relatorios"><span class="nav-icon" aria-hidden="true">▤</span><span>Relatórios</span></a>
          <a id = "employees_button" class="nav-item" href="employees.html"><span class="nav-icon" aria-hidden="true">⌁</span><span>Funcionários</span></a>
          <a id = "departments_button" class="nav-item" href="departmants.html"><span class="nav-icon" aria-hidden="true">⌁</span><span>Departamentos</span></a>
        </nav>
        <a id="profile-button" class="profile-button" href="#perfil">
          <span class="profile-avatar" aria-hidden="true">U</span>
          <span class="profile-copy"><small>CONTA</small><strong>user</strong></span>
          <span class="profile-more" aria-hidden="true">•••</span>
        </a>
      </aside>`;

    const navigationItems = [...container.querySelectorAll(".nav-item")];
    const currentPath = window.location.pathname;
    const currentPageItem = navigationItems.find((item) => {
      const itemUrl = new URL(item.href, window.location.href);
      return !itemUrl.hash && itemUrl.pathname === currentPath;
    });

    setActiveItem(currentPageItem || navigationItems[0], navigationItems);

    navigationItems.forEach((item) => {
      item.addEventListener("click", () => setActiveItem(item, navigationItems));
    });
  }

  window.renderSidebar = renderSidebar;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => renderSidebar());
  else renderSidebar();
})();
