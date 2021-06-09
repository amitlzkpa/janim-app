<template>
  <div>
    <div
      :style="`
        width: 100%;
        height: ${height}px;
        border: 1px dotted grey;
        border-radius: 8px;
        padding: 8px;
        overflow: auto;
      `"
      @drop.prevent="addFile"
      @dragover.prevent
    >
      <div v-if="files.length === 0" class="flex-center country-label">
        Drag and drop files here to upload
      </div>
      <div v-else>
        <vs-chip
          closable
          @click="removeFile(file)"
          v-for="(file, idx) in files"
          :key="idx"
        >
          {{ file.name }} ({{ file.size | prettyBytes }})
        </vs-chip>
      </div>
    </div>
    <vs-button
      class="full-width mt-8"
      :disabled="uploadDisabled"
      @click="uploadFiles"
      >Submit</vs-button
    >
    <div style="height: 20px">
      <vs-progress
        v-if="isUploading"
        :percent="uploadPercent"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import * as fb from "@/firebase";

export default {
  props: {
    basePath: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      files: [],
      isUploading: false,
      uploadPercent: 0,
    };
  },
  computed: {
    uploadDisabled() {
      return this.files.length === 0 || this.isUploading;
    },
  },
  methods: {
    async addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles].forEach((f) => {
        this.files.push(f);
      });
    },
    removeFile(file) {
      this.files = this.files.filter((f) => {
        return f != file;
      });
    },
    async uploadFiles() {
      this.isUploading = true;
      let storageRef = fb.storage.ref();

      this.uploadPercent = 0;
      let totalBytes = [];
      let bytesSent = [];
      this.files.forEach((f) => {
        totalBytes.push(f.size);
        bytesSent.push(0);
      });
      let totalBytesAcrossAllFiles = this.files.reduce(
        (a, b) => a + (b.size || 0),
        0
      );
      let totalBytesSent = 0;

      let completedUploads = 0;

      for (let idx in this.files) {
        let file = this.files[idx];

        let metadata = {
          contentType: file.type,
        };
        let basePath = !this.basePath.endsWith("/")
          ? `${this.basePath}/`
          : this.basePath;
        let uploadTask = storageRef
          .child(`${basePath}${file.name}`)
          .put(file, metadata);

        this.uploadPercent = 0;

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            bytesSent[idx] = snapshot.bytesTransferred;
            totalBytesSent = bytesSent.reduce((a, b) => a + b, 0);
            let progress = (totalBytesSent / totalBytesAcrossAllFiles) * 100;
            this.uploadPercent = progress;
            console.log(
              `${totalBytesSent}/${totalBytesAcrossAllFiles} => ${this.uploadPercent}`
            );
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            this.isUploading = false;
          },
          async () => {
            let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log("File available at", downloadURL);
            completedUploads++;
            let isComplete = completedUploads === this.files.length + 1;
            this.isUploading = !isComplete;
            if (isComplete) {
              this.files = [];
              this.uploadPercent = 100;
            }
          }
        );
      }
    },
  },
};
</script>