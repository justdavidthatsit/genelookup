// "What are the numbers for in the switch cases?"          //
// The numbers in the switch cases are there to keep track  //
// of what we're looking for. So, everything initially      //
// explained in 2* is what's being checked for/notes on     //
// each following entry with a 2* at the end and so on.     //
/* OLD CODE KEEP INCASE NECESSARY
async function tableSearcher(gne, values, mutnumppl){
  const groups = await fetch("newdata.json"); //bioconvert.json
  const groupData = await groups.json();
  var filterd = []

  // IF name includes val AND if the mutation includes its said value AND if mutations present is checked, check for N_HET = 1 

  for (var i=0; i<groupData.length; i++){
    gne = gne.toLowerCase()
    values = values
    const valuespattern = new RegExp(String.raw`\b(?:${values.join('|')})\b`);
    mutnumppl = mutnumppl

    var name = groupData[i].Gene.toLowerCase() // <<< - "groupdata[i].THINGYOUWANTTOSEARCHTHROUGH.toLowerCase()" < - [NEW] maybe include a dependancy for what to search by?
    var mutation = groupData[i].Effect.toLowerCase()
    var mutinperson = groupData[i].N_HET

    switch (name == gne) {
      case true:
        switch (mutnumppl>0) {
          case true:
            switch (values.length>0) {
              case true:
                //REACHED HERE IF: -NAME is given -MUTNUMPPL is given -VALUES are given
                if (mutation.match(valuespattern) && mutnumppl == mutinperson) {
                  filterd.push(groupData[i]);
                };
                break;
              default:
                //REACHED HERE IF: -NAME is given -MUTNUMPPL is given
                if (mutnumppl == mutinperson) {
                  filterd.push(groupData[i]);
                };
                break;
            }
            break;
          default:
            switch (values.length>0) {
              case true:
                //REACHED HERE IF: -NAME is given -VALUES are given
                if (mutation.match(valuespattern)) {
                  filterd.push(groupData[i]);
                };
                break;
              default:
                //REACHED HERE IF: -NAME is given
                filterd.push(groupData[i]);
            }
            break;
        };
        break;
      case false:
        break;
    }
  }
  filterd.sort((a, b) => {
    //return (( a.AF_HA+a.N_HET_HA )-( b.AF_HA+b.N_HET_HA )) // <<< - this is where you put the formula, maybe include dependancy for what to sort itby
    return (( 1-(Math.pow((2*(b.N_REF)*(b.N_HET))/(2*((b.N_REF)+(b.N_HET)+(b.N_HOM))),2)) )-( 1-(Math.pow((2*(a.N_REF)*(a.N_HET))/(2*((a.N_REF)+(a.N_HET)+(a.N_HOM))),2)) ))
  });
  return filterd
}



function tableBuilder(data){
  function createRowThingy(name){
    let td = document.createElement('td');
    td.textContent = name;
    return td;
  };
  const table = document.getElementById("data-output");
  table.innerHTML = '';

  for (val in data) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    tr.appendChild(createRowThingy(data[val].SNP));
    tr.appendChild(createRowThingy(data[val].CHR));
    tr.appendChild(createRowThingy(data[val].POS));
    tr.appendChild(createRowThingy(data[val].ID));
    tr.appendChild(createRowThingy(data[val].REF));
    tr.appendChild(createRowThingy(data[val].ALT));
    tr.appendChild(createRowThingy(data[val].Effect));
    tr.appendChild(createRowThingy(data[val].AnyIsLof));
    tr.appendChild(createRowThingy(data[val].Deleterious));
    tr.appendChild(createRowThingy(data[val].Gene));
    tr.appendChild(createRowThingy(data[val].FracTrAffected));
    tr.appendChild(createRowThingy(data[val].HGVSc));
    tr.appendChild(createRowThingy(data[val].HGVSp));
    tr.appendChild(createRowThingy(data[val].N_HOM)); // 1
    tr.appendChild(createRowThingy(data[val].N_HET)); // 1
    tr.appendChild(createRowThingy(data[val].N_REF)); // 1
    tr.appendChild(createRowThingy(data[val].AF));
    tr.appendChild(createRowThingy(data[val].N_HOM_AA)); // 2
    tr.appendChild(createRowThingy(data[val].N_HET_AA)); // 2
    tr.appendChild(createRowThingy(data[val].N_REF_AA)); // 2
    tr.appendChild(createRowThingy(data[val].AF_AA));
    tr.appendChild(createRowThingy(data[val].N_HOM_EA)); // 3
    tr.appendChild(createRowThingy(data[val].N_HET_EA)); // 3
    tr.appendChild(createRowThingy(data[val].N_REF_EA)); // 3
    tr.appendChild(createRowThingy(data[val].AF_EA));
    tr.appendChild(createRowThingy(data[val].N_HOM_HA)); // 4
    tr.appendChild(createRowThingy(data[val].N_HET_HA)); // 4
    tr.appendChild(createRowThingy(data[val].N_REF_HA)); // 4
    tr.appendChild(createRowThingy(data[val].AF_HA));
    if((data[val].N_HOM)==0 || (data[val].N_HET)==0 || (data[val].N_REF)==0){ //HWE CHECK 1
      tr.appendChild(createRowThingy(data[val].N_HET));
    } else {
      tr.appendChild(createRowThingy( (data[val].N_HOM)+(data[val].N_HET)+(data[val].N_REF) )); // HWE formula here
    };
    tr.appendChild(createRowThingy(1-(Math.pow((2*(data[val].N_REF)*(data[val].N_HET))/(2*((data[val].N_REF)+(data[val].N_HET)+(data[val].N_HOM))),2))));
    table.appendChild(tr);
  }
}

async function seeker(){
  var q = document.getElementById("genesearchbox").value;
  var values = [];
  var checkboxes = document.querySelectorAll('input[name="mutationoption"]:checked');
  var mutinnumofppl = document.getElementById("numinhowmanyppl").value;
  if(q.length<1){
    console.log("thats not doing anything THIS IS FROM THE IF STATEMENT IN THE SEEKER");
    return;
  } else {
    checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
    });
    console.log(q, values, mutinnumofppl);
    var data
    tableSearcher(q, values, mutinnumofppl).then(x=>{
      data = x
      console.log(data);
      tableBuilder(data);
    });
  }
};

window.onload = function() {
  seeker();
};
*/
async function tableSearcher(gne, values, mutnumppl){
  const groups = await fetch("p1p1.json");
  const groupData = await groups.json();
  var filterd = []

  // IF name includes val AND if the mutation includes its said value AND if mutations present is checked, check for N_HET = 1 

  for (var i=0; i<groupData.length; i++){
    gne = gne
    values = values
    const valuespattern = new RegExp(String.raw`\b(?:${values.join('|')})\b`);
    mutnumppl = mutnumppl

    var name = groupData[i].numCHROM // <<< - "groupdata[i].THINGYOUWANTTOSEARCHTHROUGH.toLowerCase()" < - [NEW] maybe include a dependancy for what to search by?

    switch (name == gne) {
      case true:
        filterd.push(groupData[i]);
      case false:
        break;
    }
  }
  filterd.sort((a, b) => {
    //return (( a.AF_HA+a.N_HET_HA )-( b.AF_HA+b.N_HET_HA )) // <<< - this is where you put the formula, maybe include dependancy for what to sort itby
    return (( 1-(Math.pow((2*(b.N_REF)*(b.N_HET))/(2*((b.N_REF)+(b.N_HET)+(b.N_HOM))),2)) )-( 1-(Math.pow((2*(a.N_REF)*(a.N_HET))/(2*((a.N_REF)+(a.N_HET)+(a.N_HOM))),2)) ))
  });
  return filterd
}



function tableBuilder(data){
  function createRowThingy(name){
    let td = document.createElement('td');
    td.textContent = name;
    return td;
  };
  const table = document.getElementById("data-output");
  table.innerHTML = '';

  for (val in data) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    tr.appendChild(createRowThingy(data[val].numCHROM));
    tr.appendChild(createRowThingy(data[val].POS));
    tr.appendChild(createRowThingy(data[val].ID));
    tr.appendChild(createRowThingy(data[val].REF));
    tr.appendChild(createRowThingy(data[val].ALT));
    tr.appendChild(createRowThingy(data[val].QUAL));
    tr.appendChild(createRowThingy(data[val].FILTER));
    tr.appendChild(createRowThingy(data[val].INFO));
    tr.appendChild(createRowThingy(data[val].FORMAT));
    tr.appendChild(createRowThingy(data[val].COUNTof00));
    tr.appendChild(createRowThingy(data[val].COUNTofMISSINGDATA));
    tr.appendChild(createRowThingy(data[val].COUNTof01));
    tr.appendChild(createRowThingy(data[val].COUNTof11));
    table.appendChild(tr);
  }
}

async function seeker(){
  var q = document.getElementById("genesearchbox").value;
  var values = [];
  var checkboxes = document.querySelectorAll('input[name="mutationoption"]:checked');
  var mutinnumofppl = document.getElementById("numinhowmanyppl").value;
  if(q.length<1){
    console.log("thats not doing anything THIS IS FROM THE IF STATEMENT IN THE SEEKER");
    return;
  } else {
    checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
    });
    console.log(q, values, mutinnumofppl);
    var data
    tableSearcher(q, values, mutinnumofppl).then(x=>{
      data = x
      console.log(data);
      tableBuilder(data);
    });
  }
};

window.onload = function() {
  seeker();
};