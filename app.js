document.addEventListener("DOMContentLoaded", function () {
    let money1Buttons = document.querySelectorAll('.money1 button');
    let money2Buttons = document.querySelectorAll('.money2 button');
    let inp1 = document.querySelector('.inp1');
    let inp2 = document.querySelector('.inp2');
    let cat1 = document.querySelector('.cat1');
    let cat2 = document.querySelector('.cat2');
    function updateValues(amount, targetInput, targetCurrency) {
        fetch(`https://v6.exchangerate-api.com/v6/584da95aee71216e9c39b42e/latest/${targetCurrency}`)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.conversion_rates["USD"];
                const convertedAmount = amount * exchangeRate;
                targetInput.value = convertedAmount.toFixed(2);
                cat1.textContent = `1 ${targetCurrency} = ${exchangeRate.toFixed(4)} USD`;
                cat2.textContent = `1 USD = ${(1 / exchangeRate).toFixed(4)} ${targetCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    }
    money1Buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            money1Buttons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            updateValues(inp1.value, inp2, button.innerText);
        });
    });
    money2Buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            money2Buttons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            updateValues(inp2.value, inp1, button.innerText);
        });
    });
    inp1.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
        if (this.value.split('.').length > 2) {
            this.value = this.value.slice(0, this.value.lastIndexOf('.'));
        }
        updateValues(parseFloat(this.value), inp2, document.querySelector('.money1 button.active').innerText);
    });
    inp2.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
        if (this.value.split('.').length > 2) {
            this.value = this.value.slice(0, this.value.lastIndexOf('.'));
        }
        updateValues(parseFloat(this.value), inp1, document.querySelector('.money2 button.active').innerText);
    });
});