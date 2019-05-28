import {$} from "protractor";

$(document).ready(function () {
  console.log("test");
});

$('#x').click(function () {

  if ($(this).hasClass("far")) {
    $(this).addClass("fas").removeClass("far");
  } else {
    $(this).addClass("far").removeClass("fas");
  }
});

$('.instruction-check').click(function () {
  console.log("ola");
  $(this).toggleClass("active");
});

function toggleActive(id) {
  var element = document.getElementById(id);
  element.toggleClass("active");
}

function submitComentario() {
  $('#comentario').submit()
}
