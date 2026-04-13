const video = document.getElementById('prankVideo');
const btn = document.getElementById('startBtn');

btn.addEventListener('click', async () => {
  btn.style.display = 'none';
  video.style.display = 'block';
  await video.play();
});

// Fallback: try on any click
document.addEventListener('click', async () => {
  if (video.style.display === 'block' && video.paused) {
    await video.play();
  }
}, { once: true });