So if you are a developer you've (probably) heard of Bootsrap. Bootstrap has been made by a team of amazing engineers and designers to give some great ideas to the world. First off, it is a good way to learn, and see how some interesting styling and JavaScript can be used. If you are new to front end work, or want to see how responsive web design works at a fundamental level, check out the code. It is a great way of learning how fundamentally some of these front end examples work.

At this point you're probably saying "So why doesn't this use  bootstrap?". So why don't we use it?
It's a good framework for what it is. It helps people who know just enough to tinker with things to change them but people who use bootstrap can't actually build sites from scratch so that's why it's used.

Why not bootstrap?

 1. It doesn't follow best practices
    One of the major issues I have with Twitter Bootstrap is that you end up with a whole lot of DOM elements crammed full of classes. This breaks one of the fundamental rules of good web design, the HTML is no longer semantic and the presentation is no longer separate from the content. Front-end purists will find this rather irksome, as it makes scalability, reusability and maintenance that much more of a challenge. Twitter Bootstrap also exacerbates progressive enhancement as presentation and interaction are no longer independent of content.

 2. The very messy markup
    We hate having excess classes, and **non-semantic** classes littering our markup. We want our sites to be clean, easy to read, and have as little interference as possible when creating markup. There are also practical reasons for not wanting this class-based system. Many CMSs, Drupal included, have their own opinion and method for printing out markup and classes and having to put Bootstrap classes throughout the markup is very difficult. Yes, it can be done, and yes, there are ways of doing it. But, it will take far more time and energy than just creating your own custom CSS from the beginning. You end creating a deeply nested mess just to override one simple component.

 3. You should use YOUR design
    Bootstrap sites all look the same, and all have the same front end code that is applied. Even the themes will apply a lot of styling that you might not need. But for your site, you should have as little CSS as possible to create YOUR design. Why should you be overriding something, when you can just use your own code from the beginning?

 4. It creates extra work
    This is one of the big reasons why we stoped using jquery mobile. It's beyond rediculous to try and overwrite all the crap that comes along with using jquery mobile, and the same goes for bootstrap. Trying to customize boostrap just like jquery mobile is 4x the work to get it to work the way that we want it to.

 5. You're stuck with what they define
    The same reason we stopped using jquery mobile. If we need top implement something in a specific way to flow with the design, it's almost always impossible because of the way that they set up the page. We can't change it and we are stuck using the class names they define, the html strucutre they use so if they have 7 nested `div`s we're stuck with 7 nested `div`s even though we could do the same thing with 3 elements. There's absolutly no flexibility here.

 6. It's extremly bloated
    Straight out of the box, Twitter Bootstrap includes CSS weighing in at **173kb** and **69kb** of JavaScript. This isn't even close to acceptable on desktops, not to mention on a 3g connection. Our framework

    File     | Bootsrap | Custom framework
    ---------|----------|-------
    CSS      | 173kb    | 99kb
    Min CSS  | 146kb    | 73kb
    JS       | 69kb     | 62kb
    Min JS   | 37kb     | 21kb

    When using this custom framework when I say `99kb` for the site it's `99kb` for the site. No extra custom styling needed. When bootstrap says `173kb` they mean `173kb` **plus** the `100kb` you have to write to customize the site the way you wanted too.

 7. We aren't designers who don't know what they're doing
    Boostrap is primarily used by people who know enough to copy someone elses code. But it's infuriating to use for someone who's actually good at their job. It's more work than it's worth to customize it, and by customizing it and you're just adding to that **173kb** css file and **69kb** bloat.

 8. Do you want our sites to look like everyone else's?
    Twitter Bootstrap is super-popular, and therefore every dev and his dog is going be using it. While it is of course possible to customise your app or website design further, you may find time constraints force you to stick to a lot of the vanilla Bootstrap style. This can lead to the inadvertent creation of a lot of similar, generic and unmemorable websites. While Twitter Bootstrap is fast and easy to implement, creativity is often compromised as a result. Innovative designs which defy conventions can be difficult (if not impossible) to implement in Bootstrap's structured environment.
    Some of the more discerning users have suggested that when visiting a site with the default Bootstrap style, they have questioned the legitimacy of the site. It sounds like it's mainly a problem with eCommerce sites, which have been associated with fraudulence in the past. By not putting the effort into customising the styling, users may start to perceive Bootstrap-built sites as untrustworthy... which is the last thing you want, especially if you're trying to sell them something!

 9. Come to find out Twitter(**the people who made Boostrap**) doesn't even use use it. They actually emlopy some similar techiques that we are using. Such as BEM, and namespaces. The button below is taken directly from Twitters header that is used on every single page of their site.

    ```html
    <button id="global-new-tweet-button" type="button" class="js-global-new-tweet js-tooltip btn primary-btn tweet-btn js-dynamic-tooltip" data-placement="bottom" data-component-term="new_tweet_button">
     <span class="Icon Icon--tweet Icon--large"></span>
     <span class="text">Tweet</span>
    </button>
    ```

Bootstrap has be very valuable to the web community and is very useful for designers, and other people who don't know what they're doing. It has taught us the importance of styleguides, and that having all the things it's always the best. While we don't use Bootsrap straight up, we have learned from it, and use what we've learned to make our framework better.