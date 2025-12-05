// js/main.js

document.addEventListener('DOMContentLoaded', function () {

    // --- ハンバーガーメニューの開閉処理 ---
    const menuToggle = document.querySelector('.menu-toggle');
    const globalNav = document.querySelector('.global-nav');

    if (menuToggle && globalNav) {
        menuToggle.addEventListener('click', function () {
            globalNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close button logic
        const menuClose = document.querySelector('.menu-close');
        if (menuClose) {
            menuClose.addEventListener('click', function () {
                globalNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        }
    }

    // --- ヒーロースライダー ---
    const slider = document.querySelector('.slider-container');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');
        let currentSlide = 0;
        let slideInterval;
        const slideIntervalTime = 5000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });

            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                prevSlide();
                startSlideShow();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });

        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);

        showSlide(0);
        startSlideShow();
    }

    // --- ニュースセクションのアニメーション ---
    const animateNewsItems = () => {
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);

                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-5px)';
                    item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                });

                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0)';
                    item.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
                });
            }, index * 150);
        });
    };

    const handleScroll = () => {
        const newsSection = document.querySelector('.news-section');
        if (!newsSection) return;

        const sectionTop = newsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            animateNewsItems();
            window.removeEventListener('scroll', handleScroll);
        }
    };

    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);

    document.querySelectorAll('.news-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // --- 言語切り替え ---
    const langSwitch = document.querySelector('.lang-switch');
    const langCurrent = document.querySelector('.lang-current');

    if (langSwitch && langCurrent) {
        langCurrent.addEventListener('click', function (e) {
            e.stopPropagation();
            langSwitch.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!langSwitch.contains(e.target)) {
                langSwitch.classList.remove('active');
            }
        });

        const langLinks = document.querySelectorAll('.lang-menu a');
        langLinks.forEach(link => {
            link.addEventListener('click', function () {
                langSwitch.classList.remove('active');
            });
        });
    }

    // --- スクロールアニメーション (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- Mega Menu Close Button (PC) ---
    document.querySelectorAll('.mega-menu-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const megaMenu = btn.closest('.mega-menu');
            if (megaMenu) {
                megaMenu.style.display = 'none';
                // Reset when mouse leaves the parent li to allow hovering again later
                const parentLi = megaMenu.closest('li');
                if (parentLi) {
                    const onMouseLeave = () => {
                        megaMenu.style.display = ''; // Reset inline style
                        parentLi.removeEventListener('mouseleave', onMouseLeave);
                    };
                    parentLi.addEventListener('mouseleave', onMouseLeave);
                }
            }
        });
    });

});