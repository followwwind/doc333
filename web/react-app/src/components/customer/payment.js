import React from 'react';
import "./style.css"
import "./payment.css"

class Payment extends React.Component {

    constructor() {
        super()
        this.state = {

        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.pushToOrderProgress = this.pushToOrderProgress.bind(this)
    }

    componentWillMount() {

    }

    pushToOrderProgress() {
        this.props.history.push({
            pathname: '/customer/order',
        });
    }

    render() {

        return (
            <div className="payment">
                <div className="title">
                    <h1>Payment success</h1>
                    <div className="payment-tick">
                        <i class="fa fa-check fa-5x" aria-hidden="true"></i>
                    </div>


                </div>
                <button className="payment-success" onClick={this.pushToOrderProgress}>View Order Progress</button>

            </div>
        )
    }
}

export default Payment;