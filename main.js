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
}



const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '░', '░']
]);

myField.generateHat();
myField.print();
