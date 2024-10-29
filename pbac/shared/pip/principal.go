package pip

import (
	"fmt"
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/standards"
)

// DeterminePrincipal determines the type of principal and its primary key.
func DeterminePrincipal(a types.AttributeSet) (string, string) {
	if zaak, ok := a.GetAttribute(standards.AttrZaakType).(string); ok && zaak != "" {
		if taak, ok2 := a.GetAttribute(standards.AttrTaak).(string); ok2 && taak != "" {
			zaak = fmt.Sprintf("%s-%s", zaak, taak)
		}
		return "zaak", zaak
	}

	if jwt := a.GetAttribute(standards.AttrJWT); jwt != nil {
		if a2, ok := jwt.(map[string]any); ok {
			if valid, ok2 := a2[standards.AttrValid].(bool); ok2 && valid {
				switch t := a2[standards.AttrClaims].(type) {
				case string:
					return "jwt", t
				case []string:
					return "jwt", strings.Join(t, ",")
				}
			}
		}
	}

	if apikey, ok := a.GetAttribute(standards.AttrApiKey).(string); ok && apikey != "" {
		return "app", apikey
	}

	return "invalid", "invalid"
}
