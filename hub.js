async function tableSearcher(gne, values, mutnumppl){
  // all info
  const groups = await fetch("ch1editedforgithub.json"); //later change to "outputnobrackets" for full list on official site
  const groupData = await groups.json();

  var filterd = []

  for (var i=0; i<10000; i++){ //var i=0; i<groupData.length; i++  <- default - we're only running 1k for now as to not overload ->  var i=0; i<10000; i++
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


//builds the table
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

//searching function
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

//listen for clicks on table, bring result when clicked
document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.querySelector('#data-output');
  tbody.addEventListener('click', function(event) {
    const row = event.target.closest('tr');
    if (row) {
      const rowId = row.querySelector('td:nth-child(3)');
      const rowIdReadable = rowId.textContent.trim();
      console.log(`you clicked row with the id ${rowIdReadable}, also row = ${row.rowIndex}`);
      //now we do some finding with "testcsvoutput.json", can possibly make an array and search like that but meh
      fetch("testcsvoutput.json")
        .then(Response => Response.json())
        .then(jsonData => {
          const foundData = findSNP(jsonData, rowIdReadable);
          if (foundData) { //once data is found
            console.log(foundData);
            //create dropdown row, it ignores all cells and just displays text. all u want is text rn, no actual cells
            // check if row exists, if so, delete it, if not, add it
            if (document.getElementById(rowIdReadable)) {
              var bye = document.getElementById(rowIdReadable).rowIndex;
              tbody.deleteRow(bye - 1);
            } else {
              var tablelocation = document.getElementById("data-output");
              var newrow = tablelocation.insertRow(row.rowIndex) //placing new row under clicked row
              var cell1 = newrow.insertCell(0);
              //clean up the text that's about to be shown
              var texttobeshown =
              `<strong>SNP:</strong> ${foundData.SNP}
               <strong>CHR:</strong> ${foundData.CHR}
               <strong>POS:</strong> ${foundData.POS}
               <strong>ID:</strong> ${foundData.ID}
               <strong>REF:</strong> ${foundData.REF}
               <strong>ALT:</strong> ${foundData.ALT}
               <strong>Effect:</strong> ${foundData.Effect}
               <strong>AnyIsLof:</strong> ${foundData.AnyIsLof}
               <strong>Deleterious:</strong> ${foundData.Deleterious}<br>
               <strong>Gene:</strong> ${foundData.Gene}
               <strong>FracTrAffected:</strong> ${foundData.FracTrAffected}
               <strong>HGVSc:</strong> ${foundData.HGVSc}
               <strong>HGVSp:</strong> ${foundData.HGVSp}<br>
               <strong>N_HOM:</strong> ${foundData.N_HOM}
               <strong>N_HET:</strong> ${foundData.N_HET}
               <strong>N_REF:</strong> ${foundData.N_REF}<br>
               <strong>AF:</strong> ${foundData.AF}
               <strong>N_HOM_AA:</strong> ${foundData.N_HOM_AA}
               <strong>N_HET_AA:</strong> ${foundData.N_HET_AA}
               <strong>N_REF_AA:</strong> ${foundData.N_REF_AA}<br>
               <strong>AF_AA:</strong> ${foundData.AF_AA}
               <strong>N_HOM_EA:</strong> ${foundData.N_HOM_EA}
               <strong>N_HET_EA:</strong> ${foundData.N_HET_EA}
               <strong>N_REF_EA:</strong> ${foundData.N_REF_EA}<br>
               <strong>AF_EA:</strong> ${foundData.AF_EA}
               <strong>N_HOM_HA:</strong> ${foundData.N_HOM_HA}
               <strong>N_HET_HA:</strong> ${foundData.N_HET_HA}
               <strong>N_REF_HA:</strong> ${foundData.N_REF_HA}
               <strong>AF_HA:</strong> ${foundData.AF_HA}
              `
              newrow.id = rowIdReadable //unique id
              newrow.classList.add("dropdown");
              cell1.colSpan = "13";
              //cell1.rowSpan = "2";
              cell1.innerHTML = `${texttobeshown}`;
            }
          } else { //cant find anything
            console.log("cant find the matching snp");
          }
        })
        .catch(error => {
          console.log("Error fetching or parsing JSON:", error);
        });
    };
  });
});

function findSNP(jsonData, snpValue) {
  return jsonData.find(obj => obj.SNP === snpValue);
};

window.onload = function() {
  seeker();
};