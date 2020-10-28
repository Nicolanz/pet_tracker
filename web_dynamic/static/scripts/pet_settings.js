const $ = window.$;
$(document).ready(function () {
  const pet_id = document.getElementById('pet_id').value;
  const userId = document.getElementById('user_id').value;

  $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
    type: 'GET',
  }).done((pet_dict) => {
    let new_date = new Date(pet_dict.birthday);
    let birthday = new_date.toISOString().split('T')[0];

    $('#name').val(pet_dict.name);
    $('#birthday').val(birthday);
    $('#race').val(pet_dict.race);
    $('#color').val(pet_dict.color);
    $('#sex').val(pet_dict.sex);
    $('#specie').val(pet_dict.specie);
    $('#hair').val(pet_dict.hair);
    $('#description').val(pet_dict.description);
  });

  $('#boton-guardar').click(function () {
    const name = document.getElementById('name').value;
    if (name === '') {
      let notyf = new Notyf({
        duration: 5000,
        position: {
          x: 'center',
          y: 'top',
        },
      });
      notyf.error('Nombre es requisito!');
      return;
    }
    const birthday = document.getElementById('birthday').value;
    if (birthday === '') {
      let notyf = new Notyf({
        duration: 5000,
        position: {
          x: 'center',
          y: 'top',
        },
      });
      notyf.error('Fecha de nacimiento es requisito!');
      return;
    }
    const race = document.getElementById('race').value;
    const color = document.getElementById('color').value;
    const specie = document.getElementById('specie').value;
    const hair = document.getElementById('hair').value;
    const description = document.getElementById('description').value;
    const sexinput1 = $('#inlineRadio1').is(':checked');
    const sexinput2 = $('#inlineRadio2').is(':checked');
    let sex = '';
    if (sexinput1 === true) {
      sex = document.getElementById('inlineRadio1').value;
    } else if (sexinput2 === true) {
      sex = document.getElementById('inlineRadio2').value;
    }

    /*Update the data in data base */
    $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        name: name,
        birthday: birthday,
        race: race,
        color: color,
        sex: sex,
        specie: specie,
        hair: hair,
        description: description,
      }),
    });

    let notyf = new Notyf({
      duration: 5000,
      position: {
        x: 'center',
        y: 'top',
      },
    });
    // Display a success notification
    notyf.success('Tus cambios se han guardado satisfactoriamente!');
  });
});
