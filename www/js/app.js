function alertMe(message, header) {
    navigator.notification.alert(
        message,    // message
        null,       // callback
        header || "odd", // title
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

        $("#rollButton").click(function(){
            navigator.notification.prompt(
                'Number of dice?',  // message
                function(results) {
                    rollTest(results.input1, 'Manual');
                },                  // callback to invoke
                'odd',            // title
                ['Ok'],             // buttonLabels
                '12'                 // defaultText
            );
        });

        $("#toggleButton").click(function(eventbutton){
            showCharacterSheet(event.target.value === "Character Sheet");
        });

        $("#loader").click(function (e){
            if (device.platform === "Android" && parseInt(device.version.charAt(0)) < 5){
                fileChooser.open(function (uri) {
                    window.resolveLocalFileSystemURL(uri, function (fileEntry) {
                        fileEntry.file(displayResult);
                    });
                }, function(err){
                    alert(err);
                });
            } else {
                $("#fileInput").click();
            }
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
            while (result.charAt(0) !== '<') {
                result = result.substring(1);
            }
            while (result.charAt(result.length-1) !== '>') {
                result = result.substring(0, result.length -1);
            }
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
                    showCharacterSheet(true);

                    $("#characterSheet").innerHTML = "";
                    $("#characterSheet").append(resultDocument);
                    $(".fill100.noprint").hide();
                    $(".rowsummarybutton").hide();

                    $("[roller|='true']").each(function() {
                        var rollData = $(this).text();
                        var rollType = this.previousElementSibling.innerHTML;
                        $( this ).click(function() {
                            rollTest(rollData, rollType);
                        });

                        $( this.previousElementSibling ).click(function() {
                            rollTest(rollData, rollType);
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

    function showCharacterSheet(showSheet) {
        if(showSheet) {
            $("#rollHistory").hide();
            $("#characterSheet").show();
            $("#toggleButton").val("Roll History");
        } else {
            $("#rollHistory").show();
            $("#characterSheet").hide();
            $("#toggleButton").val("Character Sheet");
        }
    }
}());