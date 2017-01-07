rollInitative = function (text){
    var parts = text.split(" "), diceToRoll, bonus;

    diceToRoll = parseInt(parts[parts.length-1].split("d")[0],10);

    if (parts[parts.length-3].indexOf("(") > -1) {
        bonus = parseInt(parts[parts.length-3].substring(1,parts[parts.length-3].length-1));
    } else {
        bonus = parseInt(parts[parts.length - 3]);
    }

    for (var counter = 0 ; counter < diceToRoll ; counter++) {
        bonus += this.rollDie();
    }

    this.alertMe(bonus);
}

function rollTest(diceToRoll) {    
    var parts = diceToRoll.split(" "), baseDice, specialized, ones = 0, hits = 0, output;

    baseDice = parseInt(parts[0],10);

    for ( var dieWalker = 0 ; dieWalker < baseDice ; dieWalker++ ) {
        let die = this.rollDie();

        if ( die === 1 ) {
            ones++;
        } else if ( die >= 5 ) {
            hits++;
        }
    }

    output = hits + (Math.ceil(baseDice/2) <= ones ? (hits === 0 ? " CRITICAL GLITCH" : " GLITCH") : "");
    if ( parts.length > 1 ) {

        let specialized = parseInt(parts[1].substring(1, parts[1].length - 1)) - baseDice;
        for ( var dieWalker = 0 ; dieWalker < specialized ; dieWalker++ ) {
            let die = this.rollDie();

            if ( die === 1 ) {
                ones++;
            } else if ( die >= 5 ) {
                hits++;
            }
        }
        output += "(" + hits + (Math.ceil((baseDice + specialized)/2) <= ones ? (hits === 0 ? " CRITICAL GLITCH" : " GLITCH") : "") + ")";
    }


    this.alertMe(output);
}

function rollDie(){
    return Math.floor(Math.random() * 6) + 1;
}