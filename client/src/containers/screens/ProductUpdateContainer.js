import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { updateProduct } from '@src/ducks/products';
import { ProductContainer } from '@src/containers/screens';
import { ProductUpdateForm } from '@src/components/screens';
import formValidation from '@src/utils/form/formValidation';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateProduct }, dispatch),
    redirectToProduct: (productId) => dispatch(push(`products/${productId}`))
});

@ProductContainer
@connect(undefined, mapDispatchToProps)
export default class ProductUpdateContainer extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        redirectToProduct: PropTypes.func.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (updateProductData) => {
        const { actions, redirectToProduct, product } = this.props;

        this.setState({ formErrors: {} });

        formValidation({ updateProductData })
            .then(() => actions.updateProduct(product.id, updateProductData))
            .then(() => redirectToProduct(product.id))
            .catch((err) => this.setState({ formErrors: err.updateProductData }));
    }

    render() {
        const { product } = this.props;
        const { formErrors } = this.state;

        return (
            <ProductUpdateForm
                product={product}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
