<template>
    <div class="upload-tool-wrap">
        <Upload
            :before-upload="handleUpload"
            action="//localhost:8000/upload">
            <Button type="ghost" icon="ios-cloud-upload-outline">{{placeholder}}</Button>
        </Upload>
        <div v-if="file !== null">
            Upload file: {{ file.name }}
            <Button type="text" @click="uploadAction" :loading="loadingStatus" style="color: #2b85e4;">
                {{ loadingStatus ? 'Uploading' : '点击上传' }}
            </Button>
        </div>
    </div>
</template>

<script>
    import { upload } from "../api/upload";

    export default {
        props: {
            fileName: String,
            placeholder: {
                type: String,
                default: '点击上传'
            }
        },
        data() {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            handleUpload(file) {
                this.file = file
                this.$emit('fileChange', this.file.length)
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
                        this.$emit('success', '')
                        this.$Message.success({
                            content: '上传成功',
                            duration: 1
                        })
                    }
                }).catch(error => {
                    this.loadingStatus = false
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
    .upload-tool-wrap {
        /*color: #fff;*/
    }
</style>
