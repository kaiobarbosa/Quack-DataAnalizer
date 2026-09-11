// Apenas as seleções essenciais para o clique final
const btn_register = document.getElementById("register-button");
const btn_switch_physical = document.getElementById("register-physical-button"); 
const btn_switch_enterprise = document.getElementById("register-enterprise-button");

// ============================================================
// LÓGICA DO BOTÃO DE CADASTRAR
// ============================================================
btn_register.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Verifica qual botão possui a classe 'active' (classe que o index_screen.js gerencia!)
    if (btn_switch_physical.classList.contains('active')) {
        register_physical();
    } else if (btn_switch_enterprise.classList.contains('active')) {
        register_enterprise();
    } else {
        alert("Por favor, selecione o tipo de conta que deseja criar.");
    }
});

async function register_enterprise() {
    console.log('Iniciando cadastro de empresa...');

    const name_enterprise = document.getElementById('register-company-name').value;
    const cnpj_enterprise = document.getElementById('register-cnpj').value;
    const email_enterprise = document.getElementById('register-email').value;
    const password_enterprise = document.getElementById('register-password').value;
    const confirm_password_enterprise = document.getElementById('register-confirm-password').value;

    const userData = {
        id: "",   
        name: name_enterprise,
        cnpj: cnpj_enterprise,
        email: email_enterprise,
        password: password_enterprise,
        confirm_password: confirm_password_enterprise
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/create_enterprise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (!response.ok) {
            alert(`Erro: ${result.message}`);
        } else {
            console.log('Cadastro de empresa bem-sucedido:', result);
            window.location.reload(); 
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
}

async function register_physical() {
    console.log('function register employees');

    const name_employee = document.getElementById('register-name').value;
    const lastname_employee = document.getElementById('register-last-name').value;
    const function_employee = document.getElementById('register-role').value;
    const department_employee = document.getElementById('register-department').value;
    const enterprise_employee = document.getElementById('register-company').value; 

    const email_shared = document.getElementById('register-email').value;
    const password_shared = document.getElementById('register-password').value;
    const confirm_password_shared = document.getElementById('register-confirm-password').value;

    const employeeData = {
        name: name_employee,
        lastname: lastname_employee,
        function: function_employee,
        department: department_employee,
        enterprise: enterprise_employee,
        email: email_shared,
        password: password_shared,
        confirmed_password: confirm_password_shared
    };
    
    console.log("Data: ", employeeData);
    
    // Aqui virá o try/catch do fetch para a criação do funcionário!
}
