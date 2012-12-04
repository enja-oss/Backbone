+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.history [原文](http://backbonejs.org/#History)

**History** は(フレームごとに)グローバルなルーターとしてサービスを提供し、`hashcange` イベントや `pushState` を処理して、適切なルートに一致させ、コールバックをトリガします。あなたはこれらのうちひとつも自作する必要はなく -- Router を ruoutes とともに使うとき作られる、 `Backbone.history` への参照を使うべきです。

**pushState** のサポートは Backbone 内で、純粋にオプトインを基本として存在します。`pushState` をサポートしていない古いブラウザでは、ハッシュベースのURLフラグメントを使い続けますが、もし `pushState` 対応ブラウザでハッシュURLに訪れている場合、それは透過的に本当のURLにアップグレードされます。本当のURL群を使うことで、ウェブサーバは正しくそれらのページをレンダリングできなければならず、そのため、バックエンドの変更も必要になります。例えば、`/documents/100` へのルートがある場合、ブラウザでそのURLに直接訪問したら、ウェブサーバはそのページを提供できなければなりません。サーチエンジンが完全にクロールできるようにするには、サーバに完全なページのHTMLを生成させるのが最善です … が、ウェブアプリケーションの場合は、ルートURL用のものと同じ内容だけをレンダリングし、あとはBackboneのビューと JavaScriptがうまく動いて残りを埋めます。

### start `Backbone.history.start([options])` [原文](http://backbonejs.org/#History-start)

Routerがすべて作成され、すべてのルートが適切にセットアップされたら、`Backbone.history.start()` を呼び出して、`hashchange` イベントの監視と、ルートのディスパッチを開始します。

あなたのアプリケーションでHTML5の `pushState` サポートを使いたいということを示すには、`Backbone.history.start({pushState: true})` を使ってください。

もしあなたのアプリケーションがドメインのルートURL `/` で提供されていない場合、ルートが本当はどこにあるのかを、かならず、このようなオプションでHistoryに教えてください: `Backbone.history.start({pushState: true, root: "/public/search/"})`

呼び出されたとき、もし現在のURLにうまくマッチするルートがあれば、`Backbone.history.start()` は `true` を返します。もし現在のURLにマッチするルートが定義されていなければ `false` を返します。

サーバがすでにページ全体をレンダリングしていて、Historyを開始するとき初期ルートはトリガーしないで欲しいときは、`silent: true` を渡します。

Internet Explorer ではハッシュベースの履歴が `<iframe>` に依存しているので、かならずDOMが準備できた後でのみ、`start()` を呼び出すようにしてください。

```javascript
$(function(){
  new WorkspaceRouter();
  new HelpPaneRouter();
  Backbone.history.start({pushState: true});
});
```
