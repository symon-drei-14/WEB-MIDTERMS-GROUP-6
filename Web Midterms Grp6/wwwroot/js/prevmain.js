let currentPage = 1;
const rowsPerPage = 5;
let tableData = [];

function openModal() {
    // Fetch the next ID from the server or use what's already in the field
    document.getElementById("truckId").value = "T-";
    document.getElementById("addModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addModal").style.display = "none";
    clearFields();
}

function submitForm() {
    let maintenanceId = parseInt(document.getElementById("maintenanceId").value.trim());
    let truckId = document.getElementById("truckId").value.trim();
    let licensePlate = document.getElementById("licensePlate").value.trim();
    let dateOfInspection = document.getElementById("dateOfInspection").value.trim();
    let remarks = document.getElementById("remarks").value.trim();
    let status = document.getElementById("status").value.trim();
    let supplier = document.getElementById("supplier").value.trim();
    let cost = document.getElementById("cost").value.trim();

    if (!maintenanceId || !truckId || !licensePlate || !dateOfInspection || !remarks || !status || !supplier || !cost) {
        alert("Please fill in all fields.");
        return;
    }

    let newEntry = {
        maintenanceId: maintenanceId,
        truckId: truckId,
        licensePlate: licensePlate,
        dateOfInspection: dateOfInspection,
        remarks: remarks,
        status: status,
        supplier: supplier,
        cost: parseFloat(cost)
    };

    // Get the token from the meta tag if it exists, or use jQuery's setup
    let token = null;
    const tokenMeta = document.querySelector('meta[name="__RequestVerificationToken"]');
    if (tokenMeta) {
        token = tokenMeta.getAttribute('content');
    } else if (typeof $ !== 'undefined' && $('input:hidden[name="__RequestVerificationToken"]').length > 0) {
        token = $('input:hidden[name="__RequestVerificationToken"]').val();
    }

    // Prepare headers
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['RequestVerificationToken'] = token;
    }

    // Send data to the server
    fetch('/PreventiveMaintenance/AddRecord', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newEntry)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Close the modal
                closeModal();
                // Refresh the page to show the updated data
                window.location.reload();
            } else {
                if (data.errors && data.errors.length > 0) {
                    alert("Error: " + data.errors.join(", "));
                } else {
                    alert("An error occurred while saving the record.");
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again. Details: " + error.message);
        });
}

function updateTable() {
    const rows = document.querySelectorAll("#maintenanceTable .table-row");
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
        row.style.display = (index >= start && index < end) ? "" : "none";
    });

    document.getElementById("pageNumber").innerText = `Page ${currentPage}`;
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = end >= rows.length;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

function nextPage() {
    const rows = document.querySelectorAll("#maintenanceTable .table-row");
    if (currentPage * rowsPerPage < rows.length) {
        currentPage++;
        updateTable();
    }
}

function clearFields() {
    document.querySelectorAll(".modal input:not(#maintenanceId)").forEach(input => input.value = "");
    document.getElementById("truckId").value = "T-";
}

function openHistoryModal() {
    document.getElementById("historyModal").style.display = "flex";
}

function closeHistoryModal() {
    document.getElementById("historyModal").style.display = "none";
}

function showHistory() {
    let selectedTruck = document.getElementById("historyTruckId").value;
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    // Clear the list if no truck selected
    if (!selectedTruck) {
        historyList.innerHTML = "<li>Please select a truck to view history.</li>";
        return;
    }

    // Fetch history from the server
    fetch(`/PreventiveMaintenance/GetHistory?truckId=${selectedTruck}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                // Add header row
                historyList.innerHTML = `
                    <li class="table-header">
                        <div class="col col-1">Maintenance ID</div>
                        <div class="col col-2">Truck ID</div>
                        <div class="col col-3">Date of Inspection</div>
                        <div class="col col-4">Remarks</div>
                        <div class="col col-5">Status</div>
                        <div class="col col-6">Supplier</div>
                        <div class="col col-7">Cost</div>
                    </li>
                `;

                // Add data rows
                data.forEach(item => {
                    let li = document.createElement("li");
                    li.className = "table-row";
                    li.innerHTML = `
                        <div class="col col-1">${item.maintenanceId}</div>
                        <div class="col col-2">${item.truckId}</div>
                        <div class="col col-3">${new Date(item.dateOfInspection).toISOString().split('T')[0]}</div>
                        <div class="col col-4">${item.remarks}</div>
                        <div class="col col-5">${item.status}</div>
                        <div class="col col-6">${item.supplier}</div>
                        <div class="col col-7">Php${item.cost}</div>
                    `;
                    historyList.appendChild(li);
                });
            } else {
                historyList.innerHTML = "<li>No history found for this truck.</li>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            historyList.innerHTML = "<li>Error loading history data: " + error.message + "</li>";
        });
}

function checkReminders() {
    fetch('/PreventiveMaintenance/GetReminders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let reminderList = document.getElementById("reminderList");
            reminderList.innerHTML = "";

            if (data.length > 0) {
                // Add header row
                reminderList.innerHTML = `
                    <li class="table-header">
                        <div class="col col-1">Truck ID</div>
                        <div class="col col-2">Date of Inspection</div>
                        <div class="col col-3">Remarks</div>
                    </li>
                `;

                // Add data rows
                data.forEach(item => {
                    let listItem = document.createElement("li");
                    listItem.className = "table-row";
                    listItem.innerHTML = `
                        <div class="col col-1" data-label="Truck ID">${item.truckId}</div>
                        <div class="col col-2" data-label="Date of Inspection">${new Date(item.dateOfInspection).toISOString().split('T')[0]}</div>
                        <div class="col col-3" data-label="Remarks">${item.remarks}</div>
                    `;
                    reminderList.appendChild(listItem);
                });

                document.getElementById("reminderModal").style.display = "flex";
            } else {
                alert("No upcoming maintenance in the next 7 days.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error loading reminder data: " + error.message);
        });
}

function closeReminderModal() {
    document.getElementById("reminderModal").style.display = "none";
}

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateTable();
});

function editRecord(maintenanceId) {
    const row = document.querySelector(`[data-maintenance-id="${maintenanceId}"]`);

    // Populate edit modal with current record details
    document.getElementById("editMaintenanceId").value = maintenanceId;
    document.getElementById("editTruckId").value = row.querySelector('.col-2').textContent;
    document.getElementById("editLicensePlate").value = row.querySelector('.col-3').textContent;

    // Convert date format
    const dateString = row.querySelector('.col-4').textContent;
    document.getElementById("editDateOfInspection").value = dateString;

    document.getElementById("editRemarks").value = row.querySelector('.col-5').textContent;
    document.getElementById("editStatus").value = row.querySelector('.col-6').textContent;
    document.getElementById("editSupplier").value = row.querySelector('.col-7').textContent;

    // Remove "Php" from cost
    const cost = row.querySelector('.col-8').textContent.replace('Php', '');
    document.getElementById("editCost").value = cost;

    // Show edit modal
    document.getElementById("editModal").style.display = "flex";
}

function updateRecord() {
    const maintenanceId = parseInt(document.getElementById("editMaintenanceId").value);
    const truckId = document.getElementById("editTruckId").value.trim();
    const licensePlate = document.getElementById("editLicensePlate").value.trim();
    const dateOfInspection = document.getElementById("editDateOfInspection").value.trim();
    const remarks = document.getElementById("editRemarks").value.trim();
    const status = document.getElementById("editStatus").value.trim();
    const supplier = document.getElementById("editSupplier").value.trim();
    const cost = document.getElementById("editCost").value.trim();

    if (!maintenanceId || !truckId || !licensePlate || !dateOfInspection || !remarks || !status || !supplier || !cost) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedEntry = {
        maintenanceId: maintenanceId,
        truckId: truckId,
        licensePlate: licensePlate,
        dateOfInspection: dateOfInspection,
        remarks: remarks,
        status: status,
        supplier: supplier,
        cost: parseFloat(cost)
    };

    fetch('/PreventiveMaintenance/UpdateRecord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEntry)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                closeEditModal();
                window.location.reload();
            } else {
                alert("Error updating record: " + (data.errors || "Unknown error"));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while updating the record.");
        });
}

function deleteRecord(maintenanceId) {
    if (!confirm("Are you sure you want to delete this maintenance record?")) {
        return;
    }

    fetch(`/PreventiveMaintenance/DeleteRecord?maintenanceId=${maintenanceId}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert("Error deleting record: " + (data.errors || "Unknown error"));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while deleting the record.");
        });
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}