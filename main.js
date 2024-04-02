const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.rows = field.length;
        this.cols = field[0].length;
        this.playerRow = 0;
        this.playerCol = 0;
    }
    // выводит на терминал текущее состояние поля
    print() {
        // соеденяю вложенные массивы
        const joinedArray = this.field.map(innerArray => innerArray.join(''));
        // выводим на консоль и соеденяем 2д массив
        console.log(joinedArray.join(''));
    }
    // Ставит шляпу в произвольное положение на поле
    generateHat() {
        const randomRow = Math.floor(Math.random() * this.rows);
        const randomCol = Math.floor(Math.random() * this.cols);
        this.field[randomRow][randomCol] = '^';
    }
    //генератор дыр на поле
    generateHoles() {
        const numHoles = Math.floor(this.rows * this.cols * 0.3); //30% от поверхности поля
        for(let i = 0; i < numHoles; i++) {
            let randomRow, randomCol;
            do {
                randomRow = Math.floor(Math.random() * this.rows);
                randomCol = Math.floor(Math.random() * this.cols);
            } while (this.field[randomRow][randomCol] === '^' || this.field[randomRow][randomCol] === '0');
            this.field[randomRow][randomCol] = '0';
        }
    }

    move(direction) {
        //определение направления движения
        switch (direction.toLowerCase()) {
            case 'up':
                this.playerRow--;
                break;
            case 'down':
                this.playerRow++;
                break;
            case 'left':
                this.playerCol--;
                break;
            case 'right':
                this.playerCol++;
                break;
            default:
                console.log('Invalid direction! Please enter up, down, left, or right.');
                return;
        }
        //определяет не вышел ли игрок за поля
        if(this.playerRow < 0 || this.playerRow >= this.rows || this.playerCol < 0 || this.playerCol >= this.cols) {
            console.log('Out of bounds! Game over.');
            return;
        }
        //определяет выиграл ли игрок или попал в дыру
        const tile = this.field[this.playerRow][this.playerCol];
        if(tile === '^') {
            console.log('Congratulations! You found the hat!');
            return;
        } else if (tile === '0') {
            console.log('Oops! You fell into a hole! Game over.');
            return;
        }
        //актуальное положение
        this.field[this.playerRow][this.playerCol] = '*';
    }

    play() {
        while (true) {
            this.print();
            const direction = prompt('Which direction would you like to move? (up/down/left/right): ');
            this.move(direction);
            console.log('');
            if(!direction || this.field[this.playerRow][this.playerCol] === '^' || this.field[this.playerRow][this.playerCol] === '0') {
                break;
            }
        }
    }

    static generateField(height, width, percentHoles) {
        const field = [];
        const numTiles = height * width;
        const numHoles = Math.floor(numTiles * percentHoles / 100);
        const numEmptyTiles = numTiles - numHoles - 1; // Subtract 1 for the hat
        
        // Initialize field with empty tiles
        for (let i = 0; i < height; i++) {
            field.push(Array(width).fill('░'));
        }

        // Place the hat at a random location
        const hatRow = Math.floor(Math.random() * height);
        const hatCol = Math.floor(Math.random() * width);
        field[hatRow][hatCol] = '^';

        // Place holes at random locations
        let placedHoles = 0;
        while (placedHoles < numHoles) {
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);
            if (field[row][col] === '░' && !(row === 0 && col === 0)) {
                field[row][col] = 'O';
                placedHoles++;
            }
        }
        return field;
    }
}



const myField = new Field(Field.generateField(55, 1, 5));

myField.play();
