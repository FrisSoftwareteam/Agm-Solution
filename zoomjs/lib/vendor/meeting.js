
var timer;

var coutes;
coutes = 0;
var parass;

var voteoption;
var namesss;
var baseur;

function getwebsiteurl() {
    var baseurlss;
    return new Promise((resolve, reject) => {
        try {
            $.ajax({
                type: "POST",
                url: "retrievals.aspx/getwebsiteurl",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {


                    baseurlss = response.d;

                    resolve(baseurlss);
                },
                failure: function (response) {
                },
                error: function (response) {
                }
            });

        }
        catch (e) {

        }
    });
}



window.addEventListener('DOMContentLoaded', function (event) {
    // console.log('DOM fully loaded and parsed');

    websdkready();
    setTimeout(getcodes, 2000);
});

function websdkready() {
    var testTool = window.testTool;
    // get meeting args from url

    var tmpArgs = testTool.parseQuery();
    
    var meetingConfig = {
        sdkKey: tmpArgs.sdkKey,
        meetingNumber: tmpArgs.mn,
        userName: (function () {
            if (tmpArgs.name) {
                try {
                    return testTool.b64DecodeUnicode(tmpArgs.name);
                } catch (e) {
                    return tmpArgs.name;
                }
            }
            return (
                "CDN#" +
                tmpArgs.version +
                "#" +
                testTool.detectOS() +
                "#" +
                testTool.getBrowserInfo()
            );
        })(),
        passWord: tmpArgs.pwd,
        leaveUrl: baseur +"/leave.html",
        role: parseInt(tmpArgs.role, 10),
        userEmail: (function () {
            try {
                return testTool.b64DecodeUnicode(tmpArgs.email);
            } catch (e) {
                return tmpArgs.email;
            }
        })(),
        lang: tmpArgs.lang,
        signature: tmpArgs.signature || "",
        china: tmpArgs.china === "1",
    };
    //alert(meetingConfig.userEmail);
    //alert(meetingConfig.leaveUrl);
    // a tool use debug mobile device
    if (testTool.isMobileDevice()) {
        vConsole = new VConsole();
    }
    //console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    namesss = meetingConfig.userName;
    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // ZoomMtg.setZoomJSLib("https://source.zoom.us/2.14.0/lib", "/av"); // CDN version defaul
    if (meetingConfig.china)
        ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/2.14.0/lib", "/av"); // china cdn option
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    function beginJoin(signature) {

        getwebsiteurl().then((result) => {
            baseur = result;
            
            ZoomMtg.init({
               // leaveUrl: meetingConfig.leaveUrl,
                leaveUrl: baseur +"/index.html",
                webEndpoint: meetingConfig.webEndpoint,
                disableCORP: !window.crossOriginIsolated, // default true
                // disablePreview: false, // default false
                externalLinkPage: './externalLinkPage.html',
                success: function () {
                    //console.log(meetingConfig);
                    //console.log("signature", signature);
                    ZoomMtg.i18n.load(meetingConfig.lang);
                    ZoomMtg.i18n.reload(meetingConfig.lang);
                    ZoomMtg.join({
                        meetingNumber: meetingConfig.meetingNumber,
                        userName: meetingConfig.userName,
                        signature: signature,
                        sdkKey: meetingConfig.sdkKey,
                        userEmail: meetingConfig.userEmail,
                        passWord: meetingConfig.passWord,
                        success: function (res) {
                            //console.log("join meeting success");
                            //console.log("get attendeelist");
                            ZoomMtg.getAttendeeslist({});
                            ZoomMtg.getCurrentUser({
                                success: function (res) {
                                    //console.log("success getCurrentUser", res.result.currentUser);
                                },
                            });
                        },
                        error: function (res) {
                            //console.log(res);
                        },
                    });
                },
                error: function (res) {
                    //console.log(res);
                },
            });

            ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
                //console.log('inMeetingServiceListener onUserJoin', data);
            });

            ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
                //console.log('inMeetingServiceListener onUserLeave', data);
            });

            ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
                //console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
            });

            ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
                //console.log('inMeetingServiceListener onMeetingStatus', data);
            });

        });
    }

    
      


        beginJoin(meetingConfig.signature);
     
 //});
   
    




};







function showpop() {


    $("#mydragdiv").show();

    dragElement(document.getElementById("mydragdiv"));

    //$("#simpleModal").modal({ backdrop: "static ", keyboard: false });
    //  $("#simpleModal").modal('show');

}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        document.getElementById(elmnt.id + "header").ontouchstart = dragTouchStart;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = dragTouchStart;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e = e || window.event;
        e.preventDefault();
        // get the touch position at startup:
        var touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        // call a function whenever the touch moves:
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        if (e.type === "mousemove") {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        } else if (e.type === "touchmove") {
            var touch = e.touches[0];
            pos1 = pos3 - touch.clientX;
            pos2 = pos4 - touch.clientY;
            pos3 = touch.clientX;
            pos4 = touch.clientY;
        }
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}



$(document).ready(function () {
    setTimeout(getcodes, 2000);

    $(window).resize(function () {

        var windowHeight = $(window).height();
        var divHeight = $("#mydragdiv").outerHeight();

        if (divHeight < windowHeight) {
            $("#mydragdiv").css("top", "60");
            $("#mydragdiv").css("left", "0");
            $("#mydragdiv").css("width", "70%");
        } else {
            $("#mydragdiv").css("top", "0");
        }

        //$(".meeting-client-inner").css("top", "60px  !important");
        //$(".meeting-client-inner").css("height", "80%  !important");
        //$("#zmmtg-root").css("top", "60px  !important");



    });




    setTimeout(function () {
        // Call your function here
        panelone();
    }, 10000);

});


function panelone() {
    setTimeout(fetchdata, 1000);
}


function postvote(tism, ids) {



    var paramerrs = {};
    $('#voteoption1').prop('checked', false);
    $('#voteoption2').prop('checked', false);
    $('#voteoption3').prop('checked', false);

    //return false;



    if (ids == 1) {
        $('#voteoption1').prop('checked', true);

    }


    if (ids == 2) {

        $('#voteoption2').prop('checked', true);

    }



    if (ids == 3) {
        $('#voteoption3').prop('checked', true);


    }


    paramerrs.Resoaccountno = parass[0].Resoaccountno
    paramerrs.ResolutionID = parass[0].ResolutionID;
    paramerrs.Resoregcode = parass[0].Resoregcode;
    paramerrs.voteoption = ids;
    paramerrs.holding = parass[0].holding
    paramerrs.QuestionID = parass[0].currQuestionID
    paramerrs.name = parass[0].name
    paramerrs.mobile = parass[0].mobile
    paramerrs.emailaddress = parass[0].emailaddress;

    paramerrs.holderacct = parass[0].holderacct;

    var jasonData = "{'paras':" + JSON.stringify(paramerrs) + "}";

    $.ajax({
        type: "POST",
        url: "retrievals.aspx/Savevotingpattern",
        data: jasonData,
        //data: "{ regcode: \"" + regcode + "\", searchdetails: \"" + searchdetails + "\"  }",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            fetchdata();
            //return 1;

        },
        failure: function (response) {

            return 2;

        },
        error: function (response) {

            return 3;



        }
    });


}


function fetchdata() {
    try {
        var inProcess = false;//Just to make sure that the last ajax call is not in process

        setTimeout(function () {
            if (inProcess) {
                return false;//Another request is active, decline timer call ...
            }
            inProcess = true;//make it burn ;)


            // LoadCurrenvideoURL();


            jQuery.ajax({
                url: 'retrievals.aspx/LoadCurrentResolution', //Define your script url here ...
                data: '', //Pass some data if you need to
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //method: 'POST', //Makes sense only if you passing data
                success: function (answer) {


                    const jsonStr = answer.d;
                    parass = answer.d;
                    //  //console.log(parass);

                    if (jsonStr.length === 0) {
                        var currlink = ' ' + 'No Resolution is under consideration at this time.';

                        jQuery('#Resolutiontext').html(currlink);

                        jQuery('#mydragdiv').hide();



                    } else {



                        var currQuestionText = jsonStr[0].currQuestionText;

                        var currActiveReso = jsonStr[0].currActiveReso;


                        if (currActiveReso == 1) {
                            showpop();
                            // checkMeetingStatus();

                            var currlink = '<i class="fa fa-check"></i>' + currQuestionText;


                            jQuery('#Resolutiontext').html(currlink);



                            $('#voteoption1').prop('checked', false);
                            $('#voteoption2').prop('checked', false);
                            $('#voteoption3').prop('checked', false);

                            voteoption = 0;


                            if (jsonStr[0].forvalue == "true") {
                                $('#voteoption1').prop('checked', true);
                                voteoption = 1;
                            }


                            if (jsonStr[0].againstvalue == "true") {

                                $('#voteoption2').prop('checked', true);
                                voteoption = 2;
                            }



                            if (jsonStr[0].abstainvalue == "true") {
                                $('#voteoption3').prop('checked', true);

                                voteoption = 3;
                            }



                        }

                    }



                    inProcess = false;//Queue is free, guys ;)


                },
                error: function () {
                    //unknown error occorupted
                    inProcess = false;//Queue is free, guys ;)
                }
            });


            setTimeout(fetchdata, 5000);
        }, 2000);

    }
    catch (e) { alert(e); }
}


function getcodes() {
    zmno = '';
    zmc = '';
    $.ajax({
        type: "POST",
        url: "retrievals.aspx/checkmeeting",
        data: "",

        contentType: "application/json; charset=utf-8",
        dataType: "json",


        success: function (response) {



            var datas = response.d;

            var data = $.parseJSON(datas);


            //console.log(data);
            //console.log(namesss);

            if (data.virtualmeetingstart == 'True') {




                $("[id*=zmmtg-root").show();
                $('#zmmtg-root').show();
                //$('.video-avatar__avatar').show();
                $('.suspension-window-container').show();
                $("[id*=lblmeetingdatetime").hide();
            }
            else {



                $('.suspension-window-container').hide();
                $('#zmmtg-root').hide();
                $("[id*=zmmtg-root").hide();

                $("[id*=lblmeetingdatetime").show();
                $("[id*=lblmeetingdatetime").text(data.hd3);
                $("[id*=lblhodern").text(namesss);

                ZoomMtg.endMeeting({
                    success: function (res) {
                        //console.log('Meeting ended successfully');
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });

            }

            //function getcodes() {
            //    zmno = '';
            //    zmc = '';
            //    $.ajax({
            //        type: "POST",
            //        url: "retrievals.aspx/checkmeeting",
            //        data: "",

            //        contentType: "application/json; charset=utf-8",
            //        dataType: "json",


            //        success: function (response) {



            //            var datas = response.d;

            //            var data = $.parseJSON(datas);

            //            //console.log(data);
            //            ////console.log(namesss);


            //            if (data.virtualmeetingstart == 'True') {




            //                $("[id*=zmmtg-root").show();
            //                $('#zmmtg-root').show();
            //                //$('.video-avatar__avatar').show();
            //                $('.suspension-window-container').show();


            //                $("[id*=lblmeetingdatetime").hide();
            //            }
            //            else {






            //ZoomMtg.stopVideo({
            //    success: function (res) {
            //        //console.log('Video stopped successfully');
            //    },
            //    error: function (res) {
            //        //console.log(res);
            //    }
            //});





        },
        failure: function (response) {


            return 2;

        }

    });


    setTimeout(getcodes, 2000);
}
                // document.getElementById('<%=lblhodern.ClientID%>').value = "This meeting is yet to begin, try again " + activestream;
                //$('.suspension-window-container').hide();
                //$('#zmmtg-root').hide();
                //$("[id*=zmmtg-root").hide();
                //$("[id*=zmmtg-root").hide();
                //$("[id*=lblmeetingdatetime").show();

                //ZoomMtg.endMeeting({
                //    success: function (res) {

                //        //console.log('Meeting ended successfully');
                //    },
                //    error: function (res) {
                //        //console.log(res);
                //    }
                //});


                //ZoomMtg.stopVideo({
                //    success: function (res) {
                //        ////console.log('Video stopped successfully');
                //    },
                //    error: function (res) {
                //        //console.log(res);
                //    }
                //});





