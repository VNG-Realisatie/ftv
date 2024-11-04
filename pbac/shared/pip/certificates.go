package pip

import (
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

func (p *pip) processCertificates(req *types.Request, a types.AttributeSet) {
	// certs, ok := req.Attributes[standards.AttrOutwayCerts].([]string)
	// if !ok || certs == nil {
	// 	return
	// }
	//
	// for i := range certs {
	// 	if s, err := base64.URLEncoding.DecodeString(certs[i]); err == nil {
	// 		if cert, err2 := x509.ParseCertificates([]byte(s)); err2 == nil {
	//
	// 			p.logger.Debug("certificate", "i", i, "cert", cert)
	// 		}
	// 	}
	// }
}
