import React, { Component } from "react";
import ResizeAware from "react-resize-aware";
import PropTypes from "prop-types";

class NeoGraph extends Component {
  constructor(props) {
    super(props);
    this.visRef = React.createRef();
    console.log(this.visRef)
  }

  componentDidMount() {
    const { config } = this.props;
    /*
      Since there is no neovis package on NPM at the moment, we have to use a "trick":
      we bind Neovis to the window object in public/index.html.js
    */
    console.log(this.visRef)
    this.vis = new window.NeoVis.default({
      container_id: this.visRef.current.id,
      ...config
    });
    this.vis.render();
  }

  render() {
    const { width, height, containerId, backgroundColor } = this.props;
    return (
      <div
        id={containerId}
        ref={this.visRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: `${backgroundColor}`
        }}
      />
    );
  }
}

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3"
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string
};

class ResponsiveNeoGraph extends Component {
  state = {
    width: 400,
    height: 400
  };

  handleResize = ({ width, height }) => {
    // console.log("resize", width, height);
    const side = Math.max(width, height) / 2;
    this.setState({
      width: side,
      height: side
    });
  };

  render() {
    const responsiveWidth = this.state.width;
    const responsiveHeight = this.state.height;
    const neoGraphProps = {
      ...this.props,
      width: responsiveWidth,
      height: responsiveHeight
    };
    return (
      <ResizeAware
        style={{ position: "relative" }}
        onlyEvent
        onResize={this.handleResize}
      >
        <NeoGraph {...neoGraphProps} />
      </ResizeAware>
    );
  }
}

const responsiveNeoGraphDefaultProps = Object.keys(NeoGraph.defaultProps)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    return Object.assign(accumulator, { [key]: NeoGraph.defaultProps[key] });
  }, {});

ResponsiveNeoGraph.defaultProps = {
  ...responsiveNeoGraphDefaultProps
};

// eslint-disable-next-line
const responsiveNeoGraphPropTypes = Object.keys(NeoGraph.propTypes)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    // eslint-disable-next-line
    return Object.assign(accumulator, { [key]: NeoGraph.propTypes[key] });
  }, {});

ResponsiveNeoGraph.propTypes = {
  ...responsiveNeoGraphPropTypes
};

export { NeoGraph, ResponsiveNeoGraph };
