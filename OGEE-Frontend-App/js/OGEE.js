//----------Signup--------------
const form = document.querySelectorAll('.forms'),
    pwShowHide = document.querySelectorAll('.eye-icon'),
    links = document.querySelectorAll('.elink');
// ------------Side Bar-----------------
const leftsideItems = document.querySelectorAll('.leftside-item');

const createGroupBtn = document.getElementById("create-group-btn");
const createGroupContainer = document.getElementById("create-group-container");
const closeBtn = document.querySelector(".close-btn");


//-------------Theme------------
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.theme-color span');
const Background_color1 = document.querySelector('.background-color-1');
const Background_color2 = document.querySelector('.background-color-2');



//-----------signup--------------
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        form.forEach(form => form.classList.toggle('show-signup'));
    })
})


//----------remove active class from all menu items-------
const changerActiveItem = () => {
    leftsideItems.forEach(item => {
        item.classList.remove('select');
    })
}


leftsideItems.forEach(item => {
    item.addEventListener('click', () => {
        changerActiveItem();
        item.classList.add('select');

        if (item.id != 'notification') {
            document.querySelector('.notification-pop-up').
                style.display = 'none';
        } else {
            document.querySelector('.notification-pop-up').
                style.display = 'block';

            document.querySelector('#notification .notifi-count').
                style.display = 'none';
        }
    })
})

//-------------Theme Customization-----------------

//open modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

//close modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);


//--------font Size----------


//----------remove active class from span-------

const removeSizeSelector = () => {
    fontSize.forEach(size => {
        size.classList.remove('select');
    })
}


fontSize.forEach(size => {

    size.addEventListener('click', () => {

        removeSizeSelector();
        let fontSize;
        size.classList.toggle('select');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top: 5.4rem', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top: 5.4rem', '5.4rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top: 5.4rem', '-2rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top: 5.4rem', '-5rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top: 5.4rem', '-12rem');
        }

        document.querySelector('html').style.fontSize = fontSize;

    })
})

//----------remove active class from color-------
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('select');
    })
}

//----------Change Color----------

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass();

        if (color.classList.contains('theme-1')) {
            primaryHue = 252;
            color.classList.add('select');
        } else if (color.classList.contains('theme-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('theme-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('theme-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('theme-5')) {
            primaryHue = 202;
        }
        color.classList.add('select');

        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})


//------------change background theme----------

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//-----changes background color
const changeBackground_color = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

//change background color
Background_color1.addEventListener('click', () => {
    lightColorLightness = '95%';
    whiteColorLightness = '100%';
    darkColorLightness = '0%';
    //add active class
    Background_color1.classList.add('select');

    //remove avtive class from Others
    Background_color2.classList.remove('select');
    changeBackground_color();
    //remove customized changes from local storage
    // window.location.reload();
});

Background_color2.addEventListener('click', () => {
    lightColorLightness = '15%';
    whiteColorLightness = '20%';
    darkColorLightness = '95%';

    //add active class
    Background_color2.classList.add('select');
    //remove avtive class from Others
    Background_color1.classList.remove('select');

    changeBackground_color();
});

var ellipsisIcon = document.getElementById("ellipsis-icon");
var modalElement = document.getElementById("modal");

ellipsisIcon.addEventListener("click", function () {
    modalElement.style.display = "block";
});

//update and delete
window.onload = function () {
    // Get the modal element
    var modalElement = document.getElementById("modal");

    // When the user clicks anywhere outside of the modal, close the modal
    window.onclick = function (event) {
        if (event.target == modalElement) {
            modalElement.style.display = "none";
        }
    }
}

//Create group
createGroupBtn.addEventListener("click", function () {
    createGroupContainer.style.display = "block";
});

closeBtn.addEventListener("click", function () {
    createGroupContainer.style.display = "none";
});

//create post
var createPostBtn = document.getElementById("createPostBtn");
var createPostModal = document.getElementById("createPostModal");
var cancelBtn = document.getElementById("cancelBtn");

createPostBtn.onclick = function () {
    createPostModal.style.display = "block";
}

cancelBtn.onclick = function () {
    createPostModal.style.display = "none";
}


document.onclick = function (event) {
    if (event.target == createPostModal) {
        createPostModal.style.display = "none";
    }
}

//group post
document.addEventListener("DOMContentLoaded", function () {
    var groupNameElements = document.querySelectorAll(".group-name");
    groupNameElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var modal = document.getElementById("middle-Group-ID");
            modal.style.display = "block";
            document.getElementById("group-name-in-modal").innerHTML = this.querySelector(".group-title").innerHTML;
        });
    });
});
document.addEventListener("click", function (event) {
    var modal = document.getElementById("middle-Group-ID");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

//group post add
var addPostBtns = document.querySelectorAll(".add-post");
var createGroupPostModal = document.getElementById("createGroupPostModal");
var canceladBtn = document.getElementById("canceladdBtn");

for (var i = 0; i < addPostBtns.length; i++) {
    addPostBtns[i].onclick = function () {
        createGroupPostModal.style.display = "block";
        var groupTitle = this.parentElement.querySelector(".group-title").innerHTML;
        document.getElementById("sharePostGroupName").innerHTML = groupTitle;
    }
}

canceladBtn.onclick = function () {
    createGroupPostModal.style.display = "none";
}
