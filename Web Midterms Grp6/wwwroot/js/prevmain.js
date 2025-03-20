
               let currentPage = 1;
        const rowsPerPage = 5;
        let tableData = [
            {
                maintenanceId: "1001",
                truckId: "T-001",
                licensePlate: "ABC-1234",
                dateOfInspection: "2025-03-16",
                remarks: "Oil Change",
                status: "Completed",
                supplier: "Supplier A",
                cost: "200"
            }
        ];

              function openModal() {
            let lastId = tableData.length > 0 ? Math.max(...tableData.map(item => parseInt(item.maintenanceId))) : 1000;
            document.getElementById("maintenanceId").value = lastId + 1;
                document.getElementById("truckId").value = "T-";
            document.getElementById("addModal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("addModal").style.display = "none";
            clearFields();
        }
        function submitForm() {
            let maintenanceId = document.getElementById("maintenanceId").value.trim();
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
                maintenanceId,
                truckId,
                licensePlate,
                dateOfInspection,
                remarks,
                status,
                supplier,
                cost
            };

            tableData.push(newEntry);
            historyData.push(newEntry);

            updateTable();
            closeModal();
        }

        function updateTable() {
            let table = document.getElementById("maintenanceTable");
            table.innerHTML = `
                <li class="table-header">
                    <div class="col col-1">Maintenance ID</div>
                    <div class="col col-2">Truck ID</div>
                    <div class="col col-3">License Plate</div>
                    <div class="col col-4">Date of Inspection</div>
                    <div class="col col-5">Remarks</div>
                    <div class="col col-6">Status</div>
                    <div class="col col-7">Supplier</div>
                    <div class="col col-8">Cost</div>
                </li>`;

            let start = (currentPage - 1) * rowsPerPage;
            let end = start + rowsPerPage;
            let paginatedItems = tableData.slice(start, end);

            paginatedItems.forEach(item => {
                let row = document.createElement("li");
                row.className = "table-row";
                row.innerHTML = `
                    <div class="col col-1" data-label="Maintenance ID">${item.maintenanceId}</div>
                    <div class="col col-2" data-label="Truck ID">${item.truckId}</div>
                    <div class="col col-3" data-label="License Plate">${item.licensePlate}</div>
                    <div class="col col-4" data-label="Date of Inspection">${item.dateOfInspection}</div>
                    <div class="col col-5" data-label="Remarks">${item.remarks}</div>
                    <div class="col col-6" data-label="Status">${item.status}</div>
                    <div class="col col-7" data-label="Supplier">${item.supplier}</div>
                    <div class="col col-8" data-label="Cost">Php${item.cost}</div>
                `;
                table.appendChild(row);
            });

            document.getElementById("pageNumber").innerText = `Page ${currentPage}`;
            document.getElementById("prevBtn").disabled = currentPage === 1;
            document.getElementById("nextBtn").disabled = end >= tableData.length;
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                updateTable();
            }
        }

        function nextPage() {
            if (currentPage * rowsPerPage < tableData.length) {
                currentPage++;
                updateTable();
            }
        }

        function clearFields() {
            document.querySelectorAll(".modal input").forEach(input => input.value = "");
        }


        updateTable();

          let historyData = [];
        for (let i = 1001; i <= 1010; i++) {
            historyData.push({
                maintenanceId: i,
                truckId: `T-00${i - 1000}`,
                dateOfInspection: "2025-03-16",
                remarks: "Oil Change",
                status: "Completed",
                supplier: "Supplier A",
                cost: "200"
            });
        }

        function openHistoryModal() {
            let select = document.getElementById("historyTruckId");
            select.innerHTML = '<option value="">-- Select --</option>';
            let truckIds = [...new Set(historyData.map(h => h.truckId))];
            truckIds.forEach(id => {
                let option = document.createElement("option");
                option.value = id;
                option.textContent = id;
                select.appendChild(option);
            });
            document.getElementById("historyModal").style.display = "flex";
        }

        function closeHistoryModal() {
            document.getElementById("historyModal").style.display = "none";
        }

        function showHistory() {
            let selectedTruck = document.getElementById("historyTruckId").value;
            let historyList = document.getElementById("historyList");
            historyList.innerHTML = "";

            let filteredHistory = historyData.filter(h => h.truckId === selectedTruck);
            if (filteredHistory.length > 0) {
                filteredHistory.forEach(item => {
                    let li = document.createElement("li");
                    li.className = "table-row";
                    li.innerHTML = `
                        <div class="col col-1">${item.maintenanceId}</div>
                        <div class="col col-2">${item.truckId}</div>
                        <div class="col col-3">${item.dateOfInspection}</div>
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
        }

              function checkReminders() {
            let today = new Date();
            let upcomingMaintenance = tableData.filter(item => {
                let inspectionDate = new Date(item.dateOfInspection);
                let diffDays = Math.ceil((inspectionDate - today) / (1000 * 60 * 60 * 24));
                return diffDays > 0 && diffDays <= 7; // Within 7 days
            });

            let reminderList = document.getElementById("reminderList");
            reminderList.innerHTML = "";

            if (upcomingMaintenance.length > 0) {
                upcomingMaintenance.forEach(item => {
                    let listItem = document.createElement("li");
                    listItem.className = "table-row";
                    listItem.innerHTML = `
                        <div class="col col-1" data-label="Truck ID">${item.truckId}</div>
                        <div class="col col-2" data-label="Date of Inspection">${item.dateOfInspection}</div>
                        <div class="col col-3" data-label="Remarks">${item.remarks}</div>
                    `;
                    reminderList.appendChild(listItem);
                });

                document.getElementById("reminderModal").style.display = "flex";
            } else {
                alert("No upcoming maintenance in the next 7 days.");
            }
        }

        function closeReminderModal() {
            document.getElementById("reminderModal").style.display = "none";
        }
