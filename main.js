const getRow = (firstRow, secondRow, letter) => {
    let letterInFirstRow = 0, 
        letterInSecondRow = 0;
    for (let i = 0; i<firstRow.length; i++) {
        firstRow.charAt(i) === letter ? letterInFirstRow += 1 : letterInFirstRow;
    }
    for (let i =0; i<secondRow.length; i++) {
        secondRow.charAt(i) === letter ? letterInSecondRow += 1: letterInSecondRow;
    }
    if (letterInSecondRow > letterInFirstRow) {
        alert(secondRow);
    }
    if (letterInFirstRow > letterInSecondRow) {
         alert(firstRow);
    }
    if (letterInFirstRow === 0 && letterInSecondRow === 0) {
        alert(`there is no letter in the entered lines ${letter}`)
    }
    
}
const firstRow = prompt('Enter the first line'),
      secondRow = prompt('Enter the second line'),
      letter = prompt('Enter the letter');
getRow(firstRow, secondRow, letter);