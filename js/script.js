// Business
function Pizza(type, size, crust, toppings){
    this.typeValue = type ;
    this.sizeValue = size ;
    this.crustCost = crust ;
    this.toppingCost = toppings ;
}
Pizza.prototype.myOrder = function () {
    result = this.typeValue + this.sizeValue + this.crustCost + this.toppingCost;
    return result;
}
// user interface

$(document).ready(function (){
    let oderForm = document.querySelector(#orderForm);
    let checkOrder = document.querySelector(#checkOrder);
    let total = document.querySelector(#total);
    let cart = [];

    oderForm.addEventListener("submit" , function (event) {
        event.preventDefault();
        $(this).closest("form").find("input[type=text], textarea").val ("");
        let type = $ ("#type").val();
        let size = $ ("#size").val();
        let crust = $ ("#crust").val();
        let toppings = $ ("#toppings").val();
        let toppingCost = 0 ;
        let crustCost = 0 ;
        let sizeValue = 0 ;

        if (type.length === 0 || size.length === 0 || crust.length === 0 || toppings.length === 0) {
            alert ("Select from all Field's")
            throw new Error;


        }

        if (crust === "Crispy") {
            crustCost = crustCost + 250 ;
        }

        else if (crust === "Stuffed") {
            crustCost = crustCost + 300 ;
        }

        else if (crust === "Gluten-free") {
            crustCost = crustCost + 350 ;
        }


        if (toppings === "Mushroom") {
            toppingCost = toppingCost + 100 ;
        }

        else if (toppings === "Sausage") {
            toppingCost = toppingCost + 150 ;
        }

        else if (toppings === "Green Pepper") {
            sizeValue += 200 ;
        }

        if (size === "Small") {
            sizeValue +=  200 ;
        }

        else if (size === "Medium") {
            sizeValue +=  250 ;
        }

        else if (size === "Large") {
            sizeValue +=  300 ;
        }
        let newOrder = new Pizza(sizeValue, crustCost, toppingCost);
        let fd = new FormData(oderForm);
        let order = {}

        for (let key of fd.keys() ){
            if (fd.get (key).toString().length > 0 ){
                order[key]= fd.get(key).toString();
            }
        }

        order.toppingCost = toppingCost;
        order.crustCost = crustCost;
        order.sizeValue = sizeValue;
        order.typeValue = typeValue;

        order["total"] = (order["toppingCost" ] + order["crustCost"] + order["sizeValue"] + order[typeValue]);
        cart.push(order)
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Your order has been successfully added to the cart")
        $(".view").show();
        $("#guide").show();
        let form1 = document.getElementsByName("orderForm")[0];
        form1.reset();
        
    });

    checkOrder.addEventListener("click",function(){
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.length > 0 ){
            document.querySelector("#customerOrder").innerHTML = "";
            cart.forEach(element => {
                document.querySelector("#customerOrder").innerHTML += `<tr>
                <td> $ {element ["type"]}</td>
                <td> $ {element [""]}</td>
                <td> $ {element ["topping"]}</td>
                <td> $ {(element ["toppingCost"]) + ( element['crustCost']) + (element [ sizeValue])}</td>

                <tr>`;
            });
        }

        // Order print on table
        $ ("#orderTable").show();
        $ ("#formTable").show();
        const total = cart.reduce((sum, item ) => sum + (parseInt(item["total"])), 0 );
        const shippingCost = 0.4 * total;
        total.innerHTML = "Order price Ksh" + total.toString();


          // Delivery option

    })

})
