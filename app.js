document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const header = document.querySelector("header");
    const heroBtn = document.querySelector(".btn");
    const form = document.querySelector("form");
    const reviews = document.querySelectorAll(".review");
    const allSections = document.querySelectorAll("section");
    const counters = document.querySelectorAll(".counter");

    let reviewIndex = 0;

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuBtn.innerHTML = "delete";
        } else {
            menuBtn.innerHTML = "☰";
        }
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuBtn.innerHTML = "☰";
        });
    });


    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.style.background = "#111";
            header.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            header.style.padding = "15px 0";
        } else {
            header.style.background = "#333";
            header.style.boxShadow = "none";
            header.style.padding = "20px 0";
        }

    });


    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            document.querySelector(".features").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    function showReview() {

        reviews.forEach(review => {
            review.style.display = "none";
            review.style.opacity = "0";
        });

        reviews[reviewIndex].style.display = "block";

        setTimeout(() => {
            reviews[reviewIndex].style.opacity = "1";
        }, 100);

        reviewIndex++;

        if (reviewIndex >= reviews.length) {
            reviewIndex = 0;
        }
    }

    if (reviews.length > 0) {
        showReview();
        setInterval(showReview, 4000);
    }

    const revealItems = document.querySelectorAll(
        ".card, .service-card, .review, .hero-text, .hero-img, form"
    );

    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all 0.8s ease";
    });

    function revealOnScroll() {

        revealItems.forEach(item => {

            const itemTop = item.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (itemTop < screenHeight - 100) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }

        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    const navItems = document.querySelectorAll("#navLinks a");

    window.addEventListener("scroll", () => {

        let current = "";

        allSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("class");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

    });

    if (form) {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll("input, textarea");
            let success = true;

            inputs.forEach(input => {

                if (input.value.trim() === "") {
                    input.style.border = "2px solid red";
                    success = false;
                } else {
                    input.style.border = "2px solid green";
                }

            });

            if (success) {
                alert("Message Sent Successfully!");
                form.reset();

                inputs.forEach(input => {
                    input.style.border = "1px solid #ccc";
                });

            } else {
                alert("Please fill all fields.");
            }

        });

    }

    function runCounter() {

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target");
            let count = 0;

            const updateCounter = () => {

                const speed = target / 100;

                count += speed;

                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }

            };

            updateCounter();

        });

    }

    if (counters.length > 0) {
        runCounter();
    }

    const darkBtn = document.getElementById("darkMode");

    if (darkBtn) {

        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");

            if (document.body.classList.contains("dark-theme")) {
                darkBtn.innerHTML = "Light";
            } else {
                darkBtn.innerHTML = "Dark";
            }
        });

    }

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        });
    }


});
