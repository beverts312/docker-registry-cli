import SignatureHeader = require('./SignatureHeader');

class Signature {
	public header: SignatureHeader;
	public signature:string;
	public protected:string;
}

export = Signature;