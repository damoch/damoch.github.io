GameData = {
    victims : generateListOfRandomPeople(Rules.STARTING_PRISONERS_COUNT),
    henchmen : generateListOfRandomPeople(Rules.STARTING_HENCHMEN_COUNT),
    priests : generateListOfRandomPeople(Rules.STARTING_PRIESTS_COUNT),

    godsSatisfaction : Rules.STARTING_GODS_SATISFACTION,

    godsSacrificesDemand : Rules.MINIMUM_SACRIFICES_FOR_WEEK,
    money : Rules.STARTING_MONEY,
    day : Rules.STARTING_DAY,
    week : Rules.STARTING_WEEK,
}

function removeVictim(id){
    GameData.victims = GameData.victims.filter(function(p){return p.id !== id});
}

function removeHenchmen(id){
    GameData.henchmen = GameData.henchmen.filter(function(p){return p.id !== id});
}

function removePriest(id){
    GameData.priests = GameData.priests.filter(function(p){return p.id !== id});
}

function getVictim(id){
    return GameData.victims.filter(function(p){return p.id === id})[0];
}

function getPriest(id){
    return GameData.priests.filter(function(p){return p.id === id})[0];
}

function getHenchmen(id){
    return GameData.henchmen.filter(function(p){return p.id === id})[0];
}