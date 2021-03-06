const crypto = require('crypto');
const fs = require('fs');

var secret = '0b4f5beb5f1714d9ba2fcf0c7e939d54b09e7447e7108ba1dbc610870f9052dc7d0656f706fb28556960e63a7cb34c32f82554986fe76c44fbbf36afd7bf2d96';
var nonce = Date.now();
var requestPath = "https://dev-api.shrimpy.io/v1/exchanges/kucoin/ticker";
var method = "GET";

// create the prehash string by concatenating required parts
var prehashString = requestPath + method + nonce;

// decode the base64 secret
var key = Buffer.from(secret, 'base64');

// create a sha256 hmac with the secret
var hmac = crypto.createHmac('sha256', key);

// hash the prehash string and base64 encode the result
const signature = hmac.update(prehashString).digest('base64');

const init = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'DEV-SHRIMPY-API-KEY': 'fe2e52350789d707a21f652bc6f7fa373f3ff77770d68b795894abea67e9d653',
        'DEV-SHRIMPY-API-NONCE': nonce,
        'DEV-SHRIMPY-API-SIGNATURE': signature,
    }
}

// Get crypto data from Shrimpy-api.
async function getTicker() {
    try {

        const res = await fetch(requestPath, init);

        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const coins = await res.json();

        // console.log(coins.length);

        console.log('Bitcoin: ', coins[0].priceUsd);

        // Creating coinDetails
        let coinDetails = [];
        let genericPath = '../node_modules/cryptocurrency-icons/svg/color/';
        let defaultPath = '../logo/logo.svg';

        coins.forEach((coin, index) => {
            // console.log(`${index}: ${coin.name} USD ${coin.priceUsd}`);

            let item = {};
            item.coinName = coin.name;
            item.coinSymbol = coin.symbol;
            item.coinPrice = coin.priceUsd;

            // For coinIcon
            let symbol = coin.symbol.toLowerCase();
            let requiredPath = genericPath + `${symbol}.svg`;

            // if (!fs.existsSync(requiredPath)) {
            //     requiredPath = defaultPath;
            // }

            item.coinIcon = requiredPath;

            // console.log(item);

            coinDetails.push(item);

            // console.log(coinDetails.length);
        });

        // console.log(coinDetails.length);

        chrome.storage.local.set({ coinDetails });


    }

    catch (err) {
        console.log(err);
    }
}


chrome.runtime.onInstalled.addListener(async () => {

    await getTicker();

});



chrome.alarms.onAlarm.addListener(async function (alarm) {
    console.log("Alarm received at: ", Date());

    await getTicker();

    console.log('The current set price and bitcoin price must be same. Hence prices updated');

    chrome.runtime.sendMessage('updated-crypto-data', function (res) {
        console.log(res);
        if (res == undefined){
            console.log('popup.js is dead');
            chrome.alarms.clear('get-crypto-data', (wasCleared) => console.log('Alarm is cleared: ', wasCleared));
        }
    });


});

