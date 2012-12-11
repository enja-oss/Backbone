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

  // グローバルオブジェクトの参照を保存する（ブラウザでは`window`を指し、サーバー環境
  // では`global`を指す）。
  var root = this;

  // `noConflict`が使われたときに、後から復元できるようにしておくために
  // 既存の`Backbone`変数を保存しておく。
  var previousBackbone = root.Backbone;

  // slice/spliceのローカル参照を作成する。
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // トップレベルの名前空間。Backboneのすべてのパブリックのクラスとモジュールはこれにアタッチされる。
  // CommonJSとブラウザ環境の両方にエクスポートする。
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // ライブラリの現在のバージョン。`package.json`と同じになるよう保つこと。
  Backbone.VERSION = '0.9.2';

  // もしサーバー環境であって、未定義であればunderscoreをrequireする
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // Backbone実行のため、jQuery、Zepto、Enderのいずれかが`$`変数を所有する。
  var $ = root.jQuery || root.Zepto || root.ender;

  // DOM操作とAjaxコールのために使用されるJavaScriptライブラリをセットする（たとえば
  // `$`変数）。BackboneのデフォルトではjQuery、Zepto、Enderのいずれかを使用するが、
  // `setDomLibrary`メソッドで、それらの代替になるJavaScriptライブラリを注入できる
  // （またはブラウザ外でViewをテストするためのモックライブラリ）。
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // *noConflict*モードでBackbone.jsを実行するとき、`Backbone`変数を以前のものに戻す。
  // そして、このBackboneオブジェクトの参照を返す。
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // 古いHTTPサーバーをサポートするために、`emulateHTTP`を有効にする。
  // このオプションを設定すると、`_method`パラメータと`X-Http-Method-Override`
  // ヘッダーを付与して、擬似的に`"PUT"`と`"DELETE"`をリクエストをする。
  Backbone.emulateHTTP = false;

  // `application/json`リクエストを直で処理できない古いサーバーをサポートするために、
  // `emulateJSON`を有効にすると ... 代わりに`application/x-www-form-urlencoded`
  // としてリクエストボディをエンコードし、`model`という名前のフォームパラメータとして、
  // modelを送信します。
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // イベント文字列を分割する正規表現
  var eventSplitter = /\s+/;

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

    // スペースによって分割された1つまたは複数のイベントとして`events`を`callback`関数に
    // 結びつける。`"all"`が渡されると、コールバックはすべてのイベント発火に結びつく。
    on: function(events, callback, context) {

      var calls, event, node, tail, list;
      if (!callback) return this;
      events = events.split(eventSplitter);
      calls = this._callbacks || (this._callbacks = {});

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

    // ひとつまたは複数のコールバックを削除する。もし`context`がnullであれば、その関数に
    // よるすべてのコールバックを削除する。もし`callback`がnullであれば、そのイベントの
    // すべてのコールバックを削除する。もし`events`がnullであれば全てのイベントに結び
    // ついたコールバックを削除する。
    off: function(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      // イベントがない、または*すべて*のイベントを削除するとき。
      if (!(calls = this._callbacks)) return;
      if (!(events || callback || context)) {
        delete this._callbacks;
        return this;
      }

      // リストされたイベントとコンテキストをループして、
      // リンクされたコールバックのリストから適切にそれらを取り除く。
      events = events ? events.split(eventSplitter) : _.keys(calls);
      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];
        if (!node || !(callback || context)) continue;

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

    // ひとつまたは複数のイベントをトリガーし、結びついたすべてのコールバックを発火する。
    // コールバックにはイベント名ごとに、`trigger`と同じ引数を渡す。
    // (`"all"`を利用していない限りは、コールバックは本来のイベント名を最初の引数として
    // を受け取る）
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      events = events.split(eventSplitter);
      rest = slice.call(arguments, 1);

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

  // 後方互換のためのエイリアス
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Backbone.Model
  // --------------

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

    // 変更の追跡をリセットする。
    this.changed = {};
    this._silent = {};
    this._pending = {};
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // すべての継承可能なメソッドをモデルのプロトタイプにアタッチする。
  _.extend(Model.prototype, Events, {

    // 現在と以前の値と異なる属性のハッシュ。
    changed: null,

    // 最後に`change`が呼ばれたときから、silentな変更があった属性のハッシュ。
    // 次にコールされた場合、この属性は保留中となる。
    _silent: null,

    // 最後に`'change'`イベントが呼ばれてから、変更された属性のハッシュ。
    _pending: null,

    // JSON `id`属性のデフォルト名は`"id"`。MongoDBやCounchDBのユーザーは、これを
    // `"_id"`とすることができる。
    idAttribute: 'id',

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // モデルの`attributes`オブジェクトのコピーを返す。
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // 属性の値を取得する。
    get: function(attr) {
      return this.attributes[attr];
    },

    // 属性の値をHTMLエスケープして取得する。
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.get(attr);
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // 属性の値がnullまたはundefinedでなければ、`true`を返す。
    has: function(attr) {
      return this.get(attr) != null;
    },

    // モデルの属性のハッシュをオブジェクトとしてセットし、silentを選択しない限り
    // `"change"`イベントを発火する。
    set: function(key, value, options) {
      var attrs, attr, val;

      // `"key", value`と`{key: value}`の両スタイルの引数を制御する。
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // 属性とオプションを展開する。
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // バリデーションを実行する。
      if (!this._validate(attrs, options)) return false;

      // `id`の変化をチェックする。
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var changes = options.changes = {};
      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};

      // それぞれについて属性を`set`...
      for (attr in attrs) {
        val = attrs[attr];

        // 新しい値と今の値が異なるとき、変更を記録する。
        if (!_.isEqual(now[attr], val) || (options.unset && _.has(now, attr))) {
          delete escaped[attr];
          (options.silent ? this._silent : changes)[attr] = true;
        }

        // 現在の値を更新または削除する。
        options.unset ? delete now[attr] : now[attr] = val;

        // 前の値が異なる場合に変更を記録し、そうでない場合はこの属性への変更を削除する。
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this.changed[attr] = val;
          if (!options.silent) this._pending[attr] = true;
        } else {
          delete this.changed[attr];
          delete this._pending[attr];
        }
      }

      // `"change"`イベントを発火する。
      if (!options.silent) this.change(options);
      return this;
    },

    // モデルから属性を削除し、silentを選択しない限り`"change"`イベントを発火する。
    // `unset`は属性が存在しなければ何もしない。
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // モデルのすべての属性をクリアし、silentを選択しない限り`"change"`イベントを発火する。
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

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

    // モデルの属性ハッシュをセットし、モデルをサーバーと同期する。
    // サーバーが返す属性ハッシュが異なるとき、モデルは改めて`set`する。
    save: function(key, value, options) {
      var attrs, current;

      // `("key", value)`と`({key: value})`の両スタイルの引数を制御する。
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }
      options = options ? _.clone(options) : {};

      // 属性の変更を`wait`するときは、先にバリデートする。
      if (options.wait) {
        if (!this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // サーバーに永続化する前に、属性を`set`として正規の保存を行う。
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

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

      // 設定を終えて、Ajaxリクエストを送信する。
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // すでに永続化されているモデルをサーバー上から破棄する。
    // それが含まれるコレクションからは楽観的に削除を行う。
    // もし`wait: true`が渡されていれば、削除する前にサーバーのレスポンスを待つ。
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

    // サーバー上でモデルを示すデフォルトのURL、BackboneのRESTfulなメソッドを利用する
    // 場合は、これをオーバーライドしてコールすべきエンドポイントに変更する。
    url: function() {
      var base = getValue(this, 'urlRoot') || getValue(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse**はレスポンスをモデルに`set`できるように属性のハッシュに変換する。
    // デフォルトの実装は、単純にレスポンスを渡している。
    parse: function(resp, xhr) {
      return resp;
    },

    // 現在のものと同じ固有の属性の新しいモデルを作成する。
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // サーバーに保存されていない場合は、モデルは新規のものでありIDが欠けている。
    isNew: function() {
      return this.id == null;
    },

    // このメソッドをコールすると、モデルの`"change"`イベントと、変更済みの各属性について
    // `"change:attribute"`イベントを手動で発火させる。これをコールすると、モデルを監視
    // しているすべてのオブジェクトが更新されます。
    change: function(options) {
      options || (options = {});
      var changing = this._changing;
      this._changing = true;

      // silentな変更を保留中に変更する。
      for (var attr in this._silent) this._pending[attr] = true;

      // silentな変更をトリガーする。
      var changes = _.extend({}, options.changes, this._silent);
      this._silent = {};
      for (var attr in changes) {
        this.trigger('change:' + attr, this, this.get(attr), options);
      }
      if (changing) return this;

      // 保留中の変更がある場合は`"change"`イベントを発火し続ける。
      while (!_.isEmpty(this._pending)) {
        this._pending = {};
        this.trigger('change', this, options);

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

    // 最後の`"change"`イベントから、モデルに変更があったかを判断する。
    // 属性の名前を指定した場合、その属性が変更されたかを判断する。
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

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

    // 最後に`"change"`イベントが発火したときに記録された属性の値を取得する。
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // 最後の`"change"`イベント時の、モデルの全ての属性を取得する。
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // 現在モデルが正常な状態かをチェックする。silentな変更を行った場合のみ、*異常*な
    // 状態であることを取得することが可能である。
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // モデルの次の完全な属性セットに対して検証を実行し、
    // すべて有効である場合は`true`を返す。
    // 特定の`error`コールバックを指定して渡されたときは、
    // 通常の`"error"`イベントの代わりにコールされる。
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

  // 並び順に関わらずモデルのセット用に標準的なコレクションクラスを提供する。
  // `comparator`が指定されている場合、コレクションはモデルが追加、
  // あるいは削除された状態のままの並び順を保持する
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // コレクションの継承メソッドを定義する。
  _.extend(Collection.prototype, Events, {

    // コレクションのデフォルトのモデルは**Backbone.Model**である。ほとんどのケースでは
    // これをオーバーライドすべきである。
    model: Model,

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // コレクションを、モデルの属性を配列にしたものとしてJSON表現にする。
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // モデル、あるいはモデルのリストをセットする。**silent**を指定すれば
    // `add`イベントがそれぞれの新しいモデルで発火するのを抑制する。
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {}, dups = [];
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // まず始めに素のオブジェクトをモデルの参照に変更し、
      // それから不正なモデルや重複したモデルが追加されるのを防ぐ。
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

      // 重複を取り除く。
      i = dups.length;
      while (i--) {
        models.splice(dups[i], 1);
      }

      // 追加されたモデルのイベントをリッスンし、`id`と`cid`でルックアップできるように
      // インデックスを作成する。
      for (i = 0, length = models.length; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

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

    // モデルまたはモデルのリストをセットから取り除く。silentを指定すれば
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

    // コレクションの末尾にモデルを追加する。
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, options);
      return model;
    },

    // コレクションの末尾からモデルを削除する。
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // コレクションの先頭にモデルを追加する。
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // コレクションの先頭からモデルを削除する。
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // 指定したIDからモデルを取得する。
    get: function(id) {
      if (id == null) return void 0;
      return this._byId[id.id != null ? id.id : id];
    },

    // 指定したクライアントIDからモデルを取得する。
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // 与えられたインデックスのモデルを取得する。
    at: function(index) {
      return this.models[index];
    },

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

    // 指定した属性をコレクション内の各モデルから抽出する。
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

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

    // **parse**はレスポンスをモデルのリストとしてコレクションに追加されるように変換する。
    // デフォルトの実装は、単純にレスポンスを渡している。
    parse: function(resp, xhr) {
      return resp;
    },

    // _のchainのプロキシ。Underscoreのコンストラクタに依存しているため、
    // 残りのメソッドを同じようにプロキシすることはできない。
    chain: function () {
      return _(this.models).chain();
    },

    // すべての内部の状態をリセットする。コレクションがリセットされるときに呼ばれる。
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

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

    // モデルとコレクションの結びつきを削除する内部メソッド。
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

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

  // コレクションに実装したいUnderscoreのメソッド集。
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Underscoreのメソッドが`Collection#models`へのプロキシーになるようmixinする。
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // ルーターは、フェイクURLをアクションにマップし、ルートが一致したときにイベントを発火
  // する。静的にセットされていなければ、新しく作成したとき`routes`ハッシュがセットされる。
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // ルート文字列の名前つきパラメータや、
  // 分割されたパーツをマッチングするための正規表現キャッシュ。
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // すべての**Backbone.Router**から継承されるプロパティとメソッドをセットアップする。
  _.extend(Router.prototype, Events, {

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

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

    // 履歴にfragmentを保存するための、`Backbone.history`への単純なプロキシ。
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

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

    // 現在地のハッシュに対してマッチングするよう、ルート文字列を正規表現で変換する
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // ルートとそれに一致するURLフラグメントを与えると、抽出されたパラメータの配列を返す。
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // URLフラグメントをベースとした、クロスブラウザな履歴管理を制御する。
  // ブラウザが`onhashchange`をサポートしていなければ、ポーリングにフォールバックする。
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // 先行するハッシュとスラッシュを取り除く正規表現。
  var routeStripper = /^[#\/]/;

  // Microsoft InternextExplorerを検知する正規表現。
  var isExplorer = /msie [\w.]+/;

  // 履歴制御がすでに始まっているか？
  History.started = false;

  // すべての**Backbone.History**から継承されるプロパティとメソッドをセットアップする。
  _.extend(History.prototype, Events, {

    // ハッシュチェンジのポーリングが必要なとき、デフォルトのインターバルは1秒に20回である。
    interval: 50,

    // 本来のハッシュ値を取得する。Firefoxにおけるlocation.hashが常にデコードされる
    // バグにより、location.hashを直接取り扱うことはできない。
    getHash: function(windowOverride) {
      var loc = windowOverride ? windowOverride.location : window.location;
      var match = loc.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

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

    // ハッシュの変更制御を始め、現在のURLに既存のルートが一致すれば`true`を返し、
    // そうでなければ`false`を返す。
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

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

      // pushStateやハッシュを使用しているどうか、'onhashchange'がサポートされているか
      // どうかに応じて、URLの状態をどのようにチェックするか決定する。
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // pushStateをサポートしないブラウザによって開かれたpushStateリンクのために
      // ベースURLを変更する必要があるかどうかを決定する
      this.fragment = fragment;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // `pushState`が有効なブラウザからのルートで開始したが、現在のブラウザは
      // それをサポートしていないとき...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);

        // ブラウザが新しいURLにリダイレクトするよう、即時returnする。
        return true;

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

    // おそらく一時的に、Backbone.historyを無効にする。実際のアプリでは使えないが、
    // Routerのユニットテストをする際に便利なことがある。
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // フラグメントが変化したときにテストするルートを追加する。ルートが追加されると、
    // 前のルートはオーバーライドされる。
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // ハッシュが変更されたか現在のURLをチェックし、そうであれば`loadUrl`をコールし、
    // 隠されたiframeを横断して正規化する。
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.getHash(this.iframe));
      if (current == this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

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

      // pushStateが有効であれば、それを使って実際のURLのようにフラグメントをセットする。
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // ハッシュの変更が明示的に無効にされていなければ、履歴に保存するためにハッシュを
      // 更新する。
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.getHash(this.iframe)))) {

          // IE7以前でハッシュの変更を入れるため、iframeを開いて・閉じるトリックを行う。
          // replaceがtrueであれば、これを行わない。
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

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

  // Backbone.Viewをつくると、既存の要素が提供されないとき、DOMの外に初期要素が作られる。
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // `delegate`でキーを分割する正規表現。
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // プロパティとしてマージされるViewのオプションリスト。
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // すべての**Backbone.View**から継承されるプロパティとメソッドをセットアップする。
  _.extend(View.prototype, Events, {

    // ビュー要素の`tagName`はデフォルトで`"div"`である。
    tagName: 'div',

    // 現在のビューの中にあるDOM要素を対象にする形で要素のルックアップをjQueryに委譲する。
    // もし可能な場合、この方法は全体に対するルックアップを行うよりも推奨される。
    $: function(selector) {
      return this.$el.find(selector);
    },

    // 初期化はデフォルトで空の関数。自身の初期化ロジックでオーバーライドする。
    initialize: function(){},

    // **render**は、適切なHTMLで要素 (`this.el`) を生成するために、
    // 各自のビューがオーバーライドすべきコア関数である。
    // **render**では常にthisを返すことが一般的に行われている。
    render: function() {
      return this;
    },

    // DOMからビューを削除する。注意: ビューはデフォルトではDOMの中にいないため、
    // このメソッドを何も起きないかもしれない。
    remove: function() {
      this.$el.remove();
      return this;
    },

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

    // ビューの要素 (`this.el`プロパティ)を変更し、内包するイベントを再委譲する。
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = (element instanceof $) ? element : $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

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

    // `delegateEvents`によってビューに結びつけられたコールバックをすべてクリアする。
    // 通常はこれを必要としないが、同じDOM要素に複数のビューをアタッチがされたとき必要に
    // なるかもしれない。
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

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

  // Backboneクラスで使われる自己伝播による拡張をする関数。
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // 継承をモデル、コレクション、ビューにセットアップする。
  Model.extend = Collection.extend = Router.extend = View.extend = extend;

  // Backbone.sync
  // -------------

  // `Backbone.sync`のデフォルト実装が用いる、CRUDをHTTPに置き換えるマップ。
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

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

    // 指定しない限りのデフォルトオプション。
    options || (options = {});

    // デフォルトのJSONリクエストオプション。
    var params = {type: type, dataType: 'json'};

    // URLを持っているか確かめる。
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // 適切なリクエストデータを持っているか確かめる。
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // 古いサーバーは、リクエストをHTML-form形式にエンコードしてJSONをエミュレートする。
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

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

    // GETでないリクエストであればデータを処理しない。
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // 任意のAjaxオプションをオーバーライドでき、リクエストを行う。
    return $.ajax(_.extend(params, options));
  };

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

  // プロトタイプチェーンの作成を助けるために、空のコンストラクタ関数を共有する。
  var ctor = function(){};

  // サブクラスのプロトタイプチェーンを正しく設定するヘルパ関数。`goog.inherits`に
  // 似ているがプロトタイププロパティのハッシュを利用し、クラスプロパティを継承する。
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // 新しいサブクラスのコンストラクタ関数は、自分で定義したものか ("constructor"
    // プロパティを`extend`の定義に入れる) デフォルトで単に親のコンストラクタのいずれかを呼ぶ。
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // 親からクラス(静的)プロパティを継承する。
    _.extend(child, parent);

    // `parent`のコンストラクタを呼び出さずに、`parent`からプロトタイプチェーンを継承する。
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // 提供されていれば、サブクラスにプロトタイププロパティ (インスタンスプロパティ) を
    // 追加する。
    if (protoProps) _.extend(child.prototype, protoProps);

    // 提供されていれば、コンストラクタ関数に静的なプロパティを追加する。
    if (staticProps) _.extend(child, staticProps);

    // 正しくchildの`prototype.constructor`を設定する。
    child.prototype.constructor = child;

    // あとから親のプロトタイプが必要になったときに便利なプロパティをセットする。
    child.__super__ = parent.prototype;

    return child;
  };

  // Backboneオブジェクトからプロパティまたは関数として値を得るためのヘルパー関数。
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // URLが必要であるのに提供されていないときにエラーを投げる。
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
