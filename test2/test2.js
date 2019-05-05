// select table cells(chess squares)
const tds = document.getElementsByTagName('td');

// get array from content of tds
const emptyArray = [];
Array.from(tds, (el) => {
    emptyArray.push(el.innerHTML);
});
const tdsArray = emptyArray.join();

// setting prompt
const squarePrompt = prompt('Write initial position of knight (has to be UPPERCASE)', 'D4');

// check if written inside of array
if(tdsArray.includes(squarePrompt)) {
    // get element of prompted square
    const clickedPrompt = document.getElementById(squarePrompt);

    // get number from class of clicked cell
    const clicked = parseInt(clickedPrompt.classList[1], 10);

    // calculated next knight's moves by numbers of classname
    const num1 = clicked + 38;
    const num2 = clicked - 38;
    const num3 = clicked + 34;
    const num4 = clicked - 34;
    const num5 = clicked + 73;
    const num6 = clicked - 73;
    const num7 = clicked + 71;
    const num8 = clicked - 71;

    // declare cells of next moves
    const m1 = document.getElementsByClassName(num1)[0];
    const m2 = document.getElementsByClassName(num2)[0];
    const m3 = document.getElementsByClassName(num3)[0];
    const m4 = document.getElementsByClassName(num4)[0];
    const m5 = document.getElementsByClassName(num5)[0];
    const m6 = document.getElementsByClassName(num6)[0];
    const m7 = document.getElementsByClassName(num7)[0];
    const m8 = document.getElementsByClassName(num8)[0];

    // declare coordinates'
    const m1ih = m1.innerHTML + ' ';
    const m2ih = m2.innerHTML + ' ';
    const m3ih = m3.innerHTML + ' ';
    const m4ih = m4.innerHTML + ' ';
    const m5ih = m5.innerHTML + ' ';
    const m6ih = m6.innerHTML + ' ';
    const m7ih = m7.innerHTML + ' ';
    const m8ih = m8.innerHTML;

    // show results
    alert('Possible moves for knight from ' + squarePrompt + ' : ' + m1ih + m2ih + m3ih + m4ih + m5ih + m6ih + m7ih + m8ih)
} else {
    // if wrote wrong position or lowercase
    alert('Enter valid chess coordinates (for example: F7)');
}
