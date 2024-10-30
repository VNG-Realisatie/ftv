package pip

func (p *pip) load() {
	if p.attrStore != "" {
		p.loadAttributes()
	}
	if p.entityStore != "" {
		p.loadEntities()
	}
}

func (p *pip) loadAttributes() {

}

func (p *pip) loadEntities() {

}
