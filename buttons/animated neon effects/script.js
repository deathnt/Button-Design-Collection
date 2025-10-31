// Add click pulse effect
const button = document.querySelector('.neon-btn');

button.addEventListener('click', function(e) {
    // Create pulse element
    const pulse = document.createElement('span');
    pulse.style.position = 'absolute';
    pulse.style.top = '50%';
    pulse.style.left = '50%';
    pulse.style.width = '0';
    pulse.style.height = '0';
    pulse.style.border = '2px solid #ff416c';
    pulse.style.transform = 'translate(-50%, -50%)';
    pulse.style.borderRadius = '0';
    pulse.style.opacity = '1';
    pulse.style.pointerEvents = 'none';
    pulse.style.animation = 'clickPulse 0.6s ease-out';
    
    this.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 600);
});

// Add dynamic styles for click animation
const style = document.createElement('style');
style.textContent = `
    @keyframes clickPulse {
        to {
            width: 300px;
            height: 150px;
            opacity: 0;
            box-shadow: 
                0 0 20px #ff416c,
                0 0 40px #ff416c;
        }
    }
`;
document.head.appendChild(style);

// Keyboard accessibility
button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});

// Add random flicker effect
setInterval(() => {
    if (Math.random() < 0.1) {
        button.style.opacity = '0.8';
        setTimeout(() => {
            button.style.opacity = '1';
        }, 50);
    }
}, 3000);
