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

                // panelone(4);

                // NO Resolution 
                confirmifaccredit();
                //panelone(6);
                //completeacreditation();


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




}

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

        //populaterecord(drpdownselectedMeetingValue)                       



    } catch (e) {
        alert(e);
    }


}



function functionSearch(event) {
    swal({
        title: 'Search details?',
        text: "Confirm you have entered valid details t!",
        icon: "info",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
    }).then(function (result) {
        if (result) {

            startsearch();
        }
    });

    return false;
};


function functionConfirm(event) {
    swal({
        title: 'Start e-Accreditation?',
        text: "Begin accreditation to attend the selected meeting!",
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

                            return "<a class='btn btn-primary btn-sm' onclick ='accreditate(" + JSON.stringify(full) + "); return false;'   href='#'>Continue</a>";

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
}


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



//Update New Mobile Number

function savemobile() {

    var paramerrs = {};

    try {


        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();

        var mobiledetails = $("[id*=txtmobile]").val();


        var acctdetails = $("[id*=hiddenaccountnoformobile]").val();


        if (mobiledetails == "") {
            //alert("No Meeting Selected");
            swal('No Mobile details!', 'Please enter your Mobile Number!', 'warning');
            return false;
        };


        paramerrs.Accountno = acctdetails
        paramerrs.regcode = drpdownselectedMeetingValue;
        paramerrs.updatedmobile = mobiledetails;
        // paramerrs.updatedemail = full.emailaddress;

        var jasonData;

        jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

        $.ajax({
            type: "POST",
            url: "default.aspx/savemobilenumber",
            data: jasonData,
            // data: "{'paras':"+JSON.stringify(myArray1)+",'invoicedetails':"+JSON.stringify(arrData)+"}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#divLoading').show();
            },
            complete: function () {
                $('#divLoading').hide();
            },
            success: OnSuccessmobile,
            failure: function (response) {

                //alert(response.d);
                swal('Error!', 'Something went wrong on failure!', 'info');
            },
            error: function (response) {

                //alert(response.d);                        
                swal('Error!', 'Something went wrong on error!', 'info');
            }

        });



    } catch (e) {
        alert(e);
    }

};

// On Success saved contact
function OnSuccessmobile(response) {

    //console.log(response);

    var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
    var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
    var drpdownselectedMeetingValue = drpdownselectedMeeting.val();

    var hiddensearchdetails = $("[id*=hiddenasearchdetailsforemail]").val();

    var dd = response.d;

    if (dd == 1) {
        swal('Successful!', 'Mobile Number is saved successfully!', 'success')
            .then(function (result) {
                if (result) {
                    panelone(3);

                    populaterecord(drpdownselectedMeetingValue, hiddensearchdetails);

                    $("#updatemobile").modal('hide');
                }
            });
        // alert("Successfully created")
    } else if (dd = 3) {
        swal('Error!', 'Something went wrong!', 'info')
            .then(function (result) {
                if (result) {

                    panelone(3);

                    populaterecord(drpdownselectedMeetingValue, hiddensearchdetails);

                    $("#updatemobile").modal('hide');
                }
            });
    }


};


//Update Email Address

function saveemailaddress() {

    var paramerrs = {};

    try {

        // 

        var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
        var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
        var drpdownselectedMeetingValue = drpdownselectedMeeting.val();

        var emaildetails = $("[id*=txtemailaddress]").val();

        var acctdetails = $("[id*=hiddenaccountnoforemail]").val();


        //  

        if (emaildetails == "") {
            //alert("No Meeting Selected");
            swal('No Email Address!', 'Please enter your Email Address!', 'warning');
            return false;
        };


        //validate if email input

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        //console.log(emaildetails);

        if (emaildetails.match(validRegex)) {

            paramerrs.Accountno = acctdetails
            paramerrs.regcode = drpdownselectedMeetingValue;
            paramerrs.updatedemail = emaildetails;
            // paramerrs.updatedemail = full.emailaddress;

            var jasonData;

            jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

            $.ajax({
                type: "POST",
                url: "default.aspx/saveemailaddress",
                data: jasonData,
                // data: "{'paras':"+JSON.stringify(myArray1)+",'invoicedetails':"+JSON.stringify(arrData)+"}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    $('#divLoading').show();
                },
                complete: function () {
                    $('#divLoading').hide();
                },
                success: OnSuccessemail,
                failure: function (response) {

                    //alert(response.d);
                    swal('Error!', 'Something went wrong on failure!', 'info');
                },
                error: function (response) {

                    //alert(response.d);                        
                    swal('Error!', 'Something went wrong on error!', 'info');
                }

            });

        }

        else {


            swal('Invalid email address!', 'Please enter Valid Email Address!', 'warning');
            return false;



        }

    } catch (e) {
        alert(e);
    }

};



// On Success saved contact
function OnSuccessemail(response) {

    //console.log(response);

    var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
    var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
    var drpdownselectedMeetingValue = drpdownselectedMeeting.val();

    var hiddensearchdetails = $("[id*=hiddenasearchdetailsforemail]").val();

    var dd = response.d;

    if (dd == 1) {
        swal('Successful!', 'Email address is saved successfully!', 'success')
            .then(function (result) {
                if (result) {
                    panelone(3);

                    populaterecord(drpdownselectedMeetingValue, hiddensearchdetails);

                    $("#updateemailaddress").modal('hide');
                }
            });

    } else if (dd = 3) {
        swal('Error!', 'Something went wrong!', 'info')
            .then(function (result) {
                if (result) {

                    panelone(3);

                    populaterecord(drpdownselectedMeetingValue, hiddensearchdetails);

                    $("#updateemailaddress").modal('hide');
                }
            });
    }


};




// Set to do vote pattern
function settovote(fullregistercode, fullaccountno) {

    // Confirm if accredit

    //open te OTP PAGE

    //savedaccreditation

    panelone(10);

    //  confirmifaccredit();





    /*panelone(4);

    populateresolutions(fullregistercode, fullaccountno);*/

};


// Confirm if share holders has already accredited or Not
function confirmifaccredit() {

    var paramerrs = {};
    var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
    var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
    var drpdownselectedMeetingValue = drpdownselectedMeeting.val();
    var holderacct = $("[id*=holderaccttext]").val();
    var holdings = $("[id*=holdingunitstext]").val();


    // getsetnamee of holder name Mobile and email
    var getsetnamee = document.getElementById('holdername').innerHTML;
    var holderEmail = $("[id*=holderemail]").val();
    var holdermobile = $("[id*=holdermobile]").val();

    paramerrs.name = getsetnamee;
    paramerrs.emailaddress = holderEmail;
    paramerrs.mobile = holdermobile;

    paramerrs.Resoaccountno = holderacct;
    paramerrs.Resoregcode = drpdownselectedMeetingValue;
    paramerrs.holding = holdings;

    //alert("hello 1")
    //alert(holdings);
    var jasonData;

    jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

    $.ajax({
        type: "POST",
        url: "default.aspx/checkaccreditation",
        data: jasonData,
        //data: "{ regcode: \"" + regcode + "\", searchdetails: \"" + searchdetails + "\"  }",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            var dd = response.d;

            // return response.d;

            if (dd == 1) {

                panelone(4);

                populateresolutions(drpdownselectedMeetingValue, holderacct);
                //populateresolutions(fullregistercode, fullaccountno);

                //swal('Confirm!', 'Something I land to prepare ' + dd + ' .', 'success');

            }

            else if (dd == 0) {

                //Since No details yet saved initial resolution as true before load

                $.ajax({
                    type: "POST",
                    url: "default.aspx/onloadsavedinitialresolution",
                    data: jasonData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var ddd = response.d;
                        if (ddd == 1) {

                            panelone(4);

                            populateresolutions(drpdownselectedMeetingValue, holderacct);


                        }
                    }

                });


                //swal('Not Yet!', 'Not Yet Validate land to prepare ' + dd + ' .', 'info');

            }

        },
        failure: function (response) {

            //swal('Error!', 'Something went wrong on failure!', 'info');
            return 2;

        }

    });


}

//Load Resolution Pattern        
function populateresolutions(regcode, accountno) {

    var paramerrs = {};

    paramerrs.regcode = regcode;
    paramerrs.accountno = accountno;
    //paramerrs.searchdetails = searchdetails;

    var jasonData;

    //jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";      

    try {
        var tables = $("#tblvoting").DataTable();
        tables.destroy();

        $.ajax({
            type: "POST",
            url: "default.aspx/Loadresolution",
            //data: jasonData,
            //data: "{ regcode: \"" + regcode + "\" }",
            data: "{ regcode: \"" + regcode + "\", accountno: \"" + accountno + "\"  }",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#divLoading').show();
            },
            complete: function () {
                $('#divLoading').hide();
            },

            success: OnSuccessresolution,
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
function OnSuccessresolution(response) {

    //console.log(response);

    try {

        var holdings = $("[id*=holdingunitstext]").val();


        //console.log(response)
        //  console.log((response.d).length)

        var datacount = (response.d).length;

        if (datacount >= 1) {

            $("#completeaccreditation").show();

        } else {

            $("#completeaccreditation").hide();
        };





        $("#tblvoting").DataTable(
            {
                bLengthChange: true,
                dom: 'lBfrtip',
                bprocessing: true,
                bserverSide: true,
                //processing: true,
                // serverSide: true,
                //lengthMenu: [[10, 25, 50, 100, 250, 500, 1000, -1], [10, 25, 50, 100, 250, 500, 1000, "All"]],
                bFilter: false,
                bSort: false,
                destroy: true,
                bPaginate: false,
                bDeferRender: false,
                cache: false,
                data: response.d,
                buttons: [],
                columns: [



                    //{ 'data': 'mobile' },
                    { 'data': 'QuestionText' },
                    {
                        "render": function (data, type, full, meta) {


                            if (full.forvalue == "true") {

                                return "<span ><input checked type='radio' name='" + full.ResolutionID + "_voteoption' value='1' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 1," + full.QuestionID + ");' /></span>";

                            }
                            else {


                                return "<span ><input type='radio' name='" + full.ResolutionID + "_voteoption' value='1' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 1," + full.QuestionID + ");' /></span>";
                            }
                        }
                    },
                    {
                        "render": function (data, type, full, meta) {

                            if (full.againstvalue == "true") {

                                return "<span><input  type='radio' checked name='" + full.ResolutionID + "_voteoption' value='2' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 2," + full.QuestionID + ");' /></span>";
                            }
                            else {
                                return "<span><input  type='radio' name='" + full.ResolutionID + "_voteoption' value='2' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 2," + full.QuestionID + ");' /></span>";
                            }
                        }
                    },
                    {
                        "render": function (data, type, full, meta) {

                            if (full.abstainvalue == "true") {

                                return "<span ><input  checked type='radio' name='" + full.ResolutionID + "_voteoption' value='3' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 3," + full.QuestionID + ");' /></span>";
                            }

                            else {

                                return "<span ><input  type='radio' name='" + full.ResolutionID + "_voteoption' value='3' onclick='handleClick(\"" + full.QuestionText + "\"," + full.ResolutionID + ", 3," + full.QuestionID + ");' /></span>";
                            }
                        }
                    },

                ]
            });



    }

    catch (e) {
        alert('error ' + e);
    }

};


// Save Voting Pattern
function handleClick(selResoText, selResoid, seloption, QuestionID) {

    var paramerrs = {};

    var transopttext = "";

    if (seloption == 1) {

        transopttext = "FOR";
    } else if (seloption == 2) {

        transopttext = "AGAINST";

    } else if (seloption == 3) {

        transopttext = "ABSTAIN";
    };

    var drpdownselectedMeeting = $("[id*=drpdownselectedMeeting]");
    var drpdownselectedMeetingText = drpdownselectedMeeting.find("option:selected").text();
    var drpdownselectedMeetingValue = drpdownselectedMeeting.val();


    var holderacct = $("[id*=holderaccttext]").val();
    var holdings = $("[id*=holdingunitstext]").val();

    // getsetnamee of holder name Mobile and email
    var getsetnamee = document.getElementById('holdername').innerHTML;
    var holderEmail = $("[id*=holderemail]").val();
    var holdermobile = $("[id*=holdermobile]").val();

    paramerrs.name = getsetnamee;
    paramerrs.emailaddress = holderEmail;
    paramerrs.mobile = holdermobile;

    paramerrs.Resoaccountno = holderacct;
    paramerrs.ResolutionID = selResoid;
    paramerrs.Resoregcode = drpdownselectedMeetingValue;
    paramerrs.voteoption = seloption;
    paramerrs.holding = holdings;
    paramerrs.QuestionID = QuestionID;
    var jasonData;

    jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

    $.ajax({
        type: "POST",
        url: "default.aspx/Savevotingpattern",
        data: jasonData,
        //data: "{ regcode: \"" + regcode + "\", searchdetails: \"" + searchdetails + "\"  }",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            return 1;

        },
        failure: function (response) {

            return 2;

            //swal('Error!', 'Something went wrong on failure!', 'info');
        },
        error: function (response) {

            return 3;

            //swal('Error!', '' + response.d + '', 'info');

        }
    });



};


// Complete Accreditation
function functionVotepattern(event) {
    swal({
        title: 'Complete Accreditation?',
        text: "Ensure you have selected all your voting pattern!",
        icon: "info",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
    }).then(function (result) {
        if (result) {

            completeacreditation();
        }
    });

    return false;
};

function completeacreditation() {

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
        params.Resoregcode = drpdownselectedMeetingValue;
        params.holding = holdingunitstext;
        params.name = getsetnamee;
        params.mobile = holdermobile;
        params.emailaddress = holderemail;

        var jasonData;

        // var jasonData;

        jasonData = "{'paras':" + JSON.stringify(params) + "}";

        // console.log(jasonData);


        $.ajax({
            type: "POST",
            url: "default.aspx/GenerateQrcode",
            data: jasonData,
            //data: "{ regcode: \"" + regcode + "\" }",
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

                var qrstring = response.d;

                //console.log(qrstring);

               document.getElementById('holdernameagmtitle').innerHTML = drpdownselectedMeetingText;

               document.getElementById("qrimagegenerated").src = qrstring;

                               
                $("#generatedQrcode").modal('show');

                //swal('Successful!', 'Your Meeting code / link sent successfully, please check your inbox/junk mail!', 'success');
                //panelone(5);

            },
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



// Resend QR CODE
function resendqrcode() {

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
        var holdingunitstext = $("[id*=holdingunitstext]").val();

        var holdermobile = $("[id*=holdermobile]").val();
        var holderemail = $("[id*=holderemail]").val();

        var getsetnamee = document.getElementById('holdername').innerHTML;

        params.Accountno = holderacct;
        params.availablemeeting = drpdownselectedMeetingText;
        params.Resoregcode = drpdownselectedMeetingValue;
        params.holding = holdingunitstext;//holderacct;
        params.name = getsetnamee;
        params.mobile = holdermobile;
        params.emailaddress = holderemail;

        var jasonData;

        // var jasonData;

        jasonData = "{'paras':" + JSON.stringify(params) + "}";

        $.ajax({
            type: "POST",
            url: "default.aspx/ResendGenerateQrcode",
            data: jasonData,
            //data: "{ regcode: \"" + regcode + "\" }",
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

                swal('Successful!', 'QRCode sent Successfully!', 'success');

            },
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




$(document).ready(function () {

    $("#completeaccreditation").hide();
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


// Print a div area only

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function ClearSession() {
    document.getElementById("btnHidden").click();
    window.location.reload();
}


function exportqrcode() {
    document.getElementById("btnExport").click();
}

//Create PDf from HTML...
function CreatePDFfromHTML() {
    var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".html-content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }
        pdf.save("MeriXpressQR.pdf");
        //$(".html-content").hide();
    });
}

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {

        alert("Valid email address!");

        document.form1.text1.focus();

        return true;

    } else {

        alert("Invalid email address!");

        document.form1.text1.focus();

        return false;

    }

}