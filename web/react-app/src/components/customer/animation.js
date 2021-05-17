import React from 'react';
import "./animation.css"

class Animation extends React.Component {

    constructor() {
        super()
        this.state = {
            count: 0,
        }

        this.componentWilMount = this.componentWillMount.bind(this)

    }

    componentWillMount() {
        setTimeout(() => { this.props.history.push({ pathname: '/customer' }) }, 4500)

    }


    render() {


        return (

            <div className="animation" >

                <div className="logo" >
                    <i class="fa fa-truck fa-3x fa-flip-horizontal" aria-hidden="true"></i>
                </div>

                <div className="logo-text" >
                    <h1 >Snacks in a Van</h1>

                </div>



            </div>
        )
    }

}

export default Animation;