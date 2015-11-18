import Jwk = require('./Jwk');

class SignatureHeader {
	public jwk:Jwk;
	public alg: string;
}

export = SignatureHeader;