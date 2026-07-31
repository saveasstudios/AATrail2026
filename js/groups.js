/* ===================================
   Group Management
=================================== */

let groups =
JSON.parse(localStorage.getItem("groups")) || [];

let editGroupIndex = -1;

/* ============================= */

function initGroups(){

    renderGroups();

    document.getElementById("addGroupBtn").onclick=openGroupModal;

    document.getElementById("closeGroup").onclick=closeGroupModal;

    document.getElementById("saveGroup").onclick=saveGroup;

    document.getElementById("searchGroup").onkeyup=function(){

        const value=this.value.toLowerCase();

        const filtered=groups.filter(g=>

            g.name.toLowerCase().includes(value) ||

            g.village.toLowerCase().includes(value)

        );

        renderGroups(filtered);

    };

}

/* ============================= */

function openGroupModal(){

    editGroupIndex=-1;

    document.getElementById("groupModalTitle").innerText="Add Group";

    document.getElementById("groupModal").classList.remove("hidden");

    document.getElementById("groupID").value=createGroupID();

    document.getElementById("groupName").value="";

    document.getElementById("groupVillage").value="";

    document.getElementById("groupMembers").value=1;

    document.getElementById("groupStatus").value="Active";

}

/* ============================= */

function closeGroupModal(){

    document.getElementById("groupModal").classList.add("hidden");

}

/* ============================= */

function createGroupID(){

    return "GRP"+String(groups.length+1).padStart(6,"0");

}

/* ============================= */

function saveGroup(){

    const id=document.getElementById("groupID").value;

    const name=document.getElementById("groupName").value.trim();

    const village=document.getElementById("groupVillage").value.trim();

    const members=document.getElementById("groupMembers").value;

    const status=document.getElementById("groupStatus").value;

    if(name===""){

        alert("Enter Group Name");

        return;

    }

    if(village===""){

        alert("Enter Village");

        return;

    }

    const data={

        id,
        name,
        village,
        members,
        status

    };

    if(editGroupIndex===-1){

        groups.push(data);

    }else{

        groups[editGroupIndex]=data;

        editGroupIndex=-1;

    }

    localStorage.setItem(

        "groups",

        JSON.stringify(groups)

    );

    closeGroupModal();

    renderGroups();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}
function renderGroups(list=groups){

    const table=document.getElementById("groupTable");

    if(!table) return;

    if(list.length===0){

        table.innerHTML=`
        <tr>
        <td colspan="6" style="text-align:center">
        No Groups Found
        </td>
        </tr>
        `;

        return;

    }

    let html="";

    list.forEach((g,index)=>{

        html+=`

        <tr>

            <td>${g.id}</td>
            <td>${g.name}</td>
            <td>${g.village}</td>
            <td>${g.members}</td>
            <td>${g.status}</td>

            <td>

                <button
                class="btn btn-primary"
                onclick="editGroup(${index})">

                Edit

                </button>

                <button
                class="btn btn-danger"
                onclick="deleteGroup(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    table.innerHTML=html;

}

/* ============================= */

function editGroup(index){

    editGroupIndex=index;

    const g=groups[index];

    document.getElementById("groupModalTitle").innerText="Edit Group";

    document.getElementById("groupModal").classList.remove("hidden");

    document.getElementById("groupID").value=g.id;

    document.getElementById("groupName").value=g.name;

    document.getElementById("groupVillage").value=g.village;

    document.getElementById("groupMembers").value=g.members;

    document.getElementById("groupStatus").value=g.status;

}

/* ============================= */

function deleteGroup(index){

    if(!confirm("Delete this group?"))

        return;

    groups.splice(index,1);

    localStorage.setItem(

        "groups",

        JSON.stringify(groups)

    );

    renderGroups();

    if(typeof updateDashboard==="function"){

        updateDashboard();

    }

}