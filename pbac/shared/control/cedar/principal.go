package cedar

import (
	"fmt"
	"strings"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

// DeterminePrincipal determines the type of principal and its primary key.
func DeterminePrincipal(a *attributes) (cedar.EntityType, cedar.String) {
	if zaak, ok := a.GetAttribute(standards.AttrZaakType).(string); ok && zaak != "" {
		if taak, ok2 := a.GetAttribute(standards.AttrTaak).(string); ok2 && taak != "" {
			zaak = fmt.Sprintf("%s-%s", zaak, taak)
		}
		return TypeZaak, cedar.String(zaak)
	}

	if gs, ok := a.GetAttribute(standards.AttrGrondslag).(string); ok && gs != "" {
		if doel, ok2 := a.GetAttribute(standards.AttrDoelbinding).(string); ok2 && doel != "" {
			gs = fmt.Sprintf("%s-%s", gs, doel)
		}
		return TypeGrondslag, cedar.String(gs)
	}

	if jwt := a.GetAttribute(standards.AttrJWT); jwt != nil {
		if a2, ok := jwt.(*attributes); ok {
			if valid, ok2 := a2.GetAttribute(standards.AttrValid).(bool); ok2 && valid {
				switch t := a2.GetAttribute(standards.AttrClaims).(type) {
				case string:
					return TypeJWT, cedar.String(t)
				case []string:
					return TypeJWT, cedar.String(strings.Join(t, ","))
				}
			}
		}
	}

	if apikey, ok := a.GetAttribute(standards.AttrApiKey).(string); ok && apikey != "" {
		return TypeApp, cedar.String(apikey)
	}

	return TypeInvalid, "invalid"
}
