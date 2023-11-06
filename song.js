document.addEventListener("DOMContentLoaded", () => {
    const cancionesGrid = document.getElementById("canciones-grid");

    // Realizar una solicitud GET a la API
    fetch("http://localhost:3000/canciones")
    .then(response => response.json())
    .then(data => {
        data.forEach(cancion => {
            const cancionElement = document.createElement("div");
            cancionElement.className = "cancion";

            const portadaElement = document.createElement("div");
            portadaElement.className = "portada";
            const portadaImg = document.createElement("img");
            portadaImg.src = cancion.Portada;
            portadaImg.alt = `Portada de ${cancion.Titulo}`;
            portadaElement.appendChild(portadaImg);

            const infoElement = document.createElement("div");
            infoElement.className = "info";
            const tituloElement = document.createElement("h1");
            tituloElement.textContent = cancion.Titulo;

            const interpreteElement = document.createElement("h2");
            interpreteElement.textContent = `${cancion.Interprete}`;

            const albumElement = document.createElement("p");
            albumElement.textContent = `${cancion.Album}`;

            const añoElement = document.createElement("p");
            añoElement.textContent = `${cancion.Año}`;

            infoElement.appendChild(tituloElement);
            infoElement.appendChild(interpreteElement);
            infoElement.appendChild(albumElement);
            infoElement.appendChild(añoElement);

            cancionElement.appendChild(portadaElement);
            cancionElement.appendChild(infoElement);

            cancionesGrid.appendChild(cancionElement);
        });
    })
    .catch(error => {
        console.error("Error al cargar las canciones:", error);
    });
});
