
function validate(element) {
    var rowId = event.target.parentNode.parentNode.id;
    var data =  document.getElementById(rowId).querySelectorAll(".row-data");  
    var summoner = data[0].innerHTML
    alert(summoner)

    const options = {
        method : 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(summoner)
    }
    fetch('/delete',options)

}
