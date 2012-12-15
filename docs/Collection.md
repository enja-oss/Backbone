+  元文書: [backbone/index.html at c36df02d950ea626d036033fedd13c631118cf59 · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/c36df02d950ea626d036033fedd13c631118cf59/index.html "backbone/index.html at c36df02d950ea626d036033fedd13c631118cf59 · documentcloud/backbone · GitHub")

## Backbone.Collection [原文](http://backbonejs.org/#Collection)

Collectionはモデルを集合させたものです。コレクション内のモデルが変更された際に通知する`"change"`イベントをバインドする事もできますし、`"add"`や`"remove"`イベントで待ち受ける事もでき、サーバーからコレクションを`"fetch"`でき、[Underscore.jsメソッド](#Collection-Underscore-Methods)の全てのセットを使う事ができます。

コレクション内のモデル内でトリガーされた全てのイベントは、利便性の為にコレクションにも直接トリガーされます。これによりコレクション内の全てのモデルの特定の属性の変更を待ち受ける事が可能です。例： `Documents.on("change:selected", ...)`

