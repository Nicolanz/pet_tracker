const $ = window.$;
$(document).ready(function () {
  const user_id = document.getElementById('user_id').value;
  const userName = document.getElementById('userName').value;
  $('#username').append(userName);

  $('#boton-pet').click(function () {
    const pet_name = document.getElementById('fullname1').value;
    const birthday = document.getElementById('birthday1').value;
    if (pet_name === '') {
      let notyf = new Notyf({
        duration: 7000,
        position: {
          x: 'center',
          y: 'top',
        },
      });
      notyf.error('Debes rellenar los campos de nombre.');
    } else if (birthday === '') {
      let notyf = new Notyf({
        duration: 7000,
        position: {
          x: 'center',
          y: 'top',
        },
      });
      notyf.error('Debes rellenar el campo cumpleaños.');
    } else {
      const user_id = document.getElementById('user_id').value;
      const race = document.getElementById('race1').value;
      const color = document.getElementById('color1').value;
      const specie = document.getElementById('specie1').value;
      const description = document.getElementById('description1').value;
      const sex = document.getElementById('sex1').value;
      /*Update the data in data base */
      $.ajax('http://localhost:5000/api/v1/users/' + user_id + '/pets', {
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          user_id: user_id,
          name: pet_name,
          race: race,
          sex: sex,
          color: color,
          specie: specie,
          birthday: birthday,
          description: description,
        }),
      });

      let notyf = new Notyf({
        duration: 7000,
        position: {
          x: 'center',
          y: 'top',
        },
      });
      // Display a success notification
      notyf.success('Su mascota ha sido agregada!');
    }
  });
});
