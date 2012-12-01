+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Events [原文](http://backbonejs.org/#Events)

**Events** は、あらゆるオブジェクトをミックスする事ができ、オブジェクトにカスタムイベントをバインドしたりトリガーにしたりする事ができるモジュールです。Eventsはバインドされる前に呼ばれるなければなりませんし、渡された引数を取る事ができます。例：

```javascript
var object = {};

_.extend(object, Backbone.Events);

object.on("alert", function(msg) {
    alert("Triggered " + msg);
});

object.trigger("alert", "an event");
```

例えば、あなたのアプリケーションの別の領域の間でイベントを協調させる簡単なイベントディスパッチャーを作るにはこのようにします。: `var dispatcher = _.clone(Backbone.Events)`

### on `object.on(event, callback, [context])` _Alias:bind_ [原文](http://backbonejs.org/#Events-on)

**callback** 関数をオブジェクトにバインドします。コールバックは **event** が発火したらいつでも呼び出されます。もし単一ページに多数の別種のイベントがある場合は、それらの名前空間にコロンを使う規定になっています。: `"poll:start"` や `"change:selection"` などです。
イベントの文字列はまた各イベントのリストをスペース区切りにします。

```javascript
book.on("change:title change:author", ...);
```
コールバックが呼ばれた時に `this` に **context** の値が代用され、オプションである第3引数が渡されます。: `model.on('change', this.render, this)`

コールバックには特別にどんなイベントが起きてもトリガーにする `all` イベントがバインドされており、これには第1引数のイベントの名前が渡されます。例えば、あるオブジェクトから別のオブジェクトに全てのイベントをプロクシさせるにはこのような形になります。:

```javascript
proxy.on("all", function(eventName) {
  object.trigger(eventName);
});
```

### off `object.off([event], [callback], [context])` _Alias: unbind_ [原文](http://backbonejs.org/#Events-off)

オブジェクトからバインド済みの **callback** 関数を削除します。もし **context** が指定されていなければ、全てのバージョンのコールバックが別種のコンテキストと一緒に削除されます。もしコールバックが指定されていなければ **event** の全てのコールバックが削除されます。もしイベントが指定されていなければ、オブジェクトの _全て_ のイベントのコールバックが削除されます。

```javascript

// `onChange` のコールバックのみを削除.
object.off("change", onChange);

// "change" のコールバックを全て削除
object.off("change");

// 全てのイベントの `onChange` コールバックを削除
object.off(null, onChange);

// 全てのイベントの `context` のコールバック全てを削除
object.off(null, null, context);

// `object` の全てのコールバックを削除
object.off();
```

### trigger `object.trigger(event, [*args])` [原文](http://backbonejs.org/#Events-trigger)

与えられた **evente** や、イベントのスペース区切りのリストのコールバックのトリガーになります。 **trigger** に続く引数はイベントのコールバックを通って渡されます。
