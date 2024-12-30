document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Show a confirmation message to the user
    alert(`Thank you, ${name}! Your registration is complete. A confirmation email has been sent to ${email}.`);

    // Simulate sending an email (actual email sending requires a backend service)
    console.log(`Email sent to ${email}: Welcome to our service, ${name}!`);

    // Clear the form
    event.target.reset();
});

// Remove the logging of social links (no need for extra JS functionality)

