+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Examples [原文](http://backbonejs.org/#examples)

以下の事例紹介はその分量に関わらず包括的なものではありません。もし、Backboneを使ったアプリに関わった場合は[wikiのBackbone apps](https://github.com/documentcloud/backbone/wiki/Projects-and-Companies-using-Backbone)のページに追加してください。

Backboneの例としてリポジトリにバンドルされている[Todo List アプリケーション](examples/todos/index.html)は[Jérôme Gravel-Niquet](http://jgn.me/)が作成したものです。もしBackboneをどこから始めたらいいか迷っている場合は、ひととおり[注釈付きのソース](docs/todos.html)を読む時間をとってみましょう。このアプリケーションではサーバにブラウザ内のすべてのtodoに送らずに、[LocalStorageのアダプター](docs/backbone-localstorage.html)を利用して透過的に保存します。Jérômeは[localtodos.com](http://localtodos.com/)にjQueryの代わりに[MooToolsを利用したバージョン](http://github.com/jeromegn/backbone-mootools)も作成しています。

## documentcloud

[DocumentCloud workspace](http://www.documentcloud.org/public/#search/)はBackboneのモデルとコレクションとしてDocuments、Projects、Notes、そしてAccountsを利用して、Backbone.jsで作られています。もし、成り立ちに興味があるならば、Underscore.js と Backbone.jsは元々はDocumentCloudで使われていたコードを独立したJavaScriptのライブラリとして抽出したものであることを記しておきます。

## USA Today

[USA Today](http://usatoday.com)はBackboneのデータ/モデルのライフサイクルのモジュール性を上手に利用しています。コードを扱いやすく、そして無駄のない形で維持するために、アプリケーションのオブジェクトをシンプルに作り、継承し、分離し、結びつけます。新しいウェブサイトではpushStateに対応したブラウザとレガシーなブラウザへのページ出力制御のためにBackbone Routerが多用されています。最後に、担当チームはBackbone's Eventの利点を用いて、サードパーティー作成のものや解析のパッケージをアプリケーションの心臓部にフックできるようにPubSub APIを作成しました。

## Rdio

[New Rdio](http://rdio.com/new)はBackbone.jsをベースとしてコンポーネントベースフレームワークを使って一から作成されました。すべての画面上の構成要素は[Rdio API](http://developer.rdio.com/)で提供されたデータによってダイナミックにロードされ、レンダリングされます。変更がプッシュされるとすべての構成素は、ページのリロードやユーザーの音楽を中断することなく変更が反映できます。このすべてがBackboneのviewとmodelsに依存しており、また、すべてのURLのルーティングはBackboneのRouterで処理されます。リアルタイムにデーター変更の信号が送られた時、BackboneのEventsはデーター変更に関連した構成要素に通知します。Backboneは新しくてダイナミックでリアルタイムなRdioのWebおよびデスクトップアプリケーションの中核を構成しています。

## LinkedIn Mobile

[LinkedIn](http://www.linkedin.com/)は[次世代の HTML5 モバイルWebアプリ](http://www.linkedin.com/static?key=mobile)にBackbone.jsを利用しました。Backboneによってアプリのモジュール性、編成、拡張性を容易に維持することが出来たため、LinkedInのユーザー体験の複雑さをプログラムすることを可能としました。このアプリは[Zepto](http://zeptojs.com/)、[Underscore.js](https://gist.github.com/4285928)、[SASS](http://sass-lang.com/)、[iScroll](http://cubiq.org/iscroll)、HTML5 LocalStorageとcanvasも利用しています。技術チームはモバイルでのパフォーマンス改善について[LocalStorageを利用した体験談](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps)をブログで紹介しています。

## Hulu

[Hulu](http://hulu.com/)は次世代のオンラインビデオ体験の構築にBackbone.jsを利用しました。Backboneを基盤としてウェブインターフェイスは刷新され、すべてのページのコンテンツはユーザの操作に合わせてスムーズに動的に読み込みを行うようになった。Backboneはスクリプトや埋め込まれたビデオをリロードすることなくアプリの中を移動することを容易にしつつ、追加のデータ操作を行えるよう、モデルとコレクションも提供しています。

## Flow

[MetaLab](http://www.metalabdesign.com/)はチーム向けタスク管理アプリの[Flow](http://www.getflow.com/)を作成するためにBackbone.jsを利用しました。ワークスペースはタスクビュー、アクティビティ、アカウント、フォルダ、プロジェクトそしてタグの機能を構築するためにBackbone.jsに依存しています。window.Flow内部で詳細な部分を見ることができます。

## Gilt Groupe

[Gilt Groupe](http://gilt.com/)はBackbone.jsを利用し、関連サイトを含む複数のアプリケーションの構築を行いました。[Giltの モバイルサイト](http://m.gilt.com/)では、Backboneと[Zepto.js](http://zeptojs.com/)を用いて、出先のユーザーに対して、超高速なショッピング体験を提供していて、[Gilt Live](http://live.gilt.com/)では顧客がリアルタイムに購入している商品をBackboneとWebSocketsを結合して表示しています。Giltの検索機能もBackboneを用いて、フィルターや商品の並び替えをクライアントサイドで行うことで効率的に行えるようにしています。

## NewsBlur

[NewsBlur](http://www.newsblur.com/)デスクトップアプリのように高速でレスポンシブルなUIのRSSリーダーとソーシャルニュースネットワークです。Backbone.jsは[大幅な書き換えとスパゲッティコードからの移行](http://www.ofbrooklyn.com/2012/11/13/backbonification-migrating-javascript-to-backbone/)のために、パワフルでシンプルな機能群、容易な統合性そして大規模なコミュニティを理由として選ばれました。もしあなたがこのあたりの中身をつついてみたい場合、NewsBlurも完全に[オープンソース](http://github.com/samuelclay/NewsBlur)になっています。

## WordPress.com

[WordPress.com](http://wordpress.com/)は[WordPress](http://wordpress.org/)のWebサービスとしてのバージョンです。Backbone.jsのModels、Collections、Viewsをその[通知システム](http://en.blog.wordpress.com/2012/05/25/notifications-refreshed/)で利用しています。Backbone.jsはアプリケーションの構造に容易にフィットする唯一の選択肢として採用されました。[Automattic社](http://automattic.com/)の統計情報タブとホームページ全体の機能をBackbone.jsに統合しています。

## Foursquare

Foursquareは友達と会ったり、新しいスポットを見つけたり、お金を節約できる楽しくて小さなスタートアップ企業です。Backbone Modelsは[トップページのマップ](https://foursquare.com/)や[リスト](https://foursquare.com/seriouseats/list/the-best-doughnuts-in-ny)のような非常に利用頻度の高い機能を供給するコアとなるJavaScirpt APIレイヤーとViewsで多く用いられています。

## Bitbucket

[Bitbucket](http://www.bitbucket.org/)はGitやMercurialの無料のソースコードホスティングサービスです。モデルとコレクションを通してBackbone.jsが、Bitbucketの[REST API](https://api.bitbucket.org/)はもちろん、新しいコンポーネントであるインラインでのコメントのコーディングやPull Requestの許可などにおいて有用であることを証明しています。
Mustacheテンプレートを用いてサーバーとクライアントサイドのレンダリングを行いつつ、カスタマイズした[Google クロージャー](https://developers.google.com/closure/library/)を用いたウィジェットでBitbucketでは現存するDOMツリーを装飾したり、新しいDOMツリーを挿入するライフサイクルを実現しています。

## Disqus

[Disqus](http://www.disqus.com/)はコメント用のウィジェットの最新版のエンジンにBackbone.jsを選択しました。Backboneの容量の小ささと容易な拡張性が、iframeの中にすべてを提供し、そしてIGNやWired、CNN、MLBなどの幾千ものウェブの資産を供給する存在であるDisqusのウェブアプリを配布へするための正しい選択となりました。

## Khan Academy

[Khan Academy](http://www.khanacademy.org/)はあらゆる人々に世界レベルの教育を提供しようというひとつの試みです。数千のビデオ、数百のJavaScriptで動く演習問題、そして未来に向けた壮大な計画のために、Khan AcademyはBackboneを利用してフロントエンドのコードのモジュール化と最適化を実現しています。ユーザーのプロフィールと目標の設定はBackboneと[jQuery](http://jquery.com/)そして[Handlebars](http://handlebarsjs.com/)で提供され、さらに新しい機能のほとんどは、[the API](https://github.com/Khan/khan-api/)の質の大きな向上として、クライアントサイドに反映され続けています。

## Do

[Do](http://do.com/)はタスクの消化やプロジェクトの管理を簡単にする、ソーシャルなプロダクティビティアプリです。[Do.com](http://do.com/)のウェブアプリはスマートフォン、タブレット、PCでシームレスに動作するようにゼロから構築されました。製作チームはBackboneと[CoffeeScript](http://coffeescript.org/)や[Handlebars](http://handlebarsjs.com/)を記録的な短時間で構築し、複雑なナビゲーションとモデルの同期を行うための独自拡張を実現するために利用しました。

## IRCCloud

[IRCCloud](http://irccloud.com/)はブラウザ内で利用できる常時接続に対応したIRCクライアントです − しばしば一日中開きっぱなしにされることもあります。洗練されたWebインターフェースはWebSocketsと[IRCCloud API](https://github.com/irccloud/irccloud-tools/wiki/API-Overview)を介してErlangのバックエンドと交信します。それはIRCの会話の流れがリアルタイムで維持されるようにBackbone.jsのEvents、Models、ViewsそしてRoutingが多用されています。

## Pitchfork

[Pitchfork](http://pitchfork.com/)は、サイト全体のオーディオプレーヤー、[Pitchfork.tv](http://pitchfork.com/tv/)、位置情報のルーティング、ロケーションルーティング、ライトスルーページをキャッシュに分解するなど多くの用途でBackbone.jsを利用しています。Backbone.js（と[Underscore.js](http://underscorejs.org/)）は、クリーンでモジュール化されたコンポーネントの制作と迅速な移行、そしてスパゲッティコードではなくサイトの運営に注力することに寄与しています。

## Spin

[Spin](http://spin.com/)はBackboneのModelsとCollections、それとカスタマイズしたsyncメソッドを利用し、サイト内部のAPIから[新着ニュース](http://www.spin.com/news)を取得しています。他の「ページ」にクリックして遷移したとしても音楽の再生を停止することがないように、Spinはサイト内ナビゲーションでBackboneのRouterを利用しています。

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
