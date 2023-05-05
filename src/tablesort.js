/** 
 * 
 * @param {HTMLTableElement} table table to be sorted
 * @param {number} column the index of the column to be sorting by
 * @param {boolean} asc if its ascending or not
 */
//**

/* function sorttablebycolumn(table, column, asc = true) {
  const thedirection = asc ? 1 : -1;
  const thetable = document.getElementById('example');
  console.log(thetable);
  const therows = Array.from(thetable.querySelectorAll("tr"));

  //now we're sorting
  const sortedrows = therows.sort((a, b) => {
    const acolumntext = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
    const bcolumntext = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

    return acolumntext > bcolumntext ? (1*thedirection) : (-1*thedirection);
  });
}

function timeee() {
  sorttablebycolumn(document.querySelector("table"), 29);
  setTimeout(timeee, 5000);
}

timeee(); IFFY CODE */