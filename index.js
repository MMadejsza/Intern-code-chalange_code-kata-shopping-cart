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
		console.log(this.cartValue);
	}

	calculateTotalCartValue() {
		this.cartValue = 0;
		this.calculateValuesOfEachItem().forEach((itemsValue) => {
			this.cartValue += itemsValue;
		}, this);
		this.renderOutcome();
		// console.log(
		// 	'🚀 ~ file: index.js:25 ~ UserCart ~ this.calculateValuesOfEachItem ~ calculateValuesOfEachItem()',
		// 	this.calculateValuesOfEachItem(),
		// );
	}

	calculateValuesOfEachItem() {
		const itemsValues = this.cartContent.map((item) => {
			if (!item.discountAmount) {
				//- if the item is NOT discounted
				return item.price * item.amount;
			} else {
				//- if the item is discounted
				if (item.amount / item.discountAmount >= 1) {
					//- if reminder is greater/equal to 1 (if there is more then "promotional amount of items")
					return (
						item.discountedPrice * Math.floor(item.amount / item.discountAmount) +
						(item.amount % item.discountAmount) * item.price
					);
				} else {
					//- if less then bundle offer
					return item.price * item.amount;
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
