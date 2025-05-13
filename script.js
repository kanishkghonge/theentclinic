// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone nav links and add to mobile menu
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        const socialIcons = document.querySelector('.social-icons').cloneNode(true);
        
        // Add close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        mobileMenu.appendChild(closeBtn);
        mobileMenu.appendChild(navLinks);
        mobileMenu.appendChild(socialIcons);
        
        document.body.appendChild(mobileMenu);
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        // Close mobile menu
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const slidesContainer = document.querySelector('.testimonial-slides');
        const dotsContainer = document.querySelector('.testimonial-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Initialize slider
        updateSlider();
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide
        let autoSlide = setInterval(nextSlide, 5000);
        
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Update slider
        function updateSlider() {
            // Update slides position
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Read More functionality for testimonials using modal
        const readMoreLinks = document.querySelectorAll('.read-more');
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'testimonial-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'testimonial-modal-content';
        
        const closeModal = document.createElement('span');
        closeModal.className = 'close-modal';
        closeModal.innerHTML = '&times;';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        modalContent.appendChild(closeModal);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Full review data
        const fullReviews = {
            'Girish Bansal': "I had a wonderful experience with Dr. Isha Jain an outstanding ENT specialist. She took the time to thoroughly listen to my concerns and explained everything in a clear, reassuring manner. The diagnosis was accurate, and the treatment plan was effective and tailored to my needs. I truly appreciated the professionalism, kindness, and attention to detail. I highly recommend to anyone looking for a knowledgeable and compassionate ENT doctor.",
            'Kartikey Bahl': "I was suffering from viral fever and throat infection, I had gone to multiple doctors but my cough was get worse and I was having pain while chewing, then I went to Dr Isha since she was an ENT specialist, she listened to me with all ears and was able to diagnose the problem at the very first meeting and gave me medicines, it took me just one week and I am doing absolutely fine now. I highly recommend her !!",
            'Komal Sharma': "Amazing doctor I went there for my husband ear infection, she treated him so well and receptionist is extremely helpful and professional, she is kid friendly. Highly recommended!",
            'Saumya Jain': "When I look at the reviews for this clinic, I'm not surprised that they are almost 5 Stars. First time in my life, I visited a doctor's office without apprehension. After double ear infections, perforated ear drums and needing a specialist, I ended up in this clinic, which was so lucky for me. I have been under the care of Dr. Isha for many weeks now. She is knowledgeable, caring, sympathetic, understanding and beyond special in so many ways. She is truly wonderful and has turned my ear problems around. She has been unwilling to give up on finding the reason for my ear problems. I thank my lucky stars for her and she has my highest recommendation. Thank you so much Dr. Isha. If you need an ENT, don't hesitate to visit her. It's so worth it.",
            'Jagjeet Kaur': "My experience with Isha Dr is very good. I visit her first she handle me very nice and politely to me and my mother also. I worried about my ear she said don't worry it will be fine dnt take stress do some precautions and take medicine. I like the way she cares of me like a patient and motivating me to do not loose hope everything will be ok it's nt big issue.",
            'Nitish Shani': "I recently get my ear infection treated. She is very understanding and polite as it's hard to find a polite doctor these days that too in noida. Her charismatic aura defines her to be a good doctor",
            'Avinav Sharma': "Just visited her clinic. She detects and explains about the problem very well. The medicines are not exaggerated and are to the point.",
            'Astha Khanna': "She is hands down the best ENT in town! I have been going to her for almost 4 years now. The first time I went I was suffering from an infection for almost 15 days and she was then my 3rd doc consultation. I was so so tired with all the suffering that came with the infection and with her treatment I was totally fine in 10 days. Since then I have been going to her for all my problems and whoever I have recommended her name to, has only good things to say about her treatment. She has treated so many people in my family and friends that now she is more like our family doctor. You don't need to think twice, she's the best!"
        };
        
        // Show full review in modal
        readMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const reviewerName = this.closest('.testimonial-card').querySelector('h4').textContent;
                const reviewText = fullReviews[reviewerName];
                
                modalHeader.innerHTML = `
                    <h4>${reviewerName}</h4>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                `;
                
                modalBody.innerHTML = `<p>${reviewText}</p>`;
                
                modal.style.display = 'flex';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Add "Read More Reviews on Google" button
        const googleButtonContainer = document.createElement('div');
        googleButtonContainer.className = 'google-reviews-btn-container';
        
        const googleButton = document.createElement('a');
        googleButton.className = 'google-reviews-btn';
        googleButton.href = "https://www.google.com/search?q=dr+isha+jain+clinic+reviews&oq=dr+isha+jain+clinic+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEIODcxMmowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x390ce54001cfb27d:0xd5e489fe3939e281,1,,,,";
        googleButton.target = "_blank";
        googleButton.innerHTML = '<i class="fab fa-google"></i> Read More Reviews on Google';
        
        googleButtonContainer.appendChild(googleButton);
        testimonialSlider.after(googleButtonContainer);
    }

    // Scroll to top button
    const toTop = document.createElement('div');
    toTop.className = 'to-top';
    toTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(toTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            toTop.classList.add('active');
        } else {
            toTop.classList.remove('active');
        }
    });
    
    toTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.about-content, .testimonial-slider, .appointment-container, .contact-info, .map-container');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Sticky header with color change on scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const hero = document.querySelector('.hero');
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 0) {
            header.classList.add('scrolled');
            
            // Change header color based on sections
            const scrollPosition = window.pageYOffset;
            
            // If scroll position is within hero section, add 'on-hero' class
            if (scrollPosition < heroBottom - headerHeight) {
                header.classList.add('on-hero');
            } else {
                header.classList.remove('on-hero');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.add('on-hero');
        }
    });
    
    // Initialize header color
    if (window.pageYOffset > 0) {
        header.classList.add('scrolled');
        if (window.pageYOffset < heroBottom - headerHeight) {
            header.classList.add('on-hero');
        }
    } else {
        header.classList.add('on-hero');
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 