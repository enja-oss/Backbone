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
