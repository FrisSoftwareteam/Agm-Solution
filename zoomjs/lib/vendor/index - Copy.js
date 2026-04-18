var CLIENT_ID;
var CLIENT_SECRET;
var verifycode;
window.addEventListener('DOMContentLoaded', function (event) {
    //console.log('DOM fully loaded and parsed');
    websdkready();
});


function openwinds(joinUrl) {
    //console.log("about to open new tabs");
    //var link = document.createElement("a")
    //link.href = joinUrl
    //link.target = "_blank"
    //link.click()
    window.location.href = joinUrl;
}

function websdkready() {

    try {


        var testTool = window.testTool;
        if (testTool.isMobileDevice()) {
            vConsole = new VConsole();
        }
        //console.log("checkSystemRequirements");
        //console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

        // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
        // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/2.14.0/lib', '/av'); // CDN version default
        // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/2.14.0/lib', '/av'); // china cdn option
        // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
        ZoomMtg.preLoadWasm(); // pre download wasm file to save time.

        // var CLIENT_ID = "JHclA4MrQHaH99nihO5GgA"//"1Mz6AIW7SLexhrBYWcx8TA"//"YOUR_CLIENT_ID_OR_SDK_KEY"; //
        /**
         * NEVER PUT YOUR ACTUAL SDK SECRET OR CLIENT SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
         * The below generateSignature should be done server side as not to expose your SDK SECRET in public
         * You can find an example in here: https://developers.zoom.us/docs/meeting-sdk/auth/#signature
         */
        // var CLIENT_SECRET = "P4OvFBz0Dd3s0v3xYTV27jCLytOIkX2p"//"tnn0NNBhJ0wBMsgezfuv8q0PzHj5zw19"//"YOUR_CLIENT_SECRET_OR_SDK_SECRET";//P4OvFBz0Dd3s0v3xYTV27jCLytOIkX2p

        // some help code, remember mn, pwd, lang to cookie, and autofill.
        document.getElementById("display_name").value =
            "CDN" +
            ZoomMtg.getWebSDKVersion()[0] +
            testTool.detectOS() +
            "#" +
            testTool.getBrowserInfo();
        document.getElementById("meeting_number").value = testTool.getCookie(
            "meeting_number"
        );
        document.getElementById("meeting_pwd").value = testTool.getCookie(
            "meeting_pwd"
        );
        if (testTool.getCookie("meeting_lang"))
            document.getElementById("meeting_lang").value = testTool.getCookie(
                "meeting_lang"
            );
        document.getElementById("meeting_email").value = testTool.getCookie(
            "meeting_email"
        );
        document
            .getElementById("meeting_lang")
            .addEventListener("change", function (e) {
                testTool.setCookie(
                    "meeting_lang",
                    document.getElementById("meeting_lang").value
                );

                testTool.setCookie(
                    "_zm_lang",
                    document.getElementById("meeting_lang").value
                );
            });
        // copy zoom invite link to mn, autofill mn and pwd.
        document
            .getElementById("meeting_number")
            .addEventListener("input", function (e) {
                var tmpMn = e.target.value.replace(/([^0-9])+/i, "");
                if (tmpMn.match(/([0-9]{9,11})/)) {
                    tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
                }
                var tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
                if (tmpPwd) {
                    document.getElementById("meeting_pwd").value = tmpPwd[1];
                    testTool.setCookie("meeting_pwd", tmpPwd[1]);
                }
                document.getElementById("meeting_number").value = tmpMn;
                testTool.setCookie(
                    "meeting_number",
                    document.getElementById("meeting_number").value
                );
            });

        document.getElementById("clear_all").addEventListener("click", function (e) {
            testTool.deleteAllCookies();
            document.getElementById("display_name").value = "";
            document.getElementById("meeting_number").value = "";
            document.getElementById("meeting_pwd").value = "";
            document.getElementById("meeting_lang").value = "en-US";
            document.getElementById("meeting_role").value = 0;
            document.getElementById("meeting_email").value = "";
            window.location.href = "/index.html";
        });

        // click join meeting button
        document.getElementById("join_meeting").addEventListener("click", function (e) {
            e.preventDefault();

            var meetingcode = $("[id*=txtMeetingcode]").val();

            if ((meetingcode == "") || (meetingcode == " ")) {
                //alert("No Meeting Selected");
                swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

                $("[id*=txtMeetingcode]").focus();
                return false;
            }



            // fetchData(meetingcode)
            //  .then(result => {
            //     //console.log('Result:', result);





            //  })
            //  .catch(error => {
            //      console.log('Error:', error);
            //  });

            // fetchAsync()
            // log response or catch error of fetch promise
            //   .then((data) => console.log(data))
            //  .catch((reason) => console.log("Message:" + reason.message));
            // await verifymeet(meetingcode);




            verifymeet(meetingcode).then((result) => {
                //console.log("Continuing after async task");
                //console.log("Result:", result);

                if (result == true) {



                    var meetingConfig = testTool.getMeetingConfig();
                    if (!meetingConfig.mn || !meetingConfig.name) {
                        alert("Meeting number or username is empty");
                        return false;
                    }


                    testTool.setCookie("meeting_number", meetingConfig.mn);
                    testTool.setCookie("meeting_pwd", meetingConfig.pwd);
                    testTool.setCookie("meeting_email", meetingConfig.email);



                   //     removefrompanel(CLIENT_ID, CLIENT_SECRET,meetingConfig.mn).then((result) => {
                    //             alert(result);
                    //     });

                    alert("ff")
                    //generateZoomJWT(CLIENT_ID, CLIENT_SECRET, meetingConfig.mn, 0).then((result) => {
                    //    // console.log(result);
                    //    // debugger;
                    //    //alert("fff");
                    //    if (result !== "") {
                    //        meetingConfig.signature = result;
                    //        meetingConfig.sdkKey = CLIENT_ID;
                    //        testTool.setCookie("signature", result)

                    //        var joinUrl = "/zoom/meeting.html?" + testTool.serialize(meetingConfig);
                    //        openwinds(joinUrl);
                    //    }
                    //});
 
                    var signature = ZoomMtg.generateSDKSignature({
                        meetingNumber: meetingConfig.mn,
                        sdkKey: CLIENT_ID,
                        sdkSecret: CLIENT_SECRET,
                        role: meetingConfig.role,
                        success: function (res) {
                            //console.log(res.result);
                            meetingConfig.signature = res.result;
                            meetingConfig.sdkKey = CLIENT_ID;
                            var joinUrl = "/zoom/meeting.html?" + testTool.serialize(meetingConfig);
                        
                            openwinds(joinUrl);
                        },
                    });




                }

                 





            });




        });

        function copyToClipboard(elementId) {
            var aux = document.createElement("input");
            aux.setAttribute("value", document.getElementById(elementId).getAttribute('link'));
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
        }

        // click copy jon link button
        window.copyJoinLink = function (element) {
            var meetingConfig = testTool.getMeetingConfig();
            if (!meetingConfig.mn || !meetingConfig.name) {
                alert("Meeting number or username is empty");
                return false;
            }
            var signature = ZoomMtg.generateSDKSignature({
                meetingNumber: meetingConfig.mn,
                sdkKey: CLIENT_ID,
                sdkSecret: CLIENT_SECRET,
                role: meetingConfig.role,
                success: function (res) {
                    //console.log(res.result);
                    meetingConfig.signature = res.result;
                    meetingConfig.sdkKey = CLIENT_ID;
                    var joinUrl =
                        testTool.getCurrentDomain() +
                        "/meeting.html?" +
                        testTool.serialize(meetingConfig);
                    document.getElementById('copy_link_value').setAttribute('link', joinUrl);
                    copyToClipboard('copy_link_value');

                },
            });
        };



    }
    catch (e) {
        alert(e);
    }


}



function generateToken(apiKey, apiSecret) {
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    var payload = {
        "iss": apiKey,
        "exp": Math.floor(Date.now() / 1000) + 3600
    };

    var jwtHeader = btoa(JSON.stringify(header));
    var jwtPayload = btoa(JSON.stringify(payload));
    var signature = btoa(jwtHeader + '.' + jwtPayload + apiSecret);

    return jwtHeader + '.' + jwtPayload + '.' + signature;
}
function removefrompanel(apiKey, apiSecret, meetingNumber) {

    //var ACCESS_TOKEN;
    //const apiKey = apiKey;
    //  const apiSecret =  apiSecret;

    try {

        return new Promise((resolve, reject) => {


            var token = generateToken(apiKey, apiSecret);

            console.log(token);

            const tokenExpireInSeconds = 3600; // Token expiration time in seconds

            const header = { alg: 'HS256', typ: 'JWT' };
            const payload = {
                iss: apiKey,
                exp: Math.floor(Date.now() / 1000) + tokenExpireInSeconds
            };

            const secret = apiSecret;


            // const sHeader = JSON.stringify(header)
            //const sPayload = JSON.stringify(payload )
            // const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, apiSecret)


            var ACCESS_TOKENs = KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), secret);

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            //const apiUrl = 'https://api.zoom.us/v2/webinars/' + meetingNumber + '/panelists';
           // const apiUrl = 'retrievals.aspx/binars/' + meetingNumber + '/panelists';
            const apiUrl = 'retrievals.aspx/panelists';
            console.log(ACCESS_TOKENs);

          

     

            var paramcodes = {};


 paramcodes.tokens = ACCESS_TOKENs;
            paramcodes.meetingNumber = meetingNumber;
           
            paramcodes.apk = apiKey;
            paramcodes.seca = apiSecret;

            

         
 
            var jasonData;

            jasonData =   JSON.stringify(paramcodes)  
 
            console.log(jasonData);



            $.ajax({
                type: "POST",
                //url: "WebService.asmx/verifymeetingcode",
                url: "retrievals.aspx/panelists",
                data: jasonData,

                contentType: "application/json; charset=utf-8",
                dataType: "json",

                success: function (response) {


                    alert("d");
                    console.log('API Response:', response);
                },
                failure: function (response) {
                
                    swal('Error!', 'Something went wrong!', 'warning');
                 
                }

            });


       
            //$.ajax({
            //    type: 'post',
            //    url: apiUrl,
            //    data: jasonData,
            //    success: function (response) {
            //        alert(12);
            //        console.log('API Response:', response);
            //    },
            //    error: function (xhr, status, error) {
            //        alert("h");
            //        console.log('Error:', error);
            //    }
            //});






            //$.ajax({
            //    type: "GET",
            //    headers: {
            //        'Authorization': 'Bearer ' + ACCESS_TOKENs
            //    },
            //    url: "https://api.zoom.us/v2/webinars/" + meetingNumber + "/panelists",


            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",

            //    success: function (response) {
            //        console.log(response);
                    
            //    },
            //    failure: function (response) {
            //        alert("fff");
            //        console.log(response);

            //    }

            //});


            return false;
            fetch(apiUrl, {
                headers: {
                    Authorization: 'Bearer ' + ACCESS_TOKENs
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Find the panelist with the user's email
                    const panelist = data.panelists.find(panelist => panelist.email === userEmail);
                    if (panelist) {
                        // Remove the user from the panelist role
                        fetch('https://api.zoom.us/v2/webinars/' + meetingNumber + '/panelists/' + panelist.id, {
                            method: 'DELETE',
                            headers: {
                                Authorization: 'Bearer ' + ACCESS_TOKENs
                            }
                        })
                            .then(response => {
                                if (response.status === 204) {
                                    console.log('User removed from panelist role.');
                                    resolve('success')
                                } else {
                                    console.log('Failed to remove user from panelist role:', response.statusText);
                                    resolve('fail');
                                }
                            })
                            .catch(error => {
                                console.log('Error removing user from panelist role:', error);
                                reject(error);
                            });
                    }
                })
                .catch(error => {
                    console.log('Error fetching panelists:', error);
                    reject(error);

                });


        });

    }
    catch (e) {
        alert(e);
    }
}






function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
}


function generateZoomJWT(apiKey, apiSecret, meetingNumber, role) {
    //const iat = Math.round(new Date().getTime() / 1000);
    return new Promise((resolve, reject) => {

        //const iat = Math.round((new Date).getTime() / 1e3) - 30;
        // const iat = Math.floor(Date.now()/1000);

        //var serverTime = ""; // Server timestamp
        //var clientTime = Date.now(); // Client timestamp
        //var timeDifference = serverTime - clientTime;


        const iat = (new Date().getTime() - 30000) / 1000;
        const exp = iat + 60 * 60 * 2
        const oHeader = { alg: 'HS256', typ: 'JWT' }

        const oPayload = {
            sdkKey: apiKey,
            appKey: apiKey,
            mn: meetingNumber,
            role: 0,
            iat: iat,
            exp: exp,
            tokenExp: exp
        }

        const sHeader = JSON.stringify(oHeader)
        const sPayload = JSON.stringify(oPayload)
        const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, apiSecret)
        // const jwsToken = KJUR.jws.JWS.sign("RS256", JSON.stringify(header), JSON.stringify(payload), privateKey);

        // joinMeeting(signature);
        //joinMeeting(sdkJWT);
        resolve(sdkJWT)
        // return sdkJWT
    });
}




function verifymeet(meetingcode) {
    return new Promise((resolve, reject) => {
        verifycode = "no";
        try {



            var meetingcode = $("[id*=txtMeetingcode]").val();

            if ((meetingcode == "") || (meetingcode == " ")) {
                //alert("No Meeting Selected");
                swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

                $("[id*=txtMeetingcode]").focus();
                //return false;
                resolve(false)
            }



            var paramcode = {};



            paramcode.meetingcode = meetingcode;



            paramcode.regcode = GetURLParametersd('params');
            paramcode.name = GetURLParametersd('sna');
            paramcode.searchdetails = GetURLParametersd('uid');


            const a = paramcode.searchdetails;
            if (a === undefined || a === null) {
                //console.log('Variable is null or undefined');


                //  if (paramcode.searchdetails == undefined ||paramcode.searchdetails == null || paramcode.searchdetails === null || paramcode.searchdetails === undefined == '') {

                swal('Error!', 'Please access this page via the Virtual Meeting link sent to your email upon e - accreditation. Thank You as you comply.', 'warning');

                verifycode = "no";
                //return false;
                resolve(false);
            }
            //alert(paramcode.regcode);
            // alert(paramcode.name );
            var jasonData;

            jasonData = "{'paras':" + JSON.stringify(paramcode) + "}";

            //console.log(jasonData);



            $.ajax({
                type: "POST",
                //url: "WebService.asmx/verifymeetingcode",
                url: "retrievals.aspx/verifymeetingcode",
                data: jasonData,

                contentType: "application/json; charset=utf-8",
                dataType: "json",

                success: function (response) {



                    var datas = response.d;

                    var data = $.parseJSON(datas);

                    //console.log(data);
                    var dd = data.code;
                    names = data.names;

                    if (dd == "1") {

                        document.getElementById("display_name").value = data.names;
                        document.getElementById("meeting_email").value = data.email;
                        verifycode = "yes";

                        document.getElementById("meeting_number").value = data.zid;

                        document.getElementById("meeting_pwd").value = data.zmc;

                        meeting2nd = data.zmc;
                        meetingnumber = data.zid;
                        document.getElementById("meeting_lang").value = "en-US";
                        document.getElementById("meeting_role").value = 0;
                        CLIENT_ID = data.CID;
                        CLIENT_SECRET = data.SECRET;





                        //testTool.setCookie("name", data.names);
                        //  testTool.setCookie("userName", data.names);

                        resolve(true);
                        //return true;

                    } if (dd == "2") {
                        verifycode = "no";
                        swal('Error!', 'Your meeting is yet to start or ended, please check back  ' + data.hd3, 'warning');
                        resolve(false);
                        // return false;
                    } if (dd == "3") {
                        verifycode = "no";
                        swal('Error!', 'YOUR MEETING IS YET TO START OR ENDED. PLEASE CHECK BACK ' + data.hd3, 'warning');
                        resolve(false);
                        // return false;

                    } if (dd == "4") {
                        verifycode = "no";
                        swal('Oops!', 'You have entered an invalid meeting code!', 'warning');
                        resolve(false);
                        // return false;


                    }

                    if (dd == "5") {
                        verifycode = "no";
                        swal('Oops!', 'Something went wrong!', 'warning');

                        //   return false;
                        resolve(false);

                    }
                    resolve(false);
                    //return false;
                },
                failure: function (response) {
                    verifycode = "no";
                    swal('Error!', 'Something went wrong!', 'warning');
                    // return false;
                    resolve(false);
                }

            });

        }

        catch (e) {
            alert(e);
        }

    });
}

$(document).ready(function () {
    //var uid   = GetURLParameter('uid');
    //var params = GetURLParameter('params');
    //var sna = GetURLParameter('sna');
});

function GetURLParametersd(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}



async function fetchAsync() {

    verifycode = "no";
    try {



        var meetingcode = $("[id*=txtMeetingcode]").val();

        if ((meetingcode == "") || (meetingcode == " ")) {
            //alert("No Meeting Selected");
            swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

            $("[id*=txtMeetingcode]").focus();
            return false;
        }



        var paramcode = {};



        paramcode.meetingcode = meetingcode;



        paramcode.regcode = GetURLParametersd('params');
        paramcode.name = GetURLParametersd('sna');
        paramcode.searchdetails = GetURLParametersd('uid');


        const a = paramcode.searchdetails;
        if (a === undefined || a === null) {
            //console.log('Variable is null or undefined');


            //  if (paramcode.searchdetails == undefined ||paramcode.searchdetails == null || paramcode.searchdetails === null || paramcode.searchdetails === undefined == '') {

            swal('Error!', 'Please access this page via the Virtual Meeting link sent to your email upon e - accreditation. Thank You as you comply.', 'warning');

            verifycode = "no";
            return false;
        }
        //alert(paramcode.regcode);
        // alert(paramcode.name );
        var jasonData;

        jasonData = "{'paras':" + JSON.stringify(paramcode) + "}";

        //console.log(jasonData);



        $.ajax({
            type: "POST",
            //url: "WebService.asmx/verifymeetingcode",
            url: "retrievals.aspx/verifymeetingcode",
            data: jasonData,

            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {



                var datas = response.d;

                var data = $.parseJSON(datas);

                //console.log(data);
                var dd = data.code;
                names = data.names;

                if (dd == "1") {
                    document.getElementById("display_name").value = data.names;
                    verifycode = "yes";

                    document.getElementById("meeting_number").value = data.zid;

                    document.getElementById("meeting_pwd").value = data.zmc;

                    meeting2nd = data.zmc;
                    meetingnumber = data.zid;
                    document.getElementById("meeting_lang").value = "en-US";
                    document.getElementById("meeting_role").value = 0;
                    CLIENT_ID = data.CID;
                    CLIENT_SECRET = data.SECRET;






                    return true;

                } if (dd == "2") {
                    verifycode = "no";
                    swal('Error!', 'Your meeting is yet to start or ended, please check back!', 'warning');

                    return false;

                } if (dd == "4") {
                    verifycode = "no";
                    swal('Oops!', 'You have entered invalid meeting code!', 'warning');

                    return false;


                }

                if (dd == "5") {
                    verifycode = "no";
                    swal('Oops!', 'Something went wrong!', 'warning');

                    return false;


                }

                return false;
            },
            failure: function (response) {
                verifycode = "no";
                swal('Error!', 'Something went wrong!', 'warning');
                return false;

            }

        });

    }



    catch (e) { }

    //// await response of fetch call
    //let response = await fetch("<https://api.github.com>");
    //// only proceed once promise is resolved
    //let data = await response.json();
    //// only proceed once second promise is resolved
    return false;
}
function fetchData(data) {
    return new Promise((resolve, reject) => {


        var meetingcode = $("[id*=txtMeetingcode]").val();

        if ((meetingcode == "") || (meetingcode == " ")) {

            swal('Meeting code required!', 'Please enter your meeting code!', 'warning');

            $("[id*=txtMeetingcode]").focus();

            resolve(false)
        }



        var paramcode = {};



        paramcode.meetingcode = meetingcode;



        paramcode.regcode = GetURLParametersd('params');
        paramcode.name = GetURLParametersd('sna');
        paramcode.searchdetails = GetURLParametersd('uid');


        const a = paramcode.searchdetails;
        if (a === undefined || a === null) {
            //console.log('Variable is null or undefined');

            swal('Error!', 'Please access this page via the Virtual Meeting link sent to your email upon e - accreditation. Thank You as you comply.', 'warning');
            verifycode = "no";

            resolve(false);
        }

        var jasonData;

        jasonData = "{'paras':" + JSON.stringify(paramcode) + "}";




        fetch('retrievals.aspx/verifymeetingcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
            body: jasonData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}




