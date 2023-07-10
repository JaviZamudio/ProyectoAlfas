const dataContainer = document.getElementById('tabla');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const alumno = document.getElementById('alumno');
alumno.textContent += id;

fetch('http://localhost:3000/api/alumnos_certificados/' + id)
    .then(response => response.json())
    .then(data => {
        alumno.textContent += " " + data[0].nombres;
        alumno.textContent += " " + data[0].apellidos;
        // Create the table element
        const table = document.createElement('table');

        // Create the table header row
        const headerRow = document.createElement('tr');
        let contadorFila = 1;
        let contador = 1;
        for (const key in data[0]) {
            if (contador > 2) {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            } contador++;
        }
        table.appendChild(headerRow);

        // Create the table body rows

        data.forEach(item => {

            const row = document.createElement('tr');
            contador = 0;
            for (const key in item) {
                if (contador > 1) {
                    const td = document.createElement('td');
                    td.textContent = item[key];

                    row.appendChild(td);
                } contador++;

            }
            //Cambiaq color de fila
            if (contadorFila % 2 != 0) {
                row.classList.add('odd-row');
            }
            contadorFila++;
            table.appendChild(row);
        });

        // Append the table to the container
        dataContainer.appendChild(table);

    })
    .catch(error => {
        console.error(error);
        dataContainer.textContent = 'Error loading data';
    });