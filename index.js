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
