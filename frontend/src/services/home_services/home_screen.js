document.addEventListener("DOMContentLoaded", () => {
     
    fetchDataEnterprise()

});


async function fetchDataEnterprise() {
    try {
        // Pega o token salvo no login
        const token = localStorage.getItem('access_token');

        const response = await fetch('http://127.0.0.1:5001/select_enterprise_data', {
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

            // Agora você tem cada informação salva em variáveis independentes!
            console.log("Nome da Empresa:", name_enterprise);
            console.log("CNPJ da Empresa:", cnpj_enterprise);
            console.log("Email da Empresa:", email_enterprise);

        } else {
            console.error("Erro de autorização:", result.message);
            // Se o token estiver expirado ou inválido, redireciona pro login 
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }

}