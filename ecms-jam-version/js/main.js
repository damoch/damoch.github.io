var satisfactionProgressBar;
var moneyField;
var dayField;
var weekField;
var sacrificesLeftField;
var speechTextArea;
var lastSpeechText;
var logTextArea;
var newFollowerDesc;
var dailyCostText;
var currentFundsText;
var topSacrificesQuotaText;

var newName;
var newSurname;
var newAge;
var newHenchmen;
var newSpeaking;

var selectSacrifice;
var priestSelect;
var henchmanSelect;
var gameOver = false;

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
const priestWentCrazyLog = " went insane, because of pure evilness and incomprehensibleness of your speech!"
const daysToWeek = 7;

var logLength = 0;
var logData = [];
var newPerson;
var speechWordsInCurrentSentence = 0;

window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

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
    dailyCostText = document.getElementById("dailyCostText");
    currentFundsText = document.getElementById("currentFundsText");
    topSacrificesQuotaText = document.getElementById("topSacrificesQuotaText");

    speechTextArea.onkeydown = speechTextAreaKeyPressed;

    GameData.godsSacrificesDemand = getRndInteger(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK);
    GameData.money = Rules.STARTING_MONEY;
    speechTextArea.attributes["maxlength"] = Rules.MAX_SPEECH_LENGTH.toString();
    speechTextArea.value = "";

    logLength = logTextArea.rows;
    logTextArea.value = "";

    window.onbeforeunload = function (e) {
        if(window.mobilecheck() || gameOver){
            return;
        }
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

function speechTextAreaKeyPressed(event){
    event.preventDefault();
    if(speechTextArea.value.length > Rules.MAX_SPEECH_LENGTH){
        return;
    }
    var selectedID = parseInt(priestSelect.value.split(idOfPersonSeparator)[0]);
    var priest = getPriest(selectedID);
    var upperCase = false;

    if(speechWordsInCurrentSentence < Rules.MIN_SENTENCE_LENGTH && speechTextArea.value.length > 0){
        speechWordsInCurrentSentence = getRndInteger(Rules.MIN_SENTENCE_LENGTH, Rules.MAX_SENTENCE_LENGTH);
        speechTextArea.value = speechTextArea.value.substring(0,speechTextArea.value.length-1) + ". ";
        upperCase = true;
    }
    word = "";
    if(priest.skills.speakerSkill > getRndInteger(Rules.MINIMAL_SKILL_VALUE, Rules.MAXIMAL_SKILL_VALUE)){
        word = randomEvilWord().toUpperCase() + " ";
    }
    else{
        word = randomWord() + " ";
    }

    if(upperCase || speechTextArea.value.length == 0){
        word = word.charAt(0).toUpperCase()+ word.substring(1)
    }
    speechWordsInCurrentSentence--;
    speechTextArea.value+=word;
}

function updateOperationStatus(){
    moneyField.textContent = GameData.money;
    dayField.textContent = GameData.day;
    weekField.textContent = GameData.week;
    sacrificesLeftField.textContent = GameData.godsSacrificesDemand;
    currentFundsText.innerHTML = `Money: <b>$${GameData.money}</b>`;
    topSacrificesQuotaText.innerHTML = `Sacrifices quota for this week: ${GameData.godsSacrificesDemand}`;
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
    var cost = 0;
    GameData.victims.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " 
        +  element.name + " " + element.surname  + "," + 
        ageText + element.age +  " " + (element.isHungry() ?  hungryText : "")
        + worthForGodsText + element.worthForGods;
        selectSacrifice.add(option)
        cost += element.dailyCost;
    });
    var textClass = cost < GameData.money ? 'dailyCostOK' : 'dailyCostWRONG';
    const dailyPrisonersCostText = `Daily cost of feeding prisoners: <b class="${textClass}">$${cost}</b>`;
    dailyCostText.innerHTML = dailyPrisonersCostText;

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
    if(GameData.godsSacrificesDemand > 0)
    {
        GameData.godsSacrificesDemand--;
    }
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
    newFollowerDesc.style.visibility = "hidden";
    printLog(dayEndLog);
    GameData.day++;
    if(GameData.day % daysToWeek === 0){
        GameData.week++;
        weeklyEvent();
    }
    
    GameData.godsSatisfaction -= Rules.GODS_SATISFACTION_DAILY_DROP * (GameData.godsSatisfaction / Rules.GODS_SATISFACTION_MAX);

    if(GameData.godsSatisfaction < Rules.GODS_SATISFACTION_LOWEST){
        GameData.godsSatisfaction = Rules.GODS_SATISFACTION_LOWEST;
    }

    if(GameData.godsSatisfaction < Rules.MINIMUM_GODS_SATISFACTION){
        punishPlayer();
    }
    feedVictims();
    tryAddRandomFollower();
    updateOperationStatus();
    refreshSacrifices();
    updateSatisfactionSlider();


    if(GameData.godsSatisfaction <= Rules.SPOOKY_EVENTS_OCCURENCE_TRESHOLD && !gameOver){
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
    var words =  speechTextArea.value.replace(/\./g,'').match(/\S+/g);
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
        printLog(henchmen.name + " " + henchmen.surname + henchmanFailureLog);
        removeHenchmen(henchmen.id);
        refreshHenchman();
        nextDay();
    }
}

function punishPlayer(){
    gameOver = true;
    document.body.className = "punished";
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
    refreshSacrifices();
    nextDay();
}

function tryAddRandomFollower(){
    if(GameData.victims.length == 0 && GameData.henchmen.length == 0 && getRndInteger(0, 100) > Rules.SPAWN_RANDOM_NPC){
        var st = "";
        var newNpc = generateRandomPerson();
        if(getRndInteger(0, 100) > Rules.SPAWN_RANDOM_NPC){
            GameData.victims.push(newNpc);
            refreshSacrifices();
            st = "victim";
        }
        else{
            GameData.henchmen.push(newNpc);
            refreshHenchman();
            st = "henchmen";
        }
        printLog("Evil Gods in their infinite winsdom had inspired " + newNpc.name + " " + newNpc.surname + " to volunteer as a " + st);
    }
}