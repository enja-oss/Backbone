#Backbone.js FAQの日本語訳

+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")
+  訳者: [ahomu](https://github.com/ahomu) ( Twitter [@ahomu](https://twitter.com/ahomu) )
+  謝辞: 初稿監訳 [studiomohawk](https://github.com/studiomohawk) ( Twitter [@cssradar](https://twitter.com/cssradar) )

##イベントの一覧 [原文](http://backbonejs.org/#FAQ-events)

Backbone.jsで発火する組み込みイベントの一覧を示します。このほかにも、ModelやViewで独自のイベントを自由にトリガすることができます。

※訳注：以下のリストの括弧はイベントリスナに与えられる引数です。ModelとCollectionが絡むイベントは、Model -> Collectionの順に、双方でイベントが発火します。

+  `add` (model, collection) — ModelがCollectionに追加(add)されたとき
+  `remove` (model, collection) — ModelがCollectionから削除(remove)されたとき
+  `reset` (collection) — Collectionがリセット(reset)されて、すべての内容が置き換わったとき
+  `change` (model, options) — Modelの値が変更(change)されたとき
+  `change:[attribute]` (model, value, options) — Modelの特定の値が変更(change)されたとき
+  `destroy` (model, collection) — Modelが破棄(destroy)されたとき
+  `sync` (model, collection) —Modelがサーバーとの同期(sync)に成功したとき
+  `error` (model, collection) — Modelのバリデーションに違反したときや、サーバーとの通信に失敗(error)したとき
+  `route:[name]` (router) — Routerの特定のメソッドにルーティング(route)されたとき（※訳注：nameはルーティングの元になったパスではなく、ルーティング先のメソッド名であり、そのメソッドが実行されたあとに発火することに注意）
+  `all` — この特別なイベントは、トリガされたすべてのイベントで発火します。第一引数にはイベント名が渡されます。


##なぜ他のフレームワークでなく、Backboneを使うのか？ [原文](http://backbonejs.org/#FAQ-why-backbone)

もしあなたが上に示した[examplesリスト](http://documentcloud.github.com/backbone/#examples)を見て、適合するシーンをまだ掴み切れていないのであれば、より具体的に述べることができます。Backbone.jsは細心の注意を払いながら、より良い実装のために確実で判断したほうがよいことに勝手な答えを出さず、野心的なインターフェースを備えたデータリッチなWebアプリケーションが必要とする共通基盤を提供することを目的としています。

+  HTMLウィジェットについてでもなく、JavaScriptのオブジェクトモデルの再開発についてでもなく、[データの問い合わせや操作に有用なメソッド](http://backbonejs.org/#Collection-Underscore-Methods)を提供することにフォーカスしています。

+  Backboneはあなたに特定のテンプレートエンジンを使うことを強制しません。Viewは[あなた](http://underscorejs.org/#template)の[好き](http://guides.rubyonrails.org/layouts_and_rendering.html)な[方法](http://mustache.github.com/)でHTMLを構築できます。

+  より小さいライブラリです。この軽量さはダウンロードのためであるし、把握すべき概念が広大でないことも示しています。あなたは午後いっぱいソースコードを読めば、これらを理解することができます。

+  アプリケーションロジックがHTMLに依存しません。埋め込みのインラインJavaScriptや、テンプレートロジック、`data-`や`ng-`属性によるバインディングはなく、独自にHTMLタグを発明する必要はありません。

+  [同期イベント](http://backbonejs.org/#Events)がベースになっていて、難解なイベントループではありません。コンスタントにポーリングして、データ構造を解析して変更を見つけます。もしあなたが望めば、特定のイベントを非同期にして集約することも[問題はありません](http://underscorejs.org/#debounce)。

+  Backboneはスケーリングに優れ、[埋め込みウィジェット](http://disqus.com/)から[大規模なアプリ](http://www.usatoday.com/)まで対応できます。

+  Backboneはライブラリであって、フレームワークではないので、他のライブラリと併用しやすいです。DojoアプリにBackboneウィジェットを埋め込むことは難なくできますし、d3を利用したビジュアライゼーションのデータ管理にもBackboneのModelを利用できます。（ここに挙げているのはランダムな2つの例です）

+  2way-bindingを敢えて備えていません。それは確かに、気の利いたデモができて、基本的なCRUD操作として動きますが、あなたのアプリケーションにおいて劇的に便利に使えることは現実的にありません。ときには`keypress`のたびにアップデートしたいでしょうし、`blur`のときにしたい、パネルを閉じたときにしたい、保存ボタンが押されたときにしたいと様々です。ほとんどのケースにおいて、フォームのデータをJSONに単純にシリアライズすることが速くて簡単です。さておき、使う用途がはっきりしているのであれば、[使えば](http://rivetsjs.com/)よい[でしょう](http://nytimes.github.com/backbone.stickit/)。

+  Backboneを利用してコードを構造化することが、パフォーマンス低下を直接的に引き起こすことはありません。そしてもしあなたが、遠大な最適化を望むのであれば、簡素なモデルとテンプレートを柔軟な粒度で扱うことで、容易に最後の一滴までパフォーマンスを引き出すことができます。ほら、IE8向けとか。


##複数の手段があります [原文](http://backbonejs.org/#FAQ-tim-toady)

一般的にこれから始める人々にとって、このページに記載されている例は、ある種、唯一の真実のように映ります。実際には、Backbone.jsはクライアントサイドコードにおける多くの共通パターンに、大部分で依存していません。例えば...


**ModelとViewをつなぐ参照**は、複数の方法で制御できます。一部の人は、ポインタを直接持たせてViewとModelを1:1にすることを好みます（`model.view` と `view.model`）。他にも、Controllerを設けて、Viewを階層的に作成・編成して、コントロールする方法も好まれます。その他はイベントアプローチを好み、直接メソッドを呼ぶかわりに、常にイベントを発火させてコントロールします。これらのスタイルのすべてがうまく動作します。

**バッチ操作**はモデルにおいて一般的ですが、多くの場合はサーバーサイドの設計によって異なった制御を行うほうが理想的です。一部の人々はAjaxリクエストを個々に記述することを惜しみません。あるいは、`/notes/batch/destroy?ids=1,2,3,4` のようなRESTfulなバッチ操作のための明示的なリソースを作成します。他にも、JSONをトンネルにすることでRESTを実現し、次のようなチェンジセットとしてリクエストを作成することもあります。

```
{
  "create":  [array of models to create],
  "update":  [array of models to update],
  "destroy": [array of model ids to destroy]
}
```

**自由に独自イベントを定義できます**。[Backbone.Events](http://backbonejs.org/#Events)は、あらゆるobjectやprototypeと混ぜ合わせて使えるようにデザインされています。独自のカスタムイベントをbindまたはtriggerするのに、`model.on("selected:true")` や `model.on("editing")`のように任意の文字列をイベント名として使用できます。

**UIの描画**はあなたが望むように行われます。Backboneは`render`関数の中で、[Underscore templates](http://documentcloud.github.com/underscore/#template)や[Mustache.js](https://github.com/janl/mustache.js)、直接的なDOM操作、サーバーサイドで作ったHTMLスニペット、jQuery UIなどのいずれが使用されることを問いません。時にはModelごとのViewを作成するでしょうし、時にはタイトなループの中で多数のModelを一度に描画するViewを作成することもあるでしょう。同じアプリの中であっても、関係するデータの量や、UIの複雑さに応じてどちらの方法でも適切になりえます。

##ネストしたModelとCollection [原文](http://backbonejs.org/#FAQ-nested)

たとえば、多くの`Message` modelをもつ`Mailbox` modelを考えてみましょう。これを処理するための良い方法のひとつは、Mailboxに`this.messages` collectionを持たせMailboxがはじめに開かれたときに、遅延ロードされるようにします。おそらく`MessageList` viewは、`add`と`remove`イベントをリスニングするようになるでしょう。

```
var Mailbox = Backbone.Model.extend({

  initialize: function() {
    this.messages = new Messages;
    this.messages.url = '/mailbox/' + this.id + '/messages';
    this.messages.on("reset", this.updateCounts);
  },

  ...

});

var Inbox = new Mailbox;

// And then, when the Inbox is opened:

Inbox.messages.fetch();
```

もしあなたが他のもっと厳格な何かを探すのであれば、モデル間の洗練されたアソシエーションを追加したBackboneプラグインがいくつかあり、[Wikiで見つけることができます](https://github.com/documentcloud/backbone/wiki/Extensions%2C-Plugins%2C-Resources)。

BackboneはネストしたModelやCollectionまたは"has many"なアソシエーションの直接的なサポートを含みません。なぜならばクライアントサイドで構造化データをモデリングするための良いパターンが幾つかあり、Backboneはそれらのいずれかを実装するための基板を提供する必要があります。あなたが望むように...

+  SQLデータベースの構造をそのまま反映する、またはNoSQLデータベースを構造化する
+  外部キー（foreign key）になるid配列をもったModelを使用し、トップレベルのCollectionと結合する
+  無数にあるアソシエーションについては、idのかわりに明示的なリストを使用する
+  idを避けて、データセットを表す部分的なオブジェクトグラフを作成し、直接参照を使用する
+  遅延ロードでサーバーとModelをつないだり、JSON文書を遅延評価してネストしたModelを作成する


##初期モデルの読み込み [原文](http://backbonejs.org/#FAQ-bootstrap)

あなたのアプリが最初に読み込まれたとき、そのページをレンダリングするのに必要になるであろう初期データをセットしておくのが一般的です。そこでAjaxリクエストを余分に行って[fetch](http://backbonejs.org/#Collection-fetch)するよりも、代わりになる良いパターンは、ページにそれらのデータを埋め込んでおくことです。そして、[reset](http://backbonejs.org/#Collection-reset)することで、Collectionの初期データを入れることができます。DocumentCloudでは、ワークスペースには[ERB](http://en.wikipedia.org/wiki/ERuby)テンプレートを使っていて、このように何かしらを行います。

```
  <script>
    var Accounts = new Backbone.Collection;
    Accounts.reset(<%= @accounts.to_json %>);
    var Projects = new Backbone.Collection;
    Projects.reset(<%= @projects.to_json(:collaborators => true) %>);
  </script>
```

あなたは、JavaScriptインジェクション攻撃を防ぐために、JSON文字列内で`</`を[escape](http://mathiasbynens.be/notes/etago)する必要があります。

##Backboneの拡張 [原文](http://backbonejs.org/#FAQ-extending)

多くのJavaScriptライブラリは、自身を独立性の高い状態に封じこめた上で、ユーザーがそれらの公開されたAPIを呼び合うことで相互に作用することを意図していますが、Backboneはそのような種類のライブラリではありません。

なぜならば、Backboneはアプリケーションの基礎を提供していて、ユーザーにとって適当な方法で、自由に継承し機能を拡張することを意図しています。ソースコード全体で、このような拡張を容易にするための[注釈](http://backbonejs.org/docs/backbone.html)がつけられています。

コア機能を担っている部分は非常に少ないということが分かり、またそれらのほとんどは、必要性に応じてオーバーライドないし、拡張することができます。

`Backbone.Model.prototype`にメソッドを追加したり、ベースとなる独自のサブクラスを作成しても心配することはありません。それこそが想定された方法なのです。

##Backboneはどのように伝統的なMVCと関係しているか [原文](http://backbonejs.org/#FAQ-mvc)

異なる[Model-View-Controller]([Model–view–controller - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Model%E2%80%93View%E2%80%93Controller "Model–view–controller - Wikipedia, the free encyclopedia")パターンの実装において、コントローラーの定義について異議を唱える傾向にあります。何かの役に立つのであれば、Backboneは[View](http://backbonejs.org/#View)クラスをControllerのようなものとして考えることができ、UIから発生するイベントをディスパッチしながら、従来のViewのようにHTMLテンプレートも使用します。我々がそれをViewと呼ぶのは、それがUIロジックの単位を示し、単一のDOM要素の内容に責任を持っているからです。

Backboneの全体的な構造を、RailsのようなサーバーサイドMVCフレームワークと比較すると、このようなラインアップになります。

+  Backbone.Model – RailsのModelからクラスメソッドを引いたようなもの。ビジネスロジック内データの1行を内包します。
+  Backbone.Collection – クライアントサイドにおけるModelのグループ。並び替え(sort)・フィルタリング(filtering)・集約(aggregation)のロジックを持つ。
+  Backbone.Router – Railsの`routes.rb`とControllerアクションにあたる。URLをfunctionにマッピングする。
+  Backbone.View – ロジカルで再利用可能なUIのパーツ。常にではないが、多くの場合でModelと関連づいている。
+  Client-side Templates – Railsの`.html.erb`にあたり、部分部分のHTMLをレンダリングする。

##thisを束縛する [原文](http://backbonejs.org/#FAQ-this)
恐らく、最も一般的なJavaScriptの落とし穴は、コールバックとしてfunctionを渡したときに`this`が失われることでしょう。Backboneで[events](http://backbonejs.org/#Events)とコールバックを扱うときにはしばしば、Underscore.jsの[_.bind](http://documentcloud.github.com/underscore/#bind)と[_.bindAll](http://documentcloud.github.com/underscore/#bindAll)の有用さを見いだすでしょう。
Backboneのevetnsにコールバックをバインドするとき、オプションの第三引数に`this`を指定することで、あとでコールバックが呼び出されたときにそれを使うようにできます。

```
var MessageList = Backbone.View.extend({
  initialize: function() {
    var messages = this.collection;
    messages.on("reset", this.render, this);
    messages.on("add", this.addMessage, this);
    messages.on("remove", this.removeMessage, this);
  }

});

// Later, in the app...

Inbox.messages.add(newMessage);
```

##Railsと一緒に使う [原文](http://backbonejs.org/#FAQ-rails)

Backbone.jsは元々[Railsアプリケーション](http://www.documentcloud.org/home)から抽出されていて、サーバーサイド（Rails）のModelへの副作用なしにクライアントサイド（Backbone）のModelが同期できるようになっていますが、それでも注意すべき点がいくつか残っています。

デフォルトでは、RailsはModelをJSONで表すときに、Model名をJSONのrootに余分に含ませてラップします。これをデフォルトでラップを含ませないように設定できます。

```
ActiveRecord::Base.include_root_in_json = false
```

のように設定します。それ以外の場合は、[parse](http://backbonejs.org/#Model-parse)をオーバーライドして、Model名のラッパーを取り除いてModelの値を取り出してやります。同様に、BackboneのPUTとPOSTにおいてModelをJSONで表現するときも、RailsはデフォルトでModel名がrootに含まれることを期待します。Controllerで`params`から直接的に値をフィルタすることができ、もしくはBackboneの[toJSON](http://backbonejs.org/#Model-toJSON)を上書きしてRailsが期待するようになるようrootにModel名を追加します。
