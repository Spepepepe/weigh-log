# weigh-log

体重と睡眠時間を記録・管理するWebアプリケーションです。

## 機能

- **体重・睡眠時間の記録** - 日付ごとに体重（kg）と睡眠時間を入力
- **データ閲覧** - 記録したデータを一覧表示。7日間の移動平均も確認可能
- **BMI計算** - 7日平均体重をもとにBMIを自動計算
- **設定** - 身長を設定してBMI計算に反映

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Next.js / React / TypeScript |
| スタイリング | Tailwind CSS |
| データベース | Supabase (PostgreSQL) |
| インフラ | AWS S3（静的ホスティング）/ CloudFormation |
| CI/CD | GitHub Actions |
| コンテナ | Docker |

## ディレクトリ構成

```
WeighLog/
├── app/                    # Next.js アプリケーション
│   ├── app/                # ページコンポーネント
│   │   ├── input/          # 入力ページ
│   │   ├── view/           # データ閲覧ページ
│   │   └── settings/       # 設定ページ
│   └── lib/                # ユーティリティ・サービス
├── cloudformation/         # AWS CloudFormation テンプレート
└── .github/workflows/      # GitHub Actions ワークフロー
```

## インフラ構成

- AWS S3 による静的ホスティング（IP制限付き）
- CloudFormation でインフラをコード管理
- GitHub Actions で `app/` や `cloudformation/` への変更を自動デプロイ
