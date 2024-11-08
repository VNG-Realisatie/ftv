package pip

import (
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt/v5"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

// See RFC-6750 for the OAuth2 Authorization bearer scheme!
func (p *pip) processAuth(req *types.Request, auth string, a types.AttributeSet) {
	if strings.HasPrefix(auth, "Bearer ") {
		p.processBearer(req, auth[7:], a)
	} else {
		p.logger.Warn("unsupported authorization header", "request-uid", req.UID, "authorization", auth)
	}
}

func (p *pip) processBearer(req *types.Request, bearer string, a types.AttributeSet) {
	token, err := jwt.Parse(bearer, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret1!"), nil
	})
	if err != nil {
		p.logger.Error("failed to parse jwt token", "request-uid", req.UID, "error", err)
		return
	}

	m := map[string]any{
		standards.AttrValid:   token.Valid,
		standards.AttrHeaders: token.Header,
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		m[standards.AttrClaims] = claims
	} else {
		p.logger.Warn("jwt token without claims", "request-uid", req.UID, "jwt", token)
	}

	a.AddAttribute(standards.AttrJWT, m)
}
