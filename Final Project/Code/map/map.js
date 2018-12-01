mymap = L.map('mapid').setView([37.393507, -121.987338], 12);
baseurl = 'https://open.mapquestapi.com/nominatim/v1/search.php?key=TmcKhVoM47cT6jdlyTyBrTnmElpE2HOq&format=json&addressdetails=1&limit=1&bounded=0&json_callback=';
markerLocs = []

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

divId = 'searchdiv'
callbackSId = 'callbackScript'
counter = 0
doneCallbacks = 0
function markOnMap(address) {
    // Create callback script
    let callbackS = document.getElementById(callbackSId+counter)
    let callbackName = 'callback' + counter
    if (callbackS) {
        callbackS.parentElement.removeChild(callbackS)
    }
    callbackS = document.createElement('script')
    callbackS.innerHTML = `function ${callbackName}(r) {
        markerLocs[${counter}] = r.length == 0 ? null : [parseFloat(r[0].lat), parseFloat(r[0].lon)]
        doneCallbacks++
    }`
    document.getElementsByTagName('head')[0].appendChild(callbackS)
    
    let div = document.getElementById(divId+counter)
    if (div) {
        div.parentElement.removeChild(div)
    }
    div = document.createElement('div')
    div.id = divId + counter
    let url = baseurl + callbackName + "&q=" + escape(address)
    let s = document.createElement('script')
    s.src = url
    div.appendChild(s)
    document.getElementById('mapid').appendChild(div)
    counter++
}

function showMarkers() {
    if (doneCallbacks < addresses.length) {
        return
    }
    clearInterval(timerId)
    /*
    let cover = document.getElementById('cover')
    cover.parentElement.removeChild(cover)
    */
    let count = 0
    markerLocs.forEach(m => {
        if (m) {
            L.marker([m[0], m[1]]).addTo(mymap)
                .bindPopup(schoolNames[count])
        } else {
            console.log("cannot find address: "+addresses[count])
        }
        count++
    })
    let lats = [], lons = []
    markerLocs.forEach(l => {
        if (l) {
            lats.push(l[0])
            lons.push(l[1])
        }
    })
    let latMin = Math.min(...lats)
    let latMax = Math.max(...lats)
    let lonMin = Math.min(...lons)
    let lonMax = Math.max(...lons)
    let latMargin = (latMax - latMin) * 0.3
    let lonMargin = (lonMax - lonMin) * 0.3
    mymap.setView([(latMax+latMin)/2, (lonMax+lonMin)/2])
    mymap.fitBounds([[latMin-latMargin, lonMin-lonMargin], [latMax+latMargin, lonMax+lonMargin]])
}

markerLocs.splice(0, markerLocs.length)
addresses.forEach(markOnMap)
timerId = setInterval(showMarkers, 1000)