/* ===========================================
   AARVEE ASSOCIATES
   LOAN CARD
=========================================== */

/* ===========================================
   AARVEE ASSOCIATES
   LOAN CARD
=========================================== */

let loans = [];
let customers = [];
let groups = [];
let collections = [];

let selectedLoan = null;
let selectedCustomer = null;
let selectedGroup = null;

/* ===========================================
   INITIALIZE
=========================================== */

function initLoanCard() {

    loans =
        JSON.parse(localStorage.getItem("loans")) || [];

    customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    groups =
        JSON.parse(localStorage.getItem("groups")) || [];

    collections =
        JSON.parse(localStorage.getItem("collections")) || [];

    const loanId =
        localStorage.getItem("selectedLoanId");

    if (!loanId) {

        showMessage(
            "No Loan Selected"
        );

        return;

    }

    selectedLoan =
        loans.find(l => String(l.id) === String(loanId));

    if (!selectedLoan) {

        showMessage(
            "Loan Not Found"
        );

        return;

    }

    selectedCustomer =
        customers.find(c =>
            String(c.id) === String(selectedLoan.customerId)
        ) || {};

    selectedGroup =
        groups.find(g =>
            String(g.id) === String(selectedLoan.groupId)
        ) || {};

    loadLoanCard();

}

/* ===========================================
   MESSAGE
=========================================== */

function showMessage(message){

    document.getElementById("loanCardContainer").innerHTML = `

        <div style="
            padding:60px;
            text-align:center;
            font-size:22px;
            color:#d32f2f;
            font-weight:bold;
        ">

            ${message}

        </div>

    `;

}
/* ===========================================
   LOAD LOAN CARD
=========================================== */

function loadLoanCard() {

    if (!selectedLoan) return;

    // Customer Details
    document.getElementById("lcLoanNo").textContent =
        selectedLoan.loanNo || selectedLoan.id || "-";

    document.getElementById("lcCustomerName").textContent =
        selectedCustomer.name || "-";

    document.getElementById("lcGroup").textContent =
        selectedGroup.name || "-";

    document.getElementById("lcMobile").textContent =
        selectedCustomer.mobile ||
        selectedCustomer.phone ||
        "-";

    // Loan Details
    document.getElementById("lcLoanDate").textContent =
        selectedLoan.loanDate || "-";

    const loanAmount =
        Number(selectedLoan.loanAmount || 0);

    const interest =
        Number(selectedLoan.interest || 0);

    const totalAmount =
        Number(
            selectedLoan.totalAmount ||
            (loanAmount + (loanAmount * interest / 100))
        );

    document.getElementById("lcLoanAmount").textContent =
        loanAmount.toLocaleString("en-IN");

    document.getElementById("lcInterest").textContent =
        interest;

    document.getElementById("lcTotalAmount").textContent =
        totalAmount.toLocaleString("en-IN");

    // Calculate Collection Amount
    const paidAmount = collections
        .filter(c =>
            String(c.loanId) === String(selectedLoan.id)
        )
        .reduce((sum, c) =>
            sum + Number(c.amount || c.paid || 0),
            0
        );

    const balance = totalAmount - paidAmount;

    document.getElementById("lcBalance").textContent =
        balance.toLocaleString("en-IN");

    // Load EMI History
    loadEMITable();

}/* ===========================================
   LOAD EMI TABLE
=========================================== */

function loadEMITable() {

    const tbody =
        document.getElementById("emiCardRows");

    tbody.innerHTML = "";

    // Collections for this loan
    const loanCollections = collections.filter(c =>
        String(c.loanId) === String(selectedLoan.id)
    );

    // Sort by collection date
    loanCollections.sort((a, b) =>
        new Date(a.collectionDate || a.date) -
        new Date(b.collectionDate || b.date)
    );

    let totalPaid = 0;

    loanCollections.forEach((item, index) => {

        const amount =
            Number(item.amount || item.paid || 0);

        totalPaid += amount;

        tbody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.collectionDate || item.date || "-"}</td>

                <td>₹ ${amount.toLocaleString("en-IN")}</td>

                <td></td>

            </tr>

        `;

    });

    // Fill remaining rows (up to 30)
    const remainingRows = 30 - loanCollections.length;

    for (let i = 0; i < remainingRows; i++) {

        tbody.innerHTML += `

            <tr>

                <td>${loanCollections.length + i + 1}</td>

                <td></td>

                <td></td>

                <td></td>

            </tr>

        `;

    }

    // Total Collection
    document.getElementById("emiTotal").textContent =
        "₹ " + totalPaid.toLocaleString("en-IN");

}
/* ===========================================
   PRINT LOAN CARD
=========================================== */

function printLoanCard() {

    window.print();

}

/* ===========================================
   FORMAT CURRENCY
=========================================== */

function formatCurrency(value) {

    return Number(value || 0).toLocaleString("en-IN");

}

/* ===========================================
   FORMAT DATE
=========================================== */

function formatDate(date) {

    if (!date) return "-";

    try {

        return new Date(date).toLocaleDateString("en-IN");

    } catch (e) {

        return date;

    }

}

/* ===========================================
   PAGE LOAD
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoanCard();

});