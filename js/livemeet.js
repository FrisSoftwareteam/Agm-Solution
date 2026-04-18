


var timer;

var coutes;
coutes = 0;
var parass;

var voteoption;

var box = document.getElementById('box');
var meetingdates = document.getElementById('<%=lblmeetingdatetime.ClientID%>');

function resetp(bases) {

    alert(bases);
    window.open(bases, "_self");
}



function postvote(tism, ids) {

    //alert(ids);
    
    var paramerrs = {};
    $('#voteoption1').prop('checked', false);
    $('#voteoption2').prop('checked', false);
    $('#voteoption3').prop('checked', false);

    //return false;


        
    if (ids ==1) {
        $('#voteoption1').prop('checked', true);
       
    }


    if (ids== 2) {

        $('#voteoption2').prop('checked', true);
       
    }



    if ( ids ==3) {
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
        url: "default.aspx/Savevotingpattern",
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

            //swal('Error!', '' + response.d + '', 'info');

        }
    });


}
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

         

        //Cull Valid Video URL
        LoadCurrenvideoURL();
       

        jQuery.ajax({
            url: 'default.aspx/LoadCurrentResolution', //Define your script url here ...
            data: '', //Pass some data if you need to
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //method: 'POST', //Makes sense only if you passing data
            success: function (answer) {
                               
               
                const jsonStr = answer.d;
                 parass = answer.d;
                
               
                if (jsonStr.length === 0) {

               


                    var currlink = ' ' + 'No Resolution is under consideration at this time.';

                    jQuery('#Resolutiontext').html(currlink);

                    jQuery('#votevalue').hide();

                   

                } else  {

                

                    var currQuestionText = jsonStr[0].currQuestionText;

                    var currActiveReso = jsonStr[0].currActiveReso;

                

                    if (currActiveReso == 1) {
                            
                        var currlink = '<i class="fa fa-check"></i>' + currQuestionText;

                        // jQuery('.currreso').html(currlink);  //update your div with new content, yey ....

                        jQuery('#Resolutiontext').html(currlink);

                        jQuery('#votevalue').show();

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

function startTimer() {
    timer = setInterval(function () {
        document.getElementById('gfg')
            .innerHTML = " 5 seconds are up ";
    }, 2000);
}

function stopTimer() {
    document.getElementById('gfg')
        .innerHTML = " Timer stopped ";
    clearInterval(timer);
}





$(document).ready(function () {

    
   // meetingdates.style.display = 'none';


    panelone(0);

    LoadCurrenvideoURL();

    jQuery('#votevalue').hide();

    //Load panel one after 20 Seconds
    setTimeout(function () {
        // Call your function here
        panelone(1);
    }, 3000); // 20 seconds in milliseconds
        
});

function panelone(state) {

    var panelWelcome = $("[id*=PanelWelcome]");

    panelWelcome.hide();

    var panelOneName = $("[id*=PanelStepOne]");

    panelOneName.hide();

    
    //PanelStepfive
    if (state == 0) {

        $("[id*=hiddenvdurl]").val("https://www.youtube.com/embed/05DqIGS_koU");

 
        var currvideourl2 = '<iframe class="youtube-video" src="' + $("[id*=hiddenvdurl]").val() + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>';

        var currvideourl =  "<video autoplay width='320' height='320' controls>  <source src='../novideo/NoVideoAvailable.mp4' type=video/mp4>  </video>"

        jQuery('#ifamecurrentvideo').html(currvideourl);

        panelWelcome.show();

    } else if (state == 1) {

        //LoadActiveResolution();

        LoadActiveResolution()
            
        panelOneName.show();
                

       // LoadActiveResolution();

        setTimeout(fetchdata, 1000);


    } 

};

// Load Valid Video URl
function LoadCurrenvideoURL() {

    try {
      

        

        // check for current meeting and video
        //111111
        $.ajax({
            type: "POST",
            url: "default.aspx/LoadCurrentmeetvideo",
            //data: jasonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (answer) {

                // console.log(answer);
 
                const jsonStr = answer.d;
             //   console.log(jsonStr.length);


                

                if (jsonStr.length === 0) {

                    var currcompanyname = ' ' + 'No Meeting in view!';

                   var defvideourl = 'https://www.youtube.com/embed/05DqIGS_koU';

                    var currvideourlx = '<iframe class="youtube-video" src="' + defvideourl + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>';
                    var currvideourl = "<video autoplay width='320' height='240' id='video1' controls>  <source src='../novideo/NoVideoAvailable.mp4' type=video/mp4>  </video>"
                  
                    $("[id*=hiddenvdurl]").val('https://www.youtubes.com/embed/05DqIGS_koU');

                    $("[id*=lblmeetingdatetime]").show();
                   // console.log(currvideourl)

                  //  console.log($("[id*=hiddenvdurl]").val());

                    if ($("[id*=hiddenvdurl]").val() != defvideourl) {
                        jQuery('#ifamecurrentvideo').html(currvideourl);
                    }

                    jQuery('#lblcompanytextname').html(currcompanyname);

                   

                } else {

                   

                    var defaultvid = $("[id*=hiddenvdurl]");

                    var currVideourl;

                    var currCoyname = jsonStr[0].meetingcoyname;

                    var currVideourlb = jsonStr[0].meetingvideoURL;
                    
                   // console.log(currVideourlb);
                   // console.log(defaultvid.val());

                    $("[id*=lblmeetingdatetime]").hide();

                    if (defaultvid.val() == currVideourlb) {

                        currVideourl = currVideourlb;

                   
                    } else {

                    
                        var currvidlink = '<iframe class="youtube-video" src="' + currVideourlb + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>';
                   
                        jQuery('#ifamecurrentvideo').html(currvidlink);
                        $("[id*=hiddenvdurl]").val(currVideourlb);

                  
                    }


                  
                    var currcompanyname = ' ' + currCoyname + ' ';

                       // $("[id*=hiddenvdurl]").val(currVideourlb);

                        jQuery('#lblcompanytextname').html(currCoyname);

                       



                    




                }

            },
            error: function () {
                //unknown error occorupted
                return 2;
            }

        });

    } catch (e) {
        alert(e);
    };
}

// Load Actove Resolution
function LoadActiveResolution() {


    try {
        $.ajax({
            type: "POST",
            url: "default.aspx/LoadCurrentResolution",
            //data: jasonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (answer) {

                const jsonStr = answer.d;

                parass = answer.d;
 

                if (jsonStr.length === 0) {

                    var currlink = ' ' + 'No Resolution is under consideration at this time.';

                    jQuery('#Resolutiontext').html(currlink);

                    jQuery('#votevalue').hide();



                } else {

                    //console.log(answer.d);

                    var currQuestionText = jsonStr[0].currQuestionText;

                    var currActiveReso = jsonStr[0].currActiveReso;

                 

                    if (currActiveReso == 1) {

                        var currlink = '<i class="fa fa-check"></i>' + currQuestionText;

                        // jQuery('.currreso').html(currlink);  //update your div with new content, yey ....

                        jQuery('#Resolutiontext').html(currlink);

                        jQuery('#votevalue').show();

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

            },
            error: function () {
                //unknown error occorupted
                return 2;
            }

        });
    }
    catch (e) {
        alert(e);
    }
}

//Clear Sesion
function ClearSession() {
    document.getElementById("btnHidden").click();
    window.location.reload();
}

