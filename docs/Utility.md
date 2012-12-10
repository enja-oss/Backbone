+ 元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Utility Functions [原文](http://backbonejs.org/#Utility)

### noConflict `var backbone = Backbone.noConflict();` [原文](http://backbonejs.org/#Utility-noConflict)
現在の状態の`Backbone`オブジェクトを返します。あなたは`Backbone.noConflict()`によって返された値を、ローカルのBackboneへの参照として保持することができます。
Backboneを第三者のWebサイトに埋め込もうとする場合など、既に存在するBackboneを上書きしたくない場合に便利です。

    var localBackbone = Backbone.noConflict();
    var model = localBackbone.Model.extend(...);

### setDomLibrary `Backbone.setDomLibrary(jQueryNew);` [原文](http://backbonejs.org/#Utility-setDomLibrary)
もしあなたがjQueryのようなDOM/Ajaxライブラリを複数使う場合、Backboneにそれを伝えてあげて下さい。