
function enterKeyPresseds(event) {
    if (event.keyCode == 13) {

        verifymeet();
        return true;
    } else {

        return false;
    }
}


function verifymeet() {

    var meetingcode = $("[id*=txtMeetingcode]").val();

    if ((meetingcode == "") || (meetingcode == " ")) {
        //alert("No Meeting Selected");
        swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

        $("[id*=txtMeetingcode]").focus();
        return false;
    }



    var paramcode = {};

    paramcode.meetingcode = meetingcode;

    var jasonData;

    jasonData = "{'paras':" + JSON.stringify(paramcode) + "}";


    $.ajax({
        type: "POST",
        url: "default.aspx/verifymeetingcode",
        data: jasonData,

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#divLoading').show();
        },
        complete: function () {
            $('#divLoading').hide();
        },
        success: function (response) {

            const STOP_LOAD_AFTER = 10000; // 10 seconds

            var dd = response.d;

            if (dd == "1") {
                //alert("No Meeting Selected");
                //swal('Invalid!', 'You are meeting code is invalid, please check your entered details!', 'warning');
                
                location.replace("../vitualmeeting/live-meeting");
                
                return false;

            }  if (dd == "2") {                               

                swal('Error!', 'Your meeting is yet to start or ended, please check back!', 'warning');

                return false;
                
            } if (dd == "4") {

                swal('Oops!', 'You have entered invalid meeting code!', 'warning');
                                
                return false;
                                
                
            }

            if (dd == "5") {

                swal('Oops!', 'Something went wrong!', 'warning');

                return false;


            }

            return false;
        },
        failure: function (response) {

            swal('Error!', 'Something went wrong!', 'warning');
            //swal('Error!', '' + response.d + '', 'info');
            return false;
           
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

