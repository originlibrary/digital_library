<template>
    <section class="download-wrap">
        download
        <Upload
            :before-upload="handleUpload"
            action="//localhost:8000/upload">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <div v-if="file !== null">
            Upload file: {{ file.name }}
            <Button type="text" @click="uploadAction" :loading="loadingStatus">
                {{ loadingStatus ? 'Uploading' : 'Click to upload' }}
            </Button>
        </div>
    </section>
</template>

<script>
    import { upload } from "../../api/upload";

    export default {
        data() {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            handleUpload(file) {
                this.file = file
                return false
            },
            uploadPercent(percent) {
                console.log('upload percent: ', percent)
            },
            uploadAction () {
                if(!this.file)
                    this.$Message.warning({
                        content: '请先选择文件',
                        duration: 1
                    })
                let form = new FormData()
                form.append("file", this.file)
                this.loadingStatus = true
                upload(form, percent => this.uploadPercent(percent)).then(res => {
                    this.loadingStatus = false
                    if(res.status === 200 && res.data.code === 200) {
                        this.$Message.success({
                            content: '上传成功',
                            duration: 1
                        })
                    }
                }).catch(error => {
                    console.log('上传文件失败', error)
                    this.$Message.warning({
                        content: '上传失败',
                        duration: 1
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .download-wrap {

    }
</style>
