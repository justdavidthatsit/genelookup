// "What are the numbers for in the switch cases?"          //
// The numbers in the switch cases are there to keep track  //
// of what we're looking for. So, everything initially      //
// explained in 2* is what's being checked for/notes on     //
// each following entry with a 2* at the end and so on.     //

async function tableSearcher(gne, mut, mut2, mut1p){
  const groups = await fetch("newdata.json"); //bioconvert.json
  const groupData = await groups.json();
  var filterd = []

  // IF name includes val AND if the mutation includes its said value AND if mutations present is checked, check for N_HET = 1 

  for (var i=0; i<groupData.length; i++){
    gne = gne.toLowerCase()
    mut = mut.toLowerCase()
    mut2 = mut2.toLowerCase()
    mut1p = mut1p
    var name = groupData[i].Gene.toLowerCase() // <<< - "groupdata[i].THINGYOUWANTTOSEARCHTHROUGH.toLowerCase()" < - [NEW] maybe include a dependancy for what to search by?
    var mutation = groupData[i].Effect.toLowerCase()
    var mut1person = groupData[i].N_HET
    switch (mut1p) { //2* checking for if you only want mutations present in 1 person
      case true:
        switch (mut2) { //3* checking for if there is a second mutation you want to search for
          case "no":
            if (name == gne && mutation.includes(mut) && mut1person==1){ //1* changed "name.includes(gne)" to "name == gne" for SPECIFIC search
              filterd.push(groupData[i])
            };
            break;
          default:
            if (name == gne && (mutation.includes(mut) || mutation.includes(mut2)) && mut1person==1){ //1*
              filterd.push(groupData[i])
            };
            break;
        }
      case false:
        switch (mut2) { //3*
          case "no":
            if (name == gne && mutation.includes(mut)){ //1*
              filterd.push(groupData[i])
            }
            break;
          default:
            if (name == gne && (mutation.includes(mut) || mutation.includes(mut2))){ //1*
              filterd.push(groupData[i])
            }
            break;
        }
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
  var mut = document.getElementById("mutationsearchbox").value;
  var mut2 = document.getElementById("mutationsearchbox2").value;
  var mut1person = document.getElementById("mutations1personbox").checked;
  if(q.length<1){
    console.log("thats not doing anything");
    return;
  } else {
  console.log(q, mut, mut2, mut1person);
  var data
  tableSearcher(q, mut, mut2, mut1person).then(x=>{
    data = x
    console.log(data);
    tableBuilder(data);
  });
  }
};

window.onload = function() {
  seeker();
};