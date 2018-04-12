<template>
    <div class="upload-tool-wrap">
        <Upload
            v-if="!success"
            :before-upload="handleUpload"
            action="//localhost:8000/upload">
            <Button type="ghost" icon="ios-cloud-upload-outline">{{placeholder}}</Button>
        </Upload>
        <div v-if="file !== null">
            Upload file: {{ file.name }}
            <Button v-if="!success" type="text" @click="uploadAction" :loading="loadingStatus" style="color: #2b85e4;">
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
                loadingStatus: false,
                success: false
            }
        },
        methods: {
            handleUpload(file) {
                this.file = file
                // this.$emit('fileChange', this.file.size)
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
                let uuid = new UUID().toString()
                let newFilename = uuid + `${this.file.name}`.substring(`${this.file.name}`.lastIndexOf('.'))
                console.log('new filename', newFilename)
                let newFile = new File([this.file], newFilename)
                let form = new FormData()
                console.log(newFile)
                form.append("file", newFile)
                form.append("oldName", this.file.name)
                this.loadingStatus = true
                upload(form).then(res => {
                    console.log('upload res', res)
                    this.success = true
                    this.loadingStatus = false
                    this.$emit('success', res)
                    this.$emit('fileChange', newFile.size)
                    this.$Message.success({
                        content: '上传成功',
                        duration: 3
                    })
                }).catch(() => {
                    this.success = false
                    this.loadingStatus = false
                    // console.log('上传文件失败', error)
                    this.$Message.warning({
                        content: '上传失败',
                        duration: 2
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
