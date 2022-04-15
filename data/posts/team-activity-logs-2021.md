---
title: "長期運用プロダクトを抱える組織で横断的なフロントエンド支援チームが1年で行なったこと"
author: "nakajmg"
createdAt: "2021-12-18"
summary: "サイボウズのフロントエンドエキスパートチームの2021年の活動内容を紹介します。"
tags:
  - Cybozu
  - FrontendExpert
---

この記事は[Cybozu Advent Calendar 2021](https://adventar.org/calendars/6823)の18日目の記事です（業務なので前日に出してます🍀）。

サイボウズには 10 年以上運用が続いているプロダクトがいくつかあります。フロントエンドエキスパートチームは、そんなプロダクトや開発メンバーへの支援を横断的に行うチームです。

フロントエンドエキスパートチームの今年の取り組みを紹介します。

## フロントエンドエキスパートチームの立ち位置とミッション

フロントエンドエキスパートチームは特定のプロダクトなどに属さない、独立した横断的な支援チームです。活動内容についてはすべてチームに裁量があり、何をどうしていくかは自律的に決めて動く必要があります。

フロントエンドエキスパートチームでは「サイボウズのフロントエンドを最高にする」というミッションを掲げています。このミッションを達成するための活動を日々考えながら活動しています。

日々の活動は次の 4 つの内容を軸に行なっています。

- 支援: プロダクトやチームへの支援
- 発信: Cybozu やメンバーのプレゼンス向上のための情報発信
- 啓蒙: 社内メンバーのフロントエンドの技術力向上のための啓蒙活動
- 探究: プロダクトの可能性を広げるための調査検証

これら 4 つを軸に、`支援:5` `発信&啓蒙:2` `探究:3` の割合を目安にメンバー個々人が裁量を持って活動しています。

チームは今月で 4 歳 2 ヶ月になります。

## 活動内容まとめ

今年は大小さまざまな取り組みを行いました。次のリストはフロントエンドエキスパートチームが行なった今年の活動内容のざっくりとしたまとめです。これらの活動はチームで自発的に始めた取り組みと、相談きっかけで行なったものがあります。割合としては自発的なものが 9 割、相談きっかけが 1 割程度です。

- プロダクトのフロントエンドリアーキテクチャ支援
- プロダクトのマイクロサービス化を検証
- プロダクトのライブラリアップデート支援
- プロダクトへのフロントエンドのテスト環境整備支援
- [サイボウズフロントエンドマンスリー](https://cybozu.github.io/frontend-monthly/)の開催
- 登壇
  - [Node 学園 37 時限目 オンライン](https://nodejs.connpass.com/event/221358/)
  - [tc39_study](https://web-study.connpass.com/event/213676/)
  - [JSConf JP 2021](https://jsconf.jp/2021/)
- [Meetup の開催](https://cybozu.connpass.com/event/212572/)
- OSS へのコントリビューション
- 社内向けフロントエンド研修の開催
- フロントエンドウィークリーの開催（社内向け勉強会）
- エンジニアインターンの開催
- [エンジニアブログへの記事投稿](https://blog.cybozu.io/search?q=%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%A8%E3%82%AD%E3%82%B9%E3%83%91%E3%83%BC%E3%83%88)
- [チームの web サイトへの記事投稿](https://cybozu.github.io/frontend-expert/posts)
- デザインシステムの探究

プロダクトの現状を見て、プロダクトや会社の今後の方向性などを加味した上で、取り組みの内容や注力する割合をコントロールしています。

その中からいくつかをピックアップして詳細を紹介します。

## プロダクトのフロントエンドリアーキテクチャをプロジェクト化するまで

サイボウズでは現在、kinotne のフロントエンドのリアーキテクチャプロジェクトが進行中です。kintone の脱レガシーの取り組み自体は 2019 年ごろから開始されていましたが、1 つのプロジェクトとして動くようになったのは今年からです。

[kintone のフロントエンドリアーキテクチャについて](https://blog.cybozu.io/entry/2021/07/20/170000:embed)

### 少数チームでやれることに限界を感じた

リアーキテクチャがプロジェクトになる前、kintone の脱レガシーはもともとフロントエンドエキスパートチームが主導・先行する形で調査検討を行っていました。Closure Tools というフレームワークに依存している現状に対して、脱 Closure Tools のロードマップを作成したり、Closure Tools を使い続けた場合の影響と今後の見通しについて社内各所に警鐘を鳴らすとともに、別のフレームワークへの置き換え方法についての PoC などを行なっていました。

- [フロントエンドの開発体験向上と脱レガシー](https://blog.cybozu.io/entry/2020/04/07/110126)
- [Closure Library から TypeScript の型定義を生成する](https://blog.cybozu.io/entry/about-clutz)
- [styled-components の採用と既存資産を捨てた理由](https://blog.cybozu.io/entry/2020/06/25/105457)

そこから kintone の開発メンバーの一部とともに少しずつ React への置き換えを進めるようになりましたが、リソース的にできる範囲とスピードに課題感を抱えており、このままでは 5 年かかっても完了しないのではないかという不安がありました。

この不安をどうやれば解消できるか、どうすればスピードアップできるかをチーム内で定期的に議論していろんな案を考えていました。

### プロダクトの課題を組織の課題にする

kintone はサイボウズにとって大事なプロダクトで、そのプロダクトの内部の経年劣化は間違いなく組織にとっても課題です。10 年以上使い続けているフレームワークによる開発は限界に近づいてきていますが、この課題に対しての温度感がフロントエンドエキスパートとその他で大きな差がありました。

プロダクト側からすると新規機能の開発やバグ修正などの優先度が高くなりがちなので、脱レガシーにリソースを注力すると決めるのは難しいことだと理解はできます。また、プロダクトより上の層（サイボウズでは本部長などの経営に近い層）からするとゆっくりながらも進んでいるという事実からか、そこまで危機感は持っていないように感じられました。

そんな状況もあり、フロントエンドエキスパートチームとしては脱レガシーを組織の課題として、トップダウン的な動きで会社として注力する形でやっていきたいと考えました。しかしながらことはそう簡単ではなく、サイボウズは上長やマネージャーがいないという組織構造から、そういった大きな活動を起こすのに気力とコストを大いに必要としました。（現在この課題に対していろいろなトライを実施しており、解消に向かって進んでいます）

フロントエンドエキスパートチームからの問題提起を根気強く続けながら、プロダクトのメンバーや本部長を交えてどういったチーム構成でどうリリースまで持っていくかなどさまざまな議論を重ねました。その結果、リアーキテクチャプロジェクトとして発足するに至り、組織の課題として取り組める状況まで持っていくことができました。

## 横断的な支援チームで難しいと感じるところ

支援チームで活動していく上で何度か感じた難しいところがあります。それは、外側からの働きかけだけではやれることが多くないということです。外側からいくら熱心に働きかけても支援先のプロダクトなりチームなりが自分ごととして動いてくれない限りは、その場限りの活動になりがちで支援の効果も一時的なものになってしまいます。

こういった実感からフロントエンドエキスパートチームでは、短中期で支援先の内部に入って活動するという方法を取ることが多くなりました。その場限りの支援にならないように仕組みを整えたり、初期段階のブースター役としてがっちりプロダクトチームに寄り添そうような形で支援できるように心がけています。支援したい対象はいくつもありますが、焦らずに 1 つずつ集中して解決していくのが支援チームとしてうまく動いていくのには重要だと思います。

また、支援が一方的な押し付けにならないように、関わるメンバーにその支援活動の意味や意義を共感してもらうことに対して手を抜かないことも大事だと感じています。

## 継続的な社内啓蒙と社外発信

啓蒙・発信をチームの取り組みとして行なっています。社内勉強会として Frontend Weekly を、社外イベントとして Cybozu Frontend Monthly を継続して開催しています。

[Frontend Weekly5 周年&Cybozu Frontend Monthly1 周年 🎉 〜続けてみてのアレコレ〜](https://cybozu.github.io/frontend-expert/posts/frontendWeekly-And-Monthly:embed)

どちらも意識しているのは開催のコストを下げることです。司会を交代制にしたり、録画での開催を試したりと、常にコストを下げる工夫を行なっています。その結果、Frontend Weekly は 5 周年、Cybozu Frontend Monthly は 17 ヶ月連続で開催しています。

Cybozu Frontend Monthly は多くの人に視聴してもらえており、中途入社のきっかけになったり、学生への認知向上といった効果も出ています。これからも無理しない範囲で続けていければと思います。

### 社外発信のコストと心理的障壁を減らす

今年はフロントエンドエキスパートチームの web サイト(このサイト)を作成して、そこでの情報発信をはじめました。サイボウズの技術ブログは他にもありますが、あちらはプロダクトでの知見を共有する場という側面が強かったり、ちゃんとしたものをそこそこのボリュームで出さなければという意識が働くといった意見がチーム内で出たりと、若干のハードルを感じる場所になっています。

チームの web サイトであれば、フロントエンドの情報に偏っていても問題なく、プロダクトに依存しない内容を気軽に発信できる場所として機能すると考えました。

記事の執筆は一見コストが高そうですが、フロントエンドエキスパートチームではもともと社内 SNS(kintone)に web の最新情報などを共有する活動を行なっていました。この情報を外向けに少し整える手間さえかければアウトプットが行えるので、記事作成のコストが低めで継続が見込めます。

今年の 10 月にサイトを開設してから 3 ヶ月で記事を 10 本投稿できていることから、今の所うまくいっているように思います。

## おわりに

2021 年はフロントエンドエキスパートチームとして存在感と価値を発揮できた年だと感じています。地道な草の根活動からプロジェクト化へこぎつけたり、継続的な発信が行えていたりと、エキスパートチームらしい働きができたのかなと思います。

フロントエンドエキスパートチームの活動はチームメンバーだけでなく、プロダクトチームなどの協力があってこその活動も多いです。来年も関係各所と連携を取りつつ、着々と成果が出せるように取り組んで行きたいと思います。

フロントエンドの横断的支援チーム、フロントエンドのリアーキテクチャなどに興味がある方はカジュアル面談からでもぜひお願いします。

[Meety - サイボウズの Web フロントエンドについて話します](https://meety.net/matches/TgEdHofmrGjd:embed)

[Meety - サイボウズのフロントエンド、チーム、働き方についてなどなんでも](https://meety.net/matches/arWAMFBPtzsm:embed)

[Meety - サイボウズの開発組織について話します！](https://meety.net/matches/phQxpBZQLDBO:embed)

応募もお待ちしております。

[キャリア採用 - フロントエンドエキスパート](https://cybozu.co.jp/company/job/recruitment/list/front_end_expert.html:embed)

[キャリア採用 - フロントエンドエンジニア（kintone アーキテクチャ刷新 PJ）](https://cybozu.co.jp/company/job/recruitment/list/front_end_engineer_kintone.html:embed)