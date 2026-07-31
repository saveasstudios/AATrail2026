document.addEventListener("DOMContentLoaded", () => {

    showBackupInfo();

});

function exportBackup() {

    const backup = {

        settings: JSON.parse(localStorage.getItem("settings")) || {},

        groups: JSON.parse(localStorage.getItem("groups")) || [],

        customers: JSON.parse(localStorage.getItem("customers")) || [],

        guarantors: JSON.parse(localStorage.getItem("guarantors")) || [],

        loans: JSON.parse(localStorage.getItem("loans")) || [],

        emis: JSON.parse(localStorage.getItem("emis")) || [],

        collections: JSON.parse(localStorage.getItem("collections")) || []

    };

    const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download =
        "AARVEE_Backup_" +
        new Date().toISOString().slice(0, 10) +
        ".json";

    link.click();

}

function importBackup() {

    const file =
        document.getElementById("backupFile").files[0];

    if (!file) {

        alert("Please select a backup file.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const data = JSON.parse(e.target.result);

            Object.keys(data).forEach(key => {

                localStorage.setItem(
                    key,
                    JSON.stringify(data[key])
                );

            });

            alert("Backup restored successfully.");

            location.reload();

        }

        catch {

            alert("Invalid backup file.");

        }

    };

    reader.readAsText(file);

}

function clearDatabase() {

    if (!confirm("Are you sure you want to delete all data?")) return;

    const users = localStorage.getItem("users");

    localStorage.clear();

    if (users)
        localStorage.setItem("users", users);

    alert("Database reset completed.");

    location.reload();

}

function showBackupInfo() {

    const size =
        ((JSON.stringify(localStorage).length) / 1024).toFixed(2);

    console.log("Database Size:", size + " KB");

}