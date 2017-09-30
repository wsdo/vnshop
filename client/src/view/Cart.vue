<template>
<div>
    <head-nav/>
    <nav-bread> <span>购物车列表</span></nav-bread>
      <div class="container">
        <div class="cart">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>我的购物车</span></h2>
            </div>
            <div class="item-list-wrap">
                <div class="cart-item">
                    <div class="cart-item-head">
                        <ul>
                            <li>Items</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li>Subtotal</li>
                            <li>Edit</li>
                        </ul>
                    </div>
                    <ul class="cart-item-list">
                        <li v-for="(item,index) in cartList" :key="index">
                            <div class="cart-tab-1">
                                <div class="cart-item-check">
                                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                                        <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok"></use>
                  </svg>
                                    </a>
                                </div>
                                <div class="cart-item-pic">
                                    <img :src="'/static/img/'+ item.productImage">
                                </div>
                                <div class="cart-item-title">
                                    <div class="item-name">{{item.productName}}</div>
                                </div>
                            </div>
                            <div class="cart-tab-2">
                                <div class="item-price">{{item.salePrice}}</div>
                            </div>
                            <div class="cart-tab-3">
                                <div class="item-quantity">
                                    <div class="select-self select-self-open">
                                        <div class="select-self-area">
                                            <a class="input-sub" @click="editCart('minu',item)">-</a>
                                            <span class="select-ipt">{{item.productNum}}</span>
                                            <a class="input-add" @click="editCart('add',item)">+</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-tab-4">
                                <div class="item-price-total">{{item.salePrice *item.productNum}}</div>
                            </div>
                            <div class="cart-tab-5">
                                <div class="cart-item-opration">
                                    <a href="javascript:;" class="item-edit-btn">
                                        <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cart-foot-wrap">
                <div class="cart-foot-inner">
                    <div class="cart-foot-l">
                        <div class="item-all-check"  >
                            <a href="javascipt:;" @click="toggleCheckAll">
                                <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok" ><use xlink:href="#icon-ok"/></svg>
                  </span>
                                <span >Select all</span>
                            </a>
                        </div>
                    </div>
                    <div class="cart-foot-r">
                        <div class="item-total">
                            Item total: <span class="total-price">{{totalPrice}}</span>
                        </div>
                        <div class="btn-wrap">
                            <a class="btn btn--red">Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer-nav/>
    </div>
</template>
<script>
import HeadNav from '@/components/Head'
import NavBread from '@/components/NavBread'
import FooterNav from '@/components/Footer'
import Modal from '@/components/Modal'
export default {
    name:'cart',
    data(){
        return{
            cartList:'',
            checked:''
        }
    },
    computed:{
        // 被选中的数量
        checkedCount(){
            var i = 0;
            this.cartList.forEach((item)=>{
                if(item.checked == '1') i++; 
            })
            return i;
        },
        checkAllFlag(){
            return this.checkedCount == this.cartList.length;
        },
        totalPrice(){
            let money = 0;
            this.cartList.forEach((item)=>{
                if(item.checked == '1'){
                    money += item.salePrice * item.productNum;
                }
            })
            return money;
        }
    },
    components:{
        HeadNav,
        NavBread,
        FooterNav,
        Modal
    },
    mounted(){
        this.getCarList();
    },
    methods:{
        getCarList(){
            this.$http.post('/users/cartList').then((result)=>{
                let res = result.data.result;
                this.cartList = res;
            })
        },
        // 改变购物车的数量
        editCart(flag,item){
            if(flag == 'add'){
                item.productNum++;
            }else if(flag == 'minu'){
                if(item.productNum <=1){
                    return;
                }
                item.productNum--;

            }else{
                // 当点击的时候，取反
                item.checked = item.checked == '1' ? '0' : '1';
            }

            this.$http.post('/users/cartEdit',{
                productId:item.productId,
                productNum:item.productNum,
                checked:item.checked
            }).then((result)=>{
                let res = result.data.result;
            })
        },
        toggleCheckAll(){
            let flag = !this.checkAllFlag;
            this.cartList.forEach((item)=>{
                item.checked = flag ? 1 : 0
            })

            this.$http.post('/users/editCheckAll',{
                checkAll:this.checkAllFlag
            }).then((response) => {
                let res = response.data;
                
            })
        }   

    }
}
</script>

