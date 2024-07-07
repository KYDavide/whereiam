document.addEventListener("DOMContentLoaded", () => {
    fetch('data.md')
        .then(response => response.text())
        .then(data => {
            const contentDiv = document.getElementById('content');
            const lines = data.split('\n');

            let title, date, time, coordinates, image;

            lines.forEach(line => {
                if (line.startsWith('# ')) {
                    title = line.substring(2);
                } else if (line.startsWith('Date: ')) {
                    date = line.substring(6);
                } else if (line.startsWith('Time: ')) {
                    time = line.substring(6);
                } else if (line.startsWith('Coordinates: ')) {
                    coordinates = line.substring(13);
                } else if (line.startsWith('Image: ')) {
                    image = line.substring(7);
                }
            });

            const infoLine = `${title} | ${time} | ${date} | ${coordinates}`;
            const imgElement = `<img src="${image}" alt="${title}" id="mdImage">`;
            const buttonElement = `<button onclick="sendMail()">Contact</button>`;
            const mdContent = `<pre>${data}</pre>`;

            contentDiv.innerHTML = `
                <p>${infoLine}</p>
                <div>${imgElement}</div>
                <div>${buttonElement}</div>
                <div id="mdContent" style="display:none;">${mdContent}</div>
            `;

            document.getElementById('mdImage').addEventListener('click', () => {
                const mdContentDiv = document.getElementById('mdContent');
                mdContentDiv.style.display = mdContentDiv.style.display === 'none' ? 'block' : 'none';
            });
        });
});

function sendMail() {
    window.location.href = "mailto:davide.brualdi@gmail.com";
}
