const circles = document.querySelectorAll('.circle-container');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const p1 = entry.target.querySelector('.progress1');
            const p2 = entry.target.querySelector('.progress2');

            const total = 377;

            p1.style.strokeDashoffset = total - (total * 90 / 100);

            p2.style.strokeDashoffset = total - (total * 40 / 100);
        }
    });
}, { threshold: 0.5 });

circles.forEach(c => observer.observe(c));