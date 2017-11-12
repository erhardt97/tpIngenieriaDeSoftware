var TravelRequest = function(name, map) {
    this.name = name;
    this.map = map;
    this.carsData = [];
    
    var anterior=null;


    this.addCar = function(carDriver) {
        //Creamos el layer en el mapa para ese carDriver
        var carLayer = L.layerGroup().addTo(this.map);

        var iconoAuto = L.icon({
            iconUrl: 'leaflet/images/auto3.png',
            iconSize:     [38, 95], // size of the icon
            
            iconAnchor:   [20, 94], // point of the icon which will correspond to marker's location
            
            popupAnchor:  [-5, -76]
         } );
        
        var marker= L.marker(map.getCenter(),{icon: iconoAuto}).addTo(map);
        
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(carLayer, carDriver.name);

        

        var updater = function(newPosition) {
            //console.log("Updating view for car driver: " + carDriver.name + "!!");
            //console.log(newPosition);

            // Opción 1.
            var marca=marker.setLatLng(newPosition);
            //marca.setIcon("leaflet/iamge/auto2.png");
            marca.bindPopup('<p>Nombre Chofer:'+carDriver.name+'</p><p>Ubicacion:'+newPosition+'</p>');
            carLayer.addLayer(marca);



        
            
       

           
           
            // Opción 2.
            // carLayer.addLayer(L.circleMarker(newPosition, {
            //                         radius: 7,
            //                         fillColor: "#00AA00",
            //                         color: "#DDD",
            //                         weight: 1,
            //                         opacity: 1,
            //                         fillOpacity: 0.3
            //                     }));
        }

        this.carsData.push({
            carDriver: carDriver,
            updater: updater
        })
        
    }


    this.start = function() {

        this.carsData.forEach(function(data) {
            var carDriver = data.carDriver;
            carDriver.move(data.updater);
        });
    }
};
