///<reference path="../node_modules/@types/jquery/index.d.ts"/>
// sudo chmod -R a+rwx /Users/sevan/Desktop/Google\ Drive\ \(ITS\ Kennedy\)/WebStorm/Angus
// ----------- Chiamate AJAX con JQUERY a Node JS ----------------------------------------------------------------------
function getProduct() {
    $.ajax({
        url: "https://localhost:8086/GrowingMobile",
        type: "GET",
        dataType: "JSON"
    }).then(function (data) {
        alert(JSON.stringify(data));
    }, function () {
        alert("error");
    });
}
// ----------- LOCAL STORAGE -------------------------------------------------------------------------------------------
var musicActive;
var soundActive;
var vibrationActive;
var vibrationSingle;
var vibrationTwice;
activeAllVibration();
var language;
musicActive = localStorage.getItem('musicActive');
soundActive = localStorage.getItem('soundActive');
vibrationActive = localStorage.getItem('vibrationActive');
// ----------- SUONI + MUSICHE -----------------------------------------------------------------------------------------
var musicArray = [];
var soundArray = [];
// PS: Tenere su Sony Vegas circa -3/5 decibel rispetto ai suoni
// Musiche ( Vanno in loop e vanno gestite con Cordova )
var loginmusicmp3 = new Audio('music/loginmusic.mp3');
musicArray.push(loginmusicmp3); // Lo aggiungo ad un Array per gestire meglio tutti i suoni (tipo fermarli quando è in onPause )
// Suoni ( Non vanno in loop )
var errormp3 = new Audio('music/error.mp3');
var successmp3 = new Audio('music/success.mp3');
var logoutmp3 = new Audio('music/logout.mp3');
var techeffectmp3 = new Audio('music/techeffect.mp3');
soundArray.push(errormp3);
soundArray.push(successmp3);
soundArray.push(logoutmp3);
soundArray.push(techeffectmp3);
errormp3.loop = false;
successmp3.loop = false;
logoutmp3.loop = false;
techeffectmp3.loop = false;
function playlogin() {
    loginmusicmp3.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    loginmusicmp3.play();
}
// --------- check settings all' avvio ---------------------------------------------------------------------------------
if (musicActive == 'false') {
    muteAllMusic();
}
if (soundActive == 'false') {
    muteAllSound();
}
if (vibrationActive == 'false') {
    muteAllVibration();
}
// ----------- APP -----------------------------------------------------------------------------------------------------
/*class Accounts { // Classe Account temporanea per mettere utenti

    username:string;
    password:string;
    permissions:number;

    constructor (username:string, password:string, permissions:number) {

        this.username = username;
        this.password = password;
        this.permissions = this.permissions;
    }
}

let validAccounts = Array<Accounts>(

    {username: 'Admin', password:'Admin',permissions:1},
    {username: 'Stefano', password:'Valle',permissions:0},
    {username: 'Luigi', password:'Mario',permissions:0},
    {username: 'Mauro', password:'Rainis',permissions:1}

);*/
var timeoutscanning;
var systemIsScanning = false;
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 1 : LOGIN ------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
function startApp() {
    //
    playlogin();
    //
    //
    if (timeoutscanning) {
        clearTimeout(timeoutscanning);
    }
    //
    systemIsScanning = false;
    //
    //     $('#all').css("background-image", "url(img/loginbg.jpg)");
    //
    document.getElementById('all').classList.remove('opacity1-500');
    document.getElementById('all').classList.add('opacity0');
    //
    //
    document.getElementById('all').innerHTML =
        '    <div class="loginangus" onclick="afterLogin()"></div>' +
            '    <div id="loginemptyspacefirst" class="verticalemptyspace" style="height: 4.5%"></div>' +
            '        <div id="divtextareauser" class="divtextareapro flexclass whiteboxshadow" id="divtextareapro1">' +
            '            <input id="textareauser" class="textareapro flexclass p120 normalplaceholder" type="text" name="user" placeholder="Email"><p></p>' +
            '        </div>' +
            '        <div class="verticalemptyspace" style="height: 5%"></div>' +
            '        <div id="divtextareapassword" class="divtextareapro flexclass whiteboxshadow" id="divtextareapro2">' +
            '            <div class="horizontalemptyspace" style="width: 15%"></div>' +
            '            <input id="textareapassword" class="textareapro flexclass p120 normalplaceholder" type="password" name="psw" placeholder="Password"><p></p>' +
            '            <div class="horizontalemptyspace" style="width: 5%"></div>' +
            '            <div id="showhidepassword" class="showhidepassword flexclass"><img class="showhidepasswordimg" src="img/eye.png"/></div>' +
            '        </div>' +
            '        <div id="loginemptyspacelast" class="verticalemptyspace" style="height: 10%"></div>' +
            '        <div id="divloginpro" class="divloginpro flexclass boxshadowinsetskyblue">' +
            '               <input id="loginpro" class="loginpro flexclass p120" type="submit" name="login" value="LOGIN"><p></p>' +
            '        </div>' +
            '        <div class="fingerprintcontainer flexclass">' +
            '                <img id="fingerprintimg" class="fingerprintimg" src="img/fingerprint.png"/>' +
            '        </div>' +
            '        <div class="blackbar flexclass noneclass"></div>';
    // I valori per il loginemptyspacefirst sarebbe 6%  modificati perchè tastiera buggata
    //
    //Cambia la grandezza del font se si inseriscono più caratteri
    $('#textareauser').keypress(function () {
        // @ts-ignore
        var textLength = $(this).val().length;
        if (textLength < 20) {
            // Do noting
        }
        else if (textLength < 30) {
            $(this).css('font-size', '85%');
        }
        else if (textLength > 30) {
            $(this).css('font-size', '70%');
        }
    });
    //
    setTimeout(function () {
        document.getElementById('all').classList.remove('opacity0');
        document.getElementById('all').classList.add('opacity1-500');
    }, 100);
}
/*function firebaseAuth(number) { // test Auth


    if (number == 1) {

        cordova.plugins.firebase.auth.signInWithEmailAndPassword("adminpro@admin.com", "adminpro").then(function(userInfo) {
            alert('Admin loggato correttamente');
        });

    }

    else {

        cordova.plugins.firebase.auth.signInWithEmailAndPassword("Aragorn666@gondor.com", "Gandalfsucklolxoxo").then(function(userInfo) {
            alert('Admin loggato correttamente');
        });

    }

}*/
var globalImplantAccess = true; // Usando Firebase non c'è piu distinzione tra utenti Admin e Normali, per ora l'accesso a tutti gli impianti rimane True SEMPRE
$(document).on('click', '#divloginpro', function () {
    var username = $("#textareauser").val();
    var password = $("#textareapassword").val();
    //@ts-ignore
    document.getElementById("loginpro").value = "VERIFYING..";
    cordova.plugins.firebase.auth.signInWithEmailAndPassword(username, password).then(function (userInfo) {
        console.log(userInfo);
        successmp3.load();
        successmp3.play();
        afterLogin();
    }, function (error) {
        vibrateSingle();
        errormp3.load();
        errormp3.play();
        //@ts-ignore
        document.getElementById("loginpro").value = "LOGIN";
        setTimeout(function () {
            alert('Email or Password invalid');
        }, 100);
    });
    /*let usernameIsValid:boolean = false;

    let passwordValid:boolean = false;


    for (let i=0; i < validAccounts.length; i++ ) {

        if(validAccounts[i].username == username) {

            usernameIsValid = true;

            if (validAccounts[i].password == password) {

                passwordValid = true;

                if (validAccounts[i].permissions > 0 ) {
                    globalImplantAccess = true;
                }
            }
        }

    }

    switch (usernameIsValid) {

        case true:

            if (passwordValid == true) {

                successmp3.load();
                successmp3.play();

                afterLogin();
            }

            else {

                errormp3.load();
                errormp3.play();

                document.getElementById('divtextareapassword').classList.remove('whiteboxshadow');
                document.getElementById('divtextareapassword').classList.add('redboxshadow');

                document.getElementById('textareapassword').classList.remove('normalplaceholder');
                document.getElementById('textareapassword').classList.add('redplaceholder');

                $('#textareapassword').val('');
                $('#textareapassword').attr('placeholder', "Invalid Password");

            }

            break;

        case false:

            errormp3.load();
            errormp3.play();

            vibrateSingle();

            document.getElementById('divtextareauser').classList.remove('whiteboxshadow');
            document.getElementById('divtextareauser').classList.add('redboxshadow');

            document.getElementById('textareauser').classList.remove('normalplaceholder');
            document.getElementById('textareauser').classList.add('redplaceholder');

            $('#textareauser').val('');
            $('#textareauser').attr('placeholder', "Invalid Account");

            break;
    }*/
});
function clearEverything() {
    document.getElementById('divtextareapassword').classList.remove('redboxshadow');
    document.getElementById('divtextareapassword').classList.add('whiteboxshadow');
    document.getElementById('textareapassword').classList.remove('redplaceholder');
    document.getElementById('textareapassword').classList.add('normalplaceholder');
    $('#textareapassword').attr('placeholder', "Password");
    document.getElementById('divtextareauser').classList.remove('redboxshadow');
    document.getElementById('divtextareauser').classList.add('whiteboxshadow');
    document.getElementById('textareauser').classList.remove('redplaceholder');
    document.getElementById('textareauser').classList.add('normalplaceholder');
    $('#textareauser').attr('placeholder', "Email");
}
/*function keyboardResizeScreen() {

    $('.loginangus').css("height", "20%");
    $('#loginemptyspacefirst').css("height", "2%");
    $('#loginemptyspacelast').css("height", "5%");

}*/
$(document).on('focus', '#textareauser', function () {
    clearEverything();
});
$(document).on('focus', '#textareapassword', function () {
    clearEverything();
});
$(document).on('click', '#showhidepassword', function () {
    var currentOpacity = $('.showhidepasswordimg').css('opacity'); // Faccio any cosi non mi da errori strani
    var textareapassword = document.getElementById('textareapassword'); // Mi tocca fare cosi (dare any a una variabile) quasi sempre perchè TS da errori
    if (currentOpacity == 0.3) {
        $(".showhidepasswordimg").css({ opacity: 1 });
        textareapassword.type = 'text';
        //document.getElementById("textareapassword").focus();
    }
    else {
        $(".showhidepasswordimg").css({ opacity: 0.3 });
        textareapassword.type = 'password';
        //document.getElementById("textareapassword").focus();
    }
});
var longpress;
var fingerColor = "neutral";
var timeoutpressing;
$(document).on('touchstart', '#fingerprintimg', function () {
    /*longpress = true;

    //$("#fingerprintimg").attr("src", "img/fingerprintactive.png");
    $("#fingerprintimg").attr("src", "img/fingerprintgreen.png");

    fingerColor = "neutral";

    techeffectmp3.load();
    techeffectmp3.play();


    timeoutpressing = setTimeout(function () {

        if (longpress) {

            let autorizzazione = Math.floor(Math.random() * 100);

            if (autorizzazione >= 50) {

                vibrateDouble();

                $("#fingerprintimg").attr("src", "img/fingerprintgreen.png");
                fingerColor = "green";

                successmp3.load();
                successmp3.play();


            }

            else {

                vibrateSingle();

                $("#fingerprintimg").attr("src", "img/fingerprintred.png");

                fingerColor = "red";

                errormp3.load();
                errormp3.play();

            }
        }

    }, 3000);

});

$(document).on('touchend','#fingerprintimg',function () {

techeffectmp3.pause();
techeffectmp3.currentTime = 0;

if (timeoutpressing) {
    clearTimeout(timeoutpressing);
}

 switch (fingerColor) {

     case "green":
         afterLogin();
         break;

     case "red":
         break;

     default:

         $("#fingerprintimg").attr("src","img/fingerprint.png");
         break;
 }

 longpress=false;*/
    longpress = true;
    $("#fingerprintimg").attr("src", "img/fingerprintgreen.png");
    techeffectmp3.load();
    techeffectmp3.play();
    timeoutpressing = setTimeout(function () {
        if (longpress) {
            fingerPrint();
            techeffectmp3.pause();
        }
    }, 1350);
});
$(document).on('touchend', '#fingerprintimg', function () {
    techeffectmp3.pause();
    techeffectmp3.currentTime = 0;
    if (timeoutpressing) {
        clearTimeout(timeoutpressing);
    }
    longpress = false;
    $("#fingerprintimg").attr("src", "img/fingerprint.png");
});
function fingerPrint() {
    Fingerprint.show({
        disableBackup: true,
        clientId: 'FingerprintUser',
        clientSecret: "password" //Only necessary for Android
    }, successCallback, errorCallback);
    function successCallback() {
        $("#fingerprintimg").attr("src", "img/fingerprintgreen.png");
        vibrateDouble();
        techeffectmp3.play();
        successmp3.load();
        successmp3.play();
        afterLogin();
    }
    function errorCallback(err) {
        vibrateSingle();
        $("#fingerprintimg").attr("src", "img/fingerprintred.png");
        techeffectmp3.pause();
        techeffectmp3.currentTime = 0;
    }
}
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 2 : PROGRESS BAR -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
function afterLogin() {
    document.getElementById('all').innerHTML =
        '<div class="loginangus"></div>' +
            '<div class="verticalemptyspace" style="height: 15%"></div>' +
            '<div id="systemloading" class="flexclass genericdiv"><p class="systemloading" id="loading">SYSTEM LOADING..</p></div>' +
            '<div class="verticalemptyspace" style="height: 6%"></div>' +
            '<div id="myProgress">' +
            '  <div id="myBar"></div>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 15%"></div>' +
            '<div id="systemloading2" class="flexclass genericdiv"><p id ="systemloading2p" class="p120" id="loading">Loading: Angus / Init</p></div>' +
            '<div id="enterapp" class="divloginpro flexclass boxshadowinsetskyblue noneclass opacity0">' +
            '<p class="p120 skewbalance" style="color: white">ENTER</p>' +
            '</div>';
    move();
}
function move() {
    var bar = document.getElementById("myBar");
    var width = 0.5;
    //let width = 100;
    var id = setInterval(frame, 25);
    function frame() {
        if (width >= 100) {
            document.getElementById('loading').innerHTML = 'SYSTEM LOADED';
            //successmp3.load();
            //successmp3.play();
            /*document.getElementById('enterapp').classList.remove('noneclass');

            setTimeout(function () {
                document.getElementById('enterapp').classList.remove('opacity0');
                document.getElementById('enterapp').classList.add('opacity1-500');

            }, 5);*/
            clearInterval(id);
        }
        else {
            width += 0.5;
            bar.style.width = width + '%';
        }
    }
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Implant';
    }, 400);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Washing';
    }, 800);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Pre-Wash';
    }, 1200);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Drying';
    }, 1600);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Warehouse';
    }, 2000);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Engine 1';
    }, 2400);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Engine 2';
    }, 2800);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Charts';
    }, 3200);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Influx';
    }, 3600);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Settings';
    }, 4000);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Loading: Angus/Info';
    }, 4500);
    setTimeout(function () {
        document.getElementById('systemloading2p').innerHTML = 'Completed';
        successmp3.load();
        successmp3.play();
        setTimeout(function () {
            $("#enterapp").click();
        }, 1000);
    }, 5000);
}
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 3 : CREATE PAGE + HOME PAGE ------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
$(document).on('click', '#enterapp', function () {
    loginmusicmp3.pause();
    loginmusicmp3.currentTime = 0;
    //   $('#all').css("background-image", "url(img/appbg.jpg)");
    document.getElementById('all').classList.remove('opacity1-500');
    document.getElementById('all').classList.add('opacity0');
    document.getElementById('all').innerHTML =
        '<div id="top" class="top flexclass"></div>' +
            '<div id="center" class="centerapp"></div>' +
            '<div id="bottom" class="bottom">' +
            '<div id="logout" class="bottomblock flexclass"><img class="iconbottom" src="img/logout.png"/></div>' +
            '<div onclick="homePage()" id="home" class="bottomblock flexclass"><img class="iconbottom" src="img/homepage.png"/></div>' +
            '<div onclick="dashboard()" id="dashboard" class="bottomblock flexclass"><img class="iconbottom" src="img/dashboard.png"/></div>' +
            '<div onclick="options()" id="options" class="bottomblock flexclass"><img class="iconbottom" src="img/options.png"/></div>' +
            '<div id="info" class="bottomblock flexclass"><img class="iconbottom" src="img/info.png"/></div>' +
            '</div>';
    homePage();
    setTimeout(function () {
        document.getElementById('all').classList.remove('opacity0');
        document.getElementById('all').classList.add('opacity1-500');
    }, 100);
});
function homePage() {
    if (systemIsScanning == true) {
        scanError();
    }
    document.getElementById('top').innerHTML =
        '<p class="p200">HOME MENU</p>';
    document.getElementById('center').innerHTML =
        '<div id="scan" class="flexclass scan"><img onclick="startScan()" id="singlescan" class="iconscan" src="img/singlescan.png"/></div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div onclick="dashboard()" class="buttonapp flexclass boxshadowinsetskyblue">' +
            '<p class="p120 skewbalance paddingfix" style="color: white">DASHBOARD</p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 7%"></div>' +
            '<div onclick="options()" class="buttonapp flexclass boxshadowinsetskyblue">' +
            '<p class="p120 skewbalance paddingfix" style="color: white">SETTINGS</p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 7%"></div>' +
            '<div id="exit" class="buttonapp flexclass boxshadowinsetskyblue">' +
            '<p class="p120 skewbalance paddingfix" style="color: white">EXIT</p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 7%"></div>';
    $('#home').css("background-color", "#03A9F4");
    $('#dashboard').css("background-color", "#0288D1");
    $('#options').css("background-color", "#0288D1");
    $('#info').css("background-color", "#0288D1");
}
function startScan() {
    ble.isEnabled(function () {
        vibrateSingle();
        scanning();
    }, function () {
        if (confirm("The Scan System requires Bluetooth to operate. Do you want to turn Bluetooth on?")) {
            cordova.plugins.BluetoothStatus.enableBT();
            vibrateSingle();
            scanning();
        }
    });
}
function scanning() {
    systemIsScanning = true;
    document.getElementById('top').innerHTML =
        '<p class="p200">SCANNING</p>';
    document.getElementById('center').innerHTML =
        '<div id="scan" class="flexclass scan"><img onclick="cancelScan()" id="scanactive" class="iconscan iconscannopulse" src="img/scanapng.png"/></div>' +
            '<div id="results" class="text flexclass"><p class="p120 textshadowlightskyblue" style="color: #03A9F4">Sensors Detected:</p></div>' +
            '<div class="lds-facebook flexclass"><div></div><div></div><div></div></div>';
    timeoutscanning = setTimeout(function () {
        cancelScan();
    }, 10000);
}
function cancelScan() {
    scanError();
    homePage();
}
function scanError() {
    if (timeoutscanning) {
        clearTimeout(timeoutscanning);
        errormp3.load();
        errormp3.play();
        vibrateSingle();
    }
    systemIsScanning = false;
}
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 4 : DASHBOARD --------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
function dashboard() {
    if (systemIsScanning == true) {
        scanError();
    }
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">TOTAL CONSUMPTION</p>';
    //  if (globalImplantAccess == true) {
    jQuery(function () {
        jQuery('#implant').click();
    });
    //  }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    document.getElementById('center').innerHTML =
        '<div class="verticalemptyspace" style="height: 0%"></div>' +
            '<div id="graphs-container" class="grafico"></div>' +
            '<div class="verticalemptyspace" style="height: 0%"></div>' +
            '<div id="empty1" class="containerinflux global1">' +
            '<div style="transform: none;" class="buttonapp flexclass boxshadowinsetskyblue">' +
            '<div onclick="stoccaggio()" class="frecciasx sx1 hiddenclass"></div><p class="p100 paddingfix specialp dashboardbottone1" style="color: white">IMPLANT</p><div onclick="lavaggio()" class="frecciadx dx1"></div>' +
            '</div>' +
            '<div id="empty2" class="containerinflux global2 hiddenclass">' +
            '<div class="verticalemptyspace" style="height: 4%"></div>' +
            '<div style="transform: none;" class="buttonapp flexclass boxshadowinsetskyblue">' +
            '<div onclick="nulla()" class="frecciasx sx2"></div><p class="p100 paddingfix specialp dashboardbottone2" style="color: white"></p><div class="frecciadx dx2"></div>' +
            '</div>' +
            '<div id="empty3" onclick="componentCurrent(this.id)" class="containerinflux global3 hiddenclass">' +
            '<div class="verticalemptyspace" style="height: 4%"></div>' +
            '<div style="transform: none;" class="buttonapp flexclass greenbutton boxshadowinsetskyblue">' +
            '<div onclick="contatoreL()" class="frecciasx sx3"></div><p class="p100 paddingfix specialp dashboardbottone3" style="color: white"></p><div class="frecciadx dx3"></div>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 4%"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
    $('#implant').css('pointer-events', 'none');
    $('#home').css("background-color", "#0288D1");
    $('#dashboard').css("background-color", "#03A9F4");
    $('#options').css("background-color", "#0288D1");
    $('#info').css("background-color", "#0288D1");
}
/* ---------------------------------------------------------------------------------------------------------------------
/* ------------------- SEZIONE LAVAGGIO ------------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------------------------------------------*/
function lavaggio() {
    $("#graphs-container").css("background-image", "none");
    // ---------- Apro le nuove sezioni
    $('.global2').removeClass('hiddenclass');
    $('.global3').removeClass('hiddenclass');
    // ----------- Cambio i nomi visualizzati
    document.getElementsByClassName("dashboardbottone1")[0].innerHTML =
        "WASHING SECTION";
    document.getElementsByClassName("dashboardbottone2")[0].innerHTML =
        "PREWASH";
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "PUMP";
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">PREWASH PUMP</p>';
    //-----------  Cambio gli ID per i dati che voglio ottenere
    $(".global1").prop('id', 'Lavaggio');
    $(".global2").prop('id', 'prelavaggio');
    $(".global3").prop('id', 'pompaP');
    //----------- Clicco
    jQuery(function () {
        jQuery('#pompaP').click();
    });
    //----------- Cambio gli Onclick + disabilito le freccie se all'inizio o alla fine
    // 1
    $('.sx1').removeClass('hiddenclass');
    $(".sx1").attr("onclick", "dashboard()");
    $('.dx1').removeClass('hiddenclass');
    $(".dx1").attr("onclick", "preTrattamento()");
    // 2
    $('.sx2').addClass('hiddenclass');
    $('.dx2').removeClass('hiddenclass');
    $(".dx2").attr("onclick", "lavaggioLavaggio()");
    // 3
    $('.sx3').addClass('hiddenclass');
    $('.dx3').removeClass('hiddenclass');
    $(".dx3").attr("onclick", "contatoreAcquaPreLavaggio()");
}
function contatoreAcquaPreLavaggio() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "COUNTER";
    $(".global3").prop('id', 'contatoreP');
    jQuery(function () {
        jQuery('#contatoreP').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">PREWASH COUNTER</p>';
    $('.sx3').removeClass('hiddenclass');
    $(".sx3").attr("onclick", "lavaggio()");
    $('.dx3').addClass('hiddenclass');
}
function lavaggioLavaggio() {
    document.getElementsByClassName("dashboardbottone2")[0].innerHTML =
        "WASHING";
    $(".global2").prop('id', 'lavaggio');
    // 2
    $('.sx2').removeClass('hiddenclass');
    $(".sx2").attr("onclick", "lavaggio()");
    $('.dx2').removeClass('hiddenclass');
    $(".dx2").attr("onclick", "asciugatura()");
    pompaLavaggio(); // carico il primo sensore
}
function contatoreAcquaLavaggio() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "COUNTER";
    $(".global3").prop('id', 'contatoreL');
    jQuery(function () {
        jQuery('#contatoreL').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">WASHING COUNTER</p>';
    $('.sx3').removeClass('hiddenclass');
    $(".sx3").attr("onclick", "pompaLavaggio()"); // In questo caso non posso fare il back a lavaggio(), devo mantenere la sezione
    $('.dx3').addClass('hiddenclass');
}
function pompaLavaggio() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "PUMP";
    $(".global3").prop('id', 'pompaL');
    jQuery(function () {
        jQuery('#pompaL').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">WASHING PUMP</p>';
    $('.sx3').addClass('hiddenclass');
    $('.dx3').removeClass('hiddenclass');
    $(".dx3").attr("onclick", "contatoreAcquaLavaggio()");
}
function asciugatura() {
    document.getElementsByClassName("dashboardbottone2")[0].innerHTML =
        "DRYING";
    $(".global2").prop('id', 'asciugatura');
    // 2
    $('.sx2').removeClass('hiddenclass');
    $(".sx2").attr("onclick", "lavaggioLavaggio()");
    $('.dx2').addClass('hiddenclass');
    ventilatoreAsciugatura(); // carico il primo sensore
}
function ventilatoreAsciugatura() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "FAN";
    $(".global3").prop('id', 'ventilatoreA');
    jQuery(function () {
        jQuery('#ventilatoreA').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">DRYING FAN</p>';
    $('.sx3').addClass('hiddenclass');
    $('.dx3').removeClass('hiddenclass');
    $(".dx3").attr("onclick", "contatoreAsciugatura()");
}
function contatoreAsciugatura() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "COUNTER";
    $(".global3").prop('id', 'contatoreA');
    jQuery(function () {
        jQuery('#contatoreA').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">DRYING COUNTER</p>';
    $('.sx3').removeClass('hiddenclass');
    $(".sx3").attr("onclick", "ventilatoreAsciugatura()"); // In questo caso non posso fare il back a lavaggio(), devo mantenere la sezione
    $('.dx3').addClass('hiddenclass');
}
/* ---------------------------------------------------------------------------------------------------------------------
/* ------------------- SEZIONE PRE TRATTAMENTO -----------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------------------------------------------*/
function preTrattamento() {
    // Blocco momentaneamentr il grafico
    document.getElementById('graphs-container').innerHTML = "";
    $("#graphs-container").css("background-image", "url('img/wip.png')");
    // ---------- Chiudo le nuove sezioni (questa sezione è vuota)
    $('.global2').addClass('hiddenclass');
    $('.global3').addClass('hiddenclass');
    $('.global3').removeClass('visibleclass'); // senno eredita hidden
    // ----------- Cambio i nomi visualizzati
    document.getElementsByClassName("dashboardbottone1")[0].innerHTML =
        "PRE-TREATMENT";
    document.getElementsByClassName("dashboardbottone2")[0].innerHTML =
        "PRE-TREAT TANK";
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "LEVEL SENSOR";
    //-----------  Cambio gli ID per i dati che voglio ottenere
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">PRE - TREATMENT</p>';
    $(".global1").prop('id', 'PreTrattamento');
    $(".global2").prop('id', 'vascaPreTrattamento');
    $(".global3").prop('id', 'sensoreLivello');
    //----------- Clicco
    /*jQuery(function(){
        jQuery('#sensoreLivello').click();
    });*/
    //----------- Cambio gli Onclick + disabilito le freccie se all'inizio o alla fine
    // 1
    $('.sx1').removeClass('hiddenclass');
    $(".sx1").attr("onclick", "lavaggio()");
    $('.dx1').removeClass('hiddenclass');
    $(".dx1").attr("onclick", "stoccaggio()");
    // 2
    $('.sx2').addClass('hiddenclass');
    $('.dx2').removeClass('hiddenclass');
    $(".dx2").attr("onclick", "vascaPrimer()");
    // 3
    $('.sx3').addClass('hiddenclass');
    $('.dx3').removeClass('hiddenclass');
    $(".dx3").attr("onclick", "sensorePH()");
}
/* --------------------------------------------------------------------------------------------------------------------
/* ------------------- SEZIONE STOCCAGGIO ----------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------------------------------------------*/
function stoccaggio() {
    $("#graphs-container").css("background-image", "none");
    // ---------- Chiudo le nuove sezioni (questa sezione è vuota)
    $('.global2').addClass('hiddenclass');
    $('.global3').removeClass('hiddenclass');
    $('.global3').addClass('visibleclass'); // senno eredita hidden
    // ----------- Cambio i nomi visualizzati
    document.getElementsByClassName("dashboardbottone1")[0].innerHTML =
        "WAREHOUSE";
    document.getElementsByClassName("dashboardbottone2")[0].innerHTML =
        "STACKER";
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "ENGINE 1";
    //-----------  Cambio gli ID per i dati che voglio ottenere
    $(".global1").prop('id', 'Stoccaggio');
    $(".global2").prop('id', 'impilatore');
    $(".global3").prop('id', 'motore1I');
    //----------- Clicco
    jQuery(function () {
        jQuery('#motore1I').click();
    });
    //----------- Cambio gli Onclick + disabilito le freccie se all'inizio o alla fine
    // 1
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">WAREHOUSE - ENGINE 1</p>';
    $('.sx1').removeClass('hiddenclass');
    $(".sx1").attr("onclick", "preTrattamento()");
    $('.dx1').addClass('hiddenclass');
    // 2
    $('.sx2').addClass('hiddenclass'); // vuoto
    $('.dx2').addClass('hiddenclass');
    // 3
    $('.sx3').addClass('hiddenclass');
    $('.dx3').removeClass('hiddenclass');
    $(".dx3").attr("onclick", "motore2()");
}
function motore2() {
    document.getElementsByClassName("dashboardbottone3")[0].innerHTML =
        "ENGINE 2";
    $(".global3").prop('id', 'motore2I');
    jQuery(function () {
        jQuery('#motore2I').click();
    });
    // 3
    document.getElementById('top').innerHTML =
        '<p class="p120 white" id="implant" onclick="globalCurrent()">WAREHOUSE - ENGINE 2</p>';
    $('.sx3').removeClass('hiddenclass');
    $(".sx3").attr("onclick", "stoccaggio()");
    $('.dx3').addClass('hiddenclass');
}
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 5 : OPTION / SETTINGS ------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
function musicOffDisplay() {
    $('#updatemusic').css("background-color", "grey");
    $('#updatemusic').css("border-bottom", "2px solid black");
    $('#updatemusic').css("opacity", "0.5");
    document.getElementById('musicstatus').innerHTML =
        '<span style="color:lightgrey">MUSIC: OFF</span>';
}
function soundOffDisplay() {
    $('#updatesound').css("background-color", "grey");
    $('#updatesound').css("border-bottom", "2px solid black");
    $('#updatesound').css("opacity", "0.5");
    document.getElementById('soundstatus').innerHTML =
        '<span style="color:lightgrey">SOUNDS: OFF</span>';
}
function vibrationOffDisplay() {
    $('#updatevibration').css("background-color", "grey");
    $('#updatevibration').css("border-bottom", "2px solid black");
    $('#updatevibration').css("opacity", "0.5");
    document.getElementById('vibrationstatus').innerHTML =
        '<span style="color:lightgrey">VIBRATION: OFF</span>';
}
function options() {
    if (systemIsScanning == true) {
        scanError();
    }
    document.getElementById('top').innerHTML =
        '<p class="p200">SETTINGS</p>';
    document.getElementById('center').innerHTML =
        // suoni
        '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div class="text flexclass" style="height: 5%"><p class="p120 textshadowlightskyblue">AUDIO AND VIBRATION:</p></div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div id="updatemusic" class="buttonappSettings flexclass boxshadowinsetskyblue">' +
            '<p id="musicstatus" class="p120 skewbalance paddingfix" >MUSIC: <span style="color:greenyellow">ON</span></p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div id="updatesound" class=" buttonappSettings flexclass boxshadowinsetskyblue">' +
            '<p id="soundstatus" class="p120 skewbalance paddingfix">SOUNDS: <span style="color:greenyellow">ON</span></p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div id="updatevibration" class="buttonappSettings flexclass boxshadowinsetskyblue">' +
            '<p id="vibrationstatus" class="p120 skewbalance paddingfix">VIBRATION: <span style="color:greenyellow">ON</span></p>' +
            '</div>' +
            // language
            '<div class="verticalemptyspace" style="height: 10%"></div>' +
            '<div class="text flexclass" style="height: 5%"><p class="p120 textshadowlightskyblue">UI LANGUAGE:</p></div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div id="english" class="buttonapp flexclass">' +
            '<p class="p120 skewbalance paddingfix" style="color: white">ENGLISH</p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>' +
            '<div id="italian" class="buttonapp flexclass boxshadowinsetskyblue disabled">' +
            '<p class="p120 skewbalance paddingfix" style="color: lightgrey">ITALIAN</p>' +
            '</div>' +
            '<div class="verticalemptyspace" style="height: 5%"></div>';
    if (musicActive == 'false') {
        musicOffDisplay();
    }
    if (soundActive == 'false') {
        soundOffDisplay();
    }
    if (vibrationActive == 'false') {
        vibrationOffDisplay();
    }
    $('#home').css("background-color", "#0288D1");
    $('#dashboard').css("background-color", "#0288D1");
    $('#options').css("background-color", "#03A9F4");
    $('#info').css("background-color", "#0288D1");
}
$(document).on('click', '#italian', function () {
    errormp3.load();
    errormp3.play();
    vibrateSingle();
    setTimeout(function () {
        alert("Lingua IT non disponibile nella versione 1.0.0 dell' Applicativo");
    }, 100);
});
$(document).on('click', '#english', function () {
    successmp3.load();
    successmp3.play();
});
// UPDATE Music
$(document).on('click', '#updatemusic', function () {
    if (musicActive == 'false') {
        activeAllMusic();
        $('#updatemusic').css("background-color", "#039BE5");
        $('#updatemusic').css("border-bottom", "2px solid #01579B");
        $('#updatemusic').css("opacity", "1");
        document.getElementById('musicstatus').innerHTML =
            'MUSIC: <span style="color:greenyellow">ON</span>';
        musicActive = true;
        musicActive = localStorage.setItem('musicActive', musicActive);
        musicActive = localStorage.getItem('musicActive');
        setTimeout(function () {
            //successmp3.load();
            //successmp3.play();
        }, 100);
    }
    else {
        musicOffDisplay();
        musicActive = false;
        musicActive = localStorage.setItem('musicActive', musicActive);
        musicActive = localStorage.getItem('musicActive');
        muteAllMusic();
    }
});
// UPDATE sound
$(document).on('click', '#updatesound', function () {
    if (soundActive == 'false') {
        activeAllSound();
        $('#updatesound').css("background-color", "#039BE5");
        $('#updatesound').css("border-bottom", "2px solid #01579B");
        $('#updatesound').css("opacity", "1");
        document.getElementById('soundstatus').innerHTML =
            'SOUNDS: <span style="color:greenyellow">ON</span>';
        soundActive = true;
        soundActive = localStorage.setItem('soundActive', soundActive);
        soundActive = localStorage.getItem('soundActive');
        setTimeout(function () {
            //successmp3.load();
            //successmp3.play();
        }, 100);
    }
    else {
        soundOffDisplay();
        soundActive = false;
        soundActive = localStorage.setItem('soundActive', soundActive);
        soundActive = localStorage.getItem('soundActive');
        muteAllSound();
    }
});
// UPDATE VIBRATION
$(document).on('click', '#updatevibration', function () {
    if (vibrationActive == 'false') {
        activeAllVibration();
        $('#updatevibration').css("background-color", "#039BE5");
        $('#updatevibration').css("border-bottom", "2px solid #01579B");
        $('#updatevibration').css("opacity", "1");
        document.getElementById('vibrationstatus').innerHTML =
            'VIBRATION: <span style="color:greenyellow">ON</span>';
        vibrationActive = true;
        vibrationActive = localStorage.setItem('vibrationActive', vibrationActive);
        vibrationActive = localStorage.getItem('vibrationActive');
        setTimeout(function () {
            //successmp3.load();
            //successmp3.play();
            vibrateSingle();
        }, 100);
    }
    else {
        vibrationOffDisplay();
        vibrationActive = false;
        vibrationActive = localStorage.setItem('vibrationActive', vibrationActive);
        vibrationActive = localStorage.getItem('vibrationActive');
        muteAllVibration();
    }
});
function activeAllVibration() {
    vibrationSingle = 500;
    vibrationTwice = 300;
}
function muteAllVibration() {
    vibrationSingle = 0;
    vibrationTwice = 0;
}
function muteAllMusic() {
    for (var i = 0; i < musicArray.length; i++) {
        musicArray[i].volume = 0;
    }
}
function muteAllSound() {
    for (var i = 0; i < soundArray.length; i++) {
        soundArray[i].volume = 0;
    }
}
function activeAllMusic() {
    for (var i = 0; i < musicArray.length; i++) {
        musicArray[i].volume = 1;
    }
}
function activeAllSound() {
    for (var i = 0; i < soundArray.length; i++) {
        soundArray[i].volume = 1;
    }
}
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ SCHERMATA 6 : INFO -------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
$(document).on('click', '#info', function () {
    if (systemIsScanning == true) {
        scanError();
    }
    document.getElementById('top').innerHTML =
        '<p class="p200">INFO</p>';
    document.getElementById('center').innerHTML =
        '<div class="verticalemptyspace" style="height: 10%"></div>' +
            '<div onclick="activateNotification()" class="text flexclass" style="height: 5%"><p class="p120 textshadowlightskyblue" style="color:#01579B font-weight: bold">ANGUS SYSTEM</p></div>' +
            '<div class="text flexclass"><p class="p100">Version: 1.0.0</p></div>' +
            '<div class="text flexclass" style="height: 30%;background-image: url(img/GMlogo.png);background-size: contain;background-position: center;background-repeat: no-repeat"></div>' +
            // SI tutto inline il background image perchè l'ultima cosa che manca quindi pace ok?
            '<div class="text flexclass"><p class="p100">@2018 Growing Mobile Inc.</p></div>' +
            '<div class="text flexclass" style="height: 1%"><p class="p100">All Rights Reserved</p></div>' +
            '<div class="text flexclass" style="height: 34%"><p class="p100"><a style="color:#01579B" href="https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/36573" target="_blank">TERMINI E PRIVACY</a></p></div>';
    $('#home').css("background-color", "#0288D1");
    $('#dashboard').css("background-color", "#0288D1");
    $('#options').css("background-color", "#0288D1");
    $('#info').css("background-color", "#03A9F4");
});
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------ LOGOUT + EXIT ------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
$(document).on('click', '#exit', function () {
    if (confirm("Do you want to exit Angus?")) {
        navigator.app.exitApp();
    }
});
$(document).on('click', '#logout', function () {
    if (confirm("Do you want to Log Out?")) {
        logoutmp3.load();
        logoutmp3.play();
        startApp();
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
});
// Ovviamente queste Notifiche (locali) sono solo a scopo dimostrativo. Partono dopo 1 min al click.
// Ipoteticamente ci dovrebbe essere un SetInterval sotto che gira ogni 1-2 min che fa il get di tutto il database di Influx
// e se alcuni risultati sono più alti di una certa soglia manda la notifica
// Ovviamente la cosa migliore sarebbe comunque fare girare questo controllo lato node js, per poi mandarla a tutti i cellulari tramite Firebase
function activateNotification() {
    cordova.plugins.notification.local.schedule({
        id: Math.floor(Math.random() * 1000),
        title: 'High Consumption Alert',
        text: 'Warning: Critical ( Level 7 ) \n\nTotal Implant Consumption Reached 20k',
        actions: [
            { id: 'yes', title: 'Check' },
            { id: 'no', title: 'Close' }
        ],
        trigger: { in: 1, unit: 'minute' },
        smallIcon: 'res://icon.png',
        icon: 'res://warning.png',
        vibrate: true,
        launch: true,
        foreground: true,
        wakeup: true
    });
}
// ---------------------------------------------------------------------------------------------------------------------
// -------------- Rendo Disponibili le funzioni base di Cordova con Device Ready ---------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    /* if (window.StatusBar) {
         window.StatusBar.styleBlackTranslucent(); // Fixa l'errore della status bar dopo l'apertura della tastiera

     }
 */
    window.StatusBar.styleBlackTranslucent();
    AndroidFullScreen.showUnderSystemUI(); // Questa combinazione mi fa sbuggare la tastiera
    AndroidFullScreen.immersiveMode(); // Mette in full screen
}
var AndroidFullScreen;
var Fingerprint;
window.addEventListener('keyboardDidHide', function () {
    $('.loginangus').removeClass('noneclass');
    $('.fingerprintcontainer').removeClass('noneclass');
    $('.blackbar').addClass('noneclass');
});
window.addEventListener('keyboardDidShow', function () {
    $('.loginangus').addClass('noneclass');
    $('.fingerprintcontainer').addClass('noneclass');
    setTimeout(function () {
        $('.blackbar').removeClass('noneclass');
    }, 200);
});
function onBackKeyDown() {
    if (confirm("Do you want to exit Angus?")) {
        navigator.app.exitApp();
    }
}
function onPause() {
    for (var i = 0; i < musicArray.length; i++) {
        if (musicArray[i].currentTime > 0) {
            musicArray[i].pause();
        }
    }
}
function onResume() {
    if (musicActive != 'false') {
        for (var i = 0; i < musicArray.length; i++) {
            if (musicArray[i].currentTime > 0) {
                musicArray[i].play();
            }
        }
    }
}
function vibrateSingle() {
    navigator.vibrate(vibrationSingle);
}
function vibrateDouble() {
    navigator.vibrate([vibrationTwice, 200, vibrationTwice]);
}
startApp();
//afterLogin();
