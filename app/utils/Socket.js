const ALL_EVENTS_SUBSCR_ID = 0;
const BLOCK_EVENTS_SUBSCR_ID = 1;
const PENDING_TRANSACTION_EVENTS_SUBSCR_ID = 0;

class Socket {
	
	constructor(url = 'wss://bitshares.openledger.info/ws') {
		this.connectionURL = url;
		this.connection = null;
		this.currentID = 0;
		
		this.noticeSubscribtions = {};
		this.noticeSubscribtions[ALL_EVENTS_SUBSCR_ID] = [];
		this.noticeSubscribtions[BLOCK_EVENTS_SUBSCR_ID] = [];
		this.noticeSubscribtions[PENDING_TRANSACTION_EVENTS_SUBSCR_ID] = [];
		
		this.apiIDs = {
			database: null,
			history: null
		};
		// subscribe callback function by id
		this.subscribers = {};
		this.connect();
	}
	
	connect() {
		this.connection = new WebSocket(this.connectionURL);
		this.connection.onopen = this.onOpen.bind(this);
		this.connection.onclose = this.onClose.bind(this);
		this.connection.onmessage = this.onMessage.bind(this);
		this.connection.onerror = this.onError.bind(this);
	}
	
	login() {
		return new Promise(resolve => {
			this.call([1, "login", ["", ""]]).then(() => {
				Promise.all([
					this.call([1, "database", []]).then(result => this.apiIDs.database = result),
					this.call([1, "history", []]).then(result => this.apiIDs.history = result)
				]).then(resolve.bind(this));
			});
		});
	}
	
	onClose(event) {
		if(event.wasClean) {
			console.log('Socket Connection closed');
		} else {
			console.log('Socket Connection killed');
		}
		// console.log('Socket Code: ', event);
	}
	
	onOpen() {
		console.log('Socket Connection has been open');
		this.login().then(() => this.setBlockchainCallbacks());
	}
	
	onMessage(message) {
		let data = JSON.parse(message.data);
		if(typeof data.method != 'undefined' && data.method == 'notice') {
			
			if(!this.noticeSubscribtions[data.params[0]]) return;
			this.noticeSubscribtions[data.params[0]].forEach(cb => cb(data.params[1]));
			return;
		}
		
		if(typeof this.subscribers[data.id] == 'function') {
			this.subscribers[data.id](data.result);
			delete this.subscribers[data.id];
		} else {
			console.log(data);
		}
	}
	
	onError(error) {
		console.log('Socket Error');
	}
	
	call(params) {
		return new Promise((resolve, reject) => {
			this.currentID++;
			let id = this.currentID;
			this.subscribers[id] = resolve;
			this.connection.send(JSON.stringify({"id": id, "method": "call", "params": params}));
		});
	}
	
	setBlockchainCallbacks() {
		this.call([this.apiIDs.database, "set_subscribe_callback", [ALL_EVENTS_SUBSCR_ID, true]]);
		this.call([this.apiIDs.database, "set_block_applied_callback", [BLOCK_EVENTS_SUBSCR_ID, true]]);
		this.call([this.apiIDs.database, "set_pending_transaction_callback", [PENDING_TRANSACTION_EVENTS_SUBSCR_ID, true]]);
	}
}

export default new Socket();