/*TASK MEGA CASINO*/
/*Game Machine*/
class GameMachine {
    constructor(bank) {
        this.bank = bank;
    }

    get money() {
        return this.bank;
    }

    giveMoney(money) {
        if (money <= this.bank) {
            this.bank -= money;
        }
    }

    addMoney(money) {
        this.bank += money;
    }

    play(bet) {
        let firstNumber = Math.floor(Math.random() * (10));
        let secondNumber = Math.floor(Math.random() * (10));
        let thirdNumber = Math.floor(Math.random() * (10));
        this.bank += bet;

        console.log(firstNumber, secondNumber, thirdNumber);

        if (
            firstNumber === secondNumber ||
            firstNumber === thirdNumber ||
            secondNumber === thirdNumber
        ) {
            console.log("Ти Виграв!");
            bet *= 2;
            this.bank -= bet;
            return bet;
        } else if (firstNumber === secondNumber && secondNumber === thirdNumber) {
            console.log("Ти Супер Переможець!,твоя ставка * 3 :) ");
            bet *= 3;
            this.bank -= bet;
            return bet;
        } else {
            console.log("Ти програв!");
            this.bank += bet;
            return -bet;
        }
    }
}

/*Casino*/

class Casino {
    constructor(name) {
        this.name = name;
        this.machines = [];
    }

    get getMachineCount() {
        return this.machines.length;
    }

    get getMoney() {
        return this.machines.reduce((acc, machine) => {
            return acc + machine.bank;
        }, 0);
    }
}

/*User*/

class User {
    constructor(name, money) {
        this.name = name;
        this.money = money;
        this.select_machine = null;
    }

    get selectMachine() {
        return this.select_machine;
    }

    set selectMachine(machine) {
        this.select_machine = machine;
    }

    play(bet) {
        if (bet > this.money) {
            console.error(`${this.name} у вас не вистачає грошей :(`);

            return;
        }

        if (this.select_machine === null) {
            console.error("Будь ласка,виберіть машину для гри");

            return;
        }

        this.money += this.select_machine.play(bet);
    }
}

/*SuperAdmin*/

class SuperAdmin extends User {
    constructor(name, money) {
        super(name, money);
        this.casino = null;
    }

    createCasino(casinoName) {
        const newCasino = new Casino(casinoName);
        this.casino = newCasino;

        return newCasino;
    }

    createGameMachine(bank) {
        if (!this.casino) {
            console.error("Будь ласка, створіть якесь казино.");

            return;
        }

        if (bank >= this.money) {
            console.error("Не вистачає грошей на створення ігрової машини.");

            return;
        }

        const newMachine = new GameMachine(bank);
        this.casino.machines.push(newMachine);
        this.money -= bank;

        return newMachine;
    }

    removeGameMachine(id) {
        if (!this.casino) {
            console.error("Будь ласка, створіть якесь казино.");

            return;
        }

        const machines = [...this.casino.machines];
        if (!machines.length) {
            console.error("Будь ласка, створіть ігровий автомат.");

            return;
        }

        if (machines[id] === undefined) {
            console.error("Іd ігрового автомата помилковий.");

            return;
        }

        const cash = machines[id].bank;
        machines.splice(id, 1);
        const machineCount = machines.length;

        machines.forEach(machine => {
            const profit = (cash / machineCount).toFixed(2);
            machine.bank += +profit;
        });

        this.casino.machines = [...machines];
    }

    takeMoneyFromCasino(sum) {
        const machines = [...this.casino.machines];
        const allBank = machines.reduce((acc, machine) => acc + machine.bank, 0);

        if (sum > allBank) {
            console.error("Вибачте, але сума є більшою за банк казино.");

            return;
        }

        const percentageFromBank = sum / allBank;

        machines.forEach(machine => {
            machine.bank = +(machine.bank * (1 - percentageFromBank)).toFixed(2);
        });

        this.casino.machines = [...machines];
        this.money += sum;
    }

    addMoneyToCasino(money) {
        if (money <= 0) {
            console.error("Будь ласка,введіть суму > 0");

            return;
        }

        if (!this.casino) {
            console.error("Будь ласка, створіть якесь казино.");

            return;
        }

        const length = this.casino.machines.length;
        if (!length) {
            console.error("Будь ласка, створіть ігровий автомат");

            return;
        }

        if (money >= this.money) {
            console.error("Не вистачає грошей, щоб додати їх в ігровий автомат");

            return;
        }

        this.casino.machines.forEach(machine => {
            machine.bank += money / length;
        });

        this.money -= money;
    }

    addMoneyToGameMachine(id, money) {
        if (money <= 0) {
            console.error("Будь ласка,введіть суму > 0");

            return;
        }

        if (!this.casino) {
            console.error("Будь ласка, створіть якесь казино.");

            return;
        }

        if (money >= this.money) {
            console.error("Не вистачає грошей, щоб додати їх в ігровий автомат");

            return;
        }

        if (this.casino.machines[id] === undefined) {
            console.error("Іd ігрового автомата помилковий.");

            return;
        }

        this.money -= money;
        this.casino.machines[id].bank += money;
    }
}

const admin=new SuperAdmin('admin',10000);
console.log(admin);
const casino= admin.createCasino('1Xbet');
console.log(casino)
admin.createGameMachine(500)
admin.createGameMachine(400)
admin.takeMoneyFromCasino(1000)
console.log(casino);
const machine=new GameMachine(500)
admin.selectMachine=machine
machine.giveMoney(100)
machine.addMoney(200)
admin.play(100)
admin.play(100)
admin.play(9000) /*error*/
console.log(machine.money);

const machine1=new GameMachine(1000)
console.log(machine1.money)
machine1.giveMoney(100);
console.log(machine1.money)
machine1.addMoney(200)
console.log(machine1.money)
machine1.play(300)
console.log(machine1.money);
console.log(casino.getMachineCount);
console.log(casino);

const user = new User("Vasya", 500);
user.selectMachine = machine1;
console.log(user);
user.play(10);
user.play(10);
user.play(10);
user.play(10);
user.play(20);
console.log(user);
admin.removeGameMachine(1);
console.log(casino,'casino');
admin.takeMoneyFromCasino(40);
console.log(casino,"take casino");
admin.addMoneyToCasino(90);
console.log(casino,"add casino");
admin.addMoneyToGameMachine(0, 100);
admin.createCasino('Xbet')
machine2=new GameMachine(100000)
console.log(admin);
