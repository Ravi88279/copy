document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Send form data
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you soon.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Show error message
                submitButton.textContent = 'Error - Try Again';
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            });
        });
    }
});
