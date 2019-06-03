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

function toggleActive(e) {
  $(e).toggleClass("active");
}

function submitComentario() {
  $('#comentario').submit()
}
