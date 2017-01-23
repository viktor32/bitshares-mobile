import {
	// ChainStore,
	key
} from "react-native-bitshares";

class Keys {
	
	constructor() {}
	
	fromBrainKey(brainKey, maxSequence = 10) {
		brainKey = key.normalize_brainKey(brainKey);
		let keys = [];
		for(let i = 0; i < maxSequence; i++) {
			keys.push(this._generatePrivateKey(brainKey, i));
		}
		return keys;
	}
	
	_generatePrivateKey(brainKey, sequence) {
		let private_key = key.get_brainPrivateKey(brainKey, sequence);
		return this.derivedKeyStruct(private_key);
	}
	
	derivedKeyStruct(private_key) {
		let public_string = private_key.toPublicKey().toPublicKeyString();
		return {private_key, public_string};
	}
}

export default new Keys();