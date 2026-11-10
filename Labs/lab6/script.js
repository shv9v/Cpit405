var likes = 0;
var dislikes = 0;
var comments = [];

var likeButton = document.getElementById("likeButton");
var dislikeButton = document.getElementById("dislikeButton");
var commentButton = document.getElementById("commentButton");
var resetButton = document.getElementById("resetButton");

// Set a cookie
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; max-age=86400";
}

// Get a cookie
function getCookie(name) {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }

    return "";
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; path=/; max-age=0";
}

// Update counters
function updateCounts() {
    document.getElementById("likeCount").innerText = likes;
    document.getElementById("dislikeCount").innerText = dislikes;
}

// Display comments
function displayComments() {
    var commentsElem = document.getElementById("comments");
    commentsElem.innerHTML = "";

    comments.forEach(function(comment) {
        var p = document.createElement("p");
        p.innerText = comment;
        commentsElem.appendChild(p);
    });
}

// Load data from cookies
function loadData() {
    likes = Number(getCookie("likes")) || 0;
    dislikes = Number(getCookie("dislikes")) || 0;

    var savedComments = getCookie("comments");

    if (savedComments != "") {
        comments = JSON.parse(savedComments);
    }

    updateCounts();
    displayComments();
}

// Like button
likeButton.addEventListener("click", function() {
    if (getCookie("vote") == "") {
        likes++;

        setCookie("likes", likes);
        setCookie("vote", "like");

        updateCounts();
    } else {
        alert("You have already voted!");
    }
});

// Dislike button
dislikeButton.addEventListener("click", function() {
    if (getCookie("vote") == "") {
        dislikes++;

        setCookie("dislikes", dislikes);
        setCookie("vote", "dislike");

        updateCounts();
    } else {
        alert("You have already voted!");
    }
});

// Submit comment
commentButton.addEventListener("click", function() {
    var comment = document.getElementById("commentInput").value.trim();

    if (getCookie("commented") != "") {
        alert("You have already commented!");
    } else if (comment != "") {
        comments.push(comment);

        setCookie("comments", JSON.stringify(comments));
        setCookie("commented", "yes");

        displayComments();

        document.getElementById("commentInput").value = "";
    }
});

// Reset button
resetButton.addEventListener("click", function() {
    likes = 0;
    dislikes = 0;
    comments = [];

    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("vote");
    deleteCookie("comments");
    deleteCookie("commented");

    updateCounts();
    displayComments();

    document.getElementById("commentInput").value = "";
});

// Load saved data
loadData();
