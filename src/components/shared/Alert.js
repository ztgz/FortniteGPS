import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
    render() {
        return (
            !this.props.visable ||
                <div className={`alert ${this.props.alertType}`} >
                    {this.props.text}
                    <button type="button" className="close" aria-label="Close" onClick={this.props.onClick}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        );
    }
}

Alert.propTypes = {
    alertType: PropTypes.string,
    onClick: PropTypes.func,
    visable: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

Alert.defaultProps = {
    alertType: 'alert-danger',
    onClick: () => console.log("Alert was clicked")
}

export default Alert;