package cedar

import (
	"bytes"
	"fmt"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

// DeterminePrincipal determines the type of principal and its primary key.
func DeterminePrincipal(a *attributes) (cedar.EntityType, cedar.String) {
	if zaak, ok := a.GetAttribute(standards.AttrZaakType).(cedar.String); ok && zaak != "" {
		if taak, ok2 := a.GetAttribute(standards.AttrTaak).(cedar.String); ok2 && taak != "" {
			zaak = cedar.String(fmt.Sprintf("%s-%s", zaak, taak))
		}
		return TypeZaak, zaak
	}

	if doel, ok := a.GetAttribute(standards.AttrDoelbinding).(cedar.String); ok && doel != "" {
		return TypeDoelbinding, doel
	}

	if jwt := a.GetAttribute(standards.AttrJWT); jwt != nil {
		if a2, ok := jwt.(*attributes); ok {
			if valid, ok2 := a2.GetAttribute(standards.AttrValid).(cedar.Boolean); ok2 && bool(valid) {
				switch t := a2.GetAttribute(standards.AttrClaims).(type) {
				case cedar.String:
					return TypeJWT, t

				case []cedar.String:
					out := bytes.Buffer{}
					for i := range t {
						out.WriteString(string(t[i]))
						out.WriteByte(',')
					}
					out.Truncate(1)
					return TypeJWT, cedar.String(out.String())
				}
			}
		}
	}

	if apikey, ok := a.GetAttribute(standards.AttrApiKey).(cedar.String); ok && apikey != "" {
		return TypeApp, apikey
	}

	return TypeInvalid, "invalid"
}
