const $ = window.$;
$(document).ready(function () {
  /*Obtener datos almacenados*/
  const nombre = sessionStorage.getItem('full_name');
  const user_name1 = sessionStorage.getItem('user_name');
  const cel1 = sessionStorage.getItem('cel');
  const addres1 = sessionStorage.getItem('addres');
  const email1 = sessionStorage.getItem('email');
  const password1 = sessionStorage.getItem('password');
  const document1 = sessionStorage.getItem('documento');
  const user_id1 = sessionStorage.getItem('user_id');

  /*Captura de datos de la base de datos hacia el formulario*/
  $.ajax('http://0.0.0.0:5000/api/v1/users/' + user_id1, {
    type: 'GET',
  }).done(function (data) {
    $('#email1').val(data.email);
    $('#fullname1').val(data.name);
    $('#username1').val(data.nickname);
    $('#cel1').val(data.Phone);
    $('#addres1').val(data.address);
    $('#document1').val(data.documento);
  });
  $('#boton-guardar').click(function () {
    /*Captura de datos escritorio en los inputs*/
    const full_name = document.getElementById('fullname1').value;
    const user_name = document.getElementById('username1').value;
    const cel = document.getElementById('cel1').value;
    const addres = document.getElementById('addres1').value;
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;
    const documento = document.getElementById('document1').value;
    /*Guardando los datos en el seccion store */
    sessionStorage.setItem('full_name', full_name);
    sessionStorage.setItem('user_name', user_name);
    sessionStorage.setItem('cel', cel);
    sessionStorage.setItem('addres', addres);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('documento', documento);
    /*Limpiando los campos o inputs*/
    document.getElementById('fullname1').value = '';
    document.getElementById('username1').value = '';
    document.getElementById('cel1').value = '';
    document.getElementById('addres1').value = '';
    document.getElementById('email1').value = '';
    document.getElementById('password1').value = '';
    document.getElementById('document1').value = '';

    /*Update the data in data base */
    $.ajax('http://0.0.0.0:5000/api/v1/users/' + user_id1, {
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        name: nombre,
        nickname: user_name1,
        Phone: cel1,
        address: addres1,
        email: email1,
        documento: document1,
      }),
      dataType: 'json',
    });
  });
});
