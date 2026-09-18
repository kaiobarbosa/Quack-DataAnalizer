(function () {
  const profile = { name: "Ana", lastname: "Carolina", role: "Analista de dados", department: "Inteligência de dados", email: "ana.carolina@quack.com" };
  const reports = [
    { title: "Análise de erros da aplicação", date: "15/09/2026", department: "Inteligência de dados" },
    { title: "Relatório de acessos do sistema", date: "12/09/2026", department: "Monitoramento" },
    { title: "Resumo de eventos críticos", date: "08/09/2026", department: "Operações" }
  ];
  const $ = (id) => document.getElementById(id);
  const fullName = () => [profile.name, profile.lastname].filter(Boolean).join(" ") || "Usuário";
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[c]));

  function renderProfile() {
    const name = fullName();
    $("profile-name").textContent = name; $("profile-full-name").textContent = name;
    $("profile-role").textContent = profile.role || "Função não informada";
    $("profile-department").textContent = profile.department || "Não informado";
    $("profile-email").textContent = profile.email || "Não informado";
    $("profile-avatar").textContent = name.charAt(0).toUpperCase();
    document.querySelector("#profile-button")?.classList.add("active");
  }
  function renderReports() {
    $("report-count").textContent = `${reports.length} ${reports.length === 1 ? "relatório" : "relatórios"}`;
    $("reports-grid").innerHTML = reports.length ? reports.map((report) => `<button class="report-card" type="button" title="Abrir relatório futuramente"><span class="report-card-icon" aria-hidden="true">▤</span><span><strong>${escapeHtml(report.title)}</strong><small>${escapeHtml(report.date)}</small></span><span class="report-card-meta"><span>${escapeHtml(report.department)}</span><span aria-hidden="true">→</span></span></button>`).join("") : '<p class="empty-reports">Nenhum relatório criado até o momento.</p>';
  }
  function setPlaceholders() {
    const fields = { name:"profile-first-name", lastname:"profile-last-name", role:"profile-job", department:"profile-department-input", email:"profile-email-input" };
    Object.entries(fields).forEach(([key, id]) => { $(id).placeholder = profile[key] || "Não informado"; });
  }
  function initEditing() {
    const panel = $("edit-profile-panel");
    const form = $("profile-form");
    const save = $("save-profile-button");
    const dialog = $("save-dialog");

    const close = () => { 
      panel.classList.remove("is-open"); 
      panel.setAttribute("aria-hidden", "true"); 
      $("open-edit-button").setAttribute("aria-expanded", "false"); 
    };
    
    const reset = () => { 
      form.reset(); 
      save.disabled = true; 
      // Chama a função global do update_user.js para resetar os placeholders
      if (window.updateProfileDOM) window.updateProfileDOM(); 
    };

    $("open-edit-button").addEventListener("click", () => { 
      panel.classList.add("is-open"); 
      panel.setAttribute("aria-hidden", "false"); 
      $("open-edit-button").setAttribute("aria-expanded", "true"); 
      $("profile-first-name").focus(); 
    });

    ["close-edit-button", "cancel-edit-button"].forEach((id) => 
      $(id).addEventListener("click", () => { reset(); close(); })
    );

    form.addEventListener("input", () => { 
      save.disabled = ![...form.elements].some((field) => field.value.trim()); 
    });

    form.addEventListener("submit", (event) => { 
      event.preventDefault(); 
      dialog.hidden = false; 
    });

    $("cancel-save-button").addEventListener("click", () => { 
      dialog.hidden = true; 
    });

    $("confirm-save-button").addEventListener("click", async () => { 
      const btn = $("confirm-save-button");
      btn.textContent = "Salvando...";
      btn.disabled = true;

      // 1. Extrai todos os valores do formulário e filtra os vazios
      const values = Object.fromEntries(new FormData(form).entries());
      const updatedData = {};
      Object.keys(values).forEach((key) => {
        if (values[key].trim() !== "") {
          updatedData[key] = values[key].trim();
        }
      });

      try {
        const token = localStorage.getItem("access_token");
        
        // 2. VERIFICA A ROLE DO USUÁRIO
        const userRole = typeof window.getRoleFromToken === 'function' 
            ? window.getRoleFromToken() 
            : localStorage.getItem('user_role');

        // 3. DEFINE A ROTA CORRETA BASEADA NA ROLE
        const endpoint = userRole === 'pj' 
            ? 'http://127.0.0.1:5000/update_enterprise_data' 
            : 'http://127.0.0.1:5000/update_employee_data';
        
        // 4. Envia os dados filtrados para a rota no Flask
        const response = await fetch(endpoint, {
            method: 'PUT', // Ou POST, dependendo de como você criar no Python
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            // Se o banco atualizou, atualizamos o objeto global do update_user.js
            Object.assign(window.currentUserProfile, updatedData);
            
            // Refaz a renderização do HTML com os dados novos
            if (window.updateProfileDOM) window.updateProfileDOM();
            
            // Se o usuário atualizou o nome, também forçamos a Navbar a atualizar
            if (updatedData.name && window.renderSidebar) {
                localStorage.setItem('user_display_name', updatedData.name);
                window.renderSidebar(); 
            }
            
            dialog.hidden = true; 
            reset(); 
            close();
        } else {
            const result = await response.json();
            alert(`Erro ao atualizar perfil: ${result.message}`);
            dialog.hidden = true;
        }
      } catch (error) {
        console.error("Erro na requisição de atualização:", error);
        alert("Erro de conexão ao tentar salvar os dados.");
      } finally {
        btn.textContent = "Confirmar";
        btn.disabled = false;
      }
    });
  }

  function addReport(report) { reports.unshift(report); renderReports(); }
  function initLogout() {
    $("logout-button").addEventListener("click", async () => {
      const btn = $("logout-button");
      
      // Feedback visual opcional enquanto o backend processa
      btn.textContent = "Saindo...";
      btn.disabled = true;

      try {
        // 1. Chama a rota no backend para limpar os cookies (se houver)
        await fetch('http://127.0.0.1:5000/logout', {
            method: 'POST',
            credentials: 'include'
        });
      } catch (error) {
        console.error("Erro ao fazer logout no servidor:", error);
      } finally {
        // 2. Limpa os dados do LocalStorage garantindo que saia do sistema
        // mesmo se a internet cair na hora do fetch
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_display_name");
        
        // 3. Redireciona para a tela de login
        window.location.href = "../../public/index.html"; // Ajuste o caminho se sua index não estiver nesta pasta raiz
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => { renderProfile(); renderReports(); setPlaceholders(); initEditing(); initLogout(); });
  window.profileReports = { add: addReport, list: reports };
})();