let currentPage = 1;
const rowsPerPage = 5;
let tableData = [];
let editingIndex = -1; 

function openModal() {
    resetModal(); 
    document.getElementById("addModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addModal").style.display = "none";
    editingIndex = -1; 
}

function resetModal() {
    document.getElementById("tripDate").value = "";
    document.getElementById("driver").value = "";
    document.getElementById("broker").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("containerNo").value = "";
    document.getElementById("blRefNo").value = "";
    document.getElementById("status").value = "";
    document.getElementById("cashAdvance").value = "";
    document.getElementById("additionalCashAdvance").value = "";
    document.getElementById("totalAmount").value = ""; 
}


function calculateTotalAmount() {
    let cashAdvance = parseFloat(document.getElementById("cashAdvance").value) || 0;
    let additionalCashAdvance = parseFloat(document.getElementById("additionalCashAdvance").value) || 0;
    document.getElementById("totalAmount").value = cashAdvance + additionalCashAdvance;
}


document.getElementById("cashAdvance").addEventListener("input", calculateTotalAmount);
document.getElementById("additionalCashAdvance").addEventListener("input", calculateTotalAmount);

function submitForm() {
    let tripLogId = document.getElementById("tripLogId").value; 
    let tripDate = document.getElementById("tripDate").value.trim();
    let driver = document.getElementById("driver").value.trim();
    let broker = document.getElementById("broker").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let containerNo = document.getElementById("containerNo").value.trim();
    let blRefNo = document.getElementById("blRefNo").value.trim();
    let status = document.getElementById("status").value.trim();
    let cashAdvance = parseFloat(document.getElementById("cashAdvance").value) || 0;
    let additionalCashAdvance = parseFloat(document.getElementById("additionalCashAdvance").value) || 0;
    let totalAmount = cashAdvance + additionalCashAdvance;

    if (!tripDate || !driver || !broker || !destination || !containerNo || !blRefNo || !status) {
        alert("Please fill in all required fields.");
        return;
    }

    let tripData = {
        TripLogId: tripLogId ? parseInt(tripLogId) : null, 
        Date: tripDate,
        Driver: driver,
        BrokerClient: broker,
        Destination: destination,
        ContainerNo: containerNo,
        BLRefNo: blRefNo,
        Status: status,
        CashAdvance: cashAdvance,
        AdditionalCashAdvance: additionalCashAdvance,
        TotalAmount: totalAmount
    };

    fetch(`/TripLogs/${tripLogId ? 'Edit' : 'Add'}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData)
    })
    .then(response => response.json())
    .then(data => {
        alert(tripLogId ? "Trip Log Updated!" : "Trip Log Added!");
        location.reload(); 
    })
    .catch(error => console.error("Error submitting trip log:", error));

    closeModal();
}



function updateTable() {
    let table = document.getElementById("tripLogTable");

    table.innerHTML = `
        <li class="table-header">
            <div class="col col-1">Date</div>
            <div class="col col-3">Driver</div>
            <div class="col col-4">Broker/Client</div>
            <div class="col col-5">Destination</div>
            <div class="col col-6">Container No.</div>
            <div class="col col-7">BL REF NO.</div>
            <div class="col col-8">Status</div>
            <div class="col col-8">Cash Advance</div>
            <div class="col col-8">Additional Cash Advance</div>
            <div class="col col-8">Total Amount</div>
            <div class="col col-8">Actions</div>
        </li>`;

    tableData.forEach((item, index) => {
        let row = document.createElement("li");
        row.className = "table-row";
        row.innerHTML = `
            <div class="col col-1">${item.tripDate}</div>
            <div class="col col-3">${item.driver}</div>
            <div class="col col-4">${item.broker}</div>
            <div class="col col-5">${item.destination}</div>
            <div class="col col-6">${item.containerNo}</div>
            <div class="col col-7">${item.blRefNo}</div>
            <div class="col col-8">${item.status}</div>
            <div class="col col-8">Php ${item.cashAdvance.toFixed(2)}</div>
            <div class="col col-8">Php ${item.additionalCashAdvance.toFixed(2)}</div>
            <div class="col col-8">Php ${item.totalAmount.toFixed(2)}</div>
            <div class="col col-8 actions">
                <button class="btn btn-warning" onclick="editEntry(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteEntry(${index})">Delete</button>
            </div>
        `;
        table.appendChild(row);
    });

    document.getElementById("pageNumber").innerText = `Page ${currentPage}`;
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage * rowsPerPage >= tableData.length;
}

function openEditModal(tripId) {

    fetch(`/TripLogs/GetTrip?id=${tripId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("editTripLogId").value = data.tripLogId;
            document.getElementById("editDate").value = data.date.split('T')[0];
            document.getElementById("editDriver").value = data.driver;
            document.getElementById("editBrokerClient").value = data.brokerClient;
            document.getElementById("editDestination").value = data.destination;
            document.getElementById("editContainerNo").value = data.containerNo;
            document.getElementById("editBLRefNo").value = data.blRefNo;
            document.getElementById("editStatus").value = data.status;
            document.getElementById("editCashAdvance").value = data.cashAdvance;
            document.getElementById("editAdditionalCashAdvance").value = data.additionalCashAdvance;
            document.getElementById("editTotalAmount").value = data.cashAdvance + data.additionalCashAdvance;

            document.getElementById("editModal").style.display = "flex";
        })
        .catch(error => console.error("Error loading trip log:", error));
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

updateTable();