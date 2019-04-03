import * as Immutable from 'immutable';

export function responsiveStates(state = Immutable.fromJS({
    responsive: null,
    headerMore: true
}), action) {
    switch (action.type) {
        case 'RESPONSIVE':
            return state.set('responsive',action.data);
        case 'HEADER_MORE':
            return state.set('headerMore',action.data);
        default:
            return state;
    }
}