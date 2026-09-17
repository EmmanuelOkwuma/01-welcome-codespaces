
document.getElementById('nameForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('studentName').value;
  document.querySelector('h1').textContent = `Welcome, ${name}!`;
  const greeting = document.getElementById('greeting');
  greeting.textContent = `We're glad to have you here. 😄`;
  greeting.classList.remove('hidden');
  document.getElementById('nameForm').classList.add('hidden');
  
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 500);
});

function toggleSource(button) {
    const project = button.closest('.interactive-project');
    const viewer = project.querySelector('.source-viewer');

    viewer.classList.toggle('open');

    if (viewer.classList.contains('open')) {
        button.innerHTML = '<i class="fa-solid fa-xmark"></i> Hide Source';
    } else {
        button.innerHTML = '<i class="fa-solid fa-code"></i> View Source';
    }
}

function toggleCalculator(button) {
    const project = button.closest('.interactive-project');
    const panel = project.querySelector('.calculator-panel');

    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
        button.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Calculator';
    } else {
        button.innerHTML = '<i class="fa-solid fa-calculator"></i> Try It';
    }
}

function updateCalculatorInputs() {
    const shape = document.getElementById('shapeSelect').value;
    const inputs = document.getElementById('calculatorInputs');

    if (shape === 'square') {
        inputs.innerHTML = `
            <label for="inputOne">Side length</label>
            <input id="inputOne" type="number" step="any" placeholder="Enter side length">
        `;
    }

    if (shape === 'rectangle') {
        inputs.innerHTML = `
            <label for="inputOne">Length</label>
            <input id="inputOne" type="number" step="any" placeholder="Enter length">

            <label for="inputTwo">Width</label>
            <input id="inputTwo" type="number" step="any" placeholder="Enter width">
        `;
    }

    if (shape === 'triangle') {
        inputs.innerHTML = `
            <label for="inputOne">Height</label>
            <input id="inputOne" type="number" step="any" placeholder="Enter height">

            <label for="inputTwo">Base</label>
            <input id="inputTwo" type="number" step="any" placeholder="Enter base">
        `;
    }

    if (shape === 'circle') {
        inputs.innerHTML = `
            <label for="inputOne">Radius</label>
            <input id="inputOne" type="number" step="any" placeholder="Enter radius">
        `;
    }
}

function calculateArea() {
    const shape = document.getElementById('shapeSelect').value;
    const inputOne = Number(document.getElementById('inputOne').value);
    const result = document.getElementById('calculatorResult');

    if (!Number.isFinite(inputOne) || inputOne < 0) {
        result.textContent = 'Please enter valid positive numbers.';
        return;
    }

    let area;

    if (shape === 'square') {
        area = inputOne ** 2;
    }

    if (shape === 'rectangle') {
        const inputTwo = Number(document.getElementById('inputTwo').value);

        if (!Number.isFinite(inputTwo) || inputTwo < 0) {
            result.textContent = 'Please enter a valid width.';
            return;
        }

        area = inputOne * inputTwo;
    }

    if (shape === 'triangle') {
        const inputTwo = Number(document.getElementById('inputTwo').value);

        if (!Number.isFinite(inputTwo) || inputTwo < 0) {
            result.textContent = 'Please enter a valid base.';
            return;
        }

        area = (inputOne * inputTwo) / 2;
    }

    if (shape === 'circle') {
        area = Math.PI * (inputOne ** 2);
    }

    result.textContent = `Area: ${area.toFixed(2)} square units`;
}

function toggleRPS(button) {
    const project = button.closest('.interactive-project');
    const panel = project.querySelector('.game-panel');

    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
        button.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Game';
    } else {
        button.innerHTML = '<i class="fa-solid fa-gamepad"></i> Play Game';
    }
}

function playRPS(player) {
    const computer = Math.floor(Math.random() * 5) + 1;

    const names = {
        1: '✊ Rock',
        2: '✋ Paper',
        3: '✌️ Scissors',
        4: '🦎 Lizard',
        5: '🖖 Spock'
    };

    const winsAgainst = {
        1: [3, 4],
        2: [1, 5],
        3: [2, 4],
        4: [2, 5],
        5: [1, 3]
    };

    let message;

    if (player === computer) {
        message = "It's a tie.";
    } else if (winsAgainst[player].includes(computer)) {
        message = "You win.";
    } else {
        message = "Computer wins.";
    }

    document.getElementById('rpsMessage').textContent = message;

    document.getElementById('rpsResult').textContent =
        `You: ${names[player]} | Computer: ${names[computer]}`;
}

function startLostSignal(button) {
    const project = button.closest('.interactive-project');
    const panel = project.querySelector('.story-panel');

    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
        button.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Story';
    } else {
        button.innerHTML = '<i class="fa-solid fa-rocket"></i> Play Story';
    }
}

function lostSignalChoice(choice) {
    const title = document.getElementById('storyTitle');
    const text = document.getElementById('storyText');
    const choices = document.getElementById('storyChoices');

    if (choice === 'mission') {
        title.textContent = 'THE CONTROL ROOM';

        text.textContent =
            'You grab your oxygen helmet and move through the control room. Two doors appear ahead of you.';

        choices.innerHTML = `
            <button type="button" onclick="lostSignalChoice('engineering')">
                Enter the Engineering Bay
            </button>

            <button type="button" onclick="lostSignalChoice('communications')">
                Go to Communications
            </button>
        `;

        return;
    }

    if (choice === 'sleep') {
        title.textContent = 'CRYOSLEEP';

        text.textContent =
            'You step into the cryopod and close your eyes. The system hums quietly as the ship drifts through space. No one ever came.';

        choices.innerHTML = `
            <button type="button" onclick="resetLostSignal()">
                Try Again
            </button>
        `;

        return;
    }

    if (choice === 'engineering') {
        title.textContent = 'ENGINEERING BAY';

        text.textContent =
            'Smoke fills the room. Sparks fly from the ceiling. You find a toolbox and a damaged control panel.';

        choices.innerHTML = `
            <button type="button" onclick="lostSignalChoice('repair')">
                Repair the oxygen valve
            </button>

            <button type="button" onclick="lostSignalChoice('override')">
                Override the system
            </button>
        `;

        return;
    }

    if (choice === 'communications') {
        title.textContent = 'COMMUNICATIONS';

        text.textContent =
            'You find a radio, but it needs power. You have two options.';

        choices.innerHTML = `
            <button type="button" onclick="lostSignalChoice('engines')">
                Reroute power from the engines
            </button>

            <button type="button" onclick="lostSignalChoice('battery')">
                Use the emergency battery
            </button>
        `;

        return;
    }

    if (choice === 'repair') {
        title.textContent = 'YOU SURVIVED';

        text.textContent =
            'You repair the oxygen valve and restore life support. You survive.';

        choices.innerHTML = `
            <button type="button" onclick="resetLostSignal()">
                Play Again
            </button>
        `;

        return;
    }

    if (choice === 'override') {
        title.textContent = 'GAME OVER';

        text.textContent =
            'The system overloads. The ship explodes before you can escape.';

        choices.innerHTML = `
            <button type="button" onclick="resetLostSignal()">
                Try Again
            </button>
        `;

        return;
    }

    if (choice === 'engines') {
        title.textContent = 'LOST IN SPACE';

        text.textContent =
            'The engines fail. Your signal disappears into the darkness. Game Over.';

        choices.innerHTML = `
            <button type="button" onclick="resetLostSignal()">
                Try Again
            </button>
        `;

        return;
    }

    if (choice === 'battery') {
        title.textContent = 'RESCUED';

        text.textContent =
            'The emergency battery powers the radio. You send a distress signal and a rescue ship responds. You win.';

        choices.innerHTML = `
            <button type="button" onclick="resetLostSignal()">
                Play Again
            </button>
        `;
    }
}

function resetLostSignal() {
    document.getElementById('storyTitle').textContent = 'LIFE SUPPORT FAILURE';

    document.getElementById('storyText').textContent =
        'You wake up to flickering lights and sirens softly sounding throughout the damaged spaceship.';

    document.getElementById('storyChoices').innerHTML = `
        <button type="button" onclick="lostSignalChoice('mission')">
            Continue the mission
        </button>

        <button type="button" onclick="lostSignalChoice('sleep')">
            Return to cryosleep
        </button>
    `;
}