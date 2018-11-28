import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RoutedMap, MappingConstants, FeatureCollectionDisplay } from "react-cismap";
import { routerActions as RoutingActions } from "react-router-redux";
import { WMSTileLayer } from 'react-leaflet';
import L from 'leaflet';
import { bindActionCreators } from 'redux';
import queryString from "query-string";
import objectAssign from "object-assign";

import "url-search-params-polyfill";
import { actions as UIStateActions } from '../redux/modules/uiState';
import { Icon } from 'react-fa';


function mapStateToProps(state) {
	return {
		uiState: state.uiState,
		routing: state.routing,

	};
}

function mapDispatchToProps(dispatch) {
	return {
		uiStateActions: bindActionCreators(UIStateActions, dispatch),
		routingActions: bindActionCreators(RoutingActions, dispatch),

	};
}


function modifyQueryPart(search, modifiedParts) {
	let query = queryString.parse(search);
	let newQuery = objectAssign(query, modifiedParts);
	return (
	  "?" +
	  queryString.stringify(newQuery, {
		sort: (m, n) => {
		  return getOrderOfQueryPart(m) >= getOrderOfQueryPart(n);
		}
	  })
	);
  }

  function getOrderOfQueryPart(part) {
	const order = ["lat", "lng", "zoom"];
	let pos = order.indexOf(part);
	if (pos === -1) {
	  return 1000000;
	} else {
	  return pos;
	}
  }
export class DocViewer_ extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.gotoHome = this.gotoHome.bind(this);
		this.getMapRef = this.getMapRef.bind(this);
		this.state = {
			caching: 0,
			
		};
	}
	
	componentDidMount() {}

	componentDidUpdate() {
	}


	gotoHome() {
		if (this.topicMap) {
			this.topicMap.wrappedInstance.gotoHome();
		}
	}

	getMapRef() {
		if (this.topicMap) {
			return this.topicMap.wrappedInstance.leafletRoutedMap.leafletMap.leafletElement;
		}
		return undefined;
	}
	render() {
		let urlSearchParams = new URLSearchParams(this.props.routing.location.search);

		const mapStyle = {
			height: this.props.uiState.height,
			cursor: this.props.cursor
		  };
		const mapRef = this.getMapRef();
		let menuIsHidden=false;
		if (this.props.uiState.width<768) {
			menuIsHidden=true;
		}

		let lblDownLoadFeb="Flächenerfassungsbogen herunterladen (PDF)";
		let lblInfo=(this.props.uiState.infoElementsEnabled) ? "Flächeninfo ausblenden" : "Flächeninfo einblenden";
		let lblChart=(this.props.uiState.chartElementsEnabled) ? "Diagramm ausblenden" : "Diagramm einblenden";
		let lblContact=(this.props.uiState.contactElementEnabled) ? "Ansprechpartner ausblenden" : "Ansprechpartner einblenden";
		let lblExit="Hilfe anzeigen";
	
		return (
			<div>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">B442_DBA.pdf</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
  <Nav>
	<NavItem eventKey={1} href="#">
	<Icon name="step-backward" />
      </NavItem>
      <NavItem eventKey={2} href="#">
	  <Icon name="chevron-left" />
      </NavItem>
	  <NavItem eventKey={1} href="#">
        1 / 1
      </NavItem>
	  <NavItem eventKey={1} href="#">
	  <Icon name="chevron-right" />
      </NavItem>
      <NavItem eventKey={2} href="#">
	  <Icon name="step-forward" />

      </NavItem>
    </Nav>
	<Navbar.Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </Navbar.Text>
	<Nav>
	
      <NavItem eventKey={2} href="#">
	  <Icon name="arrows-h" />
      </NavItem>
	  <NavItem eventKey={1} href="#">
	  <Icon name="arrows-v" />
      </NavItem>
    </Nav>

    <Nav pullRight>
	<NavItem eventKey={1} href="#">
	  <Icon name="download" />
      </NavItem>
	<NavItem eventKey={1} href="#">
	  <Icon name="file-archive-o" />
      </NavItem>
      <NavItem eventKey={2} href="#">
	  <Icon name="question-circle" />
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
			<RoutedMap
              key={"leafletRoutedMap"}
			  referenceSystem={L.CRS.Simple}
              ref={leafletMap => {
                this.leafletRoutedMap = leafletMap;
              }}
              style={mapStyle}
              fallbackPosition={{
                lat: 0,
                lng: 0
              }}
              ondblclick={this.props.ondblclick}
              onclick={this.props.onclick}
              locationChangedHandler={location => {
                this.props.routingActions.push(
                  this.props.routing.location.pathname +
                    modifyQueryPart(this.props.routing.location.search, location)
                );
                //this.props.locationChangedHandler(location);
              }}
              
              autoFitProcessedHandler={() => this.props.mappingActions.setAutoFit(false)}
              urlSearchParams={urlSearchParams}
              boundingBoxChangedHandler={bbox => {
                // this.props.mappingActions.mappingBoundsChanged(bbox);
                // this.props.mappingBoundsChanged(bbox);
              }

              }
              backgroundlayers={"no"}
              fallbackZoom={10}
			  fullScreenControlEnabled={true}

              locateControlEnabled={false}
            >

			<WMSTileLayer
					ref={(c) => (this.modelLayer = c)}
					key={"docLayer"}
						
					url="http://s10221:8081/rasterfariWMS?SRS=EPSG:25832"
					layers='vermessungsregister/Vermessungsrisse/3485/VR_501-3485-009-00000001.jpg'
					version="1.1.1"
					transparent="true"
					format="image/png"
					tiled="true"
					styles="default"
					maxZoom={19}
					opacity={1}
					//caching={this.state.caching}
				/>
			</RoutedMap>
			</div>
		);
	}
}

const DocViewer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(DocViewer_);

export default DocViewer;

DocViewer.propTypes = {
	ui: PropTypes.object,
	uiState: PropTypes.object
};

