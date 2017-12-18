<style scoped>
.input-width {
    width: 240px;
}
</style>

<template>
    <Card>
        <p slot="title">设置 / 联系方式</p>
        <Form ref="contactForm" :model="formItem" :label-width="80" :rules="rules">
            <FormItem label="联系方式" prop="phone">
                <Input v-model="formItem.phone" placeholder="请输入电话号码" class="input-width"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit">修改</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                phone: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "联系方式不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.contactForm.validate(valid => {
                if (valid) {
                    this.$api.post(
                        "/manage/edit_contact",
                        { contact: this.formItem.phone },
                        s => {
                            console.log(s);
                            if (s.success) {
                                this.$Message.success(s.msg);
                            }
                        }
                    );
                }
            });
        }
    },
    created: function() {
        this.$api.get("/get_contact", null, s => {
            console.log(s);
            this.formItem.phone = s.phone;
        });
    }
};
</script>
