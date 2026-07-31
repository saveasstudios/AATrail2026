/*==========================================
 AARVEE ASSOCIATES
 Authentication Module
==========================================*/

const DEFAULT_USERS = [
    {
        id: 1,
        username: "vivek",
        password: "2710",
        name: "Vivek",
        role: "Admin"
    },
    {
        id: 2,
        username: "generol",
        password: "1234",
        name: "Generol",
        role: "Staff"
    },
    {
        id: 3,
        username: "rasak",
        password: "0786",
        name: "Rasak",
        role: "Staff"
    }
];

initUsers();

/*==========================================
 Initialize Users
==========================================*/

function initUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(DEFAULT_USERS)
    );

}

/*==========================================
 Login
==========================================*/

function login(e){

    if(e) e.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    alert(JSON.stringify(users));

    const user = users.find(function(u){
        return u.username.toLowerCase() === username &&
               u.password === password;
    });

    if(!user){
        alert("User Not Found");
        return false;
    }

    alert("Login Success");

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loggedIn","true");
    localStorage.setItem("userName",user.name);

    location.href="app.html";

    return false;
}

/*==========================================
 Logout
==========================================*/

function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");

    window.location.href = "index.html";

}

/*==========================================
 Check Login
==========================================*/

function checkLogin() {

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!user) {

        window.location.href = "index.html";
        return;

    }

    const userName = document.getElementById("loggedUser");

    if (userName) {

        userName.innerHTML =
            user.name + " (" + user.role + ")";

    }

}

/*==========================================
 Current User
==========================================*/

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

/*==========================================
 User ID
==========================================*/

function getCurrentUserId() {

    const user = getCurrentUser();

    return user ? user.id : null;

}

/*==========================================
 Username
==========================================*/

function getCurrentUsername() {

    const user = getCurrentUser();

    return user ? user.username : "";

}