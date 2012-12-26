+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.View

Backbone views are almost more convention than they are code — they don't determine anything about your HTML or CSS for you, and can be used with any JavaScript templating library. The general idea is to organize your interface into logical views, backed by models, each of which can be updated independently when the model changes, without having to redraw the page. Instead of digging into a JSON object, looking up an element in the DOM, and updating the HTML by hand, you can bind your view's render function to the model's "change" event — and now everywhere that model data is displayed in the UI, it is always immediately up to date.

BackboneのViewは、コードというよりはほとんど慣習に近い存在です ー ViewはHTMLやCSSについて何も決定付けることはなく、任意のJavaScriptテンプレーティングライブラリと合わせて使用できます。一般的なアイディアとしては、ページを全体を再描画せず、モデルが変更されたときにそれぞれが独立して更新できる、Modelに支えられたロジカルなViewとしてインターフェースを整理します。JSONオブジェクトを掘り、DOMの中にある要素を参照し、手動でHTMLを更新する代わりに、Viewの`render`関数をモデルの`"change"`イベントに結びつけることができます ー そうすると、UIの中のモデルデータを表示しているすべての箇所は、いつでも即座に最新になります。

### extend `Backbone.View.extend(properties, [classProperties])`

Get started with views by creating a custom view class. You'll want to override the render function, specify your declarative events, and perhaps the tagName, className, or id of the View's root element.

Viewはまずカスタムビュークラスを作ることから始めます。[render](http://backbonejs.org/#View-render)関数をオーバーライドし、宣言するイベントを指定し、`tagName`や`className`、Viewのルート要素の`id`もおそらく指定するとよいでしょう。

```javascript
var DocumentRow = Backbone.View.extend({

  tagName: "li",

  className: "document-row",

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  render: function() {
    ...
  }

});
```

### constructor / initialize `new View([options])`

When creating a new View, the options you pass are attached to the view as this.options, for future reference. There are several special options that, if passed, will be attached directly to the view: model, collection, el, id, className, tagName and attributes. If the view defines an initialize function, it will be called when the view is first created. If you'd like to create a view that references an element already in the DOM, pass in the element as an option: new View({el: existingElement})

新しいビューを作成するときに与えたオプションは、後から参照するため`this.options`としてViewにアタッチされます。いくつかの特殊なオプション `model`、`collection`、`el`、`id`、`className`、`tagName`、そして`attributes` があり、それらが渡された場合はViewのプロパティとして直接アタッチされます。 **initialize** 関数がViewに定義されている場合、それはViewが最初に作られたときに呼ばれます。DOMの中に _既に_ 存在する要素を参照して、Viewを作成したい場合は `new View({el: existingElement})` のようにオプションとして渡します。

```javascript
var doc = Documents.first();

new DocumentRow({
  model: doc,
  id: "document-row-" + doc.id
});
```

### el `view.el`

All views have a DOM element at all times (the el property), whether they've already been inserted into the page or not. In this fashion, views can be rendered at any time, and inserted into the DOM all at once, in order to get high-performance UI rendering with as few reflows and repaints as possible. this.el is created from the view's tagName, className, id and attributes properties, if specified. If not, el is an empty div.

すべてのViewは、それが既にページに挿入されているかそうでないかに関わらず、常に何らかのDOM要素を所持しています（ **el** プロパティ）。こうすることで、UIの描画を効率良く行うため、できるだけ少ないリフローとリペイントで、Viewはいつでもレンダリングでき、一度にすべてをDOMへ挿入するようになっています。Viewに`tagName`、`className`、`id`そして`attributes`プロパティが指定されていれば、それらから`this.el`が作られます。そうでない場合は、 **el** は空の`div`になります。

```javascript
var ItemView = Backbone.View.extend({
  tagName: 'li'
});

var BodyView = Backbone.View.extend({
  el: 'body'
});

var item = new ItemView();
var body = new BodyView();

alert(item.el + ' ' + body.el);
```

### $el `view.$el`

A cached jQuery (or Zepto) object for the view's element. A handy reference instead of re-wrapping the DOM element all the time.

Viewを示す要素のjQuery（またはZepto）オブジェクトがキャッシュされています。都度、DOM要素をオブジェクトでラップする代わりとして、便利に参照できます。

```javascript
view.$el.show();

listView.$el.append(itemView.el);
```

### setElement `view.setElement(element)`

If you'd like to apply a Backbone view to a different DOM element, use setElement, which will also create the cached $el reference and move the view's delegated events from the old element to the new one.

BackboneのViewを違うDOM要素に適用したい場合、 **setElement** を使用します。このメソッドは`$el`の参照をキャッシュして、Viewがもつイベントの委譲を古い要素から新しい要素に移動させます。

### attributes `view.attrributes`

A hash of attributes that will be set as HTML DOM element attributes on the view's el (id, class, data-properties, etc.), or a function that returns such a hash.

Viewの`el`のDOM要素としての属性（id、class、data-propertiesなど）にセットされる、属性のハッシュまたはそのようなハッシュを返す関数です。

### $ (jQuery or Zepto) `view.$(selector)`

If jQuery or Zepto is included on the page, each view has a $ function that runs queries scoped within the view's element. If you use this scoped jQuery function, you don't have to use model ids as part of your query to pull out specific elements in a list, and can rely much more on HTML class attributes. It's equivalent to running: view.$el.find(selector)

jQueryまたはZeptoがページに読み込まれている場合、それぞれのViewは自身の要素の中をスコープとしてクエリーを実行する **$** 関数を持ちます。このスコープにあるjQuery関数を使う場合、特定の要素をリストから取ってくるためにモデルのIDをクエリーの一部分として使う必要はなく、HTMLのクラス属性により強く依存するようになります。これは、`view.$el.find(selector)`の実行と等価です。

```javascript
ui.Chapter = Backbone.View.extend({
  serialize : function() {
    return {
      title: this.$(".title").text(),
      start: this.$(".start-page").text(),
      end:   this.$(".end-page").text()
    };
  }
});
```

### render `view.render()`

The default implementation of render is a no-op. Override this function with your code that renders the view template from model data, and updates this.el with the new HTML. A good convention is to return this at the end of render to enable chained calls.

デフォルトの実装の **render** は何もしません。ViewのテンプレートをModelのデータからレンダリングし、新しいHTMLで`this.el`を更新するような、独自のコードで上書きします。よい慣習として、コールチェーンを有効にするため **render** の最後で`return this`します。

```javascript
var Bookmark = Backbone.View.extend({
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});
```
Backbone is agnostic with respect to your preferred method of HTML templating. Your render function could even munge together an HTML string, or use document.createElement to generate a DOM tree. However, we suggest choosing a nice JavaScript templating library. Mustache.js, Haml-js, and Eco are all fine alternatives. Because Underscore.js is already on the page, _.template is available, and is an excellent choice if you've already XSS-sanitized your interpolated data.

Backboneは、あなたが好むHTMLテンプレーティングの方法にとらわれることなく関知しません。あなたの **render** 関数は、HTML文字列を置換することも、`document.createElement`でDOMツリーを作成することも同様に行うことができます。しかし、我々は素晴らしいJavaScriptテンプレーティングライブラリを選ぶことをおすすめします。[Mustache.js](http://github.com/janl/mustache.js)や[Haml-js](http://github.com/creationix/haml-js)、そして[Eco](http://github.com/sstephenson/eco)、これらはすべて良い代替手段と言えます。そのように言うのも、ページには[Underscore.js](http://documentcloud.github.com/underscore/)が既にあるため[_.template](http://documentcloud.github.com/underscore/#template)を利用することができ、XSS対策のサニタイズが済んだデータを挿入する場合は、素晴らしい選択になるからです。

Whatever templating strategy you end up with, it's nice if you never have to put strings of HTML in your JavaScript. At DocumentCloud, we use Jammit in order to package up JavaScript templates stored in /app/views as part of our main core.js asset package.

テンプレーティングによる方略がどのようなものであっても結局、JavaScriptでHTML文字列を配置する必要がなければ、それは良いことです。DocumentCloudでは、`core.js`のアセットパッケージの一部として、`/app/views`に格納されたJavaScriptテンプレートをパッケージするのに[Jammit](http://documentcloud.github.com/jammit/)を利用しています。

### remove `view.remove()`

Convenience function for removing the view from the DOM. Equivalent to calling $(view.el).remove();

DOMからViewを削除するために便利な関数です。`$(view.el).remove()`を呼び出すのと等価です。

### make `view.make(tagName, [attributes], [content])`

Convenience function for creating a DOM element of the given type ( **tagName** ), with optional attributes and HTML content. Used internally to create the initial `view.el`.

オプションの属性とHTMLコンテントを伴って、与えられた型（ **tagName** ）のDOM要素を作成するのに便利な関数です。内部的に`view.el`を初期化するのに使用しています。

```javascript
var view = new Backbone.View;

var el = view.make("b", {"class": "bold"}, "Bold! ");

$("#make-demo").append(el);
```

### delegateEvents `delegateEvents([events])`

Uses jQuery's delegate function to provide declarative callbacks for DOM events within a view. If an events hash is not passed directly, uses this.events as the source. Events are written in the format {"event selector": "callback"}. The callback may be either the name of a method on the view, or a direct function body. Omitting the selector causes the event to be bound to the view's root element (this.el). By default, delegateEvents is called within the View's constructor for you, so if you have a simple events hash, all of your DOM events will always already be connected, and you will never have to call this function yourself.

Viewの中のDOMイベントに対して、コールバックの宣言を提供するのにjQueryの`delegate`を使用しています。 **events** ハッシュが直接渡されていない場合、`this.events`がソースとして使われます。イベントは、`{"event selector": "callback"}`という形式で記述します。コールバックは、Viewにあるメソッド名、または関数本体が直接指定されるかもしれません。セレクタを省略すると、イベントはViewのルート要素（ `this.el` ）に結びつけられます。デフォルトで、`delegateEvents`はViewのコンストラクタの中で呼び出され、単純に`events`ハッシュを使用している場合は、すべてのDOMイベントが常にすでに接続されていることになり、自身でこの関数を呼び出す必要はありません。

The events property may also be defined as a function that returns an events hash, to make it easier to programmatically define your events, as well as inherit them from parent views.

`events`プロパティは **events** ハッシュを返す関数として定義することもでき、プログラム的にイベントを定義するほかに、親のViewのイベントを継承することも簡単にしてくれます。

Using delegateEvents provides a number of advantages over manually using jQuery to bind events to child elements during render. All attached callbacks are bound to the view before being handed off to jQuery, so when the callbacks are invoked, this continues to refer to the view object. When delegateEvents is run again, perhaps with a different events hash, all callbacks are removed and delegated afresh — useful for views which need to behave differently when in different modes.

**delegateEvents** を使用することは[render](http://backbonejs.org/#View-render)中に、jQueryを使って手動で子要素にイベントを結びつけることよりも、多くのアドバンテージを提供します。すべてのアタッチされているコールバックは、コールバックが呼び出されたとき、Viewオブジェクトを参照し続けるために、jQueryに引き渡される前にViewに結びつけられています。異なった`events`ハッシュを伴って **delegateEvents** がもう一度実行されるようなときには、すべてのコールバックを削除し、新しく委譲を行います ー 別のモードで異なった動作を必要とする時があるViewにとって有用です。

A view that displays a document in a search result might look something like this:

文書内の検索結果を表示するViewは、このような見た目になるかもしれません:

```javascript
var DocumentView = Backbone.View.extend({

  events: {
    "dblclick"                : "open",
    "click .icon.doc"         : "select",
    "contextmenu .icon.doc"   : "showMenu",
    "click .show_notes"       : "toggleNotes",
    "click .title .lock"      : "editAccessLevel",
    "mouseover .title .date"  : "showTooltip"
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  open: function() {
    window.open(this.model.get("viewer_url"));
  },

  select: function() {
    this.model.set({selected: true});
  },

  ...

});
```

### undelegateEvents `undelegateEvents()`

Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM temporarily.

Viewに委譲されたすべてのイベントを削除します。Viewを一時的にDOMから削除または無効化するときに有用です。
