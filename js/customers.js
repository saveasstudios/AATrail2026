/* ===================================
   Customer Management
=================================== */

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

let editCustomerIndex = -1;

/* =============================== */

function initCustomers(){

    loadGroups();

    renderCustomers();

    document.getElementById("addCustomerBtn").onclick=openCustomer;

    document.getElementById("closeCustomer").onclick=closeCustomer;

    document.getElementById("saveCustomer").onclick=saveCustomer;

    document.getElementById("searchCustomer").onkeyup=function(){

        const value=this.value.toLowerCase();

        const filtered=customers.filter(c=>

            c.name.toLowerCase().includes(value) ||

            c.mobile.includes(value)

        );

        renderCustomers(filtered);

    };

}

/* =============================== */

function openCustomer(){

    editCustomerIndex=-1;

    document.getElementById("customerTitle").innerText="Add Customer";

    document.getElementById("customerModal").classList.remove("hidden");

    document.getElementById("customerID").value=createCustomerID();

}

/* =============================== */

function closeCustomer(){

    document.getElementById("customerModal").classList.add("hidden");

}

/* =============================== */

function createCustomerID(){

    return "CUS"+String(customers.length+1).padStart(6,"0");

}

/* =============================== */

function loadGroups(){

    const select=document.getElementById("customerGroup");

    if(!select) return;

    const groups=
    JSON.parse(localStorage.getItem("groups"))||[];

    select.innerHTML='<option value="">Select Group</option>';

    groups.forEach(g=>{

        select.innerHTML+=`
        <option value="${g.name}">
            ${g.name}
        </option>
        `;

    });

}
async function saveCustomer(){
    const photo =
document.getElementById("customerPhoto").files[0];

const aadhaar =
document.getElementById("aadhaarPhoto").files[0];

const pan =
document.getElementById("panPhoto").files[0];

const sign =
document.getElementById("customerSign").files[0];

const customerPhoto =
photo ? await fileToBase64(photo) : "";

const aadhaarPhoto =
aadhaar ? await fileToBase64(aadhaar) : "";

const panPhoto =
pan ? await fileToBase64(pan) : "";

const customerSignature =
sign ? await fileToBase64(sign) : "";

    const customer={

        id:document.getElementById("customerID").value,

        name:document.getElementById("customerName").value.trim(),

        father:document.getElementById("customerFather").value.trim(),

        gender:document.getElementById("customerGender").value,

        dob:document.getElementById("customerDOB").value,

        mobile:document.getElementById("customerMobile").value.trim(),

        aadhaar:document.getElementById("customerAadhaar").value.trim(),

        pan:document.getElementById("customerPAN").value.trim().toUpperCase(),

        group:document.getElementById("customerGroup").value,

        village:document.getElementById("customerVillage").value.trim(),

        address:document.getElementById("customerAddress").value.trim(),

        status: document.getElementById("customerStatus").value,

createdBy: localStorage.getItem("currentUser"),

    };

    if(customer.name===""){

        alert("Enter Customer Name");

        return;

    }

    if(!/^[0-9]{10}$/.test(customer.mobile)){

        alert("Enter Valid Mobile Number");

        return;

    }

    if(customer.aadhaar!=="" && !/^[0-9]{12}$/.test(customer.aadhaar)){

        alert("Enter Valid Aadhaar Number");

        return;

    }

    if(customer.pan!=="" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(customer.pan)){

        alert("Enter Valid PAN Number");

        return;

    }

    const duplicate=customers.find((c,index)=>

        c.mobile===customer.mobile &&

        index!==editCustomerIndex

    );

    if(duplicate){

        alert("Mobile Number Already Exists");

        return;

    }

    if(editCustomerIndex===-1){

        customers.push(customer);

    }else{

        customers[editCustomerIndex]=customer;

        editCustomerIndex=-1;

    }

    localStorage.setItem(

        "customers",

        JSON.stringify(customers)

    );

    closeCustomer();

    renderCustomers();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}

 function renderCustomers(list = null){

    const currentUser = localStorage.getItem("currentUser");

    const myCustomers = (list || customers).filter(c =>
        c.createdBy === currentUser
    );

    const table = document.getElementById("customerTable");

    if(!table) return;

    if(myCustomers.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center">
                No Customers Found
            </td>
        </tr>
        `;

        return;

    }

    let html = "";

    myCustomers.forEach(c => {

        html += `
        <tr>

            <td>${c.id}</td>

            <td>${c.name}</td>

            <td>${c.mobile}</td>

            <td>${c.group}</td>

            <td>${c.village}</td>

            <td>${c.status}</td>

            <td>

<button class="btn btn-info"
onclick="viewCustomer('${c.id}')">

Profile

</button>

<button class="btn btn-success"
onclick="editCustomer(${customers.indexOf(c)})">

Edit

</button>

<button class="btn btn-danger"
onclick="deleteCustomer(${customers.indexOf(c)})">

Delete

</button>

</td>

        </tr>
        `;

    });

    table.innerHTML = html;

}

function deleteCustomer(index){

    if(!confirm("Delete this customer?"))

        return;

    customers.splice(index,1);

    localStorage.setItem(

        "customers",

        JSON.stringify(customers)

    );

    renderCustomers();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}
function editCustomer(index){

    editCustomerIndex=index;

    const c=customers[index];

    document.getElementById("customerTitle").innerText="Edit Customer";

    document.getElementById("customerModal").classList.remove("hidden");

    document.getElementById("customerID").value=c.id;

    document.getElementById("customerName").value=c.name;

    document.getElementById("customerFather").value=c.father;

    document.getElementById("customerGender").value=c.gender;

    document.getElementById("customerDOB").value=c.dob;

    document.getElementById("customerMobile").value=c.mobile;

    document.getElementById("customerAadhaar").value=c.aadhaar;

    document.getElementById("customerPAN").value=c.pan;

    document.getElementById("customerGroup").value=c.group;

    document.getElementById("customerVillage").value=c.village;

    document.getElementById("customerAddress").value=c.address;

    document.getElementById("customerStatus").value=c.status;

}
function viewCustomer(customerId){

    localStorage.setItem("selectedCustomer", customerId);

    loadPage("👤 Customer Profile");

}
<button onclick="openCustomerProfile('${customer.id}')">
    Profile
</button>
function openCustomerProfile(id){

    localStorage.setItem("selectedCustomer", id);

    loadPage("👤 Customer Profile");

}
function fileToBase64(file){

    return new Promise((resolve,reject)=>{

        const reader=new FileReader();

        reader.onload=()=>resolve(reader.result);

        reader.onerror=reject;

        reader.readAsDataURL(file);

    });

}