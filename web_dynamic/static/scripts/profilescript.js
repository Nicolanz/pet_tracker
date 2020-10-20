const $ = window.$;
$(document).ready(function () {
  const user_id = document.getElementById('sub').value;
  // sessionStorage.setItem('user_id', user_id);
  // const user_id1 = sessionStorage.getItem('user_id');
  // $.ajax('http://localhost:5000/api/v1/users/' + 'user_id' + '/pets', {
  $.ajax('http://localhost:5000/api/v1/users/' + user_id, {
    type: 'GET',
  }).done(function (data) {
      $('#username').append(data.nickname);
  });
  $.ajax('http://localhost:5000/api/v1/users/' + user_id + '/pets', {
    type: 'GET',
  }).done(function (data) {
    for (const pets of data) {
      $('.pet').prepend(
        '<div class="pet_target col-10 container-fluid d-flex align-items-center justify-content-center flex-row flex-wrap bg-light rounded">' +
          '<div class="foto col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">' +
            '<img src="../static/images/dog.png" class="img-thumbnail img-fluid w-75 h-75 rounded" alt="...">' +
          '</div>' +
          '<div class="col-xl-5 col-lg-5 col-12 datos d-flex flex-column flex-wrap">' +
            '<h4 class="align-self-center navbar-brand">' + pets.name + '</h4>' +
            '<ul class="list-group">' +
              '<li class="list-group-item"><b>Raza:</b>' + pets.race + '</li>' +
              '<li class="list-group-item"><b>Sexo:</b>' + pets.sex + '</li>' +
              '<li class="list-group-item"><b>Cumpleaños:</b>' + pets.birthday + '</li>' +
              '</ul>' +
              '</div>' +
              '<div class="iconos d-flex justify-content-center col-xl-3 col-lg-3 col-6">' +
            '<a href="/pet_location?pet-id=' + pets.id + '" class="d-flex align-items-center">' +
              '<svg width="100%" height="70%" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>' +
                '<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>' +
              '</svg>' +
            '</a>' +
            '<a href="" class="d-flex align-items-center">' +
              '<svg width="100%" height="70%" viewBox="0 0 16 16" class="bi bi-gear-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                  '<path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>' +
              '</svg>' +
            '</a>' +
          '</div>' +
        '</div>'
      );
    }
  });
});
