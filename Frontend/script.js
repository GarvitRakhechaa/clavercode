// Typing Effect
const text = "🔥 ClaverCode is Coming Soon!";
let index = 0;
const titleElement = document.getElementById("title");

function typeWriter() {
    if (index < text.length) {
        titleElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
setTimeout(typeWriter, 300);

// Confetti Surprise
function confetti() {
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = Math.random() * 10 + 5 + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }
}

// Handle Secret Key
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'C') {
        document.getElementById('secretMessage').classList.add('active');
        confetti();
        setTimeout(() => {
            document.getElementById('secretMessage').classList.remove('active');
        }, 3000);
    }
});

function generateParticles(count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 15 + 5 + 'px';
      particle.style.height = particle.style.width; // Make it a circle
      particle.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
      particle.style.top = Math.random() * 100 + 'vh';  // Random vertical position
      particle.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random float duration
      particle.style.animationDelay = Math.random() * 5 + 's'; // Random delay
      document.body.appendChild(particle);
    }
  }

  generateParticles(200)