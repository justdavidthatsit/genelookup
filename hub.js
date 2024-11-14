async function tableSearcher(gne, values, mutnumppl){
  const groups = await fetch("p1p1.json"); //later change to "outputnobrackets" for full list on official site
  const groupData = await groups.json();
  var filterd = []

  for (var i=0; i<groupData.length; i++){ //var i=0; i<groupData.length; i++  <- default - we're only running 1k for now as to not overload ->  var i=0; i<10000; i++
    gne = gne
    values = values
    const valuespattern = new RegExp(String.raw`\b(?:${values.join('|')})\b`);
    mutnumppl = mutnumppl
    var name = groupData[i].ID // <<< - maybe include a dependancy for what to search by?

    switch (name.includes(gne)) {
      case true:
        if(groupData[i].COUNTof11 == 0){
          break;
        } else {
          filterd.push(groupData[i]);
        };
      case false:
        break;
    }
    /* switch (name.includes(gne)) {
      case true:
        filterd.push(groupData[i]);
      case false:
        break;
    } */
  }
  filterd.sort((a, b) => {
    return ((a.COUNTof11)-(b.COUNTof11));
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