import React from 'react';
import ReactDOM from 'react-dom';
import '../css/frm.css';

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
            alert(this.state.data.message);

            
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
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>E-mail<span style={{color: '#ef2828'}}>*</span></label>
                            </td>
                            <td>
                                <input type="text" name="email" value={this.state.email} required={true} onChange={this.handleEmailChange} onFocus={this.onEmailFocus} onBlur={this.onEmailBlur}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Credit Card<span style={{color: '#ef2828'}}>*</span></label>
                            </td>
                            <td>
                                <input type="text" name="creditCard" value={this.state.creditCard} required={true} onChange={this.handleCreditCardChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Coupon Code</label>
                            </td>
                            <td>
                                <input type="text" name="coupon" value={this.state.coupon} onChange={this.handleCouponChange} onFocus={this.onCouponFocus} onBlur={this.onCouponBlur}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            {this.state.couponNotValid &&
                                <span className="text">{this.state.data.reason}</span>
                            }
                            {this.state.couponValid &&
                                <span className="text">{this.state.data.price}</span>
                            }
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <button type="button" disabled={!(this.state.email&&this.state.creditCard)}onClick={this.handlePurchase}>Purchase</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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