"use strict";

import * as types from '../actions/actionTypes';

const initialState = {
	chainStoreLoading: true,
	chainStoreConnected: false
};

export default function wallet(state = initialState, action = {}) {
	switch (action.type) {
		case types.CHANGE_CHAIN_STORE_CONNECT_STATUS:
			return {
				...state,
				chainStoreLoading: action.loading,
				chainStoreConnected: action.isConnected,
				chainStoreSyncFail: action.isSyncFail
			};
		default:
			return state;
	}
}