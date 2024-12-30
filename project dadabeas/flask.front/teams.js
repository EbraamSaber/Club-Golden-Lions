document.addEventListener("DOMContentLoaded", function() {
    // Load existing teams from localStorage
    loadTeams();

    // Add event listener for adding new team
    const addTeamBtn = document.getElementById("addTeam");
    addTeamBtn.addEventListener("click", showTeamForm);

    // Event listener to sort teams alphabetically
    const sortTeamsBtn = document.getElementById("sortTeams");
    sortTeamsBtn.addEventListener("click", sortTeams);

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("teamsTable");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editTeam(e.target);
        }

        if (e.target && e.target.classList.contains("delete-btn")) {
            deleteTeam(e.target);
        }
    });
});

// Show form to add a new team
function showTeamForm() {
    const id = prompt("Enter Team ID:");
    const teamName = prompt("Enter Team Name:");
    const teamLeader = prompt("Enter Team Leader:");

    if (id && teamName && teamLeader) {
        addNewTeam(id, teamName, teamLeader);
    }
}

// Add new team to table and localStorage
function addNewTeam(id, teamName, teamLeader) {
    const tableBody = document.querySelector("#teamsTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id}</td>
        <td>${teamName}</td>
        <td>${teamLeader}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    saveTeams(); // Save teams to localStorage
}

// Edit an existing team
function editTeam(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    const id = cells[0].innerText;
    const teamName = prompt("Edit Team Name:", cells[1].innerText);
    const teamLeader = prompt("Edit Team Leader:", cells[2].innerText);

    if (teamName && teamLeader) {
        cells[1].innerText = teamName;
        cells[2].innerText = teamLeader;
        saveTeams();
    }
}

// Delete a team
function deleteTeam(button) {
    const row = button.closest("tr");
    row.remove();
    saveTeams(); // Update localStorage after deletion
}

// Save all teams to localStorage
function saveTeams() {
    const teams = [];
    const rows = document.querySelectorAll("#teamsTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const team = {
            id: cells[0].innerText,
            teamName: cells[1].innerText,
            teamLeader: cells[2].innerText
        };
        teams.push(team);
    });

    localStorage.setItem("teams", JSON.stringify(teams));
}

// Load teams from localStorage
function loadTeams() {
    const teams = JSON.parse(localStorage.getItem("teams"));

    if (teams) {
        const tableBody = document.querySelector("#teamsTable tbody");

        teams.forEach(team => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${team.id}</td>
                <td>${team.teamName}</td>
                <td>${team.teamLeader}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Sort teams by name alphabetically
function sortTeams() {
    const tableBody = document.querySelector("#teamsTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const teamA = a.querySelector("td:nth-child(2)").innerText.toLowerCase();
        const teamB = b.querySelector("td:nth-child(2)").innerText.toLowerCase();

        if (teamA < teamB) return -1;
        if (teamA > teamB) return 1;
        return 0;
    });

    // Reorder rows in table
    rows.forEach(row => tableBody.appendChild(row));
}
