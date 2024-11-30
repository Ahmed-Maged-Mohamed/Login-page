var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var signUpArray = [];

if (localStorage.getItem('users') == null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}

function isEmpty() {
    return signupName && signupEmail && signupPassword &&
           signupName.value.trim() !== "" && 
           signupEmail.value.trim() !== "" && 
           signupPassword.value.trim() !== "";
}

function isEmailExist() {
    return signUpArray.some(user => user.email.toLowerCase() === signupEmail.value.toLowerCase());
}

function signUp() {
    var message = document.getElementById('exist');
    if (!isEmpty()) {
        message.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }
    if (isEmailExist()) {
        message.innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }

    var newUser = {
        name: signupName.value.trim(),
        email: signupEmail.value.trim(),
        password: signupPassword.value.trim()
    };

    signUpArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(signUpArray));

    message.innerHTML = '<span class="text-success m-3">Sign up successful!</span>';
    return true;
}

function isLoginEmpty() {
    return signinEmail && signinPassword &&
           signinEmail.value.trim() !== "" && 
           signinPassword.value.trim() !== "";
}

function login() {
    var message = document.getElementById('incorrect');
    if (!isLoginEmpty()) {
        message.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var email = signinEmail.value.trim();
    var password = signinPassword.value.trim();
    var loggedInUser = signUpArray.find(user =>
        user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (loggedInUser) {
        localStorage.setItem('sessionUsername', loggedInUser.name);

        var pathparts = location.pathname.split('/');
        var baseURL = pathparts.slice(0, -1).join('/');
        location.replace(baseURL + '/home.html');
    } else {
        message.innerHTML = '<span class="text-danger m-3">Incorrect email or password</span>';
    }
}

function displayWelcomeMessage() {
    var username = localStorage.getItem('sessionUsername');
    if (username) {
        var usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.innerHTML = "Welcome " + username;
        }
    }
}

function logout() {
    localStorage.removeItem('sessionUsername');
    var pathparts = location.pathname.split('/');
    var baseURL = pathparts.slice(0, -1).join('/');
    location.replace(baseURL + '/index.html');
}

if (document.getElementById('home')) {
    displayWelcomeMessage();
}
