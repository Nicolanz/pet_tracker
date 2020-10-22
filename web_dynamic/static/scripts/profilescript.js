const $ = window.$;
const alert = window.alert;
$(document).ready(function () {
  const user_id = document.getElementById('sub').value;
  $.ajax('http://localhost:5000/api/v1/users/' + user_id, {
    type: 'GET'
  }).done(function (data) {
    $('#username').append(data.nickname);
  });

  $.ajax('http://localhost:5000/api/v1/users/' + user_id + '/pets', {
    type: 'GET'
  }).done(function (data) {
    for (const pets of data) {
      const new_date = new Date(pets.birthday);
      const birthday = new_date.toISOString().split('T')[0];
      $('.pet').prepend(
        `<div class="pet_target col-7 container-fluid d-flex align-items-center justify-content-center flex-row flex-wrap bg-light rounded">
          <div class="foto col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <img src="../static/images/dog.png" class="img-thumbnail img-fluid w-75 h-75 rounded" alt="...">
          </div>
          <div class="col-xl-5 col-lg-5 col-12 datos d-flex flex-column flex-wrap">
            <div class="col-12 d-flex flex-nowrap justify-content-center">
              <h4 class="align-self-center navbar-brand"> ${pets.name} </h4>
              <div class="d-flex flex-nowrap justify-content-start">
                <a href="" class="d-flex align-items-center"  id="img1">
                  <svg width="80%" height="60%" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                    <path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                </a>
                <a href="" class="d-flex align-items-center" id="img2">
                  <svg  width="80%" height="60%" viewBox="0 0 16 16" class="bi bi-gear-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
                  </svg>
                </a>
              </div>
            </div>
            <ul class="list-group">
              <li class="list-group-item"><b>Raza: </b> ${pets.race} </li>
              <li class="list-group-item"><b>Cumpleaños: </b> ${birthday} </li>
              <li class="list-group-item"><b>Sex: </b> ${pets.sex} </li>
            </ul>
            <br><br> 
            <form action="/add_collar">
              <div class="col-12 d-flex flex-row flex-nowrap justify-content-center">
                <input type="text" class="form-control col-9 pet-id-${pets.id}" name="collar_id" placeholder="Collar Id">
                <button type="button" class="btn btn-default ml-2 button-add-collar" data-pet-id="${pets.id}" data-user-id="${user_id}">ADD</button>
              </div>
            </form>  
          </div> 

          <div class="iconos d-flex justify-content-center col-xl-3 col-lg-3 col-6>
            <a href="/pet_location?pet-id="${pets.id}" class="d-flex align-items-center" id="img3">
              <svg width="100%" height="70%" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </a>
            <a href="/pet_settings?pet-id="${pets.id}" class="d-flex align-items-center" id="img4">
              <svg width="100%" height="70%" viewBox="0 0 16 16" class="bi bi-gear-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
              </svg>
            </a>
            
            <span class="d-flex align-items-center" id="img6" onclick="remove('${pets.id}')" >
              <svg width="100%" height="70%" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
            </span>
          </div>
        </div>`
      );
    }
    $('.button-add-collar').click((buttonElement) => {
      const petId = buttonElement.currentTarget.dataset.petId;
      const userId = buttonElement.currentTarget.dataset.userId;

      // Get the value of collar
      const inputElement = document.querySelector('.pet-id-' + petId);
      const collarId = inputElement.value;

      requestApi(userId, petId, collarId);
    });
  });

  function requestApi (user_id, pet_id, collar_id) {
  // Request to API of company to get the id of the collar
    let result;
    const url = 'https://jsonplaceholder.typicode.com/todos?id=' + collar_id;
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
          alert(' Id does not exist in the API! ');
        } else {
          alert(' Id exist :D in the IP! ');
          verifyCollar(user_id, pet_id, collar_id);
        }
      }
    });
  }

  function verifyCollar (user_id, pet_id, collar_id) {
    $.ajax('http://localhost:5000/api/v1/pets/' + pet_id + '/collars', {
      type: 'GET'
    }).done(data => {
      if (data.status === 'NO EXIST') {
        /* La mascota no debe tener asociado ningun collar ni el collar debe existir */
        $.ajax('http://localhost:5000/api/v1/collars/' + collar_id, {
          type: 'GET',
          success: function (data) {
            if (data.status === 'NO EXIST') {
              CreateCollar(user_id, pet_id, collar_id);
              alert(' Collar creado satisfactoriamente! ');
            } else {
              alert(' Collar ya existe ! ');
            }
          }
        });
      } else {
        alert(' Pet ya tiene collar asignado ! ');
      }
    });
  }

  function CreateCollar (user_id, pet_id, collar_id) {
    /* Create a new Collar */
    $.ajax('http://localhost:5000/api/v1/collars', {
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        user_id: user_id,
        pet_id: pet_id,
        numero_ref: collar_id
      }),
      error: function (xhr, status, error) {
        const err = JSON.parse(xhr.responseText);
        alert(err.Message);
        alert('Error creando Collar');
      },
      success: function () {
        $('.pet-id-' + pet_id).text('Collar id: ' + collar_id);
        alert(' Collar creado exitosamente ! ');
      }
    });
  }
});

// Function to remove pets onclick
function remove (pet_id) {
  const result = confirm('¿Esta seguro que desea eliminar la mascota?');
  if (result) {
    alert('borrando...');
    $.ajax('http://localhost:5000/api/v1/pets/' + pet_id, {
      type: 'DELETE'
    });
    $.ajax({
      url: 'http://localhost:5000/api/v1/pets/' + pet_id,
      type: 'DELETE'
    });
    location.reload();
  }
}
