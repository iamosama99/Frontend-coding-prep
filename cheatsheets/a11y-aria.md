# Accessibility & ARIA Cheatsheet — UI Components

Reference: [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)

---

## Accordion

| Item | Detail |
|------|--------|
| **Roles** | `button` (trigger), `region` (panel) |
| **Keyboard** | `Enter`/`Space` — toggle panel; `Tab` — move to next focusable; optional `↑`/`↓` to move between headers |
| **Focus management** | Focus stays on the trigger button; panel content is reachable by Tab after expansion |
| **Required aria-*** | `aria-expanded="true/false"` on button; `aria-controls="panel-id"` on button; `aria-labelledby="button-id"` on region |

---

## Tabs

| Item | Detail |
|------|--------|
| **Roles** | `tablist` (container), `tab` (each trigger), `tabpanel` (each panel) |
| **Keyboard** | `←`/`→` — move between tabs (automatic or manual activation); `Home`/`End` — first/last tab; `Enter`/`Space` — activate if manual; `Tab` — moves into active panel |
| **Focus management** | Only the active tab is in the tab sequence (`tabindex="0"`); inactive tabs have `tabindex="-1"` and are reachable via arrow keys |
| **Required aria-*** | `aria-selected="true/false"` on each tab; `aria-controls="panel-id"` on tab; `aria-labelledby="tab-id"` on panel |

---

## Modal / Dialog

| Item | Detail |
|------|--------|
| **Roles** | `dialog`; use `alertdialog` for confirmations requiring immediate action |
| **Keyboard** | `Escape` — close dialog; `Tab`/`Shift+Tab` — cycle through focusable elements inside |
| **Focus management** | On open: move focus to first focusable element (or dialog itself); trap Tab/Shift+Tab within; on close: return focus to the trigger element |
| **Required aria-*** | `aria-modal="true"`; `aria-labelledby` pointing to the dialog title; `aria-describedby` if a description exists |

---

## Combobox / Autocomplete

| Item | Detail |
|------|--------|
| **Roles** | `combobox` on the input; `listbox` on the dropdown; `option` on each item |
| **Keyboard** | `↓` — open popup / move to first option; `↑` — move to last option / close if on first; `Enter` — select focused option; `Escape` — close popup, return focus to input; `Tab` — accept/close |
| **Focus management** | Focus stays on the input while navigating options (DOM focus does NOT move to options unless using `aria-activedescendant`); use `aria-activedescendant` to point to the currently "focused" option |
| **Required aria-*** | `aria-expanded="true/false"` on combobox; `aria-haspopup="listbox"`; `aria-autocomplete="list/both"`; `aria-activedescendant` pointing to highlighted option id; `aria-selected="true"` on selected option |

---

## Listbox (Multi-select Dropdown)

| Item | Detail |
|------|--------|
| **Roles** | `listbox` on the container; `option` on each item |
| **Keyboard** | `↑`/`↓` — move focus; `Space` — toggle selection; `Shift+↑`/`Shift+↓` — extend selection; `Ctrl+A` — select all; `Home`/`End` — first/last option |
| **Focus management** | Focus moves into the listbox on open; returns to trigger on close |
| **Required aria-*** | `aria-multiselectable="true"` on listbox; `aria-selected="true/false"` on each option; `aria-label` or `aria-labelledby` on listbox |

---

## Tooltip

| Item | Detail |
|------|--------|
| **Roles** | `tooltip` on the tooltip container |
| **Keyboard** | Show on focus of trigger; hide on `Escape` or blur |
| **Focus management** | Focus never moves to tooltip — it is non-interactive; trigger element keeps focus |
| **Required aria-*** | `aria-describedby` on the trigger pointing to the tooltip id; tooltip element has `role="tooltip"` and a matching `id` |

---

## Breadcrumb

| Item | Detail |
|------|--------|
| **Roles** | `navigation` landmark (via `<nav>`) with `aria-label="Breadcrumb"`; `<ol>` for the list |
| **Keyboard** | Standard link navigation (Tab); no special keys required |
| **Focus management** | Standard — no special management needed |
| **Required aria-*** | `aria-label="Breadcrumb"` on `<nav>`; `aria-current="page"` on the last (current) item's link |

---

## Pagination

| Item | Detail |
|------|--------|
| **Roles** | `navigation` landmark with `aria-label="Pagination"` |
| **Keyboard** | `Tab` between page links/buttons; `Enter`/`Space` to activate |
| **Focus management** | After page change, announce new content via `aria-live` region or move focus to page heading |
| **Required aria-*** | `aria-label="Page X"` on each page button; `aria-current="page"` on the active page; `aria-disabled="true"` on disabled prev/next buttons |

---

## Carousel / Slider

| Item | Detail |
|------|--------|
| **Roles** | `region` with `aria-roledescription="carousel"` and `aria-label`; each slide is `group` with `aria-roledescription="slide"` and `aria-label="X of N"` |
| **Keyboard** | `←`/`→` — prev/next slide; pause/play button; `Tab` — move through interactive content inside slides |
| **Focus management** | Auto-play must pause on focus or hover; do not move focus automatically on slide change |
| **Required aria-*** | `aria-live="polite"` (or `"off"` when auto-playing); `aria-label` on the carousel region; prev/next buttons need descriptive `aria-label`; dots navigation: `aria-label="Slide X"` + `aria-current="true"` on active dot |

---

## Date Picker

| Item | Detail |
|------|--------|
| **Roles** | `dialog` for the calendar popup; `grid` for the calendar; `gridcell` for each day; `button` for the trigger |
| **Keyboard** | `↑`/`↓`/`←`/`→` — navigate days; `Page Up`/`Page Down` — prev/next month; `Home`/`End` — first/last day of week; `Enter`/`Space` — select date; `Escape` — close; `Tab` — move through dialog controls |
| **Focus management** | Focus moves to the calendar on open (to today or selected date); returns to trigger on close; trap focus within dialog |
| **Required aria-*** | `aria-haspopup="dialog"` on trigger; `aria-label` on the grid for the current month; `aria-selected="true"` on selected cell; `aria-disabled="true"` on out-of-range dates; `aria-current="date"` on today |

---

## Command Palette (⌘K)

| Item | Detail |
|------|--------|
| **Roles** | `dialog` for the overlay; `combobox` on the search input; `listbox` on the results; `option` on each result |
| **Keyboard** | `⌘K` / `Ctrl+K` — open; `Escape` — close; `↑`/`↓` — navigate results; `Enter` — execute; `Tab` — move through results (some implementations) |
| **Focus management** | Focus moves to search input on open; trap focus within dialog; return focus to trigger on close |
| **Required aria-*** | `aria-modal="true"` on dialog; `aria-expanded` on combobox; `aria-activedescendant` pointing to highlighted option; `aria-selected` on active option; `aria-label` on search input |

---

## Form

| Item | Detail |
|------|--------|
| **Roles** | `form` landmark (or `search` for search forms); each field uses native roles (`textbox`, `checkbox`, etc.) |
| **Keyboard** | Standard form navigation (Tab, Shift+Tab, Enter to submit); `Space` for checkboxes; arrow keys for radio groups |
| **Focus management** | On submit with errors, move focus to first error field or to an error summary; use `aria-live` to announce inline errors |
| **Required aria-*** | `aria-required="true"` on required fields (or native `required`); `aria-invalid="true"` on fields with errors; `aria-describedby` pointing to error message id; `aria-label` or `<label>` on every input; `role="alert"` or `aria-live="assertive"` on error summary |

---

## Drag & Drop List

| Item | Detail |
|------|--------|
| **Roles** | `listbox` or `list` for the container; `option` or `listitem` for each draggable item |
| **Keyboard** | `Space`/`Enter` — pick up item; `↑`/`↓` — move item; `Space`/`Enter` — drop; `Escape` — cancel drag |
| **Focus management** | Focus stays on the dragged item throughout; announce position changes via `aria-live` |
| **Required aria-*** | `aria-grabbed="true/false"` (deprecated but still used); `aria-dropeffect` (deprecated); prefer announcing via `aria-live="assertive"` with position ("Item moved to position 3 of 5") |

---

## Progress Bar

| Item | Detail |
|------|--------|
| **Roles** | `progressbar` |
| **Keyboard** | Not interactive — no keyboard required |
| **Focus management** | Not interactive — no focus management required |
| **Required aria-*** | `aria-valuenow` (current value); `aria-valuemin` (usually 0); `aria-valuemax` (usually 100); `aria-label` or `aria-labelledby`; omit `aria-valuenow` for indeterminate state |

---

## Star Rating

| Item | Detail |
|------|--------|
| **Roles** | `radiogroup` for the container; `radio` for each star (when interactive); `img` with descriptive `alt` for read-only display |
| **Keyboard** | `←`/`→` or `↑`/`↓` — change rating within the group; `Tab` — moves in/out of the group as a single stop |
| **Focus management** | As a radio group, only the selected (or first) radio is in the tab sequence; arrow keys navigate within |
| **Required aria-*** | `aria-label` on `radiogroup`; `aria-checked="true"` on selected radio; `aria-label="X stars"` on each radio input |

---

## OTP Input

| Item | Detail |
|------|--------|
| **Roles** | Each cell is a native `<input type="text">` with `inputmode="numeric"` |
| **Keyboard** | Digit — fill cell and move focus to next; `Backspace` — clear cell and move focus to previous; `←`/`→` — navigate between cells; paste on any cell — distribute characters across cells |
| **Focus management** | Auto-advance focus to the next input on valid character entry; auto-retreat on Backspace from an empty cell |
| **Required aria-*** | `aria-label="Digit X of N"` on each input; `autocomplete="one-time-code"` on the first input (or group wrapper); group in a `<fieldset>` with `<legend>` describing the purpose |

---

## Stepper / Wizard

| Item | Detail |
|------|--------|
| **Roles** | `navigation` or `list` for the step indicator; each step indicator can be a `listitem` with `aria-current="step"` for the active step |
| **Keyboard** | `Tab` through Back/Next buttons; within a step, standard form keyboard behavior |
| **Focus management** | On step change, move focus to the new step's heading or first input; announce step change via `aria-live="polite"` |
| **Required aria-*** | `aria-current="step"` on the active step indicator; `aria-label="Step X of N: [name]"` on step indicators; `aria-disabled="true"` on future/locked steps; error messages: `aria-invalid` + `aria-describedby` |
