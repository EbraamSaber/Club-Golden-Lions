document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.add-to-cart'); // جلب الأزرار

    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            // عند الضغط على الزر
            const productId = button.getAttribute('data-product-id'); 
            alert(`Redirecting to payment page for product ${productId}`); // رسالة اختبار

            // توجيه المستخدم لصفحة الدفع
            window.location.href = `Payment.html?productId=${productId}`;
        });
    });
});


// Add 3D rotation effect on product images
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0)';
    });
});


// Filter products by category
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        document.querySelectorAll('.product-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


