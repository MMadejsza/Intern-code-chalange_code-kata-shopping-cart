class Product {
	constructor(name, price, discountAmount = 0, discountedPrice = 0) {
		this.name = name;
		this.price = price;
		this.discountAmount = discountAmount;
		this.discountedPrice = discountedPrice;
	}
}
const A = new Product('A', 50, 3, 130);
const B = new Product('B', 30, 2, 37);
const C = new Product('C', 20);
const D = new Product('D', 10);

class UserCart {
	constructor() {
		this.cartContent = [];
		this.cartValue;
	}

	renderOutcome() {
		function displayItemSummary(item) {
			return `<li class="list-group-item">${
				item.amount == undefined
					? ``
					: `Item ${item.name}: ${item.amount} x ${item.price} = `
			}${item.amount == undefined ? `` : `${item.totalValue}`}${
				item.discountAmount != 0 && item.amount >= item.discountAmount
					? '<span class="badge bg-secondary text-bg-success mx-1">Discount!</span>'
					: ''
			}</li>`;
		}
		console.log(this.cartValue);
		const container = document.querySelector('.myContainer');
		container.innerHTML = '';
		const div = document.createElement('div');
		div.setAttribute('class', 'cart');
		div.innerHTML = `          
        <div class="card mt-5">
        <img src="https://placeimg.com/150/150/tech" alt="" class="card-img-top" />
        <div class="card-body">
            <h4 class="card-title mb-2">Basket:</h4>
            <ul class="list-group list-group-flush">
                ${displayItemSummary(A)}
                ${displayItemSummary(B)}
                ${displayItemSummary(C)}
                ${displayItemSummary(D)}
            </ul>
        </div>
        <div class="card-footer text-center fw-bold">Total: &pound${this.cartValue}</div>
        </div>`;
		container.appendChild(div);
	}

	calculateTotalCartValue() {
		this.cartValue = 0;
		this.calculateValuesOfEachItem().forEach((itemsValue) => {
			this.cartValue += itemsValue;
		}, this);
		this.renderOutcome();
	}

	calculateValuesOfEachItem() {
		const itemsValues = this.cartContent.map((item) => {
			if (!item.discountAmount) {
				//- if the item is NOT discounted
				item.totalValue = item.price * item.amount;
				return item.totalValue;
			} else {
				//- if the item is discounted
				if (item.amount / item.discountAmount >= 1) {
					//- if reminder is greater/equal to 1 (if there is more then "promotional amount of items")
					item.totalValue =
						item.discountedPrice * Math.floor(item.amount / item.discountAmount) +
						(item.amount % item.discountAmount) * item.price;

					return item.totalValue;
				} else {
					//- if less then bundle offer
					item.totalValue = item.price * item.amount;
					return item.totalValue;
				}
			}
		});
		return itemsValues;
	}

	addItem() {
		this.cartContent = [];

		const string = inputString.value.toUpperCase();
		for (const letter of string) {
			switch (letter) {
				case 'A':
					if (this.cartContent.findIndex((item) => item.name === 'A') < 0) {
						this.cartContent.push(A);
						A.amount = 1;
					} else {
						A.amount += 1;
					}
					break;
				case 'B':
					if (this.cartContent.findIndex((item) => item.name === 'B') < 0) {
						this.cartContent.push(B);
						B.amount = 1;
					} else {
						B.amount += 1;
					}
					break;
				case 'C':
					if (this.cartContent.findIndex((item) => item.name === 'C') < 0) {
						this.cartContent.push(C);
						C.amount = 1;
					} else {
						C.amount += 1;
					}
					break;
				case 'D':
					if (this.cartContent.findIndex((item) => item.name === 'D') < 0) {
						this.cartContent.push(D);
						D.amount = 1;
					} else {
						D.amount += 1;
					}
					break;
				default:
					break;
			}
		}
		this.calculateTotalCartValue();
	}
}

const userCart = new UserCart();

const inputString = document.querySelector('input');
inputString.addEventListener('input', userCart.addItem.bind(userCart));
