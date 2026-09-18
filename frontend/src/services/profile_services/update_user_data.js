// Objeto global para armazenar os dados do usuário atual.
window.currentUserProfile = {
    name: "",
    lastname: "",
    role: "",
    department: "",
    email: ""
};

document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderProfile();
});

async function fetchAndRenderProfile() {
    const token = localStorage.getItem('access_token');
    
    // Tenta usar a função global, se não achar, busca direto no localStorage
    const userRole = typeof window.getRoleFromToken === 'function' 
        ? window.getRoleFromToken() 
        : localStorage.getItem('user_role');

    if (!token || !userRole) {
        console.error("Sessão inválida. Usuário ou token não encontrados.");
        return;
    }

    const endpoint = userRole === 'pj' 
        ? 'http://127.0.0.1:5000/select_enterprise_data' 
        : 'http://127.0.0.1:5000/select_employee_data';

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            
            if (userRole === 'pf') {
                // AJUSTE AQUI: Ordem exata retornada pelo backend!
                const [name, lastname, role, department, email] = result.entity;
                window.currentUserProfile = { name, lastname, role, department, email };
                
            } else if (userRole === 'pj') {
                const [name_enterprise, cnpj, email] = result.entity;
                window.currentUserProfile = { 
                    name: name_enterprise, 
                    lastname: "", 
                    role: "Administrador (Empresa)", 
                    department: "Sede Principal",
                    email: email 
                };
            }

            updateProfileDOM();
        } else {
            console.error("Erro ao buscar dados do usuário:", await response.text());
        }
    } catch (error) {
        console.error("Erro de conexão ao buscar perfil:", error);
    }
}

function updateProfileDOM() {
    const p = window.currentUserProfile;
    const fullName = [p.name, p.lastname].filter(Boolean).join(" ") || "Usuário";

    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text || "Não informado";
    };

    setElementText("profile-name", fullName);
    setElementText("profile-full-name", fullName);
    
    // Mostra o cargo e o ID do departamento (ou o nome fictício se for PJ)
    setElementText("profile-role", p.role);
    setElementText("profile-department", p.department); 
    
    setElementText("profile-email", p.email);
    
    const avatarEl = document.getElementById("profile-avatar");
    if (avatarEl) {
        avatarEl.textContent = fullName.charAt(0).toUpperCase();
    }

    const fields = { 
        name: "profile-first-name", 
        lastname: "profile-last-name", 
        role: "profile-job", 
        department: "profile-department-input", 
        email: "profile-email-input" 
    };
    
    Object.entries(fields).forEach(([key, id]) => { 
        const input = document.getElementById(id);
        if (input) input.placeholder = p[key] || "Não informado"; 
    });
}

window.updateProfileDOM = updateProfileDOM;