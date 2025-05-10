$(document).ready(function() {
    const contactForm = $('#contactForm');
    
    // Form validation
    function validateField(field, errorMessage) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.find('.error-message');
        
        if (!field.val().trim()) {
            formGroup.addClass('error');
            errorElement.text(errorMessage);
            return false;
        }
        
        // Email validation
        if (field.attr('type') === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.val().trim())) {
                formGroup.addClass('error');
                errorElement.text('Please enter a valid email address');
                return false;
            }
        }
        
        formGroup.removeClass('error');
        errorElement.text('');
        return true;
    }
    
    // Real-time validation
    contactForm.find('input, textarea').on('input', function() {
        const field = $(this);
        validateField(field, `${field.prev('label').text().replace(' *', '')} is required`);
    });
    
    // Form submission
    contactForm.on('submit', function(e) {
        e.preventDefault();
        
        const nameField = $('#name');
        const emailField = $('#email');
        const subjectField = $('#subject');
        const messageField = $('#message');
        
        // Validate all fields
        const isNameValid = validateField(nameField, 'Name is required');
        const isEmailValid = validateField(emailField, 'Email is required');
        const isSubjectValid = validateField(subjectField, 'Subject is required');
        const isMessageValid = validateField(messageField, 'Message is required');
        
        // If all fields are valid, submit the form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Create success message element if it doesn't exist
            let successMessage = $('.success-message');
            if (successMessage.length === 0) {
                successMessage = $('<div class="success-message">Message sent successfully! We will get back to you soon.</div>');
                contactForm.prepend(successMessage);
            }
            
            // Show success message
            successMessage.slideDown();
            
            // Reset form
            contactForm[0].reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.slideUp();
            }, 5000);
            
            // Here you would typically send the form data to a server
            // For demonstration, we're just showing a success message
            console.log('Form submitted with data:', {
                name: nameField.val(),
                email: emailField.val(),
                subject: subjectField.val(),
                message: messageField.val()
            });
        }
    });
    
    // Clear error on focus
    contactForm.find('input, textarea').on('focus', function() {
        const formGroup = $(this).closest('.form-group');
        formGroup.removeClass('error');
        formGroup.find('.error-message').text('');
    });
}); 