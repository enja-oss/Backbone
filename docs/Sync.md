+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Sync [原文](http://backbonejs.org/#Sync)

**Backbone.sync** is the function that Backbone calls every time it attempts to read or save a model to the server. By default, it uses `(jQuery/Zepto).ajax` to make a RESTful JSON request and returns a [jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR). You can override it in order to use a different persistence strategy, such as WebSockets, XML transport, or Local Storage.
あなたはこれをoverrideすることでWebSockets、 XML transport、 Local Storageなど、異なる永続化戦略として使用することができます。


The method signature of **Backbone.sync**  is `sync(method, model, [options])`

- **method**  – the CRUD method (`"create"`, `"read"`, `"update"`, or `"delete"`)
- **model**  – the model to be saved (or collection to be read)
- **options**  – success and error callbacks, and all other jQuery request options

With the default implementation, when **Backbone.sync** sends up a request to save a model, its attributes will be passed, serialized as JSON, and sent in the HTTP body with content-type `application/json` 
When returning a JSON response, send down the attributes of the  model that have been changed by the server, and need to be updated on the client. When responding to a `"read"` request from a collection ([#Collection#fetch](#Collection#fetch)), send down an array of model attribute objects.
デフォルトの実装は、**Backbone.sync**がmodelを保存するように要求を出した場合の、その属性はHTTP Bodyの中にシリアライズされたJSON形式で渡されます。content-typeには`application/json`が指定されます。
JSONレスポンスが帰ってきたとき。サーバによって変更されたModelの属性、クライアントが更新するための

The **sync**  function may be overriden globally as `Backbone.sync`
or at a finer-grained level, by adding a `sync` function to a Backbone
collection or to an individual model.
この**sync**メソッドは、グローバルの`Backbone.sync`やもっと細かいレベルでオーバーライドされているかもしれない。

The default **sync**  handler maps CRUD to REST like so:
既定の**sync**CRUD表はRESTのようになっています。

- **create &rarr; POST &nbsp;** `/collection`
- **read &rarr; GET &nbsp;** `/collection[/id]`
- **update &rarr; PUT &nbsp;** `/collection/id`
- **delete &rarr; DELETE &nbsp;** `/collection/id`

As an example, a Rails handler responding to an `"update"` call from
`Backbone` might look like this: *(In real code, never use
* `update_attributes` *blindly, and always whitelist the attributes
you allow to be changed.)*

```javascript
def update
  account = Account.find params[:id]
  account.update_attributes params
  render :json => account
end
```

One more tip for Rails integration is to disable the default namespacing for
`to_json` calls on models by setting `ActiveRecord::Base.include_root_in_json = false`


### emulateHTTP `Backbone.emulateHTTP = true` [原文](http://backbonejs.org/#Sync-emulateHTTP)

If you want to work with a legacy web server that doesn't support Backbones's
default REST/HTTP approach, you may choose to turn on `Backbone.emulateHTTP`.
Setting this option will fake `PUT` and `DELETE` requests with
a HTTP `POST`, setting the `X-HTTP-Method-Override` header
with the true method. If `emulateJSON` is also on, the true method
will be passed as an additional `_method` parameter.
もしあなたが、Backnone既定のREST/HTTPアプローチをサポートしていないレガシーなWebサーバを使いたい場合、`Backbone.emulateHTTP`を使うようになるかもしれない。
このメソッドにtrueに設定して `PUT` や `DELETE` リクエストを要求した場合、HTTPリクエストヘッダーの `X-HTTP-Method-Override` を `POST` に変更してリクエストを偽装します。
また、`emulateJSON` メソッドをtrueにした場合、リクエストパラメータに `_method` を追加して渡されます。

```javascript
Backbone.emulateHTTP = true;

model.save();  // POST to "/collection/id", with "_method=PUT" + header.
```

### emulateJSON `Backbone.emulateJSON = true` [原文](http://backbonejs.org/#Sync-emulateJSON)

If you're working with a legacy web server that can't handle requests
encoded as `application/json`, setting `Backbone.emulateJSON = true;`
will cause the JSON to be serialized under a `model` parameter, and
the request to be made with a `application/x-www-form-urlencoded`
mime type, as if from an HTML form.
