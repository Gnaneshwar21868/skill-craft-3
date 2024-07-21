document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board

    // Function to initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
        updateStatus(`Player ${currentPlayer}'s turn`);
    }

    // Function to handle a cell being clicked
    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[index] === '') { // Check if cell is empty
            gameBoard[index] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            if (checkWin()) {
                updateStatus(`Player ${currentPlayer} wins!`);
                board.removeEventListener('click', handleCellClick); // Disable further clicks
            } else if (checkDraw()) {
                updateStatus('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus(`Player ${currentPlayer}'s turn`);
            }
        }
    }

    // Function to update game status
    function updateStatus(message) {
        status.textContent = message;
    }

    // Function to check for a win condition
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]);
        });
    }

    // Function to check for a draw condition
    function checkDraw() {
        return gameBoard.every((cell) => cell !== '');
    }

    // Function to reset the game
    function resetGame() {
        board.innerHTML = '';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        initializeBoard();
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);

    // Initialize the game board
    initializeBoard();
});
