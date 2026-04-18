
var timer;

var coutes;
coutes = 0;


function fetchdata() {
    var inProcess = false;//Just to make sure that the last ajax call is not in process

    setTimeout(function () {
        if (inProcess) {
            return false;//Another request is active, decline timer call ...
        }
        inProcess = true;//make it burn ;)

        //coutes = coutes + 1;
        //document.getElementById('gfg')
            //.innerHTML = coutes;

        jQuery.ajax({
            url: 'default.aspx/LoadCurrentResolution', //Define your script url here ...
            data: '', //Pass some data if you need to
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //method: 'POST', //Makes sense only if you passing data
            success: function (answer) {

               
                const jsonStr = answer.d;


                if (jsonStr.length === 0) {

                    var currlink = ' ' + 'No Resolution currently active!';

                    jQuery('#Resolutiontext').html(currlink);

                    jQuery('#votevalue').hide();

                   

                } else {

                    //console.log(answer.d);

                    var currQuestionText = jsonStr[0].currQuestionText;

                    var currActiveReso = jsonStr[0].currActiveReso;

                    console.log(jsonStr[0].currQuestionText);

                    console.log(currQuestionText);

                    if (currActiveReso == 1) {

                        var currlink = '<i class="fa fa-check"></i>' + currQuestionText;

                        // jQuery('.currreso').html(currlink);  //update your div with new content, yey ....

                        jQuery('#Resolutiontext').html(currlink);

                        jQuery('#votevalue').show();

                        

                    } 

                }

                

                inProcess = false;//Queue is free, guys ;)
                  
               
            },
            error: function () {
                //unknown error occorupted
                inProcess = false;//Queue is free, guys ;)
            }
        });


        setTimeout(fetchdata, 3000);
    }, 2000);
}

function startTimer() {
    timer = setInterval(function () {
        document.getElementById('gfg')
            .innerHTML = " 5 seconds are up ";
    }, 3000);
}

function stopTimer() {
    document.getElementById('gfg')
        .innerHTML = " Timer stopped ";
    clearInterval(timer);
}





$(document).ready(function () {
        
    panelone(0);

    jQuery('#votevalue').hide();

    //Load panel one after 20 Seconds
    setTimeout(function () {
        // Call your function here
        panelone(1);
    }, 5000); // 20 seconds in milliseconds
        
});

function panelone(state) {

    var panelWelcome = $("[id*=PanelWelcome]");
    panelWelcome.hide();

    var panelOneName = $("[id*=PanelStepOne]");
    panelOneName.hide();

    
    //PanelStepfive
    if (state == 0) {

        panelWelcome.show();

    } else if (state == 1) {

        //LoadActiveResolution();

        panelOneName.show();

       // LoadActiveResolution();

        setTimeout(fetchdata, 5000);


    } 

};

// Load Actove Resolution
function LoadActiveResolution() {

    $.ajax({
        type: "POST",
        url: "default.aspx/LoadCurrentResolution",
        //data: jasonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (answer) {

            
                        //console.log(JSON.stringify(answer));

            //jQuery('#Resolutiontext').html(answer.currQuestionText);//update your div with new content, yey ....

             },
        error: function () {
            //unknown error occorupted
            return 2;
        }

    });


}

//Clear Sesion
function ClearSession() {
    document.getElementById("btnHidden").click();
    window.location.reload();
}

