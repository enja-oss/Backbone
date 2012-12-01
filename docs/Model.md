## Backbone.Model

**Model**はあらゆるJavaScriptアプリケーションの中核をなすもので、対話形式のデータとデータに関連するロジック、つまり変換、検査、プロパティ値計算、アクセス制御などを含みます。あなたは**Backbone.Model**クラスを継承して、ドメイン固有のメソッドを実装するだけでよく、データ操作に関わる基本的な機能はModelクラスが提供します。
以下のコード例は不自然ではありますが、**Model**とカスタムメソッド定義の実例です。ここでは属性値をセットし、その属性値変化のイベントを発火してます。このコードを実行すると、サイドバー
がブラウザのウィンドウに追加されるので、実際にさわってみることができます。

    var Sidebar = Backbone.Model.extend({
      promptColor: function() {
        var cssColor = prompt("Please enter a CSS color:");
        this.set({color: cssColor});
      }
    });
    
    window.sidebar = new Sidebar;
    
    sidebar.on('change:color', function(model, color) {
      $('#sidebar').css({background: color});
    });
    
    sidebar.set({color: 'white'});
    
    sidebar.promptColor();

### extend    Backbone.Model.extend(properties, [classProperties])    
独自のModelクラスを作成するには**Backbone.Model**を継承し、インスタンスプロパティを記述します。またオプションでclassPropertiesを渡すこともできます。classPropertiesはコンストラクタ関数のプロパティとなります。
**extend**は適切にプロトタイプチェーンを組み立てるので、もし望むならばextendで作成されたサブクラスをさらに継承するサブクラスを作成することもできます。 

    var Note = Backbone.Model.extend({

      initialize: function() { ... },
    
      author: function() { ... },
    
      coordinates: function() { ... },
    
      allowedToEdit: function(account) {
        return true;
      }
    
    });

    var PrivateNote = Note.extend({
    
      allowedToEdit: function(account) {
        return account.owns(this);
      }

    });

*super*に関する補足: JavaScriptではsuper - つまりプロトタイプチェーンにおける上位のオブジェクトで定義された同名の関数 - を呼び出す簡単な方法がありません。もしあなたが*set*や*save*の
ようなコア関数をオーバーライドした上で、親クラスの実装の方を使いたい場合、以下の例のように明示的に関数を呼び出すしかありません。

    var Note = Backbone.Model.extend({
      set: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        ...
      }
    });
