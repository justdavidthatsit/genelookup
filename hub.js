// dependancies and shortcuts ------------------------------------- //


async function tableSearcher(val){
  const groups = await fetch(jsonStream.output); //bioconvert.json
  const groupData = await groups.json();
  var filterd = []

  for (var i=0; i<groupData.length; i++){
    val = val.toLowerCase()
    var name = groupData[i].Gene.toLowerCase() // <<< - HERE SEARCHES LIKE "groupdata[i].THINGYOUWANTTOSEARCHTHROUGH.toLowerCase()"
    if (name.includes(val)){
      filterd.push(groupData[i])
    }
  }
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

// ISSUE --------------------------------------------------------- //
// the function below loads everything all at once, while this is  //
// helpful in theory- it crashes the website due to the sheer      //
// size of all the data. i'll be using it to help make something   //
// that selectively picks something from the dataid "Gene".        //
// ISSUE --------------------------------------------------------- //
/*
async function getNewSummary() {
  try {
      const groups = await fetch("converteddata.json");
      const groupData = await groups.json();
      console.log('Num documents: ', groupData.length);
      console.log('Example document: ', groupData[0]);
      function createRowThingy(name){
        let td = document.createElement('td');
        td.textContent = name;
        return td;
      };
      const table = document.getElementById("data-output");
      
      for (data in groupData) {
          let tr = document.createElement('tr');
          let td = document.createElement('td');
          tr.appendChild(createRowThingy(groupData[data].SNP));
          tr.appendChild(createRowThingy(groupData[data].CHR));
          tr.appendChild(createRowThingy(groupData[data].POS));
          tr.appendChild(createRowThingy(groupData[data].ID));
          tr.appendChild(createRowThingy(groupData[data].REF));
          tr.appendChild(createRowThingy(groupData[data].ALT));
          tr.appendChild(createRowThingy(groupData[data].Effect));
          tr.appendChild(createRowThingy(groupData[data].AnyIsLof));
          tr.appendChild(createRowThingy(groupData[data].Deleterious));
          tr.appendChild(createRowThingy(groupData[data].Gene));
          tr.appendChild(createRowThingy(groupData[data].FracTrAffected));
          tr.appendChild(createRowThingy(groupData[data].HGVSc));
          tr.appendChild(createRowThingy(groupData[data].HGVSp));
          tr.appendChild(createRowThingy(groupData[data].N_HOM));
          tr.appendChild(createRowThingy(groupData[data].N_HET));
          tr.appendChild(createRowThingy(groupData[data].N_REF));
          tr.appendChild(createRowThingy(groupData[data].AF));
          tr.appendChild(createRowThingy(groupData[data].N_HOM_AA));
          tr.appendChild(createRowThingy(groupData[data].N_HET_AA));
          tr.appendChild(createRowThingy(groupData[data].N_REF_AA));
          tr.appendChild(createRowThingy(groupData[data].AF_AA));
          tr.appendChild(createRowThingy(groupData[data].N_HOM_EA));
          tr.appendChild(createRowThingy(groupData[data].N_HET_EA));
          tr.appendChild(createRowThingy(groupData[data].N_REF_EA));
          tr.appendChild(createRowThingy(groupData[data].AF_EA));
          tr.appendChild(createRowThingy(groupData[data].N_HOM_HA));
          tr.appendChild(createRowThingy(groupData[data].N_HET_HA));
          tr.appendChild(createRowThingy(groupData[data].N_REF_HA));
          tr.appendChild(createRowThingy(groupData[data].AF_HA));
          table.appendChild(tr);
      }
      
  } catch (e) {
      console.log(e);
  }
}

getNewSummary();
*/