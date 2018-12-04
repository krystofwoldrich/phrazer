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

const createPhrases = (category, array = [], categoryName = "New") => {
  const phraseSkleton = {
    library: "Russian to Finnish",
    public: false,
    phrazed: false,
    favorite: false
  };
  const phrases = [];

  let key = array.length;
  let index = 0;
  category.forEach(rawPhrase => {
    phrases.push({
      ...phraseSkleton,
      key: JSON.stringify(key),
      category: categoryName,
      phraze: rawPhrase.native,
      translated: rawPhrase.translation,
      sound: { path: rawPhrase.path }
    });

    key++;
    index = index + 2;
  });

  return array.concat(phrases);
};

initState.phrazes = createPhrases(
  Category1,
  initState.phrazes,
  "Maa ja pohjarakennus"
);
initState.phrazes = createPhrases(Category2, initState.phrazes, "Perustukset");
initState.phrazes = createPhrases(
  Category3,
  initState.phrazes,
  "Runko ja vesikattorakenteet"
);
initState.phrazes = createPhrases(Category4, initState.phrazes, "Tital");

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
      let phrazesByCategory;
      if (action.payload === "Favourite") {
        phrazesByCategory = state.phrazes.filter(phrase => phrase.favorite);
      } else {
        phrazesByCategory = state.phrazes.filter(
          phraze => phraze.category === action.payload
        );
      }
      return {
        ...state,
        phrazesByCategory,
        selectedCategory: action.payload
      };
    default:
      return state;
  }
};
