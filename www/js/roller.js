function rollInitative(text){
    var parts = text.trim().split(" "), diceToRoll, bonus;

    diceToRoll = parseInt(parts[parts.length-1].split("d")[0],10);

    if (parts[parts.length-3].indexOf("(") > -1) {
        bonus = parseInt(parts[parts.length-3].substring(1,parts[parts.length-3].length-1));
    } else {
        bonus = parseInt(parts[parts.length - 3]);
    }

    for (var counter = 0 ; counter < diceToRoll ; counter++) {
        bonus += this.rollDie();
    }

    this.alertMe(bonus, (parseInt(parts[0].charAt(0)) !== NaN ? parts[0] : null) );

    $("#rollHistory").append("<br>" + (parseInt(parts[0].charAt(0)) !== NaN ? parts[0] : "Initative, type unfound") + ": " + bonus);
}

function rollTest(diceToRoll, checkName) {    
    var parts = diceToRoll.split(" "), baseDice, specialized, ones = 0, hits = 0, output, rolls = [];

    baseDice = parseInt(parts[0],10);

    for ( var dieWalker = 0 ; dieWalker < baseDice ; dieWalker++ ) {
        var die = this.rollDie();

        if ( die === 1 ) {
            ones++;
        } else if ( die >= 5 ) {
            hits++;

            if ($("#preEdge").is(':checked')) {
                while ( die === 6 ) {
                    rolls.push(die);

                    die = this.rollDie();

                    if ( die >= 5 ) {
                        hits++;
                    } 
                }
            }
        }
        
        rolls.push(die);
    }

    output = hits + (Math.ceil(baseDice/2) <= ones ? (hits === 0 ? " CRITICAL GLITCH" : " GLITCH") : "");
    if ( parts.length > 1 ) {

        var specialized = parseInt(parts[1].substring(1, parts[1].length - 1)) - baseDice;
        for ( var dieWalker = 0 ; dieWalker < specialized ; dieWalker++ ) {
            var die = this.rollDie();

            if ( die === 1 ) {
                ones++;
            } else if ( die >= 5 ) {
                hits++;
            }

            if ($("#preEdge").is(':checked')) {
                while ( die === 6 ) {
                    rolls.push(die);

                    die = this.rollDie();

                    if ( die >= 5 ) {
                        hits++;
                    } 
                }
            }

            rolls.push(die);
        }
        output += "(" + hits + (Math.ceil((baseDice + specialized)/2) <= ones ? (hits === 0 ? " CRITICAL GLITCH" : " GLITCH") : "") + ")";

    }

    rolls.sort(function (a,b) {
        return b-a;
    });

    $("#rollHistory").append("<br>" + checkName + ": " + output + " " + rolls);


    this.alertMe(output, checkName);
}

function rollDie(){
    return Math.floor(Math.random() * 6) + 1;
}