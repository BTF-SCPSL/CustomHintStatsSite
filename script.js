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
