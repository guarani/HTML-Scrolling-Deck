/*!
 * jQuery scrolldeck plugin
 * Original author: @paulvonschrottky
 * Further changes, comments: @paulvonschrottky
 * Licensed under the MIT license
 * 
 * A jQuery plugin to produce a scroll deck similar to 'http://bradywilliams.co/'.
 * The idea is that instead of scrolling vertically through a tall website, each 
 * page slides up from the bottom of the screen and 'docks' on top of the 
 * previous page.
 *
 * Create pages like this and call this function in document ready, that's all.
 * 
 *      <div class="page">Page 1</div>
 *      <div class="page">Page 2</div>
 *      <div class="page">Page 3</div>
 *
 */
;(function($) {
    $.fn.scrolldeck = function(options) {
        debugger;
        // Defaults.
        var pluginName,
            settings = $.extend({
                debug: false,
            }, options);
        
        // Hide scrollbars caused by offscreen pages.
        $('body').css('overflow', 'hidden');

        // Add our CSS to the pages.
        this.css({
            'position': 'absolute',
            'width':    '100%',
            'height':   '100%',
        }); 

        // Mark the first page as the current page (i.e. the page that is filling up the entire screen).
        this.first().addClass('current');

        // Hide beneath the bottom of the screen all pages except for the first.
        this.not('.current').each(function (index, page) {
            $(page).offset({
                top:    window.innerHeight,
                left:   0,
            });
        });

        // Add a scroll listener to the pages so we know when the user scrolls and so
        // we can slide the pages up (or down).
        var pages = this;        // A reference to the pages.
        this.on('mousewheel', function(event) {
            if (settings.debug) {
                console.log(event.deltaX, event.deltaY, event.deltaFactor);
            }

            // Get the next page to be displayed and its current y position.
            debugger;
            var nextPage = $(pages).filter('.current').next(); 
            var nextPageY = $(nextPage).offset().top;

            // If the new position would be off the top of the screen, snap the page to the top of the screen.
            // Else, if the new position would be past the bottom of the screen, snap the page to the bottom of the screen.
            var newNextPageY = nextPageY + event.deltaY * event.deltaFactor;
            if (newNextPageY < 0) {
                newNextPageY = 0;

                // Also, mark the next page as the current page.
                if ($(nextPage).is(':last-of-type') == false) {
                    $(nextPage).prev().removeClass('current');
                    $(nextPage).addClass('current');
                }
            } else if (newNextPageY > window.innerHeight) {
                newNextPageY = window.innerHeight;

                // Also, mark the previous page as the current page.
                if ($(nextPage).prev().is(':first-of-type') == false) {
                    $(nextPage).prev().removeClass('current');
                    $(nextPage).prev().prev().addClass('current');
                }
            }

            // Scroll the next page up by the user's scrolling distance.
            $(nextPage).offset({
                top: newNextPageY, 
                left: 0,
            });
        });
    };       
}(jQuery));
