(() => {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    const close = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  }
  const copy = document.getElementById('copyBibtex');
  const code = document.getElementById('bibtexCode');
  if (copy && code) {
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        copy.textContent = 'Copied';
        window.setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
      } catch {
        copy.textContent = 'Select text to copy';
        window.setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
      }
    });
  }
  const carousel = document.getElementById('taskCarousel');
  const taskVideo = document.getElementById('taskVideo');
  const taskNumber = document.getElementById('taskNumber');
  const taskTitle = document.getElementById('taskTitle');
  const progress = document.getElementById('taskProgress');
  const overviewVideo = document.getElementById('overviewVideo');
  const taskNames = [
    'Put a cube into the bowl',
    'Take the cube out of the bowl',
    'Stack one cube on the other',
    'Take the top cube off',
    'Open the drawer',
    'Close the drawer',
    'Hang the mug on the mug tree',
    'Take the mug off the mug tree'
  ];

  if (carousel && taskVideo && taskNumber && taskTitle && progress) {
    let current = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    const markers = taskNames.map(() => {
      const marker = document.createElement('span');
      progress.appendChild(marker);
      return marker;
    });
    markers[0].classList.add('active');

    function showTask(next) {
      const wasPlaying = !taskVideo.paused;
      taskVideo.pause();
      current = (next + taskNames.length) % taskNames.length;
      const index = current + 1;
      taskVideo.src = 'static/videos/web/task_' + index + '.mp4?v=web3';
      taskVideo.poster = 'static/images/task-posters/task_' + index + '.jpg?v=firstframe3';
      taskVideo.setAttribute('aria-label', taskNames[current]);
      taskVideo.load();
      taskNumber.textContent = String(index).padStart(2, '0');
      taskTitle.textContent = taskNames[current];
      markers.forEach((marker, i) => marker.classList.toggle('active', i === current));
      if (wasPlaying) taskVideo.play().catch(() => {});
    }

    document.getElementById('taskPrev').addEventListener('click', () => showTask(current - 1));
    document.getElementById('taskNext').addEventListener('click', () => showTask(current + 1));
    carousel.addEventListener('keydown', event => {
      if (event.target !== carousel) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showTask(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    carousel.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', event => {
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        showTask(current + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
    if (overviewVideo) {
      overviewVideo.addEventListener('play', () => taskVideo.pause());
      taskVideo.addEventListener('play', () => overviewVideo.pause());
    }
  }
})();
