var currentrecord = null;
var currentword = null;

function loaddata(thebutton) {
    if(currentrecord !== null) {
        currentrecord.disabled = false;
    }

    currentrecord = thebutton;
    thebutton.disabled = true;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            for(var i = 0; i < 10; i++) {
                document.getElementById("record" + i).innerHTML = response[i];
            }
        }
    };
    xhttp.open("POST", "click.py", true);
    xhttp.setRequestHeader("string", thebutton.innerHTML);
    xhttp.send();
}

function loadword(thebutton) {
    if(currentword !== null) {
        currentword.disabled = false;
    }

    currentword = thebutton;
    thebutton.disabled = true;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            for(var i = 0; i < 25; i++) {
                document.getElementById("word" + i).innerHTML = response[i];
            }
        }
    };
    xhttp.open("POST", "click.py", true);
    xhttp.setRequestHeader("word", thebutton.innerHTML);
    xhttp.send();
}