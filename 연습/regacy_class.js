var Human = function(type) {
    this.type = type || 'human';
};

Human.isHuman = function(human) {
    return human instanceof Human;
};

Human.prototype.breath = function() {
    alert('h-a-a-m');
};


var Zero = function(type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.latsName = lastName;
};

Zero.prototype = object.create(Human.prototype)
Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function() {
    alert(this.firstName + ' ' + this.lastName)
};

var oldZero = new Zero('human', 'Zero', 'Cho');
human.isHuman(oldZero)