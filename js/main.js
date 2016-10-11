$(document).ready(function(){

	var top = $('.nav').offset().top;
	$(window).on('scroll', function(){
		if ($(window).scrollTop() > top) {
			$('.nav').addClass('fixed');
		}else{
			$('.nav').removeClass('fixed');
		}
	});

	 $('.animation-scroll').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top -60
          }, 500);
          return false;
        }
      }
    });   
});

var portafolio = {};

//Prototype
Function.prototype.method = function(name, func){
    
    if(!this.prototype[name]){
        this.prototype[name] = func;
    } 
    return this;
};

// Cargar JSON
portafolio.loadJSON = function(callback) { 
  var obj = new XMLHttpRequest();
  obj.overrideMimeType("application/json");
  obj.open('GET', 'js/list_projects.json', true);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4 && obj.status == "200") {
      callback(obj.responseText);
    }
  };
  obj.send(null);
};

// Generar Proyectos con JSON
var projects = [];
var cantidad = 3;

portafolio.generarProyectos = function(lista_proyectos){
  var result = "";
  for (var i = 0; i <= cantidad-1; i++){
    result += "<div class='item-project'>"+
            "<img class='img' src='"+lista_proyectos[i].miniature+"'>"+
            "<div class='content-project'>"+
              "<h4>"+lista_proyectos[i].name+"</h4>"+
              "<p>"+lista_proyectos[i].minidescrip+"</p>"+
              "<a href='#modal_"+(i+1)+"'>Ver m&aacute;s</a>"+
            "</div>"+
          "</div>"+
          "<div id='modal_"+(i+1)+"' class='modal'>"+
            "<div class='modalbox'>"+
            "<a href='#!' class='close'>&times;</a>"+
              "<div class='modalcontent'>"+
                "<h2>"+lista_proyectos[i].name+"</h2>"+
                "<div class='left'>"+
                  "<p>"+lista_proyectos[i].descrip+"</p>"+
                  "<p>Tareas: </p>"+  
                  "<a href='#'>Ir al Sitio</a>"+
                "</div>"+
                "<img src='"+lista_proyectos[i].imagen+"'>"+
              "</div>"+
            "</div>"+
          "</div>";

  };
  // Imprimir proyectos
  document.getElementById("projects").childNodes[3].innerHTML = result;
};

// Generar y Llamar la funcion para generar los proyectos
portafolio.loadJSON(function(response){
  projects = JSON.parse(response);
  portafolio.generarProyectos(projects);
});
