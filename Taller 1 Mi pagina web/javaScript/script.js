const form = document.getElementById("form");
const formUserName = document.getElementById("Un");
const formName = document.getElementById("Nm");
const formImg = document.getElementById("Img");
const formPet = document.getElementById("Pet");
const amigosTable = document.getElementById("amigosTable").getElementsByTagName('tbody')[0];
const mascotasList = document.getElementById("mascotasList");

// Mapa para almacenar la información de usuarios y sus mascotas
const usuariosMascotas = new Map();

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío del formulario

    if (validarUsername(formUserName.value)) {
        console.log("El username es válido");

        const username = formUserName.value;
        const mascotas = formPet.value.split(',').map(m => m.trim()); // Suponiendo que las mascotas se ingresan separadas por comas

        // Actualizar el mapa de usuarios y mascotas
        if (usuariosMascotas.has(username)) {
            // Si el usuario ya existe, añadir las nuevas mascotas a su lista
            const usuarioMascotas = usuariosMascotas.get(username);
            usuarioMascotas.push(...mascotas);
            usuariosMascotas.set(username, [...new Set(usuarioMascotas)]); // Evitar mascotas duplicadas
        } else {
            // Si el usuario no existe, añadirlo al mapa
            usuariosMascotas.set(username, mascotas);

            // Insertar nueva fila en la tabla de amigos
            const newRow = amigosTable.insertRow();
            newRow.innerHTML = `
                <td>${formUserName.value}</td>
                <td>${formName.value}</td>
                <td><img src="${formImg.value}" alt="Imagen de ${formName.value}" width="100"></td>
                <td><button class="showMascotas">Mostrar Mascotas</button></td>
            `;

            const showMascotasButton = newRow.querySelector('.showMascotas');
            showMascotasButton.addEventListener('click', () => {
                mostrarMascotas(username);
            });

            // Añadir atributo data-username para facilitar la búsqueda de la fila
            newRow.dataset.username = username;
        }

        // Actualizar la lista de mascotas si el usuario ya existía
        actualizarFilaTabla(username);

        form.reset();

    } else {
        alert("El username no es válido");
    }
});

const validarUsername = (username) => {
    return String(username).toLowerCase().match(/\./) !== null;
};

const mostrarMascotas = (username) => {
    // Limpiar la lista de mascotas
    mascotasList.innerHTML = '';

    // Añadir el título de las mascotas
    const title = document.createElement('h4');
    title.textContent = `Mascotas de: ${username}`;
    mascotasList.appendChild(title);

    // Añadir las mascotas a la lista
    const mascotas = usuariosMascotas.get(username) || [];
    mascotas.forEach(mascota => {
        const mascotaItem = document.createElement('li');
        mascotaItem.textContent = mascota;
        mascotasList.appendChild(mascotaItem);
    });
};

const actualizarFilaTabla = (username) => {
    // Buscar la fila del usuario en la tabla
    const rows = amigosTable.getElementsByTagName('tr');
    for (let row of rows) {
        if (row.dataset.username === username) {
            // Actualizar la lista de mascotas en la fila
            const mascotas = usuariosMascotas.get(username).join(', ');
            row.querySelector('.showMascotas').addEventListener('click', () => {
                mostrarMascotas(username);
            });
            break;
        }
    }
};
