document.addEventListener("DOMContentLoaded", function() {
    // Load existing expenses from localStorage if available
    loadExpenses();

    // Add event listener for adding new expense
    const addExpenseBtn = document.getElementById("addExpense");
    addExpenseBtn.addEventListener("click", showExpenseForm);

    // Event listener for sorting expenses
    const sortExpensesBtn = document.getElementById("sortExpenses");
    sortExpensesBtn.addEventListener("click", sortExpenses);

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("expensesTable");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editExpense(e.target);
        }

        if (e.target && e.target.classList.contains("delete-btn")) {
            deleteExpense(e.target);
        }
    });
});

// Show form to add a new expense
function showExpenseForm() {
    const id = prompt("Enter Expense ID:");
    const expenseType = prompt("Enter Expense Type:");
    const amount = prompt("Enter Amount:");
    const date = prompt("Enter Date (YYYY-MM-DD):");
    const team = prompt("Enter Team:");

    if (id && expenseType && amount && date && team) {
        addNewExpense(id, expenseType, amount, date, team);
    }
}

// Add new expense to table and localStorage
function addNewExpense(id, expenseType, amount, date, team) {
    const tableBody = document.querySelector("#expensesTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id}</td>
        <td>${expenseType}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td>${team}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    saveExpenses(); // Save data to localStorage
}

// Edit an existing expense
function editExpense(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    const id = cells[0].innerText;
    const expenseType = prompt("Edit Expense Type:", cells[1].innerText);
    const amount = prompt("Edit Amount:", cells[2].innerText);
    const date = prompt("Edit Date (YYYY-MM-DD):", cells[3].innerText);
    const team = prompt("Edit Team:", cells[4].innerText);

    if (expenseType && amount && date && team) {
        cells[1].innerText = expenseType;
        cells[2].innerText = amount;
        cells[3].innerText = date;
        cells[4].innerText = team;
        saveExpenses();
    }
}

// Delete an expense
function deleteExpense(button) {
    const row = button.closest("tr");
    row.remove();
    saveExpenses(); // Update localStorage after deletion
}

// Save all expenses to localStorage
function saveExpenses() {
    const expenses = [];
    const rows = document.querySelectorAll("#expensesTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const expense = {
            id: cells[0].innerText,
            expenseType: cells[1].innerText,
            amount: cells[2].innerText,
            date: cells[3].innerText,
            team: cells[4].innerText
        };
        expenses.push(expense);
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load expenses from localStorage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses"));

    if (expenses) {
        const tableBody = document.querySelector("#expensesTable tbody");

        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.id}</td>
                <td>${expense.expenseType}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td>${expense.team}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Sort expenses by amount or date
function sortExpenses() {
    const tableBody = document.querySelector("#expensesTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const amountA = parseFloat(a.querySelector("td:nth-child(3)").innerText);
        const amountB = parseFloat(b.querySelector("td:nth-child(3)").innerText);

        if (amountA < amountB) return -1;
        if (amountA > amountB) return 1;
        return 0;
    });

    // Reorder rows in table
    rows.forEach(row => tableBody.appendChild(row));
}
