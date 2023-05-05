// dependancies and shortcuts ------------------------------------- //


async function tableSearcher(val){
  const groups = await fetch("newdata.json"); //bioconvert.json
  const groupData = await groups.json();
  var filterd = []

  for (var i=0; i<groupData.length; i++){
    val = val.toLowerCase()
    var name = groupData[i].Gene.toLowerCase() // <<< - "groupdata[i].THINGYOUWANTTOSEARCHTHROUGH.toLowerCase()" < - [NEW] maybe include a dependancy for what to search by?
    if (name.includes(val)){
      filterd.push(groupData[i])
    }
  }
  filterd.sort((a, b) => {
    return ((a.AF_HA+a.N_HET_HA)-(b.AF_HA+b.N_HET_HA)) // <<< - this is where you put the formula, maybe include dependancy for what to sort it by
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
    tr.appendChild(createRowThingy(data[val].N_HOM));
    tr.appendChild(createRowThingy(data[val].N_HET));
    tr.appendChild(createRowThingy(data[val].N_REF));
    tr.appendChild(createRowThingy(data[val].AF));
    tr.appendChild(createRowThingy(data[val].N_HOM_AA));
    tr.appendChild(createRowThingy(data[val].N_HET_AA));
    tr.appendChild(createRowThingy(data[val].N_REF_AA));
    tr.appendChild(createRowThingy(data[val].AF_AA));
    tr.appendChild(createRowThingy(data[val].N_HOM_EA));
    tr.appendChild(createRowThingy(data[val].N_HET_EA));
    tr.appendChild(createRowThingy(data[val].N_REF_EA));
    tr.appendChild(createRowThingy(data[val].AF_EA));
    tr.appendChild(createRowThingy(data[val].N_HOM_HA));
    tr.appendChild(createRowThingy(data[val].N_HET_HA));
    tr.appendChild(createRowThingy(data[val].N_REF_HA));
    tr.appendChild(createRowThingy(data[val].AF_HA));
    tr.appendChild(createRowThingy((data[val].AF_HA)+(data[val].N_HET_HA)));
    table.appendChild(tr);
  }
}

async function seeker(){
  var q = document.getElementById("searchq").value;
  if(q.length<1){
    console.log("thats not doing anything");
    return;
  } else {
  console.log(q);
  var data
  tableSearcher(q).then(x=>{
    data = x
    console.log(data);
    tableBuilder(data);
  });
  }
};

window.onload = function() {
  seeker();
};