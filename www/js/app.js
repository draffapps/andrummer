function alertMe(message) {
    navigator.notification.alert(
        message,    // message
        null,       // callback
        "odd", // title
        'OK'        // buttonName
    );
}

// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
   var xsl = loadXMLDoc("assets/pics/ShadowrunSheet.xslt");
   var domParser = new DOMParser();
   var xsltProcessor = new XSLTProcessor();
   xsltProcessor.importStylesheet(xsl);

    /* --------------------------------- Event Registration -------------------------------- */

    document.addEventListener('deviceready', function () {
        if (navigator.notification && !window.alert) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                
            };
        }

        $("#fileInput").change(function(){
            displayResult($("#fileInput")[0].files[0]);
        });

        $("#loader").click(function (e){
            // alert(device.platform);
            // if (device.platform === "Android"){
            //     fileChooser.open(['.xml', '.chum5'], function (uri) {
            //         window.resolveLocalFileSystemURL("file://" + uri, function (fileEntry) {
            //             fileEntry.file(displayResult);
            //         });
            //     }, function(err){
            //         alert(err);
            //     });
            // } else {
                $("#fileInput").click();
            // }
        });        
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    function readFromFile(file, callBack){
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            callBack(fileReader.result);
        };

        fileReader.readAsText(file);
    }

    function loadXMLDoc(filename)
    {
        xhttp = new XMLHttpRequest();
        
        xhttp.open("GET", filename, false);
        xhttp.overrideMimeType('text/xml');
        try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
        // xhttp.responseType="document";
        xhttp.send(null);
        return new DOMParser().parseFromString(xhttp.response, "text/xml");
        // return xhttp.responseXML;
    }

    function clone(obj) {
        return $.extend(true, {}, obj);
    }

    function displayResult(file){
        readFromFile(file, function(result){
            var xml = (new DOMParser()).parseFromString(result, "text/xml");;//parseXml(result);
            // var nonParsedXml = clone(xml);
            if (document.implementation && document.implementation.createDocument && xsltProcessor)
            {
                try {
                    resultDocument = xsltProcessor.transformToFragment(xml, document);
                } catch(e){
                    alertMe("result error" + e);
                }

                if ( resultDocument ) {
                    document.getElementById("testBody").innerHTML = "";
                    document.getElementById("testBody").appendChild(resultDocument);
                    $(".fill100.noprint").hide();
                    $(".rowsummarybutton").hide();

                    $("[roller|='true']").each(function() {
                        $( this ).click(function() {
                            rollTest($( this ).text());
                        });
                    });

                     $("[initRoller|='true']").each(function() {
                        $( this ).click(function() {
                            rollInitative($( this ).text());
                        });
                    });
                } else {
                    alertMe("XML: " + xml);
                }
            }
        },function(e){alertMe("error2: " +e);});
    }
}());