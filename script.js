async function fetchServerCount() {
  try {
    const response = await fetch("http://0.0.0.0:8080/connections");
    const data = await response.json();
    const count = data.connections ?? 0;
    document.getElementById("server-count").textContent = `${count} servers`;
  } catch (error) {
    console.error("Failed to fetch connections:", error);
    document.getElementById("server-count").textContent = "N/A";
  }
}

fetchServerCount();
setInterval(fetchServerCount, 5000);

function exportHtmlToSvg(selector, filename = "badge.svg") {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element "${selector}" not found.`);
    return;
  }

  const { width, height } = element.getBoundingClientRect();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Verdana, sans-serif;">
      ${element.outerHTML}
    </div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
