+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Router

Web applications often provide linkable, bookmarkable, shareable URLs for important locations in the app. Until recently, hash fragments (#page) were used to provide these permalinks, but with the arrival of the History API, it's now possible to use standard URLs (/page). Backbone.Router provides methods for routing client-side pages, and connecting them to actions and events. For browsers which don't yet support the History API, the Router handles graceful fallback and transparent translation to the fragment version of the URL.

多くの場合、Webアプリケーションはリンク可能、ブックマーク可能、シェア可能なURLをアプリ内での重要な所在地のために提供します。最近まで、これらの固定リンクを提供するためにハッシュフラグメント（`#page`）が使われていましたが、History APIの出現とともに、標準的なURL（`/page`）を使うことが可能になりました。**Backbone.Router**はクライアントサイドページのルーティングのためのメソッド、それらを接続するアクションとイベントを提供します。History APIをサポートしていないブラウザでは、Routerは優雅なフォールバックとURLのフラグメントバージョンへの透過的な変換処理をおこないます。

During page load, after your application has finished creating all of its routers, be sure to call Backbone.history.start(), or Backbone.history.start({pushState: true}) to route the initial URL.

ページのロード中に、アプリケーションがすべてのルーターの作成を完了した後、必ずルートの初期URLで`Backbone.history.start()`か`Backbone.history.start({pushState: true})`を呼び出してください。

### extend Backbone.Router.extend(properties, [classProperties]) 

Get started by creating a custom router class. Define actions that are triggered when certain URL fragments are matched, and provide a routes hash that pairs routes to actions. Note that you'll want to avoid using a leading slash in your route definitions:

カスタムルータークラスを作ることから始めます。特定のURLフラグメントにマッチした場合にトリガーされるアクションを定義し、ルートとアクションのペアの[routes](#Router-routes)ハッシュを提供してください。ルート定義の中で先頭のスラッシュの使用を避けるべきということに注意してください:

    var Workspace = Backbone.Router.extend({

      routes: {
        "help":                 "help",    // #help
        "search/:query":        "search",  // #search/kiwis
        "search/:query/p:page": "search"   // #search/kiwis/p7
      },

      help: function() {
        ...
      },

      search: function(query, page) {
        ...
      }

    });

### routes router.routes 

The routes hash maps URLs with parameters to functions on your router, similar to the View's events hash. Routes can contain parameter parts, :param, which match a single URL component between slashes; and splat parts *splat, which can match any number of URL components.

routesハッシュは[View](http://documentcloud.github.com/backbone/#View)の[eventsハッシュ](http://documentcloud.github.com/backbone/#View-delegateEvents)と似ており、ルーター上でURLとパラメーターを関数にマッピングします。ルートは、`:param`のようなスラッシュの間の単一のURL構成要素と一致するパラメーター部分や、`*splat`のような複数のURL構成要素に一致するsplat部分を含むことができます。

For example, a route of "search/:query/p:page" will match a fragment of #search/obama/p2, passing "obama" and "2" to the action. A route of "file/*path" will match #file/nested/folder/file.txt, passing "nested/folder/file.txt" to the action.

例えば、`"search/:query/p:page"`のルートは`#search/obama/p2`のフラグメントにマッチし，`"obama"`と`"2"`をアクションに渡します。`"file/*path"`のルートは`#file/nested/folder/file.txt`にマッチし、`"nested/folder/file.txt"`をアクションに渡します。

When the visitor presses the back button, or enters a URL, and a particular route is matched, the name of the action will be fired as an event, so that other objects can listen to the router, and be notified. In the following example, visiting #help/uploading will fire a route:help event from the router.

訪問者が戻るボタンを押すか、URLを入力して特定のルートがマッチした場合、アクションの名前の[イベント](http://documentcloud.github.com/backbone/#Events)が発火するので、その他のオブジェクトはrouterにlistenして通知を受けることができます。次の例では、`#help/uploading`を訪れたときに`route:help`イベントがrouterから発火します。

    routes: {
      "help/:page":         "help",
      "download/*path":     "download",
      "folder/:name":       "openFolder",
      "folder/:name-:mode": "openFolder"
    }
    router.on("route:help", function(page) {
      ...
    });

### constructor / initializenew Router([options]) 

When creating a new router, you may pass its routes hash directly as an option, if you choose. All options will also be passed to your initialize function, if defined

新しいrouterをつくったときに、`routes`ハッシュを渡したいのであれば、オプションとしてそのまま渡すことができます。`initialize`関数が定義されていれば、全ての`options`が渡されます。

### route router.route(route, name, [callback]) 

Manually create a route for the router, The route argument may be a routing string or regular expression. Each matching capture from the route or regular expression will be passed as an argument to the callback. The name argument will be triggered as a "route:name" event whenever the route is matched. If the callback argument is omitted router[name] will be used instead.

手動でルーターのためのルートを作成し、`route`引数には[ルーティング文字列](http://documentcloud.github.com/backbone/#Router-routes)か正規表現を指定することができます。ルート文字列か正規表現からマッチしたそれぞれのキャプチャはコールバックの引数として渡されます。`name`引数はルートがマッチしたときに`route:name`イベントとしてトリガーされます。もし`callback`引数が省略された場合、`router[name]`が代わりに使用されます。

    initialize: function(options) {

      // Matches #page/10, passing "10"
      this.route("page/:number", "page", function(number){ ... });

      // Matches /117-a/b/c/open, passing "117-a/b/c" to this.open
      this.route(/^(.*?)\/open$/, "open");

    },

    open: function(id) { ... }

    initialize: function(options) {

      // #page/10にマッチしたら"10"が渡される
      this.route("page/:number", "page", function(number){ ... });

      // /117-a/b/c/openにマッチしたら"117-a/b/c"がthis.openに渡される
      this.route(/^(.*?)\/open$/, "open");

    },

    open: function(id) { ... }

### navigaterouter.navigate(fragment, [options]) 

Whenever you reach a point in your application that you'd like to save as a URL, call navigate in order to update the URL. If you wish to also call the route function, set the trigger option to true. To update the URL without creating an entry in the browser's history, set the replace option to true.

URLを保存したいアプリケーション内の地点に到達したら、URLを更新するために**navigate**を呼び出します。route関数の呼びだしも行いたい場合は**trigger**オプションに`ture`を設定します。ブラウザの履歴にエントリを作成せずにURLを更新するためには**replace**オプションに`true`を設定します。

    openPage: function(pageNumber) {
      this.document.pages.at(pageNumber).open();
      this.navigate("page/" + pageNumber);
    }

    # Or ...

    app.navigate("help/troubleshooting", {trigger: true});

    # Or ...

    app.navigate("help/troubleshooting", {trigger: true, replace: true});

