console.log("start");

class Human{
    constructor(param1){
        this.type = param1;
    }

    static isHuman(param1){
        let tempVar = param1 instanceof Human
        return tempVar;
    }

    breath() {
        alert(h-a-a-a-m);
    }
}

class Zero extends Human {
    constructor(param1, param2, param3){
        super(param1);
        this.firstname = param2;
        this.lastname = parma3;
    }

    sayName() {
        super.breath();
        alert(`${this.firstname} ${this.lastname}`);
    }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero);

function wrapper() {
    let varLet5 = 1;
    const varConst5 = 2;
    var varVar5 = 3;
    varNone5 = 4;
    function inner() {
        let varLet6 = 1;
        const varConst6 = 2;
        var varVar6 = 3;
        varNone6 = 4;
    }
    inner();
}
wrapper();

var relationship1 = {
    name : 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFrends : function() {
        var that = this;
        this.friends.forEach(
            function (param1) {
                consolog(that.name, parma1);
            }
        )
    }
};

console.log("start here");
var relationship2 = {
    name : 'zero',
    friends : ['nero', 'hero', 'xero'],
    logFrends : () => {
        var that = this;
        this.friends.forEach(
            (param1) => {console.log(this.name, param1);}
        )
    }
}
relationship2.logFrends()

let varLet1 = 1;
var varVar1 = 2;

{
    {
        let varLet2 = 1;
        var varVar2 = 2;
    }
    let varLet3 = 1;
    var varVar3 = 2;
}

function func() {
    let varLet4 = 1;
    var varVar4 = 2;
};
func();

console.log("var:", varVar);
console.log("let:", varLet);

console.log("var:", varVar1);
console.log("let:", varLet1);

console.log("123");