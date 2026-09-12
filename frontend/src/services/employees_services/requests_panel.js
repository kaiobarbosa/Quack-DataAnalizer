document.addEventListener("DOMContentLoaded", () => {
    get_all_requests();
});

async function get_all_requests() {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch('http://127.0.0.1:5000/get_all_requests', {
            method: 'GET',
            // Lembre-se: se der erro de CORS no Electron, pode remover o credentials: 'include'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log("Pedidos recebidos com sucesso:", result.entity);
            
            const solicitacoes = result.entity;

            // Verifica se o retorno é um array e itera sobre ele
            if (Array.isArray(solicitacoes)) {
                solicitacoes.forEach(pedido => {
                    // Chama a função exposta no employees_screen.js mapeando as chaves
                    window.addEmployeeRequest({
                        id: pedido.id_user,
                        name: pedido.name_user,
                        lastName: pedido.lastname_user, 
                        role: pedido.function_user,
                        department: pedido.departmant_user, // Aqui ele vai renderizar o ID do departamento por enquanto
                        email: pedido.email_user
                    });
                });
            }
            
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
}
