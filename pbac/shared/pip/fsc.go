package pip

import (
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt/v5"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processFSC(req *types.Request, auth string, a types.AttributeSet) string {
	if strings.HasPrefix(auth, "Bearer ") {
		return p.processFSCBearer(req, auth[7:], a)
	}
	return ""
}

func (p *pip) processFSCBearer(req *types.Request, bearer string, a types.AttributeSet) string {
	token, err := jwt.Parse(
		bearer,
		func(token *jwt.Token) (interface{}, error) {
			if key, ok := token.Header["x5t#S256"].(string); ok {
				key2, err2 := base64.RawURLEncoding.DecodeString(key)
				if err2 == nil {
					return x509.ParsePKIXPublicKey(key2)
				}
				return nil, err2
			}
			return nil, fmt.Errorf("no key found in token")
		},
	)

	// NOTE: FSC generates an unverifiable token, so we skip validation.
	// It means this JWT is flagged as NOT VALID, but we can access the data that we need,
	// and it can only affect the outcome of the authorisation.

	if err != nil {
		p.logger.Debug("failed to parse FSC token", "request-uid", req.UID, "error", err)
	}
	if token == nil {
		return ""
	}

	m := map[string]any{
		standards.AttrValid:   token.Valid,
		standards.AttrHeaders: token.Header,
	}

	var newURI string

	if token.Claims != nil {
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			m[standards.AttrClaims] = map[string]any(claims)

			aud, ok2 := claims["aud"].(string)
			svc, ok3 := claims["svc"].(string)
			if ok2 && ok3 {
				newURI = fmt.Sprintf("%s/%s", aud, svc)
			}
		}
	}

	a.AddAttribute(standards.AttrFSC, m)

	return newURI
}

type fscThumbprint string

func (p fscThumbprint) Value() string {
	return string(p)
}
func (p fscThumbprint) IsEqual(other fscThumbprint) bool {
	return p.Value() == other.Value()
}
