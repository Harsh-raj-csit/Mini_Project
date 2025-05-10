$(document).ready(function() {
    // Hero Slider
    let currentSlide = 0;
    const slides = $('.slide');
    const slideCount = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        $(slides[index]).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Mobile Navigation
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
        
        // Animate hamburger
        if ($(this).hasClass('active')) {
            $(this).find('span:nth-child(1)').css({
                'transform': 'rotate(45deg) translate(5px, 5px)'
            });
            $(this).find('span:nth-child(2)').css({
                'opacity': '0'
            });
            $(this).find('span:nth-child(3)').css({
                'transform': 'rotate(-45deg) translate(5px, -5px)'
            });
        } else {
            $(this).find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.navbar').length) {
            $('.nav-links').removeClass('active');
            $('.hamburger').removeClass('active').find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

    // Smooth Scrolling for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Back to Top Button
    const backToTop = $('#backToTop');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.css('display', 'flex').fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Navbar Scroll Effect
    let lastScroll = 0;
    $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            $('.navbar').css('transform', 'translateY(-100%)');
        } else {
            // Scrolling up
            $('.navbar').css('transform', 'translateY(0)');
        }
        
        lastScroll = currentScroll;
    });

    // Add active class to current navigation item
    const currentLocation = location.href;
    const menuItems = $('.nav-links a');
    
    menuItems.each(function() {
        if ($(this).attr('href') === currentLocation) {
            $(this).addClass('active');
        }
    });
}); 