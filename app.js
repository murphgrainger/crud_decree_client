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
    console.log(id);
    return $.get(`http://localhost:3000/user/${id}`);
}

function getUserDegrees(id) {
    console.log(id);
    return $.get(`http://localhost:3000/user/${id}/degree`);
}

function addUserInfoToPage(user) {
    console.log(user);
    let source = $('#user-template').html();
    let template = Handlebars.compile(source);
    let context = user;
    let html = template(context);
    $('.user-section').html(html);
    return user.id;
}

function addUserDegrees(degree) {
    console.log(degree);
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
