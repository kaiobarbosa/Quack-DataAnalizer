const loginForm = document.querySelector('#login-form');
const typeButtons = document.querySelectorAll('.type-button');

typeButtons.forEach(button => {


button.addEventListener('click', () => {

    // Remove o estado ativo dos dois botões
    typeButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });

    // Ativa o botão selecionado
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

});


});

loginForm.addEventListener('submit', (event) => {


event.preventDefault();

// Identifica qual tipo está selecionado
const selectedType = document.querySelector('.type-button.active').dataset.type;

console.log('Tipo selecionado:', selectedType);


// Pessoa física
if (selectedType === 'physical') {
    loginPhysical();
}


// Pessoa jurídica
else if (selectedType === 'legal') {
    loginEnterprise();
}


});

// ============================================================
// LOGIN EMPRESA
// ============================================================


async function loginEnterprise() {

    console.log('Iniciando login de empresa...');

    const email_enterprise = document.getElementById('login-email-or-cnpj').value;
    const password_enterprise = document.getElementById('login-password').value;

    const enterprise_data = {
        cnpj: email_enterprise,
        password: password_enterprise
    };

    console.log('Dados de login da empresa:', enterprise_data);

    try {

        const response = await fetch('http://127.0.0.1:5000/login_enterprise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enterprise_data)
        });

        const result = await response.json();

        if (!response.ok) {
            alert(`Erro: ${result.message}`);
        }

    } catch (error) {

        console.error('Erro de conexão com o servidor:', error);

        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');

    }


}

// ============================================================
// LOGIN PESSOA FÍSICA
// ============================================================

async function loginPhysical() {

const email_physical = document.getElementById('login-email').value;
const password_physical = document.getElementById('login-password').value;

const physical_data = {
    email: email_physical,
    password: password_physical
};

try {

    const response = await fetch('http://127.0.0.1:5000/login_physical', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(physical_data)
    });

    const result = await response.json();

    if (!response.ok) {
        alert(`Erro: ${result.message}`);
    }

} catch (error) {

    console.error('Erro de conexão com o servidor:', error);

    alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');

}


}