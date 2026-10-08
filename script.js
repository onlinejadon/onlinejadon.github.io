/* =========================================
   AS JADON SOLUTIONS
   Main JavaScript
========================================= */


/* ================= PLAN SYSTEM ================= */

let selectedPlan = "";
let selectedPrice = "";
let selectedPages = "";


function selectPlan(plan, price, pages) {

    selectedPlan = plan;
    selectedPrice = price;
    selectedPages = pages;

    document.getElementById("selectedPlanText").textContent =
        `${plan} — ₹${price.toLocaleString("en-IN")} — ${pages}`;

    document.getElementById("enquiryModal").classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeEnquiry() {

    document.getElementById("enquiryModal").classList.remove("open");

    document.body.style.overflow = "";
}


/* ================= SCROLL ================= */

function scrollToPlans() {

    const plans = document.getElementById("plans");

    if (plans) {
        plans.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= WHATSAPP FORM ================= */

document
    .getElementById("enquiryForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName").value.trim();

        const email =
            document.getElementById("customerEmail").value.trim();

        const mobile =
            document.getElementById("customerMobile").value.trim();

        const business =
            document.getElementById("businessName").value.trim();

        const location =
            document.getElementById("businessLocation").value.trim();


        /* Gmail validation */

        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {

            alert("Please enter a valid Gmail address.");

            return;
        }


        /* Indian mobile validation */

        if (!/^[6-9]\d{9}$/.test(mobile)) {

            alert("Please enter a valid 10-digit Indian mobile number.");

            return;
        }


        /* WhatsApp message */

        const message =
`Hello AS Jadon Solutions 👋

I want to enquire about a website.

Selected Plan: ${selectedPlan}
Price: ₹${selectedPrice}
Pages: ${selectedPages}

Customer Details:

Name: ${name}
Gmail: ${email}
Mobile: ${mobile}

Business / Shop Name:
${business}

Business Location:
${location}

Please contact me regarding this website plan.

Thank you.`;


        const whatsappNumber = "918871469064";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        /*
           Direct navigation is used instead of popup.
           This works better on mobile browsers.
        */

        window.location.href = whatsappURL;

    });


/* ================= AI TOY ================= */

const aiToy = document.getElementById("aiToy");

const helloBubble =
    document.getElementById("helloBubble");


/*
   Automatically show Hello after page loads.
*/

window.addEventListener("load", function() {

    setTimeout(function() {

        helloBubble.classList.remove("hide");

    }, 700);


    /*
       Hide greeting after a few seconds.
    */

    setTimeout(function() {

        helloBubble.classList.add("hide");

    }, 3800);

});


/* ================= EYE TRACKING ================= */

document.addEventListener("pointermove", function(event) {

    const rect =
        aiToy.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 3;


    let dx =
        (event.clientX - centerX) / 100;

    let dy =
        (event.clientY - centerY) / 100;


    /*
       Limit eye movement.
    */

    dx = Math.max(-5, Math.min(5, dx));
    dy = Math.max(-5, Math.min(5, dy));


    aiToy.style.setProperty(
        "--look-x",
        dx + "px"
    );

    aiToy.style.setProperty(
        "--look-y",
        dy + "px"
    );

});


/* ================= LOOK AT CLICK ================= */

document.addEventListener("pointerdown", function(event) {

    /*
       Don't trigger the look system
       aggressively when clicking inside chat.
    */

    const x =
        event.clientX;

    const y =
        event.clientY;

    const rect =
        aiToy.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 3;


    let headX =
        (x - centerX) / 12;

    let headY =
        (centerY - y) / 18;


    headX =
        Math.max(-12, Math.min(12, headX));

    headY =
        Math.max(-8, Math.min(8, headY));


    aiToy.style.setProperty(
        "--head-x",
        headX + "deg"
    );

    aiToy.style.setProperty(
        "--head-y",
        headY + "deg"
    );


    setTimeout(function() {

        aiToy.style.setProperty(
            "--head-x",
            "0deg"
        );

        aiToy.style.setProperty(
            "--head-y",
            "0deg"
        );

    }, 900);

});


/* ================= AI CHAT ================= */

function openChat() {

    document
        .getElementById("aiChat")
        .classList.add("open");

    helloBubble.classList.add("hide");
}


function closeChat() {

    document
        .getElementById("aiChat")
        .classList.remove("open");
}


/* ================= AI RESPONSES ================= */

function aiQuestion(type) {

    const messages =
        document.getElementById("chatMessages");


    let userText = "";
    let botText = "";


    if (type === "simple") {

        userText = "Tell me about SIMPLE.";

        botText =
            "SIMPLE is ₹2,999 and includes 2–3 pages. " +
            "It is suitable for a small business or shop that needs a professional online presence.";

    }


    if (type === "pro") {

        userText = "Tell me about PRO.";

        botText =
            "PRO is ₹5,999 and includes 5–7 pages. " +
            "It is a strong choice for businesses that need Services, Products, Portfolio, Gallery and FAQ pages.";

    }


    if (type === "max") {

        userText = "Tell me about MAX.";

        botText =
            "MAX is ₹9,999 and includes 10+ pages. " +
            "It is designed for businesses that need a larger premium website with more pages and advanced frontend animations.";

    }


    if (type === "contact") {

        userText = "How can I contact you?";

        botText =
            "Choose a website plan and submit your details. " +
            "Your enquiry will open directly in WhatsApp.";

    }


    addMessage(userText, "user");


    /*
       Typing delay
    */

    setTimeout(function() {

        addMessage(botText, "bot");

    }, 500);

}


function addMessage(text, type) {

    const messages =
        document.getElementById("chatMessages");


    const message =
        document.createElement("div");


    message.className =
        "message " + type;


    message.textContent =
        text;


    messages.appendChild(message);


    messages.scrollTop =
        messages.scrollHeight;
}


/* ================= POLICY ================= */

const policyData = {

    privacy: {

        title: "Privacy Policy",

        content:
        `
        <p>
        AS Jadon Solutions respects your privacy.
        Information submitted through the website enquiry form,
        such as your name, Gmail, mobile number, business name and
        business location, is used only for responding to your enquiry
        and discussing website development services.
        </p>

        <p>
        We do not sell your personal information to third parties.
        Please avoid submitting passwords, OTPs, banking PINs or other
        sensitive credentials through this website.
        </p>
        `
    },


    terms: {

        title: "Terms & Conditions",

        content:
        `
        <p>
        Website development services are provided according to the
        selected plan and the agreed requirements.
        </p>

        <p>
        The SIMPLE, PRO and MAX plans describe the general scope of
        website development. Additional requirements outside the
        selected scope may require a separate discussion and quotation.
        </p>

        <p>
        Hosting, domain, backend systems and databases are not included
        unless separately agreed.
        </p>
        `
    },


    refund: {

        title: "Refund Policy",

        content:
        `
        <p>
        Project payments and refund terms depend on the stage of the
        project and the agreed requirements.
        </p>

        <p>
        Before making any payment, customers should confirm the project
        scope, selected plan and requirements with AS Jadon Solutions.
        </p>

        <p>
        Custom work that has already been completed may not be eligible
        for a full refund.
        </p>
        `
    }

};


function openPolicy(type) {

    const policy =
        policyData[type];

    document.getElementById("policyTitle")
        .textContent = policy.title;

    document.getElementById("policyContent")
        .innerHTML = policy.content;

    document.getElementById("policyModal")
        .classList.add("open");

    document.body.style.overflow = "hidden";
}


function closePolicy() {

    document
        .getElementById("policyModal")
        .classList.remove("open");

    document.body.style.overflow = "";
}


/* ================= MODAL CLICK OUTSIDE ================= */

document
    .getElementById("enquiryModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeEnquiry();
        }

    });


document
    .getElementById("policyModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closePolicy();
        }

    });


/* ================= ESC KEY ================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeEnquiry();
        closePolicy();
        closeChat();

    }

});


/* ================= CARD 3D TILT ================= */

document.querySelectorAll(".plan-card")
    .forEach(function(card) {

        card.addEventListener("mousemove", function(event) {

            if (window.innerWidth < 900) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 3;

            const rotateX =
                -((y - centerY) / centerY) * 3;


            card.style.transform =
                `translateY(-10px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });


        card.addEventListener("mouseleave", function() {

            card.style.transform = "";

        });

    });


/* ================= MOBILE TOUCH FEEL ================= */

document.querySelectorAll(".plan-btn")
    .forEach(function(button) {

        button.addEventListener("touchstart", function() {

            button.style.transform =
                "scale(.97)";

        });

        button.addEventListener("touchend", function() {

            button.style.transform =
                "";

        });

    });
