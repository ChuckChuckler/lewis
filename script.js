let elms = {
    "Si":[4, 1.8],
    "Sb":[5, 1.9],
    "As":[5, 2.0],
    "H":[1, 2.1],
    "C":[4, 2.5],
    "S":[6, 2.5], 
    "I":[7, 2.5],
    "Br":[7, 2.8],
    "N":[5, 3.0],
    "Cl":[7, 3.0],
    "O":[6, 3.5],
    "F":[7, 4.0]
}

let orbitals = {
    2:"sp",
    3:"sp2",
    4:"sp3",
    5:"sp3d",
    6:"sp3d2",
    7:"sp3d3"
}

let vsepr = {
    "2bz0lp":["linear", "180", "symmetrical"],
    "3bz0lp":["trigonal planar", "120", "symmetrical"],
    "2bz1lp":["bent", "120", "asymmetrical"],
    "4bz0lp":["tetrahedral", "109.5", "symmetrical"],
    "3bz1lp":["trigonal bipyramidal", "109.5", "asymmetrical"],
    "2bz2lp":["bent", "109.5", "asymmetrical"],
    "5bz0lp":["trigonal bipyramidal", "120 and 90", "symmetrical"],
    "4bz1lp":["seesaw", "120 and 90", "asymmetrical"],
    "3bz2lp":["t-shaped", "90", "asymmetrical"],
    "2bz3lp":["linear", "180", "symmetrical"],
    "6bz0lp":["octrahedral", "90", "symmetrical"],
    "5bz1lp":["square pyramidal", "90", "asymmetrical"],
    "4bz2lp":["square planar", "90", "symmetrical"],
    "3bz3lp":["t-shaped", "90", "asymmetrical"],
    "2bz4lp":["linear", "180", "symmetrical"]
}


let bz = 0;
let lp = 0;
let hybridOrbital = "";
let polarity = ""; 
let molecularShape;
let bondAngles;

function randint(int){
    return Math.floor(Math.random()*int);
}

function formLewis(){
    let elmsArr = Object.keys(elms);
    elmsArr.splice(elmsArr.indexOf("H"), 1);
    let numOfTermElms = randint(2)+1;
    let termAtom1Num;
    let termAtom1;
    let termAtom2 = "";
    let termAtom2Num;
    let moleculeName = "";
    let valENum;
    let candidates = [];
    let totalTermAtoms = 0;
    let deltaChiStatement = "";
    let singleBonds;
    let doubleBonds;
    let lonePairs;
    let polarityStatement = "";
    let molecularGeometry;
    let numPC = 0;
    let numNPC = 0;
    let numI = 0;

    let answDisp = document.getElementById("ansDisp");
    answDisp.innerText = "";

    let userBz = document.getElementById("bz");
    let userLp = document.getElementById("lp");
    let userHo = document.getElementById("ho");
    let userMs = document.getElementById("ms");
    let userBa = document.getElementById("ba");
    let userPolarity  = document.getElementById("polarity");

    userBz.value = "";
    userLp.value = "";
    userHo.value = "";
    userMs.value = "";
    userBa.value = "";
    userPolarity.value = "";

    let int = randint(elmsArr.length-1);
    let centralAtom = elmsArr[int];
    let centralAtomAbbr = elmsArr[elmsArr.indexOf(centralAtom)];
    elmsArr.splice(int, 1);
    int+=1;
    moleculeName += centralAtom;

    if(numOfTermElms == 1){
        for(let h = 6; h > 1; h--){
            for(let i = int; i < elmsArr.length; i++){
                if((elms[centralAtom][0] + (elms[elmsArr[i]][0])*h) - (h*6 + (h*2)) >= 0){
                    candidates.push([elmsArr[i], h]);
                }
            }
        }
        let chosen = randint(candidates.length);
        termAtom1 = candidates[chosen][0];
        termAtom1Num = candidates[chosen][1];
        totalTermAtoms = termAtom1Num;
        moleculeName += termAtom1 + termAtom1Num.toString();

        valENum = elms[centralAtom][0] + (elms[termAtom1][0])*termAtom1Num;
        lonePairs = valENum-(termAtom1Num*6 + (termAtom1Num*2));

        let deltaChi = Math.round((elms[termAtom1][1] - elms[centralAtom][1])*100)/100;
        deltaChiStatement = `ΔΧ ${centralAtomAbbr}${elmsArr[elmsArr.indexOf(termAtom1)]} = ${elms[termAtom1][1]} - ${elms[centralAtom][1]} = ${deltaChi}`;

        let numPC = 0;
        let numNPC = 0;
        let numI = 0;

        if(deltaChi <= 0.5){
            numNPC = 1;
            polarityStatement += "Nonpolar covalent bond\n";
        }else if(deltaChi >= 1.7){
            numI = 1;
            polarityStatement += "Ionic bond\n";
        }else{
            numPC = 1;
            polarityStatement += "Polar covalent bond\n";
        }

    }else{
        for(let h = 5; h > 1; h--){
            for(let i = int; i < elmsArr.length; i++){
                for(let j = 1; j <= 6-h; j++){
                    for(let k = int; k < elmsArr.length; k++){
                        valENum = elms[centralAtom][0] + (elms[elmsArr[i]][0])*h + (elms[elmsArr[k]][0])*j;
                        lonePairs = valENum-(((h+j)*6) + ((h+j)*2));
                        if((elms[centralAtom][0] + (elms[elmsArr[i]][0])*h + (elms[elmsArr[k]][0])*h) - ((h+j)*6 + ((h+j)*2)) >= 0 && elms[elmsArr[i]][0] != elms[elmsArr[k]][0] && lonePairs >= 0 && lonePairs <= 4){
                            candidates.push([[elmsArr[i], h], [elmsArr[k], j]]);
                        }
                    }
                }
            }
        }

        let chosen = randint(candidates.length);
        termAtom1 = candidates[chosen][0][0];
        termAtom1Num = candidates[chosen][0][1];
        termAtom2 = candidates[chosen][1][0];
        termAtom2Num = candidates[chosen][1][1];

        totalTermAtoms = termAtom1Num + termAtom2Num;
        moleculeName += termAtom1 + termAtom1Num.toString() + termAtom2 + termAtom2Num.toString();

        valENum = elms[centralAtom][0] + (elms[termAtom1][0]*termAtom1Num) + (elms[termAtom2][0]*termAtom2Num);
        lonePairs = valENum - ((totalTermAtoms)*6 + (totalTermAtoms)*2);

        let termAtoms = [termAtom1, termAtom2];

        termAtoms.map((i) => {
            let deltaChi = Math.round((elms[i][1] - elms[centralAtom][1])*100)/100;
            deltaChiStatement += `ΔΧ ${centralAtomAbbr}${elmsArr[elmsArr.indexOf(i)]} = ${elms[i][1]} - ${elms[centralAtom][1]} = ${deltaChi}\n`;
            if(deltaChi <= 0.5){
                numNPC += 1;
            }else if(deltaChi >= 1.7){
                numI += 1;
            }else{
                numPC += 1;
            }
        })

        polarityStatement += `Nonpolar covalent bonds: ${numNPC}\nPolar covalent bonds: ${numPC}\nIonic bonds: ${numI}\n`;

    }



    if(lonePairs%2 != 0){
        if(totalTermAtoms + (lonePairs+1)/2 > 6){
            valENum -= 1;
            lonePairs -= 1;
            moleculeName += "⁺";
        }else{
            valENum += 1;
            lonePairs += 1;
            moleculeName += "⁻";
        }
    }


    moleculeName = moleculeName.replace("1", "");

    singleBonds = totalTermAtoms;
    doubleBonds = 0;

    centralENum = (totalTermAtoms*2) + lonePairs;

    if(centralENum < 8){
        while(centralENum < 8){
            singleBonds -= 1;
            doubleBonds += 1;
            centralENum += 2;
        }
    }

    molecularGeometry = vsepr[`${singleBonds+doubleBonds}bz${lonePairs/2}lp`];
    let symmetry = molecularGeometry[2];

    if(numPC == 0){
        polarityStatement += `No polar bonds-- nonpolar molecule`;
        polarity = "nonpolar";
    }else{
        if(symmetry == "asymmetrical"){
            polarityStatement += `At least one polar bond + asymmetrical geometry-- polar molecule`;
            polarity = "polar";
        }else{
            if(termAtom2 == ""){
                polarityStatement += `Symmetrical geometry, but all terminal atoms the same-- nonpolar molecule`;
                polarity = "nonpolar";
            }else{ 
                polarityStatement += `Symmetrical geometry, but all terminal atoms not the same-- polar molecule`;
                polarity = "polar";
            }
        }
    }

    document.getElementById("moleculeName").innerText = moleculeName;
    
    bz = singleBonds + doubleBonds;
    lp = lonePairs/2;
    hybridOrbital = orbitals[singleBonds+doubleBonds+(lonePairs/2)];
    molecularShape = molecularGeometry[0];
    bondAngles = molecularGeometry[1];
}

function check(){
    let userBz = document.getElementById("bz");
    let userLp = document.getElementById("lp");
    let userHo = document.getElementById("ho");
    let userMs = document.getElementById("ms");
    let userBa = document.getElementById("ba");
    let userPolarity  = document.getElementById("polarity");

    let answDisp = document.getElementById("ansDisp");
    let allCorrect = true;

    answDisp.innerText = "";

    if(userBz.value != bz){
        answDisp.innerText += `Incorrect number of bonding pairs. Correct answer: ${bz}\n`;
        allCorrect = false;
    }

    if(userLp.value != lp){
        answDisp.innerText += `Incorrect number of lone pairs. Correct answer: ${lp}\n`;
        allCorrect = false;
    }

    if(userHo.value.toLowerCase() != hybridOrbital){
        answDisp.innerText += `Incorrect hybridization orbital. Correct answer: ${hybridOrbital}\n`;
        allCorrect = false;
    }

    if(userMs.value.toLowerCase().replace("-", " ") != molecularShape.replace("-", " ")){
        answDisp.innerText += `Incorrect molecular shape. Correct answer: ${molecularShape}\n`;
        allCorrect = false;
    }

    if(userBa.value != bondAngles){
        answDisp.innerText += `Incorrect bond angles. Correct answer: ${bondAngles}\n`;
        allCorrect = false;
    }

    if(userPolarity.value.toLowerCase() != polarity){
        answDisp.innerText += `Incorrect molecule polarity. Correct answer: ${polarity}\n`;
        allCorrect = false;
    }

    if(allCorrect == true){
        answDisp.innerText = "Correct!";
    }
}

formLewis();