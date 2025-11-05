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
    text: `莎拉在星期二早上开着她的红色汽车去杂货店。她买了三个苹果、一盒牛奶和一些新鲜的面包。在回家的路上，她在黄色的邮局停下来给她的姐姐寄信。`,
    difficulty: 'easy',
    questions: [
      {
        question: '莎拉的车是什么颜色的？',
        options: ['红色', '蓝色', '黄色', '绿色'],
        correctAnswer: 0
      },
      {
        question: '莎拉什么时候去购物的？',
        options: ['星期一早上', '星期二早上', '星期三下午', '星期五晚上'],
        correctAnswer: 1
      },
      {
        question: '莎拉买了什么？',
        options: ['苹果、牛奶和面包', '橙子、果汁和饼干', '香蕉、奶酪和鸡蛋', '葡萄、水和饼干'],
        correctAnswer: 0
      },
      {
        question: '莎拉在回家的路上停在哪里？',
        options: ['银行', '邮局', '加油站', '图书馆'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `汤姆在星期六下午在公园里发现了一只棕色的小狗。这只狗戴着一个蓝色项圈，上面有一个银色的标牌。汤姆拨打了标牌上的号码，把狗还给了主人，主人给了他二十美元作为奖励。`,
    difficulty: 'easy',
    questions: [
      {
        question: '狗是什么颜色的？',
        options: ['黑色', '白色', '棕色', '金色'],
        correctAnswer: 2
      },
      {
        question: '汤姆什么时候发现的狗？',
        options: ['星期天早上', '星期六下午', '星期五晚上', '星期一下午'],
        correctAnswer: 1
      },
      {
        question: '项圈是什么颜色的？',
        options: ['红色', '绿色', '蓝色', '黑色'],
        correctAnswer: 2
      },
      {
        question: '汤姆收到了多少奖励？',
        options: ['十美元', '十五美元', '二十美元', '二十五美元'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `马丁内斯侦探仔细地检查了办公室。窗户从外面被打破了，木地板上覆盖着玻璃碎片。三个文件柜靠在北墙上，中间的那个没有上锁，而且是空的。一个喝了一半的咖啡杯放在桃花心木桌子上，旁边是一支银色的钢笔和一本撕掉了页的笔记本。`,
    difficulty: 'medium',
    questions: [
      {
        question: '窗户是怎么破的？',
        options: ['从里面', '从外面', '两边', '没有提到'],
        correctAnswer: 1
      },
      {
        question: '地板是什么材料的？',
        options: ['瓷砖', '地毯', '木头', '混凝土'],
        correctAnswer: 2
      },
      {
        question: '哪个文件柜是空的？',
        options: ['左边的', '中间的', '右边的', '全部'],
        correctAnswer: 1
      },
      {
        question: '桌子上有什么？',
        options: ['咖啡、钢笔和笔记本', '茶、铅笔和纸', '咖啡、铅笔和文件夹', '水、钢笔和杂志'],
        correctAnswer: 0
      },
      {
        question: '桌子是什么材料的？',
        options: ['橡木', '松木', '桃花心木', '枫木'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `陈医生在下午2点15分查看了病人的病历。血压是120/80，体温98.6°F，心率每分钟72次。病人报告头痛已经三天，站起来时会头晕。陈医生开了药，并安排了星期四上午10点的复诊预约。`,
    difficulty: 'medium',
    questions: [
      {
        question: '陈医生什么时候查看病历的？',
        options: ['下午1:15', '下午2:15', '下午3:15', '下午4:15'],
        correctAnswer: 1
      },
      {
        question: '心率是多少？',
        options: ['每分钟68次', '每分钟70次', '每分钟72次', '每分钟75次'],
        correctAnswer: 2
      },
      {
        question: '病人头痛多久了？',
        options: ['两天', '三天', '四天', '五天'],
        correctAnswer: 1
      },
      {
        question: '复诊预约是什么时候？',
        options: ['星期三上午10点', '星期四上午10点', '星期四下午2点', '星期五上午10点'],
        correctAnswer: 1
      },
      {
        question: '体温是多少？',
        options: ['98.2°F', '98.4°F', '98.6°F', '99.0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `威廉姆斯教授在10月15日在大学图书馆的第三层地下室发现了一份古老的手稿。这份文件用拉丁文写在泛黄的羊皮纸上，可以追溯到1347年。它包含了对一位名叫乔瓦尼·贝里尼的商人的提及，他在威尼斯和君士坦丁堡之间进行香料贸易。手稿提到了七条不同的香料路线，并包括带有详细罗盘方位的手绘地图。`,
    difficulty: 'hard',
    questions: [
      {
        question: '手稿是在哪里发现的？',
        options: ['第二层地下室', '第三层地下室', '第四层地下室', '第五层地下室'],
        correctAnswer: 1
      },
      {
        question: '发现的日期是什么时候？',
        options: ['10月10日', '10月12日', '10月15日', '10月20日'],
        correctAnswer: 2
      },
      {
        question: '手稿可以追溯到哪一年？',
        options: ['1337年', '1347年', '1357年', '1367年'],
        correctAnswer: 1
      },
      {
        question: '商人叫什么名字？',
        options: ['乔瓦尼·贝里尼', '马可·贝里尼', '乔瓦尼·罗西', '马可·罗西'],
        correctAnswer: 0
      },
      {
        question: '商人在哪些城市之间进行贸易？',
        options: ['罗马和雅典', '威尼斯和君士坦丁堡', '佛罗伦萨和开罗', '热那亚和亚历山大'],
        correctAnswer: 1
      },
      {
        question: '提到了多少条香料路线？',
        options: ['五条', '六条', '七条', '八条'],
        correctAnswer: 2
      }
    ]
  }
];

