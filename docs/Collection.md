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
