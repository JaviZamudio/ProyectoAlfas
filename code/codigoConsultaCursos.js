if (sessionStorage.getItem('logged') == null || sessionStorage.getItem('logged') == false) {
    window.location.href = 'login.html';
}

const user = document.getElementById('user');
user.textContent = sessionStorage.getItem('username');

function agregarCursoVisibilidad() {
    let divAgregarCurso = document.getElementById('bkdrpFormAgregarCurso');
    divAgregarCurso.style.display = 'flex';
}

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
        console.error(error);
    }
    );
