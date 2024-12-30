document.addEventListener("DOMContentLoaded", function() {
    // Load subscriptions from localStorage if available
    loadSubscriptions();

    // Add event listener for adding new subscription
    const addSubscriptionBtn = document.getElementById("addSubscription");
    addSubscriptionBtn.addEventListener("click", showSubscriptionForm);

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("subscriptionsTable");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editSubscription(e.target);
        }

        if (e.target && e.target.classList.contains("delete-btn")) {
            deleteSubscription(e.target);
        }
    });
});

// Show form to add a new subscription (for simplicity, we will add a basic form)
function showSubscriptionForm() {
    const id = prompt("Enter Subscription ID:");
    const planType = prompt("Enter Plan Type:");
    const amount = prompt("Enter Amount:");
    const startDate = prompt("Enter Start Date (YYYY-MM-DD):");
    const endDate = prompt("Enter End Date (YYYY-MM-DD):");

    if (id && planType && amount && startDate && endDate) {
        addNewSubscription(id, planType, amount, startDate, endDate);
    }
}

// Add new subscription to table and localStorage
function addNewSubscription(id, planType, amount, startDate, endDate) {
    const tableBody = document.querySelector("#subscriptionsTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id}</td>
        <td>${planType}</td>
        <td>${amount}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    saveSubscriptions(); // Save data to localStorage
}

// Edit an existing subscription
function editSubscription(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    const id = cells[0].innerText;
    const planType = prompt("Edit Plan Type:", cells[1].innerText);
    const amount = prompt("Edit Amount:", cells[2].innerText);
    const startDate = prompt("Edit Start Date (YYYY-MM-DD):", cells[3].innerText);
    const endDate = prompt("Edit End Date (YYYY-MM-DD):", cells[4].innerText);

    if (planType && amount && startDate && endDate) {
        cells[1].innerText = planType;
        cells[2].innerText = amount;
        cells[3].innerText = startDate;
        cells[4].innerText = endDate;
        saveSubscriptions();
    }
}

// Delete a subscription
function deleteSubscription(button) {
    const row = button.closest("tr");
    row.remove();
    saveSubscriptions(); // Update localStorage after deletion
}

// Save all subscriptions to localStorage
function saveSubscriptions() {
    const subscriptions = [];
    const rows = document.querySelectorAll("#subscriptionsTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const subscription = {
            id: cells[0].innerText,
            planType: cells[1].innerText,
            amount: cells[2].innerText,
            startDate: cells[3].innerText,
            endDate: cells[4].innerText
        };
        subscriptions.push(subscription);
    });

    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

// Load subscriptions from localStorage
function loadSubscriptions() {
    const subscriptions = JSON.parse(localStorage.getItem("subscriptions"));

    if (subscriptions) {
        const tableBody = document.querySelector("#subscriptionsTable tbody");

        subscriptions.forEach(sub => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sub.id}</td>
                <td>${sub.planType}</td>
                <td>${sub.amount}</td>
                <td>${sub.startDate}</td>
                <td>${sub.endDate}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}
