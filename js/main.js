const MixinName = superclass => class extends superclass {
	constructor() {
		super();
		this.name = 'Zorg';
	}

	getName() {
		return this.name;
	}
}

class A extends MixinName(Object) {
	constructor() {
		super();
	}

	setName(n) {
		this.name = n;
	}
}

const a = new A();
console.log(`Hi ${a.name}.`);
console.log(`Bye ${a.getName()}.`);

