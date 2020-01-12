var satisfactionProgressBar;
var moneyField;
var dayField;
var weekField;
var sacrificesLeftField;
var speechTextArea;
var lastSpeechText;
var logTextArea;
var newFollowerDesc;

var newName;
var newSurname;
var newAge;
var newHenchmen;
var newSpeaking;

var selectSacrifice;
var priestSelect;
var henchmanSelect;

const idOfPersonSeparator = ':';
const hungryText = "(hungry)";
const ageText = " Age: ";
const speechSkillText = ", speech skill: ";
const henchmanSkillText = ", henchmen skill: ";
const worthForGodsText = ", potential worth for gods: ";
const logPrefix = "Day: ";
const diedLogPostfix = " died of hunger";
const dailyVictimStatus = "Total cost of feeding prisoners: ";
const speechLogPrefix = "Speech by ";
const speechLogMiddle = " made us ";
const sacrificeLogText = " has been sacrificed for glory of the Evil Gods";
const henchmanFailureLog = " has failed, and fell into the hands of the police";
const dayEndLog = "Day ended";
const weekEndLog = "Week ended";
const quotaNotSatisfiedLog = "Weekly sacrifices quota not met. Evil Gods are furious!";
const quotaMetLog = "Weekly sacrifices quota met. Evil Gods are pleased";
const priestWentCrazyLog = " went crazy, because of pure evilness and incomprehensibleness of your speech!"
const daysToWeek = 7;

var logLength = 0;
var logData = [];
var newPerson;

function init(){
    selectSacrifice = document.getElementById("victimSelect");
    satisfactionProgressBar = document.getElementById("godsSatisfaction");
    moneyField = document.getElementById("moneyField");
    dayField = document.getElementById("day");
    weekField = document.getElementById("week");
    sacrificesLeftField = document.getElementById("sacrificesLeftField");
    speechTextArea = document.getElementById("speechTextArea");
    priestSelect = document.getElementById("priestSelect");
    lastSpeechText = document.getElementById("lastSpeechStatus");
    henchmanSelect = document.getElementById("henchmanSelect");
    logTextArea = document.getElementById("logTextArea");
    newFollowerDesc = document.getElementById("newFollowerDesc");
    newName = document.getElementById("newName");
    newSurname = document.getElementById("newSurname");
    newAge = document.getElementById("newAge");
    newHenchmen = document.getElementById("newHenchmen");
    newSpeaking = document.getElementById("newSpeaking");

    GameData.godsSacrificesDemand = getRndInteger(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK);
    GameData.money = Rules.STARTING_MONEY;

    speechTextArea.onpaste = function(event){event.preventDefault()};
    speechTextArea.value = "";

    logLength = logTextArea.rows;
    logTextArea.value = "";

    window.onbeforeunload = function (e) {
        var e = e || window.event;
        readSpookyText();
        //IE & Firefox
        if (e) {
          e.returnValue = 'There is no escape';
        }
        
        // For Safari
        return 'There is no escape';
      };

    generateRandomPerson();
    refreshSacrifices();
    updateSatisfactionSlider();
    updateOperationStatus();
    refreshPriests();
    refreshHenchman();
}

function updateOperationStatus(){
    moneyField.textContent = GameData.money;
    dayField.textContent = GameData.day;
    weekField.textContent = GameData.week;
    sacrificesLeftField.textContent = GameData.godsSacrificesDemand
}

function refreshPriests(){
    removeOptions(priestSelect);
    GameData.priests.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " +  element.name + " " + element.surname + ", " + ageText + element.age + speechSkillText + element.skills.speakerSkill;
        priestSelect.add(option)
    });
}

function refreshSacrifices(){
    removeOptions(selectSacrifice);
    GameData.victims.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " 
        +  element.name + " " + element.surname  + "," + 
        ageText + element.age +  " " + (element.isHungry() ?  hungryText : "")
        + worthForGodsText + element.worthForGods;
        selectSacrifice.add(option)
    });
}

function refreshHenchman(){
    removeOptions(henchmanSelect);
    GameData.henchmen.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " +  element.name + " " + element.surname + ", " + ageText + element.age + henchmanSkillText + element.skills.henchmanSkill;
        henchmanSelect.add(option)
    });
}

function sacrifice(){
    var selectedID = parseInt(selectSacrifice.value.split(idOfPersonSeparator)[0]);
    var victim = getVictim(selectedID);
    if(victim === undefined){
        return;
    }
    GameData.godsSatisfaction += victim.isHungry() ? victim.worthForGods : victim.worthForGods / Rules.VICTIM_HUNGRY_PENALTY;
    if(GameData.godsSatisfaction > Rules.GODS_SATISFACTION_MAX){
        GameData.godsSatisfaction = Rules.GODS_SATISFACTION_MAX;
    }
    GameData.godsSacrificesDemand--;
    printLog(victim.name + " " + victim.surname + sacrificeLogText);
    removeVictim(selectedID);
    refreshSacrifices();
    updateSatisfactionSlider();
    nextDay();
}

function updateSatisfactionSlider(){
    satisfactionProgressBar.value = GameData.godsSatisfaction;
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function nextDay(){
    printLog(dayEndLog);
    GameData.day++;
    if(GameData.day % daysToWeek === 0){
        GameData.week++;
        weeklyEvent();
    }
    
    GameData.godsSatisfaction -= Rules.GODS_SATISFACTION_DAILY_DROP;

    if(GameData.godsSatisfaction < Rules.GODS_SATISFACTION_LOWEST){
        GameData.godsSatisfaction = Rules.GODS_SATISFACTION_LOWEST;
    }

    if(GameData.godsSatisfaction < Rules.MINIMUM_GODS_SATISFACTION){
        punishPlayer();
    }
    feedVictims();
    updateOperationStatus();
    refreshSacrifices();
    updateSatisfactionSlider();

    if(getRndInteger(0, GameData.godsSatisfaction) <= Rules.SPOOKY_EVENTS_OCCURENCE_TRESHOLD){
        startRandomSpookyEvent();
    }
}

function weeklyEvent(){
    printLog(weekEndLog);
    if(GameData.godsSacrificesDemand > 0){
        GameData.godsSatisfaction -= GameData.godsSacrificesDemand * Rules.SACRIFICES_QUOTA_NOT_MET_PENALTY;
        printLog(quotaNotSatisfiedLog);
    }
    else{
        GameData.godsSatisfaction += Rules.SACRIFICES_QUOTA_MET_PRIZE;
        printLog(quotaMetLog);
    }
    GameData.godsSacrificesDemand = getRndInteger(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK);
}

function feedVictims(){
    var totalFeedingCost = 0;
    GameData.victims.forEach(victim => {
        if(victim.dailyCost <= GameData.money){
            victim.daysHungry = 0;
            GameData.money -= victim.dailyCost;
            totalFeedingCost += victim.dailyCost;
        }
        else{
            victim.daysHungry++;
        }
        if(victim.daysHungry > Rules.MAX_DAYS_HUNGRY){
            removeVictim(victim.id);
            printLog(victim.name + " " + victim.surname + diedLogPostfix);
        }
    });
    printLog(dailyVictimStatus + totalFeedingCost + "$");
}

function readSpeech(){
    var words =  speechTextArea.value.match(/\S+/g);
    var moneyMade = 0;
    var selectedID = parseInt(priestSelect.value.split(idOfPersonSeparator)[0]);
    var priest = getPriest(selectedID);
    if(priest === undefined){
        return;
    }
    var skillFactor = priest.skills.speakerSkill / Rules.MAXIMAL_SKILL_VALUE;
    words.forEach(element => {
        moneyMade += Rules.EVIL_WORDS.includes(element.toLowerCase()) ? Math.floor(Rules.MAX_MONEY_FOR_EVERY_EVIL_WORD_IN_SPEECH * skillFactor) : 0;
    });
    GameData.money += moneyMade;
    lastSpeechText.textContent = moneyMade;
    printLog(speechLogPrefix + priest.name + " " + priest.surname + " " + speechLogMiddle + moneyMade + "$");
    speechTextArea.value = "";
    var rnd = getRndInteger(0, Rules.MAXIMAL_SKILL_VALUE);
    if(rnd > priest.skills.speakerSkill){
        printLog(priest.name + " " + priest.surname + priestWentCrazyLog);
        removePriest(priest.id);
        refreshPriests();
    }
    nextDay();
}

function findNewFollower(){
    var selectedID = parseInt(henchmanSelect.value.split(idOfPersonSeparator)[0]);
    var henchmen = getHenchmen(selectedID);
    if(henchmen === undefined){
        return;
    }
    var randomNumber = getRndInteger(Rules.HENCHMEN_SUCCESS_MIN_VALUE, Rules.HENCHMEN_SUCCESS_MAX_VALUE);
    if(henchmen.skills.henchmanSkill > randomNumber){
        newFollowerDesc.style.visibility = "visible";
        getNewFollower();
    }
    else{
        newFollowerDesc.style.visibility = "hidden";
        printLog(henchmen.name + " " + henchmen.surname + henchmanFailureLog);
        removeHenchmen(henchmen.id);
        refreshHenchman();
        nextDay();
    }
}

function punishPlayer(){
    document.body.innerHTML = badasssSkull;
    changeColors();
}

function changeColors(){
    document.body.style.color = "white";
    setInterval(flipBackgroundColors, 500);
}

function flipBackgroundColors(){
    if(document.body.style.backgroundColor !== "red"){
        document.body.style.backgroundColor = "red";
    }
    else{
        document.body.style.backgroundColor = "black";
    }
}

function printLog(text){
    var dataToLog = logPrefix + GameData.day +" - " + text; 
    logTextArea.value = "";
    logData.unshift(dataToLog);
    if(logData.length > logLength){
        logData.pop();
    }
    logData.forEach(element => {
        logTextArea.value += element + "\n";
    });
}

function getNewFollower(){
    newPerson = generateRandomPerson();
    newName.textContent = newPerson.name;
    newSurname.textContent = newPerson.surname;
    newAge.textContent = newPerson.age;
    newHenchmen.textContent = newPerson.skills.henchmanSkill;
    newSpeaking.textContent = newPerson.skills.speakerSkill;
}

function hireAsHenchmen(){
    GameData.henchmen.push(newPerson);
    newPerson = null;
    newFollowerDesc.style.visibility = "hidden";
    refreshHenchman();
    nextDay();
}

function hireAsPriest(){
    GameData.priests.push(newPerson);
    newPerson = null;
    newFollowerDesc.style.visibility = "hidden";
    refreshPriests();
    nextDay();
}

function enslaveAsVictim(){
    GameData.victims.push(newPerson);
    newPerson = null;
    newFollowerDesc.style.visibility = "hidden";
    refreshSacrifices();
    nextDay();
}