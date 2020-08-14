function addHazard(stepNum){
    var itm = document.getElementById("hazardToClone");
    var cln = itm.cloneNode(true);
    cln.id = "";
    // cln.getElementById("not-likely-to-clone").id = "not-likely-" + stepNum;
    document.getElementById(stepNum).appendChild(cln);
    document.getElementById(stepNum).lastChild.getElementsByClassName("not-likely-to-clone")[0].id = "not-likely-" + stepNum;
}

function addControl(){
    var itm = document.getElementById("controlToClone");
    var cln = itm.cloneNode(true);
    cln.id = "";
    document.getElementById("controlInputs").appendChild(cln);
};

function removeControl(){
    document.getElementById("controlInputs").lastChild.remove();
};

function addStep(){
    var itm = document.getElementById("stepToClone");
    var cln = itm.cloneNode(true);
    cln.id = "";
    document.getElementById("stepDescriptions").appendChild(cln);
};

function removeStep(){
    document.getElementById("stepDescriptions").lastChild.remove();
};

function loadSections(){
    document.getElementById("activity").style.display='block';
    document.getElementById("steps").style.display='none';
    document.getElementById("hazards").style.display='none';
};

function nextSection(currentSection) {
    if(currentSection == "activity"){
        document.getElementById("activity").style.display='none';
        document.getElementById("steps").style.display='block';
    }
    else if(currentSection == "steps"){
        document.getElementById("steps").style.display='none';
        document.getElementById("hazards").style.display='block';
    }
};