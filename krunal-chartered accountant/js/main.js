$(document).ready(function () {

    //form focus effect
    $(".contact-field").focusin(function () {
        $(this).parentsUntil("form").find("p").addClass("form-active");
        $(".contact-field").css("border-bottom", "1px solid #bbb");
        $(this).css("border-bottom", "1px solid #0099ff");
    });
    $(".contact-field").focusout(function () {
        $(".contact-field").each(function () {
            var checkval = $(this).val();
            if (checkval != "") {
                $(this).parentsUntil("form").find("p").css("color", "#999");
            } else {
                $(this).parentsUntil("form").find("p").removeClass("form-active");
                $(".contact-field").css("border-bottom", "1px solid #bbb");
            }
        });
    });

    //align thankyou vertically center
    var winheight = $(window).outerHeight();
    var targetheight = $(".vert-center").outerHeight();
    if (targetheight < winheight) {
        var getheightdiff = (winheight - targetheight) / 2;
        $(".vert-center").css("margin-top", getheightdiff);
    }

    ///form validation

    //for letters only
    $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-zA-Z][a-zA-Z ]+$/i.test(value);
    });

    //for email only
    $.validator.addMethod("emailtest", function (value, element) {
        return this.optional(element) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i.test(value);
    });


    $(".onlyletter").keypress(function (event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
            event.preventDefault();
        }
    });

    $("#enquiryform").validate({
        //setting rules/validations for all form fields
        rules: {
            //en-name,en-email etc are name attributes of the form fields.
            "en-name": {
                required: true,
                lettersonly: true
            },
            "en-email": {
                required: true,
                emailtest: true
            },
            "en-phone": {
                required: true,
                number: true,
                maxlength: 10,
                minlength: 10
            },
            "en-message": {
                required: true
            }
        },
        //displaying error message on wrong entry
        messages: {
            "en-name": {
                required: "You must enter your full name",
                lettersonly: "must enter character only"
            },
            "en-email": {
                required: "You must enter your email address",
                emailtest: " Please enter a valid email address"
            },
            "en-phone": {
                required: "You must enter your phone",
                number: "must contain digits only",
                maxlength: "Phone Number must contain 10 digits",
                minlength: "Phone Number must contain 10 digits"
            },

            "en-message": {
                required: "You must enter your message"
            }
        },
        //sending data to mailer function
        submitHandler: function (form) {
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        $("#enquiryform")[0].reset();
                        window.location.href = "thank-you.html";
                    } else {
                        $("#enquiryform")[0].reset();
                        $('.error-msg').html(response);
                    }
                }
            });
        }

    });

});