const startDate = new Date(2018, 10, 11);
const jobs = {
    3 : "sprzątanie",
    2 : "wyrzucanie śmieci",
    1 : "zakupy",
    0 : "odpoczynek"
};

const people = {
    0 : "Damian",
    1 : "Paulina",
    2 : "Karolina",
    3 : "Ola"
};

const jobsFirstWeek = { //person : job
    0 : 2,
    1 : 3,
    2 : 0,
    3 : 1
}

function start(){
    var currentDate = Date.now();
    var timeDiff = Math.abs(currentDate - startDate.getTime());
    
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var weeksPassed = Math.floor(diffDays / 7);
    
    calculateNewJobs(weeksPassed);
}

function calculateNewJobs(weeksPassed){
    var table = document.getElementsByTagName("tbody")[0];
    
    var newJobsList = getNewJobsList(weeksPassed);
    for(key in Object.keys(people))
    {
        var row = document.createElement("TR");
        row.appendChild(getCellWithText(people[key]));
        row.appendChild(getCellWithText(jobs[newJobsList[key]]));

        table.appendChild(row);
    }
}

function getCellWithText(text){
    var cell = document.createElement("TH");
    var node = document.createTextNode(text);
    cell.appendChild(node);
    return cell;
}

function getNewJobsList(weeksPassed){ 
    var highestPriority = 3;//Math.max(Object.keys(jobs));
    var lowesPriority = 0;//Math.min(Object.keys(jobs));
    var currentJobs = {};
    for(key in Object.keys(jobsFirstWeek)){
        var newPriority = jobsFirstWeek[key] + weeksPassed;

        while(newPriority > highestPriority){
            var factor = parseInt((newPriority / (highestPriority + 1)).toFixed(2).split('.')[1]) / 25;
            newPriority = factor;
        }
        currentJobs[key] = newPriority;
    }
    return currentJobs;
}