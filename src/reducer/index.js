import { add } from "../services/DBService";
import { sumitAll } from "../services/thresholdHandler";
const overLoadThreshold = 5;


const Reducer = (state, action) => {
    switch (action.type) {
        case 'ACTIONS_OVERLOADED':
            return {
                ...state,
                isOverLoaded: action.payload
            };
        case 'ACTION_COUNT':
            return {
                ...state,
                actionCount: state.actionCount + 1
            }
        case 'ADD_VEHICLE':
            const { payload } = action;
            add(payload);
            if(state.vehicles.length > overLoadThreshold) {
                const newVhicleList = [...state.vehicles, payload];
                sumitAll(newVhicleList);
                return {
                    ...state,
                    actionCount: state.actionCount + 1,
                    vehicles: [],
                    isOverLoaded: true
                }
            }
            return {
                ...state,
                actionCount: state.actionCount + 1,
                vehicles: [...state.vehicles, payload]
            }
        case 'SET_VEHICLE':
                return {
                    ...state,
                    vehicles: action.payload
                }
        default:
            return state;
    }
};

export default Reducer;