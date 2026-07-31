/* ===================================
   Customer Profile
=================================== */

let profileCustomer = null;

function initCustomerProfile() {

    const customerId = localStorage.getItem("selectedCustomer");

    if (!customerId) {

        document.getElementById("profileContainer").innerHTML =
            "<h3>No Customer Selected</h3>";

        return;
    }

    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const loans = JSON.parse(localStorage.getItem("loans")) || [];
    const collections = JSON.parse(localStorage.getItem("collections")) || [];

    profileCustomer = customers.find(c => c.id === customerId);

    if (!profileCustomer) {

        document.getElementById("profileContainer").innerHTML =
            "<h3>Customer Not Found</h3>";

        return;
    }

    const customerLoans = loans.filter(l => l.customerId === customerId);

    let html = `

<div class="card">

<h2>${profileCustomer.name}</h2>

<table class="loan-table">

<tr><td>Customer ID</td><td>${profileCustomer.id}</td></tr>

<tr><td>Mobile</td><td>${profileCustomer.mobile}</td></tr>

<tr><td>Village</td><td>${profileCustomer.village}</td></tr>

<tr><td>Address</td><td>${profileCustomer.address}</td></tr>

</table>

<br>

<h3>Loans</h3>

<table class="table">

<thead>

<tr>

<th>Loan ID</th>

<th>Amount</th>

<th>Balance</th>

<th>Status</th>

</tr>

</thead>

<tbody>
`;

    customerLoans.forEach(loan => {

        html += `

<tr>

<td>${loan.id}</td>

<td>₹ ${loan.loanAmount}</td>

<td>₹ ${loan.balance}</td>

<td>${loan.status}</td>

</tr>

`;

    });

    html += `

</tbody>

</table>

</div>

`;

    document.getElementById("profileContainer").innerHTML = html;

}