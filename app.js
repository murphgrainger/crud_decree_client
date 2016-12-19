const API_URL = getURL();

$(document).ready(function() {
    const cleanQuery = queryParse(window.location.search);
    getUserInfo(cleanQuery.id)
        .then(addUserInfoToPage)
        .then(getUserDegrees)
        .then(addUserDegrees)
        .catch(errorFunction);
});

function queryParse(query) {
    let obj = {};
    let arr1 = query.substr(1).split('&').forEach((element) => {
        let arr2 = element.split('=');
        obj[arr2[0]] = arr2[1];
    });
    return obj;
}

function getUserInfo(id) {
    return $.get(`${API_URL}/user/${id}`);
}

function getUserDegrees(id) {
    return $.get(`${API_URL}/user/${id}/degree`);
}

function addUserInfoToPage(user) {
    let source = $('#user-template').html();
    let template = Handlebars.compile(source);
    let context = user;
    let html = template(context);
    $('.user-section').html(html);
    return user.id;
}

function addUserDegrees(degree) {
    let source = $('#degree-template').html();
    let template = Handlebars.compile(source);
    let context = {
        degree
    };
    let html = template(context);
    $('.degree-section').html(html);
}

function getURL() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://cruddydegree.herokuapp.com';
    }
}

function errorFunction() {
    alert('An Error Occured');
}
