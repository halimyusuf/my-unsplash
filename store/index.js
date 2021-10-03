import { createContext, useReducer, useContext } from "react";
import { arrayToObject } from "../utils";

const storeContext = createContext();
const initState = {
  images: {},
};

export function StoreProvider(props) {
  const [cache, dispatch] = useReducer(storeReducer, initState);
  return <storeContext.Provider value={[cache, dispatch]} {...props} />;
}

function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_IMAGES": {
      return {
        ...state,
        images: {
          ...state["images"],
          ...arrayToObject(action.data, "_id"),
        },
      };
    }

    case "ADD_IMAGE": {
      return {
        ...state,
        images: {
          ...state["images"],
          [action.data._id]: action.data,
        },
      };
    }

    case "SEARCH_FILTER": {
      return {
        ...state,
        images: {
          ...arrayToObject(action.data, "_id"),
        },
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function useStore() {
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("useStore must be within StoreProvider");
  }
  return context;
}
