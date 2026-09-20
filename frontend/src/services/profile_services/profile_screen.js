(function () {
  const reports = [
    { title: "Análise de erros da aplicação", date: "15/09/2026", department: "Inteligência de dados" },
    { title: "Relatório de acessos do sistema", date: "12/09/2026", department: "Monitoramento" },
    { title: "Resumo de eventos críticos", date: "08/09/2026", department: "Operações" }
  ];
  
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[c]));

  function renderReports() {
    $("report-count").textContent = `${reports.length} ${reports.length === 1 ? "relatório" : "relatórios"}`;
    $("reports-grid").innerHTML = reports.length ? reports.map((report) => `<button class="report-card" type="button" title="Abrir relatório futuramente"><span class="report-card-icon" aria-hidden="true">▤</span><span><strong>${escapeHtml(report.title)}</strong><small>${escapeHtml(report.date)}</small></span><span class="report-card-meta"><span>${escapeHtml(report.department)}</span><span aria-hidden="true">→</span></span></button>`).join("") : '<p class="empty-reports">Nenhum relatório criado até o momento.</p>';
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

      const userRole = typeof window.getRoleFromToken === 'function' 
            ? window.getRoleFromToken() 
            : localStorage.getItem('user_role');

      const fullData = { ...window.currentUserProfile };
      const values = Object.fromEntries(new FormData(form).entries());
      
      // Define quais campos são permitidos para cada tipo de conta
      const allowedKeys = userRole === 'pj' 
            ? ['name', 'cnpj', 'email'] 
            : ['name', 'lastname', 'role', 'department', 'email'];
      
      // Atualiza o fullData apenas com o que o usuário digitou E que for permitido pra ele
      Object.keys(values).forEach((key) => {
        if (allowedKeys.includes(key) && values[key].trim() !== "") {
          fullData[key] = values[key].trim();
        }
      });

      // Monta o payload final que será enviado ao Python (limpo)
      const finalPayload = {};
      allowedKeys.forEach(k => finalPayload[k] = fullData[k]);

      try {
        const token = localStorage.getItem("access_token");
        const endpoint = userRole === 'pj' 
            ? 'http://127.0.0.1:5000/update_enterprise_data' 
            : 'http://127.0.0.1:5000/update_employee_data';
        
        const response = await fetch(endpoint, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(finalPayload) // Envia o payload exato pro Flask
        });

        if (response.ok) {
            Object.assign(window.currentUserProfile, fullData);
            if (window.updateProfileDOM) window.updateProfileDOM();
            
            if (fullData.name && window.renderSidebar) {
                localStorage.setItem('user_display_name', fullData.name);
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
        console.error("Erro na requisição:", error);
        alert("Erro de conexão ao tentar salvar.");
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
      btn.textContent = "Saindo...";
      btn.disabled = true;

      try {
        await fetch('http://127.0.0.1:5000/logout', {
            method: 'POST',
            credentials: 'include'
        });
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_display_name");
        window.location.href = "../../public/index.html";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => { 
      // Repare que as funções estáticas de teste foram deletadas daqui
      renderReports(); 
      initEditing(); 
      initLogout(); 
  });
  
  window.profileReports = { add: addReport, list: reports };
})();
