+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.Sync [原文](http://backbonejs.org/#Sync)

**Backbone.sync**は、サーバへmodelの保存や読込みを試みるたびにBackboneが呼び出す関数です。
初期設定では、RESTful JSON リクエストを行うために（jQueryもしくはZeptoの） `.ajax` を使用します。そして、レスポンスは[jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR)が返ります。
WebSockets、 XML transport、 Local Storageなどの異なる永続化の方法を利用する場合はこの関数を置き換えることができます。

**Backbone.sync** のメソッドシグネイチャは `sync(method, model, [options])` です。

- **method**  – CRUDメソッド (`"create"`, `"read"`, `"update"`, or `"delete"`)
- **model**  – 保存するModel (もしくは、読込むcollection)
- **options**  – 成功か失敗した場合のコールバック、および他のすべてのjQuery（Ajax）オプション

**Backbone.sync** の既定の動作。
modelを保存する場合、modelの属性値はJSONにシリアライズされてHTTPボディに渡され、コンテントタイプに `application/json` を指定して送信します。
そしてサーバによって変更され、クライアントにて更新が必要なmodelの属性値は、JSONでレスポンスが返ります。
コレクションの `"read"` ([#Collection#fetch](#Collection#fetch)) を使用した場合、複数のmodelオブジェクトが配列となってレスポンスが返されます。

modelやcollectionがサーバと **sync** を開始するたびに、`"request"`イベントが発火します。
リクエストが正常に完了した場合、`"sync"` イベントを発火します。また、失敗した場合は`"error"`イベントが発火します。

この **sync** メソッドは、Backboneのコレクションや個々のモデルに `sync` 関数を追加することによって、
`Backbone.sync` と同じグローバルレベルやもっと細かい粒度でオーバーライドできます。

既定の **sync** が取り扱うCRUDをRESTに置き換えるマップ。

- **create &rarr; POST &nbsp;** `/collection`
- **read &rarr; GET &nbsp;** `/collection[/id]`
- **update &rarr; PUT &nbsp;** `/collection/id`
- **delete &rarr; DELETE &nbsp;** `/collection/id`

例として、`Backbone` から呼び出す `"update"` へのRailsの応答ハンドラはこのようになります。
_（実際のコードでは `update_attributes` を盲目的に利用することはなく、常に変更できる属性をホワイトリスト化してください。）_

```javascript
def update
  account = Account.find params[:id]
  account.update_attributes params
  render :json => account
end
```

バージョン1.3より前のRailsと統合するためのもうひとつのヒントは、モデルからの `to_jsonは` 呼び出しについて
既定の名前空間を無効に設定することです。 `ActiveRecord::Base.include_root_in_json = false`

### ajax `Backbone.ajax = function(request) { ... };` [原文](http://backbonejs.org/#Sync-ajax)


もしカスタムのAjax関数、また独自の[jQuery.ajax](http://api.jquery.com/jQuery.ajax/)がサポートしていないエンドポイントを使用する場合、
これらを微調整する際には、`Backbone.ajax` プロパティ（デフォルトのBackbone.syncが格納されている）から設定することで行えます。


### emulateHTTP `Backbone.emulateHTTP = true` [原文](http://backbonejs.org/#Sync-emulateHTTP)

もしBackbone既定のREST/HTTPアプローチをサポートしていないレガシーなWebサーバ上で作業したい場合、`Backbone.emulateHTTP`をオンにしてください。
この関数にtrueを設定して `PUT` や `DELETE` リクエストを要求した場合、`X-HTTP-Method-Override` HTTPリクエストヘッダーを `POST` に偽装してリクエストを要求します。
また、`emulateJSON` メソッドをtrueにした場合、この設定は `_method` パラメータとして渡されます。

```javascript
Backbone.emulateHTTP = true;

model.save();  // "_method=PUT" パラメータと一緒に "/collection/id" へ POSTする。

```

### emulateJSON `Backbone.emulateJSON = true` [原文](http://backbonejs.org/#Sync-emulateJSON)

もし `application/json` エンコードを取り扱えないレガシーなWebサーバ上で作業している場合、
`Backbone.emulateJSON = true;` とすることで、JSONは `model` パラメータとしてシリアライズされ
HTMLフォームと同じようにMINEタイプを `application/x-www-form-urlencoded` としてリクエストを要求します。
