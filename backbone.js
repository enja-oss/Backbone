//     Backbone.js 0.9.2

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org
//     ※ 訳注メモ
//     hash - ハッシュ: RubyのHashをイメージしていると思われる。ただしRouterの項では、
//                     URLフラグメントとしてのハッシュを主に指していることに注意。
//     attribute - 属性: Modelが表現する値のフィールドを指して属性と言う。
//     bind - 結びつける: 主にイベントの文脈で使われる。boundも同様。
//     attach, listen, lookup - アタッチ, リッスン, ルックアップ: カナ。
//     view, model, collection, router - ビュー、モデル、コレクション、ルーター: カナ。
//     history - 履歴: 漢字。
//     parameter, browser - パラメータ、ブラウザ: 末尾を長音にしない。
//     元文書: https://github.com/documentcloud/backbone/blob/918edf86d6633e2a0cdfba5d28eae31ca49cbaac/backbone.js
(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).

  // グローバルオブジェクトの参照を保存する（ブラウザでは`window`を指し、サーバー環境
  // では`global`を指す）。
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.

  // `noConflict`が使われたときに、後から復元できるようにしておくために
  // 既存の`Backbone`変数を保存しておく。
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.

  // slice/spliceのローカル参照を作成する。
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.

  // トップレベルの名前空間。Backboneのすべてのクラスとモジュールはこれにアタッチされる。
  // CommonJSとブラウザ環境の両方にエクスポートする。
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.

  // ライブラリの現在のバージョン。`package.json`と同じになるよう保つこと。
  Backbone.VERSION = '0.9.2';

  // Require Underscore, if we're on the server, and it's not already present.

  // もしサーバー環境であって、未定義であればunderscoreをrequireする
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.

  // Backbone実行のため、jQuery、Zepto、Enderのいずれかを自身の`$`変数とする。
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).

  // DOM操作とAjaxコールのために使用されるJavaScriptライブラリをセットする（たとえば
  // `$`変数）。BackboneのデフォルトではjQuery、Zepto、Enderのいずれかを使用するが、
  // `setDomLibrary`メソッドで、それらの代替になるJavaScriptライブラリを注入できる
  // （またはブラウザ外でViewをテストするためのモックライブラリ）。
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.

  // *noConflict*モードでBackbone.jsを実行するとき、`Backbone`変数を以前のものに戻す。
  // そして、このBackboneオブジェクトの参照を返す。
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.

  // 古いHTTPサーバーをサポートするために、`emulateHTTP`を有効にする。
  // このオプションを設定すると、`_method`パラメータと`X-Http-Method-Override`
  // ヘッダーを付与して、擬似的に`"PUT"`と`"DELETE"`をリクエストをする。
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.

  // `application/json`リクエストを直で処理できない古いサーバーをサポートするために、
  // `emulateJSON`を有効にすると ... 代わりに`application/x-www-form-urlencoded`
  // としてリクエストボディをエンコードし、`model`という名前のフォームパラメータとして、
  // modelを送信します。
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // Regular expression used to split event strings

  // イベント文字列を分割する正規表現
  var eventSplitter = /\s+/;

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //

  // *あらゆるObject*とmixinできて、カスタムイベントを提供するモジュールです。
  // あなたはイベントにコールバック関数を`on`で結びつけ、`off`で削除することができ、
  // `trigger`でイベントを発火させ、すべてのコールバックを実行できます。
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, `events`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.

    // スペースによって分割された1つまたは複数のイベントとして`events`を`callback`関数に
    // 結びつける。`"all"`が渡されると、コールバックはすべてのイベント発火に結びつく。
    on: function(events, callback, context) {

      var calls, event, node, tail, list;
      if (!callback) return this;
      events = events.split(eventSplitter);
      calls = this._callbacks || (this._callbacks = {});

      // Create an immutable callback list, allowing traversal during
      //                                    ^^^^^^^^^^^^^^^^^^^^^^^^^
      // modification.  The tail is an empty object that will always be used
      // ^^^^^^^^^^^^^
      // as the next node.

      // 不変なコールバックリストを作成し、変更中の探索を認める。末尾は空のオブジェクトで
      // 常に次のノードとして利用される。
      while (event = events.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {tail: tail, next: list ? list.next : node};
      }

      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `events` is null, removes all bound callbacks for all events.

    // ひとつまたは複数のコールバックを削除する。もし`context`がnullであれば、その関数に
    // よるすべてのコールバックを削除する。もし`callback`がnullであれば、そのイベントの
    // すべてのコールバックを削除する。もし`events`がnullであれば全てのイベントに結び
    // ついたコールバックを削除する。
    off: function(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      // No events, or removing *all* events.

      // イベントがない、または*すべて*のイベントを削除するとき。
      if (!(calls = this._callbacks)) return;
      if (!(events || callback || context)) {
        delete this._callbacks;
        return this;
      }

      // Loop through the listed events and contexts, splicing them out of the
      // linked list of callbacks if appropriate.

      // リストされたイベントとコンテキストをループして、
      // リンクされたコールバックのリストから適切にそれらを取り除く。
      events = events ? events.split(eventSplitter) : _.keys(calls);
      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];
        if (!node || !(callback || context)) continue;
        // Create a new list, omitting the indicated callbacks.

        // 指定されたコールバックを省いて、新しいリストを作成する。
        tail = node.tail;
        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;
          if ((callback && cb !== callback) || (context && ctx !== context)) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).

    // ひとつまたは複数のイベントをトリガーし、結びついたすべてのコールバックを発火する。
    // コールバックにはイベント名ごとに、`trigger`と同じ引数を渡す。
    // (`"all"`として結びつけていない限り、あなたのコールバックは、最初の引数として、
    // 本来のイベント名を受け取るようになる）
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      events = events.split(eventSplitter);
      rest = slice.call(arguments, 1);

      // For each event, walk through the linked list of callbacks twice,
      // first to trigger the event, then to trigger any `"all"` callbacks.

      // それぞれのイベントで、リンクされたコールバックのリストを2回走査し、はじめに
      // イベントをトリガーし、その後に`*all*`のコールバックをトリガーする。
      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
        if (node = all) {
          tail = node.tail;
          args = [event].concat(rest);
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, args);
          }
        }
      }

      return this;
    }

  };

  // Aliases for backwards compatibility.

  // 後方互換のためのエイリアス
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.

  // 定義済みの属性と共に新しいモデルを作成する。クライアントID (`cid`) は自動的に生成
  // されて割り当てられる。
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this.changed = {};
    this._silent = {};
    this._pending = {};
    this.set(attributes, {silent: true});
    // Reset change tracking.

    // 変更の追跡をリセットする。
    this.changed = {};
    this._silent = {};
    this._pending = {};
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.

  // すべての継承メソッドをモデルのプロトタイプにアタッチする。
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.

    // 現在と以前の値と異なる属性のハッシュ。
    changed: null,

    // A hash of attributes that have silently changed since the last time
    // `change` was called.  Will become pending attributes on the next call.

    // `change`が呼ばれたときから、silentな変更があった属性のハッシュ。次のコールされる
    // ときに属性は保留中になる。
    _silent: null,

    // A hash of attributes that have changed since the last `'change'` event
    // began.

    // 最後に`'change'`イベントが呼ばれてから、変更された属性のハッシュ。
    _pending: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.

    // JSON `id`属性のデフォルト名は`"id"`。MongoDBやCounchDBのユーザーは、これを
    // `"_id"`とすることができる。
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // Return a copy of the model's `attributes` object.

    // モデルの`attributes`オブジェクトのコピーを返す。
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.

    // 属性の値を取得する。
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.

    // 属性の値をHTMLエスケープして取得する。
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.get(attr);
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.

    // 属性の値がnullまたはundefinedでなければ、`true`を返す。
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.

    // モデルの属性のハッシュをオブジェクトとしてセットし、silentを選択しない限り
    // `"change"`イベントを発火する。
    set: function(key, value, options) {
      var attrs, attr, val;

      // Handle both `"key", value` and `{key: value}` -style arguments.

      // `"key", value`と`{key: value}`の両スタイルの引数を制御する。
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.

      // 属性とオプションを展開する。
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.

      // バリデーションを実行する。
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.

      // `id`にの変化をチェックする。
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var changes = options.changes = {};
      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};

      // For each `set` attribute...

      // それぞれについて属性を`set`...
      for (attr in attrs) {
        val = attrs[attr];

        // If the new and current value differ, record the change.

        // 新しい値と今の値が異なるとき、変更を記録する。
        if (!_.isEqual(now[attr], val) || (options.unset && _.has(now, attr))) {
          delete escaped[attr];
          (options.silent ? this._silent : changes)[attr] = true;
        }

        // Update or delete the current value.

        // 現在の値を更新または削除する。
        options.unset ? delete now[attr] : now[attr] = val;

        // If the new and previous value differ, record the change.  If not,
        // then remove changes for this attribute.

        // 新しい値と前の値が異なるとき、変更を記録する。この属性が削除されたときは除く。
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this.changed[attr] = val;
          if (!options.silent) this._pending[attr] = true;
        } else {
          delete this.changed[attr];
          delete this._pending[attr];
        }
      }

      // Fire the `"change"` events.

      // `"change"`イベントを発火する。
      if (!options.silent) this.change(options);
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.

    // モデルから属性を削除し、silentを選択しない限り`"change"`イベントを発火する。
    // `unset`は属性が存在しなければ何もしない。
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.

    // モデルのすべての属性をクリアし、silentを選択しない限り`"change"`イベントを発火する。
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.

    // サーバーからモデルをフェッチする。サーバーが示すモデルが、現在の属性と異なるとき、
    // 上書きされて`"change"`インベトを発火する。
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.

    // モデルの属性ハッシュをセットし、モデルをサーバーと同期する。
    // サーバーが返す属性ハッシュが異なるとき、モデルは改めて`set`する。
    save: function(key, value, options) {
      var attrs, current;

      // Handle both `("key", value)` and `({key: value})` -style calls.

      // `"key", value`と`{key: value}`の両スタイルの引数を制御する。
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }
      options = options ? _.clone(options) : {};

      // If we're "wait"-ing to set changed attributes, validate early.

      // 属性の変更を`wait`するときは、先にバリデートする。
      if (options.wait) {
        if (!this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // Regular saves `set` attributes before persisting to the server.

      // サーバーに永続化する前に、属性を`set`として正規の保存を行う。
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.

      // サーバーサイドの保存が成功したあと、クライアントはサーバーサイドの状態に
      // アップデートする（オプション）。
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) {
          delete options.wait;
          serverAttrs = _.extend(attrs || {}, serverAttrs);
        }
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };

      // Finish configuring and sending the Ajax request.

      // 設定を終えて、Ajaxリクエストを送信する。
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.

    // すでに永続化されているモデルをサーバー上から破棄する。それが含まれるコレクション
    // からは楽観的に削除を行う。もし`wait: true`が渡されていれば、削除する前にサーバー
    // のレスポンスを待つ。
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) {
        triggerDestroy();
        return false;
      }

      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };

      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.

    // サーバー上でモデルを示すデフォルトのURL、BackboneのRESTfulなメソッドを利用する
    // 場合は、これをオーバーライドしてコールすべきエンドポイントに変更する。
    url: function() {
      var base = getValue(this, 'urlRoot') || getValue(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.

    // **parse**はレスポンスをモデルに`set`できるように属性のハッシュに変換する。
    // デフォルトの実装は、単純にレスポンスを渡している。
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.

    // 現在のものと同じ固有の属性の新しいモデルを作成する。
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.

    // サーバーに保存されていない場合は、モデルは新規のものでありIDが欠けている。
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.

    // このメソッドをコールすると、モデルの`"change"`イベントと、変更済みの各属性について
    // `"change:attribute"`イベントを手動で発火させる。これをコールすると、モデルを監視
    // しているすべてのオブジェクトが更新されます。
    change: function(options) {
      options || (options = {});
      var changing = this._changing;
      this._changing = true;

      // Silent changes become pending changes.

      // silentな変更を保留中に変更する。
      for (var attr in this._silent) this._pending[attr] = true;

      // Silent changes are triggered.

      // silentな変更をトリガーする。
      var changes = _.extend({}, options.changes, this._silent);
      this._silent = {};
      for (var attr in changes) {
        this.trigger('change:' + attr, this, this.get(attr), options);
      }
      if (changing) return this;

      // Continue firing `"change"` events while there are pending changes.

      // 続けて、保留中の変更について`"change"`イベントを発火する。
      while (!_.isEmpty(this._pending)) {
        this._pending = {};
        this.trigger('change', this, options);
        // Pending and silent changes still remain.

        // 保留中の変更とsilentな変更がまだ残っている。
        for (var attr in this.changed) {
          if (this._pending[attr] || this._silent[attr]) continue;
          delete this.changed[attr];
        }
        this._previousAttributes = _.clone(this.attributes);
      }

      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.

    // 最後の`"change"`イベントから、モデルに変更があったかを判断する。
    // 属性の名前を指定した場合、その属性が変更されたかを判断する。
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.

    // 変更のあったすべての属性を含むオブジェクトまたは、属性に変更がなければfalseを返す。
    // Viewの部分を更新する必要があるかと、または何の属性をサーバーサイドで永続化する
    // 必要があるかを判断するのに便利である。アンセットされた属性には、undefinedが
    // セットされる。またモデルに対する比較として、属性オブジェクトを渡すことができ、
    // 変化*するかどうか*を判断することもできる。
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.

    // 最後に`"change"`イベントが発火したときに記録された、属性の以前の値を取得する。
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.

    // 最後の`"change"`イベント時の、モデルの全ての属性を取得する。
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.

    // 現在モデルが正常な状態かをチェックする。silentな変更を行った場合のみ、*異常*な
    // 状態であることを取得することが可能である。
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. If a specific `error` callback has
    // been passed, call that instead of firing the general `"error"` event.

    // モデルの次の完全な属性セットに対して検証を実行し、すべて有効である場合は`true`を
    // 返す。`error`コールバックを指定して渡されたときは、通常の`"error"`イベントの
    // 代わりにコールされる。
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  //                                                              ^^^^^^^
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // ^^^^^^^^^^^^
  // its models in sort order, as they're added and removed.

  // 順序づいたまたはそうでないモデルセットの標準的なコレクションクラスを提供する。
  // `comparator`が指定されていれば、モデルの並び順を維持するよう追加や削除がされたときに
  // ソートする。
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.

  // コレクションの継承メソッドを定義する。
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.

    // コレクションのデフォルトのモデルは**Backbone.Model**である。ほとんどのケースでは
    // これをオーバーライドすべきである。
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.

    // コレクションを、モデルの属性を配列にしたものとしてJSON表現にする。
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.

    // モデルを追加、またはモデルのリストをセットする。**silent**を指定すれば
    // `add`イベントがそれぞれの新しいモデルで発火するのを抑制する。
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {}, dups = [];
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // invalid models or duplicate models from being added.

      // はじめに、モデルの参照を素のオブジェクトに入れてから、不正なモデルや重複した
      // モデルの追加を防ぐことから始める。
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        cid = model.cid;
        id = model.id;
        if (cids[cid] || this._byCid[cid] || ((id != null) && (ids[id] || this._byId[id]))) {
          dups.push(i);
          continue;
        }
        cids[cid] = ids[id] = model;
      }

      // Remove duplicates.

      // 重複を取り除く。
      i = dups.length;
      while (i--) {
        models.splice(dups[i], 1);
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.

      // 追加されたモデルのイベントをリッスンし、`id`と`cid`でルックアップできるように
      // インデックスを作成する。
      for (i = 0, length = models.length; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.

      // コレクションにモデルを挿入し、必要があれば再ソートし、silentでなければ
      // 各モデルの`add`イベントをトリガーする。
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.

    // モデルまたはモデルのリストを、セット済みから取り除く。silentを指定すれば
    // `remove`イベントがそれぞれのモデルで発生するのを抑制する。
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.

    // コレクションの末尾にモデルを追加する。
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, options);
      return model;
    },

    // Remove a model from the end of the collection.

    // コレクションの末尾からモデルを削除する。
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.

    // コレクションの先頭にモデルを追加する。
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.

    // コレクションの先頭からモデルを削除する。
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Get a model from the set by id.

    // 指定したIDからモデルを取得する。
    get: function(id) {
      if (id == null) return void 0;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.

    // 指定したクライアントIDからモデルを取得する。
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.

    // 与えられたインデックスのモデルを取得する。
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.

    // 属性が一致するモデルたちを返す。`filter`のシンプルなケースとして役に立つ。
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.

    // 強制的にコレクションを自身で再ソートさせる。各アイテムが追加されるたび並び順のソート
    // が維持されている通常の状況下ではこれをコールする必要はない。
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.

    // 指定した属性をコレクション内の各モデルから抽出する。
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.

    // 個別に追加するよりも、より多くのアイテムがあるときに、`add`や`remove`イベントを
    // 発火させずに、新しいモデルのリストで既存のセット全体をリセットすることができる。
    // 最後に`reset`イベントが発火する。
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.

    // このコレクションにおけるモデルのデフォルトセットをフェッチし、それらでコレクションを
    // リセットする。`add: true`が渡されたとき、リセットする代わりにモデルをコレクションに
    // 追加する。
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.

    // コレクションに新しいモデルのインスタンスを作成する。サーバーのレスポンスを待つよう
    // `wait: true`が渡されない限り、モデルはコレクションに即座に追加される。
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.

    // **parse**はレスポンスをモデルのリストとしてコレクションに追加されるように変換する。
    // デフォルトの実装は、単純にレスポンスを渡している。
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.

    // _のchainのプロキシ。Underscoreのコンストラクタに依存しているため、
    // 残りのメソッドを同じようにプロキシすることはできない。
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.

    // すべての内部の状態をリセットする。コレクションがリセットされるときに呼ばれる。
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.

    // モデルまたは属性ハッシュを、コレクションに追加できるように準備する。
    _prepareModel: function(model, options) {
      options || (options = {});
      if (!(model instanceof Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.

    // モデルとコレクションの結びつきを削除する内部メソッド。
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.

    // セットされているモデルがイベントを発火するたびに呼ばれる内部メソッド。
    // モデルのIDが変更されるとき、モデルセットのインデックスを更新する必要がある。
    // それ以外のイベントのときは、単にイベントをプロキシして通す。
    // 他のコレクションに由来した"add"と"remove"イベントは無視される。
    _onModelEvent: function(event, model, collection, options) {
      if ((event == 'add' || event == 'remove') && collection != this) return;
      if (event == 'destroy') {
        this.remove(model, options);
      }
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.

  // UnderscoreのメソッドがCollectionに実装されているようにする。
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.

  // Underscoreのメソッドが`Collection#models`へのプロキシーになるようmixinする。
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.

  // ルーターは、フェイクURLをアクションにマップし、ルートが一致したときにイベントを発火
  // する。静的にセットされていなければ、新しく作成したとき`routes`ハッシュがセットされる。
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  //                                                               ^^^^^^^^
  // parts of route strings.

  // ルート文字列の名前つきパラメータや、
  // 分割されたパーツをマッチングするための正規表現キャッシュ。
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.

  // すべての**Backbone.Router**から継承されるプロパティとメソッドをセットアップする。
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //

    // 手動で単一の名前がついたルートをコールバックに結びつける。例:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.

    // 履歴にfragmentを保存するための、`Backbone.history`への単純なプロキシ。
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.

    // 定義されているすべてのルートを`Backbone.history`に結びつける。
    // 最も一般的なルートをルートマップの下部に指定する振る舞いをサポートするため、
    // ここでルートの順序を逆にする必要がある。
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.

    // 現在地のハッシュに対してマッチングするよう、ルート文字列を正規表現で変換する
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.

    // ルートとそれに一致するURLフラグメントを与えると、抽出されたパラメータの配列を返す。
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.

  // URLフラグメントをベースとした、クロスブラウザな履歴管理を制御する。
  // ブラウザが`onhashchange`をサポートしていなければ、ポーリングにフォールバックする。
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .

  // 先行するハッシュとスラッシュを取り除く正規表現。
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.

  // Microsoft InternextExplorerを検知する正規表現。
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?

  // 履歴制御がすでに始まっているか？
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.

  // すべての**Backbone.History**から継承されるプロパティとメソッドをセットアップする。
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.

    // ハッシュチェンジのポーリングが必要なとき、デフォルトのインターバルは1秒に20回である。
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.

    // 本来のハッシュ値を取得する。Firefoxにおける、location.hashが常にデコードされる
    // バグにより、location.hashを直接取り扱うことはできない。
    getHash: function(windowOverride) {
      var loc = windowOverride ? windowOverride.location : window.location;
      var match = loc.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.

    // クロスブラウザで正規化されたURLを、URL、ハッシュ、またはオーバーライドから取得する。
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = this.getHash();
        }
      }
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.

    // ハッシュの変更制御を始め、現在のURLに既存のルートが一致すれば`true`を返し、
    // そうでなければ`false`を返す。
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?

      // 初期設定を見つけ出す。iframeが必要か？ pushStateが望まれるが、それが有効か？
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.

      // pushStateやハッシュを使用しているどうか、'onhashchange'がサポートされているか
      // どうかに応じて、URLの状態をどのようにチェックするか決定する。
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.

      // pushStateをサポートしないブラウザによって開かれたpushStateリンクのために
      // ベースURLを変更する必要があるかどうかを決定する
      this.fragment = fragment;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...

      // `pushState`が有効なブラウザからのルートで開始したが、現在のブラウザは
      // それをサポートしていないとき...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url

        // ブラウザが新しいURLにリダイレクトするよう、即時returnする。
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...

      // またはハッシュベースのルートで開始したが、現在のブラウザは`pushState`ベースで
      // 代わりにできるとき...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.

    // おそらく一時的に、Backbone.historyを無効にする。実際のアプリでは使えないが、
    // Routerのユニットテストをする際に便利なことがある。
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.

    // フラグメントが変化したときにテストするルートを追加する。ルートが追加されると、
    // 前のルートはオーバーライドされる。
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.

    // ハッシュが変更されたか現在のURLをチェックし、そうであれば`loadUrl`をコールし、
    // 隠されたiframeを横断して正規化する。
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.getHash(this.iframe));
      if (current == this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.

    // 現在のURLフラグメントのロードを試みる。マッチしてルートが成功すれば`true`を返す。
    // 定義されたルートにフラグメントがマッチしなければ、`false`を返す。
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.

    // フラグメントをハッシュ履歴に保存するか、'replace'オプションが指定されたときに
    // URLの状態を置き換える。事前のフラグメントのURLエンコードは、自身で適切に行う。
    //
    // ルートのコールバックを発火したい場合（通常は望ましくない）、オプションオブジェクトに
    // `trigger: true`が含めることができ、また履歴に現在のURLを追加させずに変更したい
    // ときは、`replace: true`がある。
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag) return;

      // If pushState is available, we use it to set the fragment as a real URL.

      // pushStateが有効であれば、それを使って実際のURLのようにフラグメントをセットする。
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.

      // ハッシュの変更が明示的に無効にされていなければ、履歴に保存するためにハッシュを
      // 更新する。
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.

          // IE7以前でハッシュの変更を入れるため、iframeを開いて・閉じるトリックを行う。
          // replaceがtrueであれば、これを行わない。
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.

      // ハッシュ変更ベースの履歴のフォールバックを、明示的に望んでいなければ`navigate`は
      // ページをリフレッシュする。
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // いずれかの現在のエントリを置き換えるか、ブラウザの履歴に新しいものを追加して、
    // ハッシュの位置を更新する。
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...

  // Backbone.Viewをつくると、既存の要素が提供されないとき、DOMの外に初期要素が作られる。
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.

  // `delegate`でキーを分割する正規表現。
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.

  // プロパティとしてマージされるViewのオプションリスト。
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.

  // すべての**Backbone.View**から継承されるプロパティとメソッドをセットアップする。
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.

    // ビュー要素の`tagName`はデフォルトで`"div"`である。
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    //               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    // 要素のルックアップをjQueryに委譲し、現在のビューの中にあるDOM要素達を対象にする。
    // これはグローバルにルックアップ可能な場合、好まれるべきである。
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.

    // **render**は、適切なHTMLで要素 (`this.el`) を生成するために、各自のビューが
    // オーバーライドすべきコア関数である。規則では、**render**は常に`this`を返す。
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.

    // DOMからビューを削除する。注意: ビューはデフォルトではDOMの中にいないため、
    // このメソッドを何も起きないかもしれない。
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //

    // 少量のDOM要素のために本格的なテンプレートを必要としないとき、**make**を使って
    // 1つずつ要素を生成できる。
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.

    // ビューの要素 (`this.el`プロパティ)を変更し、内包するイベントを再委譲する。
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = (element instanceof $) ? element : $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    //                                             ^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.

    // `this.events`ハッシュで示されるコールバックをセットする。
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // ペアになっている。`this`にプロパティをセットされてコールバックはビューに結びつく。
    // 効率性のためにイベントの委譲を使用している。セレクタを省略すると、`this.el`に
    // 結びつけられる。委譲可能なイベントにのみ動作する。`focus`、`blur`はそうでない、
    // またInternet Explorerでは`change`、`submit`、`reset`がそうでない。
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.

    // `delegateEvents`によってビューに結びつけられたコールバックをすべてクリアする。
    // 通常はこれを必要としないが、同じDOM要素に複数のビューをアタッチがされたとき必要に
    // なるかもしれない。
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.

    // 一連のオプションによって、ビューの初期設定を行う。特別な意味をもったキー
    // *(model, collection, id, className)*は、ビューに直接アタッチされる。
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.

    // ビューがrenderのためにDOM要素をもっていることを確認する。もし`this.el`が
    // 文字列であれば、`$()`に渡してマッチした最初の要素を`el`に再度割り当てる。
    // そうでない場合は、`id`、`className`、`tagName`プロパティから要素を生成する。
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.

  // Backboneクラスで使われる自己伝播による拡張をする関数。
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.

  // 継承をモデル、コレクション、ビューにセットアップする。
  Model.extend = Collection.extend = Router.extend = View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.

  // `Backbone.sync`のデフォルト実装が用いる、CRUDをHTTPに置き換えるマップ。
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.

  // モデルをサーバーで永続化させる方法を変更するには、この関数をオーバーライドする。
  // リクエストのタイプと対象のモデルが渡される。デフォルトではModelの`url()`に対して
  // RESTfulなAjaxリクエストを行う。いくつかのカスタマイズの可能性を次に示す。
  //
  // * `setTimeout`を使って、単一のリクエストによるバッチで迅速にアップデートする。
  // * モデルをJSONのかわりにXMLとして送る。
  // * AjaxのかわりにWebScoketsを通してモデルを永続化する。
  //
  // `Backbone.emulateHTTP`を有効にすると、`PUT`と`DELETE`を、`_method`パラメータに
  // 本来のHTTPメソッドを含めた上で`POST`で送信するようになり、リクエスト本文を
  // `application/json`に代わって、`application/x-www-form-urlencoded` として
  // `model`というパラメータと一緒に送信するようになる。**PHP**のように`PUT`リクエスト
  // の本文を読み取るのが難しいサーバーサイドのインターフェースをとる場合に便利である。

  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.

    // 指定しない限りのデフォルトオプション。
    options || (options = {});

    // Default JSON-request options.

    // デフォルトのJSONリクエストオプション。
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.

    // URLを持っているか確かめる。
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.

    // 適切なリクエストデータを持っているか確かめる。
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.

    // 古いサーバーは、リクエストをHTML-form形式にエンコードしてJSONをエミュレートする。
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.

    // 古いサーバーは、`_method`と`X-HTTP-Method-Override`ヘッダに、本来のHTTPメソッド
    // を模倣することで、HTTPをエミュレートする。
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.

    // GETでないリクエストであればデータを処理しない。
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.

    // 任意のAjaxオプションをオーバーライドでき、リクエストを行う。
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.

  // フォールバックのエラーイベントと共にオプションのエラーコールバックをラップする。
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.

  // プロトタイプチェーンの作成を助けるために、空のコンストラクタ関数を共有する。
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.

  // サブクラスのプロトタイプチェーンを正しく設定するヘルパ関数。`goog.inherits`に
  // 似ているがプロトタイププロパティのハッシュを利用し、クラスプロパティを継承する。
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.

    // 新しいサブクラスのコンストラクタ関数は、自分で定義したものか ("constructor"
    // プロパティを`extend`の定義に入れる) デフォルトで単に親のコンストラクタのいずれかを呼ぶ。
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.

    // 親からクラス(静的)プロパティを継承する。
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.

    // `parent`のコンストラクタを呼び出さずに、`parent`からプロトタイプチェーンを継承する。
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.

    // 提供されていれば、サブクラスにプロトタイププロパティ (インスタンスプロパティ) を
    // 追加する。
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.

    // 提供されていれば、コンストラクタ関数に静的なプロパティを追加する。
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.

    // 正しくchildの`prototype.constructor`を設定する。
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.

    // あとから親のプロトタイプが必要になったときに便利なプロパティをセットする。
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.

  // Backboneオブジェクトからプロパティまたは関数として値を得るためのヘルパー関数。
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.

  // URLが必要であるのに提供されていないときにエラーを投げる。
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
