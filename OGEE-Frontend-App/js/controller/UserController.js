$(function() {
    loginUserSetName();
})

const emailRegex = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

$('#btnSignUp').click(function () {

    let signUpEmail = $('#signUpEmail').val();
    let signUpUsername = $('#signUpUsername').val();
    let signUpPassword = $('#signUpPassword').val();

    if (signUpEmail === '' || signUpEmail == null) {
        alert("Please enter your email address!");
        $('#signUpEmail').css({
            'border': '2px solid red'
        });
    } else {
        if (emailRegex.test(signUpEmail)) {
            $('#signUpEmail').css({
                'border': '2px solid #0D6EFD '
            });
            if (signUpUsername === '' || signUpUsername == null) {
                alert("Please enter your username!");
                $('#signUpUsername').css({
                    'border': '2px solid red'
                });
            } else {
                $('#signUpUsername').css({
                    'border': '2px solid #0D6EFD '
                });
                if (signUpPassword === '' || signUpPassword == null) {
                    $('#signUpPassword').css({
                        'border': '2px solid red '
                    });
                    alert("Please enter your password!");
                } else {
                    if (passwordRegex.test(signUpPassword)) {
                        $('#signUpPassword').css({
                            'border': '2px solid #0D6EFD'
                        });

                        userRegister();

                    } else {
                        $('#signUpPassword').css({
                            'border': '2px solid red '
                        });
                        alert("Please enter valid password");
                    }
                }
            }
        } else {
            $('#loginEmail').css({
                'border': '2px solid red'
            });
            alert("Invalid Email Address!")
        }
    }

});
$('#btnLogin').click(function () {

    let userEmail = $('#loginEmail').val();
    let userPassword = $('#loginPassword').val();

    if (userEmail === '' || userEmail == null) {
        alert("Please enter your email address!");
        $('#loginEmail').css({
            'border': '2px solid red'
        });
    } else {
        if (emailRegex.test(userEmail)) {
            $('#loginEmail').css({
                'border': '2px solid #0D6EFD '
            });
            if (userPassword === '' || userPassword == null) {
                $('#loginPassword').css({
                    'border': '2px solid red '
                });
                alert("Please enter your password!");
            } else {
                if (passwordRegex.test(userPassword)) {
                    $('#loginPassword').css({
                        'border': '2px solid #0D6EFD'
                    });

                    userLogin();

                } else {
                    $('#loginPassword').css({
                        'border': '2px solid red '
                    });
                    alert("Please enter valid password");
                }
            }
        } else {
            $('#loginEmail').css({
                'border': '2px solid red'
            });
            alert("Invalid Email Address!")
        }
    }
});

function userRegister() {
    let signUpEmail = $('#signUpEmail').val();
    let signUpUsername = $('#signUpUsername').val();
    let signUpPassword = $('#signUpPassword').val();

    const userRegister = `http://localhost:8800/api/user-save`;

    $.ajax({
        method: "POST",
        url: userRegister,
        dataType: 'Json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            username: signUpUsername,
            email: signUpEmail,
            password: signUpPassword
        }),
        success: function (res) {
            if (res.message === 'Already Register User! Please login'){
                alert(res.message);
            }else{
                alert(res.message);
                window.location.href = '../../OGEE-Frontend-App/common/OGEE.html'
            }
        },
        error: function (ob, textStatus, error) {
        }
    });
}

function userLogin() {
    let userEmail = $('#loginEmail').val();
    let userPassword = $('#loginPassword').val();
    const userLoginURL = `http://localhost:8800/api/user-login/${userEmail}/${userPassword}`;
    try {
        $.ajax({
            method: "get",
            url: userLoginURL,
            async: true,
            dataType: 'json',
            success: function (res) {
                if (res.message === 'User Password Incorrect!'){
                    alert(res.message);
                }else{
                    alert(res.message);
                    loginUserSetName();
                    window.location.href = '../../OGEE-Frontend-App/common/OGEE.html'
                }
            },
        });
    } catch (err) {
    }
}

function loginUserSetName(){
    try{
        fetch('../temp/user-login-logs.txt')
            .then(response => response.text())
            .then(text => {
                if (text === null){

                }else {
                    $("#LOGIN_USERNAME").html(text);
                }
            });
    }catch (err){
        console.log("error " + err.toString());
    }
}