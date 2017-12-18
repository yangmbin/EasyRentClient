<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
}

.login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
}

.login-con-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
}

.login-con-con {
    padding: 10px 0 0;
}
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="form.username" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// import Cookies from 'js-cookie';
export default {
    data() {
        return {
            form: {
                username: this.username,
                password: this.password
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "账号不能为空",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    }
                ]
            },
            url: "/manage/login"
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // Cookies.set('user', this.form.username);
                    // Cookies.set('password', this.form.password);
                    // this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    // if (this.form.username === 'iview_admin') {
                    //     Cookies.set('access', 0);
                    // } else {
                    //     Cookies.set('access', 1);
                    // }

                    this.$api.post(
                        this.url,
                        {
                            username: this.form.username,
                            password: this.form.password
                        },
                        s => {
                            // 登录成功
                            if (s.success) {
                                this.$router.replace({
                                    path: "index"
                                });
                                this.$Message.success(s.msg);
                            } else {
                                // 登录失败
                                this.$Message.error(s.msg);
                            }
                        }
                    );
                }
            });
        }
    },
    // 初始化，在这里判断是否已经登录了
    created: function() {
        this.$api.get(this.url, null, s => {
            console.log('haha');
            console.log(s);
            if (s.success) {
                this.$router.replace({
                    path: "index"
                });
            }
        });
    }
};
</script>
