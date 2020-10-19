const $ = window.$;
$(document).ready(function () {
  const user_id = document.getElementById('sub').value;
  sessionStorage.setItem('user_id', user_id);
  const user_id1 = sessionStorage.getItem('user_id');
  $.ajax('http://0.0.0.0:5000/api/v1/users/' + user_id + '/pets', {
    type: 'GET',
  }).done(function (data) {
    for (const pets of data) {
      $('.pets ').append(
        '<div class="col-18 info"><h5>' +
          pets.name +
          '</h5><p>race: ' +
          pets.race +
          '</p></div>'
      );
    }
  });
});