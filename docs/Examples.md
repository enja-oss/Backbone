+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Examples [原文](http://backbonejs.org/#examples)

The list of examples that follows, while long, is not exhaustive. If you've worked on an app that uses Backbone, please add it to the wiki page of Backbone apps.

事例紹介は網羅的なものにはなっていません。もし、アプリケーションでBackboneを活用したものに関わった場合は、[wikiのBackbone apps](https://github.com/documentcloud/backbone/wiki/Projects-and-Companies-using-Backbone)のページに追加してください。

Jérôme Gravel-Niquet has contributed a Todo List application that is bundled in the repository as Backbone example. If you're wondering where to get started with Backbone in general, take a moment to read through the annotated source.The app uses a LocalStorage adapter to transparently save all of your todos within your browser, instead of sending them to a server. Jérôme also has a version hosted at [localtodos.com](http://localtodos.com/) that uses a [MooTools-backed version of Backbone](http://github.com/jeromegn/backbone-mootools) instead of jQuery.

[Jérôme Gravel-Niquet](http://jgn.me/)はBackboneの例としてリポジトリにバンドルされている[Todo List アプリケーション](examples/todos/index.html)に貢献しています。もしBackboneをどこから始めたらいいか迷っている場合は、ひととおり[注釈付きのソース](docs/todos.html)を読む時間をとってみましょう。アプリケーションはサーバーにブラウザ内のすべてのtodoに送らずに、[LocalStorageのアダプター](docs/backbone-localstorage.html)を利用して透過的にを保存します。Jérômeは[localtodos.com](http://localtodos.com/)にjQueryを使わない[MooTools-backed version of Backbone](http://github.com/jeromegn/backbone-mootools)を利用したバージョンを設置しています。

## documentcloud

The [DocumentCloud workspace](http://www.documentcloud.org/public/#search/) is built on Backbone.js, with Documents, Projects, Notes, and Accounts all as Backbone models and collections. If you're interested in history — both Underscore.js and Backbone.js were originally extracted from the DocumentCloud codebase, and packaged into standalone JS libraries.

[DocumentCloud workspace](http://www.documentcloud.org/public/#search/)はBackboneのモデルとコレクションに同等のDocuments、Projects、Notes、そしてAccountsを利用して、Backbone.jsで作られています。もし、成り立ちに興味があるならば、Underscore.js と Backbone.jsはDocumentCloud codebaseより独立したJavaScriptのライブラリとして抽出されたものであることを記しておきます。

## USA Today

[USA Today](http://usatoday.com) takes advantage of the modularity of Backbone's data/model lifecycle — which makes it simple to create, inherit, isolate, and link application objects — to keep the codebase both manageable and efficient. The new website also makes heavy use of the Backbone Router to control the page for both pushState-capable and legacy browsers. Finally, the team took advantage of Backbone's Event module to create a PubSub API that allows third parties and analytics packages to hook into the heart of the app.

[USA Today](http://usatoday.com)はBackboneのデータ/モデルのライフサイクルのモジュール性に秀でています。コードを扱いやすく、そして無駄のない形で維持するために、アプリケーションのオブジェクトをシンプルに作り、継承し、分離し、結びつけます。新しいウェブサイトではpushStateに対応したブラウザとレガシーなブラウザへのページ出力制御のためにBackbone Routerが多用されています。最後に、担当チームはBackbone's Eventの利点を用いて、サードパーティー作成のものや解析のパッケージがアプリケーションの心臓部にフックが可能になるPubSub APIを作成しました。

## Rdio

[New Rdio](http://rdio.com/new) was developed from the ground up with a component based framework based on Backbone.js. Every component on the screen is dynamically loaded and rendered, with data provided by the [Rdio API](http://developer.rdio.com/). When changes are pushed, every component can update itself without reloading the page or interrupting the user's music. All of this relies on Backbone's views and models, and all URL routing is handled by Backbone's Router. When data changes are signaled in realtime, Backbone's Events notify the interested components in the data changes. Backbone forms the core of the new, dynamic, realtime Rdio web and desktop applications.

[New Rdio](http://rdio.com/new)はBackbone.jsをベースにした構成のフレームワークで一から作成されました。すべての画面上の構成要素は[Rdio API](http://developer.rdio.com/)で提供されたデータによってダイナミックにロードされ、レンダリングされます。変更がプッシュされるとすべての構成素は、ページのリロードやユーザーの音楽を中断することなく変更が反映できます。このすべてがBackboneのviewとmodelsに依存しており、また、すべてのURLのルーティングはBackboneのRouterで処理されます。リアルタイムにデーター変更の信号が送られた時、BackboneのEventsはデーター変更に関連した構成要素に通知します。Backboneは新しくてダイナミックでリアルタイムなRdioのWebおよびデスクトップアプリケーションの中核を構成しています。

## LinkedIn Mobile

[LinkedIn](http://www.linkedin.com/) used Backbone.js to create its [next-generation HTML5 mobile web app](http://www.linkedin.com/static?key=mobile). Backbone made it easy to keep the app modular, organized and extensible so that it was possible to program the complexities of LinkedIn's user experience. The app also uses [Zepto](http://zeptojs.com/), [Underscore.js](https://gist.github.com/4285928), [SASS](http://sass-lang.com/), [iScroll](http://cubiq.org/iscroll), HTML5 LocalStorage and Canvas. The tech team blogged about [their experiences using LocalStorage](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps) to improve mobile performance.

[LinkedIn](http://www.linkedin.com/)は[次世代の HTML5 モバイルWebアプリ](http://www.linkedin.com/static?key=mobile)にBackbone.jsを利用しました。

## Hulu

Hulu used Backbone.js to build its next generation online video experience. With Backbone as a foundation, the web interface was rewritten from scratch so that all page content can be loaded dynamically with smooth transitions as you navigate. Backbone makes it easy to move through the app quickly without the reloading of scripts and embedded videos, while also offering models and collections for additional data manipulation support.

## Flow

MetaLab used Backbone.js to create Flow, a task management app for teams. The workspace relies on Backbone.js to construct task views, activities, accounts, folders, projects, and tags. You can see the internals under window.Flow.

## Gilt Groupe

Gilt Groupe uses Backbone.js to build multiple applications across their family of sites. Gilt's mobile website uses Backbone and Zepto.js to create a blazing-fast shopping experience for users on-the-go, while Gilt Live combines Backbone with WebSockets to display the items that customers are buying in real-time. Gilt's search functionality also uses Backbone to filter and sort products efficiently by moving those actions to the client-side.

## NewsBlur

NewsBlur is an RSS feed reader and social news network with a fast and responsive UI that feels like a native desktop app. Backbone.js was selected for a major rewrite and transition from spaghetti code because of its powerful yet simple feature set, easy integration, and large community. If you want to poke around under the hood, NewsBlur is also entirely open-source.

## WordPress.com

WordPress.com is the software-as-a-service version of WordPress. It uses Backbone.js Models, Collections, and Views in its Notifications system. Backbone.js was selected because it was easy to fit into the structure of the application, not the other way around. Automattic (the company behind WordPress.com) is integrating Backbone.js into the Stats tab and other features throughout the homepage.

## Foursquare

Foursquare is a fun little startup that helps you meet up with friends, discover new places, and save money. Backbone Models are heavily used in the core JavaScript API layer and Views power many popular features like the homepage map and lists.

## Bitbucket

Bitbucket is a free source code hosting service for Git and Mercurial. Through its models and collections, Backbone.js has proved valuable in supporting Bitbucket's REST API, as well as newer components such as in-line code comments and approvals for pull requests. Mustache templates provide server and client-side rendering, while a custom Google Closure inspired life-cycle for widgets allows Bitbucket to decorate existing DOM trees and insert new ones.

## Disqus

Disqus chose Backbone.js to power the latest version of their commenting widget. Backbone’s small footprint and easy extensibility made it the right choice for Disqus’ distributed web application, which is hosted entirely inside an iframe and served on thousands of large web properties, including IGN, Wired, CNN, MLB, and more.

## Khan Academy

Khan Academy is on a mission to provide a free world-class education to anyone anywhere. With thousands of videos, hundreds of JavaScript-driven exercises, and big plans for the future, Khan Academy uses Backbone to keep frontend code modular and organized. User profiles and goal setting are implemented with Backbone, jQuery and Handlebars, and most new feature work is being pushed to the client side, greatly increasing the quality of the API.

## Do

Do is a social productivity app that makes it easy to work on tasks, track projects, and take notes with your team. The Do.com web application was built from the ground up to work seamlessly on your smartphone, tablet and computer. The team used Backbone, CoffeeScript and Handlebars to build a full-featured app in record time and rolled their own extensions for complex navigation and model sync support.

## IRCCloud

IRCCloud is an always-connected IRC client that you use in your browser — often leaving it open all day in a tab. The sleek web interface communicates with an Erlang backend via websockets and the IRCCloud API. It makes heavy use of Backbone.js events, models, views and routing to keep your IRC conversations flowing in real time.

## Pitchfork

Pitchfork uses Backbone.js to power its site-wide audio player, Pitchfork.tv, location routing, a write-thru page fragment cache, and more. Backbone.js (and Underscore.js) helps the team create clean and modular components, move very quickly, and focus on the site, not the spaghetti.

## Spin

Spin pulls in the latest news stories from their internal API onto their site using Backbone models and collections, and a custom sync method. Because the music should never stop playing, even as you click through to different "pages", Spin uses a Backbone router for navigation within the site.

## Walmart Mobile

Walmart used Backbone.js to create the new version of their mobile web application and created two new frameworks in the process. Thorax provides mixins, inheritable events, as well as model and collection view bindings that integrate directly with Handlebars templates. Lumbar allows the application to be split into modules which can be loaded on demand, and creates platform specific builds for the portions of the web application that are embedded in Walmart's native Android and iOS applications.

## Groupon Now!

Groupon Now! helps you find local deals that you can buy and use right now. When first developing the product, the team decided it would be AJAX heavy with smooth transitions between sections instead of full refreshes, but still needed to be fully linkable and shareable. Despite never having used Backbone before, the learning curve was incredibly quick — a prototype was hacked out in an afternoon, and the team was able to ship the product in two weeks. Because the source is minimal and understandable, it was easy to add several Backbone extensions for Groupon Now!: changing the router to handle URLs with querystring parameters, and adding a simple in-memory store for caching repeated requests for the same data.

## Basecamp

37Signals chose Backbone.js to create the calendar feature of its popular project management software Basecamp. The Basecamp Calendar uses Backbone.js models and views in conjunction with the Eco templating system to present a polished, highly interactive group scheduling interface.

## Slavery Footprint

Slavery Footprint allows consumers to visualize how their consumption habits are connected to modern-day slavery and provides them with an opportunity to have a deeper conversation with the companies that manufacture the goods they purchased. Based in Oakland, California, the Slavery Footprint team works to engage individuals, groups, and businesses to build awareness for and create deployable action against forced labor, human trafficking, and modern-day slavery through online tools, as well as off-line community education and mobilization programs.

## Stripe

Stripe provides an API for accepting credit cards on the web. Stripe's management interface was recently rewritten from scratch in Coffeescript using Backbone.js as the primary framework, Eco for templates, Sass for stylesheets, and Stitch to package everything together as CommonJS modulas. The new app uses Stripe's API directly for the majority of its actions; Backbone.js models made it simple to map client-side models to their corresponding RESTful resources.

## Airbnb

Airbnb uses Backbone in many of its products. It started with Airbnb Mobile Web (built in six weeks by a team of three) and has since grown to Wish Lists, Match, Search, Communities, Payments, and Internal Tools.

## Diaspora

Diaspora is a distributed social network, formed from a number of independently operated pods. You own your personal data, and control with whom you share. All of Diaspora is open-source code, built with Rails and Backbone.js.

## SoundCloud Mobile

SoundCloud is the leading sound sharing platform on the internet, and Backbone.js provides the foundation for SoundCloud Mobile. The project uses the public SoundCloud API as a data source (channeled through a nginx proxy), jQuery templates for the rendering, Qunit and PhantomJS for the testing suite. The JS code, templates and CSS are built for the production deployment with various Node.js tools like ready.js, Jake, jsdom. The Backbone.History was modified to support the HTML5 history.pushState. Backbone.sync was extended with an additional SessionStorage based cache layer.

## Art.sy

Art.sy is a place to discover art you'll love. Art.sy is built on Rails, using Grape to serve a robust JSON API. The main site is a single page app written in Coffeescript and uses Backbone to provide structure around this API. An admin panel and partner CMS have also been extracted into their own API-consuming Backbone projects.

## Pandora

When Pandora redesigned their site in HTML5, they chose Backbone.js to help manage the user interface and interactions. For example, there's a model that represents the "currently playing track", and multiple views that automatically update when the current track changes. The station list is a collection, so that when stations are added or changed, the UI stays up to date.

## Inkling

Inkling is a cross-platform way to publish interactive learning content. Inkling for Web uses Backbone.js to make hundreds of complex books — from student textbooks to travel guides and programming manuals — engaging and accessible on the web. Inkling supports WebGL-enabled 3D graphics, interactive assessments, social sharing, and a system for running practice code right in the book, all within a single page Backbone-driven app. Early on, the team decided to keep the site lightweight by using only Backbone.js and raw JavaScript. The result? Complete source code weighing in at a mere 350kb with feature-parity across the iPad, iPhone and web clients. Give it a try with this excerpt from JavaScript: The Definitive Guide.

## Code School

Code School courses teach people about various programming topics like CoffeeScript, CSS, Ruby on Rails, and more. The new Code School course challenge page is built from the ground up on Backbone.js, using everything it has to offer: the router, collections, models, and complex event handling. Before, the page was a mess of jQuery DOM manipulation and manual Ajax calls. Backbone.js helped introduce a new way to think about developing an organized front-end application in Javascript.

## CloudApp

CloudApp is simple file and link sharing for the Mac. Backbone.js powers the web tools which consume the documented API to manage Drops. Data is either pulled manually or pushed by Pusher and fed to Mustache templates for rendering. Check out the annotated source code to see the magic.

## SeatGeek

SeatGeek's stadium ticket maps were originally developed with Prototype.js. Moving to Backbone.js and jQuery helped organize a lot of the UI code, and the increased structure has made adding features a lot easier. SeatGeek is also in the process of building a mobile interface that will be Backbone.js from top to bottom.

## Easel

Easel is an in-browser, high fidelity web design tool that integrates with your design and development process. The Easel team uses CoffeeScript, Underscore.js and Backbone.js for their rich visual editor as well as other management functions throughout the site. The structure of Backbone allowed the team to break the complex problem of building a visual editor into manageable components and still move quickly.

## Prose

Prose is a content editor for GitHub, optimized for managing websites built with Jekyll and Github Pages. Prose is itself implemented as a static Jekyll site, using Backbone.js to render the views and handle the routes, as well as Github.js, a small data abstraction layer for manipulating files directly on Github. Read more in the official introduction post, or take a look at the source code.

## scroll kit

scroll kit is a new kind of website builder that makes designing a web page feel more like drawing. The workspace is a single-page web application built with Rails and Backbone.js. In scroll kit, every DOM element is associated with a Backbone model, so that style changes that are made to an element automatically update the model and propagate the change across all its views. Try it out.

## Battlefield Play4Free

Battlefield Play4Free is the latest free-to-play first person shooter from the same team that created Battlefield Heroes. The in-game HTML5 front-end for makes heavy use of Backbone's views, models and collections to help keep the code modular and structured.

## Syllabus

Syllabus is the new live blogging platform used by The Verge and other Vox Media sites. Syllabus uses Backbone on both ends: an editorial dashboard and the live blog page itself. In the back, Backbone is used to provide a single-page experience for uploading, writing, editing and publishing content. On the live blog, Backbone manages fetching a JSON API feed, and updating the infinite-scrolling river of updates with new and revised content.

## Salon.io

Salon.io provides a space where photographers, artists and designers freely arrange their visual art on virtual walls. Salon.io runs on Rails, but does not use much of the traditional stack, as the entire frontend is designed as a single page web app, using Backbone.js and CoffeeScript.

## TileMill

Our fellow Knight Foundation News Challenge winners, MapBox, created an open-source map design studio with Backbone.js: TileMill. TileMill lets you manage map layers based on shapefiles and rasters, and edit their appearance directly in the browser with the Carto styling language. Note that the gorgeous MapBox homepage is also a Backbone.js app.

## Blossom

Blossom is a lightweight project management tool for lean teams. Backbone.js is heavily used in combination with CoffeeScript to provide a smooth interaction experience. The RESTful backend is built with Flask on Google App Engine.

## Decide

Decide.com helps people decide when to buy consumer electronics. It relies heavily on Backbone.js to render and update its Search Results Page. An "infinite scroll" feature takes advantage of a SearchResults model containing a collection of Product models to fetch more results and render them on the fly with Mustache. A SearchController keeps everything in sync and maintains page state in the URL. Backbone also powers the user accounts and settings management.

## Trello

Trello is a collaboration tool that organizes your projects into boards. A Trello board holds many lists of cards, which can contain checklists, files and conversations, and may be voted on and organized with labels. Updates on the board happen in real time. The site was built ground up using Backbone.js for all the models, views, and routes.

## Tzigla

Cristi Balan and Irina Dumitrascu created Tzigla, a collaborative drawing application where artists make tiles that connect to each other to create surreal drawings. Backbone models help organize the code, routers provide bookmarkable deep links, and the views are rendered with haml.js and Zepto. Tzigla is written in Ruby (Rails) on the backend, and CoffeeScript on the frontend, with Jammit prepackaging the static assets.
