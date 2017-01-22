var currentrecord = null;

function loaddata(thebutton, recordno) {
    if(currentrecord !== null) {
        currentrecord.disabled = false;
    }

    currentrecord = thebutton;
    thebutton.disabled = true;
    //====================
    //some ajax stuff here
    //====================
}