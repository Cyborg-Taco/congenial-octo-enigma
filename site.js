const videoEl = document.getElementById("prankVideo");
const videoSourceEl = document.getElementById("videoSource");
const fallbackEl = document.getElementById("fallback");
const unmuteButtonEl = document.getElementById("unmuteButton");

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "").toLowerCase() || "/";
}

function getViewKey(slug) {
  return `prank_views_${slug}`;
}

async function boot() {
  const currentPath = normalizePath(window.location.pathname);

  if (currentPath === "/" || currentPath === "/index.html") {
    fallbackEl.classList.remove("hidden");
    videoEl.classList.add("hidden");
    unmuteButtonEl.classList.add("hidden");
    return;
  }

  const response = await fetch("/pranks/pranks.json");
  const prankList = await response.json();
  const prank = prankList.find((item) => `/${item.slug.toLowerCase()}` === currentPath);

  if (!prank) {
    fallbackEl.classList.remove("hidden");
    videoEl.classList.add("hidden");
    unmuteButtonEl.classList.add("hidden");
    return;
  }

  videoSourceEl.src = `/pranks/${prank.folder}/video.mp4`;
  videoEl.load();

  const currentCount = Number(localStorage.getItem(getViewKey(prank.slug)) || 0);
  localStorage.setItem(getViewKey(prank.slug), String(currentCount + 1));

  try {
    await videoEl.play();
  } catch (_error) {
    // Most browsers allow autoplay due to muted=true.
  }

  unmuteButtonEl.classList.remove("hidden");
  unmuteButtonEl.addEventListener(
    "click",
    async () => {
      videoEl.muted = false;
      videoEl.volume = 1;
      try {
        await videoEl.play();
      } catch (_error) {
        // Keep button visible if audio still requires another interaction.
        return;
      }
      unmuteButtonEl.classList.add("hidden");
    },
    { once: false }
  );
}

boot();
