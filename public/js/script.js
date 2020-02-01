var baseUrl = 'http://tweet-api.webdxd.com/'

var prependTweet = (tweet) => {
    let tweetContainer = $('<div>').addClass('tweet').prependTo($('#tweet-list'))
    let row = $('<div>').addClass('row').appendTo(tweetContainer)
    $('<img>')
        .addClass('tweet-avatar')
        .attr({
            'src': tweet.author.avatarUrl,
            'alt': 'avatar'
        })
        .appendTo(row)
    $('<h4><b>' + tweet.author.name + '</b></h4>').appendTo(row)
    $('<h5>@' + tweet.author.username + '</h5>').appendTo(row)
    $('<h5>').text(moment(tweet.createdAt).calendar()).appendTo(row)
    $('<p>').text(tweet.content).appendTo(tweetContainer)
}

$.ajax({
    type: 'GET',
    url: baseUrl + 'tweet',
    success: (data) => {
        for (tweet of data.tweets) {
            prependTweet(tweet)
        }
    },
    error: (err) => {
        console.log(err)
    }
})

$('#login-btn').click(() => {

    $('.error-msg').remove()
    $('.input-alert').removeClass('input-alert')

    let user = {
        username: $('#username').val(),
        password: $('#password').val()
    }

    if (!user.username) {
        // make the input red, add error message
        $('#username').addClass('input-alert').before(
            $('<span>').addClass('error-msg').text('Username required')
        )
    } else if (!user.password) {
        // make the input red, add error message
        $('#password').addClass('input-alert').before(
            $('<span>').addClass('error-msg').text('Password required')
        )
    } else {
        $.ajax({
            type: 'POST',
            url: baseUrl + 'auth/login',
            data: user,
            success: (data) => {
                if (data.success) {
                    console.log(data)
                    localStorage.token = data.token
                    localStorage.user = JSON.stringify(data.profile)
                    window.location.replace('/index.html')
                } else {
                    $('#login-btn').after($('<p>').addClass('error-msg').text('Username and password do not match.'))
                }
            },
            error: () => {
                console.log('Login failed.')
            }
        })
    }
})



$('#signup-btn').click(() => {

    $('.error-msg').remove()
    $('.input-alert').removeClass('input-alert')

    let user = {
        username: $('#username').val(),
        password: $('#password').val(),
    }

    if (!user.username) {
        // make the input red, add error message
        $('#username').addClass('input-alert').before(
            $('<span>').addClass('error-msg').text('Username required')
        )
    } else if (!user.password) {
        // make the input red, add error message
        $('#password').addClass('input-alert').before(
            $('<span>').addClass('error-msg').text('Password required')
        )
    } else if (user.password !== $('#repeat-password').val()) {
        $('#repeat-password').addClass('input-alert').before(
            $('<span>').addClass('error-msg').text('Passwords do not match')
        )
    } else {
        $.ajax({
            type: 'POST',
            url: baseUrl + 'auth/signup',
            data: user,
            success: (data) => {
                if (data.success) {
                    localStorage.token = data.token
                    localStorage.user = JSON.stringify(data.profile)
                    window.location.replace('/index.html')
                } else {
                    $('#signup-btn').after($('<p>').addClass('error-msg').text('User exists'))
                }
            },
            error: () => {
                console.log('Signup failed.')
            }
        })
    }
})

var user = {}

if (localStorage.user) {
    user = JSON.parse(localStorage.user)
    $('.avatar-sm, .avatar').attr('src', user.avatarUrl)
    let profile = $('.profile')
    $('<h3>').text(user.name).appendTo(profile)
    $('<h5>').text('@' + user.username).appendTo(profile)
    user.location && $('<h4><i class="fas fa-map-marker-alt"></i> ' + user.location + '</h4>').appendTo(profile)
    user.bio && $('<p>').addClass('center').text(user.bio)
}

$('#post-btn').click(() => {
    $.ajax({
        type: 'POST',
        url: baseUrl + 'tweet',
        data: {
            content: $('#tweet-content').val()
        },
        beforeSend: (xhr) => {
            localStorage.token && xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token)
        },
        success: (data) => {
            if (data.success) {
                // insert tweet to current tweet list  
                $('#tweet-form').trigger('reset')
                prependTweet(data.tweet)
            } else {
                console.log(data.error)
            }
        },
        error: () => {
            console.log('Post failed')
        }
    })
})