class RealNumCalculator {
	constructor(options){};

    zero(){return 0};
    one(length, el){
        // el is Array of Real Nums
        if (length > 1) {
            let arr = [];
            for(let i = 0; i < length; i++) arr[i] = 1;
            return  arr;
        }
        // el is Real Number
        return 1;
    };


    add(a, b)    { return a + b };
    sub(a, b)    { return a - b };
    mult(a, b)   { return a * b};
    divide(a, b) { return a / b};
    percent(a, b){ return a % b};

    pow(a, n) { return Math.pow(a,b)};
    sqrt(res){ return Math.sqrt(res) };

    sin(res){ return Math.sin(res)  };
    cos(res){ return Math.cos(res)  };
    tg(res) { return Math.tan(res)  };
    ctg(res){ return 1/Math.tan(res)};

};