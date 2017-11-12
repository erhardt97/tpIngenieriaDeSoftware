var ungsLocation;
var map;
var travelreq;
var conductores;
var posiciones;



function bootstrap() {

    // Ubicación de la UNGS.
    //var ungsLocation = [-34.5221554, -58.7000067];
    ungsLocation = [-34.5221554, -58.7000067];
    // Creación del componente mapa de Leaflet.
    //var map = L.map('map').setView(ungsLocation, 15);
    map = L.map('map').setView(ungsLocation, 15);

    /*
    var popup = L.popup()
    .setLatLng([-34.5221554, -58.7000067])
    .setContent("I am a standalone popup.")
    .openOn(map);

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    

    map.on('click', onMapClick);
*/

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);
    // hack:
    map.layersControl = layersControl;

    // Creamos un círculo con centro en la UNGS.
    var circle = L.circle(ungsLocation, {
        //color: '#0000AA',
        //fillColor: '#0000CC',
        fillOpacity: 0.2,
        radius: 200
    }).addTo(map);

    // Creamos un polígono.
    L.polygon([
        L.latLng(-34.515594, -58.705654),
        L.latLng(-34.523503, -58.714062),
        L.latLng(-34.519177, -58.719890),
        L.latLng(-34.511089, -58.711374),
        L.latLng(-34.514062, -58.707909),
        L.latLng(-34.513824, -58.707584),
    ]).addTo(map);

    // Creamos un circuito.
    L.polyline([
        L.latLng(-34.524309,-58.695315),
        L.latLng(-34.521865, -58.698213),
        L.latLng(-34.520437, -58.699889),
        L.latLng(-34.522388, -58.701957),
        L.latLng(-34.523579, -58.700350)
    ], {color: 'red'}).addTo(map);

    // Creamos un marker sobre la UNGS.
    var ungsMarker = L.marker(ungsLocation);
    ungsMarker.addTo(map);

    // Creamos un pedido de viaje
    //var travelreq = new TravelRequest("UNGS", map);
    travelreq = new TravelRequest("UNGS", map);
    
// leemos drivers api
    $.getJSON("https://snapcar.herokuapp.com/api/drivers", function(data) {
        conductores=data;
        console.log(data);
        });

// leemos posiciones api
$.getJSON("https://snapcar.herokuapp.com/api/positions", function(data) {
    posiciones=data;
    console.log(data);
    });
    
/*   $.getJSON("document.json", function(data) {
    // Aquí puedes manejar la variable data, que contiene el array con los datos del JSON.

    dibujarAutos(data);
    //crearAuto(informacion);

    //alert(data['login']);
    });

  function dibujarAutos(choferes){
    for (var j = 1; j < choferes.Choferes.length; j++) {

   
                //JSON.Choferes[0].nombre[0];
                //var pos= JSON.Choferes[j].posicion;

                var car1= new CarDriver(choferes.Choferes[0].nombre[j-1], choferes.Choferes[j].posicion);
                travelreq.addCar(car1);
                
                console.log(choferes.Choferes[0].nombre[j-1]);
                console.log(choferes.Choferes[j].posicion);

            
        }
        travelreq.start();
  }*/

    var aa={
        "Choferes":[
                {"nombre":["Cristian","Carlos","Alberto"]},
                {"posicion":[
                {lon: -58.695290, lat: -34.524297},
                {lon: -58.697030, lat: -34.522856},
                {lon: -58.698210, lat: -34.521874}]},
                {"posicion":[
                {lon: -58.702329, lat: -34.522739},
                {lon: -58.702572, lat: -34.522992},
                {lon: -58.702801, lat: -34.523191},
                {lon: -58.703056, lat: -34.523412},
                {lon: -58.703299, lat: -34.523643}]},
                {"posicion":[
                {lon: -58.704918, lat: -34.519910},
                {lon: -58.704650, lat: -34.520131},
                {lon: -58.704248, lat: -34.520436},
                {lon: -58.703990, lat: -34.520670},
                {lon: -58.703765, lat: -34.520873},
                {lon: -58.703159, lat: -34.521377}]}
                ]};


       /* var car3 = new CarDriver("Alexis",[
         {"lon": -58.702572, "lat": -34.522992},
       {"lon": -58.703056, "lat": -34.523412},
       {"lon": -58.703299, "lat": -34.523643}
     ]);

   travelreq.addCar(car3);*/

  //  travelreq.start();
/*  $(document).ready(function(){
      	
    $(selector).click(function(){
        console.log("esta vivo!!!!");
    })
})*/

    }

    function mostrar(){
    
            
            console.log("entro");
            console.log(conductores.drivers.length);
            for (var i = 0; i < conductores.drivers.length; i++) {
        
                
                for(var j=0; j<posiciones.positions.length; j++){
                    if(conductores.drivers[i].id == posiciones.positions[j].driver){
                        console.log("coincide");
                        //var car1= new CarDriver(conductores.drivers[i].name,posiciones.positions[j].positions);
                        //travelreq.addCar(car1);
                    }
                    
                    

                }
                
            }
        
            travelreq.start();    
                
                
              
        
    }

    function mostrarPrimeraPos(){
        $.getJSON("https://snapcar.herokuapp.com/api/drivers", function(data) {
            // Aquí puedes manejar la variable data, que contiene el array con los datos del JSON.
        
            dibujarAutos(data);
            //crearAuto(informacion);
        
            //alert(data['login']);
            });

        function dibujarAutos(choferes){
            for (var j = 1; j < choferes.Choferes.length; j++) {
        
           
                        //JSON.Choferes[0].nombre[0];
                        //var pos= JSON.Choferes[j].posicion;
        
                        var car1= new CarDriver(choferes.Choferes[0].nombre[j-1], choferes.Choferes[j].posicion[0]);
                        travelreq.addCar(car1);
                        
                        console.log(choferes.Choferes[0].nombre[j-1]);
                        console.log(choferes.Choferes[j].posicion);
        
                    
                }
                travelreq.start();
              }

    }

$(bootstrap);
$(mostrar);
