+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Examples [原文](http://backbonejs.org/#examples)

以下の事例紹介はその分量に関わらず包括的なものではありません。もし、Backboneを使ったアプリに関わった場合は[wikiのBackbone apps](https://github.com/documentcloud/backbone/wiki/Projects-and-Companies-using-Backbone)のページに追加してください。

Backboneの例としてリポジトリにバンドルされている[Todo List アプリケーション](examples/todos/index.html)は[Jérôme Gravel-Niquet](http://jgn.me/)が作成したものです。もしBackboneをどこから始めたらいいか迷っている場合は、ひととおり[注釈付きのソース](docs/todos.html)を読む時間をとってみましょう。このアプリケーションではサーバにブラウザ内のすべてのtodoに送らずに、[LocalStorageのアダプター](docs/backbone-localstorage.html)を利用して透過的に保存します。Jérômeは[localtodos.com](http://localtodos.com/)にjQueryの代わりに[MooToolsを利用したバージョン](http://github.com/jeromegn/backbone-mootools)も作成しています。

## documentcloud

[DocumentCloud workspace](http://www.documentcloud.org/public/#search/)はBackboneのモデルとコレクションとしてDocuments、Projects、Notes、そしてAccountsを利用して、Backbone.jsで作られています。もし、成り立ちに興味があるならば、Underscore.js と Backbone.jsは元々はDocumentCloudで使われていたコードを独立したJavaScriptのライブラリとして抽出したものであることを記しておきます。

## USA Today

[USA Today](http://usatoday.com)はBackboneのデータ/モデルのライフサイクルのモジュール性を上手に利用しています。コードを扱いやすく、そして無駄のない形で維持するために、アプリケーションのオブジェクトをシンプルに作り、継承し、分離し、結びつけます。新しいウェブサイトではpushStateに対応したブラウザとレガシーなブラウザへのページ出力制御のためにBackbone Routerが多用されています。最後に、担当チームはBackbone's Eventの利点を用いて、サードパーティー作成のものや解析のパッケージをアプリケーションの心臓部にフックできるようにPubSub APIを作成しました。

## Rdio

[New Rdio](http://rdio.com/new)はBackbone.jsをベースとしてコンポーネントベースフレームワークを使って一から作成されました。すべての画面上の構成要素は[Rdio API](http://developer.rdio.com/)で提供されたデータによってダイナミックにロードされ、レンダリングされます。変更がプッシュされるとすべての構成素は、ページのリロードやユーザーの音楽を中断することなく変更が反映できます。このすべてがBackboneのviewとmodelsに依存しており、また、すべてのURLのルーティングはBackboneのRouterで処理されます。リアルタイムにデーター変更の信号が送られた時、BackboneのEventsはデーター変更に関連した構成要素に通知します。Backboneは新しくてダイナミックでリアルタイムなRdioのWebおよびデスクトップアプリケーションの中核を構成しています。

## LinkedIn Mobile

[LinkedIn](http://www.linkedin.com/)は[次世代の HTML5 モバイルWebアプリ](http://www.linkedin.com/static?key=mobile)にBackbone.jsを利用しました。Backboneによってアプリのモジュール性、編成、拡張性を容易に維持することが出来たため、LinkedInのユーザー体験の複雑さをプログラムすることを可能としました。このアプリは[Zepto](http://zeptojs.com/)、[Underscore.js](https://gist.github.com/4285928)、[SASS](http://sass-lang.com/)、[iScroll](http://cubiq.org/iscroll)、HTML5 LocalStorageとcanvasも利用しています。技術チームはモバイルでのパフォーマンス改善について[LocalStorageを利用した体験談](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps)をブログで紹介しています。

## Hulu

[Hulu](http://hulu.com/)は次世代のオンラインビデオ体験の構築にBackbone.jsを利用しました。Backboneを基盤としてウェブインターフェイスは刷新され、すべてのページのコンテンツはユーザの操作に合わせてスムーズに動的に読み込みを行うようになった。Backboneはスクリプトや埋め込まれたビデオをリロードすることなくアプリの中を移動することを容易にしつつ、追加のデータ操作を行えるよう、モデルとコレクションも提供しています。

## Flow

[MetaLab](http://www.metalabdesign.com/)はチーム向けタスク管理アプリの[Flow](http://www.getflow.com/)を作成するためにBackbone.jsを利用しました。ワークスペースはタスクビュー、アクティビティ、アカウント、フォルダ、プロジェクトそしてタグの機能を構築するためにBackbone.jsに依存しています。window.Flow内部で詳細な部分を見ることができます。

## Gilt Groupe

[Gilt Groupe](http://gilt.com/)はBackbone.jsを利用し、関連サイトを含む複数のアプリケーションの構築を行いました。[Giltの モバイルサイト](http://m.gilt.com/)では、Backboneと[Zepto.js](http://zeptojs.com/)を用いて、出先のユーザーに対して、超高速なショッピング体験を提供していて、[Gilt Live](http://live.gilt.com/)では顧客がリアルタイムに購入している商品をBackboneとWebSocketsを結合して表示しています。Giltの検索機能もBackboneを用いて、フィルターや商品の並び替えをクライアントサイドで行うことで効率的に行えるようにしています。

## NewsBlur

[NewsBlur](http://www.newsblur.com/)デスクトップアプリのように高速でレスポンシブルなUIのRSSリーダーとソーシャルニュースネットワークです。Backbone.jsは[大幅な書き換えとスパゲッティコードからの移行](http://www.ofbrooklyn.com/2012/11/13/backbonification-migrating-javascript-to-backbone/)のために、パワフルでシンプルな機能群、容易な統合性そして大規模なコミュニティを理由として選ばれました。もしあなたがこのあたりの中身をつついてみたい場合、NewsBlurも完全に[オープンソース](http://github.com/samuelclay/NewsBlur)になっています。

## WordPress.com

[WordPress.com](http://wordpress.com/)は[WordPress](http://wordpress.org/)のWebサービスとしてのバージョンです。Backbone.jsのModels、Collections、Viewsをその[通知システム](http://en.blog.wordpress.com/2012/05/25/notifications-refreshed/)で利用しています。Backbone.jsはアプリケーションの構造に容易にフィットする唯一の選択肢として採用されました。[Automattic社](http://automattic.com/)の統計情報タブとホームページ全体の機能をBackbone.jsに統合しています。

## Foursquare

Foursquareは友達と会ったり、新しいスポットを見つけたり、お金を節約できる楽しくて小さなスタートアップ企業です。Backbone Modelsは[トップページのマップ](https://foursquare.com/)や[リスト](https://foursquare.com/seriouseats/list/the-best-doughnuts-in-ny)のような非常に利用頻度の高い機能を供給するコアとなるJavaScirpt APIレイヤーとViewsで多く用いられています。

## Bitbucket

[Bitbucket](http://www.bitbucket.org/)はGitやMercurialの無料のソースコードホスティングサービスです。モデルとコレクションを通してBackbone.jsが、Bitbucketの[REST API](https://api.bitbucket.org/)はもちろん、新しいコンポーネントであるインラインでのコメントのコーディングやPull Requestの許可などにおいて有用であることを証明しています。
Mustacheテンプレートを用いてサーバーとクライアントサイドのレンダリングを行いつつ、カスタマイズした[Google クロージャー](https://developers.google.com/closure/library/)を用いたウィジェットでBitbucketでは現存するDOMツリーを装飾したり、新しいDOMツリーを挿入するライフサイクルを実現しています。

## Disqus

[Disqus](http://www.disqus.com/)はコメント用のウィジェットの最新版のエンジンにBackbone.jsを選択しました。Backboneの容量の小ささと容易な拡張性が、iframeの中にすべてを提供し、そしてIGNやWired、CNN、MLBなどの幾千ものウェブの資産を供給する存在であるDisqusのウェブアプリを配布へするための正しい選択となりました。

## Khan Academy

[Khan Academy](http://www.khanacademy.org/)はあらゆる人々に世界レベルの教育を提供しようというひとつの試みです。数千のビデオ、数百のJavaScriptで動く演習問題、そして未来に向けた壮大な計画のために、Khan AcademyはBackboneを利用してフロントエンドのコードのモジュール化と最適化を実現しています。ユーザーのプロフィールと目標の設定はBackboneと[jQuery](http://jquery.com/)そして[Handlebars](http://handlebarsjs.com/)で提供され、さらに新しい機能のほとんどは、[the API](https://github.com/Khan/khan-api/)の質の大きな向上として、クライアントサイドに反映され続けています。

## Do

[Do](http://do.com/)はタスクの消化やプロジェクトの管理を簡単にする、ソーシャルなプロダクティビティアプリです。[Do.com](http://do.com/)のウェブアプリはスマートフォン、タブレット、PCでシームレスに動作するようにゼロから構築されました。製作チームはBackboneと[CoffeeScript](http://coffeescript.org/)や[Handlebars](http://handlebarsjs.com/)を記録的な短時間で構築し、複雑なナビゲーションとモデルの同期を行うための独自拡張を実現するために利用しました。

## IRCCloud

[IRCCloud](http://irccloud.com/)はブラウザ内で利用できる常時接続に対応したIRCクライアントです − しばしば一日中開きっぱなしにされることもあります。洗練されたWebインターフェースはWebSocketsと[IRCCloud API](https://github.com/irccloud/irccloud-tools/wiki/API-Overview)を介してErlangのバックエンドと交信します。それはIRCの会話の流れがリアルタイムで維持されるようにBackbone.jsのEvents、Models、ViewsそしてRoutingが多用されています。

## Pitchfork

[Pitchfork](http://pitchfork.com/)は、サイト全体のオーディオプレーヤー、[Pitchfork.tv](http://pitchfork.com/tv/)、位置情報のルーティング、ロケーションルーティング、ライトスルーページをキャッシュに分解するなど多くの用途でBackbone.jsを利用しています。Backbone.js（と[Underscore.js](http://underscorejs.org/)）は、クリーンでモジュール化されたコンポーネントの制作と迅速な移行、そしてスパゲッティコードではなくサイトの運営に注力することに寄与しています。

## Spin

[Spin](http://spin.com/)はBackboneのModelsとCollections、それとカスタマイズしたsyncメソッドを利用し、サイト内部のAPIから[新着ニュース](http://www.spin.com/news)を取得しています。他の「ページ」にクリックして遷移したとしても音楽の再生を停止することがないように、Spinはサイト内ナビゲーションでBackboneのRouterを利用しています。

## Walmart Mobile

[Walmart](http://www.walmart.com/)はBackbone.jsを新しいバージョンの[モバイルWebアプリ](http://www.walmart.com/)の構築に利用し、またその過程で新しいフレームワークを二つ作成しました。[Thorax](http://walmartlabs.github.com/thorax/)はミックスインとイベントの継承だけでなく、モデルとコレクションのビューを[Handlebars](http://handlebarsjs.com/)テンプレートとの直接的な結合を提供しています。[Lumbar](http://walmartlabs.github.com/lumbar/)はアプリをオンデマンドにロードできるモジュールに分割することを可能にし、WalmartのAndroidおよびiOSのネイティブアプリに埋め込まれる、ウェブアプリの一部分のみを特定のプラットフォーム用にビルドすることができます。

## Groupon Now!

[Groupon Now!](http://www.groupon.com/now)はあなたがすぐに購入し、利用できる地域のお得な情報を探すのに役立ちます。初期の開発時には、ページ全体のリフレッシュの代わりにAJAXを多用したスムーズなセクション間の遷移を採用しようとしつつ、リンクもと共有も可能であることも求められていました。これまでBackboneを利用したことがないにも関わらず、学習曲線は驚くほど早く - 午後にはプロトタイプを作り上げ、2週間で製品をリリースすることができました。ソースは小さく理解しやすいので、Groupon Now!向けの拡張（クエリー付きのURLを処理するためのRouterの変更と、同一のデータのリクエストの重複をキャッシュするためのシンプルなインメモリでの保存方法の追加）を作成するのは簡単でした。

## Basecamp

[37Signals](http://37signals.com/)は[Basecamp](http://basecamp.com/)という著名なプロジェクト管理ソフトの[カレンダー機能](http://basecamp.com/calendar)を作成するのにBackbone.jsを選択しました。BasecampのカレンダーはBackbone.jsのModelsとViewsを、洗練され高度にインタラクティブなグループ用スケジュールのインターフェースを表示する[Eco](https://github.com/sstephenson/eco)テンプレートシステムと結合して利用しています。

## Slavery Footprint

[Slavery Footprint](http://slaveryfootprint.org/survey)は消費者が、どれほど自身の消費傾向が現代の奴隷制に関係しているかを可視化し、購入した商品を生産している会社との突っ込んだ対話の機会を提供する。オークランドとカリフォルニアに拠点を置き、Slavery Footprintは個人、団体、企業が、強制労働や人身売買そして現代の奴隷制に対しての、オフラインので社会周知活動や動員プログラムと同様に、オンラインツールを通した反対運動が展開できることを周知する活動に携われるように務めている。

## Stripe

[Stripe](https://stripe.com/)はWebでクレジットカードを受け付けるためのAPIを提供します。Stripeの[管理用インターフェース](https://manage.stripe.com/)は最近、根幹のフレームワークにBackbone.js、テンプレートに[Eco](https://github.com/sstephenson/eco)、スタイルシートに[Sass](http://sass-lang.com/)、そして[CommonJS](http://commonjs.org/)形式のモジュールとしてまとめてパッケージするために[Stitch](https://github.com/sstephenson/stitch)を利用して、Coffeescriptで一から書きかえられました。新しいアプリは、動作のほとんどで[Stripe's API](https://stripe.com/docs/api)を直接利用しています。Backbone.jsのModelはクライアントサイドのモデルを、通信しているAPI側のRESTfulなリソースに対応させるのをシンプルにしています。

## Airbnb

[Airbnb](http://airbnb.com/)多数の製品でBackboneを利用しています。[Airbnbのモバイルサイト](http://m.airbnb.com/)（3人のチームが6週間で作成）で利用を開始して以来、[ウィッシュリスト](https://www.airbnb.com/wishlists/popular)、[マッチング](http://www.airbnb.com/match)、[検索](http://www.airbnb.com/s/)、コミュニティ、支払いそして内部ツールと拡張して行きました。

## Diaspora

[Diaspora](http://www.joindiaspora.com/)は多くの独立して運営される _pod_ によって形成された分散型のソーシャルネットワークです。自身の個人情報を保持し、誰と共有するか調整することができます。Diasporaのすべては、[Rails](http://rubyonrails.org/)とBackbone.jsで作成されて、[オープンソース](https://github.com/diaspora/diaspora)となっています。

## SoundCloud Mobile

[SoundCloud](http://soundcloud.com/)はインターネット上での音楽共有のプラットフォームをリードする存在です、そしてBackbone.jsは[SoundCloud Mobile](http://m.soundcloud.com/)の基盤となっています。プロジェクトでは、外部向け[API](http://soundcloud.com/developers)をデーターソース（nginxのプロクシーを通しています）として、[jQuery templates](http://api.jquery.com/category/plugins/templates/)をレンダリングに、[Qunit](http://docs.jquery.com/Qunit)と[PhantomJS](http://www.phantomjs.org/)をテストスイートとして活用しています。JavaScriptのコードやテンプレートやCSSは、[ready.js](https://github.com/dsimard/ready.js)や[Jake](https://github.com/mde/jake)、[jsdom](https://github.com/tmpvar/jsdom)のような様々なNode.jsのツールでプロダクションデプロイメント用にビルドされています。 __Backbone.History__ はHTML5 history.pushStateをサポートするように変更されています。 __Backbone.sync__ はSessionStorageをベースとした付加的なキャッシュレイヤーで拡張されています。

## Art.sy

[Art.sy](http://art.sy/)はあなたが愛でるであろう芸術を発見できる場所です。Art.syはRailsで構築され、堅牢な[JSON API](http://art.sy/api)を提供するために[Grape](https://github.com/intridea/grape)を利用しています。メインサイトは単一ページで、Coffeescriptで記述され、BackboneはこのAPIを利用しての構造を提供するのに利用しています。管理者用パネルとパートナー向けCMSもそのAPIを利用しているBackboneプロジェクトから抜粋して作成されています。

## Pandora

[Pandora](http://www.pandora.com/newpandora)はサイトをHTML5でリデザインする際に、ユーザーインターフェースとインタラクションを扱う手助けとしてBackbone.jsを選びました。例えば、”再生中のトラック”を示すModelや、カレントのトラックが変わった時に複数のViewを更新するなどです。放送局リストは、放送局が追加されたり変更があった時もUIが最新を維持するようにCollectionとなっています。

## Inkling

[Inkling](http://inkling.com/)はインタラクティブな学習コンテンツをクラスプラットフォームで公開します。[Inklingのウェブサイト](https://www.inkling.com/read/)は、数百のウェブ上で魅力がありアクセシブルな - 教科書から旅行ガイドやプログラミングマニュアルまでの - 複合書籍を作成するのに利用しています。Inklingは、3Dグラフィックを可能にするWebGL、相互評価、ソーシャルでの共有、そして書籍の中にある実行コードを走らせるシステム、それらをBackboneドリブンのアプリによる単一ページでサポートしています。早い段階でチームは、Backboneと生のJavaScriptのみによってサイトを軽量な状態で維持できるように決断しました。その結果は？完全なソースコードは、iPad、iPhoneそしてウェブクライアントそれぞれで同等の機能でほんの350キロバイトの容量になりました。[JavaScript:最終ガイドからの抜粋](https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/chapter-4/function-definition-expressions)を試してみてください。

## Code School

[Code School](http://www.codeschool.com/) のコースは、[CoffeeScript](http://coffeescript.org/)、CSS、Ruby on Railsやその他のプログラミングの話題につて人々に教えます。新しいCode Schoolのコースの[challenge page](http://coffeescript.codeschool.com/levels/1/challenges/1)は、Router、Collections、Modelsそして複合したイベントのハンドリングというBackbone.jsが提供できるあらゆるものを利用して一から構築されました。それ以前にはページは[jQuery](http://jquery.com/)によるDOM制御と手動のAjax呼び出しで乱雑な状態でした。Backbone.jsはJavaScriptを利用した構造的なフロントエンドアプリケーション開発についての考え方の導入の助けになりました。

## CloudApp

[CloudApp](http://getcloudapp.com/)は、Mac向けでシンプルにファイルやリンクを共有するものです。Backbone.jsは、Dropsを管理するための[ドキュメント化されたAPI](http://developer.getcloudapp.com/)を実行するためのウェブツールで活用されています。データーは[Pusher](http://pusher.com/)によって手動でpullもpushも行われ、レンダリングは[Mustache](http://github.com/janl/mustache.js)のテンプレートで供給されています。そのマジックを見るには[注釈付きのソースコード](http://cloudapp.github.com/engine)をチェックしてください。

## SeatGeek

[SeatGeek](http://seatgeek.com/)のスタジアムチケット配置図は元々[Prototype.js](http://prototypejs.org/)で作成されました。Backbone.jsと[jQuery](http://jquery.com/)に移行したことは、多数のUIコードを体系づけることと、強固になった構造は機能を気軽に追加するできるようにすることに役立ちました。またSeatGeekは、Backbone.jsを徹頭徹尾利用したモバイルインターフェースも作成中です。

## Easel

[Easel](http://easel.io/)はブラウザ内で、デザインと制作のプロセスを統合した、高い忠実度のウェブデザインを行うツールです。Easelのチームは[リッチなビジュアルエディター](http://easel.io/demo)だけでなく、サイト全体に渡る他の管理機能についても、CoffeeScriptやUnderscore.jsやBackbone.jsを利用しています。Backboneの構造は、コンポーネントの管理や快適な移動をビジュアルエディタに構築するための複合した問題を解決できるようにしました。

## Prose

[Prose](http://prose.io/)は、[Jekyll](http://jekyllrb.com/)とGithub Pagesでウェブサイトの構築を管理するのに最適化された、Github向けのコンテンツエディターです。Proseは、Github上でファイルを操作するための小さくデータが抽象化されたレイヤーを、[Github.js](http://github.com/michael/github)と同様にビューを作成とルートを操作するためにBackbone.jsを活用し、静的なJekyllのサイトとして実装します。続きは、[公式の公開記事](http://developmentseed.org/blog/2012/june/25/prose-a-content-editor-for-github/)または[ソースコードを見てみましょう](https://github.com/prose/prose)

## scroll kit

[scroll kit](http://scrollkit.com/)は、ウェブページを絵を書くようにデザインできる新しい種類のウェブサイトビルダーです。ワークスペースは、RailsとBackbone.jsで構築された単一ページのウェブアプリケーションです。scroll kitでは、すべてのDOM要素はBackboneのModelと関連付けられ、スタイルが変更されれば要素のモデルが自動的にアップデートをし、すべてのビューへ変更を伝播します。[どうぞ試してみてください](http://scrollkit.com/demo)。

## Battlefield Play4Free

[Battlefield Play4Free](http://battlefield.play4free.com/)は、Battlefield Heroesを作成したチームが送る最新の無料プレイ可能な一人称シューティングゲームです。ゲーム内のHTML5フロントエンド作成は、コードのモジュールと構造を維持できるようにBackboneのViewとModelsとCollectionsを多用しています。

## Syllabus

[Syllabus](http://product.voxmedia.com/post/25113965826/introducing-syllabus-vox-medias-s3-powered-liveblog)は[The Verge](http://www.theverge.com/)や他の[Voxメディア](http://www.voxmedia.com/)サイトで利用されている新しいライブブログプラットフォームです。Syllabusは、編集用のダッシュボードとライブブログページ自体の両エンドにBackboneを利用しています。バックサイドでは、Backboneは、アップロードや新規作成や編集そしてコンテンツの公開を単一ページ体験で提供できるように利用されています。ライブブログでは、BackboneはJSON APIのフィードを処理し、新規や編集されたコンテンツのアップデートの無限スクロールインターフェースの更新を行なっています。

## Salon.io

[Salon.io](http://salon.io/)は、写真家やアーティスト、デザイナーが自由に彼らのビジュアルアートをヴァーチャルの壁にアレンジすることができるフリースペースを提供しています。[Salon.io](http://salon.io/)は[Rails](http://rubyonrails.org/)で稼働していますが、これまで積み重ねられたような利用ではなく、全体のフロントエンドは、Backbone.jsと[CoffeeScript](http://coffeescript.org/)を利用して単一ページとしてデザインされています。

## TileMill

我々の仲間で[Knight Foundation News Challenge](http://www.newschallenge.org/)の勝者、[MapBox](http://mapbox.com/)は、Backbone.jsでオープンソースのマップスタジオである[TileMill](http://mapbox.github.com/tilemill/)を作成しました。TileMillはシェイプファイルとラスターで作成されたマップレイヤーを操作したり、[Carto styling language](https://github.com/mapbox/carto)でブラウザ内で直接外見を編集できます。ゴージャスな[MapBox](http://mapbox.com/)のホームページもBackbone.jsのアプリであることにも着目してください。

## Blossom

[Blossom](http://blossom.io/)は、スリムなチーム向けの軽量なプロジェクト管理ツールです。Backbone.jsは、[CoffeeScript](http://coffeescript.org/)とのコンビネーションでスムーズなインタラクション体験を提供するために多用されています。RESTfulのバックエンドは、Google App Engine上の[Flask](http://flask.pocoo.org/)で構築されています。

## Decide

[Decide.com](http://decide.com/)は家電購入の決定を助けます。検索結果のページの出力と更新ではBackbone.jsに大きく依存しています。「無限スクロール」機能は、より多くの結果を処理し、すぐさま[Mustache](http://mustache.github.com/)でレンダリングする製品モデルのコレクションを検索結果で表示されるモデルに取り込むことに好都合です。SearchControllerはすべての同期を維持し、URLにページの状態を保持します。Backboneはユーザーアカウントと設定の管理でも活用されています。

## Trello

[Trello](http://trello.com/)は、ボードにあなたのプロジェクトを整理するコラボレーションツールです。Trelloのボードは、チェックリストやファイルそして会談を含んだ多数のカードリストを保持し、採決を取ったりラベルで整理することができます。ボード上の更新はリアルタイムで行われます。サイトは全てのModels、ViewsやRoutersについては全てBackbone.jsを利用して一から構築されました。

## Tzigla

[Cristi Balan](http://twitter.com/evilchelu)と[Irina Dumitrascu](http://dira.ro/)が生み出した[Tzigla](http://tzigla.com/)は、アーティストが相互に[シュールな絵](http://tzigla.com/boards/1)を作成し、それらをつないで並べるコラボレーションできるドローイングアプリケーションです。BackboneのModelsはコードを整理し、Routerは[深い階層のリンクをブックマーク可能](http://tzigla.com/boards/1#!/tiles/2-2)にし、Viewsは[haml.js](https://github.com/creationix/haml-js)と[Zepto](http://zeptojs.com/)でレンダリングされます。TziglaはバックエンドでRuby（[Rails](http://rubyonrails.org/)）、フロントエンドでは[Jammit](http://documentcloud.github.com/jammit/)でプリパッケージされた静的アセットとともに[CoffeeScript](http://coffeescript.org/)で記述されています。
