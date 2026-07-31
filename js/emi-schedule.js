document.addEventListener("DOMContentLoaded", loadEMISchedule);

function loadEMISchedule() {

    const loanId = localStorage.getItem("selectedLoan");

    if (!loanId) return;

    const loans = JSON.parse(localStorage.getItem("loans")) || [];

    const loan = loans.find(x => x.id === loanId);

    if (!loan) return;

    generateSchedule(loan);

}

function generateSchedule(loan) {

    const tbody = document.getElementById("emiTableBody");

    tbody.innerHTML = "";

    let balance = Number(loan.totalAmount);

    let emi = Number(loan.emi);

    let principal = Number(loan.amount) / Number(loan.months);

    let interest = (Number(loan.totalAmount) - Number(loan.amount)) / Number(loan.months);

    let start = new Date(loan.loanDate);

    for (let i = 1; i <= loan.months; i++) {

        let due = new Date(start);

        due.setMonth(due.getMonth() + i);

        balance -= emi;

        tbody.innerHTML += `

        <tr>

            <td>${i}</td>

            <td>${due.toLocaleDateString()}</td>

            <td>₹${emi.toFixed(2)}</td>

            <td>₹${principal.toFixed(2)}</td>

            <td>₹${interest.toFixed(2)}</td>

            <td>₹0.00</td>

            <td>₹${Math.max(balance,0).toFixed(2)}</td>

            <td>
                <span class="badge badge-warning">
                    Pending
                </span>
            </td>

        </tr>

        `;

    }

}

function printEMISchedule() {

    window.print();

}