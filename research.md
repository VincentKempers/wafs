## Advantages and disadvantages of JavaScript libraries/frameworks

### The pros

The positives of working in a web library is that you can work more efficient. You write less code and development is mostly more stable. There are some code that will run under the hood.

On the cost perspective are libraries definitly the best way to go because they are mostly free. Wich is great for products with big use (no per click nonsense). Plus support on the libraries are mostly open source and there is always support for example jQuery. jQuery still has support running till this day.

### But the cons…

Well there are some quite serious cons in my honest opinion. When you work at the libraries they have a lot of limitations. It mostly can’t be modified and you have to do some extended research to know which library works for you. Besides that when you work extensivly on a framework you will be honing a skill in that framework. In case of jQuery you are not gaining a skill in javascript but a skill in jQuery.

#### Speed

The speed of the website or application that you will be creating will take a hit. Loading jQuery in this sense will be done by a CDN. jQuery is hosted on a site and you will need to load that in via a link. Loading your page and loading jQuery and then your code. most libraries have a minified version but because of this people made micro-libraries which are smaller files but just do one thing. Which just raises the question.. why? You will keep loading content and it will be more connections going to your website.

#### But you can run it locally...

Yes you can but you still have code that you don't fully use that will run along side. Let's be honest, why have a bunch of code running around if it won't run anyway. That beats the efficiency.

## Advantages and disadvantages of client-side single page web apps

### Disadvantages
What happens when you make use of a SPA.
- You “override” basic browser behaviour, this means when you hit the “back” you leave the SPA.
- Scroll position will not be remembered and this will be annoying for the user.
- The browser cancels inflight request with the cancel button. On SPA’s it will cause some glitches because the browser will cancel it.
- unsaved changes can’t be used in SPA’s because you as a user didn’t really send out a request.
- SEO isn’t the greatest on SPA’s. Even Google Mail has a landing page.
- If a user doesn’t have JS it will break..
- Functional testing is going to be tedious.

### Advantages

The advantages of SPA
- No refresh. Everything you access works.
- Mobile friendly. On mobile you access the content and don’t have to refresh.
- SPA is fast!
- Simplified development.
- You can cache effectively.

## Best practices

### Best practices for libraries/frameworks
Well to be honest I think both options are only useful for the project you work on. If it's a big project that needs multiple pages and uses a lot of requests or api's a framework would work just fine (think about react/VueJS) or run jQuery if your team of developers work with it (on jQuery note i would say that Vanilla JavaScript would be more reliable). But if you just need a small library to work with (which is reliable and has good enough support) use that. On the library side i would say do extensive research and be honest with yourself:

- Do you want to run a lot of code for this project?
- Can you keep it simple?
- What is the reason to use this library and does that functionality exist (in your framework/library)?

### Best practices for Single Page Apps (SPA)

I do believe that there are great advantages for a SPA. There is just a few things that you should consider of a SPA.
That thing is the user experience because you don't want people to get annoyed by searching your app and when they want to return to a state before (back button ~~/panic button~~) they will lose their current position and grasp of your app. Keep it clean, simple and easy a few examples that take these problems and run with them are:

- ToDoist (very clean and simple and everything is right **'there'**).
- Trello (new users immediately know where to go and power users will not even look and know where things are).
- [Wake up by Isadora digital agency](http://wakeup.isadoradigitalagency.com/)

And what these sites all have in common, well they all have a landing page. Something that can get picked by Google. You want your SEO (Search Engine Optimisation) to work.
