
function enterKeyPresseds(event) {
    if (event.keyCode == 13) {

        return true;
    } else {

        return false;
    }
}

function openwinds(joinUrl) {
    
    window.location.href = joinUrl;
}

var baseurlss;
function getwebsiteurl() {

    return new Promise((resolve, reject) => {
        try {
            $.ajax({
                type: "POST",
                url: "default.aspx/getwebsiteurl",
                //data: jasonData,
                //data: "{ regcode: \"" + regcode + "\", searchdetails: \"" + searchdetails + "\"  }",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                 
                   
                    baseurlss = response.d;
                    // alert(baseurlss);
                      resolve(baseurlss);
                },
                failure: function (response) {
                },
                error: function (response) {
                }
            });
           // alert("ccc");
           // alert(baseurlss);
            //resolve(baseurlss);
        }
        catch (e) {

        }
    });
}

function verifymeet() {


    // doing custom things with myVal

    // cancel default event action
    var event = window.event || callmymethod.caller.arguments[0];
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);

    //var joinUrl = "/live-meeting/";
   
var baseur
    //openwinds(joinUrl);
    getwebsiteurl().then((result) => {
        baseur = result;
   
         
    verifymeetconf().then((result) => {

        
        
        if (result == true) {
            //var joinUrl = "/vitualmeeting/live-meeting/";
            var joinUrl = baseur +"/live-meeting/";
         
            openwinds(joinUrl);
        }
        });
    });
}

function verifymeetconf() {

    return new Promise((resolve, reject) => {
        try {

            var meetingcode = $("[id*=txtMeetingcode]").val();

            if ((meetingcode == "") || (meetingcode == " ")) {
                //alert("No Meeting Selected");
                swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

                $("[id*=txtMeetingcode]").focus();
                resolve(false)
                // return false;
            }



            var paramcode = {};

            paramcode.meetingcode = meetingcode;

            var jasonData;

            jasonData = "{'paras':" + JSON.stringify(paramcode) + "}";



            $.ajax({
                type: "POST",
                url: "default.aspx/verifymeetingcode",
                data: jasonData,
                beforeSend: function () {
                    $('#divLoading').show();
                },
                complete: function () {
                    $('#divLoading').hide();
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                success: function (response) {

                    console.log(response);

                    //const STOP_LOAD_AFTER = 10000; // 10 seconds

                    var dd = response.d;

                    if (dd == "1") {
                        //alert("No Meeting Selected");
                        //swal('Invalid!', 'You are meeting code is invalid, please check your entered details!', 'warning');



                        // location.replace("../live-meeting");
                        //   var joinUrl = "/live-meeting/";
                        //  var joinUrl = "";


                        //openwinds(joinUrl);
                        resolve(true);
                        //  return false;

                    } if (dd == "2") {

                        swal('Error!', 'Your meeting is yet to start or ended, please check back!', 'warning');
                        resolve(false);
                        //return false;

                    } if (dd == "4") {

                        swal('Oops!', 'You have entered invalid meeting code!', 'warning');
                        resolve(false);
                        // return false;


                    }

                    if (dd == "5") {

                        swal('Oops!', 'Something went wrong!', 'warning');

                        // return false;
                        resolve(false);

                    }

                    return false;
                },
                failure: function (response) {

                    swal('Error!', 'Something went wrong!', 'warning');
                    //swal('Error!', '' + response.d + '', 'info');
                    resolve(false);
                    // return false;

                }

            });


        }

        catch (e) {
            alert(e)
        }



    });


}
 

$(document).ready(function () {

        //panelone(0);
    panelone(1);

});

function functionBegin() {
    panelone(1);
};

function panelone(state) {

    var panelWelcome = $("[id*=PanelWelcome]");
    panelWelcome.hide();

    var panelOneName = $("[id*=PanelStepOne]");
    panelOneName.hide();

    var PanelSteptwo = $("[id*=PanelSteptwo]");

    PanelSteptwo.hide();

    var PanelStepthree = $("[id*=PanelStepthree]");
    PanelStepthree.hide();

    var PanelStepfour = $("[id*=PanelStepfour]");
    PanelStepfour.hide();

    var PanelStepfive = $("[id*=PanelStepfive]");
    PanelStepfive.hide();

    var PanelPleasewait = $("[id*=PanelPleasewait]");
    PanelPleasewait.hide();

    var PanelOTP = $("[id*=PanelOTP]");
    PanelOTP.hide();



    //PanelStepfive
    if (state == 0) {

        panelWelcome.show();


    } else if (state == 1) {
        panelOneName.show();


    } else if (state == 2) {

        PanelSteptwo.show();


    } else if (state == 3) {

        PanelStepthree.show();

    } else if (state == 4) {

        PanelStepfour.show();

    } else if (state == 5) {

        PanelStepfive.show();

    } else if (state == 6) {

        PanelPleasewait.show();

    }

    else if (state == 10) {

        PanelOTP.show();

    }

};


function goBack() {
    panelone(1);

};

function goBack2() {
    panelone(2);

};


function goBack3() {
    panelone(3);

};

