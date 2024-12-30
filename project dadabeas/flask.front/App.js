// آخر نتيجة للمباراة
const latestMatch = {
    team1: {
        name: "Golden Lions",
        logo: "WhatsApp_Image_2024-12-16_at_00.40.05_ed303246-removebg-preview.png",
        score: 3,
    },
    team2: {
        name: "Livarpool",
        logo: "WhatsApp Image 2024-12-27 at 23.15.34_01890e26.jpg",
        score: 1,
    },
};

// المباريات القادمة
const upcomingMatches = [
    {
        date: "2025-1-5",
        opponent: "Eeal Madrid",
        time: "10:30 PM",
        location: "Sntiago Bernabeu",
    },
    {
        date: "2025-1-12",
        opponent: "Mancaster United",
        time: "9:00 PM",
        location: "old trafford",
    },
    {
        date: "2025-1-16",
        opponent: "Inter Milan",
        time: "10:00 PM",
        location: "San Siro",
    },
    {
        date: "2025-1-20",
        opponent:"Lisbon",
        time:"3:00 PM",
        location:"Jose Alvalade",
    }
];


// عرض آخر نتيجة مباراة
function renderLatestMatch() {
    const matchDetailsContainer = document.querySelector(".match-details");
    if (!matchDetailsContainer) {
        console.error("لا يوجد حاوية لعرض تفاصيل المباراة!");
        return;
    }
    matchDetailsContainer.innerHTML = `
        <div class="team-result">
            <img src="${latestMatch.team1.logo}" alt="${latestMatch.team1.name} Logo">
            <p>${latestMatch.team1.name}</p>
            <span>${latestMatch.team1.score}</span>
        </div>
        <div class="team-result">
            <img src="${latestMatch.team2.logo}" alt="${latestMatch.team2.name} Logo">
            <p>${latestMatch.team2.name}</p>
            <span>${latestMatch.team2.score}</span>
        </div>
    `;
}

// عرض المباريات القادمة
function renderUpcomingMatches() {
    const matchesTableBody = document.querySelector(".upcoming-matches tbody");
    if (!matchesTableBody) {
        console.error("لا يوجد جدول للمباريات القادمة!");
        return;
    }
    matchesTableBody.innerHTML = ""; // مسح أي صفوف موجودة مسبقاً
    upcomingMatches.forEach((match) => {
        const row = `
            <tr>
                <td>${match.date}</td>
                <td>${match.opponent}</td>
                <td>${match.time}</td>
                <td>${match.location}</td>
            </tr>
        `;
        matchesTableBody.insertAdjacentHTML("beforeend", row);
    });
}

function toggleDetails(playerId) {
    var details = document.getElementById(playerId);
    // التحقق إذا كان العرض مخفي
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // إظهار التفاصيل
    } else {
        details.style.display = "none"; // إخفاء التفاصيل
    }
    
    // تحقق من أي أعضاء آخرين تم تفعيلهم وأخفائهم
    var playerItems = document.querySelectorAll('.member-item');
    playerItems.forEach(function(item) {
        // إخفاء جميع العناصر الأخرى
        if (item !== details.closest('.member-item')) {
            item.classList.remove('active');
            item.querySelectorAll('.player-details').forEach(function(detail) {
                detail.style.display = 'none';
            });
        }
    });
}






// عرض تعليقات المعجبين
function renderFanComments() {
    const commentsContainer = document.querySelector(".fan-comments");
    const commentsSection = commentsContainer?.querySelector(".comments-list");
    if (!commentsSection) {
        console.error("لا يوجد قسم للتعليقات!");
        return;
    }
    commentsSection.innerHTML = ""; // مسح التعليقات الموجودة
    fanComments.forEach((comment) => {
        const commentHTML = `
            <div class="comment">
                <p>"${comment.text}"</p>
                <span>- ${comment.author}</span>
            </div>
        `;
        commentsSection.insertAdjacentHTML("beforeend", commentHTML);
    });
}

// إضافة تعليق جديد
function addComment(text, author) {
    if (text && author) {
        fanComments.push({ text, author });
        renderFanComments();
    } else {
        alert("يرجى ملء كلا الحقلين!");
    }
}

// تهيئة الصفحة
function initializePage() {
    renderLatestMatch();
    renderUpcomingMatches();
    renderFanComments();

    // إضافة حدث إرسال النموذج للتعليق
    const commentForm = document.querySelector("#commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const commentText = document.querySelector("#commentText").value;
            const commentAuthor = document.querySelector("#commentAuthor").value;
            addComment(commentText, commentAuthor);
            commentForm.reset();
        });
    }

    // إضافة تأثير الـ Ripple على الأزرار
    document.querySelectorAll(".submit-btn, .report-filters button").forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${e.clientX - button.getBoundingClientRect().left}px`;
            ripple.style.top = `${e.clientY - button.getBoundingClientRect().top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // إضافة حدث إرسال شكوى
    const complaintForm = document.querySelector("#complaintBox");
    const submitBtn = document.querySelector(".submit-btn");

    if (submitBtn && complaintForm) {
        submitBtn.addEventListener("click", () => {
            const complaintText = complaintForm.value.trim();
            if (complaintText) {
                alert("شكراً! تم تقديم شكواك.");
                complaintForm.value = ""; // مسح مربع الشكوى
            } else {
                alert("يرجى ملء الشكوى قبل الإرسال!");
            }
        });
    }
}

// تفعيل الأنيميشن عند التمرير
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section, .complaint-section");
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.5s ease"; // انتقال سلس
        }
    });
});

// إعادة تعيين تأثير الأنيميشن عند تحميل الصفحة
document.querySelectorAll("section, .complaint-section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
});

// تشغيل دالة تهيئة الصفحة بعد تحميل الـ DOM
document.addEventListener("DOMContentLoaded", initializePage);
