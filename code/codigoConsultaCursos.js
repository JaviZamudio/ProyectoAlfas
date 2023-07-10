if (sessionStorage.getItem('logged') == null || sessionStorage.getItem('logged') == false) {
    window.location.href = 'login.html';
}

const user = document.getElementById('user');
user.textContent = sessionStorage.getItem('username');

const dataContainer = document.getElementById('tabla');

fetch('http://localhost:3000/api/certificados')
    .then(response => response.json())
    .then(data => {
        // Create the table element
        const table = document.createElement('table');

        // Create the table header row
        const headerRow = document.createElement('tr');
        let contador = 1;
        for (const key in data[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        // Create the table body rows
        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const td = document.createElement('td');
                td.textContent = item[key];
                row.appendChild(td);
            }
            table.appendChild(row);
            //Cambiaq color de fila
            if (contador % 2 != 0) {
                row.classList.add('odd-row');
            }
            contador++;
            table.appendChild(row);
        });
        dataContainer.appendChild(table);
    })
    .catch(error => {
        // Handle errors here
        alert('Error de conexión con la base de datos');
    }
    );

function agregarCursoVisibilidad() {
    let divAgregarCurso = document.getElementById('bkdrpFormAgregarCurso');
    divAgregarCurso.style.display = 'flex';
}

function salir(event) {
    let form = document.getElementById("bkdrpFormAgregarCurso");
    form.style.display = 'none';
}

function agregarCurso(event) {
    event.preventDefault();
    let nombre = document.getElementsByName('nombre')[0].value;
    let descripcion = document.getElementsByName('descripcion')[0].value;
    let logo = document.getElementsByName('logo')[0].value;

    fetch('http://localhost:3000/api/certificados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "descripcion": descripcion,
            "logo": logo
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Curso agregado con éxito");
            let form = document.getElementById("formAgregarCurso");
            form.reset();
            window.location.reload();
        }
        )
        .catch(error => {
            console.error(error);
            alert('Error de conexión a la ruta de certificados');
        }
        )
}

//Event listener para cerrar sesión
let logout = document.getElementById('logout');
logout.addEventListener('click', function (event) {
    event.preventDefault();
    sessionStorage.setItem('logged', false);
    sessionStorage.setItem('username', '');
    window.location.href = 'login.html';
});
