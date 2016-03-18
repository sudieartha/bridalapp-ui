import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, array, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import Card, { Front, Back } from '../Card/Card';
import StoreCard from './StoreCard'

function load(params) {
	log.log('load', params);
	params && app.stores.search.setFilter(params);
	return app.stores.search.search()
		.then(results => {
			log.log('load: search returned ' + results.length + ' stores.');
			return results;
		})
		.catch((error) => {
			log.error('Searching stores failed.', error);
			return error;
		});
}

@onload(load)
@connect(app.stores.search.connector)
export default class StoreBrowser extends React.Component {
	static propTypes = {
		pending: bool,
		busy: bool,
		done: bool,
		error: any,
		filter: object.isRequired,
		results: array.isRequired,
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	render() {
		log.debug('render', this.props);
		const { results } = this.props;
		return (
			<Scroller
				className="StoreBrowser"
				bufferBefore={4}
				items={results}
				bufferAfter={8}
				renderItem ={ (item, idx) => (
					<StoreCard store={item} />
				)}
			/>
		);
	}
}
