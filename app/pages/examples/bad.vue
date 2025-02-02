<script lang="ts" setup>
const viewName = "良くない例";

useHead({
  title: viewName,
});

const headers = [
  { title: "#", value: "id", headerProps: { class: "bg-blue" } },
  { title: "名前", value: "name", headerProps: { class: "bg-blue" } },
  { title: "@", value: "email", headerProps: { class: "bg-blue" } },
  { title: "ロール", value: "position", headerProps: { class: "bg-blue" } },
  {
    title: "注意点があれば明記してください",
    value: "remarks",
    width: "610px",
    headerProps: { class: "bg-blue" },
  },
  { title: "ユーザーの更新", value: "edit", headerProps: { class: "bg-blue" } },
  {
    title: "ユーザーの削除",
    value: "delete",
    headerProps: { class: "bg-blue" },
  },
];

const {
  staffItems,
  staffPositionItems,
  search,
  postDialog,
  editDialog,
  deleteDialog,
  selectStaff,
  onPost,
  onEdit,
  onDelete,
  confirmPost,
  confirmEdit,
  confirmDelete,
  cancel,
} = useStaffs();

const addStaff = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};
</script>
<template>
  <v-container fluid>
    <div
      class="d-flex align-center bg-orange"
      style="max-width: 1200px; margin: 0 auto"
    >
      <h1>管理画面 ({{ viewName }})</h1>
      <v-spacer />
      <v-text-field label="検索" hide-details density="compact" />
      <v-btn @click="addStaff"> 新しいスタッフの登録はこちら </v-btn>
    </div>

    <v-divider class="my-2" />
    <bad-staff-filter />
    <v-container fluid>
      <v-row>
        <v-container>
          <v-data-table-virtual
            :search="search"
            :headers="headers"
            :items="staffItems"
            height="100vh"
            :filter-keys="['id', 'name', 'email']"
            no-data-text="データがありません"
          >
            <template #[`item.name`]="{ item }">
              <v-text-field
                v-model="item.name"
                hide-details
                density="compact"
                @blur="confirmEdit(item)"
              />
            </template>
            <template #[`item.email`]="{ item }">
              <v-text-field
                v-model="item.email"
                hide-details
                density="compact"
                @blur="confirmEdit(item)"
              />
            </template>
            <template #[`item.position`]="{ item }">
              <v-autocomplete
                v-model="item.position"
                :items="staffPositionItems"
                hide-details
                density="compact"
                @blur="confirmEdit(item)"
              />
            </template>
            <template #[`item.remarks`]="{ item }">
              <v-textarea
                v-model="item.remarks"
                density="compact"
                hide-details
                @blur="confirmEdit(item)"
              />
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn variant="text" @click="onEdit(item)">
                こちらを押してください
              </v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn
                color="error"
                variant="text"
                icon="mdi-trash-can-outline"
                @click="onDelete(item)"
              >
                こちらを押してください
              </v-btn>
            </template>
          </v-data-table-virtual>

          <div>
            <v-spacer />
            <v-btn color="yellow" @click="onPost"> 追加 </v-btn>
            <v-spacer />
          </div>
        </v-container>
      </v-row>
    </v-container>

    <v-dialog v-model="postDialog">
      <v-card>
        <template #title> 登録 </template>
        <template #text>
          <bad-staff-form
            v-if="selectStaff"
            :staff="selectStaff"
            add
            @cancel="cancel"
            @confirm="confirmPost"
          />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog">
      <v-card>
        <template #title> 編集 </template>
        <template #text>
          <bad-staff-form
            v-if="selectStaff"
            :staff="selectStaff"
            @cancel="cancel"
            @confirm="confirmEdit"
          />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog">
      <v-card>
        <template #title> 削除 </template>
        <template v-if="selectStaff" #text>
          削除すると元に戻すことができません。

          <div class="d-flex align-center">
            <v-spacer />
            <v-btn
              variant="elevated"
              color="primary"
              @click="confirmDelete(selectStaff)"
            >
              削除する
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>
