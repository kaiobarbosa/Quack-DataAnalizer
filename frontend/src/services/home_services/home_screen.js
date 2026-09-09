document.addEventListener("DOMContentLoaded", () => {
     
    fetchDataEnterprise()

});


async function fetchDataEnterprise() {

    try {
        const response = await fetch('http://127.0.0.1:5000/select_enterprise_data', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
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