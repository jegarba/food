// Smooth scrolling
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

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(28, 28, 28, 0.98)';
    } else {
        nav.style.background = 'rgba(28, 28, 28, 0.95)';
    }
});

// Logo animation on hover
document.querySelectorAll('.logo-variant').forEach(variant => {
    variant.addEventListener('mouseenter', () => {
        const flame = variant.querySelector('.mini-flame, .isotipo-only');
        if (flame) {
            flame.style.transform = 'scale(1.1) rotate(5deg)';
            flame.style.transition = 'transform 0.3s ease';
        }
    });
    
    variant.addEventListener('mouseleave', () => {
        const flame = variant.querySelector('.mini-flame, .isotipo-only');
        if (flame) {
            flame.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// --- Descarga de variaciones de logo ---
function downloadLogo(elementId, filename, width, height) {
    const element = document.getElementById(elementId);
    const canvas = document.getElementById('downloadCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    createSVGFromElement(element, width, height).then(svgDataUrl => {
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename + '.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/png');
        };
        img.src = svgDataUrl;
    });
}
function createSVGFromElement(element, width, height) {
    return new Promise((resolve) => {
        let svgContent = '';
        if (element.id === 'logo-principal' || element.id === 'logo-invertido' || element.id === 'logo-blanco') {
            const isLight = element.classList.contains('logo-light');
            const isWhite = element.classList.contains('logo-white');
            const stopwatchColor = isLight ? '#1C1C1C' : isWhite ? '#FFFFFF' : '#D4A373';
            const textColor = isLight ? '#1C1C1C' : isWhite ? '#FFFFFF' : '#D4A373';
            svgContent = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(${width/2}, 120)">
                        <rect x="-8" y="-60" width="16" height="20" rx="8" fill="${stopwatchColor}"/>
                        <rect x="-35" y="-45" width="8" height="12" rx="4" fill="${stopwatchColor}"/>
                        <rect x="27" y="-45" width="8" height="12" rx="4" fill="${stopwatchColor}"/>
                        <circle cx="0" cy="-20" r="40" fill="none" stroke="${stopwatchColor}" stroke-width="6"/>
                        <text x="0" y="-10" text-anchor="middle" font-size="40" fill="#F25C54">🔥</text>
                    </g>
                    <text x="${width/2}" y="${height-80}" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="900" font-size="60" fill="${textColor}">HUNGRY</text>
                </svg>
            `;
        } else if (element.id === 'logo-horizontal') {
            svgContent = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(120, ${height/2})">
                        <rect x="-8" y="-60" width="16" height="20" rx="8" fill="#D4A373"/>
                        <rect x="-35" y="-45" width="8" height="12" rx="4" fill="#D4A373"/>
                        <rect x="27" y="-45" width="8" height="12" rx="4" fill="#D4A373"/>
                        <circle cx="0" cy="-20" r="40" fill="none" stroke="#D4A373" stroke-width="6"/>
                        <text x="0" y="-10" text-anchor="middle" font-size="40" fill="#F25C54">🔥</text>
                    </g>
                    <text x="280" y="${height/2 + 20}" text-anchor="start" font-family="Montserrat, sans-serif" font-weight="900" font-size="60" fill="#D4A373">HUNGRY</text>
                </svg>
            `;
        } else {
            const isLight = element.classList.contains('logo-light');
            const stopwatchColor = isLight ? '#1C1C1C' : '#D4A373';
            svgContent = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(${width/2}, ${height/2 + 10})">
                        <rect x="-5" y="-35" width="10" height="12" rx="5" fill="${stopwatchColor}"/>
                        <rect x="-20" y="-28" width="5" height="8" rx="2.5" fill="${stopwatchColor}"/>
                        <rect x="15" y="-28" width="5" height="8" rx="2.5" fill="${stopwatchColor}"/>
                        <circle cx="0" cy="-8" r="24" fill="none" stroke="${stopwatchColor}" stroke-width="4"/>
                        <text x="0" y="2" text-anchor="middle" font-size="24" fill="#F25C54">🔥</text>
                    </g>
                </svg>
            `;
        }
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        resolve(svgUrl);
    });
}
// Animaciones al hacer hover en los logos
if (window && document) {
    document.querySelectorAll('.logo-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const flame = card.querySelector('.flame-icon');
            if (flame) {
                flame.style.transform = 'scale(1.1) rotate(5deg)';
                flame.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', () => {
            const flame = card.querySelector('.flame-icon');
            if (flame) {
                flame.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
} 