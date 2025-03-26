document.addEventListener("DOMContentLoaded", function () {
    // Assign Trip Modal
    var assignModal = document.getElementById("assign-trip-modal");
    var assignTripBtn = document.getElementById("trip-assign-button");
    var closeAssignModal = assignModal.querySelector(".close-btn");
    var assignForm = document.getElementById("assign-trip-form");
    var tableBody = document.querySelector("#assigned-trips tbody");
    var activeTripsCounter = document.getElementById("active-trips-count");

    function updateActiveTripsCount() {
        // Count rows with "In Progress" status
        const inProgressRows = tableBody.querySelectorAll("tr td:nth-child(9)");
        let count = 0;
        inProgressRows.forEach(cell => {
            if (cell.textContent === "In Progress") count++;
        });
        activeTripsCounter.textContent = count;
    }

    // Open Assign Trip Modal
    assignTripBtn.onclick = function () {
        assignModal.style.display = "block";
    };

    // Close Assign Trip Modal
    closeAssignModal.onclick = function () {
        assignModal.style.display = "none";
    };

    // Handle Assign Trip form submission
    assignForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted");

        // Create FormData object directly from the form
        const formData = new FormData(assignForm);

        // Debug: Log form data
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        // Get the anti-forgery token
        const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

        // Send form data using AJAX with FormData
        fetch('/FleetManagement/AssignTrip', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'RequestVerificationToken': token
            },
            body: formData
        })
            .then(response => {
                console.log("Response status:", response.status);
                return response.json();
            })
            .then(data => {
                console.log("Response data:", data);

                if (data.success) {
                    // Get values from form for table update
                    const vehicle = document.getElementById("vehicle").value;
                    const driver = document.getElementById("driver").value;
                    const driverAssistant = document.getElementById("assistant").value;
                    const client = document.getElementById("client").value;
                    const containerNumber = document.getElementById("container").value;
                    const destination = document.getElementById("destination").value;
                    const departureTime = document.getElementById("departure-time").value;
                    const estimatedArrivalTime = document.getElementById("arrival-time").value;

                    // Format dates for display
                    const formattedDeparture = new Date(departureTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });

                    const formattedArrival = new Date(estimatedArrivalTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });

                    // Create new row in the table
                    var newRow = document.createElement("tr");
                    newRow.innerHTML = `
                    <td>${vehicle}</td>
                    <td>${driver}</td>
                    <td>${driverAssistant}</td>
                    <td>${client}</td>
                    <td>${containerNumber}</td>
                    <td>${destination}</td>
                    <td>${formattedDeparture}</td>
                    <td>${formattedArrival}</td>
                    <td>In Progress</td>
                `;

                    tableBody.appendChild(newRow);
                    updateActiveTripsCount();

                    // Update vehicle status in the vehicles table
                    const vehicleStatusCells = document.querySelectorAll("#view-vehicles tbody tr td:nth-child(2)");
                    vehicleStatusCells.forEach(cell => {
                        if (cell.parentElement.querySelector("td:first-child").textContent === vehicle) {
                            cell.textContent = "In-Use";
                        }
                    });

                    assignModal.style.display = "none";
                    assignForm.reset();

                    // Show success message
                    alert('Trip assigned successfully!');
                } else {
                    // Display errors
                    if (data.errors && data.errors.length > 0) {
                        alert('Error: ' + data.errors.join(', '));
                    } else {
                        alert('Error: ' + data.message);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
    });

    // Report Damage Modal
    var damageModal = document.getElementById("damage-modal");
    var reportButtons = document.querySelectorAll(".damage-report-button");
    var closeDamageModal = damageModal.querySelector(".close-btn");
    var damageForm = document.getElementById("damage-form");
    var damagedVehiclesCounter = document.getElementById("damaged-vehicles-count");

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

        var vehicle = document.getElementById("vehicle-name").textContent;
        var damageType = document.getElementById("damage-type").value;
        var damageDescription = document.getElementById("damage-description").value.trim();
        var driver = document.querySelector("#damage-form select[name='driver_damage']").value;

        if (damageDescription && damageType && driver) {
            // Create a detailed alert message
            alert(`Damage Report Submitted Successfully!

Vehicle: ${vehicle}
Damage Type: ${damageType}
Description: ${damageDescription}
Reported by: ${driver}`);

            // Update damaged vehicle count (visual only)
            var currentCount = parseInt(damagedVehiclesCounter.textContent);
            damagedVehiclesCounter.textContent = currentCount + 1;

            damageModal.style.display = "none";
            damageForm.reset();
        } else {
            alert("Please fill in all required fields before submitting.");
        }
    });


    // Close modal if clicked outside (only if event.target is an open modal)
    window.onclick = function (event) {
        if (event.target === assignModal) {
            assignModal.style.display = "none";
        }
        if (damageModal && event.target === damageModal) {
            damageModal.style.display = "none";
        }
    };

    // Initialize counts on page load
    updateActiveTripsCount();
});