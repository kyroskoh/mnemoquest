export interface StoryQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface StoryData {
  text: string;
  questions: StoryQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const stories: StoryData[] = [
  // Easy stories
  {
    text: `サラは火曜日の朝、赤い車で食料品店に行きました。彼女はリンゴを3つ、牛乳1パック、新鮮なパンを買いました。帰り道で、妹に手紙を出すために黄色い郵便局に立ち寄りました。`,
    difficulty: 'easy',
    questions: [
      {
        question: 'サラの車は何色でしたか？',
        options: ['赤', '青', '黄色', '緑'],
        correctAnswer: 0
      },
      {
        question: 'サラはいつ買い物に行きましたか？',
        options: ['月曜日の朝', '火曜日の朝', '水曜日の午後', '金曜日の夜'],
        correctAnswer: 1
      },
      {
        question: 'サラは何を買いましたか？',
        options: ['リンゴ、牛乳、パン', 'オレンジ、ジュース、クッキー', 'バナナ、チーズ、卵', 'ブドウ、水、クラッカー'],
        correctAnswer: 0
      },
      {
        question: 'サラは帰り道でどこに立ち寄りましたか？',
        options: ['銀行', '郵便局', 'ガソリンスタンド', '図書館'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `トムは土曜日の午後、公園で小さな茶色い犬を見つけました。犬は銀色のタグがついた青い首輪をしていました。トムはタグの番号に電話して犬を飼い主に返し、飼い主は報酬として20ドルをくれました。`,
    difficulty: 'easy',
    questions: [
      {
        question: '犬は何色でしたか？',
        options: ['黒', '白', '茶色', '金色'],
        correctAnswer: 2
      },
      {
        question: 'トムはいつ犬を見つけましたか？',
        options: ['日曜日の朝', '土曜日の午後', '金曜日の夜', '月曜日の午後'],
        correctAnswer: 1
      },
      {
        question: '首輪は何色でしたか？',
        options: ['赤', '緑', '青', '黒'],
        correctAnswer: 2
      },
      {
        question: 'トムはいくら報酬をもらいましたか？',
        options: ['10ドル', '15ドル', '20ドル', '25ドル'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `マルティネス刑事はオフィスを注意深く調べました。窓は外から割られており、ガラスの破片が木の床を覆っていました。3つのファイルキャビネットが北の壁に立てかけられており、真ん中のものは鍵がかかっておらず空でした。マホガニーの机の上には、飲みかけのコーヒーカップが銀のペンと破れたページのあるノートの隣に置かれていました。`,
    difficulty: 'medium',
    questions: [
      {
        question: '窓はどのように割られましたか？',
        options: ['内側から', '外側から', '両側から', '言及されていない'],
        correctAnswer: 1
      },
      {
        question: '床は何でできていましたか？',
        options: ['タイル', 'カーペット', '木', 'コンクリート'],
        correctAnswer: 2
      },
      {
        question: 'どのファイルキャビネットが空でしたか？',
        options: ['左のもの', '真ん中のもの', '右のもの', 'すべて'],
        correctAnswer: 1
      },
      {
        question: '机の上には何がありましたか？',
        options: ['コーヒー、ペン、ノート', 'お茶、鉛筆、紙', 'コーヒー、鉛筆、フォルダ', '水、ペン、雑誌'],
        correctAnswer: 0
      },
      {
        question: '机は何でできていましたか？',
        options: ['オーク', 'パイン', 'マホガニー', 'メープル'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `チェン医師は午後2時15分に患者のカルテを確認しました。血圧は120/80、体温は98.6°F、心拍数は毎分72回でした。患者は3日間頭痛があり、立ち上がるとめまいがすると報告しました。チェン医師は薬を処方し、木曜日の午前10時にフォローアップの予約を入れました。`,
    difficulty: 'medium',
    questions: [
      {
        question: 'チェン医師はいつカルテを確認しましたか？',
        options: ['午後1時15分', '午後2時15分', '午後3時15分', '午後4時15分'],
        correctAnswer: 1
      },
      {
        question: '心拍数はいくつでしたか？',
        options: ['毎分68回', '毎分70回', '毎分72回', '毎分75回'],
        correctAnswer: 2
      },
      {
        question: '患者はどのくらい頭痛がありましたか？',
        options: ['2日間', '3日間', '4日間', '5日間'],
        correctAnswer: 1
      },
      {
        question: 'フォローアップの予約はいつでしたか？',
        options: ['水曜日の午前10時', '木曜日の午前10時', '木曜日の午後2時', '金曜日の午前10時'],
        correctAnswer: 1
      },
      {
        question: '体温はいくつでしたか？',
        options: ['98.2°F', '98.4°F', '98.6°F', '99.0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `ウィリアムズ教授は10月15日に大学図書館の地下3階で古い写本を発見しました。黄ばんだ羊皮紙にラテン語で書かれたこの文書は、1347年にさかのぼるものでした。それには、ヴェネツィアとコンスタンティノープルの間で香辛料を取引していたジョヴァンニ・ベリーニという商人への言及が含まれていました。写本には7つの異なる香辛料ルートが記載されており、詳細な羅針盤の方位が記された手描きの地図が含まれていました。`,
    difficulty: 'hard',
    questions: [
      {
        question: '写本はどこで見つかりましたか？',
        options: ['地下2階', '地下3階', '地下4階', '地下5階'],
        correctAnswer: 1
      },
      {
        question: '発見の日付はいつでしたか？',
        options: ['10月10日', '10月12日', '10月15日', '10月20日'],
        correctAnswer: 2
      },
      {
        question: '写本は何年にさかのぼりますか？',
        options: ['1337年', '1347年', '1357年', '1367年'],
        correctAnswer: 1
      },
      {
        question: '商人の名前は何でしたか？',
        options: ['ジョヴァンニ・ベリーニ', 'マルコ・ベリーニ', 'ジョヴァンニ・ロッシ', 'マルコ・ロッシ'],
        correctAnswer: 0
      },
      {
        question: '商人はどの都市の間で取引していましたか？',
        options: ['ローマとアテネ', 'ヴェネツィアとコンスタンティノープル', 'フィレンツェとカイロ', 'ジェノヴァとアレクサンドリア'],
        correctAnswer: 1
      },
      {
        question: 'いくつの香辛料ルートが言及されていましたか？',
        options: ['5つ', '6つ', '7つ', '8つ'],
        correctAnswer: 2
      }
    ]
  }
];

