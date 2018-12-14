const { join } = require('path');
const { Collection } = require('discord.js');
const { Store } = require('klasa');
const Feed = require('./Feed');

class FeedStore extends Collection {

	constructor(client) {
		super();
		Object.defineProperty(this, 'client', { value: client });
		this.userDir = join(this.client.clientBaseDir, 'feeds');
		this.holds = Feed;
		this.name = 'feeds';
	}

	delete(name) {
		const piece = this.resolve(name);
		if (!piece) return false;
		super.delete(piece.name);
		return true;
	}

	set(piece) {
		if (!(piece instanceof this.holds)) return this.client.emit('error', `Only ${this.name} may be stored in the Store.`);
		const existing = this.get(piece.name);
		if (existing) this.delete(existing);
		super.set(piece.name, piece);
		return piece;
	}

	async init() {
	
	}

	// Technically left for more than just documentation
	/* eslint-disable no-empty-function */
	load() {}
	async loadAll() {}
	resolve() {}
	/* eslint-enable no-empty-function */

}

Store.applyToClass(FeedStore);

module.exports = FeedStore;