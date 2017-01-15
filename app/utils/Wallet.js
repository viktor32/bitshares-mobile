import * as walletActions from "../actions/walletActions";

class WalletUtils {
	
	initData(navigator) {
		let wallet = this._loadWalletFromBD();
		if(!wallet) {
			return navigator.to('login');
		}
	}
	
	_loadWalletFromBD() {
		
	}
}

export default new WalletUtils();