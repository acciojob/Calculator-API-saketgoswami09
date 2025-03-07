const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to validate inputs
function validateInputs(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return { status: "error", message: "Invalid data types" };
    }
    if (num1 < -1000000 || num2 < -1000000) {
        return { status: "error", message: "Underflow" };
    }
    if (num1 > 1000000 || num2 > 1000000) {
        return { status: "error", message: "Overflow" };
    }
    return null; // No error
}

// Helper function to check result bounds
function checkResult(result) {
    if (result < -1000000) {
        return { status: "error", message: "Underflow" };
    }
    if (result > 1000000) {
        return { status: "error", message: "Overflow" };
    }
    return null; // No error
}

// GET request for home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// POST /add
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const inputError = validateInputs(num1, num2);
    if (inputError) {
        return res.json(inputError);
    }
    const sum = num1 + num2;
    const resultError = checkResult(sum);
    if (resultError) {
        return res.json(resultError);
    }
    res.json({ status: "success", message: "the sum of given two numbers", sum: sum });
});

// POST /sub
app.post('/sub', (req, res) => {
    const { num1, num2 } = req.body;
    const inputError = validateInputs(num1, num2);
    if (inputError) {
        return res.json(inputError);
    }
    const difference = num1 - num2;
    const resultError = checkResult(difference);
    if (resultError) {
        return res.json(resultError);
    }
    res.json({ status: "success", message: "the difference of given two numbers", difference: difference });
});

// POST /multiply
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const inputError = validateInputs(num1, num2);
    if (inputError) {
        return res.json(inputError);
    }
    const result = num1 * num2;
    const resultError = checkResult(result);
    if (resultError) {
        return res.json(resultError);
    }
    res.json({ status: "success", message: "The product of given numbers", result: result });
});

// POST /divide
app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    const inputError = validateInputs(num1, num2);
    if (inputError) {
        return res.json(inputError);
    }
    if (num2 === 0) {
        return res.json({ status: "error", message: "Cannot divide by zero" });
    }
    const result = num1 / num2;
    const resultError = checkResult(result);
    if (resultError) {
        return res.json(resultError);
    }
    res.json({ status: "success", message: "The division of given numbers", result: result });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});