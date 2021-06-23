
window.onload = function () {

    chrome.storage.sync.get("signedIn", ({ signedIn }) => {
        console.log('From login.js: ',signedIn);
        if (signedIn)
            location.assign('popup.html');

        else {
            document.querySelector('button').addEventListener('click', function () {

                chrome.identity.getAuthToken({ interactive: true }, async function (token) {

                    const init = {
                        method: 'GET',
                        async: true,
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        'contentType': 'json'
                    };


                    const url = 'https://www.googleapis.com/gmail/v1/users/me/profile?access_token=' + token;

                    const res = await fetch(url, init);
                    const data = await res.json();

                    // console.log(data);

                    const email = data.emailAddress;
                    chrome.storage.sync.set({email});

                    signedIn = true;
                    chrome.storage.sync.set({ signedIn });
                    location.assign('popup.html');

                });

            });
        }

    });

};


