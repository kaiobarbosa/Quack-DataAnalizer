const btn_register = document.getElementById("register-button");

btn_register.addEventListener("click", async (event) => {
    event.preventDefault();

    const name_enterprise = document.getElementById('register-company-name').value;
    const cnpj_enterprise = document.getElementById('register-cnpj').value;
    const email_enterprise = document.getElementById('register-email').value;
    const password_enterprise = document.getElementById('register-password').value;

    const userData = {
        name: name_enterprise,
        cnpj: cnpj_enterprise,
        email: email_enterprise,
        password: password_enterprise
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/create_user_pj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Cadastro realizado com sucesso!');
        } else {
            alert('Ops! Erro ao cadastrar: ' + (result.erro || 'Verifique os dados'));
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
});