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
}



const myField = new Field([
    ['░', '░', '░'],
    ['░', '░', '░'],
    ['░', '░', '░']
]);

myField.generateHat();
myField.generateHoles();
myField.print();
