# Retro JS

**Project in Alpha**

A JS/HTML library for small JS/HTML components. Retro uses HTML data attributes to do state changes with JS under the hood.

For smaller apps and interactions, you can just add a couple properties in HTML and not have to write a single line of JS. For medium sized apps and interctions, the JS API allows you to write clean and easy to understand components.

## JavaScript API

The JavaScript API is meant to mimic CSS a little bit. Object properties are element selectors, and the value is an object of event handlers and state subscription instructions.

The event handler functions always get passed 1 argument that always contains all Retro's API methods.

### Example

```html
<button class='counter-button'>Increment counter</button>
<div class='counter-display'>0</div>
```

```js
import { createComponents } from '@smarterlabs/retro-js'

createComponents({
   '.counter-button': {
      // Increment counter when button is clicked
      onClick: ({ state, setState }) => {
         setState({ counter: state.counter + 1 })
      },
   },
   '.counter-display': {
      // Set initial counter state on mount
      onMount: ({ node, setState }) => {
         setState({ counter: Number(node.innerText) })
      },
      // When counter state changes, update HTML with counter state
      'onState:counter': ({ node, state }) => {
         node.innerText = state.counter
      }],
   },
})
```

### Events

- `onMount`: Runs whenever the component is mounted
- `onState`: Runs whenever any state is changed
- `onState:{state property}`: Runs whenever the state property is changed in any way


### Methods

- `node`: The DOM node of the selected component, if available
- `state`: Retro's state object
- `setState`: Shallow merge with Retro's state object
- `mount`: Mount all components (components already mounted will be ignored)
- `on`: Add an event handler to Retro
- `emit`: Emit an event that will call Retro event handlers

## HTML API

The HTML API is meant to expose common JavaScript patterns for simple UI interactivity. With it you can set state and bind state to HTML properties and dynamically change class names.

An example navigation show/hide button might look something like this:

```html
<button data-click='!nav-open'>Toggle Navigation</button>
<nav data-class='nav-open'>Navigation</nav>

<style>
   nav{
      display: none;
   }
   .nav-open{
      display: block;
   }
</style>
```

**Warning**: This also creates a `nav-open` variable in Retro's global state. Be careful of variable collision and use global state sparingly.

Lets break it down...

We need a button to create and toggle a `nav-open` variable `true`/`false`:

```html
<button data-click='!nav-open'>Toggle Navigation</button>

The default value of booleans will be false.
If we want to set the default value to true, we can do this 2 ways:

<button data-click='!nav-open' data-set='nav-open:true:boolean'>Open Navigation</button>
<button data-click='!nav-open:true'>Open Navigation</button>
```

```html
If state variable navOpen is truthy, then set a class name of "navOpen",
otherwise don't set a class name.

<nav data-class='nav-open ? "nav-open" : ""'>Navigation</nav>

Or shorthand if the variable name and class name you're setting are the same:

<nav data-class='nav-open'>Navigation</nav>
```

If you'd like to have a more clear seperation between class names and
state variable names, a more robust app might look something like this:

```html
<nav
   class='nav-closed'
   data-class='nav.open ? "nav-open" : "nav-closed"'
>
   Navigation
</nav>

<button data-click='!nav.open'>Toggle Navigation</button>

<style>
   .nav-closed{
      display: none;
   }
   .nav-open{
      display: block;
   }
</style>
```

For use cases more advanced than this, we would recommend the JavaScript API.

## Why?

Retro JS is not inteded to replace or compete with frameworks like React, Vue, and Svelte, but rather offer an alternative for developers who have to work within constraints of monolithic templating systems like Wordpress or Shopify. For larger or more interactive applications, we would strongly recommend another framework.

With Retro JS, you can have component-driven patterns in any project without overhauling any of the existing code. For rush jobs, you can even just add the library onto the site via a `<script>` tag and make some modifications to the HTML.