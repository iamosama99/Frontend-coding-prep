# Event Delegation Pattern

## Problem

Implement a `delegate` function that attaches a **single** event listener to a parent element and handles events from matching child elements — even children added after the listener was registered.

## API

```ts
function delegate(
  parent: Element,
  eventType: string,
  selector: string,
  handler: (event: Event, matchedEl: Element) => void
): () => void   // returns cleanup function
```

## Example

```ts
const ul = document.querySelector('ul')!;

const cleanup = delegate(ul, 'click', 'li', (event, li) => {
  console.log('clicked:', li.textContent);
});

// Works for li elements that exist now AND ones added later
const newLi = document.createElement('li');
newLi.textContent = 'Dynamic item';
ul.appendChild(newLi);
// Clicking newLi still fires the handler

cleanup(); // removes the single listener
```

## Constraints

- Attach only **one** listener to `parent` (not one per child)
- Use `event.target.closest(selector)` to find the matching ancestor
- The matched element must be a descendant of `parent`
- Return a cleanup function that removes the event listener

## Edge Cases

- Click outside any matching element → handler not called
- Deeply nested child of the selector target → `closest` still finds the right element
- Cleanup called multiple times → no error
- Multiple delegates on the same parent → each independent
