async function fetchServerCount() {
  try {
    const response = await fetch("/connections");
    const data = await response.json();
    const count = data.connections ?? 0;

    document.getElementById("server-count").textContent = `${count} servers`;

    // Генерация SVG при получении данных
    generateSvgFile(count);
  } catch (err) {
    document.getElementById("server-count").textContent = "N/A";
  }
}

function generateSvgFile(count) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
  <rect width="80" height="20" fill="#555"/>
  <rect x="80" width="80" height="20" fill="#e05d44"/>
  <text x="40" y="14" fill="#fff" font-family="Verdana" font-size="11">Used on</text>
  <text x="120" y="14" fill="#fff" font-family="Verdana" font-size="11">${count} servers</text>
</svg>`;

  const blob = new Blob([svg.trim()], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const existing = document.getElementById("badge-link");
  if (existing) existing.remove();

  const link = document.createElement("a");
  link.id = "badge-link";
  link.href = url;
  link.download = "badge.svg";
  link.style.display = "none";
  document.body.appendChild(link);
}

function exportHtmlToSvg() {
  const link = document.getElementById("badge-link");
  if (link) link.click();
}

fetchServerCount();
setInterval(fetchServerCount, 5000);
