$(document).ready(function () {
    let editRow = null;
    let rowsPerPage = 5;
    let currentPage = 1;

    function calculateTotal() {
        let cashAdvance = parseFloat($("#CashAdvance").val()) || 0;
        let additionalCashAdvance = parseFloat($("#AdditionalCashAdvance").val()) || 0;
        let diesel = parseFloat($("#Diesel").val()) || 0;
        let total = cashAdvance + additionalCashAdvance + diesel;
        $("#TotalAmount").val(total.toFixed(2));
    }

    $("#CashAdvance, #AdditionalCashAdvance, #Diesel").on("input", calculateTotal);

    function updatePagination() {
        let totalRows = $("#tripLogTable tbody tr").length;
        let totalPages = Math.ceil(totalRows / rowsPerPage);
        let paginationHtml = "";

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }

        $(".pagination").html(paginationHtml);
        showPage(currentPage);
    }

    function showPage(page) {
        let rows = $("#tripLogTable tbody tr");
        rows.hide();
        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        rows.slice(start, end).show();
    }

    $(document).on("click", "#saveTripLog", function () {
        if (editRow) {
            // Directly update the existing row instead of replacing it
            $(editRow).find("td:eq(0)").text($("#Date").val());
            $(editRow).find("td:eq(1)").text($("#Driver").val());
            $(editRow).find("td:eq(2)").text($("#Helper").val());
            $(editRow).find("td:eq(3)").text($("#BrokerClient").val());
            $(editRow).find("td:eq(4)").text($("#Consignee").val());
            $(editRow).find("td:eq(5)").text($("#Destination").val());
            $(editRow).find("td:eq(6)").text($("#ContainerNo").val());
            $(editRow).find("td:eq(7)").text($("#ContainerSize").val());
            $(editRow).find("td:eq(8)").text($("#ShippingLine").val());
            $(editRow).find("td:eq(9)").text($("#BLRefNo").val());
            $(editRow).find("td:eq(10)").text($("#Status").val());
            $(editRow).find("td:eq(11)").text($("#Dispatcher").val());
            $(editRow).find("td:eq(12)").text($("#CashAdvance").val());
            $(editRow).find("td:eq(13)").text($("#AdditionalCashAdvance").val());
            $(editRow).find("td:eq(14)").text($("#Diesel").val());
            $(editRow).find("td:eq(15)").text($("#TotalAmount").val());
            $(editRow).find("td:eq(16)").text($("#FCL").val());

            editRow = null; // Reset editRow
        } else {
            let newRow = `
            <tr>
                <td>${$("#Date").val()}</td>
                <td>${$("#Driver").val()}</td>
                <td>${$("#Helper").val()}</td>
                <td>${$("#BrokerClient").val()}</td>
                <td>${$("#Consignee").val()}</td>
                <td>${$("#Destination").val()}</td>
                <td>${$("#ContainerNo").val()}</td>
                <td>${$("#ContainerSize").val()}</td>
                <td>${$("#ShippingLine").val()}</td>
                <td>${$("#BLRefNo").val()}</td>
                <td>${$("#Status").val()}</td>
                <td>${$("#Dispatcher").val()}</td>
                <td>${$("#CashAdvance").val()}</td>
                <td>${$("#AdditionalCashAdvance").val()}</td>
                <td>${$("#Diesel").val()}</td>
                <td>${$("#TotalAmount").val()}</td>
                <td>${$("#FCL").val()}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-row">Edit</button>
                    <button class="btn btn-danger btn-sm delete-row">Delete</button>
                </td>
            </tr>`;

            $("#tripLogTable tbody").append(newRow);
        }

        $("#addTripLogModal").modal("hide");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
        $("#tripLogForm")[0].reset();

        updatePagination();
   
    });

    $(document).on("click", ".delete-row", function () {
        $(this).closest("tr").remove();
        updatePagination();
    });

    $(document).on("click", ".edit-row", function () {
        editRow = $(this).closest("tr");

        $("#Date").val($(editRow).find("td:eq(0)").text());
        $("#Driver").val($(editRow).find("td:eq(1)").text());
        $("#Helper").val($(editRow).find("td:eq(2)").text());
        $("#BrokerClient").val($(editRow).find("td:eq(3)").text());
        $("#Consignee").val($(editRow).find("td:eq(4)").text());
        $("#Destination").val($(editRow).find("td:eq(5)").text());
        $("#ContainerNo").val($(editRow).find("td:eq(6)").text());
        $("#ContainerSize").val($(editRow).find("td:eq(7)").text());
        $("#ShippingLine").val($(editRow).find("td:eq(8)").text());
        $("#BLRefNo").val($(editRow).find("td:eq(9)").text());
        $("#Status").val($(editRow).find("td:eq(10)").text());
        $("#Dispatcher").val($(editRow).find("td:eq(11)").text());
        $("#CashAdvance").val($(editRow).find("td:eq(12)").text());
        $("#AdditionalCashAdvance").val($(editRow).find("td:eq(13)").text());
        $("#Diesel").val($(editRow).find("td:eq(14)").text());
        $("#TotalAmount").val($(editRow).find("td:eq(15)").text());
        $("#FCL").val($(editRow).find("td:eq(16)").text());

        $("#addTripLogModal").modal("show");
    });

    $(document).on("click", ".pagination .page-link", function (e) {
        e.preventDefault();
        currentPage = parseInt($(this).attr("data-page"));
        showPage(currentPage);
        updatePagination();
    });

    $("#addTripLogModal").on("hidden.bs.modal", function () {
        $("#tripLogForm")[0].reset();
        editRow = null;
    });

    updatePagination();
});