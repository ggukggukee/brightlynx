// declare variables of inputs and button
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const result = document.getElementById('result');
const button = document.getElementById('button');

// when click button do function
button.addEventListener('click', () => {
    // 0.1 + 0.2 will give answer 0.300000004 because floating point arithmetic not acccurate
    // and for prevent that we will multiply and divide to 10
    const answer = (parseFloat(input1.value)*10 + parseFloat(input2.value)*10)/10;
    // push answer to html
    result.innerHTML = answer;
    // show alert message of sum result
    alert('Result: ' + answer);
});