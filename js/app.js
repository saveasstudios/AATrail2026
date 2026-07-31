/* ===================================
   AARVEE ASSOCIATES
   Main Application
=================================== */

// ---------- Login Check ----------

const loggedIn = localStorage.getItem("loggedIn");
const currentUser = localStorage.getItem("currentUser");

if (loggedIn !== "true" || !currentUser) {
    window.location.href = "index.html";
}

// ---------- Elements ----------

const userName = document.getElementById("userName");
const pageTitle = document.getElementById("pageTitle");
const content = document.getElementById("content");
const menuItems = document.querySelectorAll(".menu li");

// ---------- Display User ----------

if (userName) {
    userName.innerText =
        localStorage.getItem("userName") || "Administrator";
}

// ---------- Sidebar ----------

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(m => m.classList.remove("active"));

        this.classList.add("active");

        const page = this.innerText.trim();

        pageTitle.innerText = page.replace(/^[^\w]+/, "").trim();

        loadPage(page);

    });

});

// ---------- Load Pages ----------

function loadPage(page) {

    switch (page) {

        // ================= Dashboard =================

        case "🏠 Dashboard":

            fetch("modules/dashboard.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initDashboard === "function") {
                        initDashboard();
                    }

                });

            break;
            case "📑 Agreement":

    fetch("modules/agreement.html")
        .then(r => r.text())
        .then(html => {

            content.innerHTML = html;

            if (typeof initAgreement === "function") {
                initAgreement();
            }

        });

    break;
    case "🧾 Receipt":

    fetch("modules/receipt.html")
        .then(r => r.text())
        .then(html => {

            content.innerHTML = html;

            if (typeof initReceipt === "function") {
                initReceipt();
            }

        });

    break;
    case "👤 Customer Profile":

    fetch("modules/customer-profile.html")
        .then(r => r.text())
        .then(html => {

            content.innerHTML = html;

            if (typeof initCustomerProfile === "function") {
                initCustomerProfile();
            }

        });

    break;
    case "💾 Backup & Restore":

    loadModule(
        "modules/backup.html",
        "js/backup.js"
    );

break;

        // ================= Groups =================

        case "👥 Groups":

            fetch("modules/groups.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initGroups === "function") {
                        initGroups();
                    }

                });

            break;

        // ================= Customers =================

        case "🧑 Customers":

            fetch("modules/customers.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initCustomers === "function") {
                        initCustomers();
                    }

                });

            break;

        // ================= Guarantors =================

        case "🛡 Guarantors":

            fetch("modules/guarantors.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initGuarantors === "function") {
                        initGuarantors();
                    }

                });

            break;
                    // ================= Loans =================

        case "💰 Loans":

            fetch("modules/loans.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initLoans === "function") {
                        initLoans();
                    }

                });

            break;

        // ================= Collections =================

        case "📅 Collections":

            fetch("modules/collections.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initCollections === "function") {
                        initCollections();
                    }

                });

            break;

        // ================= Loan Ledger =================

        case "📖 Loan Ledger":

            fetch("modules/ledger.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initLedger === "function") {
                        initLedger();
                    }

                });

            break;

        // ================= Loan Card =================

        case "💳 Loan Card":

            fetch("modules/loan-card.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initLoanCard === "function") {
                        initLoanCard();
                    }

                });

            break;

        // ================= Promissory =================

        case "📄 Promissory":

            fetch("modules/promissory.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initPromissory === "function") {
                        initPromissory();
                    }

                });

            break;
                    // ================= Reports =================

        case "📊 Reports":

            fetch("modules/reports.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                    if (typeof initReports === "function") {
                        initReports();
                    }

                });

            break;

        // ================= Settings =================

        case "⚙ Settings":

            fetch("modules/settings.html")
                .then(r => r.text())
                .then(html => {

                    content.innerHTML = html;

                });

            break;

        // ================= Default =================

        default:

            content.innerHTML = `
                <div class="card">
                    <h2>Page Not Found</h2>
                    <br>
                    <p>The requested module was not found.</p>
                </div>
            `;

            break;

    }

}

// ---------- Default Page ----------

loadPage("🏠 Dashboard");
