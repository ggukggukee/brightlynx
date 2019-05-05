// select table cells(chess squares)
const tds = document.getElementsByTagName('td');
const blackCells = document.getElementsByClassName('bl');

// count 0 for double click of table cell
let count = 0;

// remove white background 
const removeWhite = function removeWhiteBackground() {
    Array.from(tds, (el) => {
        el.classList.remove('white');
    });
}

// add click event listener for every chess squares from array
Array.from(tds, (el) => {
    el.addEventListener('click', () => {
        if (count == 0) {
            removeWhite();

            // remove black color from clicked cell
            el.classList.remove('black');

            // get number from class of clicked cell
            const clicked = parseInt(el.classList[1], 10);

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
            const move1 = document.getElementsByClassName(num1)[0];
            const move2 = document.getElementsByClassName(num2)[0];
            const move3 = document.getElementsByClassName(num3)[0];
            const move4 = document.getElementsByClassName(num4)[0];
            const move5 = document.getElementsByClassName(num5)[0];
            const move6 = document.getElementsByClassName(num6)[0];
            const move7 = document.getElementsByClassName(num7)[0];
            const move8 = document.getElementsByClassName(num8)[0];

            // add green color for clicked cell
            el.classList.add('green');

            // remove black color for next moves of knight
            move1.classList.remove('black');
            move2.classList.remove('black');
            move3.classList.remove('black');
            move4.classList.remove('black');
            move5.classList.remove('black');
            move6.classList.remove('black');
            move7.classList.remove('black');
            move8.classList.remove('black');

            // add blue color for next moves of knight
            move1.classList.add('blue');
            move2.classList.add('blue');
            move3.classList.add('blue');
            move4.classList.add('blue');
            move5.classList.add('blue');
            move6.classList.add('blue');
            move7.classList.add('blue');
            move8.classList.add('blue');

            // count to 1 for next click
            count += 1;
        } else {
            // execute second click for reset chess squares
            Array.from(tds, (el) => {
                // add white background by adding class white
                el.classList.add('white');

                // remove background from clicked and next moves of knight
                el.classList.remove('blue');
                el.classList.remove('green');
            });

            // giving back black color for black cells
            Array.from(blackCells, (bl) => {
                bl.classList.add('black');
            })
            
            // count back to 0 for execute functions from if statement
            count = 0;
        }
    });
});       