<template>
    <div class="register-wrap">
        <div class="register-box">
            <div>
                <div class="input-wrap">
                    <label class="icon-user"></label>
                    <input type="text" placeholder="昵称" v-model="username">
                </div>
                <div class="input-wrap">
                    <label class="icon-id"></label>
                    <input type="text" placeholder="用户名" v-model="account">
                </div>
                <div class="input-wrap">
                    <label class="icon-password"></label>
                    <input type="password" placeholder="密码" v-model="password">
                </div>
                <div class="input-wrap">
                    <label class="icon-password"></label>
                    <input :class="[!isSame ? 'un-same-password' : '']" type="password" placeholder="确认密码" v-model="password2" >
                    <Icon v-if="!isSame" type="ios-information" style="color: red"></Icon>
                </div>
                <div class="button">
                    <a class="gv" href="javascript: void(0)" @click="register">注册</a>
                </div>
                <div class="to-register">
                    已有账号？
                    <a href="javascript: void(0)" @click="back()">去登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {register} from '../../api/user'

    export default {
        data() {
            return {
                username: '',
                account: '',
                password: '',
                password2: '',
                pending: false
            }
        },
        computed: {
            isSame() {
                return this.password === this.password2
            }
        },
        methods: {
            register() {
                if(!this.isSame || this.pending) return
                let closeMsg = this.$Message.loading({
                    content: '注册中...',
                    duration: 0
                })
                this.pending = true
                let para = {
                    account: this.account,
                    password: this.password,
                    username: this.username
                }
                register(para).then(res => {
                    closeMsg()
                    if(res === 1) {
                        //注册成功
                        this.pending = false
                        this.back({
                            account: para.account
                        })
                    }
                }).catch(() => {
                    closeMsg()
                    this.pending = false
                })
            },
            back(params) {
                this.$emit('back')
                this.$router.push({
                    path: '/login',
                    query: params || {}
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .register-wrap {
        height: 100%;
        overflow: hidden;
        position: relative;

        .back {
            position: fixed;
            left: 20px;
            top: 20px;
            width: 30px;
            height: 30px;
            background: url('../../assets/images/back.png') no-repeat;
            background-size: cover;
            cursor: pointer;
        }
        .gv {
            text-decoration: none;
            background: url('../../assets/images/nav_gv.png') repeat 0px 0px;
            width: 130px;
            height: 43px;
            display: block;
            text-align: center;
            line-height: 43px;
            cursor: pointer;
            float: left;
            margin: 10px 2px 10px 2px;
            font: 18px/43px 'microsoft yahei';
            color: #066197;
            transition: all .3s;

            &:hover {
                background: url('../../assets/images/nav_gv.png') repeat 0px -43px;
                color: #1d7eb8;
                -webkit-box-shadow: 0 0 6px #1d7eb8;
            }
        }

        .register-box {
            width: 600px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 100001;
        }
        .input-wrap {
            width: 270px;
        }
        .input-wrap label {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            margin-right: 10px;
            background-size: cover;
        }
        .input-wrap .un-same-password {
            border-color: red;
        }
        .icon-id {
            background: url('../../assets/images/id.png') no-repeat;
        }
        .icon-user {
            background: url('../../assets/images/user.png') no-repeat;
        }
        .icon-id {
            background: url('../../assets/images/id.png') no-repeat;
        }
        .icon-password {
            background: url('../../assets/images/password.png') no-repeat;
        }

        .input-wrap input {
            border: none;
            outline: none;
            background: none;
            border-bottom: 1px solid #fff;
            margin-top: 30px;
            width: 200px;
            height: 30px;
            line-height: 30px;
            /* text-align: center; */
            color: #fff;
            font-size: 14px;
            padding: 0 5px;
        }
        .button {
            margin-top: 30px;
            margin-left: 60px
        }
        .to-register {
            font-size: 12px;
            float: right;
            padding-top: 20px;
            color: #fff;
        }
        .to-register a {
            color: #066197;
            text-decoration: none;
        }
    }
</style>
