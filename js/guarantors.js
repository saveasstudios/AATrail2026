/* ===================================
   Guarantor Management
=================================== */

let guarantors =
JSON.parse(localStorage.getItem("guarantors")) || [];

let editGuarantorIndex = -1;

/* =============================== */

function initGuarantors(){

    loadCustomerList();

    renderGuarantors();

    document.getElementById("addGuarantorBtn").onclick=openGuarantor;

    document.getElementById("closeGuarantor").onclick=closeGuarantor;

    document.getElementById("saveGuarantor").onclick=saveGuarantor;

    document.getElementById("searchGuarantor").onkeyup=function(){

        const value=this.value.toLowerCase();

        const filtered=guarantors.filter(g=>

            g.createdBy===localStorage.getItem("currentUser") &&

            (
                g.name.toLowerCase().includes(value) ||

                g.mobile.includes(value)
            )

        );

        renderGuarantors(filtered);

    };

}

/* =============================== */

function openGuarantor(){

    editGuarantorIndex=-1;

    document.getElementById("guarantorTitle").innerText="Add Guarantor";

    document.getElementById("guarantorModal").classList.remove("hidden");

    document.getElementById("guarantorID").value=createGuarantorID();

}

/* =============================== */

function closeGuarantor(){

    document.getElementById("guarantorModal").classList.add("hidden");

}

/* =============================== */

function createGuarantorID(){

    return "GUA"+String(guarantors.length+1).padStart(6,"0");

}

/* =============================== */

function loadCustomerList(){

    const select=document.getElementById("guarantorCustomer");

    if(!select) return;

    const currentUser=localStorage.getItem("currentUser");

    const customers=
    JSON.parse(localStorage.getItem("customers")) || [];

    select.innerHTML='<option value="">Select Customer</option>';

    customers
    .filter(c=>c.createdBy===currentUser)
    .forEach(c=>{

        select.innerHTML+=`

        <option value="${c.name}">

            ${c.name}

        </option>

        `;

    });

}

/* =============================== */

function saveGuarantor(){

    const guarantor={

        id:document.getElementById("guarantorID").value,

        name:document.getElementById("guarantorName").value.trim(),

        mobile:document.getElementById("guarantorMobile").value.trim(),

        customer:document.getElementById("guarantorCustomer").value,

        status:document.getElementById("guarantorStatus").value,

        createdBy:localStorage.getItem("currentUser")

    };

    if(guarantor.name===""){

        alert("Enter Guarantor Name");

        return;

    }

    if(!/^[0-9]{10}$/.test(guarantor.mobile)){

        alert("Enter Valid Mobile Number");

        return;

    }

    if(editGuarantorIndex===-1){

        guarantors.push(guarantor);

    }else{

        guarantors[editGuarantorIndex]=guarantor;

        editGuarantorIndex=-1;

    }

    localStorage.setItem(

        "guarantors",

        JSON.stringify(guarantors)

    );

    closeGuarantor();

    renderGuarantors();

}
function renderGuarantors(list=null){

    const currentUser=localStorage.getItem("currentUser");

    const data=(list || guarantors).filter(g=>

        g.createdBy===currentUser

    );

    const table=document.getElementById("guarantorTable");

    if(!table) return;

    if(data.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="6">

        No Guarantors Found

        </td>

        </tr>

        `;

        return;

    }

    let html="";

    data.forEach(g=>{

        html+=`

        <tr>

        <td>${g.id}</td>

        <td>${g.name}</td>

        <td>${g.mobile}</td>

        <td>${g.customer}</td>

        <td>${g.status}</td>

        <td>

        <button
        onclick="editGuarantor(${guarantors.indexOf(g)})">

        Edit

        </button>

        <button
        onclick="deleteGuarantor(${guarantors.indexOf(g)})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    table.innerHTML=html;

}
function editGuarantor(index){

    editGuarantorIndex=index;

    const g=guarantors[index];

    document.getElementById("guarantorTitle").innerText="Edit Guarantor";

    document.getElementById("guarantorModal").classList.remove("hidden");

    document.getElementById("guarantorID").value=g.id;

    document.getElementById("guarantorName").value=g.name;

    document.getElementById("guarantorMobile").value=g.mobile;

    document.getElementById("guarantorCustomer").value=g.customer;

    document.getElementById("guarantorStatus").value=g.status;

}

function deleteGuarantor(index){

    if(!confirm("Delete Guarantor?"))

        return;

    guarantors.splice(index,1);

    localStorage.setItem(

        "guarantors",

        JSON.stringify(guarantors)

    );

    renderGuarantors();

}