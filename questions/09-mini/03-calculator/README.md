# Calculator

## Problem

Build a functional calculator that supports chained arithmetic operations.

## Requirements

- Digit buttons **0–9** and a **decimal point** button
- Operator buttons: **+**, **−**, **×**, **÷**
- **Chain operations**: pressing an operator after a result continues the calculation
- **Clear (AC)** resets the calculator to its initial state
- **Backspace (⌫)** removes the last entered digit
- **Equals (=)** computes and displays the result
- Display shows the **current expression** (e.g. `12 + 3`) and the **current number** being entered

## Edge Cases

- **Divide by zero** → display "Error"; next digit press clears the error
- **Multiple decimal points** in the same number → ignore the second dot press
- **Starting with an operator** → treat the current operand as 0 (e.g. pressing `+` first means `0 +`)
- **AC** resets everything: expression, operands, operator
- **Backspace** on a result (after pressing =) clears the entire result, not just one digit
- Pressing **= repeatedly** does not re-apply the last operation (no implicit repeat)
- Very large results should not overflow the display (use `toPrecision` or scientific notation)
