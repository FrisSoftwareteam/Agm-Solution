function resetp(bases) {

    window.open(bases, "_self")
}

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        //   console.log("Enter key is pressed");
        startsearch();
        return true;
    } else {

        return false;
    }
}


function enterKeyPresseds(event) {
    if (event.keyCode == 13) {

        otpconfirm();
        return true;
    }
}


function functionConfirm(event) {
    swal({
        title: 'Start e-Accreditation?',
        text: "Begin accreditation to attend the Virtual meeting!",
        icon: "info",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
    }).then(function (result) {
        if (result) {

            startprocess();
        }
    });

    return false;
};


// START PROCESSS
function startprocess() {

    //  var params = {};
    var descrarray = {};
    var arrData = new Array();
    var obj = {};

    try {

        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();


        if (drpdownselectedMeetingValue == 0) {
            //alert("No Meeting Selected");
            swal('No Meeting Selected!', 'Please select a meeting before you proceed!', 'warning');
            return false;
        }


        panelone(2);



    } catch (e) {
        alert(e);
    }


};

// Search details
function startsearch() {

    // return false;
    try {

        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();

        var searchdetails = $("[id*=details]").val();


        if ((searchdetails == "") || (searchdetails == " ")) {
            //alert("No Meeting Selected");
            swal('No search details!', 'Please enter a search details!', 'warning');
            $("[id*=details]").focus();
            return false;
        }


        panelone(3);
        $("[id*=details]").val('');

        populaterecord(drpdownselectedMeetingValue, searchdetails);




    } catch (e) {
        alert(e);
    }


};




//populate to load search records
function populaterecord(regcode, searchdetails) {

    var paramerrs = {};

    paramerrs.regcode = regcode;
    paramerrs.searchdetails = searchdetails;

    var jasonData;

    //jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";      

    try {
        var tables = $("#tblGrid").DataTable();
        tables.destroy();

        $.ajax({
            type: "POST",
            url: "default.aspx/LoaddataAPI",
            //data: jasonData,
            data: "{ regcode: \"" + regcode + "\", searchdetails: \"" + searchdetails + "\"  }",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#divLoading').show();
            },
            complete: function () {
                $('#divLoading').hide();
            },

            success: OnSuccess,
            failure: function (response) {

                //alert(response.d);
                swal('Error!', 'Something went wrong on failure!', 'info');
            },
            error: function (response) {

                //alert(response.d);
                //swal('Error!', '' + response.d + '', 'info');
                swal('Error!', 'Something went wrong on error!', 'info');
            }
        });

    }
    catch (e) {
        alert(e);
    }

};


//Search results in table display ere
function OnSuccess(response) {

    //console.log(response);

    try {
        $("#tblGrid").DataTable(
            {
                "language": {
                    search: 'Further Search',
                    searchPlaceholder: 'filter search results '
                },
                bLengthChange: true,
                dom: 'lBfrtip',
                bprocessing: true,
                bserverSide: true,
                //processing: true,
                // serverSide: true,
                lengthMenu: [[10, 25, 50, 100, 250, 500, 1000, -1], [10, 25, 50, 100, 250, 500, 1000, "All"]],
                bFilter: true,
                bSort: true,
                destroy: true,
                bPaginate: true,
                bDeferRender: false,
                cache: false,
                data: response.d,
                buttons: [
                ],
                columns: [

                    //{ 'data': 'Accountno' },
                    { 'data': 'name' },
                    //{ 'data': 'mobile' },

                    {
                        "render": function (data, type, full, meta) {

                            return "<a class='btn btn-danger btn-sm' onclick ='viewaddress(" + JSON.stringify(full) + "); return false;'  href='#'>Show Address</a>";

                        }
                    },

                    {
                        "render": function (data, type, full, meta) {

                            return "<a class='btn btn-success btn-sm' onclick ='accreditate(" + JSON.stringify(full) + "); return false;'   href='#'>Continue</a>";

                        }
                    },
                ]
            });



    }

    catch (e) {
        alert('error ' + e);
    }

};




function viewaddress(full) {

    // console.log(full.mobile);
    // console.log(full.emailaddress);

    var addresses = "";
    addresses = addresses + " Name :" + full.name + " \n ADDRESS DETAILS :" + full.haddress + "  "
    //addresses = addresses + " Name :" + full.name + " \n ADDRESS DETAILS :" + full.haddress + "  \n STATE: " + full.mobile + " "


    alertsmsg(addresses, 'Address Details', 'success')
}


function alertsmsg(message, title, icon) {

    swal({
        title: title,
        text: message,
        icon: icon
    });

    return false;
};



function accreditate(full) {
    try {


        //Checking is shareholder email not exits
        if ((full.emailaddress == " ") || (full.emailaddress == "") || (full.emailaddress == null)) {

            document.getElementById('hiddenaccountnoforemail').value = full.Accountno;
            document.getElementById('hiddenasearchdetailsforemail').value = $("[id*=details]").val();

            $("#updateemailaddress").modal('show');
            //alertsmsg('Email Address is not available', 'No Contact Details', 'info');

            return false;
        };

        //Checking is shareholder mobile not exits

        if ((full.mobile == " ") || (full.mobile == "") || (full.mobile == null)) {


            document.getElementById('hiddenaccountnoformobile').value = full.Accountno;
            document.getElementById('hiddenasearchdetails').value = $("[id*=details]").val();

            $("#updatemobile").modal('show');


            //alertsmsg('Mobile Number is not available', 'No Contact Details', 'info');

            return false;
        };


        // Set accountno,holdins and name here for votein
        document.getElementById('holderaccttext').value = full.Accountno;

        document.getElementById('holdingunitstext').value = full.holding;
        document.getElementById('holdermobile').value = full.mobile;
        document.getElementById('holderemail').value = full.emailaddress;


        // document.getElementById('holderlabelunits').value = full.holding;

        document.getElementById('holdername').innerHTML = full.name;
        document.getElementById('holderlabelunits').innerHTML = full.holding;

        // Initiate set to do votin pattern if email and mobile is available


        //  var jasonData;

        //   jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();



        var paramerrs = {};

        paramerrs.name = full.name;
        paramerrs.Accountno = full.Accountno
        paramerrs.regcode = full.register_code;
        paramerrs.mobile = full.mobile;
        paramerrs.emailaddress = full.emailaddress;
        paramerrs.availablemeeting = drpdownselectedMeetingText;



        var jasonData;

        jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";


        // console.log(jasonData);
        $.ajax({
            type: "POST",
            url: "default.aspx/saveaccredite",
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

                var dd = response.d;

                // return response.d;

                if (dd == 1) {

                    settovote(full.register_code, full.Accountno);

                }

                else {



                }

            },
            failure: function (response) {

                //   return 2;

            }

        });




    }

    catch (e) {

        alert(e);
    }

};



// Set to do vote pattern
function settovote(fullregistercode, fullaccountno) {

   
    //open OTP PAGE
    
    panelone(10);
        

};



// VERIFY OTP

function otpconfirm() {

    var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
    var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
    var drpdownselectedMeetingValue = drpdownselectedMeeting.val();
    var searchdetails = $("[id*=txtotp]").val();





    if ((searchdetails == "") || (searchdetails == " ")) {
        //alert("No Meeting Selected");
        swal('No OTP entered!', 'Please enter an OTP', 'warning');
        $("[id*=txtotp]").focus();
        return false;
    }

    var paraotp = {}



    paraotp.Accountno = document.getElementById('holderaccttext').value;
    paraotp.regcode = drpdownselectedMeetingValue;
    paraotp.mobile = searchdetails;


    var jasonData;

    jasonData = "{'paras':" + JSON.stringify(paraotp) + "}";
    //           console.log(jasonData);


    $.ajax({
        type: "POST",
        url: "default.aspx/otpvalidate",
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

            var dd = response.d;

            if (dd == 'Successful') {

                // SUCCESSFUL Meeting code AND LINK
                panelone(6);
                sendmeetingcodeandlink();
                               
            }

            else {

                //   swal('OTP Message', dd, 'info');


                swal({
                    title: 'OTP Message',
                    text: dd,
                    icon: "info",
                    buttons: ["Cancel", "Yes"],
                    dangerMode: true,
                }).then(function (result) {
                    if (result) {
                        $("[id*=txtotp]").val('');
                        startprocess();
                    }
                });

            }

        },
        failure: function (response) {

            //swal('Error!', 'Something went wrong on failure!', 'info');
            return 2;

        }

    });


};



function sendmeetingcodeandlink() {

    var params = {};
    var descrarray = {};
    var arrData = new Array();
    var obj = {};


    try {


        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();


        var holderacct = $("[id*=holderaccttext]").val();

        //  

        var holdermobile = $("[id*=holdermobile]").val();
        var holderemail = $("[id*=holderemail]").val();

        var getsetnamee = document.getElementById('holdername').innerHTML;


        var holdingunitstext = $("[id*=holdingunitstext]").val();

        params.Accountno = holderacct;
        params.availablemeeting = drpdownselectedMeetingText;
        params.regcode = drpdownselectedMeetingValue;        
        params.holding = holdingunitstext;
        params.name = getsetnamee;
        params.mobile = holdermobile;
        params.emailaddress = holderemail;

        var jasonData;       

        jasonData = "{'paras':" + JSON.stringify(params) + "}";

        // console.log(jasonData);

        $.ajax({
            type: "POST",
            url: "default.aspx/saveMeetingcode",
            data: jasonData,
            
            // data: "{ regcode: \"" + regcode + "\", accountno: \"" + accountno + "\"  }",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#divLoading').show();
            },
            complete: function () {
                $('#divLoading').hide();
            },

            success: function (response) {

                var dd = response.d;

                if (dd == 1) {
                                        
                    swal('Successful!', 'Your Meeting code / link sent successfully, please check your inbox/junk mail!', 'success');
                    panelone(5);
                }
                
                              

            },
            failure: function (response) {

                //alert(response.d);
                //swal('Error!', '' + response.d + '', 'info');
                swal('Error!', 'Something went wrong on failure!', 'info');
            },
            error: function (response) {

                //alert(response.d);
                //swal('Error!', '' + response.d + '', 'info');
                swal('Error!', 'Something went wrong on error!', 'info');
            }
        });



    }
    catch (e) {
        alert(e);
    }

};



// ON READY
$(document).ready(function () {

    $("#completeaccreditation").hide();
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