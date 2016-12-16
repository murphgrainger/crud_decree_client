const API_URL = getURL();

$(document).ready(function() {
    const cleanQuery = queryParse(window.location.search);
    getUserInfo(cleanQuery.id)
        .then(addUserInfoToPage)
        .catch(errorFunction)
});

function queryParse(query) {
    let obj = {}
    let arr1 = query.substr(1).split('&').forEach((element) => {
        let arr2 = element.split('=');
        obj[arr2[0]] = arr2[1];
    })
    return obj;
}

function getUserInfo(id) {
    $.get(`${API_URL}/user/${id}`)
}

function addUserInfoToPage(user) {
    let source = $('#user-template').html();
    let template = Handlebars.compile(source);
    let context = user;
    let html = template(context);
    $('.user-section').html(html);
    return user.id;
}

function getURL() {
    if (window.location.host.indexOf('localhost') != -1) {
        console.log(window.location.host);
        return 'http://localhost:3000'
    } else {
        return 'https://cruddydegree.herokuapp.com'
    }
}

function errorFunction() {
    alert('An Error Occured')
}
