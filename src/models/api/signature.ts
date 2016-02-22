import SignatureHeader = require('./signature-header');

class Signature {
	public header: SignatureHeader;
	public signature:string;
	public protected:string;
}

export = Signature;