const selectedSeatEl = document.getElementById('selected-seat');
const totalBookedEl = document.getElementById('total-booked');
const availableSeatEl = document.getElementById('available-seat');
const totalPriceEl = document.getElementById('total-price');
const couponInputEl = document.getElementById('coupon-field');
const couponBtnEl = document.getElementById('coupon-btn');
const defaultTextEl = document.getElementById('default-text');
const grandTotalEl = document.getElementById('grand-total');
const phoneNumberEl = document.getElementById('phone-number');
const nextButtonEl = document.getElementById('nextButton');


let selectedSeat = [];
let totalPrice = 0;

function handleSelectSeat(event) {
    const value = event.innerText;
    if (selectedSeat.includes(value)) {
        alert('seat already booked');
        return;
    }
    else if(selectedSeat.length < 4) {
        event.classList.add('bg-primary');
        event.classList.add('text-white');
        selectedSeat.push(event.innerText);
        totalBookedEl.innerText = selectedSeat.length;
        const availableSeatvalue = parseFloat(availableSeatEl.innerText);
        const newAvailableSeatValue = availableSeatvalue - 1;
        availableSeatEl.innerText = newAvailableSeatValue;

        // remove default text
        defaultTextEl.classList.add('hidden');

        selectedSeatEl.innerHTML += `
        <li class="text-base font-normal flex justify-between">
        <span>${event.innerText}</span>
        <span>Economy</span>
        <span>550</span>
        </li>`

        // update total price
        totalPrice += 550;
        totalPriceEl.innerText = totalPrice.toFixed(2);

        // active coupon
        if (selectedSeat.length > 3) {
            couponInputEl.removeAttribute('disabled');
            couponBtnEl.removeAttribute('disabled');
        }
    }
    else{
        alert('Maximum seat booked');
    }
};

// coupon button function
document.getElementById('coupon-btn').addEventListener('click', function(){
    const couponInputValue = couponInputEl.value;
    const showCouponPriceEl = document.getElementById('show-coupon-price');
    
    let = couponSave = 0;
    if(couponInputValue !== 'NEW50' && couponInputValue !== 'Couple 20'){
        alert('Your Provided Coupon is not valid');
        return;
    }
    if(couponInputValue === 'NEW50'){
        couponSave = totalPrice * 0.15;
    }
    else if(couponInputValue === 'Couple 20'){
        couponSave = totalPrice * 0.20;
    }

    showCouponPriceEl.innerHTML = `
    <p>Discount</p>
    <p><span>-BDT: </span> <span id="total-price">${couponSave.toFixed(2)}</span></p>
    `

    const grandTotalValue = totalPrice - couponSave;
    grandTotalEl.innerText = grandTotalValue.toFixed(2);
});

phoneNumberEl.addEventListener('keyup', function(event){
    const inputValue = event.target.value;
    if(inputValue.length >= 11 && selectedSeat.length > 0){
        nextButtonEl.removeAttribute('disabled');
    }
});

document.getElementById('btn-continue').addEventListener('click', function(){
    window.location.reload();
});