function handleFormSubmission(event) {
    event.preventDefault();
    let usuario = document.getElementsByName('user')[0].value;
    let contrasena = document.getElementsByName('pass')[0].value;

    //Checks if the user exists in the database
    fetch('http://localhost:4000/api/admins/'+usuario+'/'+contrasena)
    .then(response => response.json())
    .then(data => {
        if(data.length>0){
            sessionStorage.setItem('username', usuario);
            sessionStorage.setItem('logged', true);
            window.location.href = 'consultaAlumnos.html';
        }else{
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(error => {
        console.error(error);
        alert('Error de conexión con la base de datos');
    });

}