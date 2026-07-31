/* ===================================
   Dashboard Module
=================================== */

function initDashboard() {

    updateDashboard();

}

/* =============================== */

function updateDashboard() {

    const groups =
        JSON.parse(localStorage.getItem("groups")) || [];

    const totalGroups =
    document.getElementById("totalGroups");

if (totalGroups)
    totalGroups.innerText = groups.length;    

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const loans =
        JSON.parse(localStorage.getItem("loans")) || [];

    const collections =
        JSON.parse(localStorage.getItem("collections")) || [];

    const totalCustomers =
        document.getElementById("totalCustomers");

    if (totalCustomers)
        totalCustomers.innerText = customers.length;

    const activeLoans =
        document.getElementById("activeLoans");

    if (activeLoans)
        activeLoans.innerText =
            loans.filter(l => l.status === "Active").length;

    const todayCollection =
        document.getElementById("todayCollection");

    if (todayCollection) {

        let total = 0;

        const today =
            new Date().toISOString().split("T")[0];

        collections.forEach(c => {

            if (c.date === today) {

                total += Number(c.amount);

            }

        });

        todayCollection.innerText =
            "₹" + total.toLocaleString();

    }

    const outstanding =
        document.getElementById("outstanding");

    if (outstanding) {

        let balance = 0;

        loans.forEach(l => {

            balance += Number(l.balance || 0);

        });

        outstanding.innerText =
            "₹" + balance.toLocaleString();

    }

}
document.addEventListener("DOMContentLoaded", loadDashboard);

function loadDashboard(){

    const currentUser = localStorage.getItem("currentUser");

    const settings = JSON.parse(localStorage.getItem("settings")) || {};

    document.getElementById("companyTitle").innerText =
        settings.companyName || "AARVEE ASSOCIATES";

    document.getElementById("welcomeUser").innerText =
        "Welcome, " + currentUser;

    const customers =
        (JSON.parse(localStorage.getItem("customers")) || [])
        .filter(x => x.createdBy === currentUser);

    const loans =
        (JSON.parse(localStorage.getItem("loans")) || [])
        .filter(x => x.createdBy === currentUser);

    const collections =
        (JSON.parse(localStorage.getItem("collections")) || [])
        .filter(x => x.createdBy === currentUser);

    const emis =
        (JSON.parse(localStorage.getItem("emis")) || [])
        .filter(x => x.createdBy === currentUser);

    document.getElementById("totalCustomers").innerText =
        customers.length;

    document.getElementById("activeLoans").innerText =
        loans.filter(x => x.status === "Active").length;

    let outstanding = loans.reduce(
        (sum, x) => sum + Number(x.balance || 0),
        0
    );

    document.getElementById("outstanding").innerText =
        "₹" + outstanding.toLocaleString();

    const today = new Date().toLocaleDateString();

    let todayTotal = collections
        .filter(x => new Date(x.paymentDate).toLocaleDateString() === today)
        .reduce((sum, x) => sum + Number(x.amount), 0);

    document.getElementById("todayCollection").innerText =
        "₹" + todayTotal.toLocaleString();

    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    let monthTotal = collections
        .filter(x => {
            let d = new Date(x.paymentDate);
            return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, x) => sum + Number(x.amount), 0);

    document.getElementById("monthCollection").innerText =
        "₹" + monthTotal.toLocaleString();

    const overdue = emis.filter(x => {
        return x.status === "Pending" &&
               new Date(x.dueDate) < new Date();
    });

    document.getElementById("overdueCount").innerText =
        overdue.length;

    renderRecentLoans(loans);

    renderRecentCollections(collections);

}

function renderRecentLoans(loans){

    const tbody =
        document.getElementById("recentLoans");

    tbody.innerHTML = "";

    loans.slice(-5).reverse().forEach(l => {

        tbody.innerHTML += `
        <tr>
            <td>${l.id}</td>
            <td>${l.customerName || l.customer}</td>
            <td>₹${Number(l.amount).toLocaleString()}</td>
        </tr>`;
    });

}

function renderRecentCollections(data){

    const tbody =
        document.getElementById("recentCollections");

    tbody.innerHTML = "";

    data.slice(-5).reverse().forEach(c => {

        tbody.innerHTML += `
        <tr>
            <td>${c.receiptNo}</td>
            <td>${c.customerName || "-"}</td>
            <td>₹${Number(c.amount).toLocaleString()}</td>
        </tr>`;
    });

}