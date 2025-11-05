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
    text: `사라는 화요일 아침에 빨간 차를 타고 식료품점에 갔습니다. 그녀는 사과 세 개, 우유 한 팩, 신선한 빵을 샀습니다. 집으로 돌아오는 길에 그녀는 언니에게 편지를 보내기 위해 노란 우체국에 들렀습니다.`,
    difficulty: 'easy',
    questions: [
      {
        question: '사라의 차는 무슨 색이었습니까?',
        options: ['빨간색', '파란색', '노란색', '초록색'],
        correctAnswer: 0
      },
      {
        question: '사라는 언제 쇼핑을 갔습니까?',
        options: ['월요일 아침', '화요일 아침', '수요일 오후', '금요일 저녁'],
        correctAnswer: 1
      },
      {
        question: '사라는 무엇을 샀습니까?',
        options: ['사과, 우유, 빵', '오렌지, 주스, 쿠키', '바나나, 치즈, 계란', '포도, 물, 크래커'],
        correctAnswer: 0
      },
      {
        question: '사라는 집으로 가는 길에 어디에 들렀습니까?',
        options: ['은행', '우체국', '주유소', '도서관'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `톰은 토요일 오후에 공원에서 작은 갈색 개를 발견했습니다. 개는 은색 태그가 달린 파란색 목걸이를 하고 있었습니다. 톰은 태그에 있는 번호로 전화를 걸어 개를 주인에게 돌려주었고, 주인은 보상으로 20달러를 주었습니다.`,
    difficulty: 'easy',
    questions: [
      {
        question: '개는 무슨 색이었습니까?',
        options: ['검은색', '흰색', '갈색', '금색'],
        correctAnswer: 2
      },
      {
        question: '톰은 언제 개를 발견했습니까?',
        options: ['일요일 아침', '토요일 오후', '금요일 저녁', '월요일 오후'],
        correctAnswer: 1
      },
      {
        question: '목걸이는 무슨 색이었습니까?',
        options: ['빨간색', '초록색', '파란색', '검은색'],
        correctAnswer: 2
      },
      {
        question: '톰은 얼마의 보상을 받았습니까?',
        options: ['10달러', '15달러', '20달러', '25달러'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `마르티네스 형사는 사무실을 주의 깊게 조사했습니다. 창문은 밖에서 깨졌고, 나무 바닥에는 유리 조각들이 흩어져 있었습니다. 세 개의 파일 캐비닛이 북쪽 벽에 서 있었고, 가운데 것은 잠금이 해제되어 비어 있었습니다. 마호가니 책상 위에는 반쯤 마신 커피 잔이 은색 펜과 찢어진 페이지가 있는 노트 옆에 놓여 있었습니다.`,
    difficulty: 'medium',
    questions: [
      {
        question: '창문은 어떻게 깨졌습니까?',
        options: ['안쪽에서', '바깥쪽에서', '양쪽에서', '언급되지 않음'],
        correctAnswer: 1
      },
      {
        question: '바닥은 무엇으로 만들어졌습니까?',
        options: ['타일', '카펫', '나무', '콘크리트'],
        correctAnswer: 2
      },
      {
        question: '어느 파일 캐비닛이 비어 있었습니까?',
        options: ['왼쪽 것', '가운데 것', '오른쪽 것', '모두'],
        correctAnswer: 1
      },
      {
        question: '책상 위에는 무엇이 있었습니까?',
        options: ['커피, 펜, 노트', '차, 연필, 종이', '커피, 연필, 폴더', '물, 펜, 잡지'],
        correctAnswer: 0
      },
      {
        question: '책상은 무엇으로 만들어졌습니까?',
        options: ['참나무', '소나무', '마호가니', '단풍나무'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `첸 박사는 오후 2시 15분에 환자의 차트를 검토했습니다. 혈압은 120/80, 체온은 98.6°F, 심박수는 분당 72회였습니다. 환자는 3일 동안 두통이 있었고 일어설 때 어지러움을 보고했습니다. 첸 박사는 약을 처방하고 목요일 오전 10시에 후속 진료 예약을 잡았습니다.`,
    difficulty: 'medium',
    questions: [
      {
        question: '첸 박사는 언제 차트를 검토했습니까?',
        options: ['오후 1시 15분', '오후 2시 15분', '오후 3시 15분', '오후 4시 15분'],
        correctAnswer: 1
      },
      {
        question: '심박수는 얼마였습니까?',
        options: ['분당 68회', '분당 70회', '분당 72회', '분당 75회'],
        correctAnswer: 2
      },
      {
        question: '환자는 얼마나 오래 두통이 있었습니까?',
        options: ['이틀', '삼일', '나흘', '닷새'],
        correctAnswer: 1
      },
      {
        question: '후속 진료 예약은 언제였습니까?',
        options: ['수요일 오전 10시', '목요일 오전 10시', '목요일 오후 2시', '금요일 오전 10시'],
        correctAnswer: 1
      },
      {
        question: '체온은 얼마였습니까?',
        options: ['98.2°F', '98.4°F', '98.6°F', '99.0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `윌리엄스 교수는 10월 15일에 대학 도서관의 지하 3층에서 고대 필사본을 발견했습니다. 누렇게 바랜 양피지에 라틴어로 쓰인 이 문서는 1347년으로 거슬러 올라갔습니다. 그것은 베네치아와 콘스탄티노플 사이에서 향신료를 거래했던 조반니 벨리니라는 상인에 대한 언급을 포함하고 있었습니다. 필사본은 7개의 다른 향신료 경로를 언급했고 상세한 나침반 방위가 있는 손으로 그린 지도를 포함하고 있었습니다.`,
    difficulty: 'hard',
    questions: [
      {
        question: '필사본은 어디에서 발견되었습니까?',
        options: ['지하 2층', '지하 3층', '지하 4층', '지하 5층'],
        correctAnswer: 1
      },
      {
        question: '발견 날짜는 언제였습니까?',
        options: ['10월 10일', '10월 12일', '10월 15일', '10월 20일'],
        correctAnswer: 2
      },
      {
        question: '필사본은 몇 년으로 거슬러 올라갑니까?',
        options: ['1337년', '1347년', '1357년', '1367년'],
        correctAnswer: 1
      },
      {
        question: '상인의 이름은 무엇이었습니까?',
        options: ['조반니 벨리니', '마르코 벨리니', '조반니 로시', '마르코 로시'],
        correctAnswer: 0
      },
      {
        question: '상인은 어느 도시 사이에서 거래했습니까?',
        options: ['로마와 아테네', '베네치아와 콘스탄티노플', '피렌체와 카이로', '제노바와 알렉산드리아'],
        correctAnswer: 1
      },
      {
        question: '몇 개의 향신료 경로가 언급되었습니까?',
        options: ['다섯', '여섯', '일곱', '여덟'],
        correctAnswer: 2
      }
    ]
  }
];

