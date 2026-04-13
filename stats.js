function getViewKey(slug) {
  return `prank_views_${slug}`;
}

function makeCard(prank) {
  const views = Number(localStorage.getItem(getViewKey(prank.slug)) || 0);
  return `
    <article class="stat-card">
      <h2>${prank.name}</h2>
      <p><strong>Route:</strong> <a href="/${prank.slug}">/${prank.slug}</a></p>
      <p><strong>Video:</strong> /pranks/${prank.folder}/video.mp4</p>
      <p><strong>Views on this browser:</strong> ${views}</p>
    </article>
  `;
}

async function render() {
  const statsList = document.getElementById("statsList");
  const response = await fetch("/pranks/pranks.json");
  const prankList = await response.json();

  if (!prankList.length) {
    statsList.innerHTML = "<p>No pranks configured yet.</p>";
    return;
  }

  statsList.innerHTML = prankList.map((prank) => makeCard(prank)).join("");
}

render();
