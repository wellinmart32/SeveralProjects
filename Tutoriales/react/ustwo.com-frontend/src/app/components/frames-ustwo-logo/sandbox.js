import FramesUstwoLogo from './';

const Sandbox = React.createClass({
  render() {
    const logoStyles = { transform: `translate3d(0, ${25 * 1}vh, 0)` }

    return (
      <div className="sandbox">
        <FramesUstwoLogo
           componentStyle={logoStyles}
           scrollProgress={0.9}
           isReverse={false}
        />
      </div>
    );
  }
});

export default Sandbox;
