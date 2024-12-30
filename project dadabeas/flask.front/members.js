document.addEventListener("DOMContentLoaded", function() {
    // Load data from localStorage if available
    loadDataFromLocalStorage();

    // Event listener to add new row
    const addRowBtn = document.getElementById("addRowBtn");
    addRowBtn.addEventListener("click", addNewRow);

    // Event listener to save changes
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", saveChanges);

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("memberTable");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editRow(e.target);
        }

        if (e.target && e.target.classList.contains("delete-btn")) {
            deleteRow(e.target);
        }
    });
});

// Function to add a new row to the table
function addNewRow() {
    const tableBody = document.querySelector("#memberTable tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td contenteditable="true">New ID</td>
        <td contenteditable="true">New Member</td>
        <td contenteditable="true">New Role</td>
        <td contenteditable="true">Country</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// Function to edit a row
function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    cells.forEach(cell => {
        if (cell.hasAttribute("contenteditable")) {
            // If cell is already editable, save the changes
            cell.removeAttribute("contenteditable");
        } else {
            // Make the cell editable
            cell.setAttribute("contenteditable", true);
        }
    });
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}

// Function to save changes to localStorage
function saveChanges() {
    const table = document.getElementById("memberTable");
    const rows = table.querySelectorAll("tbody tr");

    const data = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const id = cells[0].innerText;
        const name = cells[1].innerText;
        const role = cells[2].innerText;
        const country = cells[3].innerText;
        data.push({ id, name, role, country });
    });

    // Save data to localStorage
    localStorage.setItem("teamMembers", JSON.stringify(data));
    alert("Changes saved!");
}

// Function to load data from localStorage
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("teamMembers"));
    if (data) {
        const tableBody = document.querySelector("#memberTable tbody");
        data.forEach(member => {
            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td contenteditable="true">${member.id}</td>
                <td contenteditable="true">${member.name}</td>
                <td contenteditable="true">${member.role}</td>
                <td contenteditable="true">${member.country}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}
