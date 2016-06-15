# Namespaces explained

> Look at you adulting so well today and overachieving by actually reading documentation. I'm touched.
>
> \- Tyler Benton

Namespacing isn't a new concept by any means, and it's often used in other languages like JS to avoid collisions with other objects or variables in the global namespace. They're also extremely useful for helping organize blocks of functionality in applications into easily manageable groups that can be uniquely identified.

We take that same methodology and apply it to our Atomic css folder structure. In no particular order, here are the individual namespaces and a brief description, and use cases.

 - [`o-`](#object-namespaces-o-): Signify that something is an Object. Objects are similar to components an object can be infinitely nested within it's self. It may be used in any number of unrelated contexts to the one you can currently see it in. Another difference is an object can be combined with components. Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places. Tread carefully.
 - [`c-`](#component-namespaces-c-): Signify that something is a Component. This is a concrete, implementation-specific piece of UI. All of the changes you make to its styles should be detectable in the context you're currently looking at. Modifying these styles should be safe and have no side effects outside the current component scope.
 - [`u-`](#utility-namespaces-u-): Signify that this class is a Utility class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI.
 - [`t-`](#theme-namespaces-t-): Signify that a class is responsible for adding a theme to a view. It lets us know that UI Components' current cosmetic appearance may be due to the presence of a theme.
 - [`s-`](#scoped-namespaces-s-): Signify that a class creates a new styling context or Scope. These should be used sparingly—they can be open to abuse and lead to poor CSS if not used wisely. They're used in cases like `s-header`, `s-search` where you are adding styles that can't be reused anywhere else on the site, and they're specific to that section.
 - [`is-`, `has-`](#stateful-namespaces-is-has-): Signify that the piece of UI in question is currently styled a certain way because of a state or condition. This stateful namespace is gorgeous, and comes from SMACSS. It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.
 - [`_`](#hack-namespaces-_): Signify that this class is the worst of the worst—a hack! Sometimes, although incredibly rarely, we need to add a class in our markup in order to force something to work. If we do this, we need to let others know that this class is less than ideal, and hopefully temporary (i.e. do not bind onto this). This type of class is used in scoped(`s-`) scenarios, where you're trying to do something different that the framework allows. Please don't forget to separate out hacky fixes from your main styles, and **comment** why you had to add this fix.
 - [`js-`](#javascript-namespaces-js-): Signify that this piece of the DOM has some behavior acting upon it, and that JavaScript binds onto it to provide that behavior. If you're not a developer working with JavaScript, leave these well alone.
 - [`qa-`](#qa-namespaces-qa-): Signify that a QA or Test Engineering team is running an automated UI test which needs to find or bind onto these parts of the DOM. Like the JavaScript namespace, this basically just reserves hooks in the DOM for non-CSS purposes.
 - [`d-`](#d-namespaces-d-): Signify that this class is for development use only and should be removed before code is deployed to staging/production.


<hr>


## Object Namespaces: `o-`

**Format:**

```scss
.o-object-name[<element>|<modifier>]{}
```

**Example:**

```scss
.o-media{
 &__thumbnail{}

 &__header{}

 &__body{}

 &__footer{}

 &--alt{}
}
```

The `o-` Object comes from **OOCSS**, a fantastic methodology in that it teaches us to abstract out the repetitive, shared, and purely structural aspects of a UI into reusable objects. This means that things like layout, wrappers and containers, the Media Object, etc. can all exist as non-cosmetic styles that handle the skeletal aspect of a lot of UI components, without ever actually looking like designed "things".

This leads to much [DRYer](http://www.sitepoint.com/using-helper-classes-dry-scale-css/) and drastically smaller stylesheets, but does bring with it one problem: how do we know which classes might be purely structural, and therefore possibly being used in an open-ended number of instances?

This poses problems on projects quite frequently. Picture the following example.

Imagine you're a developer new to a project, and you have no intimate knowledge of the CSS or what it's classes mean or do. You're asked by a Product Owner to add some padding around the testimonials that appear on the site. You right click, Inspect Element, and you see this:

```html
<blockquote class="media testimonial">
</blockquote>
```

Now, it should be fairly clear here that what you should do is go and find the `.testimonial{}` ruleset in your CSS and add the padding there. However, using DevTools, you find that adding the padding to the `.media{}` ruleset has exactly the outcome you expected. Perfect! Let's go and add that into the source CSS file.

The issue here is that `.media` is an abstraction (it's actually the poster child of Nicole Sullivan's OOCSS) which, by definition, is a reusable and non-cosmetic design pattern that can underpin any number of different UI components. Sure, altering the padding of it in this instance gave us the desired results, but it also may have just unintentionally broken 20 other pieces of UI elsewhere.

Because objects don't belong to any one specific component, and can underpin several vastly different components, it is incredibly risky to ever modify one. This is why we should introduce a namespace, to let other developers know that this class forms an abstraction and that any changes here will be reflected in every object sitewide. The object itself does not necessarily have anything to do with the implementation-specific bit of the UI that you are trying to change.

By adding a leading `o-` to the classes for our objects, we can tell other developers about their universal nature, and hopefully avoid ever having anyone binding onto them and breaking things. If you ever see a class that begins with `o-`, alarm bells should ring and you should know to stay well away from it.

```html
<blockquote class="testimonial o-media">
</blockquote>
```

<br>

> If you're saying to yourself "But how do I change the layout on different screen sizes?". Have a :cookie: on me because you my friend are a thinker.
>
> \- Tyler Benton

There're special suffixes that we can combine with `o-` to adjust the layout depending on the screen size. [See](#conditional-viewports) for more information on how to target different screensizes.

 - Objects are abstract, and can be infinitely nested.
 - They can be used in any number of places across the project you might not have even seen.
 - Avoid modifying their styles (especially at the end of a project)
 - Be careful around anything with a leading `o-`.
 - Avoid binding onto them with other css classes or with js, because they can be removed at any time since they're abstract.


<hr>


## Component Namespaces: `c-`

**Format:**

```scss
.c-component-name[<element>|<modifier>]{}
```

**Example:**

```scss
.c-modal{
 &__title{}

 &__content{}

 &--gallery{}
}
```

Components are some of the safest types of selectors we will encounter. Components are finite, discrete, implementation-specific parts of our UI that most people (users, designers, developers, the business) would be able to identify: *"This is a button"; "This is the date picker";* etc.

Usually when we make changes to a Component's ruleset, we will immediately see those changes happening every- (and **only**) where we'd expect. This means changing the padding on the `.c-modal__content` should not affect anything else in the site other than the **content** area of our **modal**. Where Objects are implementation-agnostic, Components are implementation-specific.

If we revisit the previous example, and introduce the Object and Components' namespaces, we'd be left with this:

```html
<blockquote class="c-testimonial o-media">
</blockquote>
```

Now I can tell purely from this HTML that any changes I make to the .o-media class may be felt throughout the entire site, but any changes I make to the .c-testimonial ruleset will only modify testimonials, and nothing else.

<br>

- Components are implementation-specific bits of UI.
- They are quite safe to modify.
- Anything with a leading `c-` is a specific thing.
- Can't be combined with other component classes on the same element. Meaning you can't do something like
  `<div class="c-modal c-alert"></div>`


<hr>


## Utility Namespaces: `u-`

**Format:**

```scss
.u-utility-name{}
```

**Example:**

```scss
.u-clear{}
```

Utilities are complete [single responsibility](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/) rules which have a very specific and targeted task. It's quite common for these rulesets to use `!important` so they guarantee they're going to do what they were meant to do. They are to be used as a last resort when no other CSS hooks are available, or to tackle completely unique circumstances, e.g. using `.u-text-center` to centrally align one piece of text. They are only one step away from inline styles, so should be used sparingly.

Because of their heavy-handed approach, their global reusability, and their exceptional use-case, it's incredibly important that we signal Utilities to other developers. We do not want anyone trying to bind onto these in future selectors. Take the following example.

```scss
.c-card .text-center{
  font-size: .75em;
}
```
The problem in doing this is (probably) obvious. The `.text-center` class now has two responsibilities when it appears anywhere inside `.c-block`. It now has side effects, which are something that Utilities should never, ever have.

By using a namespace, we can introduce a simple and unbreakable rule: if it begins with `u-`, never bind to it (in any language).

Utilities should be defined once, and never need changing in any other area of the site.

Another problem the Utility namespace solves is actually letting developers know that there is a heavyweight rule being applied to the section of the DOM. It will help explain why certain things might be happening and hard to override. Take this example:

```html
<div class="text-right">
  ...

  <blockquote class="pullquote">
  </blockquote>

  ...
</div>
```

A developer inheriting this might be confused as to why the `blockquote`'s text aligned differently from what they expected. This is because it's inheriting the text alignemnt from a `.text-right` class used a little further up the DOM tree. By adding a little more clarity to our classes, we can more quickly identify any potential offenders: *"Ah, here's a Utility, that must be what's causing it"*. (This is actually a fairly good example of why we should use Utilities sparingly.)

```html
<div class="u-text-right">
  ...

  <blockquote class="c-pullquote">
  </blockquote>

  ...
</div>
```

These types of classes are like **immutable objects**. Immutable objects are objects *"whose state cannot be modified after [they have been] created"*. That's exactly what we're aiming for with certain types of rule in our CSS! After we've created certain rulesets, they want to behave almost like constants: never changing, closed to modification, immutable.

From the Wikipedia page:

> Other benefits are that they are simpler to understand and reason about and offer higher security than mutable objects.
>
> [Immutable object](http://en.wikipedia.org/wiki/Immutable_object) &mdash; Wikipedia

Perfect! ***"simpler to understand"*** and offer ***"higher security"***. This is exactly what the namespacing gives us: knowledge and, subsequently, security.

More gold from the Wikipedia page:

> ...if any user of a reference to a mutable object changes it, all other users of that reference will see the change. If this is not the intended effect, it can be difficult to notify the other users to have them respond correctly.

Heck yeah! This is exactly what we're talking about with our CSS. If someone modifies a base Object or a global Utility, we're going to propagate that change out everywhere, and we probably don't want that.


<br>

Utilities:
 - Can use conditional viewport suffixes
 - Utilities are style heavyweights.
 - Can't be bound onto or changed(in any language).


<hr>


## Theme Namespaces: `t-`

**Format:**

```scss
.t-theme-name{}
```

**Example:**

```scss
.t-light{}
```

When we work with Stateful Themes (that is to say, themes that we toggle on and off) we normally do so by adding a class to the `body` or `html` element. Examples of this approach to theming include style-switchers (a user can toggle between different themes) and sub-sections of a site (all blog posts have one theme color, all news pages have another theme color, etc.). We simply add a class high up the DOM which then invokes that theme for that particular page.

A simple way to denote any theme-related classes is to simply prepend them with `t-`. Seeing a `t-` class in your HTML should tell you that *"Ah, right, the view probably looks the way it currently does because we have a theme invoked."*

Now, all of the namespaces we've looked at so far are mainly of use to us in our markup, but Theme namespaces are helpful in both our HTML and our CSS. Seeing, for example, `.t-light` in our markup tells us that the entire DOM has a current state applied to it, which is important to know while debugging. Seeing that class in our CSS also tells us a lot: it helps to sandbox and isolate any chunks of theme-related CSS inside namespaced rulesets:

```scss
.c-btn{
  display: inline-block;
  padding: 1em;
  background-color: #333;
  color: #e4e4e4;

  .t-light &{
    background-color: #e4e4e4;
    color: #333;
  }
}
```

Here we can see that our buttons have a light grey text color on top of a dark grey background, but when we invoke the `.t-light` theme, those colors invert. Here we are encapsulating the style information, which means that finding, debugging, and modifying Theme rules becomes much simpler.

Don't confuse `t-` with a `.block--modifier`, as they're two completely different concepts, and use cases. A `.block--modifier` only targets the `.block` it's associated with, while `t-` targets any component inside of it that have a different state for that theme.

**Note:** The name you choose for the theme should be semantic(eg. **NOT BLUE**).


<br>

Themes:
 - Theme namespaces are very high-level.
 - They provide a context or scope for many other rules.
 - It's useful to signal the current condition of the UI.
 - Theme styles aren't contained in any one folder because they're tied to different components, so you will find theme styles mainly in `components/`. Theme styles can also potentially reside in `site/`, `pages/`; and `helpers/_variables.scss`. Base colors you want to use should be stored in `helpers/_variables.scss`(using `@include define-color-set(theme, ...)`) so they can be reused throughout the code.


<hr>


## Scoped Namespaces: `s-`

**Format:**

```scss
.s-scope-name{}
```

**Example:**

```scss
.s-custom-cocktail{}
```

Scoped contexts in CSS solve a very specific and particular problem: please be entirely certain that you actually have this problem before employing Scopes, because they can be misused and end up leading to actively bad CSS.

Oftentimes it can be useful to set up a brand new styling context for a particular section of your UI. A good use case for the `s-` namespace is page-specific styling. For example, on one page you may want to override the text to be larger and more readable, or just do something fancy. That's outside the framework's capabilities.

```html
<h1>Custom coctail</h1>
...
<section class="s-custom-coctail">
 <nav class="c-tabs">
  <a href="#" class="c-tabs__tab js-custom-cocktail-products">Products</a>
  <a href="#" class="c-tabs__tab js-custom-cocktail-nutrients">Nutrients</a>
 </nav>
 <div class="c-products">
  <header>
   <h3>Products</h3>
   <div class="c-btn-group">
    <a href="#" class="c-btn">Reset</a>
    <a href="" class="c-btn c-btn--text">View all</a>
    <a href="" class="c-btn c-btn--primary">Save</a>
   </div>
  </header>
  <p>Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipisicing elit. Minus itaque fugit, nobis quo quas commodi impedit rem expedita repudiandae autem dolor. Ullam repudiandae, optio recusandae consectetur odit corrupti quibusdam! Dicta.</p>
  ...
 </div>
 <div class="c-nutrients">
  ...
 </div>
</section>
...
```
Think about how would you go about changing the paragraphs, anchor tags, and `.c-tags`?
 - a. Would you target it them like in the global scope?<br />
    ```scss
    .c-tabs{}
    a{}
    p{}
    ```

 - b. Would you target it by adding a modifier onto it `.c-tags` and nesting the other elements?<br />
    ```scss
    .c-tabs--custom-cocktail{}
    .s-custom-coctail{
     a{}
     p{}
    }
    ```

 - c. Would you nest *all the things*?<br />
    ```scss
    .s-custom-coctail{
     .c-tabs{}
     a{}
     p{}
    }
    ```

 - d. Would you nest *all the things*, and add a modifier class to `.c-tags`?<br />
    ```scss
    .s-custom-coctail{
     .c-tabs--custom-cocktail{}
     a{}
     p{}
    }
    ```


> If you answered **a**, or **d**; what other dumb things have you done today?
> - Use **IE** as your main browser?<br />
>   **Yes:** Go by one of [these](http://amzn.to/1KdyTrG) and clean out the cobwebs in your head and down anything else<br />
>   **No:** There's still hope for you<br />
> - Punch a cop?<br />
>   **Yes:** Nice!<br />
>  **No:** Probably a good life decision


There're 2 valid solutions for this case, and those are *b*, and *c*. If you did answer *a* or *b*(sorry).

If you answered *a* the reason why you wouldn't overwrite `.c-tabs` in the global scope is because things that're scoped are scoped for a reason(*to not **F** with anything outside of it's scope*). Even if you only overwrite `.c-tabs` in `custom-cocktail.scss` and your initial intent was to only change `.c-tabs` inside of `.s-custom-cocktail`; changing `.c-tabs` in the global scope will make it unusable on the rest of the page.

If you answered *b* the reason why you wouldn't nest `.c-tabs--custom-cocktail` is that you've already committed to have a modifier class, which by all means is the better answer to this question. By choosing to use a modifier class you've removed the need for nesting; and unnecessary nesting is a **very** bad thing.

You can reuse components from outside the scope and place them in the scope and in some cases they ***might*** need to be overwritten.

I can't stress the word ***might*** enough here. Nesting selectors is bad: it leads to location-based styling, meaning that styles are now tightly coupled to DOM structure; it prevents people from being able to opt in to styles, because nested selectors are very dictatorial (i.e. *this **will** happen if you put that in there*); having a type selector as a Key Selector creates very greedy selectors, which can match more of the DOM than you intend; and our specificity gets increased, meaning our Scope will override previously defined styles, and in turn the Scope itself becomes harder to override.

Here's a really good example. Say we wanted to change the color of the anchor tags inside of our scope, we would end up with:

```scss
.s-custom-cocktail{
 ...
 a{
  color: blue;
  &:hover, &:focus{
   color: lighten(blue, 15%);
  }
 }
 ...
}
```
This selector is in charge of setting the `color` to links inside of `.s-custom-cocktail`. You should be able to see the problem with this; it's a higher specificity than a selector like `.c-btn{}`. This means that if we were to put a `.c-btn` inside of this Scope(`.s-custom-cocktail), it's `color` would get overwritten by the `.s-custom-cocktail a{}` -- this is something we (probably) don't want. This simple example outlines the potential for problems when working with Scopes, so tread carefully.

Please make triple sure that that you need to employ a Scope before you start writing lots of nested selectors. If you are unsure, it may be best to err on the side of caution and leave Scopes out entirely.

Warnings aside, the actual `s-` namespace becomes incredibly useful for signaling to developers that an entire area of the DOM is subject to one big caveat. Anything we see styled in here might have an extra layer of styling applied to it in a pretty opinionated and greedy manner.


<br>

Scopes:
 - Scopes are pretty rare: make triple sure you need them.
 - They rely entirely on nesting, so make sure people are aware of this.


<hr>


## Stateful Namespaces: `is-`/`has-`

**Format:**

```scss
.[is|has]-state{}
```

**Example:**

```scss
.is-open{}
.has-dropdown{}
```

Stateful namespaces are very handy. They come from [SMACSS](https://smacss.com/book/type-state), and they tell us about short-lived or temporary states of the UI that need styling accordingly.

When looking at a piece of interactive UI (e.g. a modal overlay) through developer tools, we'll probably spend some time toggling things on and off. Being able to see classes like `.is-open` appear and disappear in the DOM is a highly readable and very obvious way of learning about state:

```html
<div class="c-modal is-open">
  ...
</div>
```

It's also incredibly handy in our CSS to tell developers possible states that a piece of UI can exist in, for example:

```scss
.c-modal{
  ...
  &.is-open{ ... }

  &__content{
   &.is-loading{ ... }
  }

}
```

These classes work by chaining other classes, for example `.c-modal.is-open`. This heightened specificity ensures that the State always takes prominence over the default styling. It also means that we would never see a bare Stateful class on its own in a stylesheet: it must always be chained to something.

States differ from BEM Modifiers in that they are temporary. States (can) change from one moment to the next, perhaps based on user action (e.g. `.is-expanded`) or from changes that are being pushed from a server (e.g. `.is-updating`).

So when do you use `has-` over `is-`? Well first think about it logically... and you will usually get there.
 - `is` - Always refers to the element it's applied to; and is typically a verb which is a word used to describe an action, state, or occurrence.
 - `has` - Has is the present indicative of have which means *to possess; own; hold for use; contain;*. This mean `has-` (almost) always refers to a state that has changed inside of the element it's applied to.

Take for example the `.c-model` in the example above, both `is-open`, and `is-loading` are tied to the element it's applied to because it's describing the element's state.

Say that you want to disable scrolling on the page when a modal is open, `c-modal`, and show an overlay that spans the full viewport in between the modal and the elements behind it. Knowing what we want to happen, you should know that you will need set the `html` tag to be `overflow: hidden;` which means we will need to add a state class to the `html` tag.

So what class(es) would you add to the `html` tag?
 - a. `.t-overlay`
 - b. `.is-overlay`
 - c. `.has-overlay`
 - d. `.is-preventing-scroll`
 - e. `.has-active-model`
 - f. `.has-scroll-prevented`
 - g. `.t-modal`
 - h. `.is-modal`
 - i. `.has-model`
 - j. `.is-active-modal`
 - k. `.is-fullscreen`



###### If you answered *c* and only *c*
You my friend are a true rockstar and probably deserve a raise because you read the documentation above (like it's your job!) and (probably) noticed the word *almost* in the `has-` description; and think logically outside the box! It can solve both of these issues and doesn't require you to add multiple classes to acheive this effect; and (probably) prevents us from rewriting something that should be tied globally to the `html` because this state is very specific and very reusable on things other than the `c-modal`! You hopefully realized that you can use a pseudo element on the `html` to create the overlay effect instead of having to add a new element.

###### If you answerted *b* **or** *g*
You are a great background dancer for the true rockstar above (be proud because I can't dance). Why these are valid solutions:

 - b. Yes the overlay is being applied to the `hmtl` tag so `is-` is typically correct. It's just bad english though, and doesn't make as much sense as `has-overlay`.
 You're awesome because you read the documentation above and (probably) notice the word *almost* in the `has-` description.
 - g. This is just too specific of a theme that can't be reused, and it requires the modal to be displayed; and things might be weird because it might require other specific elements to be displayed for the page to look correct.

The reason why you aren't a true rockstar is because `has-` and `is-` can't be defined in the global scope and have to be tied to another namespace.


###### If you answered *d* and *i*
You aren't *incorrect*. But they're the best solutions because you would likely have to rewrite some styles that would serve better in a global class.
 - d. While this does prevent the scrolling issue, you would have to add multiple state classes to `html`.
 - i. This is quasi correct in the sense that you're correct that the page does contain a visible modal. But you will have to write styles that are probably already in the global scope because this scenario can be used in multiple areas of the site.


###### For the rest of you
 - a. :facepalm: Theme states aren't used for short lived states.
 - e. `has` implies an active state so `active` is unnecessary to add to the name of the state.
 - f. You can't "*possess; own; hold for use; contain;*" `scroll-prevented` because it's an action.
 - h. :facepalm: `modal` isn't a state...
 - j. :facepalm: There are several problems with this.<br>
   1. "`is` - Always refers to the element it's applied to ...". Did the `modal` change to be *the entire document* and I missed it?
   2. "`is` - ... is a verb (which is a word used to describe an action, state, or occurrence). If you have to prefix `active` to another word to make it be an action... it's probably not an action.
      > Take a coffee break and come back ready to adult better..
 - k. You're going under the assumption that `fullscreen` looks like an overlay; and that may not always be the case. It could have a solid `backround-color`, It could have a `nav` that shows up at the bottom of the screen, etc.

<br>

States:
 - States are very temporary.
 - Ensure that States are easily noticed and understood in our HTML.
 - State classes can't contain BEM elements, or modifiers.
 - Never write a bare State class.

<hr>

## Hack Namespaces: `_`

**Format:**

```scss
._<namespace>hack-name{}
```

**Example:**

```scss
._c-footer-mobile{}
```

In certain and usually quite rare circumstances, we might need to add a class to our markup purely in order to help us hack or override something. If we ever do that, we need to signal that this class is hacky, it's (hopefully) quite temporary, we want to get rid of it at some point, therefore do not bind onto, reuse or otherwise interface with it.

The reason for the leading underscore is simply to mirror the paradigm of private variables in programming languages. Variables that are private to the program should not be relied upon or reused by other developers, and that's the same with our Hack classes.

These types of class are pretty easy to spot in our codebase, so any hacks will become very apparent, which is a [good thing](http://csswizardry.com/2013/04/shame-css/).

```scss
@include media("<30em"){
 // We need to force the footer to be a fixed height on smaller screens.
 ._c-footer-mobile{
   height: 80px;
 }
}
```

<br>

Hacks:
 - Hacks are ugly — give them ugly classes.
 - Hacks should be temporary, do not **reuse** or **bind** onto these classes.
 - When a hack is added a task should be created to fix it. It may not be fixed by the initial production, but it needs to be taken care of as soon as possible.

<hr>

## JavaScript Namespaces: `js-`
**Format:**

```scss
.js-[component]-[action]{}
```

**Example:**

```scss
.js-modal{}
.js-modal-close{}
```

Javascript namespaces are pretty common now. There have been several articles written about using this `js-` namespace, [Philip Walton](http://philipwalton.com/articles/decoupling-html-css-and-javascript/)(google engineer) wrote a pretty good article about this. Twitter(**NOT BOOTSTRAP**), a very notable site, has addopted this technique and use it on their live site. The idea is that, in order to properly separate our concerns, we should never have styling and behaviour bound to the same hooks. To bind both technologies onto the same hook means we can't have one without the other: our UI becomes all-or-nothing, which makes it very opinionated and inflexible.

It also means that we can work a lot more safely. It means that CSS developers can work and refactor freely without the worry that they will break some JS, and vice versa. It separates our concerns and leaves each team with it's own hooks for it's own purposes.

JavaScript and CSS are separate concerns— use separate hooks for them when possible. Giving different teams/roles different hooks makes for safer collaboration. Using the `js-` namespace will prevent many hours of refactoring & reduce the scope for impact analysis.

For example if you took `c-card` mentioned in [Methodologies](METHODOLOGIES.md#bem-examples) and you wanted to have an overlay appear when the user clicks `c-btn-bubble`, and you proceed to hook into `.c-btn--bubble` that is in `c-card` in your js.

```html
<div class="c-card">
 ...
 <a href="c-btn c-btn--bubble u-icon--plus">Open overlay</a>
 <div class="c-card__overlay">
  ...
 </div>
 ...
</div>
```

```js
$(".c-card").on("click", ".c-btn--bubble", function(e){
 e.preventDefault();
 $(this)
  .parent()
  .find(".c-card__overlay")
   .addClass("is-open"); // because you read the documentation
});
```

At this point (assuming the styles are correct) we have achieved the effect that we wanted. Great Job!

### 3 months later...

Your project manager decides they want to add another button to `c-card__actions`... and they want it to look like the `c-btn--bubble` that is used to open the overlay (because you did such a good job making it it look super sweet(\#firstworldproblems)!). :facepalm: Now you have to go back into your JS and update it to be more specific to only target the `.c-btn--bubble` that's not in `c-card__actions`. So you go refactor your JS to only target `.c-btn--bubble` that's a direct decendant of `c-card`.

```js
$(".c-card > .c-btn--bubble").on("click", function(e){
 e.preventDefault();
 $(this)
  .parent()
  .find(".c-card__overlay")
   .addClass("is-open"); // because you read the documentation
});
```

Congrats you fixed the issue!


### 1 month later...

Your project manager decides they want to add another button to the `c-card` next to the `c-btn--bubble` that opens the container.

![Well shit fire](http://memecrunch.com/meme/3V2EW/well-shitfire/image.png?w=500&c=1)

This means you have to go into your JS and refactor it... again. If you can't see the problem with this approach by now, you're probably an intern and should go ask for a better explaination. If you're an Intern and you can explain why this approach is bad, then you have just earned 5 :star:s!



Here's how you to fix this problem.

```html
<div class="c-card">
 ...
 <div class="c-card__secondary-actions">
  <a href="c-btn c-btn--bubble u-icon--plus js-card-overlay">Open overlay</a>
  <a href="c-btn c-btn--bubble u-icon--plus js-card-img-zoom">Image zoom</a>
 </div>
 <div class="c-card__overlay">
  ...
 </div>
 ...
</div>
```

```js
$(".js-card-overlay").on("click", function(e){
 ...
});

$(".js-card-img-zoom").on("click", function(e){
 ...
});
```

Using this method, you spend more time writing new things, and less time refactoring. Therefore, you get more time to work on awesome new stuff!

There're only a few scenarios when you can use JS to hook into something other than `js-`.
 1. Adding classes to `html`, and `body`. You typically won't need to add a js hook onto the `<body>` or `<html>` as most developers understand inherently these are used in js commonly.
 2. A **global** component that requires it, and will always require it. These cases are rare but they do/will happen, and when they do these cases are vetted very thoroughly.
    - Before you spend **5 hrs** writing JS for the component, you should talk it over with your **UI project lead**.
    - You will be required to give a valid reason why you need to use JS to hook into the component.
    - Be **100%** sure you need to do this.
    - If you absolutely need hook into a component with js then it needs to be noted in the component documentation via `@requires js`.
 3. A `s-` namespace. While you *can* do this it's still not recommended. The `js` written for this scope should included in this section and not in the `site.js`.  This will most typically be for a highly specialized page with a lot of js in a class.
     - You can place it in `lib/js/scope/s-[scope name].js`.
     <!-- @todo {!!!} uhh... we need to talk this out, you can't just decide stuff like this for everyone.(That's why I had you read it. I just put it in here to be consistent with the sass structure. But yes we will need to talk it out when we clean up the JS folder) -->

<br>

JS:
 - JavaScript and CSS are separate concerns — use separate hooks for them.
 - Giving different teams/roles different hooks makes for safer collaboration, and less refactoring.

<!-- @todo {!!!}  from jessica to tyler - need to spend some time writing some examples of what the js namespaces should hold, you spend a lot of time defending it and not a lot of time discussing ouw to implement it. also, your example is not the best... i will talk to you about it just needed to note it so i didn't forget. -->

<hr>

## QA Namespaces: `qa-`

**Format:**

```scss
.qa-node-name{}
```

**Example:**

```scss
.qa-error-login{}
```

An unusual, but potentially very useful namespace is this one, for your QA team. When running automated UI tests with something like Selenium, or a headless browser, it is quite common to do something like:

 1. Visit site.dev/login
 2. Enter an incorrect username.
 3. Enter an incorrect password.
 4. Expect to see an error appear in the DOM.

This (can) prevent issues with QA like hooking into messaging classe names e.g. "*Does .error appear in the DOM?*". The problem with these tests looking for style hooks is that simply refactoring your HTML/CSS to use a different name can cause the test to fail, even if the functionality is exactly the same. In a similar vein to our JS hooks, automated UI tests should not be reliant on CSS classes. To do so breaks our separation of concerns.

The QA team binds onto a suite of their own classes that everyone else leaves untouched. This means that if we start out with this:

```html
<strong class="alert error qa-error-login">
```

...and we refactor those nasty `.alert` and `.error` classes, we should be left with something like this:

```html
<strong class="c-alert c-alert--error qa-error-login">
```

We can make all of the CSS changes we like, as long we we ensure that the QA team's hook stays in place.

<br>
QA:
 - Binding automated UI tests onto style hooks is too vague — don't do it.
 - Bind tests onto dedicated test classes.
 - If you remove a component that contains the `qa-` namespace be sure to let QA know.
 - Ensure that any UI refactoring doesn't affect the QA team's hooks(that means no refactoring for them! that in turn means they like us more!).


<hr>


## Development Namespaces: `d-`
**Format:**

```scss
.d-component-name{}
```

**Example:**

```scss
.d-namespace-c{}
```

These classes will **never** make it to production code. They're used to help in the development processes by allowing you to add temporary classes to help with bugs. Using the `d-` lets all developers know that this is something that needs to be removed (from every language) before it moves on to staging/production. This also lets other developers know not to bind onto it because it will be removed.

<br>

Development:
 - Will be removed before staging/production.
 - Can only bind onto for development purposes.
 - Should be removed once the bug is identified.
 - Things in `playground/` should be using `d-`.


<hr>

## Conditional Viewports

**Format:**

```scss
.[<namespace>]-[<name>][<element>|<modifier>]@<breakpoint>{}
```

**Example:**

```scss
// it's always used inside of a media mixin
@include media("each", "", ">=md"){
 .o-grid#{$media}{}
}
```
Output:
```css
.o-grid{} /* all viewports */

 @media (min-width: 768px){
 .o-grid\@md{} /* only the medium size viewport */
 }
```

Conditional viewport suffixes are very handy for changing the appearance of an element at different screen sizes.
To use a conditional viewport size you must write in inside of the `media` mixin. Classes like this one should be used sparingly because they are duplicating styles across multiple viewport sizes. Since are we using the [mobile first approach](METHODOLOGIES.md#mobile-first-approach) this means when you use `o-grid` you're saying `o-grid` applies to all screen sizes, and when you say `o-grid@md` you're saying this class applies to all screens that are greater than or equal to the `@md` viewport size.

Here's complete list of the suffixes that can be used of different classes.
 - `@sm` - Applies screens that are >= to the `sm` screen size
 - `@md` - Applies screens that are >= to the `md` screen size
 - `@lg` - Applies screens that are >= to the `lg` screen size
 - `@xl` - Applies screens that are >= to the `xl` screen size

The most common use for these conditional viewports are to combine them with object(`o-`) classes to change the layout at different screen sizes.

```html
<div>
 <div class="o-col o-col--6@md o-col--4@lg"></div>
 <div class="o-col o-col--6@md o-col--4@lg"></div>
 <div class="o-col o-col--6@md o-col--4@lg"></div>
</div>
```

Another common use for them is for showing and hiding at different screen sizes

```html
<div class="u-hide u-show@md"></div>
```

As you can see no pixel values are declared here, because viewport sizes are referred to semantically. This way we can change the different viewport sizes on a project by project basis and no one has to remember the exact px/em size that was used.

<br>
Conditional Viewports:
 - Should be used sparingly because they are duplicating styles.
 - Can't be combined with `s-`, `t-`, `is-`, `has-`, `js-`, `qa-`, `_-`
 - Don't assume all `o-`, `u-` classes have conditional viewport suffixes, they're only applied to classes that need them.
 - They can be used on `c-` but it should be rarely used


<hr>

## Ordering of your classes
This is a very important topic that you need to understand fully before you start to throw arbitrary classes onto and `class` attribute. For the examples below I'm going to use `foo`, `bar`, `qux`, `quux` because they aren't real class names to avoid confusion. Just focus on the namespaces and the conditional viewport suffixes.
```html
class="[[[<scope>|<theme>|<component>|<object>|<utility>|]|<viewport>]|<qa>|<js>|<is|has>]"
```
 First part of the class order
 1. Scope always comes first because it's important to know that a section is scoped
 2. Theme because you need to know if something has a theme applied to it so you know why certain colors might not be what you expect.
 3. Component because it's the most specific other than the first 2, and is less likely to change.
 4. Object is more specific than utilities.
 5. Utility classes aren't as specific as object classes.
 6. Conditional viewports starts everything over from 1 through 6.

 Second part of the class order
 1. QA is first because it's for a specific test and probably will not change
 2. JS Because you need to know what you're hooking into
 3. Stateful classes are often added via JS, so they will end up after JS anyway.

A `<hack>` is the only thing that wasn't in the list above and that is because a `<hack>` should follow the class that has a hack applied to it.

**Example of what not to do**
```html
<div class="is-open js-bar _c-bar o-foo--bar c-bar--quux o-foo@lg u-bar u-quux@sm o-foo o-quux o-foo--bar@lg c-bar s-quux"></div>
```
If this gets submitted in a pull request, it will be immediately rejected. There are a ridiculous number of things that are wrong with writing you classes like this.

 1. It will take you about 5-10min to figure out what the F is going on.
 2. Any modifier classes should follow the class they're modifying
 3. `@sm` shouldn't come before `@lg`
 4. Conditional viewports of the same size should be grouped in order from `@sm` to `@xl`
 5. Conditional viewports should always come after the base classes(except `js-`, `is-`, `has-`, `qa-`)
 6. Object classes should never come before component classes.
 7. Stateful and JS classes always go at the end.
 8. Utility classes come before object classes
 9. Scope classes **always** come first

You should get the picture by now, that this is terrible, and hard to understand what's going on.


**Example:** How it should have been written.
```html
<div class="s-quux c-bar _c-bar c-bar--quux o-quux u-bar o-foo o-foo--bar u-quux@sm o-foo@lg o-foo--bar@lg js-bar is-open"></div>
```



# Example of all the things

Below is a very contrived and forced example to try and demonstrate the power of meaningful namespacing. Of course, this example suffers two key problems:

 1. It is out of the context of an actual big project, so although it demonstrates what the namespaces are, it’s too small an example to really show how powerful namespacing is.
 2. You’ll be very new to the namespaces we’re using, so you won't be able to ‘read' this HTML as quickly as you will once you're more familiar with it.

So, what can we learn from this:

```html
<html class="t-light has-overlay">
 ...
 <article class="c-modal c-modal--wide js-modal is-open">
  <header class="c-modal__header o-headline">
   ...
  </header>
  <div class="c-modal__content">
   ...
  </div>
  <footer class="c-modal__footer o-actions">
   <button href="c-btn c-btn--tertiary o-actions__item qa-modal-dismiss">Cancel</button>
   <button href="c-btn c-btn--secondary o-actions__item qa-modal-accept">Confirm</button>
  </footer>
 </article>
 ...
 <footer class="s-footer">
  <section class="c-social o-grid o-grid--four-columns">
   <a href="...">Facebook</a>
   <a href="...">Twitter</a>
   <a href="...">Google Plus</a>
   <a href="...">Instagram</a>
  </section>
  <small class="c-copyright _c-copyright u-text-center">...</small>
 </footer>
 ...
</html>
```
Well, we can learn a lot:

 - There's a high-level Theme being used (`.t-light`): The UI probably has its current look and feel because of that.
 - We have a modal component (`.c-modal`) which is using a wide variant (`.c-modal--wide`). It has some JS binding onto it (`.js-modal`) and it is currently open (`.is-open`).
 - The modal is made up of a few more pieces `.c-modal__content` and `.c-modal__footer`.
 - There's a object (`.o-actions`) that is laying out the `.c-modal__footer` in the way we want.
 - Some button components (.c-btn) which have:
   - Different versions (`c-btn--tertiary`, `c-btn--secondary`)
   - QA hooks to be bound onto for automated UI testing (`.qa-modal-dismiss`, `.qa-modal-accept`).
 - There's a scoped `footer`, that has some specific styling around it.
 - Some object helpers (`.o-grid`, `.o-grid--four-columns`).
 - I know there are a number of things in here that I can reuse elsewhere (Objects, Components and Utilities).
 - A number of things I can reuse, but not bind onto or alter (Objects and Utilities).
 - A number of things I just plain should not touch (JS and QA peoples' stuff).
 - Some nasty hacks that need removing at some point, but cannot be reused, modified, or moved.
 - All of that learned just from some rich meaning placed in front of our classes. Amazing.

Contrast that with the following without BEM and namespaces

```html
<html class="overlay">
 ...
 <article class="modal wide open">
  <div class="header">
   ...
  </div>
  <div class="content">
   ...
  </div>
  <div class="footer actions">
   <button href="btn tertiary item">Cancel</button>
   <button href="btn primary item">Confirm</button>
  </div>
 </article>
 ...
 <footer class="footer">
  <section class="social grid four-columns">
   <a href="...">Facebook</a>
   <a href="...">Twitter</a>
   <a href="...">Google Plus</a>
   <a href="...">Instagram</a>
  </section>
  <small class="copyright text-center">...</small>
 </footer>
 ...
</html>
```

Lastly Bootstrap's (less-than-ideal) version:

```html
<html>
...
 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog" role="document">
   <div class="modal-content">
    <div class="modal-header">
     ...
    </div>
    <div class="modal-body">
     ...
    </div>
    <div class="modal-footer">
     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
     <button type="button" class="btn btn-primary">Send message</button>
    </div>
   </div>
  </div>
 </div>
 <footer class="footer">
  <section class="social container-fluid">
   <div class="row">
    <a href="..." class="col-3">Facebook</a>
    <a href="..." class="col-3">Twitter</a>
    <a href="..." class="col-3">Google Plus</a>
    <a href="..." class="col-3">Instagram</a>
   </div>
  </section>
  <small class="copyright text-center">...</small>
 </footer>
...
</html>
```

 - You can glean very little from this piece of HTML. You're left in the dark, unaware of what I might be able to recycle, modify, or delete, and you're going to end up with deeply nested selectors to modifiy anything.
 - Bootstrap forces you to use what they define. They have 2 extra nested levels that aren't needed to create a dialog, and an extra nest(`.row`) to create the grid. No room to change their bloated code.
 - You would have to memorize all the utility classes across every site and know which utility classes are used on which sites.
 - All in all there's absolutly no reason why you shouldn't use namespaces, and if you can't see the advantage of them by now then you must not logic well.


# Highlight Types of a Namespace

A very handy side effect of using namespaces correcty is being able to easily visualise the amount of, say, Components that are currently in any given view; you simply need a bit of CSS like this:

```scss
[class^="c-"],
[class*=" c-"]{
  outline: 5px solid cyan;
}
```

This works by:

 - `[class^="c-"]`: Find all class attributes that start with the string `c-`, e.g.:<br />
   ```html
   <blockquote class="c-testimonial">
   ```<br />
 - `[class*=" c-"]`: Find all class attributes that contain the string <space> `c-`, e.g.:<br />
   ```html
   <blockquote class="o-media c-testimonial">
   ```

`.namespace-[o,c,u,t,s,_,all]` classes can be applied anywhere on the site to see the make-up of a page, or scope.

What this allows us to do is get a quick visual indication of the rough make-up of a page. Lots of red? Yikes! That means there are a lot of hacks. Lots of violet? That implies you’re using a lot of utilities: could you maybe refactor and tidy them up?

It's not bulletproof or failsafe, but it's a really handy start in getting a high-level overview of the composition of your UIs.