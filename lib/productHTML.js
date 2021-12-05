var productHTML = {
    homeHTML: function(list){
        return `
              <div class="introduce">
                <h2>서비스 소개하는 글 또는 이미지</h2> 
              </div> 

              <div class="cardlist">
                ${list}
              </div>
        `;
    },
    list: function(products){
        var i = 0;
        var divs = '';

        while(i < products.length){
            divs += `
            <div class="cardoutter" style="width: 18rem;">
              <img src="img/logo.png" class="productimg" alt="물품">
              <div class="card-body">
                <h5 class="card-title">${products[i].productName}</h5>
                <p class="card-text">수량: ${products[i].counts}</p>`;
            
            if(products[i].counts == 0) // 수량이 없으면 예약만
              divs += `<button href="#" class="homeBtn btn-reserve">예약</button></div></div>`;
            else
              divs += `<button href="#" class="homeBtn btn-borrow">대여</button></div></div>`;            
            i++;
        }
        return divs;
    }
}

module.exports = productHTML;