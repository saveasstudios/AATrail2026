/* ===================================
   AARVEE ASSOCIATES
   Reports Module
=================================== */

function initReports() {

    const currentUser = localStorage.getItem("currentUser");

    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const guarantors = JSON.parse(localStorage.getItem("guarantors")) || [];
    const loans = JSON.parse(localStorage.getItem("loans")) || [];
    const collections = JSON.parse(localStorage.getItem("collections")) || [];

    const myGroups = groups.filter(g => g.createdBy === currentUser);
    const myCustomers = customers.filter(c => c.createdBy === currentUser);
    const myGuarantors = guarantors.filter(g => g.createdBy === currentUser);
    const myLoans = loans.filter(l => l.createdBy === currentUser);
    const myCollections = collections.filter(c => c.createdBy === currentUser);

    let totalLoan = 0;
    let totalCollection = 0;
    let outstanding = 0;

    myLoans.forEach(loan => {

        totalLoan += Number(loan.loanAmount || 0);
        outstanding += Number(loan.balance || 0);

    });

    myCollections.forEach(col => {

        totalCollection += Number(col.amount || 0);

    });

    document.getElementById("reportContent").innerHTML = `

    <div class="report-grid">

        <div class="report-card">
            <h3>Total Groups</h3>
            <h1>${myGroups.length}</h1>
        </div>

        <div class="report-card">
            <h3>Total Customers</h3>
            <h1>${myCustomers.length}</h1>
        </div>

        <div class="report-card">
            <h3>Total Guarantors</h3>
            <h1>${myGuarantors.length}</h1>
        </div>

        <div class="report-card">
            <h3>Total Loans</h3>
            <h1>${myLoans.length}</h1>
        </div>

        <div class="report-card">
            <h3>Loan Amount</h3>
            <h1>₹ ${totalLoan.toLocaleString()}</h1>
        </div>

        <div class="report-card">
            <h3>Collection</h3>
            <h1>₹ ${totalCollection.toLocaleString()}</h1>
        </div>

        <div class="report-card">
            <h3>Outstanding</h3>
            <h1>₹ ${outstanding.toLocaleString()}</h1>
        </div>

    </div>

    `;

}
document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("fromDate").valueAsDate=new Date();

    document.getElementById("toDate").valueAsDate=new Date();

});

function generateReport(){

    const type=document.getElementById("reportType").value;

    switch(type){

        case "customer":
            customerReport();
            break;

        case "loan":
            loanReport();
            break;

        case "collection":
            collectionReport();
            break;

        case "outstanding":
            outstandingReport();
            break;

        case "overdue":
            overdueReport();
            break;

        case "ledger":
            ledgerReport();
            break;

        case "emi":
            emiReport();
            break;

        case "guarantor":
            guarantorReport();
            break;

    }

}

function printReport(){

    window.print();

}

function exportExcel(){

    alert("Excel Export Coming Next");

}

function exportPDF(){

    alert("PDF Export Coming Next");

}