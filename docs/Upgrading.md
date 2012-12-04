+ 元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

##ver 0.9へのアップグレードに際して [原文](http://backbonejs.org/#upgrading)

Backbone.js ver0.9系は、ver1.0のリリース候補版として位置付けています。いくつかのAPIが変更され、多くの活用すべき新機能があります、それらの変更については[更新履歴](#changelog)に記載されていますが、特に以下のいくつかの変更点については注意が必要です:

+ Backbone Viewを`this.el`を使って手動で特定のDOM要素に設定している場合、代わりに[setElement](#View-setElement)メソッドを利用してください。
+ Modelの扱いはとても楽観的です。サーバーからの応答があるまで過去の振る舞いを維持したい場合は、`{wait: true}`を設定するようにしてください。[save](#Model-save)メソッドをコールする場合にも同様の事が言えます。
+ これまで`$(view.el)`を利用してきたなら、このjQueryオブジェクトに対するキャッシュされたリファレンスである[$el](#View-$el)が利用できるようになりました。
+ Backbone.jsのバージョンを0.9にアップグレードする場合、Underscore.jsのバージョンもver1.3.1以上を使用するようにしてください。
+ Modelに`{silent: true}`を設定すると、`model.set`はchangeイベントを発火しなくなります。その後、元の値に設定し直されます。同様にアトリビュートをsilentオプションを使って変更した場合にも、次の変更時には`change:attribute`イベントを発火します。
+ `view.$(selector)`は`$(selector, view.el)`では`view.$el.find(selector)`とすることと同様になったため、`selector`がHTMLの文字列やDOM要素である場合に利用することはできなくなりました。