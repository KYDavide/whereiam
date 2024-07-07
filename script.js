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

            // Remove the lines with title, date, time, coordinates, and image
            const filteredLines = lines.filter(line => 
                !line.startsWith('# ') && 
                !line.startsWith('Date: ') && 
                !line.startsWith('Time: ') && 
                !line.startsWith('Coordinates: ') && 
                !line.startsWith('Image: ')
            );
            const mdContent = `<pre>${filteredLines.join('\n')}</pre>`;

            contentDiv.innerHTML = `
                <p>${infoLine}</p>
                <div>${imgElement}</div>
                <div>${buttonElement}</div>
                <div id="mdContent" style="display:none;">${mdContent}</div>
            `;

            // Add event listener to the image
            const img = document.getElementById('mdImage');
            img.addEventListener('click', () => {
                const mdContentDiv = document.getElementById('mdContent');
                
                // Set the dimensions of mdContent to match the maximum image size specified in CSS
                mdContentDiv.style.width = '300px'; /* Same as max-width in CSS */
                mdContentDiv.style.height = 'auto'; /* Adjust this if needed */
                
                // Toggle visibility
                mdContentDiv.style.display = mdContentDiv.style.display === 'none' ? 'block' : 'none';
            });
        });
});

function sendMail() {
    window.location.href = "mailto:davide.brualdi@gmail.com";
}
