// const dataContainer = document.getElementById('tabla');

// fetch('http://localhost:4000/api/alumnos')
//     .then(response => response.json())
//     .then(data => {
//         // Create the table element
//         const table = document.createElement('table');

//         // Create the table header row
//         const headerRow = document.createElement('tr');
//         let contador = 1;
//         for (const key in data[0]) {
//             const th = document.createElement('th');
//             th.textContent = key;
//             headerRow.appendChild(th);
//         }
//         const th = document.createElement('th');
//         th.textContent = "Certificados"
//         headerRow.appendChild(th);
//         table.appendChild(headerRow);

//         // Create the table body rows

//         data.forEach(item => {

//             const row = document.createElement('tr');

//             for (const key in item) {
//                 const td = document.createElement('td');
//                 td.textContent = item[key];

//                 row.appendChild(td);
//             }
//             //Asgina cantidad de certificados
//             const expediente = item.expediente;
//             fetch('http://localhost:4000/api/alumnos_certificados/' + expediente)
//                 .then(response => response.json())
//                 .then(data => {
//                     const td = document.createElement('td');
//                     const responseCount = data.length;
//                     td.textContent = responseCount;
//                     row.appendChild(td);
//                     //Agregar un boton si hay certificados
//                     if (responseCount > 0) {
//                         let button = document.createElement('button');
//                         button.textContent = 'Ver';
//                         button.classList.add('btn');
//                         button.id = expediente;
//                         button.addEventListener('click', function () {
//                             window.location.href = 'certificados.html?id=' + encodeURIComponent(button.id);
//                         });
//                         td.appendChild(button);
//                     }
//                 })
//                 .catch(error => {
//                     // Handle errors here
//                     console.error(error);
//                 });
//             //Cambiaq color de fila
//             if (contador % 2 != 0) {
//                 row.classList.add('odd-row');
//             }
//             contador++;
//             table.appendChild(row);
//         });

//         // Append the table to the container
//         dataContainer.appendChild(table);

//     })
//     .catch(error => {
//         console.error(error);
//         dataContainer.textContent = 'Error loading table data';
//     });

const dataContainer = document.getElementById('alumnos');
//Codigo para crear 1 fila de 4 tarjetas de alumnos hasta que se acaben los alumnos

fetch('http://localhost:4000/api/alumnos')
    .then(response => response.json())
    .then(data => {
        // Ciclo para crear las tarjetas
        let totalFilas = data.length / 4;
        let contador = 0;
        for (let i = 0; i < totalFilas; i++) {
            //Crea el tarjetas que contiene las tarjetas
            const tarjetas = document.createElement('div');
            tarjetas.classList.add('tarjetas');

            for (let j = 0; j < 4; j++) {
                //Crea el tarjetas que contiene la tarjeta
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta');
                //Si no hay mas alumnos, se sale del ciclo
                if (contador >= data.length) {
                    break;
                } else {
                    tarjeta.setAttribute('id', data[contador].expediente);
                    //Crea el elemento h4 que contiene el nombre del alumno
                    const h4 = document.createElement('h4');
                    h4.classList.add('tarjeta-nombre');
                    h4.textContent = data[contador].nombre;
                    //Crea el elemento img que contiene la imagen y su ruta
                    const imagen = document.createElement('img');
                    imagen.classList.add('fotoAlumno');
                    imagen.src = 'estudiante.png';
                    imagen.alt = 'Alumno';

                    //Crea el tarjetas que contiene el cuerpo de la tarjeta
                    const body = document.createElement('div');
                    body.classList.add('tarjeta-body');

                    //Crea el elemento p que solo dice expediente
                    const p = document.createElement('p');
                    p.textContent = 'Expediente: ';

                    //Crea el elemento p que contiene el expediente del alumno
                    const expediente = document.createElement('p');
                    expediente.textContent = data[contador].expediente;

                    //Crea el elmento p que solo dice correo
                    const p2 = document.createElement('p');
                    p2.textContent = 'Correo: ';

                    //Crea el elemento p que contiene el correo del alumno
                    const correo = document.createElement('p');
                    correo.textContent = data[contador].correo;

                    //Crea el elemento p que solo dice skills
                    const p3 = document.createElement('p');
                    p3.textContent = 'Skills: ';

                    //Crea el elemento p que contiene los skills del alumno
                    const skills = document.createElement('p');
                    skills.textContent = data[contador].skills;

                    //Crea el elemento p que solo dice certificados
                    const p4 = document.createElement('p');
                    p4.textContent = 'Certificados: ';

                    //Agrega los elementos a tarjeta
                    body.appendChild(p);
                    body.appendChild(expediente);
                    body.appendChild(p2);
                    body.appendChild(correo);
                    body.appendChild(p3);
                    body.appendChild(skills);
                    body.appendChild(p4);

                    //Asgina cantidad de certificados al elemento p
                    fetch('http://localhost:4000/api/alumnos_certificados/' + expediente.textContent)
                        .then(response => response.json())
                        .then(data => {
                            //Crea el elemento p que contiene los certificados del alumno
                            const certificados = document.createElement('p');
                            const responseCount = data.length;
                            certificados.textContent = responseCount;
                            //Agrega el elemento p al body
                            body.appendChild(certificados);
                            //Agregar un boton si hay certificados
                            if (responseCount > 0) {
                                let button = document.createElement('button');
                                button.textContent = 'Ver';
                                button.classList.add('btn');
                                button.id = expediente.textContent;
                                button.addEventListener('click', function () {
                                    window.location.href = 'certificados.html?id=' + encodeURIComponent(button.id);
                                });
                                body.appendChild(button);
                            }
                        })
                        .catch(error => {
                            // Handle errors here
                            console.error(error);
                            tarjeta.textContent = 'Error loading alumno cert data';
                        });

                    //Agrega los elementos a tarjeta
                    tarjeta.appendChild(h4);
                    tarjeta.appendChild(imagen);
                    tarjeta.appendChild(body);



                    contador++;
                }
                //Agrega la tarjeta al tarjetas
                tarjetas.appendChild(tarjeta);
            }
            dataContainer.appendChild(tarjetas);
        }
    })
    .catch(error => {
        // Handle errors here
        dataContainer.textContent = 'Error loading alumnos data';
        console.error(error);
    });
