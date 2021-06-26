import {config} from '../node_modules/dotenv/lib/main.js';

config();

import crypto from 'crypto';

import {ShrimpyApiClient} from '../node_modules/shrimpy-node/dist/index.js';

const client = new ShrimpyApiClient(process.env.PUBLIC_KEY, process.env.PRIVATE_KEY);


async function getCandles(){
    try {
        
        const ticker = await client.getTicker(
            'kucoin' // exchange
        );

        // console.log(ticker);

        console.log(ticker.filter(data => data.name === 'Ethereum'));
        

    } catch (err) {
        console.log(err);
    }
}

getCandles();





// Step 1 Create user
// const user_url = 'https://dev-api.shrimpy.io/v1/users/494b5dc0-aa9d-4320-9835-70f713942785/keys';
// fetch(user_url,{method: 'POST', headers: {'Content-Type': 'application/json'}})
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// console.log(user);

// async function getUserApiKey(){

//     try {
//         const apiKeys = await client.createApiKeys(
//             '494b5dc0-aa9d-4320-9835-70f713942785' // userId
//         );

//         console.log(apiKeys);
//     } catch (error) {
//         console.log(error);
//     }

// }

// getUserApiKey();








