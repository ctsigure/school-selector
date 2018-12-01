
function predict() {
    schoolName = localStorage.getItem('schoolName')
    h3 = document.getElementsByTagName('h3')[0]
    h3.innerHTML = `<center><b>Prediction for ${schoolName} of Year 2019-2023</b></center>`
    tuition = tuitionset.filter(elem => {return elem.name == schoolName})
    if (tuition.length == 0) {
        console.log("Cannot find the tuition prediction for school: "+schoolName)
        return
    }
    tuition = tuition[0]
    let tbody = document.querySelector("#myBody");
    let row = tbody.insertRow()
    for (let year=19; year<24; year++) {
        let cell = row.insertCell()
        cell.innerText = "$" + tuition[year.toString()]
    }
}
predict()