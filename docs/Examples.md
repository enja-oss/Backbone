+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Examples [原文](http://backbonejs.org/#examples)

The list of examples that follows, while long, is not exhaustive. If you've worked on an app that uses Backbone, please add it to the wiki page of Backbone apps.

以下の事例紹介はその分量に関わらず包括的なものではありません。もし、Backboneを使ったアプリに関わった場合は[wikiのBackbone apps](https://github.com/documentcloud/backbone/wiki/Projects-and-Companies-using-Backbone)のページに追加してください。

Jérôme Gravel-Niquet has contributed a Todo List application that is bundled in the repository as Backbone example. If you're wondering where to get started with Backbone in general, take a moment to read through the annotated source.The app uses a LocalStorage adapter to transparently save all of your todos within your browser, instead of sending them to a server. Jérôme also has a version hosted at [localtodos.com](http://localtodos.com/) that uses a [MooTools-backed version of Backbone](http://github.com/jeromegn/backbone-mootools) instead of jQuery.

Backboneの例としてリポジトリにバンドルされている[Todo List アプリケーション](examples/todos/index.html)は[Jérôme Gravel-Niquet](http://jgn.me/)が作成したものです。もしBackboneをどこから始めたらいいか迷っている場合は、ひととおり[注釈付きのソース](docs/todos.html)を読む時間をとってみましょう。このアプリケーションではサーバにブラウザ内のすべてのtodoに送らずに、[LocalStorageのアダプター](docs/backbone-localstorage.html)を利用して透過的に保存します。Jérômeは[localtodos.com](http://localtodos.com/)にjQueryの代わりに[MooToolsを利用したバージョン](http://github.com/jeromegn/backbone-mootools)も作成しています。

## documentcloud

The [DocumentCloud workspace](http://www.documentcloud.org/public/#search/) is built on Backbone.js, with Documents, Projects, Notes, and Accounts all as Backbone models and collections. If you're interested in history — both Underscore.js and Backbone.js were originally extracted from the DocumentCloud codebase, and packaged into standalone JS libraries.

[DocumentCloud workspace](http://www.documentcloud.org/public/#search/)はBackboneのモデルとコレクションとしてDocuments、Projects、Notes、そしてAccountsを利用して、Backbone.jsで作られています。もし、成り立ちに興味があるならば、Underscore.js と Backbone.jsは元々はDocumentCloudで使われていたコードを独立したJavaScriptのライブラリとして抽出したものであることを記しておきます。

## USA Today

[USA Today](http://usatoday.com) takes advantage of the modularity of Backbone's data/model lifecycle — which makes it simple to create, inherit, isolate, and link application objects — to keep the codebase both manageable and efficient. The new website also makes heavy use of the Backbone Router to control the page for both pushState-capable and legacy browsers. Finally, the team took advantage of Backbone's Event module to create a PubSub API that allows third parties and analytics packages to hook into the heart of the app.

[USA Today](http://usatoday.com)はBackboneのデータ/モデルのライフサイクルのモジュール性を上手に利用しています。コードを扱いやすく、そして無駄のない形で維持するために、アプリケーションのオブジェクトをシンプルに作り、継承し、分離し、結びつけます。新しいウェブサイトではpushStateに対応したブラウザとレガシーなブラウザへのページ出力制御のためにBackbone Routerが多用されています。最後に、担当チームはBackbone's Eventの利点を用いて、サードパーティー作成のものや解析のパッケージをアプリケーションの心臓部にフックできるようにPubSub APIを作成しました。

## Rdio

[New Rdio](http://rdio.com/new) was developed from the ground up with a component based framework based on Backbone.js. Every component on the screen is dynamically loaded and rendered, with data provided by the [Rdio API](http://developer.rdio.com/). When changes are pushed, every component can update itself without reloading the page or interrupting the user's music. All of this relies on Backbone's views and models, and all URL routing is handled by Backbone's Router. When data changes are signaled in realtime, Backbone's Events notify the interested components in the data changes. Backbone forms the core of the new, dynamic, realtime Rdio web and desktop applications.

[New Rdio](http://rdio.com/new)はBackbone.jsをベースとしてコンポーネントベースフレームワークを使って一から作成されました。すべての画面上の構成要素は[Rdio API](http://developer.rdio.com/)で提供されたデータによってダイナミックにロードされ、レンダリングされます。変更がプッシュされるとすべての構成素は、ページのリロードやユーザーの音楽を中断することなく変更が反映できます。このすべてがBackboneのviewとmodelsに依存しており、また、すべてのURLのルーティングはBackboneのRouterで処理されます。リアルタイムにデーター変更の信号が送られた時、BackboneのEventsはデーター変更に関連した構成要素に通知します。Backboneは新しくてダイナミックでリアルタイムなRdioのWebおよびデスクトップアプリケーションの中核を構成しています。

## LinkedIn Mobile

[LinkedIn](http://www.linkedin.com/) used Backbone.js to create its [next-generation HTML5 mobile web app](http://www.linkedin.com/static?key=mobile). Backbone made it easy to keep the app modular, organized and extensible so that it was possible to program the complexities of LinkedIn's user experience. The app also uses [Zepto](http://zeptojs.com/), [Underscore.js](https://gist.github.com/4285928), [SASS](http://sass-lang.com/), [iScroll](http://cubiq.org/iscroll), HTML5 LocalStorage and Canvas. The tech team blogged about [their experiences using LocalStorage](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps) to improve mobile performance.

[LinkedIn](http://www.linkedin.com/)は[次世代の HTML5 モバイルWebアプリ](http://www.linkedin.com/static?key=mobile)にBackbone.jsを利用しました。Backboneは、LinkedInのユーザー体験の複雑さをプログラムできるように、アプリのモジュール性、編成、拡張性を容易に維持できました。このアプリは[Zepto](http://zeptojs.com/)、[Underscore.js](https://gist.github.com/4285928)、[SASS](http://sass-lang.com/)、[iScroll](http://cubiq.org/iscroll)、HTML5 LocalStorageとcanvasも利用しています。技術チームはモバイルでのパフォーマンス改善について[LocalStorageを利用した体験談](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps)をブログに残している。

## Hulu

[Hulu](http://hulu.com/) used Backbone.js to build its next generation online video experience. With Backbone as a foundation, the web interface was rewritten from scratch so that all page content can be loaded dynamically with smooth transitions as you navigate. Backbone makes it easy to move through the app quickly without the reloading of scripts and embedded videos, while also offering models and collections for additional data manipulation support.

[Hulu](http://hulu.com/)は次世代のオンラインビデオ体験の構築にBackbone.jsを利用しました。Backboneを基盤として、すべてのページのコンテンツがあなたの操作によってスムーズに遷移する直接的なロードができるように、webインターフェースが一から書きなおされている。Backboneはスクリプトや埋め込まれたビデオをリロードすることなくアプリの中をあちこちと移動することを容易にしています。

## Flow

[MetaLab](http://www.metalabdesign.com/) used Backbone.js to create [Flow](http://www.getflow.com/), a task management app for teams. The workspace relies on Backbone.js to construct task views, activities, accounts, folders, projects, and tags. You can see the internals under window.Flow.

[MetaLab](http://www.metalabdesign.com/)はチーム向けタスク管理アプリの[Flow](http://www.getflow.com/)を作成するためにBackbone.jsを利用しました。ワークスペースはタスクビュー、アクティビティ、アカウント、フォルダ、プロジェクトそしてタグの機能を構築するためにBackbone.jsに依存しています。window.flow内部で詳細な部分を見ることができます。

## Gilt Groupe

[Gilt Groupe](http://gilt.com/) uses Backbone.js to build multiple applications across their family of sites. [Gilt's mobile website](http://m.gilt.com/) uses Backbone and [Zepto.js](http://zeptojs.com/) to create a blazing-fast shopping experience for users on-the-go, while [Gilt Live](http://live.gilt.com/) combines Backbone with WebSockets to display the items that customers are buying in real-time. Gilt's search functionality also uses Backbone to filter and sort products efficiently by moving those actions to the client-side.

[Gilt Groupe](http://gilt.com/) はサイトのファミリーにわたる複数のアプリケーションの構築にBackbone.jsを利用しました。[Giltの モバイルサイト](http://m.gilt.com/)では、Backboneと[Zepto.js](http://zeptojs.com/)を用いて、顧客がリアルタイムに購入している商品をBackboneとWebSocketsを結合して表示しながら、ユーザーへの超高速なショッピング体験を提供しています。Giltの検索機能もBackboneを用いて、フィルターや商品の並び替えをクライアントサイドに対して効率的に動作しています。

## NewsBlur

[NewsBlur](http://www.newsblur.com/) is an RSS feed reader and social news network with a fast and responsive UI that feels like a native desktop app. Backbone.js was selected for [a major rewrite and transition from spaghetti code](http://www.ofbrooklyn.com/2012/11/13/backbonification-migrating-javascript-to-backbone/) because of its powerful yet simple feature set, easy integration, and large community. If you want to poke around under the hood, NewsBlur is also entirely [open-source](http://github.com/samuelclay/NewsBlur).

[NewsBlur](http://www.newsblur.com/)デスクトップアプリのように高速でレスポンシブルなUIのRSSリーダーとソーシャルニュース	ネットワークです。Backbone.jsは[大幅な書き換えとスパゲッティコードからの以降](http://www.ofbrooklyn.com/2012/11/13/backbonification-migrating-javascript-to-backbone/)のために、パワフルでシンプルな機能群、容易な統合性そして大規模なコミュニティを理由として選ばれました。もしあなたがこのあたりの中身をつついてみたい場合、NewsBlurも完全に[オープンソース](http://github.com/samuelclay/NewsBlur)になっています。

## WordPress.com

[WordPress.com](http://wordpress.com/) is the software-as-a-service version of [WordPress](http://wordpress.org/). It uses Backbone.js Models, Collections, and Views in its [Notifications system](http://en.blog.wordpress.com/2012/05/25/notifications-refreshed/). Backbone.js was selected because it was easy to fit into the structure of the application, not the other way around. [Automattic](http://automattic.com/) (the company behind WordPress.com) is integrating Backbone.js into the Stats tab and other features throughout the homepage.

[WordPress.com](http://wordpress.com/)は[WordPress](http://wordpress.org/)のWebサービスとしてのバージョンです。Backbone.jsのModels、Collections、 、Viewsをその[通知システム](http://en.blog.wordpress.com/2012/05/25/notifications-refreshed/)で利用しています。Backbone.jsはアプリケーションの構造に容易にフィットする唯一の選択肢として採用されました。[Automattic社](http://automattic.com/)の統計情報タブとホームページ全体の機能をBackbone.jsに統合しています。

## Foursquare

Foursquare is a fun little startup that helps you meet up with friends, discover new places, and save money. Backbone Models are heavily used in the core JavaScript API layer and Views power many popular features like the [homepage map](https://foursquare.com/) and [lists](https://foursquare.com/seriouseats/list/the-best-doughnuts-in-ny).

Foursquareは友達と会ったり、新しいスポットを見つけたり、お金を節約できる楽しくて小さなスタートアップ企業です。Backbone Modelsは[トップページのマップ](https://foursquare.com/)や[リスト](https://foursquare.com/seriouseats/list/the-best-doughnuts-in-ny)のような非常に利用頻度の高い機能のエンジンとなるレイヤーやViewsのJavaScriptAPIにおいて重く用いられています。

## Bitbucket

[Bitbucket](http://www.bitbucket.org/) is a free source code hosting service for Git and Mercurial. Through its models and collections, Backbone.js has proved valuable in supporting Bitbucket's [REST API](https://api.bitbucket.org/), as well as newer components such as in-line code comments and approvals for pull requests. Mustache templates provide server and client-side rendering, while a custom [Google Closure](https://developers.google.com/closure/library/) inspired life-cycle for widgets allows Bitbucket to decorate existing DOM trees and insert new ones.

[Bitbucket](http://www.bitbucket.org/)はGitやMercurialで利用できる無料のソースコードホスティングサービスです。モデルとコレクションを通してBackbone.jsが、Bitbucketの[REST API](https://api.bitbucket.org/)はもちろん、インラインでのコメントのコーディングやPull Requestの許可などのコンポーネントのサポートにおいて有用であることを証明しています。カスタマイズした[Google クロージャー](https://developers.google.com/closure/library/)がDOMツリーを編集したり挿入できるウィジェットのライフサイクルを引き起こす間に、Mustacheテンプレートがサーバーとクライアントサイドのレンダリングを提供します。

## Disqus

[Disqus](http://www.disqus.com/) chose Backbone.js to power the latest version of their commenting widget. Backbone’s small footprint and easy extensibility made it the right choice for Disqus’ distributed web application, which is hosted entirely inside an iframe and served on thousands of large web properties, including IGN, Wired, CNN, MLB, and more.

[Disqus](http://www.disqus.com/)はコメント用のウィジェットの最新版のエンジンにBackbone.jsを選択しました。Backboneの容量の小ささと容易な拡張性が、iframeの中にすべてを提供し、そしてIGNやWired、CNN、MLBなどの幾千ものウェブの資産を供給する存在であるDisqusのウェブアプリを配布へするための正しい選択となりました。

## Khan Academy

[Khan Academy](http://www.khanacademy.org/) is on a mission to provide a free world-class education to anyone anywhere. With thousands of videos, hundreds of JavaScript-driven exercises, and big plans for the future, Khan Academy uses Backbone to keep frontend code modular and organized. User profiles and goal setting are implemented with Backbone, [jQuery](http://jquery.com/) and [Handlebars](http://handlebarsjs.com/), and most new feature work is being pushed to the client side, greatly increasing the quality of [the API](https://github.com/Khan/khan-api/).

[Khan Academy](http://www.khanacademy.org/)はあらゆる人々に世界レベルの教育を提供しようというひとつの試みです。数千のビデオ、数百のJavaScriptで動く演習問題、そして未来に向けた壮大な計画をもって、Khan AcademyはBackboneをフロントエンドのコードのモジュール化と最適化のために利用しています。ユーザーのプロフィールと目標の設定はBackboneと[jQuery](http://jquery.com/)そして[Handlebars](http://handlebarsjs.com/)で提供され、さらに新しい機能のほとんどは、[the API](https://github.com/Khan/khan-api/)の質の大きな向上として、クライアントサイドに反映され続けています。

## Do

[Do](http://do.com/) is a social productivity app that makes it easy to work on tasks, track projects, and take notes with your team. The [Do.com](http://do.com/) web application was built from the ground up to work seamlessly on your smartphone, tablet and computer. The team used Backbone, [CoffeeScript](http://coffeescript.org/) and [Handlebars](http://handlebarsjs.com/) to build a full-featured app in record time and rolled their own extensions for complex navigation and model sync support.

[Do](http://do.com/)はタスクの消化やプロジェクトの追跡を簡単にする、ソーシャルなプロダクト作成アプリです。[Do.com](http://do.com/)のウェブアプリはスマートフォン、タブレット、PCでシームレスに動作するようにゼロから構築されました。製作チームはBackboneと[CoffeeScript](http://coffeescript.org/)や[Handlebars](http://handlebarsjs.com/)を記録的な短時間で構築し、複雑なナビゲーションとモデルの同期を行うための独自拡張を再現するために利用しました。

## IRCCloud

[IRCCloud](http://irccloud.com/) is an always-connected IRC client that you use in your browser — often leaving it open all day in a tab. The sleek web interface communicates with an Erlang backend via websockets and the [IRCCloud API](https://github.com/irccloud/irccloud-tools/wiki/API-Overview). It makes heavy use of Backbone.js events, models, views and routing to keep your IRC conversations flowing in real time.

[IRCCloud](http://irccloud.com/)はブラウザ内で利用できる常時接続に対応したIRCクライアントです − しばしば一日中開きっぱなしにされることもあります。洗練されたWebインターフェースはWebSocketsと[IRCCloud API](https://github.com/irccloud/irccloud-tools/wiki/API-Overview)を介してErlangのバックエンドと交信します。それはIRCの会話の流れをリアルタイムで維持されるようにBackbone.jsのEvents、Models、ViewsそしてRoutingが多用されています。

## Pitchfork

[Pitchfork](http://pitchfork.com/) uses Backbone.js to power its site-wide audio player, [Pitchfork.tv](http://pitchfork.com/tv/), location routing, a write-thru page fragment cache, and more. Backbone.js (and [Underscore.js](http://underscorejs.org/)) helps the team create clean and modular components, move very quickly, and focus on the site, not the spaghetti.

[Pitchfork](http://pitchfork.com/)は、サイト全体のオーディオプレーヤー、[Pitchfork.tv](http://pitchfork.com/tv/)、位置情報のルーティング、ロケーションルーティング、ライトスルーページをキャッシュに分解するなど多くの用途でBackbone.jsを利用しています。Backbone.js（と[Underscore.js](http://underscorejs.org/)）は、クリーンでモジュール化されたコンポーネントの制作と迅速な移行、そしてスパゲッティコードではなくサイトの運営に注力することに寄与しています。

## Spin

[Spin](http://spin.com/) pulls in the [latest news stories](http://www.spin.com/news) from their internal API onto their site using Backbone models and collections, and a custom sync method. Because the music should never stop playing, even as you click through to different "pages", Spin uses a Backbone router for navigation within the site.

[Spin](http://spin.com/)はBackboneのModelsとCollections、それとカスタマイズした同期機能を利用したサイト付属の内部APIから[新着ニュース](http://www.spin.com/news)を取得しています。他の「ページ」にクリックして遷移したとしても音楽の再生を停止することがないように、Spinはサイト内ナビゲーションでBackboneのRouterを利用しています。

## Walmart Mobile

[Walmart](http://www.walmart.com/) used Backbone.js to create the new version of [their mobile web application](http://www.walmart.com/) and created two new frameworks in the process. [Thorax](http://walmartlabs.github.com/thorax/) provides mixins, inheritable events, as well as model and collection view bindings that integrate directly with [Handlebars](http://handlebarsjs.com/) templates. [Lumbar](http://walmartlabs.github.com/lumbar/) allows the application to be split into modules which can be loaded on demand, and creates platform specific builds for the portions of the web application that are embedded in Walmart's native Android and iOS applications.

[Walmart](http://www.walmart.com/)はBackbone.jsを新しいバージョンの[モバイルWebアプリ](http://www.walmart.com/)の構築に利用し、またその過程で新しいフレームワークをふたつ作成しました。[Thorax](http://walmartlabs.github.com/thorax/)はミックスインとイベントの継承だけでなく、モデルとコレクションビューが[Handlebars](http://handlebarsjs.com/)テンプレートでの直接結合の結びつけも提供しています。[Lumbar](http://walmartlabs.github.com/lumbar/)はアプリをオンデマンドにロードできるモジュールに分割することを可能にし、そしてWalmartのAndroidおよびiOSのネイティブアプリに埋め込まれている、Webアプリの一部分のためのプラットフォーム特定のビルドを作成します。

## Groupon Now!

[Groupon Now!](http://www.groupon.com/now) helps you find local deals that you can buy and use right now. When first developing the product, the team decided it would be AJAX heavy with smooth transitions between sections instead of full refreshes, but still needed to be fully linkable and shareable. Despite never having used Backbone before, the learning curve was incredibly quick — a prototype was hacked out in an afternoon, and the team was able to ship the product in two weeks. Because the source is minimal and understandable, it was easy to add several Backbone extensions for Groupon Now!: changing the router to handle URLs with querystring parameters, and adding a simple in-memory store for caching repeated requests for the same data.

[Groupon Now!](http://www.groupon.com/now)はあなたが購入していますぐ使える地域のお得な情報を探すのに役立ちます。初期の開発時には、ページ全体のリフレッシュの代わりにAJAXを多用したスムーズなセクション間の遷移を決定していましが、すべてのセクションでリンクと共有が可能であることも求められていました。これまでBackboneを利用したことがないにも関わらず、学習曲線は驚くほど早く - 午後にはプロトタイプを作り上げ、2週間で製品をリリースすることができました。ソースは小さく理解しやすいので、Groupon Now!向けの拡張（クエリー付きのURLを処理するためにRouterの変更と同一のデーターのリクエストの繰り返しをキャッシュするためのシンプルなメモリストアの追加）を作成するのは簡単でした。

## Basecamp

[37Signals](http://37signals.com/) chose Backbone.js to create the [calendar feature](http://basecamp.com/calendar) of its popular project management software [Basecamp](http://basecamp.com/). The Basecamp Calendar uses Backbone.js models and views in conjunction with the [Eco](https://github.com/sstephenson/eco) templating system to present a polished, highly interactive group scheduling interface.

[37Signals](http://37signals.com/)は[Basecamp](http://basecamp.com/)という著名なプロジェクト管理ソフトの[カレンダー機能](http://basecamp.com/calendar)を作成するときにBackbone.jsを選択しました。BasecampのカレンダーはBackbone.jsのModelsとViewsを、洗練され高度にインタラクティブなグループスケジュールのインターフェースを表示する[Eco](https://github.com/sstephenson/eco)テンプレートシステムと結合して利用している。

## Slavery Footprint

[Slavery Footprint](http://slaveryfootprint.org/survey) allows consumers to visualize how their consumption habits are connected to modern-day slavery and provides them with an opportunity to have a deeper conversation with the companies that manufacture the goods they purchased. Based in Oakland, California, the Slavery Footprint team works to engage individuals, groups, and businesses to build awareness for and create deployable action against forced labor, human trafficking, and modern-day slavery through online tools, as well as off-line community education and mobilization programs.

[Slavery Footprint](http://slaveryfootprint.org/survey)は消費者が、どれほど自身の消費傾向が現代の奴隷制に関係しているかを可視化し、購入した商品を生産している会社との突っ込んだ対話の機会を提供する。オークランドとカリフォルニアに拠点を置き、Slavery Footprintは個人、団体、企業が、強制労働や人身売買そして現代の奴隷制に対しての、オフラインので社会周知活動や動員プログラムと同様に、オンラインツールを通した反対運動が展開できることを周知する活動に携われるように務めている。

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
