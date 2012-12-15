+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Collection [原文](http://backbonejs.org/#Collection)

Collectionはモデルを集合させたものです。コレクション内のモデルが変更された際に通知する`"change"`イベントをバインドする事もできますし、`"add"`や`"remove"`イベントで待ち受ける事もでき、サーバーからコレクションを`"fetch"`でき、[Underscore.jsメソッド](#Collection-Underscore-Methods)の全てのセットを使う事ができます。

コレクション内のモデル内でトリガーされた全てのイベントは、利便性の為にコレクションにも直接トリガーされます。これによりコレクション内の全てのモデルの特定の属性の変更を待ち受ける事が可能です。例：
`Documents.on("change:selected", ...)`
