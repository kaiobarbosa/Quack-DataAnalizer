document.addEventListener("DOMContentLoaded", () => {
     
    fetchDataEnterprise()

});


async function fetchDataEnterprise() {

    try {
        // Pega o token salvo no login
        const token = localStorage.getItem('access_token');

        const response = await fetch('http://127.0.0.1:5000/select_enterprise_data', {
            method: 'GET',
            // O credentials: 'include' ainda fica para a Web, não atrapalha o Electron
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                // Envia o token como Bearer (Para o Electron)
                'Authorization': `Bearer ${token}` 
            }
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Dados carregados com sucesso!", result);
            
            const [name_enterprise, cnpj_enterprise, email_enterprise] = result.entity;

            console.log("Nome da Empresa:", name_enterprise);
            console.log("CNPJ da Empresa:", cnpj_enterprise);
            console.log("Email da Empresa:", email_enterprise);

            // ============================================================
            // ATUALIZANDO A NAVBAR
            // ============================================================
            
            // 1. Seleciona a tag <strong> onde fica o nome do usuário
            const profileNameElement = document.querySelector('#profile-button .profile-copy strong');
            
            // 2. Seleciona o "Avatar" (onde está a letra 'U')
            const profileAvatarElement = document.querySelector('#profile-button .profile-avatar');

            // 3. Verifica se os elementos existem na tela para evitar erros
            if (profileNameElement) {
                // Troca 'user' pelo nome da empresa retornado do banco
                profileNameElement.textContent = name_enterprise; 
            }

            if (profileAvatarElement && name_enterprise) {
                // Pega a primeira letra do nome da empresa e deixa maiúscula para o Avatar
                profileAvatarElement.textContent = name_enterprise.charAt(0).toUpperCase();
            }

        } else {
            console.error("Erro de autorização:", result.message);
            // Se o token estiver expirado ou inválido, redireciona pro login 
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }

}