const $ = window.$;
$(document).ready( () => {
    const pet_id = '5b34eda4-b770-46e5-80ce-1b9ab7a52951'
    $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
    type: 'GET',
    }).done(pet_dict => {
        let new_date = new Date(pet_dict.birthday)
        let birthday = new_date.toISOString().split('T')[0];

      $('.pet').append(
        '<ul>' +
        '<li><b>Name: </b> ' + pet_dict.name + '</li>' +
         '<li>Color: ' + pet_dict.color + '</li>' +
        '<li>Race: ' + pet_dict.race + '</li>' +
        '<li>Sex : ' + pet_dict.sex + '</li>' + 
        '<li>Birthday: ' + birthday + '</li>' +
        '<li>Specie: ' + pet_dict.specie + '</li>' +
        '<li>Description: ' + pet_dict.description + '</li>' +
        '</ul>'
    )});
});
