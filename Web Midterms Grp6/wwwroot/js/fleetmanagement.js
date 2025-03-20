document.addEventListener("DOMContentLoaded", function () {
    // Assign Trip Modal
    var assignModal = document.getElementById("assign-trip-modal");
    var assignTripBtn = document.getElementById("assign-trip-btn");
    var closeAssignModal = assignModal.querySelector(".close-btn");
    var assignForm = assignModal.querySelector("form");
    var tableBody = document.querySelector("#assigned-trips tbody");
    var activeTripsCounter = document.getElementById("active-trips-count");

    function updateActiveTripsCount() {
        activeTripsCounter.textContent = tableBody.querySelectorAll("tr").length;
    }

    // Open Assign Trip Modal
    assignTripBtn.onclick = function () {
        assignModal.style.display = "block";
    };

    // Close Assign Trip Modal
    closeAssignModal.onclick = function () {
        assignModal.style.display = "none";
    };

    // Close modal if clicked outside
    window.onclick = function (event) {
        if (event.target == assignModal) {
            assignModal.style.display = "none";
        } else if (event.target == damageModal) {
            damageModal.style.display = "none";
        }
    };

    // Handle Assign Trip form submission
    assignForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var vehicle = document.getElementById("vehicle").value;
        var driver = document.getElementById("driver").value;
        var assistant = document.getElementById("assistant").value;
        var client = document.getElementById("client").value;
        var container = document.getElementById("container").value;
        var destination = document.getElementById("destination").value;
        var departureTime = document.getElementById("departure-time").value;
        var arrivalTime = document.getElementById("arrival-time").value;

        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${vehicle}</td>
            <td>${driver}</td>
            <td>${assistant}</td>
            <td>${client}</td>
            <td>${container}</td>
            <td>${destination}</td>
            <td>${new Date(departureTime).toLocaleString()}</td>
            <td>${new Date(arrivalTime).toLocaleString()}</td>
            <td>Assigned</td>
        `;

        tableBody.appendChild(newRow);
        updateActiveTripsCount(); // Update Active Trips count

        assignModal.style.display = "none";
        assignForm.reset();
    });

    // Report Damage Modal
    var damageModal = document.getElementById("damage-modal");
    var reportButtons = document.querySelectorAll(".report-damage-btn");
    var closeDamageModal = damageModal.querySelector(".close-btn");
    var damageForm = damageModal.querySelector("form");
    var damageTableBody = document.querySelector("#reported-damages tbody");
    var damagedVehiclesCounter = document.getElementById("damaged-vehicles-count");

    function updateDamagedVehiclesCount() {
        damagedVehiclesCounter.textContent = damageTableBody.querySelectorAll("tr").length;
    }

    // Open Report Damage Modal
    reportButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var vehicleName = button.getAttribute("data-vehicle");
            document.getElementById("vehicle-name").textContent = vehicleName;
            damageModal.style.display = "block";
        });
    });

    // Close Report Damage Modal
    closeDamageModal.onclick = function () {
        damageModal.style.display = "none";
    };

    // Handle Report Damage form submission
    damageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var vehicle = document.getElementById("damage-vehicle").value.trim();
        var driver = document.getElementById("damage-driver").value.trim();
        var description = document.getElementById("damage-description").value.trim();
        var reportedDate = document.getElementById("damage-date").value.trim();

        if (vehicle && driver && description && reportedDate) {
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${vehicle}</td>
                <td>${driver}</td>
                <td>${description}</td>
                <td>${new Date(reportedDate).toLocaleString()}</td>
                <td>Pending</td>
            `;

            damageTableBody.appendChild(newRow);
            updateDamagedVehiclesCount(); // Update Damaged Vehicles count

            alert("Damage Report Sent!");

            damageModal.style.display = "none";
            damageForm.reset();
        } else {
            alert("Please fill in all fields before submitting.");
        }
    });

    // Initialize counts on page load
    updateActiveTripsCount();
    updateDamagedVehiclesCount();
});
