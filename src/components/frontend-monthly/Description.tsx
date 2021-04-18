import styles from "./Description.module.css";

export const Description = () => {
  return (
    <div className={styles.description}>
      <p>
        サイボウズフロントエンドマンスリーは、サイボウズ社内で行っているフロントエンド情報共有会「フロントエンドウィークリー」の公開版です。
      </p>
      <p>
        その月に気になったフロントエンドの情報を、サイボウズのフロントエンドエキスパートチームのメンバーが共有していきます。
      </p>
      <p>
        このイベントのハッシュタグは{" "}
        <a href="https://twitter.com/search?q=%23%E3%82%B5%E3%82%A4%E3%83%9C%E3%82%A6%E3%82%BA%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9E%E3%83%B3%E3%82%B9%E3%83%AA%E3%83%BC&src=typed_query&f=live">
          #サイボウズフロントエンドマンスリー
        </a>{" "}
        です。
      </p>
      <div>
        <p>※フロントエンドウィークリーとは</p>
        <p>
          毎週火曜の 17:00 〜 18:00
          で社内向けに行っているフロントエンドの気になる記事を紹介する会です。2016年3月15日から行われています。
          ハッシュタグ{" "}
          <a href="https://twitter.com/search?q=%23%E3%82%B5%E3%82%A4%E3%83%9C%E3%82%A6%E3%82%BA%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%A6%E3%82%A3%E3%83%BC%E3%82%AF%E3%83%AA%E3%83%BC&src=typed_query&f=live">
            #サイボウズフロントエンドウィークリー
          </a>{" "}
          で実況しています。
        </p>
      </div>
    </div>
  );
};
