+  元文書: [backbone/index.html at c36df02d950ea626d036033fedd13c631118cf59 · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/c36df02d950ea626d036033fedd13c631118cf59/index.html "backbone/index.html at c36df02d950ea626d036033fedd13c631118cf59 · documentcloud/backbone · GitHub")

## Backbone.Collection [原文](http://backbonejs.org/#Collection)

Collectionはモデルを集合させたものです。コレクション内のモデルが変更された際に通知する`"change"`イベントをバインドする事もできますし、`"add"`や`"remove"`イベントで待ち受ける事もでき、サーバーからコレクションを`"fetch"`でき、[Underscore.jsメソッド](#Collection-Underscore-Methods)の全てのセットを使う事ができます。

コレクション内のモデル内でトリガーされた全てのイベントは、利便性の為にコレクションにも直接トリガーされます。これによりコレクション内の全てのモデルの特定の属性の変更を待ち受ける事が可能です。例： `Documents.on("change:selected", ...)`

### extend `Backbone.Collection.extend(properties, [classProperties])` [原文](http://backbonejs.org/#Collection-extend)

自分の **Collection** クラスを作るもので、 **Backbone.Collection** の拡張であり、 **properties** インスタンスや、オプションでコレクションのコンストラクタ関数に対して直接付けられる **classProperties** を提供します

### model `collection.model` [原文](http://backbonejs.org/#Collection-model)

コレクションに含まれる特定のモデルクラスのプロパティを上書きします。定義された場合は[add](#Collection-add)、[create](#Collection-create)と、[reset](#Collection-reset)に生の属性オブジェクト(と、配列)を渡す事ができ、属性はモデル内の適切な型に変換されます。

```javascript
var Library = Backbone.Collection.extend({
  model: Book
});
```

### constructor / initialize `new Collection([models], [options])` [原文](http://backbonejs.org/#Collection-constructor)

Collectionを作成した時に、 **models** の初期配列に渡すものを選択できます。コレクションの[comparator](#Collection-comparator)関数はオプションを含むことができます。 **initialize** 関数を定義した場合、コレクションが作成された時に呼び出されます。

```javascript
var tabs = new TabSet([tab1, tab2, tab3]);
```

### models `collection.models` [原文](http://backbonejs.org/#Collection-models)

コレクションの内部のモデルのJavaScriptの配列に生のアクセスをします。通常は`get`、`at`、やモデルオブジェクトにアクセスする **Underscoreのメソッド** を使いますが、稀に配列に直接参照したい場合もあるでしょう。

### toJSON `collection.toJSON()` [原文](http://backbonejs.org/#Collection-toJSON)

コレクション内のモデルそれぞれの属性のハッシュを含む配列を返します。これはコレクション全体をシリアライズと永続化する事ができます。このメソッドの名前は[JavaScriptのJSON API](https://developer.mozilla.org/en/JSON#toJSON\(\)_method)と一緒なので、若干区別が付きにくいです。

```javascript
var collection = new Backbone.Collection([
  {name: "Tim", age: 5},
  {name: "Ida", age: 26},
  {name: "Rob", age: 55}
]);

alert(JSON.stringify(collection));
```

### Underscore Methods (28) [原文](http://backbonejs.org/#Collection-Underscore-Methods)

Backboneは28種のイテレーション関数を **Backbone.Collection** に提供する為に **Underscore.js** を代理しています。その全てがこちらにドキュメント化されてはいないですが、詳しくはUnderscoreのドキュメントで調べる事ができます&hellip;

- [forEach (each)](http://documentcloud.github.com/underscore/#each)
- [map](http://documentcloud.github.com/underscore/#map)
- [reduce (foldl, inject)](http://documentcloud.github.com/underscore/#reduce)
- [reduceRight (foldr)](http://documentcloud.github.com/underscore/#reduceRight)
- [find (detect)](http://documentcloud.github.com/underscore/#find)
- [filter (select)](http://documentcloud.github.com/underscore/#filter)
- [reject](http://documentcloud.github.com/underscore/#reject)
- [every (all)](http://documentcloud.github.com/underscore/#all)
- [some (any)](http://documentcloud.github.com/underscore/#any)
- [include](http://documentcloud.github.com/underscore/#include)
- [invoke](http://documentcloud.github.com/underscore/#invoke)
- [max](http://documentcloud.github.com/underscore/#max)
- [min](http://documentcloud.github.com/underscore/#min)
- [sortBy](http://documentcloud.github.com/underscore/#sortBy)
- [groupBy](http://documentcloud.github.com/underscore/#groupBy)
- [sortedIndex](http://documentcloud.github.com/underscore/#sortedIndex)
- [shuffle](http://documentcloud.github.com/underscore/#shuffle)
- [toArray](http://documentcloud.github.com/underscore/#toArray)
- [size](http://documentcloud.github.com/underscore/#size)
- [first](http://documentcloud.github.com/underscore/#first)
- [initial](http://documentcloud.github.com/underscore/#initial)
- [rest](http://documentcloud.github.com/underscore/#rest)
- [last](http://documentcloud.github.com/underscore/#last)
- [without](http://documentcloud.github.com/underscore/#without)
- [indexOf](http://documentcloud.github.com/underscore/#indexOf)
- [lastIndexOf](http://documentcloud.github.com/underscore/#lastIndexOf)
- [isEmpty](http://documentcloud.github.com/underscore/#isEmpty)
- [chain](http://documentcloud.github.com/underscore/#chain)

```javascript
Books.each(function(book) {
  book.publish();
});

var titles = Books.map(function(book) {
  return book.get("title");
});

var publishedBooks = Books.filter(function(book) {
  return book.get("published") === true;
});

var alphabetical = Books.sortBy(function(book) {
  return book.author.get("name").toLowerCase();
});
```

### add `collection.add(models, [options])` [原文](http://backbonejs.org/#Collection-add)

コレクションにモデル(または複数のモデルの配列)を追加します。`{silent: true}`を引数で渡すと抑制ができる、`"add"`イベントを発火させます。[model](#Collection-model)プロパティが指定されている場合は、生の属性オブジェクトを渡す事ができ、モデルのインスタンスとして活発にさせます。`{at: index}`を渡すと、モデルを特定の`index`のコレクション中に繋ぎ込みます。同様に、コレクションの`add`イベントのコールバックを待ち受ける場合に、`options.index`によってコレクションに追加されたモデルがどのインデックスなのかを知る事ができます。

```javascript
var ships = new Backbone.Collection;

ships.on("add", function(ship) {
  alert("Ahoy " + ship.get("name") + "!");
});

ships.add([
  {name: "Flying Dutchman"},
  {name: "Black Pearl"}
]);
```

### remove `collection.remove(models, [options])` [原文](http://backbonejs.org/#Collection-remove)

コレクションからモデル(または複数のモデルの配列)を削除します。`silent`を使う事で抑制ができる`"remove"`イベントを発火させます。`"remove"`イベントのコールバックを待ち受ける場合に、`options.index`によりコレクションから削除されたモデルがどのインデックスなのかを知る事ができます。

### get `collection.get(id)` [原文](http://backbonejs.org/#Collection-get)

**id** により特定されたモデルをコレクションから取得します。

```javascript
var book = Library.get(110);
```

### getByCid `collection.getByCid(cid)` [原文](http://backbonejs.org/#Collection-getByCid)

特定のクライアントIDのモデルをコレクションから取得します。クライアントIDはモデルの`.cid`プロパティで、これはモデルが作成されると自動で付与されます。サーバーにまだ保存されておらず本当のIDを持っていないモデルに役立つものです。

### at `collection.at(index)` [原文](http://backbonejs.org/#Collection-at)

特定のインデックスのモデルをコレクションから取得します。`at`は挿入された順番でモデルを検索するのでコレクションが保存されていても、保存されていない場合にも役立ちます。

### push `collection.push(model, [options])` [原文](http://backbonejs.org/#Collection-push)
コレクションの最後にモデルを追加します。[add](#Collection-add)と同じオプションを取ります。

### pop `collection.pop([options])` [原文](http://backbonejs.org/#Collection-pop)

コレクションから最後のモデルを削除して返します。[remove](#Collection-remove)と同じオプションを取ります。

### unshift `collection.unshift(model, [options])` [原文](http://backbonejs.org/#Collection-unshift)

コレクションの先頭にモデルを追加します。[add](#Collection-add)と同じオプションを取ります。

### shift `collection.shift([options])` [原文](http://backbonejs.org/#Collection-shift)

コレクションから最初のモデルを削除して返します。[remove](#Collection-remove)と同じオプションを取ります。

### length `collection.length` [原文](http://backbonejs.org/#Collection-length)

配列のように、コレクションは自身が持っているモデルの数を数えており、`length`プロパティに保持しています。

### comparator `collection.comparator` [原文](http://backbonejs.org/#Collection-comparator)
デフォルトではコレクションに **comparator** 関数は存在しません。コンパレータを定義する場合、コレクションをソート済みの順番で保持する為に使用するでしょう。これはモデルが追加されると`collection.models`に正しいインデックスで挿入されるという事を意味します。コンパレータ関数は[sortBy](http://underscorejs.org/#sortBy)(単一の引数を取る関数を渡す)か、[sort](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort)(2つの引数を取るコンパレータ関数を渡す)によって定義されます。

"sortBy"コンパレータ関数は1つのモデルを取り、そのモデルが他のモデルに対してあるべき順番を数値か文字列の値で返します。"sort"コンパレータ関数は2つのモデルを取り、最初のモデルが次のモデルの前に来るべきものなら、`-1`を返し、どちらも同じ順位なら`0`を、最初のモデルが次のモデルの後に来るべきものなら`1`を返します。

この例の全てのチャプターを逆方向に追加したとしても、正しい順序に来る事に注意してください。

```javascript
var Chapter  = Backbone.Model;
var chapters = new Backbone.Collection;

chapters.comparator = function(chapter) {
  return chapter.get("page");
};

chapters.add(new Chapter({page: 9, title: "The End"}));
chapters.add(new Chapter({page: 5, title: "The Middle"}));
chapters.add(new Chapter({page: 1, title: "The Beginning"}));

alert(chapters.pluck('title'));
```

_コンパレータ関数付きのコレクションは後からモデルの属性を変更したからといって自動的に再ソートしないので、ソートした場合には順番に影響を与えるモデルの属性を変更した後に`sort`を呼び出します。_

### sort `collection.sort([options])` [原文](http://backbonejs.org/#Collection-sort)

コレクション自体を強制的に再ソートします。通常の環境ではこの関数を呼ぶ必要はありませんが、[comparator](#Collection-comparator)関数付きのコレクションではいつでも正しいソート順を維持するのに必要になります。 **sort** を呼ぶ事によりコレクションは`{silent: true}`を渡して停止しない限りは、`"reset"`イベントを呼び出します。

### pluck `collection.pluck(attribute)` [原文](http://backbonejs.org/#Collection-pluck)

コレクション内のそれぞれのモデルから属性を引き抜きます。`map`の呼び出しに相当し、イテレータから単一の属性を返します。

```javascript
var stooges = new Backbone.Collection([
  {name: "Curly"},
  {name: "Larry"},
  {name: "Moe"}
]);

var names = stooges.pluck("name");

alert(JSON.stringify(names));
```

### where `collection.where(attributes)` [原文](http://backbonejs.org/#Collection-where)

渡した **attributes** にマッチするコレクション内の全てのモデルの配列を返します。シンプルな場合の`filter`として使うと便利です。

```javascript
var friends = new Backbone.Collection([
  {name: "Athos",      job: "Musketeer"},
  {name: "Porthos",    job: "Musketeer"},
  {name: "Aramis",     job: "Musketeer"},
  {name: "d'Artagnan", job: "Guard"},
]);

var musketeers = friends.where({job: "Musketeer"});

alert(musketeers.length);
```

### url `collection.url or collection.url()` [原文](http://backbonejs.org/#Collection-url)

サーバー上で参照する為にコレクションに **url** プロパティ(または関数)を設定します。コレクション内のモデルはそれぞれ自分のURLを **url** を使って構築します。

```javascript
var Notes = Backbone.Collection.extend({
  url: '/notes'
});

// Or, something more sophisticated:

var Notes = Backbone.Collection.extend({
  url: function() {
    return this.document.url() + '/notes';
  }
});
```

### parse `collection.parse(response)` [原文](http://backbonejs.org/#Collection-parse)

**parse** はBackboneによって[fetch](#Collection-fetch)を使いサーバーからコレクションのモデルを返されたらいつでも呼び出されます。この関数は生の`response`オブジェクトを渡され、コレクションに[add](#Collection-add)されたモデルの属性の配列を返します。デフォルトの実装では何もしませんが、単純にJSONレスポンスを返します。既存のAPIで動かす場合や、レスポンスのより良いネームスペースの為にこの関数を上書きする事ができます。上書き後の注意点として、モデルクラスが既に`parse`関数を持っていた場合には、フェッチされたモデルそれぞれに対して実行される事になる点です。

```javascript
var Tweets = Backbone.Collection.extend({
  // The Twitter Search API returns tweets under "results".
  parse: function(response) {
    return response.results;
  }
});
```

### fetch `collection.fetch([options])` [原文](http://backbonejs.org/#Collection-fetch)

サーバーからこのコレクション用に規定のモデルをフェッチしてきて、コレクションが生存している場合にリセットします。 **options** ハッシュはそれぞれ`(collection, response, options)`と`(collection, xhr, options)`を引数とした`success`と`error`コールバックを取ります。サーバーからモデルデータが返る際、コレクションは[reset](#Collection-reset)されます。カスタムされた永続化戦略をカバーするのに[Backbone.sync](#Sync)に委譲し、[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)を返します。 **fetch** リクエストを受けたサーバーハンドラはモデルのJSON配列を返します。

```javascript
Backbone.sync = function(method, model) {
  alert(method + ": " + model.url);
};

var Accounts = new Backbone.Collection;
Accounts.url = '/accounts';

Accounts.fetch();
```

現在のコレクションに入力されたモデルを加えたい場合、コレクションの内容を取り替える代わりに、 **fetch** のオプションに`{add: true}`を渡します。

**jQuery.ajax** オプションも **fetch** オプションに渡す事ができるので、特定のページング済みコレクションの特定のページをフェッチできます。：
`Documents.fetch({data: {page: 3}})`

**fetch** はページロードのコレクションに使用するべきでは無いというのは注意点です。&mdash;全てのモデルはロードされた時点でその場で[bootstrap](#FAQ-bootstrap)する必要があるからです。 **fetch** は即時性が必要のないインターフェースのためのレイジーロードモデル用に用意されています。：例としてトグルで開閉するノートのコレクションがあるドキュメントなどです。

### reset `collection.reset(models, [options])` [原文](http://backbonejs.org/#Collection-reset)

モデルの追加や削除を一回毎に行なうのは結構な事ですが、時には固まりのコレクションのアップデートなど大量のモデルの変更をしたい場合があります。 **reset** を使うと新しいモデル(または属性のハッシュ)のリストをともなったコレクションに取り替え、最後に単一の`"reset"`イベントをトリガします。`"reset"`イベントを抑制するには`{silent: true}`を渡します。引数無しでリセットすると空のコレクションを作るのに便利です。

Railsアプリケーションでページの初期読み込みの間にコレクションのブートストラップに **reset** を使用する例を上げます。

```erb
<script>
  var Accounts = new Backbone.Collection;
  Accounts.reset(<%= @accounts.to_json %>);
</script>
```

`collection.reset()`を引数にモデルを渡さずに呼び出すと全てのコレクションを空にします。

### create `collection.create(attributes, [options])` [原文](http://backbonejs.org/#Collection-create)

コレクションに新しいモデルのインスタンスを作るのに便利なものです。属性のハッシュをともなったモデルのインスタンス化と同じもので、モデルをサーバーに保存し、作成に成功した後にモデルを追加します。モデルを返すか、モデルの作成時にバリデーションエラーで妨げられた時に`false`を返します。これを動作させる為に、[model](#Collection-model)プロパティを設定する必要があります。 **create** メソッドは属性のハッシュか、存在すれば保存されていないモデルオブジェクトのどちらも受け入れます。

モデルの作成はコレクションでトリガする為にすぐに`"add"`イベントを呼び、一度サーバー上でモデルの作成が成功すれば、`"sync"`イベントも呼びだします。新しいモデルをコレクションに追加する前にサーバー上でのモデルの作成を待ちたい場合には、`{wait: true}`を渡します。

```javascript
var Library = Backbone.Collection.extend({
  model: Book
});

var NYPL = new Library;

var othello = NYPL.create({
  title: "Othello",
  author: "William Shakespeare"
});
```

