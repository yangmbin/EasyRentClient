<template>
    <Card>
        <p slot="title">公寓推荐 / 推荐列表</p>
        <Table border :columns="columns" :data="data"></Table>
        <Modal title="查看图片" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </Card>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: "公寓图片",
                    key: "longimage",
                    render: (h, params) => {
                        // 定义vue实例，在里面拿不到this
                        var vueInstance = this;
                        return h("div", [
                            h("img", {
                                attrs: {
                                    src: vueInstance.$api.imgUrl + vueInstance.data[params.index].image
                                },
                                style: {
                                    'width': "60px",
                                    'height': "60px",
                                    'margin': "2px",
                                    'border': "1px solid transparent",
                                    'border-radius': "4px",
                                    'box-shadow': "0 1px 1px rgba(0,0,0,.2)",
                                    'cursor': "pointer"
                                },
                                on: {
                                    click: () => {
                                        vueInstance.imgName = vueInstance.$api.imgUrl + vueInstance.data[params.index].image;
                                        vueInstance.visible = true;
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: "城市",
                    key: "city"
                },
                {
                    title: "区域",
                    key: "region"
                },
                {
                    title: "地址",
                    key: "address"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            imgName: "",
            visible: false,
            data: [],
            url: "/manage/recommend_list",
            deleteUrl: "/manage/delete_recommend"
        };
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: "User Info",
                content: `Name：${this.data[index].name}<br>Age：${this.data[
                    index
                ].age}<br>Address：${this.data[index].address}`
            });
        },
        remove(index) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确定删除该条目吗？</p>",
                onOk: () => {
                    this.$api.post(
                        this.deleteUrl,
                        {
                            id: this.data[index].id
                        },
                        s => {
                            // 删除成功
                            if (s.success) {
                                this.data.splice(index, 1);
                                this.$Message.success(s.msg);
                            } else {
                                // 删除失败
                                this.$Message.error(s.msg);
                            }
                        }
                    );
                },
                onCancel: () => {}
            });
        }
    },
    created: function() {
        this.$api.get(this.url, null, s => {
            console.log(s);
            this.data = s;
        });
    }
};
</script>


