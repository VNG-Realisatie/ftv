package module

import "runtime/debug"

// GetModuleVersion attempts to retrieve the version of the given module.
func GetModuleVersion(module string) string {
	if info, ok := debug.ReadBuildInfo(); ok {
		for i := range info.Deps {
			if info.Deps[i].Path == module {
				return info.Deps[i].Version
			}
		}
	}
	return ""
}
