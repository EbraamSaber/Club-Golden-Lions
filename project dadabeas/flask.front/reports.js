// Add Ripple Effect to the Report Buttons
document.querySelectorAll(".report-filters button, .download-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
        ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Show Confirmation When Generating a Report
const generateBtn = document.querySelector(".report-filters button");
if (generateBtn) {
    generateBtn.addEventListener("click", () => {
        alert("Your report is being generated. Please wait...");
    });
}

// Scroll Animations for Report Section
window.addEventListener("scroll", () => {
    const reportSection = document.querySelector(".report-preview");
    if (reportSection) {
        const rect = reportSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            reportSection.style.opacity = "1";
            reportSection.style.transform = "translateY(0)";
        }
    }
});

// Initialize Scroll Animation for Report Section
const reportSection = document.querySelector(".report-preview");
if (reportSection) {
    reportSection.style.opacity = "0";
    reportSection.style.transform = "translateY(50px)";
    reportSection.style.transition = "all 0.8s ease";
}
