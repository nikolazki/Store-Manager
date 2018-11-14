function deleteProductByID(){	
const token = localStorage.getItem('token');
const prodid = localStorage.getItem('product_id');
const access_token = "Bearer " + token;
if (token === null){
  let notify = document.getElementById("notify");
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login as admin to delete a product!
</div>`;
	setTimeout("location.assign('./login.html')", 3000);
}
// ask the user whether they want to delete the product
if(confirm("Are you sure you want to delete this product?"))
{
	//delete the product after confirm
	fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${prodid}`,{
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': access_token
},
method:"DELETE",
mode: "cors",
})
.then(function(response)
{
	return response.json()
	
	})
.then(function(response){
		if (response.Message === "Product deleted successfully!"){
			// redirect to individualprod page
      let notify = document.getElementById("notify");
  notify.innerHTML =
  `<div class="isa_success">
     <i class="fa fa-check"></i>
     ${response.Message}
</div>`;
			window.location.assign('./individualprodetails.html')
		}
		else{
      let notify = document.getElementById("notify");
     notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    ${response.Message}
</div>`
		}
	})

}
//continue displaying the current page
else
{
	window.location.assign('./individualprodetails.html')
}

}