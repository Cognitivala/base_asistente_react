import * as Immutable from 'immutable';

export function cidStates(state = Immutable.fromJS({
    cid: null
}), action) {
    switch (action.type) {
        case 'SET_CID':
            return state.set('cid',action.data);
        default:
            return state;
    }
}