import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const hashEmail = md5(gravatarEmail).toString();
    console.log('hash ', hashEmail);
    return (
      <div>
        <p>{gravatarEmail}</p>
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">0</p>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt=""
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  name: state.user.name,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
