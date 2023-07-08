const dataContainer = document.getElementById('tabla');

fetch('http://localhost:3000/api/alumnos')
.then(response => response.json())
.then(data => {
    // Create the table element
    const table = document.createElement('table');

    // Create the table header row
    const headerRow = document.createElement('tr');
    let contador=1;
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
    fetch('http://localhost:3000/api/alumnos/'+expediente)
    .then(response => response.json())
    .then(data => {
        const td = document.createElement('td');
        const responseCount = data.length; 
        td.textContent = responseCount;
        row.appendChild(td);
        //Agregar un boton si hay certificados
        if(responseCount>0){
            let button = document.createElement('button');
            button.textContent = 'Ver'; 
            button.classList.add('btn');
            button.id = expediente;
            button.addEventListener('click', function() {
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
    if(contador%2!=0){
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