# BMI + Tip Calculator (Two-Tab App)

## Problem

Build a two-tab utility app. The first tab is a BMI (Body Mass Index) calculator; the second tab is a tip and bill splitter.

## Requirements

### BMI Tab
- Inputs: weight and height with a unit toggle (Metric: kg/cm vs Imperial: lbs / ft + in)
- "Calculate" button computes BMI and displays:
  - BMI value rounded to 1 decimal place
  - Category label: Underweight (< 18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (≥ 30)
  - Color-coded category badge (blue / green / yellow / red)

### Tip Tab
- Inputs: bill amount ($), tip percentage, number of people
- Quick-select tip percentage buttons: 10% / 15% / 18% / 20% / 25%
- Shows: tip amount, total bill amount, and amount per person
- All monetary values rounded to 2 decimal places

## Edge Cases

- BMI: validate that weight and height are positive numbers; height must be > 0
- BMI: toggling units clears the result but does NOT auto-recalculate
- Tip: number of people must be ≥ 1
- Tip: tip % can also be typed manually in the input (quick-select buttons just set the value)
- Tip: all outputs update live as inputs change (no submit button needed on tip tab)
