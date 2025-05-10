$(document).ready(function() {
    // Portfolio Filtering
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (value === 'all') {
            $('.gallery-item').show('1000');
        } else {
            $('.gallery-item').not('.' + value).hide('1000');
            $('.gallery-item').filter('.' + value).show('1000');
        }
    });

    // Lightbox functionality
    let currentImageIndex = 0;
    const lightboxImages = $('.lightbox');

    // Create lightbox elements
    const lightboxOverlay = $('<div class="lightbox-overlay"></div>');
    const lightboxContent = $('<div class="lightbox-content"></div>');
    const lightboxImage = $('<img>');
    const closeButton = $('<span class="lightbox-close">&times;</span>');
    const prevButton = $('<span class="lightbox-nav lightbox-prev">&lt;</span>');
    const nextButton = $('<span class="lightbox-nav lightbox-next">&gt;</span>');

    lightboxContent.append(lightboxImage, closeButton, prevButton, nextButton);
    lightboxOverlay.append(lightboxContent);
    $('body').append(lightboxOverlay);

    // Open lightbox
    $('.lightbox').click(function(e) {
        e.preventDefault();
        currentImageIndex = lightboxImages.index(this);
        updateLightboxImage();
        lightboxOverlay.css('display', 'flex').hide().fadeIn();
    });

    // Close lightbox
    closeButton.click(function() {
        lightboxOverlay.fadeOut();
    });

    // Close on overlay click
    lightboxOverlay.click(function(e) {
        if ($(e.target).hasClass('lightbox-overlay')) {
            lightboxOverlay.fadeOut();
        }
    });

    // Previous image
    prevButton.click(function() {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
    });

    // Next image
    nextButton.click(function() {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    $(document).keydown(function(e) {
        if (!lightboxOverlay.is(':visible')) return;

        switch(e.which) {
            case 37: // Left arrow
                prevButton.click();
                break;
            case 39: // Right arrow
                nextButton.click();
                break;
            case 27: // Escape
                closeButton.click();
                break;
        }
    });

    // Update lightbox image
    function updateLightboxImage() {
        const newSrc = $(lightboxImages[currentImageIndex]).attr('href');
        const newAlt = $(lightboxImages[currentImageIndex]).find('img').attr('alt');
        
        // Fade out current image, update src, fade in new image
        lightboxImage.fadeOut(200, function() {
            $(this).attr({
                'src': newSrc,
                'alt': newAlt
            }).fadeIn(200);
        });

        // Update navigation visibility
        if (lightboxImages.length <= 1) {
            prevButton.hide();
            nextButton.hide();
        } else {
            prevButton.show();
            nextButton.show();
        }
    }

    // Preload images for smoother transitions
    lightboxImages.each(function() {
        const img = new Image();
        img.src = $(this).attr('href');
    });

    // Add loading animation
    lightboxImage.on('load', function() {
        $(this).fadeIn();
    });
}); 