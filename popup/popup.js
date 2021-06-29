//*******************************************************************************************

var dropdown,searchInputDropdown,dropdownOptions,images;

dropdown  = document.querySelector('.table-body');

// Update the cryptocurrency prices
function CreateTable()
{
  chrome.storage.local.get('coinDetails', ({coinDetails}) => {

    // console.log('Coin Details length: ', coinDetails.length);

    coinDetails.forEach(coinDetail => {
        // console.log(coinDetail.coinName, coinDetail.coinSymbol, coinDetail.coinIcon, coinDetail.coinPrice);

        var row = document.createElement('TR');
        row.className = 'table-item';

        //LOGO
        var logo = document.createElement('TD');
        logo.className = 'item-logo';

        var img = document.createElement('IMG');
        img.src = coinDetail.coinIcon;
        img.className = 'item-logo';
        img.alt = 'img';
        // img.onerror = "this.src = '../logo/logo.svg';";

        logo.appendChild(img);

        //NAME
        var name = document.createElement('TD');
        name.textContent = coinDetail.coinName;
        name.className = 'item-name';

        //SYMBOL
        var symbol = document.createElement('TD');
        symbol.textContent = coinDetail.coinSymbol;
        symbol.className = 'item-symbol';

        //PRICE
        var price = document.createElement('TD');
        price.textContent = '$' + (Math.round(coinDetail.coinPrice*100000))/100000;
        price.className = 'item-price';
        
        //APPENDING ALL TO TD
        row.appendChild(logo);
        row.appendChild(name);
        row.appendChild(symbol);
        row.appendChild(price);

        //APPENDING TD TO TD
        dropdown.appendChild(row);

    });
    
    
    searchInputDropdown = document.querySelector('.form-control');
    dropdownOptions = document.querySelectorAll('.table-item');
    images = document.querySelectorAll('img');
    searchInputDropdown.addEventListener('input',() => {

        filterData();
    });
      
    dropdown.addEventListener('click',(e)=>{
          // console.log(e);
        //   if( e.path[0]!= null && e.path[0].className === 'table-item')
        //       searchInputDropdown.value = e.path[0].textContent;
        //   filterData();
    }) ;

    images.forEach(image=>{
      image.addEventListener('error',()=>{
          image.src = '../node_modules/cryptocurrency-icons/svg/color/generic.svg';
      });
    });
    
});
};

CreateTable();


function UpdateTable()
{
  chrome.storage.local.get('coinDetails', ({coinDetails}) => {

    // console.log('Coin Details length: ', coinDetails.length);
    var children = dropdown.children;
    coinDetails.forEach((coinDetail,index) => {
        // console.log(coinDetail.coinName, coinDetail.coinSymbol, coinDetail.coinIcon, coinDetail.coinPrice);
          var row = children[index];
          // console.log('row: ',row);
          var tdChildren = row.children;
          // console.log('tdChildren: ',tdChildren);
          // console.log('tdChildren[3]: ',tdChildren[3]);
          tdChildren[3].textContent = '$' + (Math.round(coinDetail.coinPrice*100000))/100000;

    });
    
    
    searchInputDropdown = document.querySelector('.form-control');
    dropdownOptions = document.querySelectorAll('.table-item');

    searchInputDropdown.addEventListener('input',() => {

        filterData();
    });
      
    dropdown.addEventListener('click',(e)=>{
          // console.log(e);
        //   if( e.path[0]!= null && e.path[0].className === 'table-item')
        //       searchInputDropdown.value = e.path[0].textContent;
        //   filterData();
    }) ;
});
};



//*******************************************************************************************


// Initiate an "Alarm" function to send "get-data" message to background.js and update the data displayed in frontend

chrome.alarms.create('get-crypto-data', {delayInMinutes: 0.5, periodInMinutes: 1});


// Listen to the response from background.js after the alarm

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message === 'updated-crypto-data') {
        UpdateTable(); // Updating the frontend
        sendResponse('I am still alive'); // Sending a response back to background.js to let it know that popup.js is still open.
    }

  });
  

//*******************************************************************************************

// Modify the DOM to display the list of coins.

// searchInputDropdown.addEventListener()

function filterData() {
  const filter = searchInputDropdown.value.toLowerCase();
  // console.log('yes');
//   console.log(el.firstChild.nextSibling);
  showOptions();
  const valueExist = !!filter.length;

  if (valueExist) {
    dropdownOptions.forEach((el) => {
      // console.log(el.firstChild.nextSibling);
      const elText = el.firstChild.nextSibling.textContent.trim().toLowerCase();
      const isIncluded = elText.includes(filter);
      if (!isIncluded) {
        el.style.display = 'none';
      }
    });
  }
}

const showOptions = () => {
  dropdownOptions.forEach((el) => {
    el.style.display = 'table-row';
  })
}








