var currentrecord = null;
var currentword = null;

function loaddata(thebutton) {
    if(currentrecord !== null) {
        currentrecord.disabled = false;
    }

    currentrecord = thebutton;
    var id = thebutton.id;
    thebutton.disabled = true;
    
    $.ajax({
    type : "POST",
    url : "http://127.0.0.1:5000/wordlist",
    dataType: 'json',
    data: JSON.stringify({"data": id}),
    contentType: 'application/json;charset=UTF-8',
    success: function(result) {
        var parent = document.querySelector(".row > .card > .card-block");
        
        // Clear the words
        while (parent.hasChildNodes()) {
             parent.removeChild(parent.lastChild);
        }
        for(var i = 0; i < result.length; ++i){
            var child = document.createElement("button");
            child.innerHTML = result[i];
            child.addEventListener("click", loadword(this));
            child.className = "btn btn-secondary muwords";
            parent.appendChild(child);
        }
        console.log(result);
    }
    
});
thebutton.disabled = false;
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
    document.getElementById("verb").innerHTML = "";

    $.ajax({
        type : "POST",
        url : "http://127.0.0.1:5000/test",
        dataType: 'json',
        data: JSON.stringify({"data": thebutton.innerHTML}),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log(result);
            if(result["adjective"] !== undefined && result["adjective"]["syn"] !== undefined) {
                document.getElementById("adjective").innerHTML = result["adjective"]["syn"][0];
                for(var i = 1; i < result["adjective"]["syn"].length; i++)
                    document.getElementById("adjective").innerHTML += ", " + result["adjective"]["syn"][i];
            }
            if(result["adverb"] !== undefined && result["adverb"]["syn"] !== undefined) {
                document.getElementById("adverb").innerHTML = result["adverb"]["syn"][0];
                for(var i = 1; i < result["adverb"]["syn"].length; i++) {
                    document.getElementById("adverb").innerHTML += ", " + result["adverb"]["syn"][i];
                }
            }
            if(result["noun"] !== undefined && result["noun"]["syn"] !== undefined) {
                document.getElementById("noun").innerHTML = result["noun"]["syn"][0];
                for(var i = 1; i < result["noun"]["syn"].length; i++) {
                    document.getElementById("noun").innerHTML += ", " + result["noun"]["syn"][i];
                }
            }
            if(result["verb"] !== undefined && result["verb"]["syn"] !== undefined) {
                document.getElementById("verb").innerHTML = result["verb"]["syn"][0];
                for(var i = 1; i < result["verb"]["syn"].length; i++)
                    document.getElementById("verb").innerHTML += ", " + result["verb"]["syn"][i];
            }
        }
    });
}