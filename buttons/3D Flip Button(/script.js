// Add click feedback with sparkle effect
const button = document.querySelector('.flip-btn');
const wrapper = document.querySelector('.button-wrapper');

button.addEventListener('click', function(e) {
    // Create sparkle particles
    for (let i = 0; i < 8; i++) {
        createSparkle(e);
    }
    
    // Add click feedback
    this.style.transition = 'transform 0.1s ease';
    setTimeout(() => {
        this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }, 100);
});

function createSparkle(e) {
    const sparkle = document.createElement('div');
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.background = '#fff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.boxShadow = '0 0 10px #fff';
    
    // Random direction
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 50 + Math.random() * 50;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    wrapper.appendChild(sparkle);
    
    // Animate sparkle
    let opacity = 1;
    let posX = x;
    let posY = y;
    
    const animate = () => {
        opacity -= 0.02;
        posX += vx * 0.02;
        posY += vy * 0.02;
        
        sparkle.style.left = posX + 'px';
        sparkle.style.top = posY + 'px';
        sparkle.style.opacity = opacity;
        sparkle.style.transform = `scale(${opacity})`;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            sparkle.remove();
        }
    };
    
    animate();
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
    this.style.outline = '3px solid rgba(255, 255, 255, 0.6)';
    this.style.outlineOffset = '5px';
});

button.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// Add subtle tilt on mouse move
wrapper.addEventListener('mousemove', function(e) {
    if (button.matches(':hover')) return;
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    button.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

wrapper.addEventListener('mouseleave', function() {
    button.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
