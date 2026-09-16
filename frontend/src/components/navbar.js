/** Renderiza a navegação compartilhada das telas autenticadas. */
/** Renderiza a navegação compartilhada das telas autenticadas. */
(function () {
  
  // 1. INSERIMOS A FUNÇÃO AQUI PARA ELA EXISTIR EM TODAS AS TELAS
  function getRoleFromToken() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
        return payload.role; 
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
  }
  // Tornamos global para a Navbar e outras telas conseguirem usar
  window.getRoleFromToken = getRoleFromToken;

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

    // 2. AGORA ELE SEMPRE VAI ACHAR A FUNÇÃO!
    const userRole = typeof window.getRoleFromToken === 'function' ? window.getRoleFromToken() : null;

    // Monta os botões que todo mundo (PF e PJ) pode ver
    let navItemsHTML = `
      <a id="home_button" class="nav-item" href="home.html"><span class="nav-icon" aria-hidden="true">⌂</span><span>Home</span></a>
      <a id="upload_csv_button" class="nav-item" href="#carregar-csv"><span class="nav-icon" aria-hidden="true">↑</span><span>Carregar CSV</span></a>
      <a id="reports_button" class="nav-item" href="#relatorios"><span class="nav-icon" aria-hidden="true">▤</span><span>Relatórios</span></a>
    `;

    // Se o usuário for empresa (PJ), adiciona os botões de administração
    if (userRole === 'pj') {
      navItemsHTML += `
        <a id="employees_button" class="nav-item" href="employees.html"><span class="nav-icon" aria-hidden="true">⌁</span><span>Funcionários</span></a>
        <a id="departments_button" class="nav-item" href="departmants.html"><span class="nav-icon" aria-hidden="true">⌁</span><span>Departamentos</span></a>
      `;
    }

    // Injeta o HTML completo no container
    container.innerHTML = `
      <aside class="sidebar" aria-label="Navegação principal">
        <a class="sidebar-brand" href="home.html" aria-label="Quack Analytics - Início">
          <span class="brand-symbol" aria-hidden="true">Q</span>
          <span class="brand-name">QUACK <small>ANALYTICS</small></span>
        </a>
        <nav class="sidebar-menu">
          ${navItemsHTML}
        </nav>
        <a id="profile-button" class="profile-button" href="profile.html">
          <span class="profile-avatar" aria-hidden="true">U</span>
          <span class="profile-copy"><small>CONTA</small><strong>user</strong></span>
          <span class="profile-more" aria-hidden="true">•••</span>
        </a>
      </aside>`;

    // --- O resto da função continua exatamente igual... ---
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

    updateProfileButton();
  }

  async function updateProfileButton() {
    const profileNameElement = document.querySelector('#profile-button .profile-copy strong');
    const profileAvatarElement = document.querySelector('#profile-button .profile-avatar');

    // Pega o token para fazer a requisição
    const token = localStorage.getItem('access_token');
    if (!token) return;

    // Pega a role para saber qual rota chamar
    const userRole = typeof window.getRoleFromToken === 'function' ? window.getRoleFromToken() : null;
    if (!userRole) return;

    // 1. TENTA PEGAR DO CACHE PRIMEIRO (Para atualização visual instantânea)
    // Mudei o nome de 'enterprise_name' para 'user_display_name' para servir para ambos
    const cachedName = localStorage.getItem('user_display_name');
    if (cachedName) {
        if (profileNameElement) profileNameElement.textContent = cachedName;
        if (profileAvatarElement) profileAvatarElement.textContent = cachedName.charAt(0).toUpperCase();
    }

    // 2. BUSCA NO BACKEND (Para garantir que os dados estão corretos)
    try {
        // Define a rota dependendo de quem logou
        let endpoint = '';
        if (userRole === 'pj') {
            endpoint = 'http://127.0.0.1:5000/select_enterprise_data';
        } else if (userRole === 'pf') {
            endpoint = 'http://127.0.0.1:5000/select_employee_data';
        }

        const response = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            
            let displayName = 'Usuário';

            // Trata a resposta baseado no tipo de usuário
            if (userRole === 'pj') {
                const [name_enterprise, cnpj, email] = result.entity;
                displayName = name_enterprise;
            } else if (userRole === 'pf') {
                // Baseado na estrutura do seu home_screen_3.js
                const [name_employee, lastname_employee, email_employee] = result.entity; 
                displayName = name_employee;
            }

            // Salva o nome no cache para as próximas telas carregarem rápido
            localStorage.setItem('user_display_name', displayName);

            // Atualiza os elementos HTML (caso o cache estivesse vazio ou desatualizado)
            if (profileNameElement) profileNameElement.textContent = displayName;
            if (profileAvatarElement) profileAvatarElement.textContent = displayName.charAt(0).toUpperCase();
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil na navbar:', error);
    }
  }


  window.renderSidebar = renderSidebar;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => renderSidebar());
  else renderSidebar();
})();
