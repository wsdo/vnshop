<template>
  <div>
      <HeadNav/>
        <NavBread><span>商品</span></NavBread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)">All</a></dd>
                        <dd>
                            <a href="javascript:void(0)">0 - 100</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">100 - 500</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">500 - 1000</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">1000 - 2000</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in list" :key='index'>
                                <div class="pic">
                                    <a href="#"><img :src="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footer/>
  </div>
</template>
<script>
import HeadNav from '@/components/Head'
import NavBread from '@/components/NavBread'
import Footer from '@/components/Footer'
import axios from 'axios'
export default {
    data(){
        return{
            list:[],
        }
    },
    components:{
        HeadNav,
        NavBread,
        Footer
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            axios.get('http://easy-mock.com/mock/59664d4d58618039284c7710/example/goods/list')
            .then(res=>{
                res = res.data.data;
                this.list = res;
            })
        }
    }
}
</script>
<style>

</style>


