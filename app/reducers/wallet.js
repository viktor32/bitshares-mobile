"use strict";

import * as types from '../actions/actionTypes';

const initialState = {
	walletExist: false
};

export default function wallet(state = initialState, action = {}) {
	switch (action.type) {
		case types.INCREMENT:
			return {
				...state,
				count: state.count + 1
			};
		case types.DECREMENT:
			return {
				...state,
				count: state.count - 1
			};
		default:
			return state;
	}
}