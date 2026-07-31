/* ===========================================
   AARVEE ASSOCIATES
   Collection Module
=========================================== */

let collections = JSON.parse(localStorage.getItem("collections")) || [];
let loans = JSON.parse(localStorage.getItem("loans")) || [];
let groups = JSON.parse(localStorage.getItem("groups")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];

/* ===========================================
   Initialize
=========================================== */

function initCollections() {

    document.getElementById("collectionDate").valueAsDate = new Date();
    document.getElementById("entryDate").valueAsDate = new Date();

    loadGroups();

    document.getElementById("collectionGroup")
        .addEventListener("change", groupChanged);

    renderCollectionHistory();

    document.getElementById("searchCollection")
        .addEventListener("keyup", searchCollection);
}

/* ===========================================
   Group Changed
=========================================== */

function groupChanged() {

    const groupId =
        document.getElementById("collectionGroup").value;

    const group =
        groups.find(g => g.id == groupId);

    if (!group) {

        document.getElementById("collectionDay").value = "";

        return;
    }

    document.getElementById("collectionDay").value =
        group.collectionDay || group.day || "";
}

/* ===========================================
   Load Groups
=========================================== */

function loadGroups() {

    const select = document.getElementById("collectionGroup");

    select.innerHTML =
        '<option value="">Select Group</option>';

    groups.forEach(group => {

        select.innerHTML += `
            <option value="${group.id}">
                ${group.groupName}
            </option>
        `;

    });

}

/* ===========================================
   Load Collection
=========================================== */

function loadCollection() {

    const groupId =
        document.getElementById("collectionGroup").value;

    if(groupId==""){

        alert("Please Select Group");

        return;

    }

    const groupLoans = loans.filter(l =>

        l.groupId == groupId &&

        l.status=="Active"

    );

    renderCollectionTable(groupLoans);

}
/* ===========================================
   Render Collection Table
=========================================== */

function renderCollectionTable(groupLoans){

    const tbody =
        document.getElementById("collectionTable");

    if(groupLoans.length==0){

        tbody.innerHTML=`
        <tr>
            <td colspan="9" style="text-align:center;padding:30px;">
                No Active Loans Found
            </td>
        </tr>
        `;

        return;

    }

    let html="";

    groupLoans.forEach((loan,index)=>{

        html+=`

        <tr>

            <td>${index+1}</td>

            <td>${loan.id}</td>

            <td>${loan.customer}</td>

            <td>${loan.mobile || "-"}</td>

            <td>₹ ${Number(loan.emi).toFixed(2)}</td>

            <td>

                <input
                    type="number"
                    class="table-input paid"
                    id="paid_${loan.id}"
                    value="${loan.emi}"
                    min="0">

            </td>

            <td>

                <input
                    type="number"
                    class="table-input penalty"
                    id="penalty_${loan.id}"
                    value="0"
                    min="0">

            </td>

            <td>

                ₹ ${Number(loan.balance).toFixed(2)}

            </td>

            <td>

                <span class="badge badge-success">

                    ${loan.status}

                </span>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML=html;

}
/* ===========================================
   Save Collection
=========================================== */

function saveCollection(){

    const groupId =
        document.getElementById("collectionGroup").value;

    if(groupId==""){

        alert("Please Select Group");

        return;

    }

    const collectionDate =
        document.getElementById("collectionDate").value;

    const entryDate =
        document.getElementById("entryDate").value;

    let savedCount = 0;

    loans.forEach(loan=>{

        if(
            loan.groupId==groupId &&
            loan.status=="Active"
        ){

            const paidBox =
                document.getElementById("paid_"+loan.id);

            if(!paidBox) return;

            const penaltyBox =
                document.getElementById("penalty_"+loan.id);

            const paid =
                Number(paidBox.value||0);

            const penalty =
                Number(penaltyBox.value||0);

            if(paid<=0) return;

            const balanceBefore =
                Number(loan.balance);

            loan.balance =
                balanceBefore-paid;

            if(loan.balance<0){

                loan.balance=0;

            }

            if(loan.balance==0){

                loan.status="Closed";

            }

            collections.push({

                id:"COL"+Date.now()+loan.id,

                loanId:loan.id,

                customer:loan.customer,

                groupId:groupId,

                emi:loan.emi,

                paid:paid,

                penalty:penalty,

                balance:loan.balance,

                collectionDate:collectionDate,

                entryDate:entryDate,

                createdBy:
                JSON.parse(localStorage.getItem("currentUser")).username

            });

            savedCount++;

        }

    });

    localStorage.setItem(
        "collections",
        JSON.stringify(collections)
    );

    localStorage.setItem(
        "loans",
        JSON.stringify(loans)
    );

    alert(savedCount+" Collection(s) Saved Successfully");

    renderCollectionHistory();

    loadCollection();

}
/* ===========================================
   Collection History
=========================================== */

function renderCollectionHistory(){

    const tbody =
        document.getElementById("collectionHistory");

    if(!tbody) return;

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser")).username;

    const data = collections.filter(c=>

        c.createdBy==currentUser

    );

    if(data.length==0){

        tbody.innerHTML=`

        <tr>

            <td colspan="5"
                style="text-align:center;padding:25px;">

                No Collections

            </td>

        </tr>

        `;

        return;

    }

    let html="";

    data.reverse().forEach(c=>{

        html+=`

        <tr>

            <td>${c.collectionDate}</td>

            <td>${c.loanId}</td>

            <td>${c.customer}</td>

            <td>₹ ${Number(c.paid).toFixed(2)}</td>

            <td>₹ ${Number(c.balance).toFixed(2)}</td>

        </tr>

        `;

    });

    tbody.innerHTML=html;

}
/* ===========================================
   Search Collection
=========================================== */

function searchCollection(){

    const value =
        this.value.toLowerCase();

    const rows =
        document.querySelectorAll("#collectionHistory tr");

    rows.forEach(row=>{

        row.style.display =

        row.innerText
        .toLowerCase()
        .includes(value)

        ? ""

        : "none";

    });

}