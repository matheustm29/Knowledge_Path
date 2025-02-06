document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const clearFields = document.getElementById("clearFields");
    const clearAll = document.getElementById("clearAll");
    const searchInput = document.getElementById("searchInput");

   
    const loadUsers = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";
        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${user.date} - ${user.name} (${user.email})
                <button data-index="${index}" class="deleteBtn">Excluir</button>
            `;
            userList.appendChild(li);
        });
    };

  
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        if (!name || !email) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const date = new Date().toLocaleString();

        users.push({ name, email, date });
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
        userForm.reset();
    });


    clearFields.addEventListener("click", () => {
        userForm.reset();
    });

 
    clearAll.addEventListener("click", () => {
        localStorage.removeItem("users");
        loadUsers();
    });

    userList.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteBtn")) {
            const index = e.target.getAttribute("data-index");
            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            loadUsers();
        }
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";

        users
            .filter(user => 
                user.name.toLowerCase().includes(query) || 
                user.email.toLowerCase().includes(query)
            )
            .forEach((user, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${user.date} - ${user.name} (${user.email})
                    <button data-index="${index}" class="deleteBtn">Excluir</button>
                `;
                userList.appendChild(li);
            });
    });

    loadUsers();
});

