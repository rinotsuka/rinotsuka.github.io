import { Hero } from "@/components/hero/Hero";

export const metadata = {
  title: "プライバシーポリシー | rinotsuka",
  description:
    "本サイトにおけるアクセス解析ツール（Google Analytics）の利用、Cookie の取り扱い、利用者の権利についてのプライバシーポリシー。",
};

export default function PrivacyPage() {
  return (
    <>
      <Hero title="プライバシーポリシー" />
      <section className="py-12 md:py-16">
        <article className="mx-auto max-w-content px-4">
          <div className="prose-blog">
            <p>
              本サイト（以下「当サイト」といいます）は、利用者のプライバシーを尊重し、個人情報の保護に関する法令およびその他の規範を遵守します。本ページでは、当サイトにおける情報の取り扱いについて説明します。
            </p>

            <h2>1. 取得する情報</h2>
            <p>
              当サイトでは、サイトの利用状況を把握するためにアクセス解析ツール「Google Analytics 4」を利用しています。Google Analytics は Cookie を利用して、以下のような情報を取得します。
            </p>
            <ul>
              <li>IP アドレス（一部匿名化された形式）</li>
              <li>ブラウザ・OS・デバイス等の環境情報</li>
              <li>参照元 URL、閲覧したページ、滞在時間等の行動履歴</li>
            </ul>
            <p>
              これらの情報は当サイト運営者が個人を直接特定する目的で利用するものではありません。ただし、法令や利用環境によっては個人に関連する情報として取り扱われる場合があります。取得情報は Google 社のプライバシーポリシーに基づき処理されます。
            </p>

            <h2>2. 利用目的</h2>
            <p>取得した情報は、次の目的のためにのみ利用します。</p>
            <ul>
              <li>サイトの利用状況の分析および改善</li>
              <li>コンテンツの最適化</li>
            </ul>

            <h2>3. 第三者提供</h2>
            <p>
              当サイトは、上記アクセス解析の実施にあたり、利用者の情報を Google LLC に送信します。Google による Cookie および取得情報の取り扱いについては、以下のページをご確認ください。
            </p>
            <ul>
              <li>
                <a
                  href="https://policies.google.com/privacy?hl=ja"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Google プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=ja"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ポリシーと規約 — Google のサービスを使用するサイトやアプリから収集した情報の Google による使用
                </a>
              </li>
            </ul>

            <h2>4. Cookie の無効化およびアクセス解析のオプトアウト</h2>
            <p>
              当サイトでは、ページ表示時に Google Analytics のスクリプトを読み込みます。利用者はブラウザの設定により Cookie の受け入れを拒否することができます。また、Google Analytics による情報収集を無効にしたい場合は、Google が提供する以下のアドオンを利用することでオプトアウトできます。
            </p>
            <ul>
              <li>
                <a
                  href="https://tools.google.com/dlpage/gaoptout?hl=ja"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Google Analytics オプトアウト アドオン
                </a>
              </li>
            </ul>

            <h2>5. 免責事項</h2>
            <p>
              当サイトに掲載する情報については、その正確性および最新性に努めますが、内容の正確性・完全性を保証するものではありません。当サイトの利用により生じた損害について、当サイト運営者は一切の責任を負いません。
            </p>

            <h2>6. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、法令の変更や運営方針の変更等により、予告なく改定する場合があります。改定後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
            <p>最終改定日: 2026年4月30日</p>
          </div>
        </article>
      </section>
    </>
  );
}
