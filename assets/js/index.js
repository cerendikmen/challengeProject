import React from 'react';
import ReactDOM from 'react-dom';
import '../css/frm.css';
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
class ProductList extends React.Component {
    render() {
        return(
            <div>
                <h4>Product Information:</h4>
                <ul>
                  <li>List of fetaures: {_appData.features}</li>
                  <li>Price: {_appData.price}</li>
                </ul>
            </div>
        );
    }
}
class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            creditCard:'',
            coupon: '',
            data: [],
            email_focused:false,
            coupon_focused: false,
            couponValid: false,
            couponNotValid: false,
            check: true
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
        this.handleCouponChange = this.handleCouponChange.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);
        this.onEmailFocus = this.onEmailFocus.bind(this);
        this.onCouponBlur = this.onCouponBlur.bind(this);
        this.onCouponFocus = this.onCouponFocus.bind(this);
    }
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handleCreditCardChange(e) {
        this.setState({creditCard: e.target.value});
    }
    handleCouponChange(e) {
        this.setState({coupon: e.target.value});
    }
    onEmailBlur() {
        this.setState({ email_focused: false })
    }
    onEmailFocus() {
        this.setState({ email_focused: true })
    }
    onCouponBlur() {
        this.setState({ coupon_focused: false })
    }
    onCouponFocus() {
        this.setState({ coupon_focused: true })
    }
    handlePurchase(e) {
        e.preventDefault();
        console.log("EMail: " + this.state.email);
        console.log("Coupon: " + this.state.coupon);
        var postData = { 
            coupon: this.state.coupon,
            product_id: _appData.identifier,
            email: this.state.email
        };
 
        $.ajax({
          url: this.props.url2,
          dataType: 'json',
          type: 'POST',
          data: postData,
          cache: false,
          success: (data) => {
            this.setState({data: data});
            alert(this.state.data.reason);

            
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }
    validateCouponFromServer() {
        console.log("product_id: " + _appData.identifier)
        var postData = { 
            coupon: this.state.coupon,
            product_id: _appData.identifier,
            email: this.state.email
        };
 
        $.ajax({
          url: this.props.url1,
          dataType: 'json',
          type: 'POST',
          data: postData,
          cache: false,
          success: (data) => {
            this.setState({data: data});
            if(data.result)
            {
                console.log("Result: " + data.result);
                console.log("Reason: " + data.reason);
                this.setState({couponValid: true});
                this.setState({ check: false });
            }
            else
            {
                console.log("Result: " + data.result);
                console.log("Reason: " + data.price);
                this.setState({couponNotValid: true});
                this.setState({ email: '' });
                this.setState({ coupon: '' });
                this.setState({ email_focused: false });
                this.setState({ coupon_focused: false });
                
            }

            
          },
          error: (xhr, status, err) => {
            console.error(this.props.url1, status, err.toString());
          }
        });
    }

    render() {
        if(this.state.check){
            if(this.state.email_focused == false && this.state.coupon_focused == false && this.state.email&&this.state.coupon)
            {
               console.log("this.state.email: " + this.state.email);
               console.log("this.state.coupon: " + this.state.coupon);
               this.validateCouponFromServer();
            }   
        }
        
        
        return (
            <form>
                    <label>E-mail<span>*</span>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} onFocus={this.onEmailFocus} onBlur={this.onEmailBlur}/>
                    </label>
                    <br />
                    <label>Credit Card<span>*</span>
                        <input type="text" name="creditCard" value={this.state.creditCard} onChange={this.handleCreditCardChange}/>
                    </label>
                    <br />
                    <label>
                        Coupon Code:
                        <input type="text" name="coupon" value={this.state.coupon} onChange={this.handleCouponChange} onFocus={this.onCouponFocus} onBlur={this.onCouponBlur}/>
                    </label>
                    <br />
                    {this.state.couponNotValid &&
                        <span className="text">{this.state.data.reason}</span>
                    }
                    {this.state.couponValid &&
                        <span className="text">{this.state.data.price}</span>
                    }
                    <br />
                    <button type="button" onClick={this.handlePurchase}>Purchase</button>
            </form>
        );
    }  
}
ReactDOM.render(
    <div className="frm">
        <ProductList />
        <ProductForm url1='/purchase/check/' url2='/purchase/record/'/>
    </div>, 
    document.getElementById('container')
);