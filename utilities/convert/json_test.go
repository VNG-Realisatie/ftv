package convert

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMustMarshall(t *testing.T) {
	testCases := []struct {
		name    string
		in      any
		want    string
		wantErr bool
	}{
		{name: "empty", want: "null"},
		{name: "string", in: "hello world", want: `"hello world"`},
		{name: "object", in: map[string]any{"hello": "world", "int": 123}, want: `{"hello":"world","int":123}`},
		{name: "channel", in: make(chan int), wantErr: true},
		{name: "slice", in: []string{"hello", "world"}, want: `["hello","world"]`},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			defer func() {
				e := recover()
				if tc.wantErr {
					assert.NotNil(t, e)
				} else {
					assert.Nil(t, e)
				}
			}()

			want := MustMarshall(tc.in)
			assert.Equal(t, tc.want, string(want))
		})
	}
}
