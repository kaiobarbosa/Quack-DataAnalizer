/** Renderiza a navegação compartilhada das telas autenticadas. */
(function () {
  function setActiveItem(item, items) {
    items.forEach((navItem) => {
      navItem.classList.remove('active');
      navItem.removeAttribute('aria-current');
    });

    item.classList.add('active');
    item.setAttribute('aria-current', 'page');
  }

  function renderSidebar(containerId) {
    const container = document.getElementById(containerId || "navbar-container");
    if (!container) return;

    // Desenha o HTML padrão
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

    const navigationItems = [...container.querySelectorAll('.nav-item')];
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const currentPageItem = navigationItems.find((item) => {
      const itemPage = item.getAttribute('href').split('#')[0];
      return itemPage && itemPage === currentPage;
    });

    setActiveItem(currentPageItem || navigationItems[0], navigationItems);

    navigationItems.forEach((item) => {
      item.addEventListener('click', () => setActiveItem(item, navigationItems));
    });

    // Assim que injetar o HTML, chama a função para colocar o nome correto!
    updateProfileButton();
  }

  async function updateProfileButton() {
    const profileNameElement = document.querySelector('#profile-button .profile-copy strong');
    const profileAvatarElement = document.querySelector('#profile-button .profile-avatar');

    // 1. TENTA PEGAR DO CACHE PRIMEIRO (Para atualização visual instantânea)
    const cachedName = localStorage.getItem('enterprise_name');
    if (cachedName) {
        if (profileNameElement) profileNameElement.textContent = cachedName;
        if (profileAvatarElement) profileAvatarElement.textContent = cachedName.charAt(0).toUpperCase();
    }

    // 2. BUSCA NO BACKEND (Para garantir que os dados estão corretos)
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        // Usando a porta 5000 que você manteve configurada no backend
        const response = await fetch('http://127.0.0.1:5000/select_enterprise_data', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            const [name_enterprise, cnpj, email] = result.entity;

            // Salva o nome no cache para as próximas telas carregarem rápido
            localStorage.setItem('enterprise_name', name_enterprise);

            // Atualiza os elementos HTML (caso o cache estivesse vazio ou desatualizado)
            if (profileNameElement) profileNameElement.textContent = name_enterprise;
            if (profileAvatarElement) profileAvatarElement.textContent = name_enterprise.charAt(0).toUpperCase();
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil na navbar:', error);
    }
  }

  window.renderSidebar = renderSidebar;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => renderSidebar());
  else renderSidebar();
})();
