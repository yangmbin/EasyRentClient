<style scoped>
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
        <p slot="title">公寓信息 / 添加公寓</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="城市" prop="city">
                <Select v-model="formValidate.city" placeholder="请选择城市" class="input-width">
                    <Option value="贵阳市">贵阳市</Option>
                </Select>
            </FormItem>
            <FormItem label="区域" prop="region">
                <Select v-model="formValidate.region" placeholder="请选择区域" class="input-width">
                    <Option value="观山湖">观山湖区</Option>
                    <Option value="南明区">南明区</Option>
                    <Option value="云岩区">云岩区</Option>
                    <Option value="花溪区">花溪区</Option>
                </Select>
            </FormItem>
            <FormItem label="详细地址" prop="address">
                <Input v-model="formValidate.address" placeholder="请输入详细地址" class="input-width"></Input>
            </FormItem>
            <FormItem label="公寓类型" prop="renttype">
                <Select v-model="formValidate.renttype" placeholder="请选择公寓类型" class="input-width">
                    <Option value="长租">长租</Option>
                    <Option value="短租">短租</Option>
                </Select>
            </FormItem>

            <FormItem label="价格区间">
                <Row>
                    <Col span="5">
                    <FormItem prop="minprice">
                        <Input v-model="formValidate.minprice" placeholder="最低价格" class="input-width"></Input>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="5">
                    <FormItem prop="maxprice">
                        <Input v-model="formValidate.maxprice" placeholder="最高价格" class="input-width"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="公寓设施" prop="installation">
                <CheckboxGroup v-model="formValidate.installation">
                    <Checkbox label="无线WIFI"></Checkbox>
                    <Checkbox label="厨房"></Checkbox>
                    <Checkbox label="油烟机"></Checkbox>
                    <Checkbox label="热水器"></Checkbox>
                    <Checkbox label="洗衣机"></Checkbox>
                    <Checkbox label="卫生间"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="付款方式" prop="paytype">
                <CheckboxGroup v-model="formValidate.paytype">
                    <Checkbox label="月付"></Checkbox>
                    <Checkbox label="季付"></Checkbox>
                    <Checkbox label="半年付"></Checkbox>
                    <Checkbox label="年付"></Checkbox>
                </CheckboxGroup>
            </FormItem>

            <!-- 图片 -->
            <FormItem label="公寓图片">
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
                <Modal title="查看图片" v-model="houseImgVisible">
                    <img :src="houseImgName" v-if="houseImgVisible" style="width: 100%">
                </Modal>
            </FormItem>

            <!-- 长图 -->
            <FormItem label="公寓长图">
                <div class="demo-upload-list" v-for="item in longImgList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleLongView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleLongRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload ref="longUpload" :show-upload-list="false" :on-success="handleLongSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeLongUpload" type="drag" :action="uploadUrl" style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="查看图片" v-model="longImgVisible">
                    <img :src="longImgName" v-if="longImgVisible" style="width: 100%">
                </Modal>
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
                address: "",
                city: "",
                region: "",
                renttype: "",
                installation: [],
                paytype: [],
                minprice: "",
                maxprice: ""
            },
            ruleValidate: {
                address: [
                    {
                        required: true,
                        message: "详细地址不能为空",
                        trigger: "blur"
                    }
                ],
                minprice: [
                    {
                        required: true,
                        message: "请输入最低价格",
                        trigger: "blur"
                    }
                ],
                maxprice: [
                    {
                        required: true,
                        message: "请输入最高价格",
                        trigger: "blur"
                    }
                ],
                price: [
                    {
                        required: true,
                        message: "请输入价格区间",
                        trigger: "blur"
                    }
                ],
                city: [
                    {
                        required: true,
                        message: "请选择城市",
                        trigger: "change"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请选择区域",
                        trigger: "change"
                    }
                ],
                renttype: [
                    {
                        required: true,
                        message: "请选择公寓类型",
                        trigger: "change"
                    }
                ],
                installation: [
                    {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "至少选择一个",
                        trigger: "change"
                    }
                ],
                paytype: [
                    {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "至少选择一个",
                        trigger: "change"
                    }
                ]
            },

            houseImgName: "",
            longImgName: "",
            houseImgVisible: false,
            longImgVisible: false,
            houseImgList: [],
            longImgList: [],
            uploadUrl: this.$api.uploadUrl,
            url: "/manage/add_house_info"
        };
    },
    methods: {
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.houseImgList.length == 0 || this.houseImgList[0].path == undefined) {
                        this.$Notice.warning({
                            title: "请上传公寓图片"
                        });
                    } else if (this.longImgList.length == 0 || this.longImgList[0].path == undefined) {
                        this.$Notice.warning({
                            title: "请上传公寓长图"
                        });
                    } else {
                        var images = "";
                        for (var i = 0; i < this.houseImgList.length; i++)
                            images += this.houseImgList[i].path + ",";
                        var params = {
                            city: this.formValidate.city,
                            region: this.formValidate.region,
                            images: images,
                            address: this.formValidate.address,
                            minprice: this.formValidate.minprice,
                            maxprice: this.formValidate.maxprice,
                            renttype: this.formValidate.renttype,
                            installation_wifi: this.isInArray(this.formValidate.installation, '无线WIFI') ? 1 : 0,
                            installation_kitchen: this.isInArray(this.formValidate.installation, '厨房') ? 1 : 0,
                            installation_hoods: this.isInArray(this.formValidate.installation, '油烟机') ? 1 : 0,
                            installation_water_heater: this.isInArray(this.formValidate.installation, '热水器') ? 1 : 0,
                            installation_washer: this.isInArray(this.formValidate.installation, '洗衣机') ? 1 : 0,
                            installation_toilet: this.isInArray(this.formValidate.installation, '卫生间') ? 1 : 0,
                            pay_month: this.isInArray(this.formValidate.paytype, '月付') ? 1 : 0,
                            pay_season: this.isInArray(this.formValidate.paytype, '季付') ? 1 : 0,
                            pay_half: this.isInArray(this.formValidate.paytype, '半年付') ? 1 : 0,
                            pay_year: this.isInArray(this.formValidate.paytype, '年付') ? 1 : 0,
                            longimage: this.longImgList[0].path
                        };
                        
                        console.log(params);
                        this.$api.post(
                            this.url,
                            params,
                            s => {
                                console.log(s);
                                if (s.success) {
                                    // 成功后，重置数据
                                    this.handleReset('formValidate');
                                    this.$refs.upload.fileList = [];
                                    this.$refs.longUpload.fileList = [];
                                    this.houseImgList = this.$refs.upload.fileList;
                                    this.longImgList = this.$refs.longUpload.fileList;

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
            this.$refs.longUpload.fileList = [];
            this.houseImgList = this.$refs.upload.fileList;
            this.longImgList = this.$refs.longUpload.fileList;
        },

        handleView(name) {
            this.houseImgName = name;
            this.houseImgVisible = true;
        },

        handleLongView(name) {
            this.longImgName = name;
            this.longImgVisible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleLongRemove(file) {
            const fileList = this.$refs.longUpload.fileList;
            this.$refs.longUpload.fileList.splice(fileList.indexOf(file), 1);
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
        handleLongSuccess(res, file) {
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
            const check = this.houseImgList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: "最多只能上传5张图片"
                });
            }
            return check;
        },
        handleBeforeLongUpload() {
            const check = this.longImgList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: "最多只能上传1张长图"
                });
            }
            return check;
        },
        // 判断某元素是否在改数组中
        isInArray(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true;
                }
            }
            return false;
        }
    },
    mounted() {
        this.houseImgList = this.$refs.upload.fileList;
        this.longImgList = this.$refs.longUpload.fileList;
    }
};
</script>
