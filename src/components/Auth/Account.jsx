﻿import Entity from '../Entity/Entity';
import Role from './Role';
import Group from './Group';
import PasswordCredential from './PasswordCredential';

import Suid from 'ws.suid';

@Entity
export class Account {
	constructor(id, name, credentials=[], roles=[Role.USER], groups=[]) {
		this.id = id || 0;
		this.version = null;
		this.name = name;
		this.credentials = credentials;
		this.roles = roles;
		this.groups = groups;
	}
}
export default Account;
