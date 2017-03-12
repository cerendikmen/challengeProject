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
ReactDOM.render(<Hello />, 
    document.getElementById('container'))