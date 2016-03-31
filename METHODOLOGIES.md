# Methodologies

Methodology is a system of methods used in a particular area of study or activity. We employ a variety of methodologies to create this framework to avoid duplicating multiple styles, simplify code, improve readability, and avoid highly nested selectors. Code is forever changing and (hopefully) constantly improving because new techniques/methodologies are learned, we welcome all suggestions where you think there's room for improvement. So if you have a suggestion we can vet it, and potentially add it.

Since this is a responsive framework we are using the **mobile first approach**, along with **Atomic NSOOBEMITSCSS**. No I mean it-- we use **Atomic NSOOBEMITSCSS** (aka several methodologies combined into one awesome name).

## Mobile first approach
This is a fairly well known methodology where mobile size version of the page is the base starting point, hence the name *Mobile fisrt*. This methodology forces the developer to figure out what information is most important to the user, eliminating extra fluff. Then, as the viewport gets larger, the developer can start displaying more and more information-- and in most cases adjusting the layout of the page. There aren't any hard fast rules here. A lot of it is *common sense* and your best judgement.

After you know what you want the page to do on a small screen and you have a pretty good idea on how you want it to respond as it gets larger, you can now start coding. When you start writing your `scss`, your base styles should reflect what you want it to look like on the smallest viewport you support(most likely `320px`). Other than a few edge cases this is the best approach to take. `99.99%` of the time, the smallest viewport is going to have the simplest layout, and the layout becomes more complex the larger the viewport gets because you're adjusting the layout of the page. Starting with the smallest viewport first eliminates the need to overwrite the extra styles applied to larger viewports. It could theoretically also allow us to send smaller files to mobile devices if we broke out our media queries into their own files, which can increase page load speed for all mobile devices, especially devices connected through painfully slow *Edge* or *3G*. Heaver page loads are then left for the desktops, which are reliably capable of handling exra page weight.

**Example:**
You have 4 elements in a container that you want to span 4 across on a large viewport with the centered text, 2 across on a medium viewport with centered text, and stack to be 1 column on a small viewport with the text aligned to the left.

```html
<div class="c-foo u-clear">
 <div class="c-foo__bar">Item 1</div>
 <div class="c-foo__bar">Item 2</div>
 <div class="c-foo__bar">Item 3</div>
 <div class="c-foo__bar">Item 4</div>
</div>
```

**Example:** What **NOT** to do

By default a `div` has a `width: auto;`, and all elements have a default `text-align: left;` but we're overwriting both of these with our base styles. So we're forced to redefine the defaults for a smaller viewport, and that's extra unnecessary styles.

```scss
// DON'T DO THIS
.c-foo{
 &__bar{
  float: left;
  text-align: center;
  width: 100% / 4; // 25%

  @include media("<=md"){ // less than or equal to the `md` viewport
   width: 100% / 2; // 50%
  }

  @include media("<=sm"){ // less than or equal to the `sm` viewport
   width: 100%;
   text-align: left;
  }
 }
}
```

**Example:** How it should be done.

Since we started with the mobile size first we don't have to define out `width: 100%` because that's what the default state of a `div` is. In this case it's only 2 styles, but they quickly start adding up, especially with more complex layouts.

```scss
.c-foo{
 &__bar{
  float: left;

  @include media(">=md"){ // greater than or equal to the `md` viewport
   text-align: center;
   width: 100% / 2; // 50%
  }

  @include media(">=lg"){ // greater than or equal to the `lg` viewport
   width: 100% / 4; // 25%
  }
 }
}
```

**Note:** To get this effect in this framework you would use the grid system provided so no duplicate styles have to be added.

#### Exceptions to Mobile First
Yes, there're some special case senarios(aren't there always?) where it is better to do the reverse. These cases are rare, and only happen for complex layouts where you're doing something completely different on a small screen than you are on large screen. Breaking the mobile first approach is appropriate only when overwriting the smaller viewport styles is far less work than the opposite.

> If you still don't understand what the *mobile first approach* is then do the following steps in order.
>  1. Go [here](http://bit.ly/1MdhAtZ) and read more about it
>  2. Repeat step **1**
>  3. Ask Tyler Benton on slack. **Note:** Emails will be replied to on slack(subtext don't email me)
>
> \- <3 Tyler Benton


# Atomic NSOOBEMITSCSS

People love naming things. And developers love acronyms. And thus here we are, finding ourselves with all of these CSS naming conventions and methodologies: Namespacing, BEM, SMACSS, Point North, ITCSS, OOCSS, Title CSS, Idiomatic CSS, Atomic Design, SUIT CSS, Kickoff CSS, etc.

We often hear *"Are you using OOCSS or BEM?"* but these things are not mutually exclusive. In fact, most of the time, we're taking concepts and ideas of the aforementioned ideologies, and mixing them up, customizing them to fit our own needs. No one solution will solve everything, just like two heads are better than one. Below are the current methodologies we have implemented in our css development.


## Atomic SCSS

Atomic Design is a systems-thinking methodology solidified by [Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/). While we're not using the directory structure outlined there, we do use the concepts and ideas expressed by Brad's Atomic Design methodology in design work and extend them onto my development work (via Sass modules and components).

The gist is basically to design and develop in terms of systems thinking — to create individual molecules or elements which, when combined and placed together, weave a web of modules, components, and eventually entire layout systems. In this framework we break our SASS folder structure down in a similar way.

 - `helpers/` - Consist of variables, functions, and mixins to help you through development process.
 - `base/` - Any base styles that need to be applied to elements(classes aren't allowed in this folder) for reset purposes, and they affect all global styles.
 - `objects/` - Objects go here. See more about [objects](NAMESPACES.md#object-namespaces-o-)
 - `components/` - The components that make up the site are located here. See more about [components](NAMESPACES.md#component-namespaces-c-)
 - `utilities/` - All utility classes go here. See more about [utilities](NAMESPACES.md#utility-namespaces-u-).
 - `scoped/` - All scoped specific styles go here(eg. header, body, and footer styles).
 - `pages/` - Page specific styles go here (SASS partials aren't permitted here).
 - `playground/` - No production code lives here. It's just used as a place that you can develop code you're sure you DON'T want to use in production.
 - `dev/` - No production code lives here. It's just a place for helper classes to go that help with the development process only.

## Namespace(NS)
Namespacing isn't a new concept by any means, and it's often used in other languages like JS to avoid collisions with other objects or variables in the global namespace. They're also extremely useful for helping organize blocks of functionality in applications into easily manageable groups that can be uniquely identified.

We take that same methodology and apply it to our Atomic css folder structure. In no particular order, here are the individual namespaces and a brief description, and use cases.
 - [`o-`](NAMESPACES.md#object-namespaces-o): Signify that something is an Object. Objects are similar to components, but an object can be infinitely nested within itself. It may be used in any number of unrelated contexts to the one it is currently seen in. Object can also be combined with components, and layout classes. Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places. Tread carefully.
 - [`c-`](NAMESPACES.md#component-namespaces-c): Signify that something is a Component. This is a concrete, implementation-specific piece of UI. All of the changes you make to it's styles should be detectable in the context you're currently looking at. Modifying these styles should be safe and have no side effects outside the current component scope.
 - [`u-`](NAMESPACES.md#utility-namespaces-u): Signify that this class is a Utility class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI.
 - [`t-`](NAMESPACES.md#theme-namespaces-t): Signify that a class is responsible for adding a theme to a view. It lets us know that UI Components' current cosmetic appearance may be due to the presence of a theme.
 - [`s-`](NAMESPACES.md#scoped-namespaces-s): Signify that a class creates a new styling context or Scope. These should be used sparingly— they can be open to abuse and lead to poor CSS if not used wisely. They're used in cases like `s-header`, `s-search` where you are adding styles that can't be reused anywhere else on the site, and they're specific to that section.
 - [`is-`, `has-`](NAMESPACES.md#stateful-namespaces-is-has): Signify that the piece of UI in question is currently styled a certain way because of a state or condition. This stateful namespace is gorgeous, and comes from `SMACSS`. It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.
 - [`_`](NAMESPACES.md#hack-namespaces-_): Signify that this class is the worst of the worst—a hack! Sometimes, although incredibly rarely, we need to add a class in our markup in order to force something to work. If we do this, we need to let others know that this class is less than ideal, and hopefully temporary (i.e. do not bind onto this). This type of class is used in scoped(`s-`) scenarios, where you're trying to do something different that the framework allows. Please don't forget to separate out hacky fixes from your main styles, and **comment** why you had to add this fix.
 - [`js-`](NAMESPACES.md#javascript-namespaces-js): Signify that this piece of the DOM has some behavior acting upon it, and that JavaScript binds onto it to provide that behavior. If you're not a developer working with JavaScript, leave these well alone.
 - [`qa-`](NAMESPACES.md#qa-namespaces-qa): Signify that a QA or Test Engineering team is running an automated UI test which needs to find or bind onto these parts of the DOM. Like the JavaScript namespace, this basically just reserves hooks in the DOM for non-CSS purposes.
 - [`d-`](NAMESPACES.md#development-namespaces-d): Signify that this class is for development use only and should be removed before code is deployed to stating/production.

If you haven't noticed by now our namespaces correspond to our [Atomic SCSS](#atomic-scss) folder structure. This makes it easy to know where you can find the SCSS for different classes you come across by simply knowing their Namespace. Logical right? For more in-depth explanation of each of these Transparent UI Namespaces please see [Namespaces](NAMESPACES.md)


## BEM
BEM is the system used to mark things up. **BEM** Stands for *Block, Element, Modifier*. This is especially useful on a larger teams, because it takes the guess work out of figure out what classes are tied to what. It also reduces the specificity required style elements inside blocks.

#### Block
The `block` is the container or context where the `element` finds itself. Think of this as the bigger structural chunks of your code.

```scss
.block{}
```

#### Element
The `element` is the piece of a `block`. The `block` is the whole and the `element`s are the pieces. Each `element` is written after the `block` connected by two underscores(`__`).

```scss
.block__element{}
```

I know this looks a little strange but once you start using it you'll wonder how you ever wrote CSS without it! The double underscore allows you to quickly and visually navigate and manipulate your code when you see it used in another language.


#### Modifiers
Now it gets fun (if you weren't having fun already!) When you name a class, the intention is to help make that element repeatable so you don't have to write new classes in other areas of the site (assuming the element's styles are the same). When you need to modify the style of a specific element, you can use a modifier (of course!) To do this, simply add a double hyphen(`--`) after the `block` or `element`.

Here is a short example:

```scss
.block--modifier{}
.block__element--modifier{}
```

The only time nesting BEM selectors is permitted is when inside of a modifier; and even then, you shouldn't need to go more than 1 level deep.

```scss
.block--modifier{
 // styles to modify the block if needed
 .block__element{
  // styles to modify the element in a block when this modifier is applied
 }
}
```

#### Breaking BEM down
See if you can break this class name down.

```scss
.c-card__img-container--alt
```

This is a modifier(`alt`) class for the `img-container` inside of the `card` component



#### BEM Examples
Now that we know what BEM is, here's a real world example of how to use it. This example is based off of this material design:

![card](https://cms-assets.tutsplus.com/uploads/users/52/posts/22516/image/card_design.png).

Take a look at the card and break it down atomically.

It's a card that's made up of an image with a caption, content, and buttons. Knowing that information we can start the component.

 1. Define the card component

    ```html
    <div class="c-card"></div>
    ```
 2. Add the image

    ```html
    <a href="#" class="c-card__img-container">
     <img src="http://lorempixel.com/400/200/nature/">
     <h5 class="c-img-container__caption">Kangaroo Vally Safari</h5>
    </a>
    ```
 3. Add content section

    ```html
    <div class="c-card__content">
     <h5>Kangaroo Vally Safari</h5>
     <p>Located two hours south of Sydney in the Southern Highland of New South Wales, ...</p>
    </div>
    ```
 4. Add the buttons

    ```html
    <div class="c-card__actions">
     <a href="#" class="c-btn">Share</a>
     <a href="#" class="c-btn">Learn More</a>
    </div>
    ```

Now that we have added all the "molecules" to the `card` component, this is the end result:

```html
<div class="c-card">
 <a href="#" class="c-card__img-container">
  <img src="http://lorempixel.com/400/200/nature/">
  <h5 class="c-img-container__caption">Kangaroo Vally Safari</h5>
 </a>
 <div class="c-card__content">
  <p>Located two hours south of Sydney in the Southern Highland of New South Wales, ...</p>
 </div>
 <div class="c-card__actions">
  <a href="#" class="c-btn">Share</a>
  <a href="#" class="c-btn">Learn More</a>
 </div>
</div>
```

You might be thinking to yourself *"but the class names are so long!"*. The way I see it: BEM class names are specific, clear, easy to read inside HTML, and clearly communicate what they're for. So I will take a long class name over spending 30min trying to figure out what's going to break if I update `.secondary`. Since we're prefixing the `element` with the same name as the `block`, this also removes the need for nested selectors.

You might also be wondering *"but what if you have a nested element inside of nested element inside of nested element?"*. This is why we use more than one methodology, so don't be ridiculous and try to pass any selectors that look like this `.block__element__element__element`; they will be rejected. While it's rare to run into this scenario, it's also inevitably going to happen. If you run into a scenario like this please use common sense and start a new selector. Like in the example above there's a caption inside of the `img-container` so I used the parent `element` of the caption as the `block` for the `caption` element.


## OOCSS(OO)
OOCSS stands for Object-Oriented CSS. From [Nicole Sullivan's](http://www.stubbornella.org/) OOCSS [workshop](https://github.com/stubbornella/oocss)

> Basically, a CSS "object" is a repeating visual pattern, that can be abstracted into an independent snippet of HTML, CSS, and possibly JavaScript. That object can then be reused throughout a site.

The examples Nicole shows in her workshop use multiple classes to achieve this format, which, at this point, may leave you thinking: *"Wait. Doesn't this contradict BEM?"* Nope. It doesn't have to. We have Sass to make things right. So it's less **OOCSS** and more **OOSCSS**!

I like to think of the way I write my Sass as Object-Oriented. If we think of the card as an *"object"* which pulls in various *"classes"* to comprise it, we can still keep everything nested nice and neat with the use of the almighty **ampersand**

Since we know it's a card, that's made up of an image with a caption, content, and buttons. The SCSS is pretty straight forward

```scss
.c-card{
  // styles for the card container

  &__img-container{
   // styles for the img container
  }

  &__title{
   // styles for the title
   &--caption{
    // styles for the title as a caption
   }
  }

  &__content{
   // styles for the content container
  }

  &__actions{
   // styles for the multiple buttons on the bottom
  }
}
```

You may have noticed the `@at-root`. This sass feature escapes the current nest scope. When writing the base styles for a component, or anything for that matter, you want to avoid nested selectors where possible. Inevitably you will have some component on some page that you will want to modify to fit the design better; and not nesting selectors from the start will reduce nested selectors for scoped sections later.

Here is the live example of the card component that was created above:

<p data-height="409" data-theme-id="0" data-slug-hash="vOaXKM" data-default-tab="result" data-user="tjbenton21" class='codepen'>See the Pen <a href='http://codepen.io/tjbenton21/pen/vOaXKM/'>Simple Material Design Card</a> by Tyler Benton (<a href='http://codepen.io/tjbenton21'>@tjbenton21</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## ITCSS (IT)

Okay, this is where we pull it all together. We're almost at the finish line! So. Let’s talk ITCSS. First of all, what is **ITCSS**? Well **IT** is a methodology for how to author your stylesheets that answers the exigent question of of how the heck do I order my styles?

Here is an excellent visual, stolen directly from Harry Roberts' blog [post](http://csswizardry.com/2014/10/the-specificity-graph/) on the Specificity Graph

In Essence:

This is what your specificity graph (probably) looks like: ![Bad specificity graph](http://csswizardry.com/wp-content/uploads/2014/10/specificity-graph-01.png)

This is what your specificity graph **should** look like: ![Good specificity graph](http://csswizardry.com/wp-content/uploads/2014/10/specificity-graph-02.png)

The *specificity graph* is an analysis of your CSS code specificity. When using `!important` statement and overriding your code earlier-than-necessary, it creates these dramatic peaks, causing you to then need to override it *again* to override the *too-specific* override. Do you see why this is problematic? Not only is it confusing and non-semantic, but it also causes you to write *less-performant* code and produce *larger* stylesheets because of all of your overrides. *Your stylesheet size can be represented as the area below the graph*.

How, you ask? In the example above, we see that we supply the broadest styles first, and then we only apply specific styles when we need to, to the element or modifier. Otherwise, we extend from existing code, that is created earlier in the flow of the styles.
