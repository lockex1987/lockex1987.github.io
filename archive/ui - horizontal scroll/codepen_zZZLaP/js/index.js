var SETTINGS = {
    navBarTravelling: false,
    navBarTravelDirection: "",
	navBarTravelDistance: 150
};

// Out advancer buttons
var pnAdvancerLeft = document.getElementById("pnAdvancerLeft");
var pnAdvancerRight = document.getElementById("pnAdvancerRight");

// The indicator
var pnIndicator = document.getElementById("pnIndicator");

// The container and the content
var pnProductNav = document.getElementById("pnProductNav");
var pnProductNavContents = document.getElementById("pnProductNavContents");

function checkOverflow() {
    pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
}

// Handle the scroll of the horizontal container
function checkOverflowWhenScroll() {
    var ticking = false;
    pnProductNav.addEventListener("scroll", function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkOverflow();
                ticking = false;
            });
        }
        ticking = true;
    });
}

pnAdvancerLeft.addEventListener("click", function() {
	// If in the middle of a move return
    if (SETTINGS.navBarTravelling === true) {
        return;
    }

    // If we have content overflowing both sides or on the left
    if (determineOverflow(pnProductNavContents, pnProductNav) === "left" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
        // Find how far this panel has been scrolled
        var availableScrollLeft = pnProductNav.scrollLeft;
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
            pnProductNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
        } else {
            pnProductNavContents.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
        }

        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");

        // Update our settings
        SETTINGS.navBarTravelDirection = "left";
        SETTINGS.navBarTravelling = true;
    }

    // Now update the attribute in the DOM
    checkOverflow();
});

pnAdvancerRight.addEventListener("click", function() {
    // If in the middle of a move return
    if (SETTINGS.navBarTravelling === true) {
        return;
    }

    // If we have content overflowing both sides or on the right
    if (determineOverflow(pnProductNavContents, pnProductNav) === "right" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
        // Get the right edge of the container and content
        var navBarRightEdge = pnProductNavContents.getBoundingClientRect().right;
        var navBarScrollerRightEdge = pnProductNav.getBoundingClientRect().right;
        // Now we know how much space we have available to scroll
        var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
            pnProductNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
        } else {
            pnProductNavContents.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
        }

        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");

        // Update our settings
        SETTINGS.navBarTravelDirection = "right";
        SETTINGS.navBarTravelling = true;
    }

    // Now update the attribute in the DOM
    checkOverflow();
});

pnProductNavContents.addEventListener("transitionend", function() {
    // Get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
    var styleOfTransform = window.getComputedStyle(pnProductNavContents, null);
    var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
    // If there is no transition we want to default to 0 and not null
    var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
    pnProductNavContents.style.transform = "none";
    pnProductNavContents.classList.add("pn-ProductNav_Contents-no-transition");
    // Now lets set the scroll position
    if (SETTINGS.navBarTravelDirection === "left") {
        pnProductNav.scrollLeft = pnProductNav.scrollLeft - amount;
    } else {
        pnProductNav.scrollLeft = pnProductNav.scrollLeft + amount;
    }
    SETTINGS.navBarTravelling = false;
});

function setActiveLink() {
    // Handle setting the currently active link
    pnProductNavContents.addEventListener("click", function(e) {
        document.querySelectorAll(".pn-ProductNav_Link").forEach(function(item) {
            item.setAttribute("aria-selected", "false");
        })
        e.target.setAttribute("aria-selected", "true");
    });
}

function init() {
    setActiveLink();
    checkOverflowWhenScroll();
    checkOverflow();
}

init();

function determineOverflow(content, container) {
    var containerMetrics = container.getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content.getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);
	 if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}
