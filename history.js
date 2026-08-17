const historyBody = document.getElementById("historyBody");


// Load parking history
const parkingHistory = JSON.parse(
    localStorage.getItem("parkingHistory")
) || [];


// Total revenue
let totalRevenue = 0;


// Display history
parkingHistory.forEach(function(record) {

    const row = document.createElement("tr");

    const entryTime = new Date(record.entryTime);
    const exitTime = new Date(record.exitTime);

    row.innerHTML = `
        <td>${record.plate}</td>
        <td>${record.name}</td>
        <td>${record.contact}</td>
        <td>${entryTime.toLocaleString()}</td>
        <td>${exitTime.toLocaleString()}</td>
        <td>${record.duration} hour(s)</td>
        <td>AU$${record.amount.toFixed(2)}</td>
    `;

    historyBody.appendChild(row);

    totalRevenue += record.amount;

});


// Display total revenue
document.getElementById("totalRevenue").textContent =
    "Total Revenue: AU$" + totalRevenue.toFixed(2);


// Download PDF
document.getElementById("downloadPDF").addEventListener(
    "click",
    function() {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF("landscape");


        // PDF title
        doc.setFontSize(20);

        doc.text(
            "Parking Management System",
            14,
            15
        );


        doc.setFontSize(14);

        doc.text(
            "Parking History",
            14,
            25
        );


        // Create table
        doc.autoTable({

            html: "#historyTable",

            startY: 35,

            theme: "grid",

            styles: {
                fontSize: 8
            },

            headStyles: {
                fontSize: 9
            }

        });


        // Total revenue
        const finalY = doc.lastAutoTable.finalY + 10;

        doc.setFontSize(12);

        doc.text(
            "Total Revenue: AU$" +
            totalRevenue.toFixed(2),
            14,
            finalY
        );


        // Download
        doc.save("Parking-History.pdf");

    }
);