package pip

import (
	"net/netip"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

func TestValidIP(t *testing.T) {
	testCases := []struct {
		name    string
		ip      string
		wantErr bool
		want    bool
	}{
		{name: "empty", wantErr: true},
		{name: "invalid ipv4", ip: "1.2.256.1", wantErr: true},
		{name: "invalid ipv6", ip: "a:b:10000::1", wantErr: true},
		{name: "loopback ipv4", ip: "127.0.0.1"},
		{name: "loopback ipv6", ip: "::1"},
		{name: "private ipv4", ip: "192.168.1.1", want: true},
		{name: "private ipv6", ip: "FD00::15", want: true},
		{name: "multicast ipv4", ip: "224.0.1.1"},
		{name: "multicast ipv6", ip: "ff02::9"},
		{name: "unspecified ipv4", ip: "0.0.0.0"},
		{name: "unspecified ipv6", ip: "::"},
		{name: "valid ipv4", ip: "109.6.66.66", want: true},
		{name: "valid ipv6", ip: "3810:0628:2BA2:0000:0000:0127:5743:27b1", want: true},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			addr, err := netip.ParseAddr(tc.ip)
			if tc.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				got := validIP(addr)
				assert.Equal(t, tc.want, got)
			}
		})
	}
}

func TestForwardedList(t *testing.T) {
	testCases := []struct {
		name   string
		list   []string
		wantIP any
	}{
		{
			name: "empty",
		},
		{
			name: "single invalid",
			list: []string{"1.2.256.4"},
		},
		{
			name: "many invalid",
			list: []string{"1.2.256.4", "aa", "192.168.x.1", "for=127.0.0.1", "invalid"},
		},
		{
			name:   "one good",
			list:   []string{"1.2.256.4", "aa", "for=192.168.9.1; by=127.0.0.1", "127.0.0.1", "invalid"},
			wantIP: "192.168.9.1",
		},
		{
			name:   "few good",
			list:   []string{"1.2.256.4", "aa", "192.168.x.1", "127.0.0.1", "invalid", `for="[1234:5555:1cdf::8]:123"`, "hello world", "10.0.0.1", "bad"},
			wantIP: "1234:5555:1cdf::8",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := types.NewAttributeSet()
			require.NotNil(t, a)

			p := pip{}
			p.processForwardedList(tc.list, a)

			got := a.GetAttribute("client-ip")
			assert.Equal(t, tc.wantIP, got)
		})
	}
}

func TestForwarded(t *testing.T) {
	testCases := []struct {
		name   string
		fwd1   string
		fwd2   string
		wantIP any
	}{
		{
			name: "empty",
		},
		{
			name: "single invalid (1)",
			fwd1: "1.2.256.4",
		},
		{
			name: "single invalid (2)",
			fwd2: "1.2.256.4",
		},
		{
			name: "single invalid (both)",
			fwd1: "x.y.z",
			fwd2: "1.2.256.4",
		},
		{
			name: "many invalid (1)",
			fwd1: "1.2.256.4 , aa , 192.168.x.1 , 127.0.0.1 , invalid",
		},
		{
			name: "many invalid (1)",
			fwd2: "1.2.256.4 , aa , 192.168.x.1 , 127.0.0.1 , invalid",
		},
		{
			name: "many invalid (both)",
			fwd1: "1.2.256.4 , aa , 192.168.x.1 , 127.0.0.1 , invalid",
			fwd2: " 192.168.x.1 , 1.2.256.4  , invalid, aa , 127.0.0.1, hoho",
		},
		{
			name:   "single valid (1)",
			fwd1:   "by=10.1.1.1; for=1.2.250.4; host=haha; port=8011",
			wantIP: "1.2.250.4",
		},
		{
			name:   "single valid (2)",
			fwd2:   "1.2.25.4",
			wantIP: "1.2.25.4",
		},
		{
			name:   "single valid (both)",
			fwd1:   "10.0.0.10",
			fwd2:   "1234:555::9",
			wantIP: "10.0.0.10",
		},
		{
			name:   "few valid (1)",
			fwd1:   "1.2.256.4 , aa , 192.168.x.1 , 99:123:aaa::b  , 127.0.0.1 , invalid",
			wantIP: "99:123:aaa::b",
		},
		{
			name:   "few valid (1)",
			fwd2:   "1.2.256.4 , aa , 192.168.x.1 , 127.0.0.1, 1.2.3.4 , invalid",
			wantIP: "1.2.3.4",
		},
		{
			name:   "few valid (both)",
			fwd1:   "1.2.256.4 , aa , 192.168.x.1 , 12.10.11.1 , invalid",
			fwd2:   " 192.168.x.1 , -1.2.3.4 , invalid , unknown,hello world, 127.0.0.1, hoho",
			wantIP: "12.10.11.1",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := types.NewAttributeSet()
			require.NotNil(t, a)

			p := pip{}
			p.processForwarded(tc.fwd1, tc.fwd2, a)

			got := a.GetAttribute("client-ip")
			assert.Equal(t, tc.wantIP, got)
		})
	}
}
