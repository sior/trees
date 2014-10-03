var alarmHour;
var alarmMinute;
var alarmAMPM;
var alarmStatus;
function getAlarmStatus(){
    $.get("getAlarmStatus", function (data, status){
        data = data.split(":");
        alarmHour = data[0];
        alarmMinute = data[1];
        alarmAMPM = data[2];
        alarmStatus = data[3];
        
        $("#alarmHourInput").spinner("value", parseInt(alarmHour));
        $("#alarmHourSlider").slider("value", parseInt(alarmHour));
        $("#alarmMinuteInput").spinner("value", parseInt(alarmMinute));
        $("#alarmMinuteSlider").slider("value", parseInt(alarmMinute));
        
        if (alarmAMPM == "am"){
            $("#AMButton").attr("checked", "checked").button("refresh");
            $("#PMButton").attr("checked", "unchecked").button("refresh");
        } else {
            $("#PMButton").attr("checked", "checked").button("refresh");
            $("#AMButton").attr("checked", "unchecked").button("refresh");
        }

        if (alarmStatus == "on"){
            $("#alarmButton").children().text("Turn Alarm Off");
        } else {
            $("#alarmButton").children().text("Turn Alarm On");
        }

        updateAlarmStatusString();
    });
}

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
    alarmHour = hour.toString();
    updateAlarmStatusString();
}

function updateMinuteSlider(){
    var minute = $("#alarmMinuteInput").spinner("value");
    $("#alarmMinuteSlider").slider("value", minute);
    if (minute.toString().length == 1){
        alarmMinute = "0" + minute.toString();
    } else {
        alarmMinute = minute.toString();
    }
    updateAlarmStatusString();
}

function updateAlarmStatusString(){
    var statusString;
    if (alarmStatus == "on"){
        statusString = "Alarm set for ";
        statusString += alarmHour + ":";
        statusString += alarmMinute + " ";
        statusString += alarmAMPM;
    } else {
        statusString = "Alarm Off";
    }
    $("#alarmHeader").text(statusString);
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
        if (alarmButton.text() == "Turn Alarm On"){
            alarmButton.children().text("Turn Alarm Off");
            alarmStatus = "on";
        } else {
            alarmButton.children().text("Turn Alarm On");
            alarmStatus = "off";
        }
        updateAlarmStatusString();
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
            alarmHour = ui.value.toString();
            updateAlarmStatusString();
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
            if (ui.value.toString().length == 1){
                alarmMinute = "0" + ui.value.toString();
            } else {
                alarmMinute = ui.value.toString();
            }
            updateAlarmStatusString();
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

    $("#AMButton").click(function (){
        alarmAMPM = "am";
        updateAlarmStatusString();
    });

    $("#PMButton").click(function (){
        alarmAMPM = "pm";
        updateAlarmStatusString();
    });

    var buttons = $("#buttons").children();
    buttons.each(getWidth);
    buttons.width(buttonWidth + 5);
    buttons.css('margin-top', '2px');
    buttons.css('margin-bottom', '2px');
    $("#alarmContent").height($("#alarmContent").height() + 25);
    getAlarmStatus();
});
