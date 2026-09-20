window.currentUserProfile = {
    name: "",
    lastname: "",
    role: "",
    department: "",
    email: "",
    cnpj: "" // Adicionado o CNPJ
};

document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderProfile();
});

async function fetchAndRenderProfile() {
    const token = localStorage.getItem('access_token');
    const userRole = typeof window.getRoleFromToken === 'function' 
        ? window.getRoleFromToken() 
        : localStorage.getItem('user_role');

    if (!token || !userRole) return;

    const endpoint = userRole === 'pj' 
        ? 'http://127.0.0.1:5000/select_enterprise_data' 
        : 'http://127.0.0.1:5000/select_employee_data';

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const result = await response.json();
            
            if (userRole === 'pf') {
                const [name, lastname, role, department, email] = result.entity;
                window.currentUserProfile = { name, lastname, role, department, email, cnpj: "" };
            } else if (userRole === 'pj') {
                const [name_enterprise, cnpj, email] = result.entity;
                window.currentUserProfile = { 
                    name: name_enterprise, 
                    lastname: "", 
                    role: "Administrador", 
                    department: "",
                    email: email,
                    cnpj: cnpj // Salva o CNPJ que veio do banco
                };
            }
            updateProfileDOM();
        }
    } catch (error) {
        console.error("Erro de conexão ao buscar perfil:", error);
    }
}

function updateProfileDOM() {
    const p = window.currentUserProfile;
    const userRole = typeof window.getRoleFromToken === 'function' ? window.getRoleFromToken() : localStorage.getItem('user_role');
    
    // Se for PJ, não junta sobrenome
    const fullName = userRole === 'pj' ? p.name : [p.name, p.lastname].filter(Boolean).join(" ") || "Usuário";

    // 1. Controle de Exibição (Esconde e Mostra os campos corretos)
    document.querySelectorAll('.pf-only').forEach(el => el.style.display = userRole === 'pf' ? '' : 'none');
    document.querySelectorAll('.pj-only').forEach(el => el.style.display = userRole === 'pj' ? '' : 'none');

    // 2. Altera os títulos de Nome para Razão Social dinamicamente
    const labelFullName = document.getElementById('label-full-name');
    if (labelFullName) labelFullName.textContent = userRole === 'pj' ? 'Razão Social' : 'Nome completo';
    
    const labelFormName = document.getElementById('label-form-name');
    if (labelFormName) labelFormName.textContent = userRole === 'pj' ? 'Razão Social' : 'Nome';

    // 3. Preenche os dados
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text || "Não informado";
    };

    setElementText("profile-name", fullName);
    setElementText("profile-full-name", fullName);
    setElementText("profile-email", p.email);
    
    if (userRole === 'pf') {
        setElementText("profile-role", p.role);
        setElementText("profile-department", p.department); 
    } else {
        setElementText("profile-role", "Empresa (Matriz)");
        setElementText("profile-cnpj", p.cnpj); 
    }
    
    const avatarEl = document.getElementById("profile-avatar");
    if (avatarEl) avatarEl.textContent = fullName.charAt(0).toUpperCase();

    // 4. Preenche os placeholders do form
    const fields = { 
        name: "profile-first-name", 
        lastname: "profile-last-name", 
        role: "profile-job", 
        department: "profile-department-input", 
        email: "profile-email-input",
        cnpj: "profile-cnpj-input" // Placehoder do CNPJ
    };
    
    Object.entries(fields).forEach(([key, id]) => { 
        const input = document.getElementById(id);
        if (input) input.placeholder = p[key] || "Não informado"; 
    });
}

window.updateProfileDOM = updateProfileDOM;
