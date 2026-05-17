# Form with Validation

## Problem

Build a registration form with full client-side validation. Every field shows inline error messages and the submit button stays disabled until all fields are valid.

## Requirements

- Fields: **Full Name**, **Email**, **Password**, **Confirm Password**, **Age**
- Inline error messages appear below each field on blur or on submit attempt
- Validation rules:
  - **Name**: required, minimum 2 characters
  - **Email**: required, valid format (regex check)
  - **Password**: required, minimum 8 characters
  - **Confirm Password**: must match the Password field exactly
  - **Age**: required, must be a number between 18 and 120 (inclusive)
- Submit button is **disabled** until all fields pass validation
- On valid submit, show a success message and reset the form
- Error messages disappear as soon as the field becomes valid

## Edge Cases

- Errors appear on **blur** (leaving the field), not on every keystroke
- Revalidate Confirm Password whenever the Password field changes
- Submit button locks the form during the fake 1-second submission delay (show loading state)
- After successful submission the form resets and the success message auto-hides after 3 seconds
- Age field only accepts numeric input; non-numeric characters trigger an error
- Trim whitespace from Name and Email before validating
