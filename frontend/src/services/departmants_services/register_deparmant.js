const button_include_deparment = document.getElementById("save-department-button");

button_include_deparment.addEventListener("click", async (event) => {

    const name_deparment = document.getElementById("department-name").value;

    data_department = {
        id_department:"",
        name_deparment:name_deparment,
        cnpj_enterprise:""
    };

    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch('http://127.0.0.1:5000/create_department', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // O token é a "identidade" da empresa
            },
            body: JSON.stringify(data_department) // Enviamos APENAS o nome
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Departamento salvo com sucesso!");
            location.reload()
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (error) {
        console.error('Erro ao salvar departamento:', error);
    }

});