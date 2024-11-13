package opa

import (
	"bytes"
	"fmt"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

// DeterminePrincipal determines the type of principal and its primary key.
func DeterminePrincipal(a types.AttributeSet) (string, string) {
	if zaak, ok := a.GetAttribute(standards.AttrZaakType).(string); ok && zaak != "" {
		if taak, ok2 := a.GetAttribute(standards.AttrTaak).(string); ok2 && taak != "" {
			zaak = fmt.Sprintf("%s-%s", zaak, taak)
		}
		return "zaak", zaak
	}

	if doel, ok := a.GetAttribute(standards.AttrDoelbinding).(string); ok && doel != "" {
		return "doelbinding", doel
	}

	if jwt := a.GetAttribute(standards.AttrJWT); jwt != nil {
		if valid, ok2 := a.GetAttribute(standards.AttrValid).(bool); ok2 && bool(valid) {
			switch t := a.GetAttribute(standards.AttrClaims).(type) {
			case string:
				return "jwt", t

			case []string:
				out := bytes.Buffer{}
				for i := range t {
					out.WriteString(string(t[i]))
					out.WriteByte(',')
				}
				out.Truncate(1)
				return "jwt", out.String()
			}
		}
	}

	if apikey, ok := a.GetAttribute(standards.AttrApiKey).(string); ok && apikey != "" {
		return "app", apikey
	}

	return "invalid", "invalid"
}
