/* ===================================
   Loan Management
=================================== */

let loans =
JSON.parse(localStorage.getItem("loans")) || [];

let editLoanIndex = -1;

/* =============================== */

function initLoans(){

    loadLoanCustomers();

    loadLoanGuarantors();

    renderLoans();

    document.getElementById("addLoanBtn").onclick=openLoan;

    document.getElementById("closeLoan").onclick=closeLoan;

    document.getElementById("saveLoan").onclick=saveLoan;

    document.getElementById("loanAmount").oninput=calculateLoan;

    document.getElementById("loanInterest").oninput=calculateLoan;

    document.getElementById("loanMonths").oninput=calculateLoan;

    document.getElementById("searchLoan").onkeyup=function(){

        const value=this.value.toLowerCase();

        const filtered=loans.filter(l=>

            l.createdBy===localStorage.getItem("currentUser") &&

            (

                l.customer.toLowerCase().includes(value)

                ||

                l.id.toLowerCase().includes(value)

            )

        );

        renderLoans(filtered);

    };

}
function openLoan(){

    editLoanIndex=-1;

    document.getElementById("loanModal").classList.remove("hidden");

    document.getElementById("loanTitle").innerText="Create Loan";

    document.getElementById("loanID").value=createLoanID();

    document.getElementById("loanDate").value=
    new Date().toISOString().split("T")[0];

    calculateLoan();

}

function closeLoan(){

    document.getElementById("loanModal").classList.add("hidden");

}

function createLoanID(){

    return "LOAN"+String(loans.length+1).padStart(6,"0");

}
function loadLoanCustomers(){

    const select = document.getElementById("loanCustomer");

    if(!select) return;

    const currentUser = localStorage.getItem("currentUser");

    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    select.innerHTML = '<option value="">Select Customer</option>';

    customers
    .filter(c => c.createdBy === currentUser)
    .forEach(c => {

        select.innerHTML += `
            <option value="${c.id}">
                ${c.id} - ${c.name}
            </option>
        `;

    });

}

function loadLoanGuarantors(){

    const select = document.getElementById("loanGuarantor");

    if(!select) return;

    const currentUser = localStorage.getItem("currentUser");

    const guarantors = JSON.parse(localStorage.getItem("guarantors")) || [];

    select.innerHTML = '<option value="">Select Guarantor</option>';

    guarantors
    .filter(g => g.createdBy === currentUser)
    .forEach(g => {

        select.innerHTML += `
            <option value="${g.id}">
                ${g.id} - ${g.name}
            </option>
        `;

    });

}
function calculateLoan(){

    const amount=
    Number(document.getElementById("loanAmount").value)||0;

    const interest=
    Number(document.getElementById("loanInterest").value)||0;

    const months=
    Number(document.getElementById("loanMonths").value)||1;

    const interestAmount=
    amount*interest/100;

    const total=
    amount+interestAmount;

    const emi=
    total/months;

    document.getElementById("interestAmount").innerText=
    interestAmount.toFixed(2);

    document.getElementById("totalAmount").innerText=
    total.toFixed(2);

    document.getElementById("emiAmount").innerText=
    emi.toFixed(2);

}
function saveLoan(){

    const amount = Number(document.getElementById("loanAmount").value);
    const interest = Number(document.getElementById("loanInterest").value);
    const months = Number(document.getElementById("loanMonths").value);

    if(document.getElementById("loanCustomer").value===""){

        alert("Select Customer");

        return;

    }

    if(document.getElementById("loanGuarantor").value===""){

        alert("Select Guarantor");

        return;

    }

    if(amount<=0){

        alert("Enter Loan Amount");

        return;

    }

    const interestAmount = amount * interest / 100;

    const total = amount + interestAmount;

    const emi = total / months;

    const loan={

        id:document.getElementById("loanID").value,

        customerId: document.getElementById("loanCustomer").value,

guarantorId: document.getElementById("loanGuarantor").value,

        amount:amount,

        interest:interest,

        months:months,

        interestAmount:interestAmount,

        totalAmount:total,

        emi:emi,

        balance:total,

        date:document.getElementById("loanDate").value,

        status:document.getElementById("loanStatus").value,

        createdBy:localStorage.getItem("currentUser")

    };

    if(editLoanIndex==-1){

        loans.push(loan);

    }else{

        loans[editLoanIndex]=loan;

        editLoanIndex=-1;

    }

    localStorage.setItem("loans",JSON.stringify(loans));

    closeLoan();

    renderLoans();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}
function renderLoans(list=null){

    const currentUser=localStorage.getItem("currentUser");

    const data=(list||loans).filter(l=>

        l.createdBy===currentUser

    );

    const table=document.getElementById("loanTable");

    if(!table) return;

    if(data.length===0){

        table.innerHTML=`
        <tr>
        <td colspan="8" style="text-align:center">
        No Loans Found
        </td>
        </tr>
        `;

        return;

    }

    let html="";

    data.forEach(l=>{

        html+=`

        <tr>

        <td>${l.id}</td>

        <td>${getCustomerName(l.customerId)}</td>

        <td>₹ ${l.amount.toFixed(2)}</td>

        <td>${l.interest}%</td>

        <td>₹ ${l.emi.toFixed(2)}</td>

        <td>₹ ${l.balance.toFixed(2)}</td>

        <td>${l.status}</td>

        <td>

<button class="btn btn-info"
onclick="openLoanLedger('${l.id}')">

Ledger

</button>

<button class="btn btn-success"
onclick="openLoanCard('${l.id}')">

Loan Card

</button>

<button class="btn btn-warning"
onclick="openPromissory('${l.id}')">

Promissory

</button>

<button class="btn btn-primary"
onclick="editLoan(${loans.indexOf(l)})">

Edit

</button>

<button class="btn btn-danger"
onclick="deleteLoan(${loans.indexOf(l)})">

Delete

</button>

</td>

        </tr>

        `;

    });

    table.innerHTML=html;

}
function editLoan(index){

    editLoanIndex=index;

    const l=loans[index];

    document.getElementById("loanModal").classList.remove("hidden");

    document.getElementById("loanTitle").innerText="Edit Loan";

    document.getElementById("loanID").value=l.id;

    document.getElementById("loanCustomer").value=l.customer;

    document.getElementById("loanGuarantor").value=l.guarantor;

    document.getElementById("loanAmount").value=l.amount;

    document.getElementById("loanInterest").value=l.interest;

    document.getElementById("loanMonths").value=l.months;

    document.getElementById("loanDate").value=l.date;

    document.getElementById("loanStatus").value=l.status;

    calculateLoan();

}
function deleteLoan(index){

    if(!confirm("Delete Loan?"))

        return;

    loans.splice(index,1);

    localStorage.setItem("loans",JSON.stringify(loans));

    renderLoans();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}
/* ===================================
   Loan Documents
=================================== */

function openLoanCard(id){

    localStorage.setItem("selectedLoan", id);

    loadPage("💳 Loan Card");

}

function openPromissory(id){

    localStorage.setItem("selectedLoan", id);

    loadPage("📄 Promissory");

}

function openLoanLedger(id){

    localStorage.setItem("selectedLoan", id);

    loadPage("📖 Loan Ledger");

}
function getCustomerName(id){

    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    const customer = customers.find(c => c.id === id);

    return customer ? customer.name : "-";

}

function getGuarantorName(id){

    const guarantors = JSON.parse(localStorage.getItem("guarantors")) || [];

    const guarantor = guarantors.find(g => g.id === id);

    return guarantor ? guarantor.name : "-";

}