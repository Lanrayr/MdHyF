 // Carga de Mapa
    var bounds = [[0,0],[8300,10000]];

    // Crear mapa con límites
    var map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0
    });

    map.fitBounds(bounds);

    // Cada cuadrante: 4150 px de alto y 2500 px de ancho
    // Fila superior (Y: 0–4150)
    L.imageOverlay('Images/Map/ASOIAFmap_0_0.png', [[0,0],[4150,2500]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_0_1.png', [[0,2500],[4150,5000]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_0_2.png', [[0,5000],[4150,7500]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_0_3.png', [[0,7500],[4150,10000]]).addTo(map);

    // Fila inferior (Y: 4150–8300)
    L.imageOverlay('Images/Map/ASOIAFmap_1_0.png', [[4150,0],[8300,2500]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_1_1.png', [[4150,2500],[8300,5000]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_1_2.png', [[4150,5000],[8300,7500]]).addTo(map);
    L.imageOverlay('Images/Map/ASOIAFmap_1_3.png', [[4150,7500],[8300,10000]]).addTo(map);

    // Inspector de coordenadas
    map.on("click", function(e) {
      var y = e.latlng.lat.toFixed(0);
      var x = e.latlng.lng.toFixed(0);

      // Mostrar en panel fijo
      document.getElementById("coords").innerHTML = "Coordenadas: Y=" + y + " X=" + x;

      // Mostrar en popup
      L.popup()
        .setLatLng(e.latlng)
        .setContent("Y=" + y + " X=" + x)
        .openOn(map);
    });

// Centrar en una ubicación exacta
map.setView([3665,1940], 0); 

//Carga de Locaciones
fetch('Data/Info/Locations.json')
  .then(response => response.json())
  .then(data => {
    // Capitales
    data.capitales.forEach(k => {
      L.circleMarker(k.coords, {
        radius: 8,
        color: "#000",
        fillColor: "#FFD700",
        fillOpacity: 0.9
      }).bindPopup(k.nombre).addTo(map);
    });

    // Ciudades
    data.ciudades.forEach(c => {
      L.circleMarker(c.coords, {
        radius: 6,
        color: "#000",
        fillColor: "#3d2594",
        fillOpacity: 0.9
      }).bindPopup(c.nombre).addTo(map);
    });

    // Fortalezas
    data.fortalezas.forEach(f => {
      L.circleMarker(f.coords, {
        radius: 6,
        color: "#800000",
        fillColor: "#A52A2A",
        fillOpacity: 0.8
      }).bindPopup(f.nombre).addTo(map);
    });

    // Pueblos
    data.aldeas_pueblos.forEach(p => {
      L.circleMarker(p.coords, {
        radius: 4,
        color: "#333",
        fillColor: "#999",
        fillOpacity: 0.7
      }).bindPopup(p.nombre).addTo(map);
    });

    // Puntos de interés
    data.puntos_interes.forEach(i => {
      L.circleMarker(i.coords, {
        radius: 5,
        color: "#006400",
        fillColor: "#228B22",
        fillOpacity: 0.7
      }).bindPopup(i.nombre).addTo(map);
    });
  });
