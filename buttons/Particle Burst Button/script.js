// Particle system setup
const button = document.querySelector('.particle-btn');
const canvas = document.querySelector('.particle-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = [
            'rgba(255, 107, 0, ',
            'rgba(255, 140, 0, ',
            'rgba(255, 69, 0, ',
            'rgba(255, 200, 0, ',
            'rgba(255, 255, 255, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
    }
    
    draw() {
        ctx.fillStyle = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '0.8)';
    }
}

let particles = [];
let animationId;

// Continuous particle emission on hover
let isHovering = false;
let hoverInterval;

button.addEventListener('mouseenter', function() {
    isHovering = true;
    hoverInterval = setInterval(() => {
        if (isHovering) {
            createParticleBurst(200, 200, 5);
        }
    }, 100);
});

button.addEventListener('mouseleave', function() {
    isHovering = false;
    clearInterval(hoverInterval);
});

// Click explosion
button.addEventListener('click', function(e) {
    createParticleBurst(200, 200, 50);
    createShockwave();
    
    // Vibration feedback
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
});

function createParticleBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
    if (!animationId) {
        animate();
    }
}

function createShockwave() {
    const shockwave = document.createElement('div');
    shockwave.style.position = 'absolute';
    shockwave.style.top = '50%';
    shockwave.style.left = '50%';
    shockwave.style.width = '100%';
    shockwave.style.height = '100%';
    shockwave.style.border = '3px solid rgba(255, 140, 0, 0.8)';
    shockwave.style.borderRadius = '50%';
    shockwave.style.pointerEvents = 'none';
    shockwave.style.animation = 'shockwave 0.8s ease-out';
    
    button.appendChild(shockwave);
    
    setTimeout(() => shockwave.remove(), 800);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    
    if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
    } else {
        animationId = null;
    }
}

// Keyboard accessibility
button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});

// Focus styles
button.addEventListener('focus', function() {
    this.style.outline = '3px solid rgba(255, 140, 0, 0.8)';
    this.style.outlineOffset = '8px';
});

button.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// Idle particle effects
setInterval(() => {
    if (!isHovering && Math.random() < 0.3) {
        createParticleBurst(
            180 + Math.random() * 40,
            180 + Math.random() * 40,
            3
        );
    }
}, 500);
