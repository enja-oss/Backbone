+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Sync [原文](http://backbonejs.org/#Sync)

**Backbone.sync** is the function that Backbone calls every time it attempts to read or save a model to the server. 
By default, it uses `(jQuery/Zepto).ajax` to make a RESTful JSON request and returns a [jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR).
You can override it in order to use a different persistence strategy, such as WebSockets, XML transport, or Local Storage.

**Backbone.sync**は、サーバへmodelの保存や読込みを試みるたびにBackboneが呼び出す関数です。
初期設定では、RESTful JSON リクエストを行うために（jQueryもしくはZeptoの） `.ajax` を使用します。そして、レスポンスは[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)が返ります。
これをオーバーライドすることでWebSockets、 XML transport、 Local Storageなど、異なる永続化の方法として置き換えることができます。


The method signature of **Backbone.sync**  is `sync(method, model, [options])`

**Backbone.sync** のメソッドシグネイチャは `sync(method, model, [options])` です。

- **method**  – the CRUD method (`"create"`, `"read"`, `"update"`, or `"delete"`)
- **model**  – the model to be saved (or collection to be read)
- **options**  – success and error callbacks, and all other jQuery request options

- **method**  – CRUDメソッド (`"create"`, `"read"`, `"update"`, or `"delete"`)
- **model**  – 保存するModel (もしくは、読込むcollection)
- **options**  – 成功か失敗した場合のコールバック、および他のすべてのjQuery（Ajax）オプション

With the default implementation, when **Backbone.sync** sends up a request to save a model, 
its attributes will be passed, serialized as JSON, and sent in the HTTP body with content-type `application/json` .
When returning a JSON response, send down the attributes of the model that have been changed by the server, 
and need to be updated on the client. 
When responding to a `"read"` request from a collection ([#Collection#fetch](#Collection#fetch)), 
send down an array of model attribute objects.

**Backbone.sync** の既定の動作。
modelを保存する場合、modelの属性値はJSONにシリアライズされてHTTPボディに渡され、コンテントタイプに `application/json` を指定して送信します。
そしてサーバによって変更され、クライアントにて更新が必要なmodelの属性値は、JSONでレスポンスが返ります。
コレクションの `"read"` ([#Collection#fetch](#Collection#fetch)) を使用した場合、複数のmodelオブジェクトが配列となってレスポンスが返されます。


The **sync**  function may be overriden globally as `Backbone.sync`
or at a finer-grained level, by adding a `sync` function to a Backbone
collection or to an individual model.

この **sync** メソッドは、Backboneのコレクションや個々のモデルに `sync` 関数を追加することによって、
`Backbone.sync` と同じグローバルレベルやもっと細かい粒度でオーバーライドできます。


The default **sync**  handler maps CRUD to REST like so:

既定の **sync** が取り扱うCRUDをRESTに置き換えるマップ。

- **create &rarr; POST &nbsp;** `/collection`
- **read &rarr; GET &nbsp;** `/collection[/id]`
- **update &rarr; PUT &nbsp;** `/collection/id`
- **delete &rarr; DELETE &nbsp;** `/collection/id`

As an example, a Rails handler responding to an `"update"` call from
`Backbone` might look like this: *(In real code, never use
* `update_attributes` *blindly, and always whitelist the attributes
you allow to be changed.)*

例として、`Backbone` から呼び出す `"update"` へのRailsの応答ハンドラはこのようになります。
（実際のコードで、`update_attributes` を使用することはありません。常にあなたが変更できるよう属性をホワイトリストに登録してください。）


```javascript
def update
  account = Account.find params[:id]
  account.update_attributes params
  render :json => account
end
```

One more tip for Rails integration is to disable the default namespacing for
`to_json` calls on models by setting `ActiveRecord::Base.include_root_in_json = false`

Railsと統合するためのもうひとつのチップは、モデルからの `to_jsonは` 呼び出しについて
既定の名前空間を無効に設定することです。 `ActiveRecord::Base.include_root_in_json = false`

### emulateHTTP `Backbone.emulateHTTP = true` [原文](http://backbonejs.org/#Sync-emulateHTTP)

If you want to work with a legacy web server that doesn't support Backbones's
default REST/HTTP approach, you may choose to turn on `Backbone.emulateHTTP`.
Setting this option will fake `PUT` and `DELETE` requests with
a HTTP `POST`, setting the `X-HTTP-Method-Override` header
with the true method. If `emulateJSON` is also on, the true method
will be passed as an additional `_method` parameter.

もしBacknone既定のREST/HTTPアプローチをサポートしていないレガシーなWebサーバ上で作業したい場合、`Backbone.emulateHTTP`をオンにしてください。
この関数にtrueを設定して `PUT` や `DELETE` リクエストを要求した場合、`X-HTTP-Method-Override` HTTPリクエストヘッダーを `POST` に偽装してリクエストを要求します。
また、`emulateJSON` メソッドをtrueにした場合、この設定は `_method` パラメータとして渡されます。

```javascript
Backbone.emulateHTTP = true;

model.save();  // POST to "/collection/id", with "_method=PUT" + header.

model.save();  // "_method=PUT" パラメータと一緒に "/collection/id" へ POSTする。

```

### emulateJSON `Backbone.emulateJSON = true` [原文](http://backbonejs.org/#Sync-emulateJSON)

If you're working with a legacy web server that can't handle requests
encoded as `application/json`, setting `Backbone.emulateJSON = true;`
will cause the JSON to be serialized under a `model` parameter, and
the request to be made with a `application/x-www-form-urlencoded`
mime type, as if from an HTML form.

もし `application/json` エンコードを取り扱えないレガシーなWebサーバ上で作業している場合、
`Backbone.emulateJSON = true;` とすることで、JSONは `model` パラメータとしてシリアライズされ
HTMLフォームと同じようにMINEタイプを `application/x-www-form-urlencoded` としてリクエストを要求します。