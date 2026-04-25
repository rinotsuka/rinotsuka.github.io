# assets/fonts/

このディレクトリの Noto Sans JP OTF（`NotoSansJP-Regular.otf` / `NotoSansJP-Bold.otf`）は
Google が公開する Noto CJK ファミリの一部で、SIL Open Font License 1.1 (OFL-1.1) のもとで配布されています。

- 入手元: https://github.com/notofonts/noto-cjk
- ライセンス: SIL Open Font License 1.1
- ライセンス全文: https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE

このリポジトリでは OGP 画像を `scripts/og.ts` でビルド時生成するために同梱しています。
フォントを再配布する場合は、SIL OFL 1.1 の条件（特に Reserved Font Name / 同名禁止）に従ってください。

ファイルが無い場合は次のコマンドで再取得できます:

```sh
node scripts/setup-fonts.mjs
```
