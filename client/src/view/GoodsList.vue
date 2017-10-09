<template>
  <div>
      <HeadNav/>
        <NavBread><span>商品</span></NavBread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>价格:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
                        <dd v-for="(price , index) in priceFilter" :key="index" >
                            <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in list" :key='index'>
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            ...
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <FooterNav/>

    <!-- 在未登录的情况下 -->
    <modal :mdShow="mdShow">
        <p slot="message">请先登陆，否则无法加入购物车</p>
        <div slot="btnGroup">
            <a href="javascipt:;" class="btn-login" @click="mdShowCart = false">
                关闭</a>
        </div>
    </modal>

    <!-- 在登录的情况下 -->
    <modal :mdShow="mdShowCart">
        <p slot="message">加入购物车成功</p>
        <div slot="btnGroup">
            <a href="javascipt:;" class="btn btn--m" @click="mdShowCart = false">
                继续购物</a>
            <router-link class="btn btn--m" to="/cart">
            查看购物车</router-link>
        </div>
    </modal>

  </div>
</template>
<script>
import HeadNav from '@/components/Head'
import NavBread from '@/components/NavBread'
import FooterNav from '@/components/Footer'
import Modal from '@/components/Modal'
import jsonp from 'jsonp'

// import axios from 'axios'
export default {
    data(){
        return{
            list:[],
            sortFlag:true,
            priceChecked:'all',
            busy: true,
            page:1,
            pagesize:8,
            flag:false,
            mdShow:false,
            mdShowCart:false,
            priceFilter:[
                {
                    startPrice:'0',
                    endPrice:'100'
                },
                {
                    startPrice:'100',
                    endPrice:'500'
                },
                {
                    startPrice:'500',
                    endPrice:'1000'
                },
                {
                    startPrice:'1000',
                    endPrice:'5000'
                },
            ]
        }
    },
    components:{
        HeadNav,
        NavBread,
        FooterNav,
        Modal
    },
    created(){
        this.getGoods();
        // this.jsonps();
    },
    methods:{
        // getGoodsList(){
        //     axios.get('http://easy-mock.com/mock/59664d4d58618039284c7710/example/goods/list')
        //     .then(res=>{
        //         res = res.data.data;
        //         // this.list = res;
        //     })
        // },
        getGoods(flag){
            let sort = this.sortFlag ? 1 : -1;
            let param = {
                sort:sort,
                priceLevel:this.priceChecked,
                page:this.page,
                pagesize:this.pagesize
            }

            this.$http.get('/goods/list',{params:param}).then(result=>{
                let res = result.data;
                // this.list= res.data.result;
                if(flag){ //判断是否通过分页请求
                    // 分页的数据追加到这个list里面
                    this.list = this.list.concat(res.result);

                    // 判断当数据加载完了，让数据截停
                    console.log(res.result.length);
                    if(res.result.length == 0){
                        this.busy = true;
                        console.log(this.busy);
                    }else{
                        this.busy = false;
                    }
                }else{
                    // 第一次请求
                    this.list = res.result;
                    this.busy = false;
                }
                console.log(res.result);
            })
        },
        sortGoods(){
            this.sortFlag = !this.sortFlag;
            this.getGoods();
        },
        setPriceFilter(index){
            this.priceChecked = index;
            this.page = 1;
            this.getGoods();
        },
        loadMore: function() {
            this.busy = true;
            setTimeout(() => {
                // console.log(1111);
                this.page++;
                this.getGoods(true);
            }, 500);
        },
        addCart:function(productId){
            this.$http.post("/goods/addCart",{
                productId:productId
            }).then((result)=>{
                let res = result.data;
                if(res.status == 1){
                    this.mdShow = true;
                    //  alert('加入购物车失败！')
                }else{
                    // alert('加入购物车成功！')
                    this.mdShowCart = true;
                }
            })
        }
        // jsonps:function(){
        //     jsonp('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290',{param:'cb'},function(data){
        //         console.log(data);
        //     })
        // }
  
    }
}
</script>
<style>

</style>


