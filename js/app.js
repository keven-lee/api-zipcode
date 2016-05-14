$(document).ready(function() {

    $("#findPostCode").click(function(event) {
        $("#success").empty();
        event.preventDefault();
        $(".alert").hide();
        var foundIt = false;

        $.ajax({
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent($('#address').val()) + "&key=AIzaSyCdePBcH1MA4Nk9NR0_47c1sZkGfYbgJ34",
            dataType: "json",
            success: processJSON,
            error: error

        });

        function error() {
            $("#fail-connect").fadeIn();
        }

        function processJSON(initial) {

            var digitsBeforeAddress = initial.results;
            for (var i = 0; i < digitsBeforeAddress.length; i++) {
                for (var x = 0; x < digitsBeforeAddress[i].address_components.length; x++) {
                    if (digitsBeforeAddress[i].address_components[x].types['0'] == "postal_code") {
                        foundIt = true;
                        $("#success").append(digitsBeforeAddress[i].address_components[x].long_name + ' ').fadeIn();
                    }
                }
            }

            if (!foundIt) {
                $("#fail-find").fadeIn();
            }


        }

    });


});