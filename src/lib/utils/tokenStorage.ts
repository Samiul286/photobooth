let storage: any;

if (typeof window !== 'undefined') {
	// hanya dijalankan di browser
	const { EncryptStorage } = await import('encrypt-storage');
	const SECRET_KEY = import.meta.env.VITE_REACT_APP_SECRET_KEY_STORE;

	if (!SECRET_KEY) {
		throw new Error('Missing SECRET_KEY environment variable.');
	}

	storage = new EncryptStorage(SECRET_KEY);
}

const token_auth = 'token_auth';

export const tokenStore = {
	storeToken(token: string) {
		if (!storage) return;
		storage.setItem(token_auth, token);
	},

	retrieveToken() {
		if (!storage) return null;
		return storage.getItem(token_auth);
	},

	removeToken() {
		if (!storage) return;
		storage.removeItem(token_auth);
	}
};
