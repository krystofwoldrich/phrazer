import * as actionTypes from "../actions/actionTypes";
import Category1 from "./../content/vacabulary/maa_ja_pohjarakennus.json";

const initState2 = {
  phrazes: [
    {
      key: "1",
      library: "finnish",
      category: "Greeting",
      phraze: "How are you doing?",
      translated: "Mitä kuuluu?",
      public: false,
      phrazed: false,
      favorite: true
    },
    {
      key: "2",
      library: "finnish",
      category: "Greeting",
      phraze: "Where are you from?",
      translated: "Mistä olet kotoisin?",
      public: false,
      phrazed: true,
      favorite: true
    },
    {
      key: "3",
      library: "finnish",
      category: "Greeting",
      phraze: "What is your name?",
      translated: "Mikä on sinun nimesi?",
      public: false,
      phrazed: false,
      favorite: false
    },
    {
      key: "4",
      library: "finnish",
      category: "Meeting",
      phraze: "Do you speak english?",
      translated: "Puhutko englantia?",
      public: false,
      phrazed: false,
      favorite: false
    },
    {
      key: "5",
      library: "finnish",
      category: "Meeting",
      phraze: "It was nice to meet you",
      translated: "Oli kiva tavata",
      public: false,
      phrazed: true,
      favorite: true
    },
    {
      key: "6",
      library: "finnish",
      category: "Hangout",
      phraze: "You are welcome",
      translated: "Ole hyvä",
      public: false,
      phrazed: true,
      favorite: false
    }
  ],
  phrazesByCategory: [],
  selectedCategory: ""
};

const initState = [];

const phraseSkleton = {
  library: "Russian to Finnish",
  public: false,
  phrazed: false,
  favorite: false
};

for (let index = 0; index < Category1.length; index + 2) {
  const native = Category1[index + 1];
  const translation = Category1[index];

  initState.push({
    ...phraseSkleton,
    key: initState.length + 1,
    category: "Maa ja pohjarakennus",
    phraze: native,
    translated: translation
  });
}

console.log(initState);

export default (state = initState2, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PHRASE:
      const newPhrasesArr = [...state.phrazes];
      const editedPhraseIndex = -1;

      newPhrasesArr.forEach((item, index) => {
        if (action.payload.key == item.key) {
          editedPhraseIndex = index;
        }
      });

      newPhrasesArr[editedPhraseIndex] = action.payload;

      return {
        ...state,
        phrazes: newPhrasesArr
      };

    case actionTypes.ADD_PHRAZE:
      return {
        ...state,
        phrazes: state.phrazes.concat({
          ...action.payload,
          key: state.phrazes.length + "1"
        })
      };
    case actionTypes.DELETE_PHRAZE:
      let temp = [];
      state.phrazes.forEach(item => {
        if (item.key !== action.payload) {
          temp.push(item);
        }
      });
      return {
        ...state,
        phrazes: temp
      };
    case actionTypes.CHECK_BOX_PHRAZE:
      const newPhrazes = state.phrazes.map(el => {
        if (el.key === action.key) {
          switch (action.opt) {
            case "public":
              el.public = !el.public;
              return el;
            case "phrazed":
              el.phrazed = !el.phrazed;
              return el;
            case "favorite":
              el.favorite = !el.favorite;
              return el;
          }
        }
        return el;
      });
      return {
        ...state,
        phrazes: newPhrazes
      };
    case actionTypes.GET_PHRAZES_BY_CATEGORY:
      const phrazesByCategory = state.phrazes.filter(
        phraze => phraze.category === action.payload
      );
      return {
        ...state,
        phrazesByCategory,
        selectedCategory: action.payload
      };
    default:
      return state;
  }
};
