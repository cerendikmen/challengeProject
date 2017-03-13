var React = require('react')
var ReactDOM = require('react-dom')
var request
/*
var ProductsList = React.createClass({
    loadProductsFromServer: function(){
        request=$.ajax({
		            url: this.props.url,
		            datatype: 'json',
		            cache: false,
		            success: function(data) {
		                this.setState({data: data});
		            }.bind(this)
		        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadProductsFromServer();
    }, 
    componentWillUnmount: function () {
    	this.request.abort()
	},
    render: function() {
        if (this.state.data) {
            console.log('DATA!')
            var productNodes = this.state.data.map(function(product){
                return <li> {product.description} </li>
            })
        }
        return (
            <div>
                <h1>Hello React!</h1>
                <ul>
                    {productNodes}
                </ul>
            </div>
        )
    }
})

ReactDOM.render(<ProductsList url='/api/'/>, 
    document.getElementById('container'))*/

var Hello = React.createClass({
    render: function() {
        return(
            <div>
                <h4>Product Information:</h4>
                <ul>
                  <li>List of fetaures: {_appData.features}</li>
                  <li>Price: {_appData.price}</li>
                </ul>
            </div>
        )
    }
});
/*class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            creditCard: '',
            couponCode: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              E-mail:
              <input
                name="email"
                type="text"
                value={this.state.email} 
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Credit Card:
              <input
                name="creditCard"
                type="text"
                value={this.state.creditCard} 
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Coupon Code:
              <input
                name="couponCode"
                type="text"
                value={this.state.couponCode} 
                onChange={this.handleInputChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        );
    }
}*/
var ProductForm = React.createClass({
    getInitialState: function() {
        return (
        this.state = {
            email: '',
            couponCode: '',
            email_focused: false,
            coupon_focused: false
        });
    },
    handleEmailChange: function(e) {
        this.setState({email: e.target.value});
    },
    handleCreditCardChange: function(e) {
        this.setState({creditCard: e.target.value});
    },
    handleCouponChange: function(e) {
        this.setState({coupon: e.target.value});
    },
    onEmailBlur: function() {
        this.setState({ email_focused: false })
    },
    onEmailFocus: function() {
        this.setState({ email_focused: true })
    },
    onCouponBlur: function() {
        this.setState({ coupon_focused: false })
    },
    onCouponFocus: function() {
        this.setState({ coupon_focused: true })
    },
    render : function() {
        if(this.state.email_focused == false && this.state.coupon_focused == false && this.state.email&&this.state.coupon)
            console.log("HEYO");
        
        return (
            <form>
                <label>
                    E-mail:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} onFocus={this.onEmailFocus} onBlur={this.onEmailBlur}/>
                </label>
                <br />
                <label>
                    Credit Card:
                    <input type="text" name="creditCard" value={this.state.cre} onChange={this.handleCreditCardChange}/>
                </label>
                <br />
                <label>
                    Coupon Code:
                    <input type="text" name="coupon" value={this.state.coupon} onChange={this.handleCouponChange} onFocus={this.onCouponFocus} onBlur={this.onCouponBlur}/>
                </label>
                <br />
                <button type="button" onClick={this.handlePurchase}>Purchase</button>
            </form>);
    },
    handlePurchase: function() {
        console.log("EMail: " + this.state.email);
        console.log("Coupon: " + this.state.coupon);
    }
});
ReactDOM.render(
    <div>
        <Hello />
        <ProductForm />
    </div>, 
    document.getElementById('container')
);