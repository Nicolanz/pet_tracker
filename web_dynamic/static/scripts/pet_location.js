const $ = window.$;
$(document).ready(() => {
  const pet_id = '54342490-44c4-45b9-aa09-e2613f0c71fc';
  $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
    type: 'GET',
  }).done((pet_dict) => {
    let new_date = new Date(pet_dict.birthday);
    let birthday = new_date.toISOString().split('T')[0];

    $('.pet').append(
      '<ul>' +
        '<li><b>Name: </b> ' +
        pet_dict.name +
        '</li>' +
        '<li>Color: ' +
        pet_dict.color +
        '</li>' +
        '<li>Race: ' +
        pet_dict.race +
        '</li>' +
        '<li>Sex : ' +
        pet_dict.sex +
        '</li>' +
        '<li>Birthday: ' +
        birthday +
        '</li>' +
        '<li>Specie: ' +
        pet_dict.specie +
        '</li>' +
        '<li>Description: ' +
        pet_dict.description +
        '</li>' +
        '</ul>'
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
