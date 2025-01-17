import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsAuthenticating, loginUser } from '@src/ducks/auth';
import { LoginForm } from '@src/components/screens';
import formValidation from '@src/utils/form/formValidation';

const mapStateToProps = (state) => ({
    isAuthenticating: getIsAuthenticating(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (loginCredentials) => {
        const { actions } = this.props;

        this.setState({ formErrors: {} });

        formValidation({ loginCredentials })
            .then(() => actions.loginUser(loginCredentials))
            .catch((err) => this.setState({ formErrors: err.loginCredentials }));
    }

    render() {
        const { isAuthenticating } = this.props;
        const { formErrors } = this.state;

        return (
            <LoginForm
                isAuthenticating={isAuthenticating}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
