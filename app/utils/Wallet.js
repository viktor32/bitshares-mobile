import * as walletActions from "../actions/walletActions";
// import {ChainStore, PrivateKey, key, Aes} from "graphenejs-lib";
import {ChainStore} from "graphenejs-lib";

class WalletUtils {
	
	initData(navigator) {
		let wallet = this._loadWalletFromBD();
		if(!wallet) {
			return navigator.to('login');
		}
	}
	
	createWallet(password, brainkey, name = 'first_wallet') {
		// let password_aes = Aes.fromSeed(password_plaintext);
	}
	
	_loadWalletFromBD() {
		
	}
}

export default new WalletUtils();