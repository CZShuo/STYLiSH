function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
    //console.log('statusChangeCallback');
    //console.log(response); // The current login status of the person.
    if (response.status === 'connected') { // Logged into your webpage and Facebook.
        testAPI();
    } else { // Not logged into your webpage or we are unable to tell.
        // document.getElementById('status').innerHTML = 'Please log into this webpage.';
        //console.log('Not connected.');
    }
}


function checkLoginState() { // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) { // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '545389312813011',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: 'v7.0' // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};


(function (d, s, id) { // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    //console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        //console.log('Successful login for: ' + response.name);
        // document.getElementById('status').innerHTML =
        //     'Thanks for logging in, ' + response.name + '!';
    });
}


function logStatus() {
    FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
        if (response.status === 'connected') {
            FB.logout(function(respons) {
                // Person is now logged out
                localStorage.removeItem('profile');
                renderProfile();
            });
            
        } else {
            //console.log('Not logged in');

            FB.login(function (response) {
                // handle the response
                localStorage.setItem('response', JSON.stringify(response));
                FB.api(
                    '/me',
                    'GET', {
                        fields: "id,name,email,picture"
                    },
                    function (respons) {
                        if(response.status==="connected"){
                            localStorage.setItem('profile', JSON.stringify(respons));
                            renderProfile();
                        }
                    }
                );
            },{scope: 'public_profile, email'});
            
        }
    });
}


// FB.logout(function(response) {
//     // Person is now logged out
//  });