var mainText = document.getElementById("mainText");
var mainDate = document.getElementById("date");
mainDate.value = getDate();
var notesArray = [];
var noteImageURL = "images/yellowstickyNote.png";
var notesBoard = document.getElementById("notesBoard");
var notesRow = document.getElementById("row1");
var errorMessage = document.getElementById("error_message");

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function note(text, date) {
    this.text = text;
    this.date = date;
}

function fadeInEffect(target) {
    var fadeTarget = target;
    var opacity = 0;
    var fadeInEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = opacity;
        }
        if (fadeTarget.style.opacity < 1.1) {
            opacity += 0.1;
            fadeTarget.style.opacity = opacity;
        } else {
            clearInterval(fadeInEffect);
        }
    }, 50);
}

function fadeOutEffect(target) {
    var fadeTarget = target;
    var opacity = 1;
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = opacity;
        }
        if (fadeTarget.style.opacity > 0) {
            opacity -= 0.1;
            fadeTarget.style.opacity = opacity;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}

function updateStorage(notes) {
    localStorage.setItem("notesArray", JSON.stringify(notes));
}

function getStorage() {
    if (localStorage.getItem("notesArray")) {
        return JSON.parse(localStorage.getItem("notesArray"));
    }
    else {
        return [];
    }

}
function cleanForm() {
    mainDate.value = getDate();
    mainText.value = "";
}

function clearErrorMessage() {
    errorMessage.style.display = "none";
}

function addNote() {
    if (mainText.value.trim() == "" || date.value == "") {
        errorMessage.style.display = "inline";
    }
    else {
        var currentNote = new note(mainText.value, date.value);
        cleanForm();
        notesArray.push(currentNote);
        updateStorage(notesArray);
        showNote(notesArray.length - 1, true);
    }
}

function deleteNote() {
    var currentNote = event.target.closest(".noteContainer");
    fadeOutEffect(currentNote);
    setTimeout(function () {
        notesArray.splice(currentNote.id, 1);
        updateStorage(notesArray);
        showNotes(notesArray);
    }, 500)
}

function showNotes(notesArray) {
    notesRow.innerHTML = "";
    for (let i = 0; i < notesArray.length; i++) {
        showNote(i, false);
    }
}

function showNote(i, fade) {
    var div = document.createElement("div");
    var noteDiv = document.createElement("div");
    var delIcon = document.createElement("div");
    delIcon.innerHTML = '<i class="fas fa-trash"></i>';
    delIcon.classList.add("delete", "btn", "btn-danger");
    delIcon.addEventListener("click", deleteNote);
    div.id = i;
    div.classList.add("col-4", "noteContainer");
    noteDiv.classList.add("note");
    var textDiv = document.createElement("textarea");
    textDiv.disabled = true;
    var dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    textDiv.classList.add("notetext");
    textDiv.textContent = notesArray[i].text;
    dateDiv.innerText = notesArray[i].date;
    div.appendChild(noteDiv);
    noteDiv.appendChild(textDiv);
    noteDiv.appendChild(dateDiv);
    noteDiv.appendChild(delIcon);
    notesRow.appendChild(div);
    if (fade) {
        noteDiv.classList.add("no_opacity");
        fadeInEffect(noteDiv);
    }

}

function onLoad() {
    notesArray = getStorage();
    showNotes(notesArray);
}

onLoad();
