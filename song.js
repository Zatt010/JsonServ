class Cancion {
    constructor() {
        this.cancionesGrid = document.getElementById("canciones-grid");
        this.agregarButton = document.getElementById("agregarButton");
        this.agregarForm = document.getElementById("agregarCancionForm");
        this.formularioContainer = document.getElementById("formulario");
        this.aceptarAgregar = document.getElementById("aceptarAgregar");
        this.buscarInput = document.getElementById("buscarInput");
        this.buscarButton = document.getElementById("buscarButton");

        this.agregarButton.addEventListener("click", () => this.mostrarFormAgregar());
        this.aceptarAgregar.addEventListener("click", () => this.agregarCancion());
        this.buscarButton.addEventListener("click", () => this.buscarCancion());
    }

    cargarCanciones() {
        fetch("http://localhost:3000/canciones")
            .then(response => response.json())
            .then(data => {
                this.cancionesGrid.innerHTML = "";

                data.forEach(cancion => {
                    this.renderizarCancion(cancion);
                });
            })
            .catch(error => {
                console.error("Error al cargar las canciones:", error);
            });
    }
    mostrarFormAgregar() {
        // Limpiar cualquier contenido previo en el formulario
        this.formularioContainer.innerHTML = "";

        // Crear elementos del formulario
        const labels = ["Título", "Género", "Intérprete", "Álbum", "Año", "Portada (URL)"];
        const inputIds = ["tituloInput", "generoInput", "interpreteInput", "albumInput", "añoInput", "portadaInput"];

        labels.forEach((label, index) => {
            const labelElement = document.createElement("label");
            labelElement.textContent = `${label}:`;

            const inputElement = document.createElement("input");
            inputElement.type = index === 4 ? "number" : "text";
            inputElement.id = inputIds[index];
            inputElement.required = true;

            // Agregar al contenedor del formulario
            this.formularioContainer.appendChild(labelElement);
            this.formularioContainer.appendChild(inputElement);
        });

        // Mostrar el formulario de agregar
        this.agregarForm.style.display = "block";
    }

    ocultarFormAgregar() {
        // Ocultar el formulario de agregar
        this.agregarForm.style.display = "none";
    }
    renderizarCancion(cancion) {
        const cancionElement = document.createElement("div");
        cancionElement.className = "cancion";
        cancionElement.className = `cancion cancion-${cancion.id}`;

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

        const albumElement = document.createElement("h3");
        albumElement.textContent = `${cancion.Album}`;

        const generoElement = document.createElement("p");
        generoElement.textContent = `${cancion.Genero}`;

        const añoElement = document.createElement("p");
        añoElement.textContent = `${cancion.Año}`;

        // Nuevo botón de actualizar
        const updateButton = document.createElement("button");
        updateButton.textContent = "Modificar";
        updateButton.addEventListener("click", () => {
            this.habilitarEdicion(cancion);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            this.confirmarEliminacion(cancion);
        });

        infoElement.appendChild(tituloElement);
        infoElement.appendChild(interpreteElement);
        infoElement.appendChild(albumElement);
        infoElement.appendChild(generoElement);
        infoElement.appendChild(añoElement);
        infoElement.appendChild(updateButton);
        infoElement.appendChild(deleteButton);

        cancionElement.appendChild(portadaElement);
        cancionElement.appendChild(infoElement);

        this.cancionesGrid.appendChild(cancionElement);
    }

habilitarEdicion(cancion) {
        // Deshabilitar edición para otras canciones
    const canciones = document.querySelectorAll(".cancion");
    canciones.forEach(element => {
        element.classList.remove("editando");
    });

    // Obtener el elemento específico de la canción
        const cancionElement = document.querySelector(`.cancion-${cancion.id}`);
        console.log("Cancion: ",cancion.id)
        console.log("Elementp: ",cancionElement)
        // Asegurarse de que el elemento de la canción existe antes de intentar acceder a él
        if (cancionElement) {
            // Crear campos de entrada para editar
            const inputTitulo = this.crearInput("text", cancion.Titulo);
            const inputInterprete = this.crearInput("text", cancion.Interprete);
            const inputAlbum = this.crearInput("text", cancion.Album);
            const inputGenero = this.crearInput("text", cancion.Genero);
            const inputAño = this.crearInput("text", cancion.Año);
            const inputPortada = this.crearInput("text", cancion.Portada);

            // Botón de confirmar actualización
            const confirmarButton = document.createElement("button");
            confirmarButton.textContent = "Confirmar Actualización";
            confirmarButton.addEventListener("click", () => {
                const updatedCancion = {
                    id: cancion.id,
                    Titulo: inputTitulo.value,
                    Interprete: inputInterprete.value,
                    Album: inputAlbum.value,
                    Genero: inputGenero.value,
                    Año: inputAño.value,
                    Portada: inputPortada.value
                };

                this.actualizarCancion(cancion.id, updatedCancion);
            });

        // Limpiar cualquier contenido previo en el elemento de la canción
        cancionElement.querySelector(".info").innerHTML = "";

        // Agregar los campos de entrada y el botón al elemento de la canción específico
        cancionElement.querySelector(".info").appendChild(inputTitulo);
        cancionElement.querySelector(".info").appendChild(inputInterprete);
        cancionElement.querySelector(".info").appendChild(inputAlbum);
        cancionElement.querySelector(".info").appendChild(inputGenero);
        cancionElement.querySelector(".info").appendChild(inputAño);
        cancionElement.querySelector(".info").appendChild(inputPortada);
        cancionElement.querySelector(".info").appendChild(confirmarButton);

        // Marcar como editando
        cancionElement.classList.add("editando");
    }
}

buscarCancion() {
    const tituloABuscar = this.buscarInput.value.toLowerCase();

    fetch("http://localhost:3000/canciones")
        .then(response => response.json())
        .then(data => {
            this.cancionesGrid.innerHTML = "";

            const cancionesEncontradas = data.filter(cancion => {
                return cancion.Titulo.toLowerCase().includes(tituloABuscar);
            });

            cancionesEncontradas.forEach(cancion => {
                this.renderizarCancion(cancion);
            });
        })
        .catch(error => {
            console.error("Error al cargar las canciones:", error);
        });
}

    crearInput(type, value) {
        const input = document.createElement("input");
        input.type = type;
        input.value = value;
        return input;
    }

    actualizarCancion(id, updatedCancion) {
        fetch(`http://localhost:3000/canciones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCancion),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Canción actualizada:", data);
            // Puedes recargar las canciones después de la actualización
            this.cargarCanciones();
        })
        .catch(error => {
            console.error("Error al actualizar la canción:", error);
        });
    }
    confirmarEliminacion(cancion) {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta canción?");
        if (confirmacion) {
            this.eliminarCancion(cancion.id);
        }
    }

    eliminarCancion(id) {
        fetch(`http://localhost:3000/canciones/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log("Canción eliminada:", data);
            this.cargarCanciones();
        })
        .catch(error => {
            console.error("Error al eliminar la canción:", error);
        });
    }
    agregarCancion() {
        // Obtener los valores del formulario
        const titulo = document.getElementById("tituloInput").value;
        const genero = document.getElementById("generoInput").value;
        const interprete = document.getElementById("interpreteInput").value;
        const album = document.getElementById("albumInput").value;
        const año = document.getElementById("añoInput").value;
        const portada = document.getElementById("portadaInput").value;
    
        // Verificar que todos los campos estén completos
        if (!titulo || !genero || !interprete || !album || !año || !portada) {
            alert("Por favor, complete todos los campos del formulario.");
            return;
        }
    
        // Crear un objeto con los datos de la nueva canción
        const nuevaCancion = {
            Titulo: titulo,
            Genero: genero,
            Interprete: interprete,
            Album: album,
            Año: año,
            Portada: portada
        };
    
        // Enviar la nueva canción al servidor
        fetch("http://localhost:3000/canciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaCancion),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Canción agregada:", data);
            // Puedes recargar las canciones después de la adición
            this.cargarCanciones();
        })
        .catch(error => {
            console.error("Error al agregar la canción:", error);
        });
        // Limpiar el formulario después de agregar la canción
        this.formularioContainer.innerHTML = "";
        this.ocultarFormAgregar();
    }

}


document.addEventListener("DOMContentLoaded", () => {
    const cancion = new Cancion();
    cancion.cargarCanciones();
});
