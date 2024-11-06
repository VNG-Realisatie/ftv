package pip

import (
	"fmt"
	"net/netip"
	"regexp"
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processForwarded(fwd1, fwd2 string, a types.AttributeSet) {
	list1, list2 := strings.Split(fwd1, ","), strings.Split(fwd2, ",")

	if len(list1) < len(list2) {
		if p.processForwardedList(list2, a) {
			return
		}
		p.processForwardedList(list1, a)
	} else {
		if p.processForwardedList(list1, a) {
			return
		}
		p.processForwardedList(list2, a)
	}
}

func (p *pip) processForwardedList(fwd []string, a types.AttributeSet) bool {
	for i := range fwd {
		list := fwdRX.FindStringSubmatch(strings.TrimSpace(fwd[i]))
		for j := 1; j < len(list); j++ {
			if s := list[j]; len(s) > 0 {
				if addr, err := netip.ParseAddr(s); err == nil && validIP(addr) {
					a.AddAttribute(standards.AttrClientIP, addr.String())
					return true
				}
			}
		}
	}
	return false
}

func validIP(addr netip.Addr) bool {
	return addr.IsValid() &&
		!addr.IsLoopback() &&
		!addr.IsMulticast() &&
		!addr.IsUnspecified() &&
		!addr.IsInterfaceLocalMulticast() &&
		!addr.IsLinkLocalUnicast() &&
		!addr.IsLinkLocalMulticast()
}

var (
	ip4Match  = `([0-9\.]+)`
	ip6Match  = `([a-f0-9:]+)`
	portMatch = `[:0-9]*`
	fwdMatch1 = fmt.Sprintf(`^(?i:%s|%s)$`, ip4Match, ip6Match)
	fwdMatch2 = fmt.Sprintf(`(?i:(?:for=)(?:%s%s|(?:"\[%s\]%s")))`, ip4Match, portMatch, ip6Match, portMatch)
	fwdRX     = regexp.MustCompile(fmt.Sprintf(`(?:%s|%s)`, fwdMatch1, fwdMatch2))
)
