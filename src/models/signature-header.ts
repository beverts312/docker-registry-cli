import Jwk = require('./jwk');

class SignatureHeader {
	public jwk:Jwk;
	public alg: string;
}

export = SignatureHeader;