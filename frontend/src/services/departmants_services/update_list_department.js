document.addEventListener("DOMContentLoaded", () => {
    selectAllDepartments();
});

async function selectAllDepartments() {

    try {
        const token = localStorage.getItem('access_token');

        const response = await fetch('http://127.0.0.1:5000/select_all_departments', {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log("Dados carregados com sucesso!", result);

            // ============================================================
            // INJETANDO OS DADOS NA TELA
            // ============================================================
            
            // 1. Pega o Array que veio do backend
            const departamentos = result.entity;

            // 2. Passa por cada departamento dentro do Array
            departamentos.forEach((departamento) => {
                // Preste atenção na chave: "name_departmant" (exatamente como veio no JSON)
                const nome = departamento.name_departmant;

                // 3. Chama a ponte que criamos no outro arquivo para desenhar na tela!
                if (window.inserirDepartamentoNaLista) {
                    window.inserirDepartamentoNaLista(nome);
                }
            });

        } else {
            console.error("Erro de autorização:", result.message);
        }

    } catch (error) {
        console.error('Erro de conexão:', error);
    }
}
