// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    loadFeaturedContent();
    loadLatestReviews();
});

// Sayfa animasyonlarını başlat
function initializeAnimations() {
    // Scroll efektleri için elementleri seç
    const elements = document.querySelectorAll('.featured-card, .reviews-grid > *');
    
    // Intersection Observer oluştur
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Her elementi gözlemle
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Öne çıkan içerikleri yükle
function loadFeaturedContent() {
    // Örnek featured içerik verisi
    const featuredContent = [
        {
            title: "The Haunting of Hill House",
            description: "Modern bir klasik: Shirley Jackson'ın romanından uyarlanan dizi incelemesi",
            image: "https://via.placeholder.com/300x450"
        },
        {
            title: "Hereditary",
            description: "Ari Aster'in dehşet verici aile draması hakkında detaylı analiz",
            image: "https://via.placeholder.com/300x450"
        },
        {
            title: "The Backrooms",
            description: "İnternetteki en popüler creepypasta hikayelerinden birinin derinlemesine incelemesi",
            image: "https://via.placeholder.com/300x450"
        }
    ];

    // Featured kartlarını güncelle
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach((card, index) => {
        if (featuredContent[index]) {
            const content = featuredContent[index];
            card.querySelector('img').src = content.image;
            card.querySelector('h3').textContent = content.title;
            card.querySelector('p').textContent = content.description;
        }
    });
}

// Son eleştirileri yükle
function loadLatestReviews() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const reviews = [
        {
            title: "Malignant",
            rating: 4.5,
            text: "James Wan'ın en son filmi, türün sınırlarını zorluyor...",
            date: "2024-01-15"
        },
        {
            title: "The Black Phone",
            rating: 4.0,
            text: "Ethan Hawke'ın muhteşem performansıyla...",
            date: "2024-01-10"
        },
        {
            title: "M3GAN",
            rating: 3.5,
            text: "Yapay zeka temalı modern bir korku filmi...",
            date: "2024-01-05"
        }
    ];

    // Review kartlarını oluştur
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <h3>${review.title}</h3>
            <div class="rating">
                ${getStarRating(review.rating)}
            </div>
            <p>${review.text}</p>
            <small>${formatDate(review.date)}</small>
        `;
        reviewsGrid.appendChild(reviewCard);
    });
}

// Yıldız değerlendirmesi oluştur
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    // Tam yıldızlar
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Yarım yıldız
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Boş yıldızlar
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Tarihi formatla
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

// Smooth scroll için event listener
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
