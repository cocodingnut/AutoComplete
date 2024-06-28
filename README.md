#### Requirements

1. In order to fetch items based on the current query, you should send a GET request to the mocked `https://example.com/api/items` endpoint. The endpoint accepts a query parameter `q` that is meant to hold the query's value. An example request might look like `https://example.com/api/items?q=query`.
2. The component should render a `div` element that has the class name `wrapper` and two child elements: a `div` element with the class name `control` and a `div` element with the class name `list`. The `div` element with class name `control` should contain an input element with the class name `autocomplete-input` (as in initial solution).
3. You should avoid sending too many requests to the API; in particular, do not send requests on every single keypress! You are expected to properly debounce the requests. The debounce time-out should be 500 milliseconds.
4. When items are being fetched, a class name `is-loading` should be added to the input's wrapper (`the div element with class name control`).
5. When items are being fetched, no request has been sent, or the endpoint has returned zero items, the `div` element with class name `list` should not be rendered.
6. The component emits string typed event with an output property `onSelect`. Event is emitted whenever user click on an item from autocomplete list, and contain name of selected item. Clicking on an item does not have any effect apart from emitting event.
7. The component should be exported with class named `AutocompleteComponent` and should use selector `autocomplete-input` (as in initial solution).

### Assumptions

- `https://example.com` is a mocked service - it can be accessed only in the Codility UI. You can however use browser console "network" tool to check what request your solution is performing.
- The mocked endpoint `https://example.com/api/items` returns an array of strings. The array's length is at most 10.
- Assume that a request sent to the mocked endpoint `https://example.com/api/items` never fails.
- The "Preview" tab will display your component. You can use it for testing purposes. In preview mode, the API is mocked up, and will return always the same results, but in a random order. Also, the preview page imports a CSS spreadsheet from Bulma (v0.7.5) to give neat styling.
- Design/styling is not assessed and will not affect your score. You should focus only on implementing the requirements.
- The following imports are allowed:
  - `@angular/core`: (v11.1.2)
  - `@angular/common`: (v11.1.2)
  - `rxjs`: (v6.6.3)
- Use `console.log` and `console.error` for debugging purposes via your browser's developer tools.


- `http://suggestqueries.google.com/complete/search?client=firefox&q=YOURQUERY`
- http://localhost:50210/