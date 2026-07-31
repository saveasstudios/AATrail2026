/* ==========================================
   AARVEE ASSOCIATES
   PROMISSORY NOTE
========================================== */

let pnLoans = [];
let pnCustomers = [];
let pnGroups = [];

let selectedLoan = null;
let selectedCustomer = null;
let selectedGroup = null;

/* ==========================================
   INITIALIZE
========================================== */

function initPromissory() {

    pnLoans = JSON.parse(localStorage.getItem("loans")) || [];

    pnCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    pnGroups = JSON.parse(localStorage.getItem("groups")) || [];

    const loanId = localStorage.getItem("selectedLoanId");

    if (!loanId) {

        alert("No Loan Selected");

        return;

    }

    selectedLoan = pnLoans.find(
        l => String(l.id) === String(loanId)
    );

    if (!selectedLoan) {

        alert("Loan Not Found");

        return;

    }

    selectedCustomer = pnCustomers.find(
        c => String(c.id) === String(selectedLoan.customerId)
    ) || {};

    selectedGroup = pnGroups.find(
        g => String(g.id) === String(selectedLoan.groupId)
    ) || {};

    loadPromissory();

}
/* ==========================================
   LOAD PROMISSORY
========================================== */

function loadPromissory() {

    document.getElementById("pnDate").textContent =
        selectedLoan.loanDate || "-";

    document.getElementById("pnCustomerName").textContent =
        selectedCustomer.name || "-";

    document.getElementById("pnBorrowerName").textContent =
        selectedCustomer.name || "-";

    document.getElementById("pnFatherName").textContent =
        selectedCustomer.fatherName ||
        selectedCustomer.father ||
        "-";

    document.getElementById("pnAddress").textContent =
        selectedCustomer.address || "-";

    document.getElementById("pnMobile").textContent =
        selectedCustomer.mobile ||
        selectedCustomer.phone ||
        "-";

    document.getElementById("pnLoanAmount").textContent =
        Number(
            selectedLoan.loanAmount || 0
        ).toLocaleString("en-IN");

    document.getElementById("pnInterest").textContent =
        selectedLoan.interest || 0;

    document.getElementById("pnAmountWords").textContent =
        amountInWords(
            Number(selectedLoan.loanAmount || 0)
        );

    if (selectedCustomer.photo)
        document.getElementById("pnPhoto").src =
            selectedCustomer.photo;

    if (selectedCustomer.aadhaarFront)
        document.getElementById("pnAadhaarFront").src =
            selectedCustomer.aadhaarFront;

    if (selectedCustomer.aadhaarBack)
        document.getElementById("pnAadhaarBack").src =
            selectedCustomer.aadhaarBack;

}
/* ==========================================
   PRINT
========================================== */

function printPromissory(){

    window.print();

}

/* ==========================================
   AMOUNT TO WORDS
========================================== */

function amountInWords(amount){

    if(amount===0)
        return "Zero Rupees Only";

    return amount.toLocaleString("en-IN") + " Rupees Only";

}