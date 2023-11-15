
document.addEventListener('DOMContentLoaded', function () {
    const rubButton = document.getElementById('rubl');
    const usdButton = document.getElementById('usd');
    const input1 = document.querySelector('.inp1');
    const input2 = document.querySelector('.inp2');
    const cat1 = document.querySelector('.cat1');
    const cat2 = document.querySelector('.cat2');

    rubButton.addEventListener('click', function () {
        cat1.textContent = 'RUB';
        cat2.textContent = 'RUB';
    });

    usdButton.addEventListener('click', function () {
        cat1.textContent = 'USD';
        cat2.textContent = 'USD';
    });

    input1.addEventListener('input', function () {
        convertCurrency(input1, cat1, input2, cat2);
    });

    input2.addEventListener('input', function () {
        convertCurrency(input2, cat2, input1, cat1);
    });

    function convertCurrency(inputFrom, catFrom, inputTo, catTo) {
        const amount = parseFloat(inputFrom.value);
        if (catFrom.textContent === 'RUB' && catTo.textContent === 'USD') {
            inputTo.value = (amount / 73.5).toFixed(2);
        } else if (catFrom.textContent === 'USD' && catTo.textContent === 'RUB') {
            inputTo.value = (amount * 73.5).toFixed(2);
        }
        
    }
})