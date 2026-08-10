/**
 * ==========================================================================
 * PORTFOLIO RUNTIME MOTOR ENGINE - RIFKI (2026)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // RUN CORE RUNTIMES
    executeExperientialLoader();
    setupInteractiveCursor();
    setupNavigationCore();
    executeThreeEngine();
    fetchGithubProfileData();
    setupScrollRevealEngine();
    setup3DTiltEngine();
    setupContactFormEngine();
});

// ==========================================================================
// LOADING SCREEN TIMING CONTROL
// ==========================================================================
function executeExperientialLoader() {
    const loaderProgress = document.getElementById("loaderProgress");
    const loaderStatus = document.getElementById("loaderStatus");
    const loadingScreen = document.getElementById("loadingScreen");
    
    const operationalPhases = [
        { cap: 30, text: "INITIALIZING..." },
        { cap: 65, text: "LOADING 3D EXPERIENCE..." },
        { cap: 90, text: "RENDERING CORE UI..." },
        { cap: 100, text: "SYSTEM ACTIVE" }
    ];
    
    let currentPct = 0;
    const progressTimer = setInterval(() => {
        currentPct += Math.floor(Math.random() * 12) + 2;
        if (currentPct >= 100) {
            currentPct = 100;
            clearInterval(progressTimer);
            
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                loadingScreen.style.visibility = "hidden";
            }, 350);
        }
        
        loaderProgress.style.width = `${currentPct}%`;
        const matchedPhase = operationalPhases.find(phase => currentPct <= phase.cap);
        if (matchedPhase) {
            loaderStatus.innerText = matchedPhase.text;
        }
    }, 50);
}

// ==========================================================================
// INTERACTIVE DESKTOP CURSOR
// ==========================================================================
function setupInteractiveCursor() {
    const cursorNode = document.getElementById("customCursor");
    if (!cursorNode) return;

    window.addEventListener("mousemove", (event) => {
        cursorNode.style.left = `${event.clientX}px`;
        cursorNode.style.top = `${event.clientY}px`;
    });

    const triggerTargets = document.querySelectorAll("a, button, .tilt-element, .stack-icon-card, .nav-toggle");
    triggerTargets.forEach(target => {
        target.addEventListener("mouseenter", () => cursorNode.classList.add("grow-mode"));
        target.addEventListener("mouseleave", () => cursorNode.classList.remove("grow-mode"));
    });
}

// ==========================================================================
// STICKY NAVIGATION BAR & NAVIGATION STATE
// ==========================================================================
function setupNavigationCore() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        // Sticky dynamic glass style
        if (window.scrollY > 40) {
            navbar.classList.add("sticky-scrolled");
        } else {
            navbar.classList.remove("sticky-scrolled");
        }

        // Active state switching matching section
        let activeId = "";
        sections.forEach(section => {
            const sectionOffset = section.offsetTop - 160;
            if (window.scrollY >= sectionOffset) {
                activeId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${activeId}`) {
                item.classList.add("active");
            }
        });
    });

    // Mobile hamburger execution
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-open");
    });
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navMenu.classList.remove("mobile-open");
        });
    });
}

// ==========================================================================
// THREE.JS SETTINGS (FUTURISTIC 3D MATH ENGINE)
// ==========================================================================
function executeThreeEngine() {
    const canvasWrap = document.getElementById("three-canvas-container");
    if (!canvasWrap || typeof THREE === "undefined") return;

    const useMobileOptimized = window.innerWidth < 768;

    // 1. Initial Scene Setup
    const threeScene = new THREE.Scene();

    // 2. Perspective Camera Configuration
    const coreCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    coreCamera.position.z = 5;

    // 3. Optimized Renderer Creation
    const glRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: !useMobileOptimized });
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasWrap.appendChild(glRenderer.domElement);

    // 4. Geometry Generation - Interactive Technology Matrix Sphere
    const centralGeometry = new THREE.SphereGeometry(1.4, useMobileOptimized ? 10 : 18, useMobileOptimized ? 10 : 18);
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x7C3AED,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const networkSphereMesh = new THREE.Mesh(centralGeometry, wireMaterial);
    
    // Shift position right on wide screens to framing text
    if (!useMobileOptimized) {
        networkSphereMesh.position.x = 1.4;
    }
    threeScene.add(networkSphereMesh);

    // 5. Particle Systems Construction
    const countParticles = useMobileOptimized ? 35 : 140;
    const geometryBuffer = new THREE.BufferGeometry();
    const arrayCoordinates = new Float32Array(countParticles * 3);

    for (let index = 0; index < countParticles * 3; index++) {
        arrayCoordinates[index] = (Math.random() - 0.5) * 12;
    }
    geometryBuffer.setAttribute('position', new THREE.BufferAttribute(arrayCoordinates, 3));

    const materialPoints = new THREE.PointsMaterial({
        color: 0x06B6D4,
        size: useMobileOptimized ? 0.03 : 0.06,
        transparent: true,
        opacity: 0.5
    });
    const fieldPointsGroup = new THREE.Points(geometryBuffer, materialPoints);
    threeScene.add(fieldPointsGroup);

    // 6. Lighting configuration
    const environmentalLight = new THREE.AmbientLight(0xffffff, 0.6);
    threeScene.add(environmentalLight);

    // 7. Parallax Track Variables
    let dynamicX = 0, dynamicY = 0;
    let interpolatedX = 0, interpolatedY = 0;

    if (!useMobileOptimized) {
        window.addEventListener("mousemove", (event) => {
            dynamicX = (event.clientX / window.innerWidth) - 0.5;
            dynamicY = (event.clientY / window.innerHeight) - 0.5;
        });
    }

    // Adapt layout context
    window.addEventListener("resize", () => {
        coreCamera.aspect = window.innerWidth / window.innerHeight;
        coreCamera.updateProjectionMatrix();
        glRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 8. Animation Engine
    const systemClock = new THREE.Clock();

    function renderLoop() {
        requestAnimationFrame(renderLoop);
        const timeElapsed = systemClock.getElapsedTime();

        // Object Auto-rotations
        networkSphereMesh.rotation.y = timeElapsed * 0.08;
        networkSphereMesh.rotation.x = timeElapsed * 0.04;
        fieldPointsGroup.rotation.y = timeElapsed * 0.02;

        // Mouse interpolation smoothing calculation
        interpolatedX += (dynamicX - interpolatedX) * 0.08;
        interpolatedY += (dynamicY - interpolatedY) * 0.08;

        networkSphereMesh.position.x = (useMobileOptimized ? 0 : 1.4) + (interpolatedX * 0.8);
        networkSphereMesh.position.y = -(interpolatedY * 0.8);

        glRenderer.render(threeScene, coreCamera);
    }
    renderLoop();
}

// ==========================================================================
// PROJECTS: REAL GITHUB DYNAMIC COUNTER
// ==========================================================================
function fetchGithubProfileData() {
    const countNode = document.getElementById("repo-count-val");
    if (!countNode) return;

    fetch("https://api.github.com/users/Ikyygalauu")
        .then(res => {
            if (!res.ok) throw new Error("API limits");
            return res.json();
        })
        .then(profileData => {
            if (profileData && profileData.public_repos !== undefined) {
                countNode.innerText = profileData.public_repos;
            } else {
                countNode.innerText = "3";
            }
        })
        .catch(() => {
            // Secure fallback data fallback
            countNode.innerText = "3";
        });
}

// ==========================================================================
// SCROLL REVEAL MOTION CONTROL
// ==========================================================================
function setupScrollRevealEngine() {
    const standardRevealBlocks = document.querySelectorAll(".scroll-reveal");

    function evaluationLoop() {
        const bottomBorderBound = window.innerHeight * 0.88;
        standardRevealBlocks.forEach(block => {
            const distanceTop = block.getBoundingClientRect().top;
            if (distanceTop < bottomBorderBound) {
                block.classList.add("revealed-active");
            }
        });
    }
    window.addEventListener("scroll", evaluationLoop);
    evaluationLoop();
}

// ==========================================================================
// CONTACT FORM: SENDS SUBMISSIONS TO DESTINATION EMAIL VIA FORMSUBMIT.CO
// ==========================================================================
function setupContactFormEngine() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    // Destination email address - change this to redirect submissions elsewhere
    const DESTINATION_EMAIL = "naook1nssv@gmail.com";
    const FORM_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

    const submitBtn = document.getElementById("formSubmitBtn");
    const statusMsg = document.getElementById("formStatusMsg");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Honeypot check - if filled, silently drop (likely a bot)
        const honeypotField = contactForm.querySelector('[name="_honey"]');
        if (honeypotField && honeypotField.value.trim() !== "") {
            return;
        }

        const formData = new FormData(contactForm);

        submitBtn.disabled = true;
        submitBtn.querySelector(".btn-text").innerText = "SENDING...";
        statusMsg.innerText = "";
        statusMsg.className = "form-status-msg";

        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: formData
        })
            .then(res => {
                if (!res.ok) throw new Error("Send failed");
                return res.json();
            })
            .then(() => {
                statusMsg.innerText = "Message sent successfully! I'll get back to you soon.";
                statusMsg.classList.add("status-success");
                contactForm.reset();
            })
            .catch(() => {
                statusMsg.innerText = "Something went wrong. Please try again or email me directly.";
                statusMsg.classList.add("status-error");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.querySelector(".btn-text").innerText = "SEND MESSAGE";
            });
    });
}

// ==========================================================================
// PREMIUM 3D TILT EFFECT IN CARDS & WRAPPERS
// ==========================================================================
function setup3DTiltEngine() {
    if (window.innerWidth < 992) return; // Deactivate on tablets/mobile

    const reactiveElements = document.querySelectorAll(".tilt-element");
    reactiveElements.forEach(item => {
        item.addEventListener("mousemove", (event) => {
            const layoutData = item.getBoundingClientRect();
            const centerPointX = event.clientX - layoutData.left - (layoutData.width / 2);
            const centerPointY = event.clientY - layoutData.top - (layoutData.height / 2);
            
            // Limit degrees max tilt
            const calculatedX = -(centerPointY / (layoutData.height / 2)) * 8;
            const calculatedY = (centerPointX / (layoutData.width / 2)) * 8;

            item.style.transform = `perspective(1000px) rotateX(${calculatedX}deg) rotateY(${calculatedY}deg)`;
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    });
}