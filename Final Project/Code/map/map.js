mymap = L.map('mapid').setView([37.393507, -121.987338], 12);
baseurl = 'http://open.mapquestapi.com/nominatim/v1/search.php?key=TmcKhVoM47cT6jdlyTyBrTnmElpE2HOq&format=json&addressdetails=1&limit=1&bounded=0&json_callback=resetMarkers';
url = baseurl
markerLocs = []

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);


function markOnMap(address) {

    url = baseurl + "&q=" + escape(address)
    let div = document.getElementById('searchdiv')
    if (div) {
        div.parentElement.removeChild(div)
    }
    div = document.createElement('div')
    div.id = 'searchdiv'
    let s = document.createElement('script')
    s.src = url
    div.appendChild(s)
    document.getElementById('mapid').appendChild(div)
}

function showMarkers() {
    let count = 0
    markerLocs.forEach((m) => {
        L.marker([m[0], m[1]]).addTo(mymap)
            .bindPopup(schoolNames[count++])
    })
    let s = sum(markerLocs)
    let x = 0, y = 0
    if (s[0]) {
        x = s[0]/markerLocs.length
        y = s[1]/markerLocs.length
        mymap.setView([x, y], 10)
    } else {
        mymap.setView([markerLocs[0][0], markerLocs[0][1]], 12)
    }
}

function resetMarkers(res) {
    if (res.length == 0) {
        return
    }
    res.forEach((l) => {
        markerLocs.push([parseFloat(l.lat), parseFloat(l.lon)])
    })
    showMarkers()
}
markerLocs.splice(0, markerLocs.length)
addresses.forEach(markOnMap)

function sum(l) {
    let sum = [0, 0]
    l.forEach((x) => { sum[0] += x[0]; sum[1] += x[1] })
    return sum
}
