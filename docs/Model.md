+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Model [原文](http://backbonejs.org/#Model)

 **Model** はあらゆるJavaScriptアプリケーションの中核をなすもので、対話形式のデータとデータに関連するロジック、つまり変換、検査、プロパティ値計算、アクセス制御などを含みます。あなたは **Backbone.Model** クラスを継承して、ドメイン固有のメソッドを実装するだけでよく、データ操作に関わる基本的な機能は **Model** クラスが提供します。

以下のコード例は不自然ではありますが、Modelとカスタムメソッド定義の実例です。ここでは属性値をセットし、その属性値変化のイベントを発火してます。このコードを実行すると、`sidebar`がブラウザのウィンドウに追加されるので、実際にさわってみることができます。

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

### extend `Backbone.Model.extend(properties, [classProperties])` [原文](http://backbonejs.org/#Model-extend)
独自の **Model** クラスを作成するには **Backbone.Model** を継承し、インスタンスプロパティを記述します。またオプションで **classProperties** を渡すこともできます。classPropertiesはコンストラクタ関数のプロパティとなります。

 **extend** は適切にプロトタイプチェーンを組み立てるので、もし望むならば **extend** で作成されたサブクラスをさらに継承するサブクラスを作成することもできます。 

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

`super`に関する補足: JavaScriptではsuper - つまりプロトタイプチェーンにおける上位のオブジェクトで定義された同名の関数 - を呼び出す簡単な方法がありません。もしあなたが`set`や`save`の
ようなコア関数をオーバーライドした上で、親クラスの実装の方を使いたい場合、以下の例のように明示的に関数を呼び出すしかありません。

    var Note = Backbone.Model.extend({
      set: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        ...
      }
    });

### constructor / initialize `new Model([attributes])` [原文](http://backbonejs.org/#Model-constructor) 
モデルのインスタンスを生成する際に、引数 **attributes** で属性の初期値を指定することができます。モデルの属性は後から[set](#Model-set)メソッドでも指定できます。もし **initialize** 関数が定義されていれば、モデル生成時に呼び出されます。

    new Book({
      title: "One Thousand and One Nights",
      author: "Scheherazade"
    });

まれなケースでは、風変わりですが、 **constructor** をオーバーライドして、モデルの実際のコンストラクタ関数を書き換えるということもできます。

### get `model.get(attribute)` [原文](http://backbonejs.org/#Model-get) 
モデルの属性の現時点での値を取得します。例：`note.get("title")`

### set `model.set(attributes, [options])` [原文](http://backbonejs.org/#Model-set) 
モデルの(ひとつ、もしくは複数の)属性の値をセットします。いずれかの属性によりモデルの状態が変化した場合、`"change"`イベントが発行されます。オプション引数として`{silent: true}`を指定することでchangeイベントを抑止できます。特定の属性に対してのみchangeイベントを発行することも可能で、`change:title`や`change:content`というふうに記述します。また、キーと値を別々に引数として渡す事も可能です。

    note.set({title: "March 20", content: "In his eyes she eclipses..."});
    
    book.set("title", "A Scandal in Bohemia");

モデルが[validate](#Model-validate)メソッドを持つ場合、属性値がセットされる前に検査が実行されます。もし検査に失敗すれば何も変更されず、 **set** は`false`を返します。検査に成功すれば、 **set** はモデルへの参照を返します。オプション引数に`error`コールバック関数を渡す事も出ます。その場合、検査に失敗すれば`"error"`イベントが発行される代わりにコールバック関数が呼ばれます。オプション引数に`{silent: true}`を指定することで、検査をスキップすることができます。

### escape `model.escape(attribute)` [原文](http://backbonejs.org/#Model-escape) 
このメソッドは[get](#Model-get)と似ていますが、HTMLエスケープされた属性値を返すという点で異なります。モデルから得たデータをHTMLに書き込む場合、 **escape** 経由で属性値を取得することで[XSS](http://ja.wikipedia.org/wiki/クロスサイトスクリプティング)攻撃を防ぐことができます。

    var hacker = new Backbone.Model({
      name: "<script>alert('xss')</script>"
    });
    
    alert(hacker.escape('name'));

### has `model.has(attribute)` [原文](http://backbonejs.org/#Model-has) 
属性に値がセットされている場合、つまり属性値がnullでもundefinedでもない場合、`true`を返します。

    if (note.has("title")) {
      ...
    }

### unset `model.unset(attribute, [options])` [原文](http://backbonejs.org/#Model-unset) 
属性を削除します。属性はモデル内部のハッシュから削除されます。オプションに`silent`が指定されない限り、`"change"`イベントが発火します。

### clear `model.clear([options])` [原文](http://backbonejs.org/#Model-clear) 
モデルのすべての属性を削除します。`silent`プロパティが指定されない限り、`"change"`イベントが発火します。

### id `model.id` [原文](http://backbonejs.org/#Model-id) 
 **id** はモデルの特別な属性で、任意の文字列(数値やUUID)が指定可能です。属性に **id** を指定した場合、直接モデルのプロパティとしてコピーされます。モデルはコレクション内でidで特定可能です。また、デフォルトではモデルのURLを生成するためにidが使われます。

### idAttribute `model.idAttribute` [原文](http://backbonejs.org/#Model-idAttribute) 
モデルは`id`属性のもとで一意に特定されますが、CouchDBやMongoDB等、異なる名前のキーを使用するバックエンドに接続する場合、それらのキーと`id`属性を透過的にマッピングするために、`idAttribute`属性をセットしてください。

    var Meal = Backbone.Model.extend({
      idAttribute: "_id"
    });
    
    var cake = new Meal({ _id: 1, name: "Cake" });
    alert("Cake id: " + cake.id);

### cid `model.cid` [原文](http://backbonejs.org/#Model-cid) 
 **cid** (クライアントid)はモデルの特別な属性で、モデルが最初に作成されるときに自動的に付与されます。モデルがまだサーバに保存されておらず、最終的な **id** を持たない状況において、クライアントidを使うと便利です。クライアントidは`c1, c2, c3...`のような値をとります。

### attributes `model.attributes` [原文](http://backbonejs.org/#Model-attributes) 
 **attributes** はモデルの状態を保持した内部的なハッシュです。属性を更新するには、attributesを直接変更するのではなく、[set](#Model-set)を使ってください。また、属性値のコピーを取得したい場合は[toJSON](#Model-toJSON)を使ってください。

### changed `model.changed` [原文](http://backbonejs.org/#Model-changed) 
 **changed** 属性は最後に`"change"`イベントが発行されて以来変更されたすべての属性を含む内部ハッシュです。[set](#Model-set)メソッドと[change](#Model-change)イベントにより内部状態が保たれているため、 **changed** を直接変更しないでください。 **changed** のコピーは[changedAttributes](#Model-changedAttributes)により取得できます。

### defaults `model.defaults or model.defaults()` [原文](http://backbonejs.org/#Model-defaults) 
 **defaults** ハッシュ(もしくは関数)はモデルのデフォルト属性を指定するために使用されます。モデルのインスタンスを生成する際に、値が明示的に指定されなかった属性はこのデフォルト値がセットされます。

    var Meal = Backbone.Model.extend({
      defaults: {
        "appetizer":  "caesar salad",
        "entree":     "ravioli",
        "dessert":    "cheesecake"
      }
    });
    
    alert("Dessert will be " + (new Meal).get('dessert'));

*JavaScriptではオブジェクトは参照として渡されます。つまり、オブジェクトをデフォルト値として指定した場合、それはすべてのインスタンスにより共有されます。*

### toJSON `model.toJSON()` [原文](http://backbonejs.org/#Model-toJSON) 
JSON.stringifyから呼び出され、モデルの[attributes](#Model-attributes)属性のコピーを返します。このメソッドはViewに渡す前に属性値を永続化／シリアライズするために使用されます。実際にはJSON文字列を返すわけではないので、メソッド名はいささか混乱を招くかもしれませんが、[JavaScriptのtoJSONとJSON.stringify](https://developer.mozilla.org/ja/docs/JSON#toJSON()_method)もそのように動作します。

    var artist = new Backbone.Model({
      firstName: "Wassily",
      lastName: "Kandinsky"
    });
    
    artist.set({birthday: "December 16, 1866"});
    
    alert(JSON.stringify(artist));

### fetch `model.fetch([options])` [原文](http://backbonejs.org/#Model-fetch) 
サーバから取得したデータでモデルの状態をリセットします。処理は[Backbone.sync](#Sync)へ委譲されます。[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)オブジェクトを返します。モデルがまだ初期化されていない場合や、サーバの最新状態を反映したい場合に使います。サーバから取得したデータが現在の属性値と異なる場合、`"change"`イベントが発行されます。オプションとして`success`および`error`コールバックを受け取ります。それぞれのコールバックの引数は順に`(model, response, options)`および`(model, xhr, options)`となります。

    // Poll every 10 seconds to keep the channel model up-to-date.
    setInterval(function() {
      channel.fetch();
    }, 10000);

### save `model.save([attributes], [options])` [原文](http://backbonejs.org/#Model-save) 
モデルをデータベース(もしくは他の永続データレイヤー)に保存します。処理は[Backbone.sync](#Sync)へ委譲されます。検査に成功した場合は[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)オブジェクトを返し、それ以外は`false`を返します。引数の **attributes** ハッシュは、([set](#Model-set)と同様)変更対象の属性を含みます。ここに含まれていないキーは変更の対象になりませんが、サーバへは完全なリソースが送られます。`set`と同様、ハッシュの代わりにキーと値を別々に引数として渡す事も可能です。もしモデルが[validate](#Model-validate)メソッドを持っており、検査に失敗した場合、モデルは保存されません。もしモデルが[isNew](#Model-isNew)でtrueを返す場合、saveメソッドは`"create"`(HTTP `POST`)となり、もしモデルがサーバにすでに存在している場合、`"update"`(HTTP `PUT`)となります。

`save`呼び出しにより新しい属性が渡されると、`"change"`イベントが即座に発行されます。そしてサーバが変更を正常に反映した後に`"sync"`イベントが発行されます。モデルに新しい属性をセットする前にサーバをの応答を待つ場合は`{wait: true}`を渡します。

以下の例では、オーバーライドされた`Backbone.sync`がどのようにリクエストを受けるか着目してください。初回のモデル保存では`"create"`を、２回目は`"update"`のリクエストを受けます。

    Backbone.sync = function(method, model) {
      alert(method + ": " + JSON.stringify(model));
      model.id = 1;
    };
    
    var book = new Backbone.Model({
      title: "The Rough Riders",
      author: "Theodore Roosevelt"
    });
    
    book.save();
    
    book.save({author: "Teddy"});

 **save** はオプションとして`sucess`および`error`コールバックを受け取ります。それぞれのコールバックの引数は順に`(model, response, options)`および`(model, xhr, options)`となります。モデルが`validate`メソッドを持っていて、検査に失敗したときにも`error`コールバックが呼ばれます。サーバ側で失敗した場合は、`200`以外のHTTPレスポンスコードとともに、エラーがテキストもしくはJSONの形式で返却されます。

    book.save("author", "F.D.R.", {error: function(){ ... }});

### destroy `model.destroy([options])` [原文](http://backbonejs.org/#Model-destroy) 
サーバにあるモデルを削除します。処理はHTTP `DELETE`リクエストとして[Backbone.sync](#Sync)へ委譲されます。成功した場合は[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)オブジェクトを返します。モデルが[isNew](#Model-isNew)でtrueを返す状態である場合、このメソッドは`false`を返します。オプションとして`sucess`および`error`コールバックを受け取ります。それぞれのコールバックの引数は順に`(model, response, options)`および`(model, xhr, options)`となります。このメソッドを呼び出すことにより`"destroy"`イベントが発行され、モデルを包含するすべてのコレクションに対して下から上に通知されます。そしてサーバが削除を正常に反映した後に`"sync"`イベントが発行されます。モデルをコレクションから削除する前にサーバをの応答を待つ場合は`{wait: true}`を渡します。

    book.destroy({success: function(model, response) {
      ...
    }});

### validate `model.validate(attributes)` [原文](http://backbonejs.org/#Model-validate) 
このメソッドは未定義ですが、もしJavaScriptで実行可能な検査をお持ちでしたら、ご自身でオーバーライドして独自の検査ロジックを記述することをお勧めします。 **validate** は`set`と`save`が実行される直前に呼び出され、`set`もしくは`save`により更新された属性値が引数として渡されます。もしこれら属性値が正しければ **validate** メソッドは戻り値として何も返さないでください。もし属性値が不正な場合、ご自身で定義したエラー値を返してください。単純にエラーメッセージの文字列を返すだけでもかまいませんし、プログラム的にエラーを記述した完全なエラーオブジェクトを返す事も可能です。もし **validate** がエラーを返した場合、`set`および`save`は続行されず、モデルの属性は変更されません。検査に失敗した場合は`"error"`イベントが発行されます。

    var Chapter = Backbone.Model.extend({
      validate: function(attrs) {
        if (attrs.end < attrs.start) {
          return "can't end before it starts";
        }
      }
    });
    
    var one = new Chapter({
      title : "Chapter One: The Beginning"
    });
    
    one.on("error", function(model, error) {
      alert(model.get("title") + " " + error);
    });
    
    one.set({
      start: 15,
      end:   10
    });

`"error"`イベントは、モデルもしくはコレクションのレベルでのざっくりとしたエラーメッセージを提供するのに便利ですが、直接`error`コールバックを指定する事で特定のエラーをより適切に扱うことができます。errorコールバックを指定することで処理がオーバーライドされ、"error"イベントは発生しなくなります。

    account.set({access: "unlimited"}, {
      error: function(model, error) {
        alert(error);
      }
    });

### isValid `model.isValid()` [原文](http://backbonejs.org/#Model-isValid) 
明示的でない方法で変更された場合、モデルはinvalidな状態になります。(もっともそのような方法はformの入力を扱うときに便利なのですが。)モデルが現在validかどうか`validate`関数をもとにチェックするには、`model.isValid()`をお使いください。

### url `model.url()` [原文](http://backbonejs.org/#Model-url) 
サーバ上のモデルのリソースの相対URLを返します。モデルが別の場所に格納されている場合、このメソッドを正しい実装でオーバーライドしてください。`"/[collection.url]/[id]"`という形式のURLが生成されます。モデルがコレクションの一部でない場合は`"/[urlRoot]/id"`となります。

URL生成時に[Collection#url](#Collection-url)が呼ばれるので適切に実装してください。もしくはクラス内のすべてのモデルが共通のルートURLを持つ場合は[urlRoot](#Model-urlRoot)プロパティを定義してください。例えばid属性が`101`のモデルがあったとします。このモデルが`"/documents/7/notes"`という`url`で[Backbone.Collection](#Collection)に格納されている場合、このモデルのURLは`"/documents/7/notes/101"`となります。

### urlRoot `model.urlRoot or model.urlRoot()` [原文](http://backbonejs.org/#Model-urlRoot) 
モデルがコレクションに属さない場合、`urlRoot`を指定してください。これにより、デフォルトの[url](#Model-url)関数はモデルのidをもとに`"/[urlRoot]/id"`のようなURLを生成するようになります。
`urlRoot`は関数としても定義可能です。

    var Book = Backbone.Model.extend({urlRoot : '/books'});
    
    var solaris = new Book({id: "1083-lem-solaris"});
    
    alert(solaris.url());

### parse `model.parse(response)` [原文](http://backbonejs.org/#Model-parse) 
[fetch](#Model-fetch)や[save](#Model-save)の結果、サーバからモデルのデータを受け取った際に、 **parse** が呼び出されます。この関数は生の`response`オブジェクトを引数として受け取り、モデルに[set](#Model-set)で渡す属性値を戻り値として返します。デフォルトの実装は何もしません。つまり単に受け取ったJSONレスポンスをそのまま返します。既存のAPIやネームスペースに合わせるためにレスポンスを処理する必要がある場合は、この関数をオーバーライドしてください。

バックエンドにRailsを使う場合、Railsの`to_json`のデフォルト実装はモデル名の配下に属性が含まれるので、Backbone全体でこの動作を無効にするには以下のように設定してください。

    ActiveRecord::Base.include_root_in_json = false

### clone `model.clone()` [原文](http://backbonejs.org/#Model-clone) 
このモデルと全く同じ属性値を持つインスタンスを新たに作成して返します。

### isNew `model.isNew()` [原文](http://backbonejs.org/#Model-isNew) 
モデルがまだ一度もサーバに保存された事がないかどうか、を返します。モデルがまだ`id`を持っていない場合はnewと見なされます。

### change `model.change()` [原文](http://backbonejs.org/#Model-change) 
手動で`"change"`イベント、もしくは変更された各属性に対して`"change:attribute"`イベントを発行するための関数です。setメソッドに`{silent: true}`を渡して、モデルに対する急な変更をいったんとりまとめて、すべての変更が完了した時点で`model.change()`を呼び出す、という使い方をします。

### hasChanged `model.hasChanged([attribute])` [原文](http://backbonejs.org/#Model-hasChanged) 
最後に`"change"`イベントが発行されて以来、モデルが変更されたかどうかを返します。引数 **attribute** が渡された場合、指定された属性が変更されたか場合にのみ`true`を返します。

*このメソッドと後続のchange関連のメソッドは、`"change"`イベントの処理中にのみ有用です。*

    book.on("change", function() {
      if (book.hasChanged("title")) {
        ...
      }
    });

### changedAttributes `model.changedAttributes([attributes])` [原文](http://backbonejs.org/#Model-changedAttributes) 
モデルの変更された属性のみを返します。オプション引数として **attributes** を外から渡す事もできます。その場合は、渡された属性のうち、モデルと値が異なるもののみ返却します。ビューのどの部分を更新すべきか調べる場合や、変更をサーバと同期するためにどのような関数呼び出しが必要か調べる場合にこのメソッドが使えます。

### previous `model.previous(attribute)` [原文](http://backbonejs.org/#Model-previous) 
`"change"`イベントの処理中にこのメソッドを使う事で、属性の変更前の値を取得できます。

    var bill = new Backbone.Model({
      name: "Bill Smith"
    });
    
    bill.on("change:name", function(model, name) {
      alert("Changed name from " + bill.previous("name") + " to " + name);
    });
    
    bill.set({name : "Bill Jones"});

### previousAttributes `model.previousAttributes()` [原文](http://backbonejs.org/#Model-previousAttributes) 
モデルの変更前の属性値のコピーを返します。モデルのバージョン間の差分を取得する際や、エラー発生時に正常な状態に復旧する場合に使えます。
