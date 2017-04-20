export default class {
    static formatCommas(x) {
        if(x>0) x = Math.round(x);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static numbersOnly(x) {
        return x.toString().replace(/\D/g,'');
    }
    static numbersAndDot(x) {
        return x.toString().replace(/[^\d.-]/g, '');
    }

    static monthlyPayments(amount, rate, years) {
        
        if(!amount||!rate||!years)
            return 0;
        console.log ('now')
        
        amount = parseInt(amount, 10);
        rate = parseFloat(rate,10) / 12 / 100;
        let payments = parseInt(years,10) * 12;

        // Now compute the monthly payment figure, using esoteric math.
        let x = Math.pow(1 + rate , payments);
        let monthly = (amount*x*rate)/(x-1);  
        return monthly;  
    }

    static futureValue(annualRate, years, monthlyPayment, amount) {
        let rate = annualRate / 12 / 100;
        let nper = years * 12;
        let pmt = monthlyPayment;
        let pv = 0-amount;
        let type = 0;
        
        //debugger;

        var pow = Math.pow(1 + rate, nper),
            fv;
        if (rate) {
        fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
        } else {
        fv = -1 * (pv + pmt * nper);
        }
        return fv.toFixed(2);
    }

    static monthlyIO(amount, rate) {

        if(!amount||!rate)
            return 0;

        amount = parseInt(amount,10);
        rate = parseFloat(rate,10);
        let payment = amount * rate / 100 / 12

        return payment;  
    }

    static nPer(rate, payment, present, future, type) {
        // Initialize type
        var type = (typeof type === 'undefined') ? 0 : type;

        // Initialize future value
        var future = (typeof future === 'undefined') ? 0 : future;

        // Evaluate rate and periods (TODO: replace with secure expression evaluator)
        rate = eval(rate);

        // Return number of periods
        var num = payment * (1 + rate * type) - future * rate;
        var den = (present * rate + payment * (1 + rate * type));
        return Math.log(num / den) / Math.log(1 + rate);
    } 

    static pv(rate, periods, payment, future, type) {
        // Initialize type
        var type = (typeof type === 'undefined') ? 0 : type;

        // Evaluate rate and periods (TODO: replace with secure expression evaluator)
        rate = eval(rate);
        periods = eval(periods);

        // Return present value
        if (rate === 0) {
            return - payment * periods - future;
        } else {
            return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 +rate * type) - future) / Math.pow(1 + rate, periods);
        }
    }

    static rate = function(nper, pmt, pv, fv, type, guess) {
        // Sets default values for missing parameters
        fv = typeof fv !== 'undefined' ? fv : 0;
        type = typeof type !== 'undefined' ? type : 0;
        guess = typeof guess !== 'undefined' ? guess : 0.1;

        // Sets the limits for possible guesses to any
        // number between 0% and 100%
        var lowLimit = 0;
        var highLimit = 1;

    // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
    // the solution as valid.
    var tolerance = Math.abs(0.00000005 * pmt);

    // Tries at most 40 times to find a solution within the tolerance.
    for (var i = 0; i < 40; i++) {
        // Resets the balance to the original pv.
        var balance = pv;

        // Calculates the balance at the end of the loan, based
        // on loan conditions.
        for (var j = 0; j < nper; j++ ) {
            if (type == 0) {
                // Interests applied before payment
                balance = balance * (1 + guess) + pmt;
            } else {
                // Payments applied before insterests
                balance = (balance + pmt) * (1 + guess);
            }
        }

        // Returns the guess if balance is within tolerance.  If not, adjusts
        // the limits and starts with a new guess.
        if (Math.abs(balance + fv) < tolerance) {
            return guess;
        } else if (balance + fv > 0) {
            // Sets a new highLimit knowing that
            // the current guess was too big.
            highLimit = guess;
        } else  {
            // Sets a new lowLimit knowing that
            // the current guess was too small.
            lowLimit = guess;
        }

        // Calculates the new guess.
        guess = (highLimit + lowLimit) / 2;
    }

        // Returns null if no acceptable result was found after 40 tries.
        return null;
    };

    static pmt(ir, np, pv, fv, type) {
        /*
        * ir   - interest rate per month
        * np   - number of periods (months)
        * pv   - present value
        * fv   - future value
        * type - when the payments are due:
        *        0: end of the period, e.g. end of month (default)
        *        1: beginning of period
        */
        

        

        fv || (fv = 0);
        type || (type = 0);

        if (ir === 0)
            return -(pv + fv)/np;

        let pvif = Math.pow(1 + ir, np);
        pvif = Math.pow(1 + ir, np);
        let pmt = - ir * pv * (pvif + fv) / (pvif - 1);

        if (type === 1)
            pmt /= (1 + ir);

        return pmt;
    }    
    
}