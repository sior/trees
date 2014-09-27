var alarmHour;
var alarmMinute;
var alarmAMPM;

var buttonWidth = 0;
function getWidth(){
    var myWidth = $(this).width();
    if (myWidth > buttonWidth){
        buttonWidth = myWidth;
    }
}

function updateHourSlider(){
    var hour = $("#alarmHourInput").spinner("value");
    $("#alarmHourSlider").slider("value", hour);
}

function updateMinuteSlider(){
    var minute = $("#alarmMinuteInput").spinner("value");
    $("#alarmMinuteSlider").slider("value", minute);
}

$(document).ready(function() {
    $("#onButton").button().click(function() { $.get('stripOn');});
    $("#offButton").button().click(function() { $.get('stripOff');});
    $("#sunriseButton").button().click(function() { $.get('stripSunrise');});
    $("#sunsetButton").button().click(function() { $.get('stripSunset');});
    $("#sunriseDemoButton").button().click(function() { $.get('stripSunriseDemo');});
    $("#sunsetDemoButton").button().click(function() { $.get('stripSunsetDemo');});

    $("#alarmButton").button().click(function() {
        var alarmButton = $("#alarmButton");
        if (alarmButton.text() == "Alarm On"){
            alarmButton.children().text("Alarm Off");
            $("#alarmHeader").text("Alarm Is On");
        } else {
            alarmButton.children().text("Alarm On");
            $("#alarmHeader").text("Alarm Is Off");
        }
    });

    $("#alarmHourInput").spinner({
        min:1,
        max:12,
        change: updateHourSlider,
        stop: updateHourSlider,
        spin: updateHourSlider
    });

    $("#alarmMinuteInput").spinner({
        min:0,
        max:59,
        change: updateMinuteSlider,
        stop: updateMinuteSlider,
        spin: updateMinuteSlider
    });
    
    $("#alarmHourSlider").slider({
        orientation:"vertical",
        min:1,
        max:12,
        value:6,
        slide: function (event, ui){
            $("#alarmHourInput").val(ui.value);
        }
    }).position({
        my:"center top", 
        at:"center bottom+15",
        of:"#alarmHourInput"
    });

    $("#alarmMinuteSlider").slider({
        orientation:"vertical",
        min:0,
        max:59,
        value:30,
        slide: function (event, ui){
            $("#alarmMinuteInput").val(ui.value);
        }
    }).position({
        my:"center top", 
        at:"center bottom+15",
        of:"#alarmMinuteInput"
    });
    
    $("#AMPMButtons").buttonsetv();
    $("#AMPMButtons").position({
        my:"center center",
        at:"center+75 center",
        of:"#alarmMinuteSlider"
    });
    var buttons = $("#buttons").children();
    buttons.each(getWidth);
    buttons.width(buttonWidth + 5);
    buttons.css('margin-top', '2px');
    buttons.css('margin-bottom', '2px');
    $("#alarmContent").height($("#alarmContent").height() + 25);
});
