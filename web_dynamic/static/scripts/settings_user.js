const $ = window.$;
$(document).ready(function () {
  /*Obtener datos almacenados*/
  // const user_id1 = sessionStorage.getItem('user_id');

  const user_id = document.getElementById('user_id').value;
  $.ajax('http://localhost:5000/api/v1/users/' + user_id, {
    type: 'GET',
  }).done((data) => {
    $('#email1').val(data.email);
    $('#fullname1').val(data.name);
    $('#username1').val(data.nickname);
    $('#cel1').val(data.Phone);
    $('#addres1').val(data.address);
    $('#document1').val(data.documento);
  });

  $('#boton-guardar').click(function () {
    const user_name = document.getElementById('username1').value;
    const cel = document.getElementById('cel1').value;
    const addres = document.getElementById('addres1').value;
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;
    const documento = document.getElementById('document1').value;
    const full_name = document.getElementById('fullname1').value;

    /*Update the data in data base */
    $.ajax('http://localhost:5000/api/v1/users/' + user_id, {
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        name: full_name,
        nickname: user_name,
        Phone: cel,
        address: addres,
        email: email,
        documento: documento,
      }),
    });

    let notyf = new Notyf({
      duration: 5000,
      position: {
        x: 'center',
        y: 'botton',
      },
    });
    // Display a success notification
    notyf.success('Your changes have been successfully saved!');
  });
});
