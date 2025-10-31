// Add liquid splash effect on click
const button = document.querySelector('.liquid-btn');
const wrapper = document.querySelector('.button-wrapper');

button.addEventListener('click', function(e) {
    // Create splash effect
    createLiquidSplash(e);
    
    // Add click feedback
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1.05)';
    }, 150);
});

function createLiquidSplash(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple splash droplets
    for (let i = 0; i < 12; i++) {
        const splash = document.createElement('div');
        splash.style.position = 'absolute';
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        splash.style.width = (8 + Math.random() * 12) + 'px';
        splash.style.height = splash.style.width;
        splash.style.background = 'radial-gradient(circle, #ffffff, rgba(255,255,255,0.5))';
        splash.style.borderRadius = '50%';
        splash.style.pointerEvents = 'none';
        splash.style.zIndex = '1000';
        splash.style.animation = 'liquidSplash 0.8s ease-out forwards';
        
        // Random direction
        const angle = (Math.PI * 2 / 12) * i + Math.random() * 0.5;
        const velocity = 30 + Math.random() * 40;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        splash.style.setProperty('--vx', vx + 'px');
        splash.style.setProperty('--vy', vy + 'px');
        
        wrapper.appendChild(splash);
        
        // Animate splash
        let opacity = 1;
        let posX = x;
        let posY = y;
        let scale = 1;
        
        const animate = () => {
            opacity -= 0.02;
            scale += 0.05;
            posX += vx * 0.02;
            posY += vy * 0.02;
            
            splash.style.left = posX + 'px';
            splash.style.top = posY + 'px';
            splash.style.opacity = opacity;
            splash.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                splash.remove();
            }
        };
        
        animate();
    }
}

// Enhanced morphing on mouse movement
let morphTimeout;
button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const liquidBg = this.querySelector('.liquid-bg');
    const intensity = Math.min(Math.abs(deltaX) + Math.abs(deltaY), 1);
    
    // Dynamic morphing based on mouse position
    const borderRadius = `
        ${60 + deltaX * 20}% ${40 - deltaX * 15}% ${30 + deltaY * 20}% ${70 - deltaY * 15}% /
        ${60 + deltaY * 15}% ${30 - deltaY * 10}% ${70 + deltaX * 15}% ${40 - deltaX * 10}%
    `;
    
    liquidBg.style.borderRadius = borderRadius;
    
    clearTimeout(morphTimeout);
    morphTimeout = setTimeout(() => {
        liquidBg.style.borderRadius = '60% 40% 30% 70% / 60% 30% 70% 40%';
    }, 200);
});

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
    this.style.outlineOffset = '6px';
});

button.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// Continuous subtle morphing animation
let morphCounter = 0;
setInterval(() => {
    const liquidBg = button.querySelector('.liquid-bg');
    if (!button.matches(':hover')) {
        morphCounter += 0.1;
        const morph1 = 60 + Math.sin(morphCounter) * 5;
        const morph2 = 40 + Math.cos(morphCounter * 1.2) * 3;
        const morph3 = 30 + Math.sin(morphCounter * 0.8) * 4;
        const morph4 = 70 + Math.cos(morphCounter * 1.5) * 6;
        
        liquidBg.style.borderRadius = `${morph1}% ${morph2}% ${morph3}% ${morph4}% / ${morph2}% ${morph3}% ${morph4}% ${morph1}%`;
    }
}, 100);
