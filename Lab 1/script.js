const places = [
    { name: '<img src="img/alex_colonna.jpeg" alt="Alexandr\'s Column" width="300" height="200">', coordinates: [59.939019, 30.315816], content: 'Alexandr\'s Column' },
    { name: '<img src="img/medniy_vsadnik.jpeg" alt="Bronze horseman" width="300" height="200">', coordinates: [59.936382, 30.302242], content: 'Bronze horseman' },
    { name: '<img src="img/avrora.jpeg" alt="Avrora" width="300" height="200">', coordinates: [59.955479, 30.337765], content: 'Avrora cruiser' },
    { name: '<img src="img/isakiy.jpeg" alt="Isakiy" width="300" height="200">', coordinates: [59.934170, 30.306251], content: 'Isaak cathedral' },
    { name: '<img src="img/petropavlovka.jpeg" alt="Petropavlovskaya fortress" width="350" height="200">', coordinates: [59.950340, 30.317312], content: 'Petropavlovskaya fortress' },
    { name: '<img src="img/kazansky.jpeg" alt="Kazan cathedral" width="350" height="200">', coordinates: [59.934493, 30.324608], content: 'Kazan cathedral' },
];

ymaps.ready(init);

() => {
    var a = 5;


}

function init(){
    let myMap = new ymaps.Map("map", {
        center: [59.939019, 30.267838],
        zoom: 12
    });
    let currentGeoObject;
    places.forEach(place => {
        currentGeoObject = new ymaps.Placemark(place.coordinates, { hintContent: place.name, balloonContent: place.content });
        myMap.geoObjects.add(currentGeoObject);
    });
}