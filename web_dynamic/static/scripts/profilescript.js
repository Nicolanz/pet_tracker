const $ = window.$;
const alert = window.alert;
$(document).ready(function () {
  const user_id = document.getElementById('sub').value;
  var notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'center',
      y: 'top',
    },
  });
  $.ajax('http://localhost:5000/api/v1/users/' + user_id + '/pets', {
    type: 'GET',
  }).done(function (data) {
    for (const pets of data) {
      $.ajax('http://localhost:5000/api/v1/pictures/' + pets.id, {
        type: 'GET',
      }).done((result) => {
        if (result.status === 'Not found') {
          result = '../static/images/dog1.png';
        }
        let new_date = new Date(pets.birthday);
        let birthday = new_date.toISOString().split('T')[0];
        $('.pet').prepend(
          `<div class="pet_target col-9 d-flex align-items-center justify-content-around flex-row flex-wrap bg-light rounded border">
            <div class="foto col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 h-75 mt-4 mt-lg-0">
              <img src="${result}" class="img-fluid w-100 h-100 img-thumbnail rounded" alt="...">
              <div class="d-flex flex-row justify-content-center border d-lg-block my-4 my-md-0">
                <a href="/pet_location?pet-id=${pets.id}" class="d-flex align-items-center" id="img1">
                  <svg width="80%" height="60%" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                    <path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                </a>
                <a href="/pet_settings?pet-id=${pets.id}" class="d-flex align-items-center" id="img2">
                  <svg width="80%" height="60%" viewBox="0 0 16 16" class="bi bi-gear-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
                  </svg>
                </a>
                <a role="button" class="d-flex align-items-center" id="img5" onclick="remove('${pets.id}')" >
                  <svg width="80%" height="60%" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                </a>
              </div>
            </div>
          <div class="col-xl-9 col-lg-8 col-12 datos d-flex flex-column flex-wrap">
            <div class="col-12 my-4 my-lg-2 d-flex flex-nowrap justify-content-center">
              <h1 class="align-self-center"> ${pets.name} </h1>
            </div>
            <!-- Pet data -->
            <table class="table">
              <tbody>
                <tr>
                  <td><b>Raza:</b><span class="pull-right">${pets.race}</span></td>
                </tr>
                <tr>
                  <td><b>Cumpleaños: </b> <span class="pull-right">${birthday}</span></td>
                </tr>
                <tr>
                  <td><b>Sexo: </b> <span class="pull-right">${pets.sex}</span></td>
                </tr>
                <tr><td class="p-0 m-0 w-0 h-0"></td></tr>
              </tbody>
            </table>
            <div class="col-12 d-flex flex-row flex-wrap align-items-center my-4 my-lg-0">
              <!-- Add collar -->
                <div class="col-12 col-md-7 addCollar d-flex flex-row flex-nowrap align-items-center justify-content-center">
                  <input type="text" class="col-8 form-control pet-id-${pets.id}" name="collar_id" placeholder="Collar Id">
                  <div class="col-4 d-flex flex-row flex-nowrap">
                    <button type="button" class="btn btn-success add-delete button-add-collar" data-pet-id="${pets.id}" data-user-id="${user_id}">+</button>
                    <button type="button" class="btn btn-danger add-delete button-delete-collar" data-pet-id="${pets.id}" data-user-id="${user_id}">-</button>
                  </div>
                </div>
                <div class="col-0 col-md-5 d-flex flex-row flex-nowrap justify-content-end ">
                  <!-- Pet location -->
                  <a href="/pet_location?pet-id=${pets.id}" class="d-flex align-items-center" id="img3">
                    <svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                      <path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                  </a>
                  <!-- Pet Settings -->
                  <a href="/pet_settings?pet-id=${pets.id}" class="d-flex align-items-center" id="img4">
                    <svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-gear-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
                    </svg>
                  </a>
                  <!-- Delete Pet -->
                  <a role="button" class="d-flex align-items-center" id="img6" onclick="remove('${pets.id}')" >
                    <svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg>
                  </a>
                </div>
            </div>
          </div>
        </div>`
        );

        $('.button-add-collar').click((buttonElement) => {
          const petId = buttonElement.currentTarget.dataset.petId;
          const userId = buttonElement.currentTarget.dataset.userId;

          // Get the value of collar
          const inputElement = document.querySelector('.pet-id-' + petId);
          const collarId = inputElement.value;

          requestApi(userId, petId, collarId);
        });
        $('.button-delete-collar').click((buttonElement) => {
          const petId1 = buttonElement.currentTarget.dataset.petId;

          /* Get the value of collar */
          const inputElement = document.querySelector('.pet-id-' + petId1);
          const collar_id = inputElement.value;

          const result = confirm('Desea eliminar el collar');
          if (result) {
            axios({
              method: 'get',
              url: 'http://localhost:5000/api/v1/pets/' + petId1 + '/collars',
              responseType: 'json',
            })
              .then(function (response) {
                if (response.data.status === 'EXIST') {
                  axios({
                    method: 'delete',
                    url: 'http://localhost:5000/api/v1/collars/' + collar_id,
                    responseType: 'json',
                  }).then(function (response) {
                    notyf.success('el collar ha sido eliminado');
                  });
                } else {
                  notyf.error('el id del collar no esta asignado al usuario');
                }
              })
              .catch(function (error) {
                notyf.error('Verifica si el id es correcto');
              });
          }
        });

        function requestApi(user_id, pet_id, collar_id) {
          // Request to API of company to get the id of the collar
          const url =
            'https://jsonplaceholder.typicode.com/todos?id=' + collar_id;
          $.ajax({
            type: 'GET',
            url: url,
            dataType: 'text',
            error: function (xhr, status, error) {
              const err = JSON.parse(xhr.responseText);
              alert(err.Message);
            },
            success: function (data) {
              if (data === '[]') {
                notyf.error(' Id does not exist in the API! ');
              } else {
                verifyCollar(user_id, pet_id, collar_id);
              }
            },
          });
        }

        function verifyCollar(user_id, pet_id, collar_id) {
          $.ajax('http://localhost:5000/api/v1/pets/' + pet_id + '/collars', {
            type: 'GET',
          }).done((data) => {
            if (data.status === 'NO EXIST') {
              /* La mascota no debe tener asociado ningun collar ni el collar debe existir */
              $.ajax('http://localhost:5000/api/v1/collars/' + collar_id, {
                type: 'GET',
                success: function (data) {
                  if (data.status === 'NO EXIST') {
                    CreateCollar(user_id, pet_id, collar_id);
                  } else {
                    notyf.error(' Collar ya existe ! ');
                  }
                },
              });
            } else {
              notyf.error(' Pet ya tiene collar asignado ! ');
            }
          });
        }

        function CreateCollar(user_id, pet_id, collar_id) {
          /* Create a new Collar */
          $.ajax('http://localhost:5000/api/v1/collars', {
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              user_id: user_id,
              pet_id: pet_id,
              numero_ref: collar_id,
            }),
            error: function (xhr, status, error) {
              const err = JSON.parse(xhr.responseText);
              alert(err.Message);
              notyf.error(' Error creando collar ! ');
            },
            success: function () {
              $('.pet-id-' + pet_id).text('Collar id: ' + collar_id);
              notyf.success(' Collar creado satisfactoriamente! ');
            },
          });
        }
      });
    }
  });
});
// Function to remove pets onclick
function remove(pet_id) {
  if (confirm('¿Esta seguro de que desea eliminar a su mascota?')) {
    $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
      type: 'DELETE',
    }).done(function (data) {
      location.reload();
    });
  }
}
