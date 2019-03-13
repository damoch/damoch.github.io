var ID = 0;

function Skills(spSk, heSk){
    return {
        speakerSkill : spSk,
        henchmanSkill : heSk
    }
}

function Person(){
    return {
        id : ID++,
        name : "",
        surname : "",
        age : 0,
        dailyCost : 0,
        isHungry : function(){return this.daysHungry > 0;},
        daysHungry : 0, 
        worthForGods : 0
    };
};

function Person(nam, surnam, ag, dailyC, worth){
    return {
        id : ID++,
        name : nam,
        surname : surnam,
        age : ag,
        dailyCost : dailyC,
        isHungry : function(){return this.daysHungry > 0;},
        daysHungry : 0,
        worthForGods : worth
    };
}

function Person(nam, surnam, ag, dailyC, worth, spSk, heSk){
    return {
        id : ID++,
        name : nam,
        surname : surnam,
        age : ag,
        dailyCost : dailyC,
        isHungry : function(){return this.daysHungry > 0;},
        daysHungry : 0,
        worthForGods : worth,
        skills : Skills(spSk, heSk)
    };
}

function generateRandomPerson(){
    var name = randomName();
    var surname = randomSurname();
    var age = getRndInteger(Rules.MIN_AGE, Rules.MAX_AGE);
    var dailyCost = getRndInteger(Rules.DAILY_COST_MIN, Rules.DAILY_COST_MAX);
    var speakingSkill = getRndInteger(Rules.MINIMAL_SKILL_VALUE, Rules.MAXIMAL_SKILL_VALUE);
    var henchmanSkill = getRndInteger(Rules.MINIMAL_SKILL_VALUE, Rules.MAXIMAL_SKILL_VALUE);
    var worth = Math.floor(Math.max(speakingSkill, henchmanSkill) / Rules.WORTH_FOR_GODS_DENOMINATOR);

    return Person(name, surname, age, dailyCost, worth, speakingSkill, henchmanSkill);
}

function generateListOfRandomPeople(count){
    var result = [];

    for(var i = 0; i < count; i++){
        result[i] = generateRandomPerson();
    }
    return result;
}

