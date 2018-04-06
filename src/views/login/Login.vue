<template>
    <div class="login-wrap">
        <div class="login-box">
            <div style="width: 200px">
                <Input v-model="account">
                    <span slot="prepend">
                        <Icon type="person" slot="prepend"></Icon>
                    </span>
                </Input>
                <br />
                <Input v-model="password" type="password">
                    <span slot="prepend">
                        <Icon type="locked" slo="prepend"></Icon>
                    </span>
                </Input>
                <div class="button">
                    <a class="gv" href="javascript: void(0)" @click="login()">登录</a>
                </div>
                <div class="toregist">
                    还没有账号？<a href="javascript: void(0)" @click="goRegister">去注册</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { login } from '../../api/user'

    export default {
        data() {
            return {
                account: this.$route.query.account || this.$store.getters.account || 'admin',
                password: 'admin',
                pending: false
            }
        },

        methods: {
            login() {
                if(this.pending || !this.account || !this.password) return
                this.pending = true
                let closeMsg = this.$Message.loading({
                    content: '登录中...',
                    duration: 0
                })
                let para = {
                    account: this.account,
                    password: this.password
                }
                login(para).then(res => {
                    this.$store.dispatch('SetUserInfo', res).then(() => {
                        closeMsg()
                        this.pending = false
                        this.$router.push('/Home')
                    }).catch(() => {})
                }).catch(() => {
                    closeMsg()
                    this.pending = false
                })
            },
            goRegister() {
                this.$emit('push')
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-wrap {
        height: 100%;
        overflow: hidden;
        position: relative;

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
            box-shadow:0 0 0 50px white inset!important;
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

        .login-box {
            width: 600px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 100001;
        }
        .input-wrap label {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            margin-right: 10px;
            background-size: cover;
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
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .toregist {
            font-size: 12px;
            float: right;
            padding-top: 20px;
            color: #fff;
        }
        .toregist a {
            color: #066197;
            text-decoration: none;
        }
    }
</style>
