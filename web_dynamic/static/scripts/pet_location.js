const $ = window.$;
$(document).ready(() => {
  const pet_id = document.getElementById('pet_id').value;
  const collarId = document.getElementById('collar_id').value;

  $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
    type: 'GET',
  }).done((pet_dict) => {
    let new_date = new Date(pet_dict.birthday);
    let birthday = new_date.toISOString().split('T')[0];
    $('.pet_info').append(
      `<div class="row">
        <div class="col-12">
        <!-- Category -->
          <div class="single category">
            <h3 class="side-title">Information</h3>
            <ul class="list-unstyled">
              <li>Name <span class="pull-right"> ${pet_dict.name} </span></li>
              <li>Color <span class="pull-right"> ${pet_dict.color} </span></li>
              <li>Race <span class="pull-right"> ${pet_dict.race} </span></li>
              <li>Sexo <span class="pull-right"> ${pet_dict.sex} </span></li>
              <li>Birthday<span class="pull-right"> ${birthday} </span></li>
              <li>Specie <span class="pull-right"> ${pet_dict.specie} </span></li>
              <li>Description: <a href="#demo" class="pull-right" data-toggle="collapse">Ver mas...</a>
              <br>
                <div id="demo" class="collapse text-justify"> ${pet_dict.description} </div>
             </li>
            </ul>
          </div>
        </div>
      </div>`
    );
  });

  $('#boton-location').click(function () {
    requestApi(collarId);
  });

  function requestApi(collar_id) {
    console.log('Collar id:', collar_id);
    collar_id = 1; // Just for testing
    /* Request to API of company to get the id coordenates of the collar */
    const url = 'https://jsonplaceholder.typicode.com/todos?id=' + collar_id;
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'text',
      error: function (xhr, status, error) {
        const err = JSON.parse(xhr.responseText);
        alert(err.Message);
      },
      success: getCoordenates,
    });
  }

  function getCoordenates(data) {
    /* hay que obtener longitud y latitude de la mascota con ese id */
    if (data === '[]') {
      alert(' Id no existe en la the API! ');
    } else {
      alert(' Id exist in the API! ');
      /* get coordenates from data of the API
      Here is represented with the coordates variable*/
      $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data) {
          let coordinates = data.results[0].location.coordinates;
          let latitude = coordinates.latitude;
          let longitude = coordinates.longitude;
          console.log('coordenates long:', longitude, 'latit: ', latitude);

          document.getElementById('map_loc').src =
            'https://www.google.com/maps/embed/v1/place?key=AIzaSyDQxpJBu62z9e1WuzVIfUmf7bIFj16cBeQ&q=' +
            latitude +
            ',' +
            longitude +
            '&zoom=3';
        },
      });
    }
  }
});
