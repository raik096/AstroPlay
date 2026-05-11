AUI().ready(
    'liferay-sign-in-modal',
    function (A) {
        var signIn = A.one('.sign-in > a');

        if (signIn && signIn.getData('redirect') !== 'true') {
            signIn.plug(Liferay.SignInModal);
        }
    }
);

$(document).ready(function () {

    /* Menu toggle icon function */
    function toggleIcon(icon) {
        icon.each(function () {
            if ($(this).hasClass('is-hidden')) {
                $(this).removeClass('is-hidden').addClass('is-visible');
            } else if ($(this).hasClass('is-visible')) {
                $(this).removeClass('is-visible').addClass('is-hidden');
            }
        });
    }
    
    /* Temporary fix - old room, added class for header */
    $('#main-content[class*="partecipa-toscana-room-"]').closest('body').addClass('is-room');

    /* Fix for collabora */
    $('.rt-subheader.rt-room-collabora').closest('body').addClass('is-collabora');

    /* Check if there's steps wrapper  */
    if($('#main-content[class*="partecipa-toscana-room-"] .rt-subheader .rt-subheader__steps.is-disabled').length) {
        $('#main-content[class*="partecipa-toscana-room-"]').closest('body').addClass('has-steps-wrapper');
    } else {
        $('#main-content[class*="partecipa-toscana-room-"]').closest('body').addClass('has-not-steps-wrapper');
    }

    /* Navbar menu toggle */
    $('.rt-navbar-section-toggle').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var targetMenu = $(this).data('target');
        $(targetMenu).toggleClass('show');
        $(this).toggleClass('collapsed');

        var icon = $(this).find('i');
        if (icon.hasClass('fa-bars')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else if (icon.hasClass('fa-times')) {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });


    /* Page scroll*/
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $('body').addClass('is-scrolled');
        } else {
            $('body').removeClass('is-scrolled');
        }
    });

    /* Opportunities open/close */
    $('.gs-opportunities__label').on('click', function (e) {
        $('.gs-opportunities__list').toggleClass('is-closed');
    });

    /* Menu dropdown opening/close */
    $('.rt-main-navigation > .rt-main-navigation__item.has-submenu > a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var thisItem = $(this).closest('.rt-main-navigation__item');

        var siblingItem = thisItem.siblings('li');
        var siblingIcon = siblingItem.find('i:not(.fa-chevron-right)');

        if (thisItem.find('.rt-main-navigation__dropdown').length) {
            thisItem.toggleClass('is-open');
        }

        if (siblingIcon.hasClass('fa-chevron-up')) {
            siblingIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }

        siblingItem.each(function () {
            if ($(this).hasClass('is-open')) {
                $(this).removeClass('is-open');
            }
        });

        siblingItem.find('.rt-main-navigation__dropdown').removeClass('is-open');

        var dropdownMenu = $(this).next('.rt-main-navigation__dropdown');

        dropdownMenu.toggleClass('is-open');

        if (window.matchMedia("(min-width: 768px)").matches) {
            var menuIcon = $(this).find('i:not(.fa-chevron-right)');
            if (menuIcon.hasClass('fa-chevron-down')) {
                menuIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
            } else if (menuIcon.hasClass('fa-chevron-up')) {
                menuIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        } else if (window.matchMedia("(max-width: 767px)").matches) {
            dropdownMenu.find('.rt-mobile-back').first().addClass('is-fixed');
        }

    });

    // /* Mobile navbar toggle */
    $('.rt-navbar-toggle').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('body').toggleClass('not-scrollable');

        var targetMenu = $('#navigationMain');
        targetMenu.toggleClass('is-open');

        $('.rt-main-navigation__dropdown').each(function () {
            if ($(this).hasClass('is-open')) {
                $(this).removeClass('is-open');
            }
        });

        $('.rt-mobile-back').each(function () {
            if ($(this).hasClass('is-fixed')) {
                $(this).removeClass('is-fixed');
            }
        });

        var menuIcon = $(this).find('i');
        toggleIcon(menuIcon);

        $('.rt-mobile-overlay').toggleClass('is-visible');
    });

    /* Mobile menu back button */
    $('.rt-mobile-back').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).closest('.rt-main-navigation__dropdown').removeClass('is-open');
    });


    /* Mobile menu overlay */
    $('.rt-mobile-overlay').on('click', function () {
        $('.rt-main-navigation-container').removeClass('is-open');
        $(this).removeClass('is-visible');
        var menuIcon = $('.rt-navbar-toggle').find('i');
        toggleIcon(menuIcon);

    });

    /* Subheader menu toggle */
    $('.rt-subheader-dropdown-toggle').on('click', function (e) {
        e.preventDefault();
        toggleIcon($(this).find('.rt-subheader-dropdown-toggle-text'));

        $('.rt-subheader__menu').toggleClass('is-open');
    });

    /* Close menu on outside click*/
    $('body').on('click', function (e) {
        if (!$(e.target).closest('.rt-main-navigation__dropdown').length && !$(e.target).is('.rt-main-navigation__dropdown')) {
            $('.rt-main-navigation__dropdown').removeClass('is-open');
            $('.rt-main-navigation__item').removeClass('is-open');

            if (window.matchMedia("(min-width: 768px)").matches) {
                $('.rt-main-navigation__item').find('i:not(.fa-chevron-right)').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        }

        if (!$(e.target).closest('.rt-main-navigation-panel').length && !$(e.target).is('.rt-main-navigation-panel')) {
            $('.rt-main-navigation-panel').removeClass('is-open');

            $('body').removeClass('not-scrollable');
        }

        if (!$(e.target).closest('.rt-navbar-section-collapse').length && !$(e.target).is('.rt-navbar-section-collapse')) {
            $('.rt-navbar-section-collapse').removeClass('show');
            $('.rt-navbar-section-toggle').addClass('collapsed');
            $('.rt-navbar-section-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
        }

    });

    /* Search bar toggle button on page scroll */
    $('#search-toggle-scroll').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.rt-search-bar').toggleClass('is-open');
    });

    /* Search bar mobile toggle button */
    $('#search-toggle-mobile').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.rt-search-bar').toggleClass('is-open');
    });

    /* Search bar mobile toggle button */
    $('#search-toggle-tablet').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.rt-search-bar').toggleClass('is-open-tablet');
    });

    /* Sidebar mobile behaviour */
    if (window.matchMedia("(max-width: 767px)").matches) {
        $('.rt-sidebar__menu > .rt-sidebar__menu-item > a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).closest('.rt-sidebar__menu-item').toggleClass('is-active');
        });
    }

    /* Expand/collapse toggle for sidebar menu on mobile */
    $('.rt-mobile-menu-expand').on('click', function (e) {
        e.preventDefault();
        var sidebarMenu = $(this).siblings('.rt-sidebar__menu');

        var subheaderMenu = $(this).siblings('.rt-subheader__menu-list');

        if (sidebarMenu.length) {
            sidebarMenu.toggleClass('is-shown');
        }

        if (subheaderMenu.length) {
            subheaderMenu.toggleClass('is-shown');
        }

        var buttonText = $(this).html();

        if (buttonText == 'Espandi il menu <i aria-hidden="true" class="far fa-chevron-down"></i>') {
            $(this).html('Chiudi il menu <i aria-hidden="true" class="far fa-chevron-up"></i>');
        } else if (buttonText == 'Chiudi il menu <i aria-hidden="true" class="far fa-chevron-up"></i>') {
            $(this).html('Espandi il menu <i aria-hidden="true" class="far fa-chevron-down"></i>');
        }
    });

    // /* Homepage slider */
    //
    // $('#menu-slider').flexslider({
    //     animation: "slide",
    //     controlNav: false,
    //     directionNav: false,
    //     keyboard: true,
    //     animationLoop: false,
    //     slideshow: false,
    //     itemWidth: 210,
    //     itemMargin: 5,
    //     asNavFor: '#main-slider'
    // });

    $('#main-slider').flexslider({
        animation: "slide",
        // controlNav: false,
        directionNav: false,
        keyboard: true,
        animationLoop: false,
        slideshow: false
        // sync: "#menu-slider"
    });

    /* Page gallery */
    $('.rt-gallery__slider').slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true
    });

    // Accordion

    function openFirstPanel() {
        $('.accordion > dt:first-child').next().addClass('active').slideDown();
    }

    var allPanels = $('.rt-accordion > dd').hide();
    openFirstPanel();

    $('.rt-accordion > dt > a').click(function (e) {
        e.preventDefault();

        $this = $(this);
        $target = $this.parent().next();
        var icon = $(this).find('i');

        if ($this.attr('aria-expanded') == "true") {
            $this.attr('aria-expanded', 'false');
        } else if ($this.attr('aria-expanded') == "false") {
            $this.attr('aria-expanded', 'true');
        }

        if (icon.hasClass('fa-chevron-down')) {
            icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }

        if ($target.hasClass('active')) {
            $target.removeClass('active').slideUp();
        } else {
            allPanels.removeClass('active').slideUp();
            $target.addClass('active').slideDown();
        }

        return false;

    });

    // end accordion

    /* Share button */
    $('#sharebtn').on('click', function (e) {
        e.preventDefault();
        $('.taglib-social-bookmarks').toggleClass('is-visible');
        $('.rt-social-share-overlay').addClass('is-visible');
    });

    $('.rt-social-share-overlay').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.taglib-social-bookmarks').removeClass('is-visible');
        $(this).removeClass('is-visible');
    });

     /* Expand/collapse toggle for section */
     $('.rt-section-expand').on('click', function (e) {
        e.preventDefault();
        var expandableSection = $(this).siblings('.rt-text-expandable-content');

        expandableSection.toggleClass('is-shown');
        
        var buttonText = $(this).html();

        if (buttonText == '<i aria-hidden="true" class="far fa-chevron-down"></i> Leggi tutto') {
            $(this).html('<i aria-hidden="true" class="far fa-chevron-up"></i> Meno');
        } else if (buttonText == '<i aria-hidden="true" class="far fa-chevron-up"></i> Meno') {
            $(this).html('<i aria-hidden="true" class="far fa-chevron-down"></i> Leggi tutto');
        } else if (buttonText == 'Vedi tutto') {
            $(this).html('Vedi meno');
        } else if (buttonText == 'Vedi meno') {
            $(this).html('Vedi tutto');
        } else if (buttonText == 'Continua a leggere') {
            $(this).html('Chiudi');
        } else if (buttonText == 'Chiudi') {
            $(this).html('Continua a leggere');
        }
    });

});