/*
 *
 * Project Name: Manten - Style 2
 * URL: http://templatesuper.com
 * Version: 1.0
 *
 * Author: Adnan
 *
 */

//HEADER SLIDER
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: true,
        directionNav: true
    });
});

//SMOOTHSCROLL
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing');

        $('.navbar-collapse.collapse').removeClass("in");
    });
});

//POST to function
$(function() {
    $("#rsvpform").submit(function(e) {
        $('#spinner').fadeIn().show();

        var objData = {
            password: $("#password").val(),
            name: $("#name").val(),
            attending: $("#attending").val()
        }

        if (objData.name == '' || objData.attending =='' || objData.password =='') {
            $('.alert-warning').fadeIn().show();
        } else {
            $.ajax({
                contentType: 'application/json',
                type: 'POST',
                url: 'https://nicholeandmichael-rsvp.azurewebsites.net/api/StoreRSVP?code=qw6j10hkdijzxj213hx7juwojxl3sg57',
                data: JSON.stringify(objData),
                dataType: "json"
            })
            .fail (function() {
                $('.alert-warning').fadeIn().hide();
                $('.alert-danger').fadeIn().fadeOut(3000);
                $('#spinner').hide();
            })
            .done(function(data, textStatus, jqXHR) {
                if (jqXHR.status == 200){
                    $('.alert-success').fadeIn().fadeOut(3000);
                    $('#rsvpform').trigger("reset");
                } else {
                    $('.alert-danger').fadeIn().fadeOut(3000);
                }
                $('.alert-danger').fadeIn().hide();
                $('.alert-warning').fadeIn().hide();
                $('#rsvpform').trigger("reset");
                $('#spinner').hide();
            });
        }
        return false;
    });
});

//SCROLLREVEAL
window.sr = ScrollReveal();
sr.reveal('#home .caption', {
    duration: 1500,
    reset: true
}, 50);
sr.reveal('#story .col-md-12, #story .col-md-4', {
    duration: 1500,
    reset: true
}, 50);
sr.reveal('#wedding .col-md-12, #wedding .col-md-4', {
    duration: 1500,
    reset: true
}, 50);
sr.reveal('#accomm .container', {
    duration: 1500,
    reset: true
}, 50);

sr.reveal('#registry img', {
    duration: 2000,
    reset: true
}, 200);

sr.reveal('#rsvp .container', {
    duration: 1500,
    reset: true
}, 50);
