const $ = window.$;
$(document).ready(() => {
  const pet_id = document.getElementById('pet_id').value;
  console.log(pet_id)
  $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
    type: 'GET',
  }).done((pet_dict) => {
    console.log(pet_id.birthday)
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
    let latitude = '45.4517491';
    let longitude = '-70.94974239999999';
    document.getElementById('map_loc').src =
      'https://www.google.com/maps/embed/v1/place?key=AIzaSyDQxpJBu62z9e1WuzVIfUmf7bIFj16cBeQ&q=' +
      latitude +
      ',' +
      longitude +
      '&zoom=15';
  });
});
