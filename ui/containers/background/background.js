import { Component } from 'react';
import trianglify from 'trianglify';

const COLORS_X = ['#fff', '#EF6F6E', '#E9225E'];
const COLORS_Y = ['#003B67', '#0088DE', '#29B7F6', '#fff', '#EF6F6E'];

class Background extends Component {
  constructor(props) {
    super(props);

    this.generatePattern = this.generatePattern.bind(this);
  }

  componentDidMount() {
    // Create background and binds method to resize event
    this.generatePattern();
    window.addEventListener('resize', this.generatePattern);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.generatePattern);
  }

  generatePattern() {
    const { pattern } = this;
    if (pattern) {
      const { width, height } = pattern.getBoundingClientRect();
      const triangle = trianglify({
        width,
        height,
        /* eslint camelcase: 0 */
        y_colors: COLORS_Y,
        x_colors: COLORS_X,
        variance: 0.75,
        cell_size: 25,
        color_space: 'rgb'
        /* eslint-enable */
      });

      const canvas = pattern.querySelector('canvas');

      // Check if there is already a canvas
      if (canvas) {
        pattern.removeChild(canvas);
      }

      pattern.appendChild(triangle.canvas());
      this.forceUpdate();
    }
  }

  render() {
    return (

      <section
        ref={c => {
          this.pattern = c;
        }}
        className="pattern"
      >
        <style jsx>{`
          .pattern {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -10;
          }
        `}
        </style>
      </section>
    );
  }
}

export default Background;
