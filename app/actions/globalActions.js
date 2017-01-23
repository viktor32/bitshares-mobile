import * as types from './actionTypes';

export function changeConnectStatus(isConnected, isSyncFail, loading) {
	return {
		type: types.CHANGE_CHAIN_STORE_CONNECT_STATUS,
		isConnected, isSyncFail, loading
	};
}