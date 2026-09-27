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
  const overviewVideo = document.getElementById('overviewVideo');
  const taskVideos = [...document.querySelectorAll('.task-video')];
  taskVideos.forEach(video => {
    video.addEventListener('play', () => {
      taskVideos.forEach(other => { if (other !== video) other.pause(); });
      if (overviewVideo) overviewVideo.pause();
    });
  });
  if (overviewVideo) {
    overviewVideo.addEventListener('play', () => taskVideos.forEach(video => video.pause()));
  }
})();
