+ 元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

#ver 0.9へのアップグレードに際して [原文](http://backbonejs.org/#upgrading)

Backbone.js ver0.9は、ver1.0のリリース候補版として位置付けられます。APIの更新や、活用すべき新機能などが[更新履歴](#changelog)に記載されています。また、以下の変更点に注意してください。

+ Viewに指定する`this.el`プロパティを設定する際、[setElement](#View-setElement)メソッドを使用するようにしてください。
+ Modelの扱いはとても楽観的です。サーバーからの応答があるまで過去の振る舞いを維持したい場合は、`{wait:true}`を設定するようにしてください。[save](#Model-save)メソッドをコールする場合にも同様の事が言えます。
+ Viewのelの参照にjQueryオブジェクトの[$el](#View-$el)が用意されました。よって、elを参照する際に`$(view.el)`と記述する必要はありません。
+ Backbone.jsのバージョンを0.9にアップグレードする場合、Underscore.jsのバージョンもver1.3.1以上を使用するようにしてください。
+ Modelに`{silent: true}`を設定することで、`model.set`はchangeイベントを発火しません。同時に初期値が設定されます。アトリビュートが更新された後、`change:attribute`イベントが次のchangeイベントまでに発火されます。
+ `view.$(selector)`は`$(selector, view.el)`、あるいは`view.$el.find(selector)`と同等になりました。`selector`にHTML文字列やDOM要素を指定しないようにしてください。