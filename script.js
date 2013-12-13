

$(document).ready(function(){
	
	 $(window).bind('scroll',function(e){
    	parallaxScroll();
    });
    createGraph1(16);
    createGraph2(8);
		
});

function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	if(scrolled < 600 && scrolled > 0){
		$("#circle1").attr("r", scrolled*.32);
		$("#circle2").attr("r", scrolled*.75);
		$("#circle3").attr("r", scrolled*1.5);
	}else if(scrolled >= 0){
		$("#circle1").attr("r", 0);
		$("#circle2").attr("r", 0);
		$("#circle3").attr("r", 0);
	}
	$('#top_section').css('top', '0px');

	if(scrolled >= 500){
		createGraph1(scrolled/30);
		createGraph2(scrolled/60);
	
		
	}
	if(scrolled >= 1075){
		
		$('#section_two').css('top', '-92px');
		$('#section_two').css('position', 'fixed');
	
		
	}else{
		$('#section_two').css('position', 'relative');
		$('#section_two').css('top', '0');

	}
	if(scrolled >= 1200){
		$("#freebie").css("opacity", ((scrolled-1200)/100)/2);
	}else{
		$("#freebie").css("opacity", 0);
	
	}
};



function createGraph1(value1){
	$("#pie1").empty();
	
	var w = 300,                        //width
    h = 300,                            //height
    r = 150,                            //radius
    
    color = d3.scale.category20c();     //builtin range of colors

    data = [{"label":"", "value":value1}, 
            {"label":"", "value":(100-value1)}];
    
    var vis = d3.select("#pie1")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return data[i].label; });        //get the label from our original data array
}
function createGraph2(value1){
	$("#pie2").empty();
	
	var w = 300,                        //width
    h = 300,                            //height
    r = 150,                            //radius
    
    color = d3.scale.category20c();     //builtin range of colors

    data = [{"label":"", "value":(100-value1)}, 
            {"label":"", "value":value1}];
    
    var vis = d3.select("#pie2")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return data[i].label; });        //get the label from our original data array
}


function loadData() {

  	IN.API.Profile("me")
    .fields(["id", "firstName", "lastName", "pictureUrl","headline","publicProfileUrl", "email-address", "num-recommenders","connections", "industry", "group-memberships", "publications"])
    .result(function(result) {
    
    
      profile = result.values[0];
      profHTML = "<div class='profile'>";
      profHTML += "<img class='profile_image' src=\"" + profile['pictureUrl'] + "\">";      
      profHTML += "<p>Hi, " + profile['firstName'] + " " + profile['lastName'] + "!</p>";
      profHTML += "<a href='#grade' class='view_grade'>View your grade.</a>";
      $(".profile").html(profHTML);
      
      showGrade(profile);
 
      
    });	    
}

function showGrade(profile){

	$("#grade").css("top", "0");

    setTimeout(function(){
	    $("#wrap").hide();
	    $("#grade").css("overflow", "scroll");

    }, 500);
	
	var html = "<div id='grade_image'>"+
					"<img src='"+profile['pictureUrl']+"'>"+
				"</div>"+
				"<div id='name'>"+
					profile['firstName'] + " " +profile['lastName']+
				"</div>"+
				"<span id='headline'>"+
					profile['headline']+
				"</span>";
				
	$("#profile_info").html(html);
	
	console.log(profile);
	
    $("#grade").bind('scroll',function(e){
		gradeScroll();
	});
	
	
}


function gradeScroll(){
	var scrolled = $("#grade").scrollTop();

	if(scrolled >= 340){
		
		$('#grade_section_two').css('top', '-80px');
		$('#grade_section_two').css('position', 'fixed');
		$('#grade_section_two').css("pointer-events", "none");
		
	}else{
		$('#grade_section_two').css('position', 'relative');
		$('#grade_section_two').css('top', '0');

	}

}
