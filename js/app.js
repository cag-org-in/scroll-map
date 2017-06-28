$(document).foundation();

L.mapbox.accessToken = 'pk.eyJ1IjoibmRvaXJvbjIiLCJhIjoiY2o0ZzkzamN0MDFnNTMycW53cWxocjZmeiJ9.JromgSz8YMJodPRTanfspQ';

// Create a map in the div #map and takes two arguments: the id of the html element and the map id from Mapbox
var map = L.mapbox.map('map', {
  zoomControl: false,
  tiles: ['//api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}@2x?access_token=' + L.mapbox.accessToken]
}).setView([13.0687307,80.2567912], 14);

// L.mapbox.styleLayer('mapbox://styles/mapbox/light-v9').addTo(map);

// Create a featurelayer for markers and add to map
var spots = L.mapbox.featureLayer()
  .addTo(map);

// Disable the zoom on scroll
map.scrollWheelZoom.disable();

// Array of story section elements.
var sections = $('section');
var narrative = $("#narrative")[0];
var currentId = 'cover';

function setCustomMarkers() {
  var places = {
    type: 'FeatureCollection',
    features: [{
      geometry: {
        type: "Point",
        coordinates: [13.072, 80.294]
      },
      properties: {
        id: "cover",
        zoom: 15
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.072515, 80.287030]
      },
      properties: {
        id: "defermery"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.075054, 80.295128]
      },
      properties: {
        id: "bart"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.075969, 80.316791]
      },
      properties: {
        id: "crane"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.075694, 80.297240]
      },
      properties: {
        id: "station"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.078917, 80.292539]
      },
      properties: {
        id: "mural"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.076317, 80.278605]
      },
      properties: {
        id: "hotel"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.078513, 80.278765]
      },
      properties: {
        id: "mcclymonds"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.072217, 80.295252]
      },
      properties: {
        id: "malik"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.071607, 80.294480]
      },
      properties: {
        id: "cookie"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.072878, 80.294654]
      },
      properties: {
        id: "kevin"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.070850, 80.296330]
      },
      properties: {
        id: "open"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.079877, 80.294366]
      },
      properties: {
        id: "joshua"
      },
      type: 'Feature'
    }, {
      geometry: {
        type: "Point",
        coordinates: [13.077101, 80.269838]
      },
      properties: {
        id: "about"
      },
      type: 'Feature'
    }]
  };

  spots.setGeoJSON(places);

  // define icons as cssIcons
  spots.eachLayer(function(e) {
    var className = 'sprite sprite-' + e.feature.properties.id;
    var coordinates = e.feature.geometry.coordinates;
    var html = "<div data-id='" + e.feature.properties.id + "'></div>"
    var cssIcon = L.divIcon({
      // Specify a class name we can refer to in CSS.
      className: className,
      // Set marker width and height
      iconSize: [80, 80],
      html: html
    });
    if (e.feature.properties.id === "about") {
      L.marker(coordinates, {
        icon: cssIcon
      }).addTo(map).bindPopup('<h1> Youth Radio Interactive HQ </h1>')
    } else {
      L.marker(coordinates, {
        icon: cssIcon
      }).addTo(map);
    }
  })
}




function setId(newId) {
  // If ID hasn't change, do nothing
  if (newId === currentId) return;
  if (newId === 'cover') {
    $('body').attr('class', 'section-0');
  } else {
    $('body').attr('class', ' ');
  }
  // otherwise, iterate thru layers, setting the current marker to a different style and zooming to it
  spots.eachLayer(function(layer) {
    if (layer.feature.properties.id === newId) {
      var coordinates = layer.feature.geometry.coordinates;
      var all_el = $(".sprite");
      var el = $("div[class*='" + newId + "']")[0];
      all_el.removeClass("active");
      el.className = el.className + " active";
      if (newId === "cover") {
        map.setView(coordinates, 15);
      } else {
        map.setView(coordinates, 16);
      }
    }
  });
  // highlight the current section
  for (var i = 0; i < sections.length; i++) {
    sections[i].className = sections[i].id === newId ? 'active' : '';
  }
  // And then set the new id as the current one,
  // so that we know to do nothing at the beginning
  // of this function if it hasn't changed between calls
  currentId = newId;
}


narrative.onscroll = function() {
  var narrativeHeight = narrative.offsetHeight;
  var newId = currentId;
  // Find the section that's currently scrolled-to.
  // We iterate backwards here so that we find the topmost one.
  for (var i = sections.length - 1; i >= 0; i--) {
    var rect = sections[i].getBoundingClientRect();
    if (rect.top >= 0 && rect.top / .5 <= narrativeHeight) {
      newId = sections[i].id;
    }
  }
  setId(newId);
};

function markersOnClik() {
  $(".sprite").on("click", function() {
    var data = $(this).children().data().id
    var id = "#" + data
    window.location.hash = id
    $("section").removeClass("active")
    $(id).addClass("active")
    setId(data);
    event.preventDefault();
  });
}



// SPLASH SCREEN

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
  var h = $('body').height();
  // set .fullscreen height
  $(".content-b").each(function() {
    if ($(this).innerHeight() <= h) {
      $(this).closest(".fullscreen").addClass("not-overflow");
    }
  });
}



function fadeOnClick() {
  var target = $("#splash");
  var target_two = $("#main-content-wrapper")
  $(".cust-button").on("click", function(e) {
    e.preventDefault()
    target.fadeOut("slow");
    target_two.addClass("visible");

  });
}

function animateLogo(){
  var target = $("#logo")
  setTimeout(function(){
    target.addClass("show"); }, 500);
  setTimeout(function(){
    target.fadeIn();
    target.addClass("move-left");
    $(".target").addClass("show");
  }, 1500);
}

function initSoc(){
  new Share(".share-bttn", {
  networks: {
    facebook: {
      app_id: "459957714160273"
      },
      twitter: {
        description:"West Side Stories: A New Interactive From Youth Radio Interactive via @youthradio."
      }
    }
  });

}

initSoc()
animateLogo()
setCustomMarkers()
markersOnClik()
setId('cover');
fadeOnClick();
$(window).resize(fullscreenFix);
fullscreenFix();
