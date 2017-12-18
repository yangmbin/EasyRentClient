<style>
.input-width {
    width: 240px;
}
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>

<template>
    <Card>
        <p slot="title">Banner / Banner添加</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Banner图片">
                <div class="demo-upload-list" v-for="item in houseImgList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadUrl" style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="查看图片" v-model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>
            <FormItem label="对应公寓" prop="houseId">
                <Select v-model="formValidate.houseId" placeholder="请选择对应公寓" class="input-width">
                    <template v-for="item in houseInfoList">
                        <Option :value="item.id + ''">{{item.city + item.region + item.address}}</Option>
                    </template>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>

    </Card>
</template>
<script>
export default {
    data() {
        return {
            formValidate: {
                houseId: ""
            },
            ruleValidate: {
                houseId: [
                    {
                        required: true,
                        message: "请选择对应公寓",
                        trigger: "change"
                    }
                ]
            },
            imgName: "",
            visible: false,
            houseImgList: [],
            houseInfoList: [],
            uploadUrl: this.$api.uploadUrl,
            getAllHouseUrl: "/manage/get_all_house_info",
            addBannerUrl: "/manage/add_banner"
        };
    },
    methods: {
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    // 第二个判断是那种正在上传过程中
                    if (this.houseImgList.length == 0 || this.houseImgList[0].path == undefined) {
                        this.$Notice.warning({
                            title: "请上传Banner图片"
                        });
                    } else {
                        this.$api.post(
                            this.addBannerUrl,
                            {   image: this.houseImgList[0].path,
                                houseid: this.formValidate.houseId
                            },
                            s => {
                                console.log(s);
                                if (s.success) {
                                    // 成功后，重置数据
                                    this.handleReset("formValidate");
                                    this.$refs.upload.fileList = [];
                                    this.houseImgList = this.$refs.upload.fileList;

                                    this.$Message.success(s.msg);
                                } else {
                                    this.$Message.error(s.msg);
                                }
                            }
                        );
                    }
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.$refs.upload.fileList = [];
            this.houseImgList = this.$refs.upload.fileList;
        },
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            console.log(res);
            console.log(file);
            if (res.success) {
                file.url = this.$api.imgUrl + res.path;
                file.name = this.$api.imgUrl + res.path;
                file.path = res.path;
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "文件格式不正确",
                desc: "请选择jpg或png格式"
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件大小超过限制",
                desc: "文件大小不能大于2M"
            });
        },
        handleBeforeUpload() {
            const check = this.houseImgList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: "最多只能上传1张图片"
                });
            }
            return check;
        }
    },
    mounted() {
        this.houseImgList = this.$refs.upload.fileList;
    },
    created: function() {
        this.$api.get(this.getAllHouseUrl, null, s => {
            console.log(s);
            this.houseInfoList = s;
        });
    }
};
</script>
