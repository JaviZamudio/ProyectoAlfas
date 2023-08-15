if (sessionStorage.getItem('logged') == null || sessionStorage.getItem('logged') == false) {
    window.location.href = 'login.html';
}

const dataContainer = document.getElementById('tabla');

fetch('http://localhost:4000/api/alumnos')
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
        const th = document.createElement('th');
        th.textContent = "Certificados"
        headerRow.appendChild(th);
        table.appendChild(headerRow);

        // Create the table body rows

        data.forEach(item => {

            const row = document.createElement('tr');

            for (const key in item) {
                const td = document.createElement('td');
                td.textContent = item[key];

                row.appendChild(td);
            }
            //Asgina cantidad de certificados
            const expediente = item.expediente;
            fetch('http://localhost:4000/api/alumnos_certificados/' + expediente)
                .then(response => response.json())
                .then(data => {
                    const td = document.createElement('td');
                    const responseCount = data.length;
                    td.textContent = responseCount;
                    row.appendChild(td);
                    //Agregar un boton si hay certificados
                    if (responseCount > 0) {
                        let button = document.createElement('button');
                        button.textContent = 'Ver';
                        button.classList.add('btn');
                        button.id = expediente;
                        button.addEventListener('click', function () {
                            window.location.href = 'certificados.html?id=' + encodeURIComponent(button.id);
                        });
                        td.appendChild(button);
                    }
                })
                .catch(error => {
                    // Handle errors here
                    console.error(error);
                });
            //Cambiaq color de fila
            if (contador % 2 != 0) {
                row.classList.add('odd-row');
            }
            contador++;
            table.appendChild(row);
        });

        // Append the table to the container
        dataContainer.appendChild(table);

    })
    .catch(error => {
        console.error(error);
        dataContainer.textContent = 'Error loading table data';
    });

const user = document.getElementById('user');
user.textContent = sessionStorage.getItem('username');

let bkdrpFormID = "";
let formId = "";
//Vuelve el form de agregar alumno visible
function agregarAlumnoVisibilidad() {
    let divAgregarAlumno = document.getElementById('bkdrpFormAgregarAlumno');
    divAgregarAlumno.style.display = 'flex';
    bkdrpFormID = "bkdrpFormAgregarAlumno";
    formId = document.getElementById("formAgregarAlumno");
}
//Vuelve el form de agregar certificaado visible
function agregarCertificadoVisibilidad() {
    let divAgregarCertificado = document.getElementById('bkdrpFormAgregarCertificado');
    divAgregarCertificado.style.display = 'flex';
    bkdrpFormID = "bkdrpFormAgregarCertificado";
    formId = document.getElementById("formAgregarCertificado");
}
//Vuelve los forms de agregar alumno y agregar certificacion invisibles
function salir(event) {
    let bkdrp = document.getElementById(bkdrpFormID);
    bkdrp.style.display = 'none';
    formId.reset();
}

//Funcion para agregar un alumno
function agregarAlumno(event) {
    event.preventDefault();
    let expediente = document.getElementsByName('expediente')[0].value;
    let skills = document.getElementsByName('skills')[0].value;
    let nombres = document.getElementsByName('nombres')[0].value;
    let apellidos = document.getElementsByName('apellidos')[0].value;
    let correo = document.getElementsByName('correo')[0].value;

    fetch('http://localhost:4000/api/alumnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "expediente": expediente,
            "skills": skills,
            "nombres": nombres,
            "apellidos": apellidos,
            "correo": correo
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Alumno agregado con éxito");
            let form = document.getElementById("formAgregarAlumno");
            form.reset();
            window.location.reload();
        }
        )
        .catch(error => {
            console.error(error);
            alert('Error de conexión con la base de datos');
        }
        );
}

//Función para asignarle un certificado a un alumno
function agregarCertificado(event) {
    event.preventDefault();
    let expediente_alumno = document.getElementsByName('expediente')[1].value; console.log(expediente_alumno); 
    //Obtiene la opción seleccionada del select
    let certificado_id = document.getElementById('cursos').value; console.log(certificado_id);
    let fechaInicio = document.getElementsByName('fechaInicio')[0].value; console.log(fechaInicio);
    let fechaFin = document.getElementsByName('fechaFin')[0].value; console.log(fechaFin);

    fetch('http://localhost:4000/api/alumnos_certificados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "expediente_alumno": expediente_alumno,
            "certificado_id": certificado_id,
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Certificado agregado con éxito");
            let form = document.getElementById("formAgregarCertificado");
            form.reset();
            window.location.reload();
        }
        )
        .catch(error => {
            console.error(error);
            alert('Error de conexión con la ruta de alumnos_certificados');
        }
        );
}

//llenar dropdown de cursos
fetch('http://localhost:4000/api/certificados')
    .then(response => response.json())
    .then(data => {
        let dropdown = document.getElementById('cursos');
        data.forEach(certificado => {
            let option = document.createElement('option');
            option.value = certificado.id;
            option.textContent = certificado.nombre;
            dropdown.appendChild(option);
        });
    }
    )
    .catch(error => {
        console.error(error);
        alert('Error de conexión con la ruta de cursos');
    });

//Event listener para cerrar sesión
let logout = document.getElementById('logout');
logout.addEventListener('click', function (event) {
    event.preventDefault();
    sessionStorage.setItem('logged', false);
    sessionStorage.setItem('username', '');
    window.location.href = 'login.html';
});
