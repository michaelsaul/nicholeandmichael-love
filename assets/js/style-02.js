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
    $(".submit").click(function() {

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
                dataType: "json",
                statusCode: {
                    200: function() {
                        $('.alert-success').fadeIn().fadeOut(3000);
                        $('form-inline').reset;
                    },
                    400: function() {
                        $('.alert-danger').fadeIn().fadeOut(3000);
                    }
                },
                error: function() {
                    $('.alert-warning').fadeIn().hide();
                    $('.alert-danger').fadeIn().fadeOut(3000);
                },
                always: function() {
                    $('.alert-danger').fadeIn().hide();
                    $('.alert-warning').fadeIn().hide();
                    $('.form-inline').reset;
                }
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
