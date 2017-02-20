var counter = 0; //declare global because function displayShoutout is outside of doc ready
var phiShoutouts = [];
var interval = null;

$(document).ready(function() {
  // Upon page load, get the data from the server
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data) {
      // yay! we have data!
      console.log('returned data from server: ', data);

      phiShoutouts = data.phirephiters;
      console.log('here is my array', phiShoutouts);

      displayShoutout(counter);

      interval = setInterval(function() {
        counter++;
        displayShoutout(counter);
      }, 3000);

      // nextShoutout();

      phiShoutouts.forEach(function(shoutout, index) {
        var $point = $('<span>&Phi;</span>');
        if (index === 0) {
          $point.addClass('active');
        }

        $('#points').append($point);
      }); //ends forEach

      $('#next').on('click', function() {
        console.log('next button clicked');
        // clearInterval(interval);
        // nextShoutout();
        if (counter === phiShoutouts.length - 1) {
          counter = 0;
        } else {
          counter++;
        }
        displayShoutout(counter);
        updateActivePointer(counter);
      });
      $('#prev').on('click', function() {
        console.log('prev button clicked');
        // clearInterval(interval);
        if (counter === 0) {
          counter = phiShoutouts.length - 1;
        } else {
          counter--;
        }
        displayShoutout(counter);
        updateActivePointer(counter);
      });
    } //ends success fxn
  }); // ends ajax

}); //ends document ready

function displayShoutout(index) {
  $('#shoutouts').fadeOut('slow', function() {
    $('#name').text(phiShoutouts[index].name);
    $('#gitusername').text(phiShoutouts[index].git_username);
    $('#gitusername').attr('href', "//github.com/" + phiShoutouts[index].git_username);
    $('#shoutout').text(phiShoutouts[index].shoutout);

    $('#shoutouts').fadeIn('slow');
  });
}

function updateActivePointer(index) {
  $('.active').removeClass('active');
  $('#points').children().eq(index).addClass('active');
}

// function nextShoutout(index){
//   interval = setInterval(function() {
//     counter++;
//     displayShoutout(counter);
//   }, 3000);
// }




//
