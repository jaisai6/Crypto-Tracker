import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


chrome.storage.local.get('coinDetails', ({coinDetails}) => {

    console.log(coinDetails.length);

    coinDetails.forEach(coinDetail => {
        console.log(coinDetail.coinName, coinDetail.coinSymbol, coinDetail.coinIcon);
    });
});

// Modify the DOM to display the list of coins.






