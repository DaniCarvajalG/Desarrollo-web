const form = document.getElementById("form");
const formUserName = document.getElementById("Un");
const formName = document.getElementById("Nm");
const formImg = document.getElementById("Img");
const formPet = document.getElementById("Pet");
const amigosTable = document.getElementById("amigosTable").getElementsByTagName('tbody')[0];
const mascotasList = document.getElementById("mascotasList");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío del formulario

    if (validarUsername(formUserName.value)) {
        console.log("El username es válido");

        const newRow = amigosTable.insertRow();
        newRow.innerHTML = `
            <td>${formUserName.value}</td>
            <td>${formName.value}</td>
            <td><img src="${formImg.value}" alt="Imagen de ${formName.value}" width="100"></td>
            <td><button class="showMascotas">Mostrar Mascotas</button></td>
        `;

        // Agregar la información de username y mascotas como atributos data a la fila
        newRow.dataset.username = formUserName.value;
        newRow.dataset.mascotas = formPet.value;

        const showMascotasButton = newRow.querySelector('.showMascotas');
        showMascotasButton.addEventListener('click', () => {
            mostrarMascotas(newRow.dataset.username, newRow.dataset.mascotas);
        });

        form.reset();

    } else {
        alert("El username no es válido");
    }
});

const validarUsername = (username) => {
    return String(username).toLowerCase().match(/\./) !== null;
};

const mostrarMascotas = (username, mascotas) => {
    // Limpiar la lista de mascotas
    mascotasList.innerHTML = '';

    // Añadir el título de las mascotas
    const title = document.createElement('h4');
    title.textContent = `Mascotas de:  ${username}`;
    mascotasList.appendChild(title);

    // Añadir las mascotas a la lista
    const mascotaItem = document.createElement('li');
    mascotaItem.textContent = `${mascotas}`;
    mascotasList.appendChild(mascotaItem);
};
