document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".auth-panel");
  const tabButtons = document.querySelectorAll(".tab-button");
  const linkButtons = document.querySelectorAll(".link-button");
  const typeButtons = document.querySelectorAll(".type-button");

  load_enterprises()

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

async function load_enterprises() {

  const selectEnterprise = document.getElementById('register-company')

  try{

    const response = await fetch('http://127.0.0.1:5000/select_enterprise_exist', {
        method: 'GET',
        // O credentials: 'include' ainda fica para a Web, não atrapalha o Electron
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const result = await response.json();

    selectEnterprise.innerHTML = '<option value="">Selecione</option>';

    const listaEnterprise = result.entitys || result;

    if (Array.isArray(listaEnterprise)) {
        listaEnterprise.forEach(Empresa => {
            const option = document.createElement('option');
            
            option.value = Empresa.cnpj_enterprise;    
            option.textContent = Empresa.name_enterprise; 
            
            selectEnterprise.appendChild(option);
        });
    } else {
        console.error("Formato inesperado: os dados não contêm um array.", result);
    }

  }catch (error){
    console.error('Erro de conexão com o servidor:', error);
    alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
  }
  
}

const selectEnterprise = document.getElementById('register-company');
const selectDepartamento = document.getElementById('register-department');

// Fica escutando qualquer mudança no select de departamentoss
selectEnterprise.addEventListener('change', async (event) => {
    
    // Pega o CNPJ da departamentos que o usuário acabou de selecionar
    const cnpjSelecionado = event.target.value;
    
    // Reseta o select de departamentos (caso ele troque de departamentos, os departamentos antigos somem)
    selectDepartamento.innerHTML = '<option value="">Selecione o departamento</option>';

    if (!cnpjSelecionado) {
        selectDepartamento.disabled = true; 
        return; 
    }

    selectDepartamento.disabled = false;

        try {
        const response = await fetch(`http://127.0.0.1:5000/get_departments_by_enterprise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cnpjSelecionado)
        });

        const result = await response.json();

        // CORREÇÃO 1: Mudando de 'entitys' para 'entity'
        const listaDepartamentos = result.entity || result;
       
        if (Array.isArray(listaDepartamentos)) {
            listaDepartamentos.forEach(departamento => { // mudei para singular aqui para ficar mais semântico
                const option = document.createElement('option');
                
                option.value = departamento.id_departmant;    
                option.textContent = departamento.name_departmant; 
                
                // CORREÇÃO 2: Nome exato da variável (D maiúsculo, sem s)
                selectDepartamento.appendChild(option);
            });
        } else {
            console.error("Formato inesperado: os dados não contêm um array.", result);
        }
    } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
    }
});