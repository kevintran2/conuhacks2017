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
            for(var i = 0; i < 25; i++) {
                document.getElementById("word" + i).innerHTML = response[i];
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
    
    document.getElementById("adjective").innerHTML = "";
    document.getElementById("adverb").innerHTML = "";
    document.getElementById("noun").innerHTML = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            for(var i = 0; i < response[adjective].length; i++)
                document.getElementById("adjective").innerHTML += response[adjective];
            for(var i = 0; i < response[adverb].length; i++)
                document.getElementById("adverb").innerHTML += response[adverb];
            for(var i = 0; i < response[noun].length; i++)
                document.getElementById("noun").innerHTML += response[noun];
        }
    };
    xhttp.open("POST", "click.py", true);
    xhttp.setRequestHeader("word", thebutton.innerHTML);
    xhttp.send();
}