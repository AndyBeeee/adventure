<!DOCTYPE html>
<html>
<head>
  <title>Text Adventure Game</title>
  <style>
    #gameOutput {
      height: 400px;
      overflow: auto;
      border: 1px solid #000;
      padding: 10px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div id="gameOutput"></div>
  <input type="text" id="gameInput" placeholder="Enter your command here">
  <button id="submitCommand">Submit</button>

  <script>
    let office = {
      cabinetOpened: false,
      binOpened: false,
      hasFish: false,
      cat: 'inCabinet',
      safeOpened: false,
      coffeeMachinePlugged: false,
      hasCoffee: false
    };

    const lookCommands = ['look around', 'look', 'examine', 'look at', 'examine office', 'search', 'search office'];
    const openCabinetCommands = ['open cabinet', 'open filing cabinet', 'open drawer', 'pull drawer'];
    const openBinCommands = ['open bin', 'look in bin', 'search bin'];
    const getFishCommands = ['get fish', 'pick up fish', 'take fish'];
    const giveFishCommands = ['give fish to cat', 'feed cat', 'offer fish to cat'];
    const getCatCommands = ['get cat', 'pick up cat', 'take cat'];
    const openSafeCommands = ['open safe', 'unlock safe'];
    const giveCatToVelCommands = ['give cat to Vel', 'offer cat to Vel', 'give cat to vel', 'offer cat to vel'];
    const examineSocketCommands = ['examine socket', 'look at socket'];
    const touchSocketCommands = ['touch socket', 'lick socket'];
    const examineVelCommands = ['examine Vel', 'look at Vel', 'examine vel', 'look at vel'];
    const talkToVelCommands = ['talk to Vel', 'speak to Vel', 'talk to vel', 'speak to vel'];
    const openFridgeCommands = ['open fridge'];
    const useCoffeeMachineCommands = ['use coffee machine', 'make coffee'];
    const plugInCoffeeMachineCommands = ['plug in coffee machine'];
    const drinkCoffeeCommands = ['drink coffee'];
    const interactComputerCommands = ['examine computer', 'look at computer', 'use computer'];
    const talkToKevCommands = ['unmute Kev', 'talk to Kev', 'speak to Kev', 'unmute kev', 'talk to kev', 'speak to kev'];
    const typeComputerCommands = ['type on computer'];

    function printToOutput(text) {
      const gameOutput = document.getElementById('gameOutput');
      gameOutput.innerHTML += text + '<br>';
      gameOutput.scrollTop = gameOutput.scrollHeight; // auto-scroll to bottom
    }

    function startGame() {
      office = {
        cabinetOpened: false,
        binOpened: false,
        hasFish: false,
        cat: 'inCabinet',
        safeOpened: false,
        coffeeMachinePlugged: false,
        hasCoffee: false
      };
      printToOutput('You are in an office. It has a filing cabinet, a bin, a fridge, a safe, a plug socket, and a coffee machine. There are some blank sheets of paper, computers, and Vel is here, too.');
    }

    document.getElementById('submitCommand').addEventListener('click', function() {
      const userCommand = document.getElementById('gameInput').value.toLowerCase();
      document.getElementById('gameInput').value = '';

      processCommand(userCommand);
    });

    function processCommand(command) {
      if (lookCommands.includes(command)) {
        printToOutput('You see a filing cabinet, a bin, a fridge, a safe, a plug socket, a coffee machine, some blank sheets of paper, and computers. Vel is here, too.');
      } else if (openCabinetCommands.includes(command)) {
        office.cabinetOpened = true;
        if (office.cat === 'inCabinet') {
          office.cat = 'angry';
          printToOutput('You open the filing cabinet. An angry cat jumps out!');
        } else {
          printToOutput('You open the filing cabinet. It is empty.');
        }
      } else if (openBinCommands.includes(command)) {
        office.binOpened = true;
        printToOutput('You open the bin. It contains some smelly food leftovers including fish.');
      } else if (getFishCommands.includes(command)) {
        if (office.binOpened) {
          office.hasFish = true;
          printToOutput('You pick up the fish. It\'s smelly but maybe it can be of use.');
        } else {
          printToOutput('What fish? Maybe you should look around.');
        }
      } else if (giveFishCommands.includes(command)) {
        if (office.hasFish && office.cat === 'angry') {
          office.cat = 'happy';
          printToOutput('You give the fish to the cat. It seems happy now.');
          office.hasFish = false;
        } else if (office.hasFish && office.cat !== 'angry') {
          printToOutput('The cat is not interested in more fish.');
        } else {
          printToOutput('You don\'t have any fish to give.');
        }
      } else if (getCatCommands.includes(command)) {
        if (office.cat === 'happy') {
          printToOutput('The cat lets you pick it up.');
          office.cat = 'inHands';
        } else if (office.cat === 'angry') {
          printToOutput('The cat scratches you! Maybe it\'s hungry.');
        } else {
          printToOutput('There is no cat to pick up.');
        }
      } else if (giveCatToVelCommands.includes(command)) {
        if (office.cat === 'inHands') {
          printToOutput('You give the cat to Vel. She smiles and tells you that the first two digits of the safe code are \'14\'.');
          office.cat = 'withVel';
        } else {
          printToOutput('You don\'t have a cat to give.');
        }
      } else if (openSafeCommands.includes(command)) {
        printToOutput('Enter the six digit code: ');
        // here you may want to implement a code input mechanism
      } else if (examineSocketCommands.includes(command)) {
        printToOutput('It looks like a nice plug socket. Maybe you should lick it.');
      } else if (touchSocketCommands.includes(command)) {
        printToOutput('You touch the plug socket and are electrocuted! Game Over!');
        startGame();
      } else if (examineVelCommands.includes(command)) {
        printToOutput('Vel looks sad. She is focused on her coding.');
      } else if (talkToVelCommands.includes(command)) {
        printToOutput('Vel is too engrossed in her coding to reply.');
      } else if (openFridgeCommands.includes(command)) {
        printToOutput('You open the fridge. It\'s empty.');
      } else if (useCoffeeMachineCommands.includes(command)) {
        if (office.coffeeMachinePlugged) {
          office.hasCoffee = true;
          printToOutput('The coffee machine whirs to life and produces a cup of coffee.');
        } else {
          printToOutput('The coffee machine isn\'t plugged in.');
        }
      } else if (plugInCoffeeMachineCommands.includes(command)) {
        office.coffeeMachinePlugged = true;
        printToOutput('You plug in the coffee machine. It\'s ready to use now.');
      } else if (drinkCoffeeCommands.includes(command)) {
        if (office.hasCoffee) {
          printToOutput('You drink the coffee. It makes you happy.');
          office.hasCoffee = false;
        } else {
          printToOutput('There is no coffee to drink.');
        }
      } else if (interactComputerCommands.includes(command)) {
        printToOutput('You see a man named Kev on a Zoom call on the computer screen.');
      } else if (talkToKevCommands.includes(command)) {
        printToOutput('Kev can\'t hear you. He seems to be on a Zoom call.');
      } else if (typeComputerCommands.includes(command)) {
        printToOutput('You can\'t, you are too tired and hungry, maybe there is another way to message him?');
      } else {
        printToOutput(`It's just a normal ${command}.`);
      }
    }

    window.onload = function() {
      startGame();
    };
  </script>
</body>
</html>