+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Events

**Events** は、あらゆるオブジェクトをミックスする事ができ、オブジェクトにカスタムイベントをバインドしたりトリガーにしたりする事ができるモジュールです。Eventsはバインドされる前に呼ばれるなければなりませんし、渡された引数を取る事ができます。例：

```JavaScript
var object = {};

_.extend(object, Backbone.Events);

object.on("alert", function(msg) {
    alert("Triggered " + msg);
});

object.trigger("alert", "an event");
```

例えば、あなたのアプリケーションの別の領域の間でイベントを協調させる簡単なイベントディスパッチャーを作るにはこのようにします。: `var dispatcher = _.clone(Backbone.Events)`
