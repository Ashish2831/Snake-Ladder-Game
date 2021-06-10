const snakes = {
    '6': 2,
    '10': 3
}

const ladder = {
    '4': 8,
    '11': 15
}

function renderBoard() {

    const boardBlocks = [
        [16, 15, 14, 13],
        [9, 10, 11, 12],
        [8, 7, 6, 5],
        [1, 2, 3, 4],
    ]

    const boardContent = boardBlocks.map(rowValues =>
        `
        <div class="row">
        ${
            rowValues.map(colVAlues => 
                `
                <div data-block="${colVAlues}" class="col ${snakes[colVAlues] ? 'snake' : ''} ${ladder[colVAlues] ? 'ladder' : ''}">${colVAlues} ${snakes[colVAlues] ? `to ${snakes[colVAlues]}` : ''} ${ladder[colVAlues] ? `to ${ladder[colVAlues]}` : ''}</div>
                `
                ).join('')
            }
            </div>
            `
    ).join('');

    document.querySelector('#board').innerHTML = boardContent;
}

function rollDice() {
    const diceResult = Math.round(Math.random() * (6 - 1) + 1);
    document.querySelector('#dice').innerText = diceResult;

    const currentPosition = getPlayerPosition();
    setPlayerPosition(currentPosition + diceResult);
}

function setPlayerPosition(number) {
    if (number == 16) {
        alert('You Win!!');
        setPlayerPosition(1);
        return;
    }

    if (number > 16) {
        alert('Cannot Set Position');
        return;
    }

    if (snakes[number]) {
        alert(`Snake at ${number} to ${snakes[number]}`);
        number = snakes[number];
    }

    if (ladder[number]) {
        alert(`Ladder at ${number} to ${ladder[number]}`);
        number = ladder[number];
    }

    const currPlayer = document.querySelector('.player');
    if (currPlayer) {
        currPlayer.classList.remove('player');
    }

    const player = document.querySelector(`.col[data-block="${number}"]`);
    player.classList.add('player');
}

function getPlayerPosition() {
    const currPlayer = document.querySelector('.player');
    return parseInt(currPlayer.dataset.block);
}

renderBoard();
setPlayerPosition(1);
document.querySelector('#roll-dice').addEventListener('click', rollDice)