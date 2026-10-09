const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const action = button.getAttribute("data-action");
        const value = button.getAttribute("data-value");

        if (action === "clear") {
            currentInput = "";
            display.textContent = "0";
            return;
        }

        if (action === "delete") {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput === "" ? "0" : currentInput;
            return;
        }

        if (action === "parens") {
            const openCount = (currentInput.match(/\(/g) || []).length;
            const closeCount = (currentInput.match(/\)/g) || []).length;

            currentInput += openCount === closeCount ? "(" : ")";
            display.textContent = currentInput;
            return;
        }

        if (action === "equals") {
            try {
                const result = Function('"use strict"; return (' + currentInput + ")")();
                currentInput = String(result);
                display.textContent = currentInput;
            } catch (e) {
                display.textContent = "Error";
                currentInput = "";
            }
            return;
        }

        currentInput += value;
        display.textContent = currentInput;
    });
});