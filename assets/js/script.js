$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling for in-page anchors
    $('a[href^="#"]').on('click', function (e) {
        let target = $(this).attr('href');
        if (target && $(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top,
            }, 500, 'linear');
        }
    });

    // Contact form -> FormSubmit (with timeout + native activation fallback so it never hangs)
    $("#contact-form").submit(async function (event) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = document.getElementById("contact-submit-btn");
        const statusEl = document.getElementById("form-status");

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        statusEl.className = "form-status";
        statusEl.textContent = "";

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone || "Not provided");
        formData.append("message", message);
        formData.append("_subject", `Portfolio Inquiry from ${name}`);
        formData.append("_template", "table");
        formData.append("_captcha", "false");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        try {
            const response = await fetch("https://formsubmit.co/ajax/bhupesh.dubey.dev@gmail.com", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData,
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const result = await response.json();

            if (result.success === "true" || result.success === true) {
                statusEl.className = "form-status success";
                statusEl.textContent = "Message sent successfully! Thank you — I'll get back to you soon.";
                form.reset();
            } else {
                // Unactivated endpoint -> trigger standard POST in new tab to send FormSubmit activation email
                HTMLFormElement.prototype.submit.call(form);
                statusEl.className = "form-status info";
                statusEl.textContent = "One-time setup opened in a new tab — check bhupesh.dubey.dev@gmail.com and click 'Activate Form'!";
                form.reset();
            }
        } catch (err) {
            clearTimeout(timeoutId);
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`);
            window.location.href = `mailto:bhupesh.dubey.dev@gmail.com?subject=${subject}&body=${body}`;
            statusEl.className = "form-status info";
            statusEl.textContent = "Opening your email app to send directly to bhupesh.dubey.dev@gmail.com.";
            form.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Bhupesh Dubey — Senior DevOps Engineer";
        $("#favicon").attr("href", "./assets/images/favicon.png?v=5");
    } else {
        document.title = "Come Back To Bhupesh's Portfolio";
        $("#favicon").attr("href", "./assets/images/favhand.png");
    }
});


// typed js effect
var typed = new Typed(".typing-text", {
    strings: [
        "AWS & GCP Cloud Infrastructure",
        "CI/CD Pipelines (Jenkins & Argo CD)",
        "Kubernetes (EKS) & Docker",
        "Terraform (Infrastructure as Code)",
        "Cloud Security & Observability"
    ],
    loop: true,
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 1200,
});

async function fetchData(type = "skills") {
    let response = type === "skills"
        ? await fetch("./skills.json")
        : await fetch("./projects/projects.json");
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 6).forEach(project => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                </div>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 12,
    });

    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: false
    });

    srtop.reveal('.work .box', { interval: 180 });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 12,
});


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 900,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h2', { delay: 150 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 250 });

srtop.reveal('.home .image', { delay: 350 });
srtop.reveal('.home .linkedin', { interval: 400 });
srtop.reveal('.home .dev', { interval: 500 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .github', { interval: 700 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 300 });
srtop.reveal('.experience .timeline .container', { interval: 300 });

/* SCROLL ACHIEVEMENTS */
srtop.reveal('.achievements .achievement-card', { interval: 150 });
srtop.reveal('.achievements .award-banner', { delay: 250 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 300 });
