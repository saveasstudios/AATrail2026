/* ===========================================
   PRINT.JS
   AARVEE ASSOCIATES LMS
=========================================== */

function printPage(title = "Print") {

    document.title = title;

    window.print();

}

function printLoanCard() {

    printPage("Loan Card");

}

function printPromissory() {

    const printContent = document.getElementById("printArea").outerHTML;

    const win = window.open("", "_blank", "width=900,height=1000");

    win.document.write(`
    <html>
    <head>
        <title>Promissory Note</title>

        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;500;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="css/print.css">
    </head>

    <body>

        ${printContent}

    </body>

    </html>
    `);

    win.document.close();

    win.focus();

    setTimeout(function(){

        win.print();

        win.close();

    },500);

}

function printAgreement() {

    printPage("Loan Agreement");

}

function printLedger() {

    printPage("Loan Ledger");

}

function printReceipt() {

    printPage("Receipt");

}

function printCustomerProfile() {

    printPage("Customer Profile");

}

/* Optional Print Section */

function printElement(elementId, title = "Print") {

    const element = document.getElementById(elementId);

    if (!element) {

        alert("Print area not found.");

        return;

    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>

            <title>${title}</title>

            <style>

                body{
                    font-family:Arial,sans-serif;
                    margin:20px;
                    color:#000;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                }

                table,
                th,
                td{
                    border:1px solid #000;
                }

                th,
                td{
                    padding:8px;
                    text-align:left;
                }

                img{
                    max-width:100%;
                }

            </style>

        </head>

        <body>

            ${element.innerHTML}

        </body>

        </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();

}