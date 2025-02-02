<script lang="ts" setup>
const viewName = "良くない例";

useHead({
  title: viewName,
});

const {
  staffItems,
  staffPositionItems,
  search,
  headers,
  postDialog,
  editDialog,
  deleteDialog,
  selectStaff,
  onEdit,
  onDelete,
  confirmPost,
  confirmEdit,
  confirmDelete,
  cancel,
} = useStaffs();
</script>
<template>
  <v-container>
    <div>
      <h1>スタッフ管理画面 ({{ viewName }})</h1>
    </div>
    <v-divider class="my-2" />

    <v-row>
      <v-col>
        <h1>一覧表示</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
