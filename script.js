

document.addEventListener("DOMContentLoaded", function () {

    // 1. Highlight the current page in the navigation
    const currentPage = decodeURIComponent(
        window.location.pathname.split("/").pop() || "index.html"
    );

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        const linkPage = decodeURIComponent(
            link.getAttribute("href").split("/").pop()
        );

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // 2. Smooth scrolling for links to sections on the same page
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.getElementById(targetId.slice(1));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 3. Validate the Contact Us form
    const contactForm = document.querySelector("#contact-form");
    const emailInput = document.querySelector("#email");

    if (contactForm && emailInput) {

        // Explicit email length check: 6 to 100 characters
        emailInput.addEventListener("input", function () {
            emailInput.setCustomValidity("");

            if (emailInput.value.length > 0 &&
                emailInput.value.length < 6) {
                emailInput.setCustomValidity(
                    "Your email must contain at least 6 characters."
                );
            } else if (emailInput.value.length > 100) {
                emailInput.setCustomValidity(
                    "Your email cannot exceed 100 characters."
                );
            }
        });

        contactForm.addEventListener("submit", function (event) {
            emailInput.setCustomValidity("");

            if (emailInput.value.length < 6) {
                emailInput.setCustomValidity(
                    "Your email must contain at least 6 characters."
                );
            } else if (emailInput.value.length > 100) {
                emailInput.setCustomValidity(
                    "Your email cannot exceed 100 characters."
                );
            }

            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.reportValidity();
            } else {
                // This website does not yet send emails.
                event.preventDefault();
                alert("Your form passed validation! Email sending is not connected yet.");
            }
        });
    }

});
