import * as actionTypes from "../actions/actionTypes";
import Category1 from "./../content/vacabulary/maa_ja_pohjarakennus.json";
import Category2 from "./../content/vacabulary/perustukset.json";
import Category3 from "./../content/vacabulary/runko_ja_vesikattorakenteet.json";
import Category4 from "./../content/vacabulary/tital.json";

const initState = {
  phrazes: [],
  phrazesByCategory: [],
  selectedCategory: ""
};

const phraseSkleton = {
  library: "Russian to Finnish",
  public: false,
  phrazed: false,
  favorite: false
};

index = 0;
while (index < Category1.length) {
  const native = Category1[index + 1];
  const translation = Category1[index];

  initState.phrazes.push({
    ...phraseSkleton,
    key: JSON.stringify(initState.length + 1),
    category: "Maa ja pohjarakennus",
    phraze: native,
    translated: translation
  });

  index = index + 2;
}

export default (state = initState, action) => {
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
