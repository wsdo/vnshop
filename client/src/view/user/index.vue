<template>
    <div>
        <!-- user 页面 -->
        <router-link :to="'/user/' + item.id" :key='index' v-for="(item,index) in userList"> {{item.userName}}</router-link>
        <div class="" v-if="userInfo.userName">
            <p> 姓名：{{userInfo.userName}}</p>
            <p> 性别：{{userInfo.sex}}</p>
            <p> 爱好：{{userInfo.hobby}}</p>
        </div>
        <!-- 他的关注， 他的分享 -->
        <div v-if="userInfo.userName">
            <router-link exact to="?info=follow" > 他的关注 </router-link>
            <router-link exact to="?info=share" > 他的分享 </router-link>
            
            <div>
                {{$route.query}}
            </div>
        </div>
    </div>
</template>

<script>
    // import $ from 'jquery'

    let data = [
      {
        id: 1,
        tip: 'vip',
        userName: 'lishuang',
        sex: '男',
        hobby: 'coding'
      },
      {
        id: 2,
        tip: 'vip',
        userName: 'stark',
        sex: '男',
        hobby: 'readbook'
      },
      {
        id: 3,
        tip: 'common',
        userName: 'xiaorong',
        sex: '男',
        hobby: '女'
      }
    ]
    export default {
        data () {
            return {
              userList:data,
              userInfo:{}
            }
        },
        watch:{
            // 因为 created 只调用一次所有在这监听
            // 当url 变化后，这可以实时监听
            $route() {
                this.getData()
            }
        },
        created () {
            // 渲染这个组件会调用一次这个生命周期函数
            // 复用这个组件，这个函数就不会再次调用了，
            this.getData()
            this.useJq()
        },
        methods:{
            getData(){
                let id = this.$route.params.stark;
                console.log(this.$route)

                if(id){
                    this.userInfo = this.userList.filter((item)=>{
                        return item.id == id
                    })[0];
                }else{
                    this.userInfo = {}
                }

                console.log(this.userInfo);
            },
            useJq(){
            //    let html =  $('#stark').val()
                console.log(html)
            }
        }
    }
</script>

<style>
</style>