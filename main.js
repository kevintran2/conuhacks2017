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
            child.addEventListener("click", function(){loadword(this);}, false);
            child.className = "btn btn-secondary muwords";
            parent.appendChild(child);
        }
        console.log(result);
    }

});
thebutton.disabled = false;
loadGraph(thebutton);
}
// LOAD GRAPH FUNCTION GET THIS DONE
// AAA

function loadGraph(thebutton){
    var oldgraph = document.getElementsByTagName("svg")[0];
    if(oldgraph !== undefined) {
        oldgraph.parentNode.removeChild(oldgraph);
    }
    var json = "";
    var id = thebutton.id;
    $.ajax({
    type : "POST",
    url : "http://127.0.0.1:5000/wcount",
    dataType: 'json',
    data: JSON.stringify({"data": id}),
    contentType: 'application/json;charset=UTF-8',
    success: function(result) {
       console.log(result); 
    }
    });
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

	json = "pybackend/wcount" + id + ".json";
// load the data
d3.json(json, function(error, data) {

    data.forEach(function(d) {
        d.Letter = d.Letter;
        d.Freq = +d.Freq;
    });
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Letter; }));
  y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Word Frequency");

  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d.Freq); });

});
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
