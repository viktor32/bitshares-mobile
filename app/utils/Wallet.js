import * as walletActions from "../actions/walletActions";
import KeyUtils from './Keys';
import {ChainStore} from "react-native-bitshares";

class WalletUtils {
	
	constructor() {
	}
	
	initData(navigator) {
		let wallet = this._loadWalletFromBD();
		if(!wallet) {
			return navigator.to('login');
		}
	}
	
	restoreWallet(password, brainkey) {
		this._getRelated(brainkey);
		// let password_aes = Aes.fromSeed(password_plaintext);
	}
	
	_getRelated(brainKey) {
		let keys = KeyUtils.fromBrainKey(brainKey);
		Promise.all(keys.map(key => ChainStore.getAccountRefsOfKey(key.public_string))).then(result => {
			let related = [];
			result.forEach(row => {
				if(row.refs.size) {
					row.refs.toJS().forEach(id => {
						if(related.indexOf(id) < 0) {
							related.push(id);
						}
					});
				}
			});
			console.log(related);
		})
	}
	
	_loadWalletFromBD() {
		
	}
}

export default new WalletUtils();